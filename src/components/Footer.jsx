import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SITE } from "../config/site";
import "./Footer.css";

import BethelLogo from "../icons/BethelBaptistLogo.png";

export default function Footer() {
  const { t } = useTranslation();

  const links = [
    { to: "/",         label: t("nav.home") },
    { to: "/about",    label: t("nav.about") },
    { to: "/services", label: t("nav.ministries") },
    { to: "/contact",  label: t("nav.contact") },
  ];

  return (
    <footer className="footer">
      <div className="footer__quote">
        <div className="footer__quote-inner">
          <p className="footer__quote-text">
            "Tenaciously, the pursuit of excellence defines every engagement.
            We stand beside our community through every challenge — in faith,
            hope, and love."
          </p>
          <span className="footer__quote-attr">— {SITE.fullName}</span>
        </div>
      </div>

      <div className="footer__nav">
        <div className="footer__nav-inner">
          <Link to="/" className="footer__logo" aria-label={SITE.fullName}>
            <span className="footer__logo-mark">
              <img src={BethelLogo} alt={`${SITE.fullName} Logo`} />
            </span>
            <span className="footer__logo-text">
              <span className="footer__brand">{SITE.fullName}</span>
              <span className="footer__sub">{SITE.tagline}</span>
            </span>
          </Link>

          <ul className="footer__links">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="footer__link">{l.label}</Link>
              </li>
            ))}
          </ul>

          <p className="footer__copy">
            © {new Date().getFullYear()} {SITE.fullName}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}