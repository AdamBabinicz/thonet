import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Sun, Moon, Contrast, Home, User, Cpu, Award, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/use-theme";
import { useTranslationSetup } from "@/hooks/use-translation";

interface ControlHubProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ControlHub({ isOpen, onToggle }: ControlHubProps) {
  const { t } = useTranslation();
  const { theme, setTheme, isHighContrast, toggleHighContrast } = useTheme();
  const { changeLanguage, currentLanguage } = useTranslationSetup();
  const hubRef = useRef<HTMLDivElement>(null);
  const [announceMessage, setAnnounceMessage] = useState("");

  // Focus trap effect
  useEffect(() => {
    if (isOpen && hubRef.current) {
      const focusableElements = hubRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
        if (e.key === 'Escape') {
          onToggle();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onToggle]);

  const announceToScreenReader = (message: string) => {
    setAnnounceMessage(message);
    setTimeout(() => setAnnounceMessage(""), 1000);
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    announceToScreenReader(t('aria.themeChanged', { theme: newTheme === 'dark' ? t('controlHub.darkTheme') : t('controlHub.lightTheme') }));
  };

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    announceToScreenReader(
      isHighContrast ? t('aria.highContrastDisabled') : t('aria.highContrastEnabled')
    );
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onToggle();
    }
  };

  const navigationItems = [
    { id: 'hero', icon: Home, labelKey: 'navigation.home' },
    { id: 'biography', icon: User, labelKey: 'navigation.biography' },
    { id: 'interactive-modules', icon: Cpu, labelKey: 'navigation.interactiveModules' },
    { id: 'heritage', icon: Award, labelKey: 'navigation.heritage' },
    { id: 'timeline', icon: Clock, labelKey: 'navigation.timeline' },
  ];

  const languages = [
    { code: 'pl', name: 'Polski', flag: 'flag-pl' },
    { code: 'en', name: 'English', flag: 'flag-en' },
    { code: 'de', name: 'Deutsch', flag: 'flag-de' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-40 p-3 bg-primary text-primary-foreground rounded-md shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        aria-label={isOpen ? t('controlHub.close') : t('controlHub.open')}
        aria-expanded={isOpen}
        aria-controls="control-hub"
        data-testid="button-toggle-hub"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 z-40"
            data-testid="backdrop-control-hub"
          />
        )}
      </AnimatePresence>

      {/* Control Hub Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={hubRef}
            id="control-hub"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 shadow-xl overflow-y-auto"
            aria-label={t('controlHub.title')}
            data-testid="panel-control-hub"
          >
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-card-foreground" data-testid="text-hub-title">
                  {t('controlHub.title')}
                </h2>
                <button
                  onClick={onToggle}
                  className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label={t('controlHub.close')}
                  data-testid="button-close-hub"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav role="navigation" aria-label={t('controlHub.sections')}>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t('controlHub.sections')}
                </h3>
                <ul className="space-y-2">
                  {navigationItems.map(({ id, icon: Icon, labelKey }) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className="w-full flex items-center px-3 py-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-colors text-left"
                        data-testid={`link-${id}`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {t(labelKey)}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Language Switcher */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t('controlHub.language')}
                </h3>
                <div className="space-y-2" role="group" aria-label={t('controlHub.language')}>
                  {languages.map(({ code, name, flag }) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`w-full flex items-center px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                        currentLanguage === code
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                      aria-current={currentLanguage === code ? 'true' : 'false'}
                      aria-label={currentLanguage === code ? t('controlHub.currentLanguage') : `Change language to ${name}`}
                      data-testid={`button-language-${code}`}
                    >
                      <span className={`language-flag ${flag}`}></span>
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Switcher */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t('controlHub.theme')}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`w-full flex items-center px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                      theme === 'light'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    aria-current={theme === 'light' ? 'true' : 'false'}
                    aria-label={theme === 'light' ? t('controlHub.currentThemeLight') : t('controlHub.switchToLight')}
                    data-testid="button-theme-light"
                  >
                    <Sun className="w-4 h-4 mr-3" />
                    {t('controlHub.lightTheme')}
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`w-full flex items-center px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                      theme === 'dark'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    aria-current={theme === 'dark' ? 'true' : 'false'}
                    aria-label={theme === 'dark' ? t('controlHub.currentThemeDark') : t('controlHub.switchToDark')}
                    data-testid="button-theme-dark"
                  >
                    <Moon className="w-4 h-4 mr-3" />
                    {t('controlHub.darkTheme')}
                  </button>
                </div>
              </div>

              {/* Accessibility Controls */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t('controlHub.accessibility')}
                </h3>
                <button
                  onClick={handleHighContrastToggle}
                  className="w-full flex items-center px-3 py-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  aria-label={isHighContrast ? t('controlHub.disableHighContrast') : t('controlHub.enableHighContrast')}
                  aria-pressed={isHighContrast}
                  data-testid="button-high-contrast"
                >
                  <Contrast className="w-4 h-4 mr-3" />
                  {t('controlHub.highContrast')}
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Screen Reader Announcements */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        data-testid="aria-announcements"
      >
        {announceMessage}
      </div>
    </>
  );
}
