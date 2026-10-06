import { createContext, useContext, type ReactNode } from "react";
import { useWebsitePath } from "../hooks/useWebsitePath";

type WebsiteNavigationContextValue = ReturnType<typeof useWebsitePath>;

const WebsiteNavigationContext =
  createContext<WebsiteNavigationContextValue | null>(null);

export const WebsiteNavigationProvider = ({
  children,
  value,
}: {
  readonly children: ReactNode;
  readonly value: WebsiteNavigationContextValue;
}) => (
  <WebsiteNavigationContext.Provider value={value}>
    {children}
  </WebsiteNavigationContext.Provider>
);

export const useWebsiteNavigation = () => {
  const context = useContext(WebsiteNavigationContext);

  if (!context) {
    throw new Error(
      "useWebsiteNavigation must be used within WebsiteNavigationProvider",
    );
  }

  return context;
};
