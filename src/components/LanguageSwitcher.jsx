import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const next = i18n.language === "ar" ? "en" : "ar";
  const label = i18n.language === "ar" ? "EN" : "AR";

  return (
    <button
      className="lang-switcher"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={`Switch language to ${next.toUpperCase()}`}
    >
      {label}
    </button>
  );
}