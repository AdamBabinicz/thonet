import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from "react";

interface ActiveSectionContextType {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  isScrollTrackingEnabled: boolean;
  disableScrollTracking: () => void;
  enableScrollTracking: () => void;
}

export const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: "hero",
  setActiveSection: () => {},
  isScrollTrackingEnabled: true,
  disableScrollTracking: () => {},
  enableScrollTracking: () => {},
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrollTrackingEnabled, setScrollTrackingEnabled] = useState(true);

  const disableScrollTracking = useCallback(() => {
    setScrollTrackingEnabled(false);
  }, []);

  const enableScrollTracking = useCallback(() => {
    setScrollTrackingEnabled(true);
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      isScrollTrackingEnabled,
      disableScrollTracking,
      enableScrollTracking,
    }),
    [
      activeSection,
      isScrollTrackingEnabled,
      disableScrollTracking,
      enableScrollTracking,
    ]
  );

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
}
