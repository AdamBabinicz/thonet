import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

export const initializeI18n = () => {
  if (i18n.isInitialized) {
    return;
  }

  i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: ["en", "pl", "de"],
      fallbackLng: "pl",
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["path", "cookie", "localStorage", "navigator", "htmlTag"],
        lookupFromPathIndex: 0,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    });
};

export default i18n;
