import { useEffect, type ReactNode } from "react";
import "./styles/animations.css";
import "./styles/layout.css";
import "./styles/blog.css";
import { env } from "../env";
import { WebsiteNavigationProvider } from "./context/WebsiteNavigationContext";
import { WebsiteThemeProvider } from "./context/WebsiteThemeContext";
import { HomePage } from "./HomePage";
import { useDocumentSurface } from "./hooks/useDocumentSurface";
import { useRootScrollBoundaryGuard } from "./hooks/useRootScrollBoundaryGuard";
import { useWebsitePath } from "./hooks/useWebsitePath";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ProductPage } from "./pages/ProductPage";

/** Legacy /docs paths now live on the separate @avon/docs app. */
const redirectLegacyDocsPath = (pathname: string) => {
  if (!pathname.startsWith("/docs")) {
    return;
  }

  const suffix =
    pathname === "/docs" || pathname === "/docs/"
      ? ""
      : pathname.replace(/^\/docs\/?/u, "");
  const target = new URL(suffix, `${env.VITE_DOCS_URL.replace(/\/$/u, "")}/`);
  window.location.replace(target.toString());
};

export const WebsiteApp = () => {
  const navigation = useWebsitePath();
  useDocumentSurface(navigation.route);
  useRootScrollBoundaryGuard();

  useEffect(() => {
    redirectLegacyDocsPath(navigation.pathname);
  }, [navigation.pathname]);

  let page: ReactNode;

  switch (navigation.route.kind) {
    case "home":
      page = <HomePage />;
      break;
    case "product":
      page = (
        <ProductPage
          key={navigation.route.product}
          kind={navigation.route.product}
        />
      );
      break;
    case "blog":
      page = <BlogIndexPage />;
      break;
    case "blog-post":
      page = (
        <BlogPostPage
          key={navigation.route.slug}
          slug={navigation.route.slug}
        />
      );
      break;
  }

  return (
    <WebsiteThemeProvider>
      <WebsiteNavigationProvider value={navigation}>
        {page}
      </WebsiteNavigationProvider>
    </WebsiteThemeProvider>
  );
};
