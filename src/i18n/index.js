import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
const initialLang = stored || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const applyLangAttrs = (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  }
};
applyLangAttrs(initialLang);
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
  applyLangAttrs(lng);
});

export default i18n;