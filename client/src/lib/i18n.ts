// lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importuj swoje pliki JSON
import translationPL from "@/locales/pl/translation.json";
import translationEN from "@/locales/en/translation.json";
import translationDE from "@/locales/de/translation.json";

const resources = {
  pl: {
    translation: translationPL,
  },
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pl", // Upewnij się, że język zapasowy jest zdefiniowany
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
