import { createContext, useState, useMemo, ReactNode } from "react";

interface ActiveSectionContextType {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

export const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: "hero",
  setActiveSection: () => {},
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("hero");

  const value = useMemo(
    () => ({ activeSection, setActiveSection }),
    [activeSection]
  );

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
}
