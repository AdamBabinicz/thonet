import { useEffect } from "react";
import { useParams } from "wouter";
import { useTranslation } from "react-i18next";

// Ten komponent nie renderuje nic widocznego.
// Jego jedynym zadaniem jest synchronizacja języka.
export function LanguageSyncManager() {
  const params = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    const langFromUrl = params.lang;

    // Jeśli w URL jest poprawny język i jest on inny niż aktywny, zmień go.
    if (langFromUrl && i18n.language !== langFromUrl) {
      i18n.changeLanguage(langFromUrl);
    }
  }, [params.lang, i18n]);

  return null; // Nie renderujemy nic na ekranie
}
