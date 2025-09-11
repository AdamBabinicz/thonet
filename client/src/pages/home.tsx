import { SEOHead } from "@/components/seo-head";
import { HeroSection } from "@/components/hero-section";
import { useTranslation } from "react-i18next";
import { useState, useEffect, lazy, Suspense, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { homeSections, SectionConfig } from "@/config/sections";
import { ActiveSectionContext } from "@/contexts/ActiveSectionContext";

const FooterSection = lazy(() =>
  import("@/components/footer-section").then((module) => ({
    default: module.FooterSection,
  }))
);

const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center bg-background">
    <div
      className="spinner text-muted-foreground"
      role="status"
      aria-label="Ładowanie sekcji"
    ></div>
  </div>
);

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default function Home() {
  const { t } = useTranslation();
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isScrollTopVisible, setScrollTopVisible] = useState(false);
  const [location] = useLocation();
  const { setActiveSection, isScrollTrackingEnabled } =
    useContext(ActiveSectionContext);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const personSchema = {
    name: "Michael Thonet",
    birthDate: "1796-07-02",
    deathDate: "1871-03-03",
    jobTitle: t("hero.imageAlt"),
    description: t("biography.description"),
    birthPlace: {
      "@type": "Place",
      name: t("locations.boppard.title"),
    },
    deathPlace: {
      "@type": "Place",
      name: t("locations.vienna.title"),
    },
    url: "https://wizjoner.netlify.app/pl",
    image: "https://wizjoner.netlify.app/15.png",
  };

  const productSchema = {
    name: t("heritage.chair14.title"),
    description: t("heritage.chair14.description"),
    image: "https://wizjoner.netlify.app/2.avif",
    brand: {
      "@type": "Brand",
      name: "Thonet",
    },
    manufacturer: {
      "@type": "Person",
      name: "Michael Thonet",
    },
    productionDate: "1859",
    category: "Krzesła",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isScrollTrackingEnabled) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentRefs.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [setActiveSection, isScrollTrackingEnabled]);

  const toggleScrollTopVisibility = () => {
    setScrollTopVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const hash = location.split("#")[1];
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", toggleScrollTopVisibility);

    const hasSeenPopup = sessionStorage.getItem("welcomePopupSeen");
    let popupTimer: NodeJS.Timeout | null = null;
    let checkInterval: NodeJS.Timeout | null = null;

    if (!hasSeenPopup) {
      const showPopup = () => {
        setShowWelcomePopup(true);
        sessionStorage.setItem("welcomePopupSeen", "true");
      };

      const isCookieBannerActive = () => {
        const banner = document.getElementById("cookiescript_injected");
        // Poprawiony warunek: sprawdza, czy element istnieje ORAZ czy jest widoczny na stronie.
        // `offsetParent` ma wartość `null` dla elementów ukrytych przez `display: none`.
        return banner !== null && banner.offsetParent !== null;
      };

      popupTimer = setTimeout(() => {
        if (isCookieBannerActive()) {
          checkInterval = setInterval(() => {
            if (!isCookieBannerActive()) {
              if (checkInterval) clearInterval(checkInterval);
              showPopup();
            }
          }, 500);
        } else {
          showPopup();
        }
      }, 500);
    }

    // Poprawiona funkcja czyszcząca: jest jedna i obsługuje zarówno scroll, jak i timery.
    // Uruchomi się zawsze, gdy komponent będzie odmontowywany.
    return () => {
      window.removeEventListener("scroll", toggleScrollTopVisibility);
      if (popupTimer) clearTimeout(popupTimer);
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <SEOHead
        isHomePage={true}
        titleKey="seo.defaultDescription"
        descriptionKey="seo.defaultDescription"
        schemaData={[
          { type: "Person", data: personSchema },
          { type: "Product", data: productSchema },
        ]}
      />
      <a
        href="#main-content"
        className="skip-link focus:outline-none focus:ring-2 focus:ring-ring"
        data-testid="link-skip-content"
      >
        {t("navigation.skipToContent")}
      </a>
      <main id="main-content" className="transition-all duration-300">
        <section
          id="hero"
          aria-labelledby="hero-title"
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <HeroSection />
        </section>

        {homeSections.map(
          ({ id, component: Component }: SectionConfig, index) => (
            <section
              key={id}
              id={id}
              aria-labelledby={`${id}-title`}
              ref={(el) => (sectionRefs.current[index + 1] = el)}
            >
              <Suspense fallback={<SectionLoader />}>
                <Component />
              </Suspense>
            </section>
          )
        )}
      </main>
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>
      <div
        id="aria-announcements"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        data-testid="aria-announcements"
      ></div>
      <Dialog open={showWelcomePopup} onOpenChange={setShowWelcomePopup}>
        <DialogContent className="w-[95vw] sm:w-full sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary font-serif">
              {t("popup.title")}
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 pt-4 text-sm leading-relaxed text-muted-foreground">
                <p>{t("popup.mainText")}</p>
                <p className="font-semibold text-foreground">
                  {t("popup.dedication")}
                </p>
                <p className="text-xs italic pt-2">{t("popup.disclaimer")}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        {isScrollTopVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            aria-label={t("common.scrollToTop")}
            data-testid="button-scroll-top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
