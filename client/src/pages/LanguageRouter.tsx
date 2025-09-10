import { Switch, Route, useParams } from "wouter";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import Home from "@/pages/home";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import HeritageArticle from "@/pages/heritage-article";
import NotFound from "@/pages/not-found";
import { AnimatePresence } from "framer-motion";

export default function LanguageRouter() {
  useLanguageFromUrl(); // Ten hak ustawia język
  const { t } = useTranslation();
  const params = useParams();

  // Używamy location.key, aby zapewnić ponowne renderowanie przy zmianie URL
  const locationKey = window.location.pathname + window.location.search;

  return (
    <AnimatePresence mode="wait">
      <Switch key={locationKey}>
        {/* Trasy dla strony głównej */}
        <Route path="/" component={Home} />
        <Route path="/:lang(pl|en|de)" component={Home} />

        {/* Trasy dla podstron */}
        <Route
          path={`/:lang(pl|en|de)/${t("routes.privacy")}`}
          component={Privacy}
        />
        <Route
          path={`/:lang(pl|en|de)/${t("routes.terms")}`}
          component={Terms}
        />
        <Route
          path={`/:lang(pl|en|de)/${t("routes.heritage")}/:slug`}
          component={HeritageArticle}
        />

        {/* Jeśli żadna z powyższych tras nie pasuje, wyświetl 404 */}
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}
