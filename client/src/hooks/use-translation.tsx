import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useTranslationSetup() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update document lang attribute when language changes
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return { changeLanguage, currentLanguage: i18n.language };
}
