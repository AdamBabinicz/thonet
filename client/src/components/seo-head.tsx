import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  isHomePage?: boolean;
  schemaData?: {
    type: "Person" | "Product";
    data: any;
  };
}

const siteUrl = "https://thonet-digital-heritage.netlify.app"; // Pamiętaj, aby podmienić na docelowy URL
const siteName = "Projekt Thonet: Cyfrowy Hołd";
const defaultDescription =
  "Odkryj historię i dziedzictwo Michaela Thoneta oraz jego rewolucyjnych mebli giętych. Interaktywna podróż przez świat rzemiosła i innowacji.";
const defaultImage = `${siteUrl}/og-image.png`; // Domyślny obrazek dla social media
const twitterHandle = "@TwojTwitterHandle"; // Opcjonalnie: podaj swój uchwyt Twitter

export function SEOHead({
  title,
  description,
  image = defaultImage,
  isHomePage = false,
  schemaData,
}: SEOHeadProps) {
  const { i18n } = useTranslation();
  const [location] = useLocation();

  const pageTitle = title
    ? isHomePage
      ? title
      : `${title} | ${siteName}`
    : siteName;
  const pageDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${location}`;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const getOgLocale = () => {
    const lang = i18n.language;
    if (lang === "pl") return "pl_PL";
    if (lang === "en") return "en_US";
    if (lang === "de") return "de_DE";
    return "pl_PL";
  };

  const generateSchemaJSON = () => {
    const schemas: any[] = [];

    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description: defaultDescription,
      inLanguage: i18n.language,
    });

    if (schemaData) {
      const { type, data } = schemaData;
      let specificSchema: any = null;

      switch (type) {
        case "Person":
          specificSchema = {
            "@context": "https://schema.org",
            "@type": "Person",
            ...data,
          };
          break;
        case "Product":
          specificSchema = {
            "@context": "https://schema.org",
            "@type": "Product",
            ...data,
          };
          break;
      }
      if (specificSchema) schemas.push(specificSchema);
    }

    return JSON.stringify(schemas, null, 2);
  };

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={isHomePage ? "website" : "article"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={getOgLocale()} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaJSON() }}
      />
    </Helmet>
  );
}
