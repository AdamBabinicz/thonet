import { useContext } from "react";
import { AriaLiveContext } from "@/components/AriaLiveProvider";

export const useAriaLive = () => {
  const context = useContext(AriaLiveContext);
  if (!context) {
    throw new Error("useAriaLive must be used within an AriaLiveProvider");
  }
  return context;
};
