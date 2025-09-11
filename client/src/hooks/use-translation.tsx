import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function useTranslationSetup() {
  const { i18n, t } = useTranslation();
  const [location, setLocation] = useLocation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const switchLanguage = (newLang: string) => {
    const oldLang = currentLanguage;
    if (newLang === oldLang) return;

    const pathSegments = location.split("/").filter(Boolean);

    // Przypadek 1: Jesteśmy na stronie głównej
    if (pathSegments.length <= 1) {
      setLocation(`/${newLang}`);
      return;
    }

    const oldSlug = pathSegments[1];
    const allRoutes = t("routes", {
      lng: oldLang,
      returnObjects: true,
    }) as Record<string, any>;
    let canonicalKey: string | undefined;

    // Znajdź kanoniczny klucz trasy (np. "privacy", "terms")
    Object.keys(allRoutes).forEach((key) => {
      if (typeof allRoutes[key] === "string" && allRoutes[key] === oldSlug) {
        canonicalKey = key;
      }
    });

    if (canonicalKey) {
      const newSlug = t(`routes.${canonicalKey}`, { lng: newLang });
      let newPath = `/${newLang}/${newSlug}`;

      // Obsługa zagnieżdżonych slugów, np. /heritage/:slug
      if (canonicalKey === "heritage" && pathSegments.length > 2) {
        const oldSubSlug = pathSegments[2];
        const heritageSlugs = allRoutes.heritage_slugs as Record<
          string,
          string
        >;
        const canonicalSubKey = Object.keys(heritageSlugs).find(
          (key) => heritageSlugs[key] === oldSubSlug
        );

        if (canonicalSubKey) {
          const newSubSlug = t(`routes.heritage_slugs.${canonicalSubKey}`, {
            lng: newLang,
          });
          newPath += `/${newSubSlug}`;
        }
      }
      setLocation(newPath);
    } else {
      // Jeśli nie znajdziemy dopasowania, wracamy do strony głównej
      setLocation(`/${newLang}`);
    }
  };

  return {
    changeLanguage: switchLanguage,
    currentLanguage: i18n.language,
  };
}
