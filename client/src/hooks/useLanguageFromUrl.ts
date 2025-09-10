import { useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

const SUPPORTED_LANGS = ["pl", "en", "de"];

export function useLanguageFromUrl() {
  const [location, setLocation] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const langFromUrl = location.split("/")[1];

    if (langFromUrl && SUPPORTED_LANGS.includes(langFromUrl)) {
      if (i18n.language !== langFromUrl) {
        i18n.changeLanguage(langFromUrl);
      }
    } else {
      // Jeśli jesteśmy na stronie głównej ('/') bez języka,
      // przekieruj na wersję z domyślnym językiem.
      const defaultLang = i18n.language.split("-")[0]; // np. 'pl-PL' -> 'pl'
      if (location === "/") {
        setLocation(`/${defaultLang}`, { replace: true });
      }
    }
  }, [location, i18n, setLocation]);
}
