import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function useTranslationSetup() {
  const { i18n, t } = useTranslation();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const switchLanguage = (newLang: string) => {
    const currentLang = i18n.language;

    const currentPrivacyPath = t("routes.privacy");
    const currentTermsPath = t("routes.terms");
    const currentHeritagePath = t("routes.heritage");
    const currentSlugs = t("routes.heritage_slugs", {
      returnObjects: true,
    }) as Record<string, string>;

    let newPath = `/${newLang}`;

    const onPath = (pathSegment: string) =>
      location.startsWith(`/${currentLang}/${pathSegment}`);

    if (onPath(currentPrivacyPath)) {
      newPath = `/${newLang}/${t("routes.privacy", { lng: newLang })}`;
    } else if (onPath(currentTermsPath)) {
      newPath = `/${newLang}/${t("routes.terms", { lng: newLang })}`;
    } else if (onPath(currentHeritagePath)) {
      const pathParts = location.split("/");
      const currentLocalizedSlug = pathParts[pathParts.length - 1];

      const canonicalSlug = Object.keys(currentSlugs).find(
        (key) => currentSlugs[key] === currentLocalizedSlug
      );

      if (canonicalSlug) {
        const newHeritagePath = t("routes.heritage", { lng: newLang });
        const newLocalizedSlug = t(`routes.heritage_slugs.${canonicalSlug}`, {
          lng: newLang,
        });
        newPath = `/${newLang}/${newHeritagePath}/${newLocalizedSlug}`;
      }
    }

    setLocation(newPath);
  };

  return {
    changeLanguage: switchLanguage,
    currentLanguage: i18n.language,
  };
}
