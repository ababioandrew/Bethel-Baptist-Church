import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "../hooks/useInView";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { IconPhone, IconMail, IconMapPin } from "../components/Icons";
import { SITE } from "../config/site";
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const [headingRef, headingVisible] = useInView({ threshold: 0.2 });
  const [infoRef, infoVisible] = useInView({ threshold: 0.15 });
  const [formRef, formVisible] = useInView({ threshold: 0.15 });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="contact-page">
      <PageHeader
        label={t("contact.header.label")}
        title={t("contact.header.title")}
        subtitle={t("contact.header.subtitle")}
        bg="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=85"
      />

      <div className="contact-band">
        <div className="contact-band-inner">
          <div className="contact-band-item">
            <span className="band-icon"><IconPhone size={14} /></span>
            <span>{SITE.phonePrimary} / {SITE.phoneSecondary}</span>
          </div>
          <div className="contact-band-item">
            <span className="band-icon"><IconMail size={14} /></span>
            <span>{SITE.email}</span>
          </div>
        </div>
      </div>

      <section className="contact-main">
        <div className="contact-main-inner">
          <div
            ref={headingRef}
            className={`contact-heading anim-fade-up ${headingVisible ? "visible" : ""}`}
          >
            <p className="section-eyebrow centered">{t("contact.heading.eyebrow")}</p>
            <h2 className="section-title centered">{t("contact.heading.title")}</h2>
            <span className="gold-rule centered" />
            <p className="contact-intro">{t("contact.heading.intro")}</p>
          </div>

          <div className="contact-grid">
            <div
              ref={infoRef}
              className={`contact-info anim-slide-left ${infoVisible ? "visible" : ""}`}
            >
              <div className="contact-info-item">
                <div className="ci-icon"><IconMapPin size={18} /></div>
                <div>
                  <p className="ci-label">{t("contact.info.location")}</p>
                  <p className="ci-value">
                    {SITE.address.line1},<br />
                    {SITE.address.line2}<br />
                    {SITE.address.country}
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="ci-icon"><IconPhone size={18} /></div>
                <div>
                  <p className="ci-label">{t("contact.info.phone")}</p>
                  <p className="ci-value">{SITE.phonePrimary}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="ci-icon"><IconMail size={18} /></div>
                <div>
                  <p className="ci-label">{t("contact.info.email")}</p>
                  <p className="ci-value">{SITE.email}</p>
                </div>
              </div>

              <div className="contact-service-times">
                <div className="service-times-icon" aria-hidden="true">✝</div>
                <div>
                  <p className="ci-label">{t("contact.info.services")}</p>
                  {SITE.serviceTimes.map((s) => (
                    <p className="ci-value" key={s.label}>
                      {s.label}<br />{s.time}
                    </p>
                  ))}
                </div>
              </div>

              <div className="map-container">
                <iframe
                  title={t("contact.info.mapTitle")}
                  src={SITE.mapEmbed}
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://goo.gl/maps/tema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold map-btn"
                >
                  {t("contact.info.directions")}
                </a>
              </div>
            </div>

            <div
              ref={formRef}
              className={`contact-form-col anim-slide-right ${formVisible ? "visible" : ""}`}
            >
              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon" aria-hidden="true">✓</div>
                  <h3>{t("contact.success.title")}</h3>
                  <p>{t("contact.success.desc")}</p>
                  <button className="btn-gold" style={{ marginTop: 24 }} onClick={reset}>
                    {t("contact.success.again")}
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-form-heading">
                    <p className="section-eyebrow">{t("contact.form.eyebrow")}</p>
                    <h3>{t("contact.form.title")}</h3>
                    <p>{t("contact.form.desc")}</p>
                  </div>

                  <div className="form-field">
                    <label htmlFor="name">{t("contact.form.name")}</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">{t("contact.form.email")}</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">{t("contact.form.phone")}</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder={t("contact.form.phonePlaceholder")}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">{t("contact.form.message")}</label>
                    <textarea
                      id="message" name="message" required
                      value={form.message} onChange={handleChange}
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>

                  <button type="submit" className="btn-gold form-submit">
                    {t("contact.form.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}