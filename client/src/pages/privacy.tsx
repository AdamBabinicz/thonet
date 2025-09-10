import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FooterSection } from "@/components/footer-section";
import { SEOHead } from "@/components/seo-head";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    "introduction",
    "dataAdmin",
    "dataScope",
    "dataPurpose",
    "cookies",
    "dataRetention",
    "thirdParty",
    "userRights",
    "policyChanges",
    "contact",
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <SEOHead
        title={t("privacy.title")}
        description={t("privacy.description")}
      />
      <main id="main-content" className="py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="mb-8">
            <a
              href={`/${lang}/`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("common.backToHome")}
            </a>
          </div>
          <header className="mb-12 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-primary">
              {t("privacy.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("privacy.lastUpdated")} {new Date().toLocaleDateString(lang)}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-primary">
            {sections.map((section) => (
              <section key={section} className="mb-8">
                <h2 className="text-2xl font-semibold">
                  {t(`privacy.${section}.title`)}
                </h2>
                <p>{t(`privacy.${section}.content`)}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </motion.div>
  );
}
