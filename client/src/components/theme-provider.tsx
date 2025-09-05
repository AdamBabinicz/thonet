import { ReactNode } from "react";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider as InternalThemeProvider } from "@/hooks/use-theme";
import '../lib/i18n';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <HelmetProvider>
      <InternalThemeProvider>
        {children}
      </InternalThemeProvider>
    </HelmetProvider>
  );
}
