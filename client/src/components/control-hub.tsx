import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Menu,
  Sun,
  Moon,
  Contrast,
  Home,
  Github,
  Facebook,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/use-theme";
import { useTranslationSetup } from "@/hooks/use-translation";
import { useLocation } from "wouter";
import { homeSections } from "@/config/sections";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1227"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6902H306.615L611.412 515.685L658.88 583.579L1055.08 1150.31H892.476L569.165 687.854V687.828Z" />
  </svg>
);

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
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isOpen && hubRef.current) {
      const focusableElements = hubRef.current.querySelectorAll(
        'button, a, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
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
        if (e.key === "Escape") {
          onToggle();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      firstElement?.focus();

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onToggle]);

  const announceToScreenReader = (message: string) => {
    setAnnounceMessage(message);
    setTimeout(() => setAnnounceMessage(""), 1000);
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    if (isHighContrast) {
      toggleHighContrast();
    }
    setTheme(newTheme);
    announceToScreenReader(
      t("aria.themeChanged", {
        theme:
          newTheme === "dark"
            ? t("controlHub.darkTheme")
            : t("controlHub.lightTheme"),
      })
    );
    setTimeout(() => {
      onToggle();
    }, 200);
  };

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    announceToScreenReader(
      isHighContrast
        ? t("aria.highContrastDisabled")
        : t("aria.highContrastEnabled")
    );
    setTimeout(() => {
      onToggle();
    }, 200);
  };

  const handleLanguageChange = (newLang: string) => {
    if (currentLanguage === newLang) {
      onToggle();
      return;
    }
    changeLanguage(newLang);
    setTimeout(() => {
      onToggle();
    }, 200);
  };

  const handleSectionNavigation = (sectionId: string) => {
    setLocation(`/${currentLanguage}/#${sectionId}`);
    onToggle();
  };

  const languages = [
    { code: "pl", name: "Polski", flag: "flag-pl" },
    { code: "en", name: "English", flag: "flag-en" },
    { code: "de", name: "Deutsch", flag: "flag-de" },
  ];

  const socialLinks = [
    {
      href: "https://github.com/AdamBabinicz",
      labelKey: "aria.github",
      Icon: Github,
    },
    { href: "https://x.com/AdamBabinicz", labelKey: "aria.x", Icon: XIcon },
    {
      href: "https://www.facebook.com/adam.gierczak.334",
      labelKey: "aria.facebook",
      Icon: Facebook,
    },
  ];

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-40 p-3 bg-primary text-primary-foreground rounded-md shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        aria-label={isOpen ? t("controlHub.close") : t("controlHub.open")}
        aria-expanded={isOpen}
        aria-controls="control-hub"
        data-testid="button-toggle-hub"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

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

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={hubRef}
            id="control-hub"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 shadow-xl overflow-y-auto scrollbar-hide"
            aria-label={t("controlHub.title")}
            data-testid="panel-control-hub"
          >
            <div className="p-6 space-y-8">
              <div className="flex justify-between items-center">
                <h2
                  className="text-lg font-semibold text-card-foreground font-serif"
                  data-testid="text-hub-title"
                >
                  {t("controlHub.title")}
                </h2>
                <button
                  onClick={onToggle}
                  className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label={t("controlHub.close")}
                  data-testid="button-close-hub"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav role="navigation" aria-label={t("controlHub.sections")}>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t("controlHub.sections")}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleSectionNavigation("hero")}
                      className="w-full flex items-center px-3 py-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-colors text-left"
                      data-testid="link-hero"
                    >
                      <Home className="w-4 h-4 mr-3" />
                      {t("navigation.home")}
                    </button>
                  </li>
                  {homeSections.map(({ id, Icon, labelKey }) => (
                    <li key={id}>
                      <button
                        onClick={() => handleSectionNavigation(id)}
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

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t("controlHub.language")}
                </h3>
                <div
                  className="space-y-2"
                  role="group"
                  aria-label={t("controlHub.language")}
                >
                  {languages.map(({ code, name, flag }) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`w-full flex items-center px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                        currentLanguage === code
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      aria-current={currentLanguage === code ? "true" : "false"}
                      aria-label={
                        currentLanguage === code
                          ? t("controlHub.currentLanguage")
                          : t("controlHub.changeLanguageTo", { language: name })
                      }
                      data-testid={`button-language-${code}`}
                    >
                      <span className={`language-flag ${flag}`}></span>
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t("controlHub.theme")}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`w-full flex items-center px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                      theme === "light"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    aria-current={theme === "light" ? "true" : "false"}
                    aria-label={
                      theme === "light"
                        ? t("controlHub.currentThemeLight")
                        : t("controlHub.switchToLight")
                    }
                    data-testid="button-theme-light"
                  >
                    <Sun className="w-4 h-4 mr-3" />
                    {t("controlHub.lightTheme")}
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`w-full flex items-center px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                      theme === "dark"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    aria-current={theme === "dark" ? "true" : "false"}
                    aria-label={
                      theme === "dark"
                        ? t("controlHub.currentThemeDark")
                        : t("controlHub.switchToDark")
                    }
                    data-testid="button-theme-dark"
                  >
                    <Moon className="w-4 h-4 mr-3" />
                    {t("controlHub.darkTheme")}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t("controlHub.accessibility")}
                </h3>
                <button
                  onClick={handleHighContrastToggle}
                  className="w-full flex items-center px-3 py-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  aria-label={
                    isHighContrast
                      ? t("controlHub.disableHighContrast")
                      : t("controlHub.enableHighContrast")
                  }
                  aria-pressed={isHighContrast}
                  data-testid="button-high-contrast"
                >
                  <Contrast className="w-4 h-4 mr-3" />
                  {t("controlHub.highContrast")}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {t("controlHub.socials")}
                </h3>
                <div className="flex items-center space-x-4">
                  {socialLinks.map(({ href, labelKey, Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(labelKey)}
                      className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

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
