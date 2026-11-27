import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaComments, FaVideo, FaWhatsapp, FaPaperclip, FaTimes,
  FaDonate, FaPrayingHands, FaBible, FaTimesCircle, FaBullhorn,
  FaSearch, FaSun, FaMoon
} from "react-icons/fa";
import Swal from "sweetalert2";
import AnnouncementBoard from "../components/AnnouncementBoard";
import BirthdayCelebrants from "../components/BirthdayCelebrants";
import Footer from "../components/Footer";
import LanguageSwitcher from "../components/LanguageSwitcher";

import { useInView, useCountUp } from "../hooks/useInView";
import { SITE } from "../config/site";
import {
  cmArr,
  marqueeMessages,
  upcomingEvents,
  dailyVerses,
  initialPrayers,
  statsData,
  versesOfTheDay,
  testimonials,
  givingOptions,
  leadershipTeam,
  smallGroups,
  visitFaqs,
  ministries,
  fullMediaItems,
  commandingWeekVideos,
  localVideos,
  localAudios,
  parseYouTubeUrl,
  normalizeVideo,
} from "../data/homeData";

import "./Home.css";

const getEmbedFor = (item) => {
  if (!item) return null;
  if (item.type === "video" && item.isYouTube) return item.embedUrl;
  if (item.type === "image") return item.src;
  return null;
};

/* ============================================
   SEARCHABLE SELECT
   ============================================ */
function SearchableSelect({ id, label, value, onChange, options, placeholder, noResultsText }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    if (value === "" || value == null) setQuery("");
    else if (selectedOption) setQuery(selectedOption.label);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "");
  const filteredOptions =
    normalizedQuery === ""
      ? options
      : options.filter((o) =>
          o.label.toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalizedQuery)
        );

  const highlightMatch = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i} className="search-highlight">{part}</mark> : part
    );
  };

  const handleSelect = (opt) => {
    onChange(opt.value);
    setQuery(opt.label);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);
    if (val === "") onChange("");
  };

  return (
    <div className="search-select" ref={containerRef}>
      {label && <label htmlFor={id} className="search-select__label">{label}</label>}
      <input
        id={id}
        type="text"
        className="search-select__input"
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        autoComplete="off"
        aria-expanded={open}
        aria-haspopup="listbox"
      />
      {open && (
        <ul className="search-select__menu" role="listbox">
          {filteredOptions.length === 0 ? (
            <li className="search-select__empty">{noResultsText || "No results"}</li>
          ) : (
            filteredOptions.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={`search-select__option ${opt.value === value ? "is-selected" : ""}`}
                onClick={() => handleSelect(opt)}
              >
                {highlightMatch(opt.label, normalizedQuery)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

/* ============================================
   MEDIA GALLERY (CENTRALIZED & FEATURED)
   ============================================ */
function MediaGallery({ items }) {
  const [filter, setFilter] = useState("all");
  const [activeIdx, setActiveIdx] = useState(null);
  
  const [audioSearch, setAudioSearch] = useState("");
  const [videoSearch, setVideoSearch] = useState("");
  
  const [photoIndex, setPhotoIndex] = useState(0);

  const photos = useMemo(() => items.filter((i) => i.type === "image"), [items]);
  const audios = useMemo(() => items.filter((i) => i.type === "audio"), [items]);
  const videos = useMemo(
    () => items.filter((i) => i.type === "video" || i.type === "commandingWeek"),
    [items]
  );

  const featuredAudios = useMemo(() => audios.slice(0, 3), [audios]);
  const libraryAudios = useMemo(() => audios.slice(3), [audios]);

  const featuredVideos = useMemo(() => videos.slice(0, 3), [videos]);
  const libraryVideos = useMemo(() => videos.slice(3), [videos]);

  const filteredLibraryAudios = useMemo(() => {
    if (!audioSearch) return libraryAudios;
    const q = audioSearch.toLowerCase();
    return libraryAudios.filter(
      (a) => 
        a.title.toLowerCase().includes(q) || 
        (a.speaker && a.speaker.toLowerCase().includes(q)) ||
        (a.description && a.description.toLowerCase().includes(q))
    );
  }, [libraryAudios, audioSearch]);

  const filteredLibraryVideos = useMemo(() => {
    if (!videoSearch) return libraryVideos;
    const q = videoSearch.toLowerCase();
    return libraryVideos.filter(
      (v) => 
        v.title.toLowerCase().includes(q) || 
        (v.category && v.category.toLowerCase().includes(q)) ||
        (v.description && v.description.toLowerCase().includes(q))
    );
  }, [libraryVideos, videoSearch]);

  useEffect(() => {
    if (filter !== "all" && filter !== "image") return;
    if (photos.length <= 1) return;

    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length, filter]);

  useEffect(() => { setPhotoIndex(0); }, [filter]);

  const openModal = (item) => setActiveIdx(item);
  const closeModal = () => setActiveIdx(null);

  const getThumbnail = (video) => {
    if (video.isYouTube && video.embedUrl) {
      const vidId = video.embedUrl.split("/embed/")[1]?.split("?")[0];
      return `https://img.youtube.com/vi/${vidId}/mqdefault.jpg`;
    }
    return video.thumbnail || null;
  };

  return (
    <section className="home-gallery media-hub">
      <h2 className="section-title on-dark centered">Bethel Media Hub</h2>
      <span className="gold-rule centered" />

      <div className="gallery-filters">
        {["all", "image", "audio", "video"].map((f) => (
          <button
            key={f}
            className={`gallery-filter ${filter === f ? "is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "image" ? "Photos" : f === "audio" ? "Audios" : "Videos"}
          </button>
        ))}
      </div>

      <div className="media-sections-container">
        {/* PHOTOS SECTION */}
        {(filter === "all" || filter === "image") && photos.length > 0 && (
          <div className="media-section photo-section">
            <h3 className="media-section-title">📸 Photo Gallery</h3>
            <div className="photo-slider-wrap">
              <div
                className="photo-slider-track"
                style={{ transform: `translateX(-${photoIndex * 100}%)` }}
              >
                {photos.map((photo, idx) => (
                  <div key={idx} className="photo-slide">
                    <img
                      src={photo.src}
                      alt={photo.alt || photo.title}
                      onClick={() => openModal(photo)}
                      loading="lazy"
                    />
                    <div className="photo-slide-caption">{photo.title}</div>
                  </div>
                ))}
              </div>
              {photos.length > 1 && (
                <div className="photo-slider-dots">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      className={`slider-dot ${i === photoIndex ? "active" : ""}`}
                      onClick={() => setPhotoIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* AUDIOS SECTION */}
        {(filter === "all" || filter === "audio") && audios.length > 0 && (
          <div className="media-section audio-section">
            <h3 className="media-section-title">🎧 Audio Sermons & Messages</h3>
            
            <div className="featured-media-grid">
              {featuredAudios.map((audio, idx) => (
                <div key={`feat-audio-${idx}`} className="featured-card audio-featured-card" onClick={() => openModal(audio)}>
                  <div className="featured-icon-wrap">🎧</div>
                  <div className="featured-info">
                    <h4>{audio.title}</h4>
                    {audio.speaker && <p className="meta-speaker">👤 {audio.speaker}</p>}
                    {audio.date && <p className="meta-date">📅 {audio.date}</p>}
                    <button className="btn-play-small">Play Audio</button>
                  </div>
                </div>
              ))}
            </div>

            {libraryAudios.length > 0 && (
              <div className="media-library-section">
                <div className="library-header">
                  <h4>Browse All Audios</h4>
                  <div className="video-search-bar">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search remaining audios..."
                      value={audioSearch}
                      onChange={(e) => setAudioSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="media-scroll-list">
                  {filteredLibraryAudios.length === 0 ? (
                    <p className="no-media-found">No audios found matching "{audioSearch}"</p>
                  ) : (
                    filteredLibraryAudios.map((audio, idx) => (
                      <div key={`lib-audio-${idx}`} className="list-card audio-list-card" onClick={() => openModal(audio)}>
                        <div className="list-card-icon">🎧</div>
                        <div className="list-card-info">
                          <h4>{audio.title}</h4>
                          <p>{audio.speaker || "Bethel Baptist Media"}</p>
                        </div>
                        <div className="list-card-action">▶</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIDEOS SECTION */}
        {(filter === "all" || filter === "video") && videos.length > 0 && (
          <div className="media-section video-section">
            <h3 className="media-section-title">🎬 Watch Videos</h3>
            
            <div className="featured-media-grid">
              {featuredVideos.map((video, idx) => {
                const thumb = getThumbnail(video);
                return (
                  <div key={`feat-video-${idx}`} className="featured-card video-featured-card" onClick={() => openModal(video)}>
                    <div className="featured-thumb">
                      {thumb ? (
                        <img src={thumb} alt={video.title} loading="lazy" />
                      ) : (
                        <div className="video-placeholder">▶</div>
                      )}
                      <div className="video-play-overlay">▶</div>
                    </div>
                    <div className="featured-info">
                      <h4>{video.title}</h4>
                      {video.type === "commandingWeek" && (
                        <span className="video-badge">{video.videos.length} Part Series</span>
                      )}
                      <p className="meta-desc">{video.description || "Watch this powerful message."}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {libraryVideos.length > 0 && (
              <div className="media-library-section">
                <div className="library-header">
                  <h4>Browse All Videos</h4>
                  <div className="video-search-bar">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search remaining videos..."
                      value={videoSearch}
                      onChange={(e) => setVideoSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="media-scroll-list">
                  {filteredLibraryVideos.length === 0 ? (
                    <p className="no-media-found">No videos found matching "{videoSearch}"</p>
                  ) : (
                    filteredLibraryVideos.map((video, idx) => {
                      const thumb = getThumbnail(video);
                      return (
                        <div key={`lib-video-${idx}`} className="list-card video-list-card" onClick={() => openModal(video)}>
                          <div className="list-card-thumb">
                            {thumb ? <img src={thumb} alt={video.title} loading="lazy" /> : <div className="video-placeholder">▶</div>}
                            <div className="list-play-overlay">▶</div>
                          </div>
                          <div className="list-card-info">
                            <h4>{video.title}</h4>
                            {video.type === "commandingWeek" && <span className="video-badge">{video.videos.length} Videos</span>}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      {activeIdx && (
        <div className="gallery-modal" onClick={closeModal} role="dialog" aria-modal="true">
          <button className="gallery-close" onClick={closeModal} aria-label="Close">×</button>
          <div className="gallery-modal__body" onClick={(e) => e.stopPropagation()}>
            {activeIdx.type === "image" && (
              <img src={activeIdx.src} alt={activeIdx.alt || activeIdx.title} />
            )}
            {activeIdx.type === "video" && activeIdx.isYouTube && (
              <div className="video-frame">
                <iframe src={`${activeIdx.embedUrl}?autoplay=1&rel=0`} title={activeIdx.title} allowFullScreen />
              </div>
            )}
            {activeIdx.type === "commandingWeek" && (
              <div className="commanding-week-list">
                {activeIdx.videos.map((v, i) => (
                  <div key={i} className="commanding-week-item">
                    <iframe src={`${v.embedUrl}?rel=0`} title={v.title} allowFullScreen />
                    <p>{v.title} <span className="duration">{v.duration}</span></p>
                  </div>
                ))}
              </div>
            )}
            {activeIdx.type === "audio" && (
              <div className="audio-player-wrap">
                <h3>{activeIdx.title}</h3>
                <audio controls autoPlay src={activeIdx.src} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();

  /* --- DARK MODE STATE --- */
  const [isDarkMode, setIsDarkMode] = useState(false);

  const verseOfDay = useMemo(() => {
    const idx = Math.floor(new Date().getDate() % versesOfTheDay.length);
    return versesOfTheDay[idx];
  }, []);

  const statRefs = useRef([]);
  const statsVisible = useCountUp(statsData.length);

  const [heroRef, heroVisible] = useInView({ threshold: 0.1 });
  const [marqueeRef] = useInView({ threshold: 0.1 });
  const [verseRef, verseVisible] = useInView({ threshold: 0.2 });
  const [eventsRef, eventsVisible] = useInView({ threshold: 0.1 });
  const [ministriesRef, ministriesVisible] = useInView({ threshold: 0.1 });
  const [galleryRef, galleryVisible] = useInView({ threshold: 0.1 });
  const [testimonialsRef, testimonialsVisible] = useInView({ threshold: 0.1 });
  const [givingRef, givingVisible] = useInView({ threshold: 0.1 });
  const [leadershipRef, leadershipVisible] = useInView({ threshold: 0.1 });
  const [groupsRef, groupsVisible] = useInView({ threshold: 0.1 });
  const [faqsRef, faqsVisible] = useInView({ threshold: 0.1 });

  const [prayers, setPrayers] = useState(initialPrayers);
  const [prayerForm, setPrayerForm] = useState({ name: "", request: "" });
  const [showPrayerModal, setShowPrayerModal] = useState(false);

  const handlePrayerSubmit = async (e) => {
    e.preventDefault();
    if (!prayerForm.request.trim()) {
      Swal.fire({ icon: "warning", title: "Please write your prayer request" });
      return;
    }
    const newPrayer = {
      id: Date.now(),
      name: prayerForm.name.trim() || "Anonymous",
      request: prayerForm.request.trim(),
      prayers: 0,
    };
    setPrayers((p) => [newPrayer, ...p]);
    setPrayerForm({ name: "", request: "" });
    setShowPrayerModal(false);
    Swal.fire({
      icon: "success",
      title: "Prayer Submitted",
      text: "We will stand with you in prayer.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const incrementPrayer = (id) => {
    setPrayers((prev) => prev.map((p) => (p.id === id ? { ...p, prayers: p.prayers + 1 } : p)));
  };

  const [showFab, setShowFab] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setShowFab(true), 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <main className={`home ${isDarkMode ? "theme-dark" : "theme-light"}`}>
      <a href="#hero" className="skip-link">Skip to content</a>

      {/* THEME TOGGLE BUTTON */}
      <button 
        className="theme-toggle-btn" 
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      <section id="hero" className={`hero ${heroVisible ? "is-visible" : ""}`} ref={heroRef}>
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__eyebrow">{SITE.tagline}</p>
          <h1 className="hero__title">
            Welcome to <span>{SITE.fullName}</span>
          </h1>
          <p className="hero__subtitle">
            A community of believers committed to knowing Christ, growing together,
            serving others, and sharing the hope of the Gospel.
          </p>
          <div className="hero__cta">
            <Link to="/contact" className="btn-gold">Plan Your Visit</Link>
            <Link to="/about" className="btn-outline-gold">Learn More</Link>
          </div>
        </div>
        <div className="hero__lang">
          <LanguageSwitcher />
        </div>
      </section>

      <div className="marquee" ref={marqueeRef} aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeMessages, ...marqueeMessages].map((m, i) => (
            <span key={i} className="marquee__item">{m}</span>
          ))}
        </div>
      </div>

      <section className={`verse-of-day anim-fade-up ${verseVisible ? "visible" : ""}`} ref={verseRef}>
        <p className="verse-of-day__eyebrow">Today's Verse</p>
        <blockquote className="verse-of-day__text">"{verseOfDay.text}"</blockquote>
        <cite className="verse-of-day__ref">— {verseOfDay.ref}</cite>
      </section>

      <section className="stats">
        <div className="stats-grid">
          {statsData.map((s, i) => (
            <div
              key={s.label}
              className={`stat-card anim-fade-up delay-${(i % 4) + 1} ${statsVisible ? "visible" : ""}`}
              ref={(el) => (statRefs.current[i] = el)}
            >
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={`upcoming anim-fade-up ${eventsVisible ? "visible" : ""}`} ref={eventsRef}>
        <h2 className="section-title centered">Upcoming Events</h2>
        <span className="gold-rule centered" />
        <div className="upcoming-grid">
          {upcomingEvents.map((ev, i) => (
            <article key={ev.id} className={`event-card delay-${(i % 3) + 1}`}>
              <div className="event-card__date">{ev.date}</div>
              <h3 className="event-card__title">{ev.title}</h3>
              <p className="event-card__meta">
                🕒 {ev.time} <br /> 📍 {ev.location}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={`ministries anim-fade-up ${ministriesVisible ? "visible" : ""}`} ref={ministriesRef}>
        <h2 className="section-title on-dark centered">Our Ministries</h2>
        <span className="gold-rule centered" />
        <div className="ministry-grid">
          {ministries.map((m, i) => (
            <div key={m.title} className={`ministry-card delay-${(i % 4) + 1}`}>
              <div className="ministry-icon">
                <img src={m.icon} alt="" aria-hidden="true" />
              </div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={galleryRef} className={`gallery-wrap anim-fade-up ${galleryVisible ? "visible" : ""}`}>
        <MediaGallery items={fullMediaItems} />
      </section>    

      <section className="prayer-wall">
        <div className="prayer-wall__header">
          <h2 className="section-title centered">Prayer Wall</h2>
          <span className="gold-rule centered" />
          <p className="prayer-wall__desc">
            Share a request and stand together in faith.
          </p>
          <button className="btn-gold" onClick={() => setShowPrayerModal(true)}>
            <FaPrayingHands /> Submit a Prayer
          </button>
        </div>
        <div className="prayer-grid">
          {prayers.map((p) => (
            <article key={p.id} className="prayer-card">
              <p className="prayer-card__name">{p.name}</p>
              <p className="prayer-card__request">{p.request}</p>
              <button className="prayer-card__btn" onClick={() => incrementPrayer(p.id)}>
                🙏 Praying • {p.prayers}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={`testimonials anim-fade-up ${testimonialsVisible ? "visible" : ""}`} ref={testimonialsRef}>
        <h2 className="section-title centered">Testimonials</h2>
        <span className="gold-rule centered" />
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <blockquote key={i} className={`testimonial-card delay-${(i % 3) + 1}`}>
              <p>"{t.quote}"</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className={`giving anim-fade-up ${givingVisible ? "visible" : ""}`} ref={givingRef}>
        <h2 className="section-title on-dark centered">
          <FaDonate /> Giving
        </h2>
        <span className="gold-rule centered" />
        <p className="giving__desc">
          Your generosity helps us reach more lives with the Gospel.
        </p>
        <div className="giving-grid">
          {givingOptions.map((g, i) => (
            g.type === "image" && (
              <img key={i} src={g.src} alt={g.alt} className="giving-image" loading="lazy" />
            )
          ))}
        </div>
      </section>

      <section className={`leadership anim-fade-up ${leadershipVisible ? "visible" : ""}`} ref={leadershipRef}>
        <h2 className="section-title centered">Leadership Team</h2>
        <span className="gold-rule centered" />
        <div className="leadership-grid">
          {leadershipTeam.map((l, i) => (
            <div key={l.name} className={`leader-card delay-${(i % 3) + 1}`}>
              <img src={l.img} alt={l.name} loading="lazy" />
              <h3>{l.name}</h3>
              <p className="leader-role">{l.role}</p>
              <p className="leader-bio">{l.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`small-groups anim-fade-up ${groupsVisible ? "visible" : ""}`} ref={groupsRef}>
        <h2 className="section-title centered">Small Groups</h2>
        <span className="gold-rule centered" />
        <div className="groups-grid">
          {smallGroups.map((g, i) => (
            <div key={g.name} className={`group-card delay-${(i % 4) + 1}`}>
              <span className="group-icon">{g.icon}</span>
              <h3>{g.name}</h3>
              <p>🕒 {g.when}</p>
              <p>📍 {g.where}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`faqs anim-fade-up ${faqsVisible ? "visible" : ""}`} ref={faqsRef}>
        <h2 className="section-title centered">Plan Your Visit</h2>
        <span className="gold-rule centered" />
        <div className="faq-grid">
          {visitFaqs.map((f, i) => (
            <details key={i} className={`faq-item delay-${(i % 4) + 1}`}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <AnnouncementBoard />
      <BirthdayCelebrants />

     {showFab && (
  <div className="home-fab">

    {/* Start Meeting */}
    <Link
      to="/meeting"
      className="home-fab__btn home-fab__btn--meeting"
      aria-label="Start or Join Meeting"
      title="Start or Join Meeting"
    >
      <FaVideo />
    </Link>

    {/* Chat */}
    <Link
      to="/chatbot"
      className="home-fab__btn"
      aria-label="Chat with us"
      title="Chat with us"
    >
      <FaComments />
    </Link>

    {/* WhatsApp */}
    <a
      href={`https://wa.me/${SITE.whatsapp}`}
      className="home-fab__btn home-fab__btn--wa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      title="WhatsApp"
    >
      <FaWhatsapp />
    </a>

  </div>
)}

      {showPrayerModal && (
        <div className="prayer-modal-overlay" onClick={() => setShowPrayerModal(false)}>
          <form
            className="prayer-modal"
            onSubmit={handlePrayerSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="prayer-modal__close"
              onClick={() => setShowPrayerModal(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h3>Submit a Prayer Request</h3>
            <label>
              Your Name (optional)
              <input
                type="text"
                value={prayerForm.name}
                onChange={(e) => setPrayerForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Anonymous"
              />
            </label>
            <label>
              Prayer Request
              <textarea
                value={prayerForm.request}
                onChange={(e) => setPrayerForm((p) => ({ ...p, request: e.target.value }))}
                placeholder="How can we pray with you?"
                required
              />
            </label>
            <button type="submit" className="btn-gold">Submit Prayer</button>
          </form>
        </div>
      )}

      <Footer />
    </main>
  );
}