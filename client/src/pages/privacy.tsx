
import { SEOHead } from "@/components/seo-head";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Privacy() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  return (
    <>
      <SEOHead 
        title={t('privacy.title')}
        description={t('privacy.description')}
      />
      
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-8 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.backToHome')}
          </Button>

          <h1 className="text-4xl font-bold mb-8 text-foreground">
            {t('privacy.title')}
          </h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.dataCollection.title')}</h2>
              <p className="mb-4">{t('privacy.dataCollection.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.cookies.title')}</h2>
              <p className="mb-4">{t('privacy.cookies.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.thirdParty.title')}</h2>
              <p className="mb-4">{t('privacy.thirdParty.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.rights.title')}</h2>
              <p className="mb-4">{t('privacy.rights.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.contact.title')}</h2>
              <p className="mb-4">{t('privacy.contact.content')}</p>
            </section>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              {t('privacy.lastUpdated')} {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
