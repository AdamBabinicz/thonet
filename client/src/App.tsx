import { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ControlHub } from "@/components/control-hub";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pl" component={Home} />
      <Route path="/en" component={Home} />
      <Route path="/de" component={Home} />
      <Route component={NotFound} />
    </Switch>
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
          <div className="min-h-screen bg-background text-foreground font-sans antialiased">
            <ControlHub 
              isOpen={isControlHubOpen} 
              onToggle={toggleControlHub}
            />
            <div className={`transition-all duration-300 ${isControlHubOpen ? 'ml-80' : 'ml-0'}`}>
              <Router />
            </div>
            <Toaster />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
