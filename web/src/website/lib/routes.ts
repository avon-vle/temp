import type { FeatureKind } from "../types";

export type WebsiteRoute =
  | { readonly kind: "home" }
  | { readonly kind: "product"; readonly product: FeatureKind }
  | { readonly kind: "blog" }
  | { readonly kind: "blog-post"; readonly slug: string };

const productRoutePattern = /^\/product\/(provision|test|suggest|assess)\/?$/u;

const blogPostRoutePattern = /^\/blog\/([^/]+)\/?$/u;

export const productPath = (kind: FeatureKind) => `/product/${kind}`;

export const homePath = "/" as const;

export const blogPath = "/blog" as const;

export const blogPostPath = (slug: string) => `/blog/${slug}`;

export function resolveWebsiteRoute(pathname: string): WebsiteRoute {
  if (pathname === "/blog" || pathname === "/blog/") {
    return { kind: "blog" };
  }

  const blogPostMatch = pathname.match(blogPostRoutePattern);

  if (blogPostMatch?.[1] !== undefined) {
    return {
      kind: "blog-post",
      slug: decodePathSegment(blogPostMatch[1]),
    };
  }

  const productMatch = pathname.match(productRoutePattern);

  if (productMatch?.[1] !== undefined) {
    return {
      kind: "product",
      product: productMatch[1] as FeatureKind,
    };
  }

  return { kind: "home" };
}

export function isInternalWebsitePath(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function decodePathSegment(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
