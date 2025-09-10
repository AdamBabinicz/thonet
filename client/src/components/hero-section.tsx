import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 lg:py-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-accent/10"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-muted-foreground text-sm italic max-w-2xl"
              >
                &quot;{t("common.disclaimerNotice")}&quot;
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm font-medium text-primary uppercase tracking-wider"
                data-testid="text-hero-subtitle"
              >
                {t("hero.subtitle")}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl lg:text-6xl font-bold text-foreground leading-tight font-serif"
                data-testid="text-hero-title"
              >
                {t("hero.title")}
                <span
                  className="block text-primary"
                  data-testid="text-hero-title-accent"
                >
                  {t("hero.titleAccent")}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
                data-testid="text-hero-description"
              >
                {t("hero.description")}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection("interactive-modules")}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                data-testid="button-explore"
              >
                {t("hero.exploreButton")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection("biography")}
                className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                data-testid="button-biography"
              >
                {t("hero.biographyButton")}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="relative lg:max-w-xl mx-auto self-center"
          >
            <div className="relative group overflow-hidden rounded-lg shadow-2xl sm:my-10">
              <img
                src="/12.avif"
                alt={t("hero.imageAlt")}
                className="w-full h-auto filter sepia-[0.3]"
                data-testid="img-hero-portrait"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute inset-0 p-4 bg-black/40 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white max-w-xs">
                  <Info className="w-8 h-8 mx-auto mb-3" />
                  <p className="text-base font-semibold">
                    {t("hero.aiNotice.text")}
                  </p>
                  <p className="text-xs text-white/70 mt-4">
                    {t("hero.aiNotice.sourceTitle")}
                  </p>
                  <p className="text-xs text-white/70 font-mono mt-1">
                    {t("hero.aiNotice.sourceAttribution")}
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl -z-10"
            ></motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
