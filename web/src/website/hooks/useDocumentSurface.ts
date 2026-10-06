import { useEffect } from "react";
import type { WebsiteRoute } from "../lib/routes";

const SURFACE_CLASSES = ["avon-homepage", "avon-blog"] as const;

type DocumentSurface = "homepage" | "blog";

const surfaceForRoute = (route: WebsiteRoute): DocumentSurface => {
  if (route.kind === "blog" || route.kind === "blog-post") {
    return "blog";
  }

  return "homepage";
};

const titleForRoute = (route: WebsiteRoute): string => {
  if (route.kind === "blog" || route.kind === "blog-post") {
    return "Avon Blog";
  }

  return "Avon";
};

/** Keep <html> surface classes aligned after SPA navigations (and first paint). */
export const useDocumentSurface = (route: WebsiteRoute) => {
  useEffect(() => {
    const root = document.documentElement;
    const surface = surfaceForRoute(route);
    const dark = root.classList.contains("avon-theme-dark");

    for (const className of SURFACE_CLASSES) {
      root.classList.toggle(className, className === `avon-${surface}`);
    }

    if (surface === "blog") {
      const paint = dark ? "#111318" : "#faf9f5";
      root.style.setProperty("--avon-blog-paint-bg", paint);
      root.style.setProperty("--avon-page-bg", paint);
    }

    document.title = titleForRoute(route);
  }, [route]);
};
