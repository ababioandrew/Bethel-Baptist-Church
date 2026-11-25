import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useInView } from "../hooks/useInView";
import { SITE } from "../config/site";
import "./About.css";

import BethelIcon from "../icons/BethelBaptistLogo.png";

const ministries = [
  {
    icon: BethelIcon,
    titleKey: "about.ministries.worship.title",
    descKey: "about.ministries.worship.desc",
  },
  {
    icon: BethelIcon,
    titleKey: "about.ministries.prayer.title",
    descKey: "about.ministries.prayer.desc",
  },
  {
    icon: BethelIcon,
    titleKey: "about.ministries.discipleship.title",
    descKey: "about.ministries.discipleship.desc",
  },
];

const values = [
  { titleKey: "about.values.faith.title",   descKey: "about.values.faith.desc" },
  { titleKey: "about.values.love.title",    descKey: "about.values.love.desc" },
  { titleKey: "about.values.service.title", descKey: "about.values.service.desc" },
  { titleKey: "about.values.unity.title",   descKey: "about.values.unity.desc" },
];

export default function About() {
  const { t } = useTranslation();
  const [textRef, textVisible] = useInView({ threshold: 0.15 });
  const [imgRef, imgVisible] = useInView({ threshold: 0.15 });
  const [ministriesRef, ministriesVisible] = useInView({ threshold: 0.1 });
  const [valuesRef, valuesVisible] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useInView({ threshold: 0.2 });

  return (
    <main className="about-page">
      <PageHeader
        label={t("about.header.label")}
        title={t("about.header.title", { name: SITE.fullName })}
        subtitle={t("about.header.subtitle")}
        bg="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=85"
      />

      <div className="about-nav-band">
        <div className="about-nav-inner">
          <span>{SITE.tagline}</span>
        </div>
      </div>

      <section className="about-main">
        <div className="about-main-inner">
          <div
            className={`about-text anim-slide-left ${textVisible ? "visible" : ""}`}
            ref={textRef}
          >
            <p className="section-eyebrow">{t("about.who.eyebrow")}</p>
            <h2 className="section-title">
              {t("about.who.titleLine1")}
              <br />
              {t("about.who.titleLine2")}
            </h2>
            <span className="gold-rule" />
            <p className="about-para">{t("about.who.p1")}</p>
            <p className="about-para">{t("about.who.p2")}</p>
            <p className="about-para">{t("about.who.p3")}</p>
          </div>

          <div
            className={`about-image-col anim-slide-right ${imgVisible ? "visible" : ""}`}
            ref={imgRef}
          >
            <img
              src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=900&q=85"
              alt={t("about.who.imageAlt")}
              className="about-img"
            />
          </div>
        </div>
      </section>

      <section className="about-services">
        <div className="about-services-inner" ref={ministriesRef}>
          {ministries.map((m, i) => (
            <div
              key={m.titleKey}
              className={`about-service-col anim-fade-up delay-${i + 1} ${ministriesVisible ? "visible" : ""}`}
            >
              <div className="about-service-icon">
                <img src={m.icon} alt="" aria-hidden="true" className="service-icon" />
              </div>
              <h3 className="about-service-title">{t(m.titleKey)}</h3>
              <p className="about-service-desc">{t(m.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="about-services-cta">
          <Link to="/services" className="btn-gold">
            {t("about.exploreMinistries")}
          </Link>
        </div>
      </section>

      <section className="values-section">
        <div className="values-inner">
          <div
            className={`values-header anim-fade-up ${valuesVisible ? "visible" : ""}`}
            ref={valuesRef}
          >
            <p className="section-eyebrow centered">{t("about.values.eyebrow")}</p>
            <h2 className="section-title on-dark centered">{t("about.values.title")}</h2>
            <span className="gold-rule centered" />
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div
                key={v.titleKey}
                className={`value-card anim-fade-up delay-${i + 1} ${valuesVisible ? "visible" : ""}`}
              >
                <div className="value-number">0{i + 1}</div>
                <h3 className="value-title">{t(v.titleKey)}</h3>
                <p className="value-desc">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-vision">
        <div className="about-vision-inner">
          <div className="vision-cross" aria-hidden="true">✝</div>
          <p className="section-eyebrow centered">{t("about.vision.eyebrow")}</p>
          <h2 className="vision-title">
            {t("about.vision.line1")}
            <br />
            {t("about.vision.line2")}
            <br />
            {t("about.vision.line3")}
          </h2>
          <span className="gold-rule centered" />
          <p className="vision-desc">{t("about.vision.desc")}</p>
        </div>
      </section>

      <section className="about-cta">
        <div
          className={`about-cta-inner anim-fade-up ${ctaVisible ? "visible" : ""}`}
          ref={ctaRef}
        >
          <p className="section-eyebrow centered">{t("about.cta.eyebrow")}</p>
          <h2 className="about-cta-title">{t("about.cta.title", { name: SITE.fullName })}</h2>
          <span className="gold-rule centered" />
          <p className="about-cta-desc">{t("about.cta.desc")}</p>
          <div className="about-cta-buttons">
            <Link to="/contact" className="btn-gold">{t("about.cta.primary")}</Link>
            <Link to="/services" className="btn-outline-gold">{t("about.cta.secondary")}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}