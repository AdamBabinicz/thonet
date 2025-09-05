
import { SEOHead } from "@/components/seo-head";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Terms() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  return (
    <>
      <SEOHead 
        title={t('terms.title')}
        description={t('terms.description')}
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
            {t('terms.title')}
          </h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.acceptance.title')}</h2>
              <p className="mb-4">{t('terms.acceptance.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.usage.title')}</h2>
              <p className="mb-4">{t('terms.usage.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.intellectual.title')}</h2>
              <p className="mb-4">{t('terms.intellectual.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.disclaimer.title')}</h2>
              <p className="mb-4">{t('terms.disclaimer.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.limitation.title')}</h2>
              <p className="mb-4">{t('terms.limitation.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.changes.title')}</h2>
              <p className="mb-4">{t('terms.changes.content')}</p>
            </section>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              {t('terms.lastUpdated')} {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
