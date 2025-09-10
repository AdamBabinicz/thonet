import React, { useState, useCallback, createContext, ReactNode } from "react";

interface AriaLiveContextType {
  announce: (message: string, politeness?: "polite" | "assertive") => void;
}

export const AriaLiveContext = createContext<AriaLiveContextType | undefined>(
  undefined
);

export const AriaLiveProvider = ({ children }: { children: ReactNode }) => {
  const [announcement, setAnnouncement] = useState<{
    message: string;
    politeness: "polite" | "assertive";
  }>({
    message: "",
    politeness: "polite",
  });

  const announce = useCallback(
    (message: string, politeness: "polite" | "assertive" = "polite") => {
      setAnnouncement({ message: "", politeness });
      setTimeout(() => {
        setAnnouncement({ message, politeness });
      }, 100);
    },
    []
  );

  return (
    <AriaLiveContext.Provider value={{ announce }}>
      {children}
      <div
        className="sr-only"
        role="status"
        aria-live={announcement.politeness}
        aria-atomic="true"
      >
        {announcement.message}
      </div>
    </AriaLiveContext.Provider>
  );
};
