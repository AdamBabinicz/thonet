import { SEOHead } from "@/components/seo-head";
import { HeroSection } from "@/components/hero-section";
import { BiographySection } from "@/components/biography-section";
import { InteractiveModulesSection } from "@/components/interactive-modules-section";
import { HeritageSection } from "@/components/heritage-section";
import { TimelineSection } from "@/components/timeline-section";
import { FooterSection } from "@/components/footer-section";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Home() {
  const { t } = useTranslation();
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    // Show popup after a short delay to ensure smooth page load
    const timer = setTimeout(() => {
      setShowWelcomePopup(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEOHead />
      
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="skip-link focus:outline-none focus:ring-2 focus:ring-ring"
        data-testid="link-skip-content"
      >
        {t('navigation.skipToContent')}
      </a>

      {/* Main Content */}
      <main id="main-content" className="transition-all duration-300">
        <HeroSection />
        <BiographySection />
        <InteractiveModulesSection />
        <HeritageSection />
        <TimelineSection />
        <FooterSection />
      </main>

      {/* Accessibility announcements */}
      <div
        id="aria-announcements"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        data-testid="aria-announcements"
      ></div>

      {/* Welcome Popup */}
      <Dialog open={showWelcomePopup} onOpenChange={setShowWelcomePopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-primary">
              Thonet Digital Heritage
            </DialogTitle>
            <DialogDescription className="text-center pt-4 text-base leading-relaxed">
              Strona ta dedykowana jest kolekcjonerowi i restauratowi mebli giętych 
              <br />
              <strong className="text-primary">Pawłowi Michalskiemu</strong>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
