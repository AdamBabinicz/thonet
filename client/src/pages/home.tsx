import { SEOHead } from "@/components/seo-head";
import { HeroSection } from "@/components/hero-section";
import { BiographySection } from "@/components/biography-section";
import { InteractiveModulesSection } from "@/components/interactive-modules-section";
import { HeritageSection } from "@/components/heritage-section";
import { TimelineSection } from "@/components/timeline-section";
import { FooterSection } from "@/components/footer-section";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

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
    </>
  );
}
