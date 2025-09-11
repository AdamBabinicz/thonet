import { useEffect } from "react";
import { useParams, Redirect, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { FooterSection } from "@/components/footer-section";
import { SEOHead } from "@/components/seo-head";
import { ArrowLeft, Info } from "lucide-react";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";

const articleImages: { [key: string]: string } = {
  "technological-revolution": "/9.png",
  "design-democratization": "/10.png",
  "global-impact": "/11.png",
};

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default function HeritageArticle() {
  const params = useParams<{ slug?: string }>();
  const { t, i18n } = useTranslation();
  const [, setLocation] = useLocation();
  const localizedSlug = params.slug;
  const lang = i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHeritage = () => {
    setLocation(`/${lang}`);
    setTimeout(() => {
      const element = document.getElementById("heritage");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  if (!localizedSlug) {
    return <NotFound />;
  }

  const allSlugs = t("routes.heritage_slugs", {
    returnObjects: true,
  }) as Record<string, string>;

  const articleKey =
    typeof allSlugs === "object" && allSlugs !== null
      ? Object.keys(allSlugs).find((key) => allSlugs[key] === localizedSlug)
      : undefined;

  if (!articleKey || !(articleKey in articleImages)) {
    return <Redirect to="/404" />;
  }

  const i18nArticleKey = `heritageArticles.${articleKey}` as const;
  const articleImageSrc = articleImages[articleKey];

  const articleSchema = {
    headline: t(`${i18nArticleKey}.title`),
    description: t(`${i18nArticleKey}.p1`),
    image: `https://wizjoner.netlify.app${articleImageSrc}`,
    author: {
      "@type": "Person",
      name: "Adam Babinicz",
    },
    publisher: {
      "@type": "Organization",
      name: t("seo.siteName"),
      logo: {
        "@type": "ImageObject",
        url: "https://wizjoner.netlify.app/favicon.svg",
      },
    },
    datePublished: "2024-09-10",
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <SEOHead
        titleKey={`${i18nArticleKey}.title`}
        descriptionKey={`${i18nArticleKey}.p1`}
        image={articleImageSrc}
        schemaData={[{ type: "Article", data: articleSchema }]}
      />
      <main id="main-content" className="pt-12 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="mb-8">
            <button
              onClick={handleBackToHeritage}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("common.backToHeritage")}
            </button>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-primary">
            <header className="mb-10 not-prose">
              <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary mb-6">
                {t(`${i18nArticleKey}.title`)}
              </h1>
              {articleImageSrc && (
                <div className="relative group overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={articleImageSrc}
                    alt={t(`${i18nArticleKey}.title`)}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute inset-0 p-4 bg-black/50 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white max-w-xs">
                      <Info className="w-8 h-8 mx-auto mb-3" />
                      <p className="text-sm font-semibold">
                        {t("heritage.aiImageNotice")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </header>
            <p>{t(`${i18nArticleKey}.p1`)}</p>
            <p>{t(`${i18nArticleKey}.p2`)}</p>
            <p>{t(`${i18nArticleKey}.p3`)}</p>
            <p>{t(`${i18nArticleKey}.p4`)}</p>
          </article>
        </div>
      </main>
      <FooterSection />
    </motion.div>
  );
}
