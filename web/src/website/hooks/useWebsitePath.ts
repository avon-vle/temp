import { useCallback, useEffect, useState } from "react";
import { resolveWebsiteRoute } from "../lib/routes";

export const useWebsitePath = () => {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    if (path === window.location.pathname) {
      return;
    }

    window.history.pushState({}, "", path);
    setPathname(path);
    window.scrollTo(0, 0);
  }, []);

  return {
    navigate,
    pathname,
    route: resolveWebsiteRoute(pathname),
  };
};
