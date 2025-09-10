import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "@/locales/en/translation.json";
import translationDE from "@/locales/de/translation.json";
import translationPL from "@/locales/pl/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  pl: {
    translation: translationPL,
  },
};

// "Opakowujemy" inicjalizację w funkcję, aby mieć nad nią pełną kontrolę
export const initializeI18n = () => {
  // Dodajemy zabezpieczenie, aby mieć 100% pewności
  if (i18n.isInitialized) {
    return;
  }

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      // Wyłączamy debugowanie w tej finalnej wersji, chyba że go potrzebujesz
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["path", "cookie", "localStorage", "navigator", "htmlTag"],
        lookupFromPathIndex: 0,
      },
    });
};

export default i18n;
