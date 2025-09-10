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
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import "./lib/i18n";

function AppRoutes() {
  useLanguageFromUrl();
  const [location] = useLocation();

  // UWAGA: Celowo NIE używamy tutaj `useTranslation`, aby uniknąć problemów z timingiem.
  // Trasy są statyczne, a logika językowa jest w komponentach.

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/:lang(pl|en|de)?" component={Home} />

        <Route
          path="/:lang(pl|en|de)/polityka-prywatnosci"
          component={Privacy}
        />
        <Route path="/:lang(pl|en|de)/privacy" component={Privacy} />
        <Route path="/:lang(pl|en|de)/datenschutz" component={Privacy} />

        <Route path="/:lang(pl|en|de)/warunki-korzystania" component={Terms} />
        <Route path="/:lang(pl|en|de)/terms" component={Terms} />
        <Route path="/:lang(pl|en|de)/nutzungsbedingungen" component={Terms} />

        <Route
          path="/:lang(pl|en|de)/heritage/:slug"
          component={HeritageArticle}
        />
        <Route
          path="/:lang(pl|en|de)/dziedzictwo/:slug"
          component={HeritageArticle}
        />
        <Route path="/:lang(pl|en|de)/erbe/:slug" component={HeritageArticle} />

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
            <LazyMotion features={domAnimation}>
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
                  <AppRoutes />
                </div>
                <Toaster />
              </div>
            </LazyMotion>
          </AriaLiveProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
