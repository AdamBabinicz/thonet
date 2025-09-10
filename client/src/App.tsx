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
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import "./lib/i18n";

function AppContent() {
  useLanguageFromUrl();
  const { t } = useTranslation();
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/:lang(pl|en|de)" component={Home} />
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
          </AriaLiveProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
