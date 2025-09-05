import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  type?: 'WebSite' | 'Person' | 'Product';
  productData?: {
    name: string;
    model: string;
    image: string;
  };
}

export function SEOHead({ title, description, type = 'WebSite', productData }: SEOHeadProps) {
  const { t, i18n } = useTranslation();

  const defaultTitle = "Cyfrowe Dziedzictwo Thoneta - Michael Thonet Heritage";
  const defaultDescription = "Odkryj historię i dziedzictwo Michaela Thoneta oraz jego rewolucyjnych mebli giętych. Interaktywna podróż przez świat rzemiosła i innowacji.";

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;

  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case 'WebSite':
        return {
          ...baseData,
          "@type": "WebSite",
          "name": "Cyfrowe Dziedzictwo Thoneta",
          "url": typeof window !== 'undefined' ? window.location.origin : '',
          "description": pageDescription,
          "inLanguage": ["pl", "en", "de"]
        };
      
      case 'Person':
        return {
          ...baseData,
          "@type": "Person",
          "name": "Michael Thonet",
          "birthDate": "1796-07-02",
          "deathDate": "1871-03-03",
          "description": "Niemiecki stolarz i przemysłowiec, pionier technologii gięcia drewna na parze",
          "nationality": "Niemiecka",
          "occupation": "Stolarz, przemysłowiec"
        };
      
      case 'Product':
        return productData ? {
          ...baseData,
          "@type": "Product",
          "name": productData.name,
          "model": productData.model,
          "manufacturer": {
            "@type": "Organization",
            "name": "Gebrüder Thonet"
          },
          "image": productData.image
        } : null;
      
      default:
        return baseData;
    }
  };

  const structuredData = getStructuredData();

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Cyfrowe Dziedzictwo Thoneta" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
