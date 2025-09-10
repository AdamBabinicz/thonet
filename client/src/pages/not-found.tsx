import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo-head";
import { useTranslation } from "react-i18next";

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.95 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen w-full flex items-center justify-center bg-muted"
    >
      <SEOHead title="404 - Strona nie znaleziona" />
      <Card className="w-full max-w-md mx-4 text-center shadow-2xl">
        <CardContent className="p-8">
          <AlertCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-serif text-foreground">
            404 - Strona nie znaleziona
          </h2>
          <p className="mt-4 text-muted-foreground">
            Strona, której szukasz, nie istnieje lub została przeniesiona.
          </p>
          <a
            href={`/${lang}/`}
            className="mt-8 inline-flex items-center gap-2 text-primary hover:underline font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.backToHome")}
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}
