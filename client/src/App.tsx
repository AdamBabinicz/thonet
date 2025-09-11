import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AriaLiveProvider } from "@/components/AriaLiveProvider";
import { ControlHub } from "@/components/control-hub";
import Home from "@/pages/home";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import HeritageArticle from "@/pages/heritage-article";
import NotFound from "@/pages/not-found";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { AnimatePresence } from "framer-motion";
import "./lib/i18n";
import { ActiveSectionProvider } from "@/contexts/ActiveSectionContext";

const ROUTES = {
  privacy: { pl: "polityka-prywatnosci", en: "privacy", de: "datenschutz" },
  terms: { pl: "warunki-korzystania", en: "terms", de: "nutzungsbedingungen" },
  heritage: { pl: "dziedzictwo", en: "heritage", de: "erbe" },
};

function AppContent() {
  useLanguageFromUrl();
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/:lang(pl|en|de)" component={Home} />
        <Route
          path={`/:lang(pl|en|de)/${ROUTES.privacy.pl}`}
          component={Privacy}
        />
        <Route
          path={`/:lang(pl|en|de)/${ROUTES.privacy.en}`}
          component={Privacy}
        />
        <Route
          path={`/:lang(pl|en|de)/${ROUTES.privacy.de}`}
          component={Privacy}
        />
        <Route path={`/:lang(pl|en|de)/${ROUTES.terms.pl}`} component={Terms} />
        <Route path={`/:lang(pl|en|de)/${ROUTES.terms.en}`} component={Terms} />
        <Route path={`/:lang(pl|en|de)/${ROUTES.terms.de}`} component={Terms} />
        <Route
          path={`/:lang(pl|en|de)/${ROUTES.heritage.pl}/:slug`}
          component={HeritageArticle}
        />
        <Route
          path={`/:lang(pl|en|de)/${ROUTES.heritage.en}/:slug`}
          component={HeritageArticle}
        />
        <Route
          path={`/:lang(pl|en|de)/${ROUTES.heritage.de}/:slug`}
          component={HeritageArticle}
        />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [isControlHubOpen, setIsControlHubOpen] = useState(false);

  const toggleControlHub = () => {
    setIsControlHubOpen(!isControlHubOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AriaLiveProvider>
            <ActiveSectionProvider>
              <div className="min-h-screen bg-background text-foreground font-sans antialiased">
                <ControlHub
                  isOpen={isControlHubOpen}
                  onToggle={toggleControlHub}
                />
                <div
                  className={`transition-transform duration-300 ease-in-out ${
                    isControlHubOpen ? "lg:ml-80" : "ml-0"
                  }`}
                >
                  <AppContent />
                </div>
                <Toaster />
              </div>
            </ActiveSectionProvider>
          </AriaLiveProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
