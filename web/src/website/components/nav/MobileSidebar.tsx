import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide";
import { createPortal } from "react-dom";
import { env } from "../../../env";
import { navProductItems } from "../../content/data";
import { useWebsiteTheme } from "../../context/WebsiteThemeContext";
import { renderLucideNodes } from "../../lib/icons";
import { blogPath, homePath } from "../../lib/routes";
import { ThemeToggle } from "../ThemeToggle";
import { WebsiteLink } from "../WebsiteLink";

const navRowClassName =
  "flex w-full items-center justify-between border-b border-[var(--avon-mobile-sidebar-border)] py-3 text-left text-sm font-medium text-[var(--avon-mobile-sidebar-text)] no-underline";

const productLinkClassName =
  "block border-b border-[var(--avon-mobile-sidebar-border-subtle)] py-2.5 pl-4 text-sm text-[var(--avon-mobile-sidebar-muted)] no-underline last:border-b-0";

const sidebarNavRowClassName =
  "flex w-full items-center justify-between border-b border-[var(--avon-mobile-sidebar-border)] py-4 text-left text-base font-medium text-[var(--avon-mobile-sidebar-text)] no-underline";

const sidebarProductLinkClassName =
  "block border-b border-[var(--avon-mobile-sidebar-border-subtle)] py-3 pl-4 text-sm text-[var(--avon-mobile-sidebar-muted)] no-underline last:border-b-0";

const footerLinkClassName =
  "text-sm text-[var(--avon-mobile-sidebar-muted)] no-underline transition-colors hover:text-[var(--avon-mobile-sidebar-text)]";

export const MobileSidebar = ({
  id,
  onClose,
  open,
  variant = "sidebar",
}: {
  readonly id: string;
  readonly onClose: () => void;
  readonly open: boolean;
  readonly variant?: "dropdown" | "sidebar";
}) => {
  const [productOpen, setProductOpen] = useState(false);
  const { resolvedTheme } = useWebsiteTheme();
  const themeToggleVariant = resolvedTheme === "dark" ? "dark" : "solid";

  useEffect(() => {
    if (!open) {
      setProductOpen(false);
      return;
    }

    const scrollbarWidth =
      variant === "sidebar"
        ? window.innerWidth - document.documentElement.clientWidth
        : 0;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    if (variant === "sidebar") {
      document.body.style.overflow = "hidden";

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (variant === "sidebar") {
        document.body.style.overflow = previousOverflow;
        document.body.style.paddingRight = previousPaddingRight;
      }

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open, variant]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  if (variant === "sidebar") {
    return createPortal(
      <div className="fixed inset-0 z-[200] h-dvh w-full md:hidden">
        <nav
          aria-label="Mobile navigation"
          aria-modal="true"
          className="avon-mobile-sidebar flex h-dvh min-h-dvh w-full flex-col bg-[var(--avon-mobile-sidebar-bg)] text-[var(--avon-mobile-sidebar-text)]"
          id={id}
          role="dialog"
        >
          <div className="shrink-0 px-6 pt-[max(1.25rem,env(safe-area-inset-top,0px))]">
            <div className="flex h-12 items-center justify-between gap-2">
              <WebsiteLink
                aria-label="Avon home"
                className="shrink-0"
                href={homePath}
                onClick={onClose}
              >
                <img
                  alt=""
                  className="avon-mobile-sidebar-logo h-6 w-auto"
                  height={120}
                  src="/avon-logo.svg"
                  width={293}
                />
              </WebsiteLink>
              <div className="flex shrink-0 items-center gap-2">
                <ThemeToggle size="lg" variant={themeToggleVariant} />
                <button
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--avon-mobile-sidebar-border)] bg-[var(--avon-mobile-sidebar-bg)] text-[var(--avon-mobile-sidebar-text)] transition-[background-color,border-color,color] duration-200 ease-in-out"
                  onClick={onClose}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.25"
                    viewBox="0 0 24 24"
                  >
                    {renderLucideNodes(X)}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="shrink-0 px-6">
            <div className="border-b border-[var(--avon-mobile-sidebar-border)]">
              <button
                aria-expanded={productOpen}
                className={`${sidebarNavRowClassName} border-b-0 bg-transparent`}
                onClick={() => {
                  setProductOpen((current) => !current);
                }}
                type="button"
              >
                Product
                <svg
                  aria-hidden="true"
                  className={`h-4 w-4 text-[var(--avon-mobile-sidebar-muted)] transition-transform duration-200 ease-out motion-reduce:transition-none ${
                    productOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  {renderLucideNodes(ChevronDown)}
                </svg>
              </button>
              {productOpen ? (
                <div className="pb-2">
                  {navProductItems.map((item) => (
                    <WebsiteLink
                      className={sidebarProductLinkClassName}
                      href={item.href}
                      key={item.title}
                      onClick={onClose}
                    >
                      <span className="block font-medium text-[var(--avon-mobile-sidebar-text)]">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--avon-mobile-sidebar-muted)]">
                        {item.description}
                      </span>
                    </WebsiteLink>
                  ))}
                </div>
              ) : null}
            </div>
            <WebsiteLink
              className={sidebarNavRowClassName}
              href={blogPath}
              onClick={onClose}
            >
              Blog
            </WebsiteLink>
            <a
              className={sidebarNavRowClassName}
              href={env.VITE_DOCS_URL}
              onClick={onClose}
            >
              Documentation
            </a>
            <a className={sidebarNavRowClassName} href="#" onClick={onClose}>
              Contact
            </a>
          </div>

          <div className="min-h-0 flex-1" />

          <div className="shrink-0 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pt-4">
            <a
              className="flex h-11 w-full items-center justify-center rounded-full bg-[var(--avon-mobile-sidebar-primary-bg)] text-sm font-medium text-[var(--avon-mobile-sidebar-primary-text)] no-underline"
              href="#"
              onClick={onClose}
            >
              Sign in
            </a>
            <a
              className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-[var(--avon-mobile-sidebar-border)] text-sm font-medium text-[var(--avon-mobile-sidebar-text)] no-underline"
              href="#"
              onClick={onClose}
            >
              Book a demo
            </a>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
              <a
                className={footerLinkClassName}
                href={env.VITE_DOCS_URL}
                onClick={onClose}
              >
                Documentation
              </a>
              <span
                aria-hidden="true"
                className="text-[var(--avon-mobile-sidebar-separator)]"
              >
                ·
              </span>
              <a className={footerLinkClassName} href="#" onClick={onClose}>
                Contact
              </a>
            </div>
          </div>
        </nav>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div className="fixed inset-x-0 top-[calc(max(1.25rem,env(safe-area-inset-top,0px))+3.75rem)] z-[195] px-6 md:hidden">
      <nav
        aria-label="Mobile navigation"
        className="avon-mobile-sidebar avon-mobile-dropdown mx-auto flex max-h-[calc(100dvh-6rem)] w-full max-w-[28rem] flex-col overflow-hidden rounded-xl border border-[var(--avon-mobile-sidebar-border)] bg-[var(--avon-mobile-sidebar-bg)] text-[var(--avon-mobile-sidebar-text)] shadow-[var(--avon-mobile-sidebar-shadow)]"
        id={id}
      >
        <div className="min-h-0 overflow-y-auto px-4 py-2">
          <div className="border-b border-[var(--avon-mobile-sidebar-border)]">
            <button
              aria-expanded={productOpen}
              className={`${navRowClassName} border-b-0 bg-transparent`}
              onClick={() => {
                setProductOpen((current) => !current);
              }}
              type="button"
            >
              Product
              <svg
                aria-hidden="true"
                className={`h-4 w-4 text-[var(--avon-mobile-sidebar-muted)] transition-transform duration-200 ease-out motion-reduce:transition-none ${
                  productOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {renderLucideNodes(ChevronDown)}
              </svg>
            </button>
            {productOpen ? (
              <div className="pb-2">
                {navProductItems.map((item) => (
                  <WebsiteLink
                    className={productLinkClassName}
                    href={item.href}
                    key={item.title}
                    onClick={onClose}
                  >
                    <span className="block font-medium text-[var(--avon-mobile-sidebar-text)]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--avon-mobile-sidebar-muted)]">
                      {item.description}
                    </span>
                  </WebsiteLink>
                ))}
              </div>
            ) : null}
          </div>

          <WebsiteLink
            className={navRowClassName}
            href={blogPath}
            onClick={onClose}
          >
            Blog
          </WebsiteLink>
          <a
            className={navRowClassName}
            href={env.VITE_DOCS_URL}
            onClick={onClose}
          >
            Documentation
          </a>
          <a className={navRowClassName} href="#" onClick={onClose}>
            Contact
          </a>

          <div className="py-4">
            <a
              className="flex h-10 w-full items-center justify-center rounded-lg bg-[var(--avon-mobile-sidebar-primary-bg)] text-sm font-medium text-[var(--avon-mobile-sidebar-primary-text)] no-underline"
              href="#"
              onClick={onClose}
            >
              Sign in
            </a>
            <a
              className="mt-2 flex h-10 w-full items-center justify-center rounded-lg border border-[var(--avon-mobile-sidebar-border)] text-sm font-medium text-[var(--avon-mobile-sidebar-text)] no-underline"
              href="#"
              onClick={onClose}
            >
              Book a demo
            </a>
          </div>
        </div>
      </nav>
    </div>,
    document.body,
  );
};
