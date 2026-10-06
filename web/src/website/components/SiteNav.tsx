import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide";
import { createPortal } from "react-dom";
import { env } from "../../env";
import { SITE_NAV_HERO_HEADER_CLASS } from "../constants";
import { useWebsiteTheme } from "../context/WebsiteThemeContext";
import { renderLucideNodes } from "../lib/icons";
import { navTheme, type NavTone } from "../lib/navTheme";
import { blogPath, homePath } from "../lib/routes";
import { MobileSidebar } from "./nav/MobileSidebar";
import { ProductDropdown } from "./nav/ProductDropdown";
import { WebsiteLink } from "./WebsiteLink";

const SCROLLED_NAV_THRESHOLD = 72;
const ENABLE_FLOATING_NAV_EXPERIMENT = false;

const useScrolledNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    const updateScrolled = () => {
      frameId = null;
      setScrolled(window.scrollY > SCROLLED_NAV_THRESHOLD);
    };

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return scrolled;
};

export const SiteNav = ({
  tone,
}: {
  readonly tone?: NavTone;
} = {}) => {
  const menuId = useId();
  const { resolvedTheme } = useWebsiteTheme();
  const rawScrolled = useScrolledNav();
  const scrolled = ENABLE_FLOATING_NAV_EXPERIMENT && rawScrolled;
  const navTone = tone ?? (scrolled ? "solid" : "hero");
  const theme = navTheme(navTone, resolvedTheme);
  const solidLightLogo =
    navTone === "solid" && resolvedTheme === "light"
      ? "brightness-0"
      : navTone === "solid" && resolvedTheme === "dark"
        ? "brightness-0 invert"
        : "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((current) => !current);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClassName = `text-sm font-medium no-underline transition-colors ${theme.trigger}`;
  const navFrameClassName = `pointer-events-auto relative z-10 mx-auto w-full transition-[max-width] duration-300 ease-out motion-reduce:transition-none ${
    scrolled ? "max-w-[46rem]" : "max-w-7xl"
  }`;

  const navHeaderClassName = `${SITE_NAV_HERO_HEADER_CLASS} transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
    scrolled ? "px-3 sm:px-4" : "px-0"
  }`;

  const menuButtonClassName = (open: boolean) =>
    `inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-transparent transition-[background-color,border-color,color] duration-200 ease-in-out md:hidden ${
      scrolled ? "border-transparent" : ""
    } ${open ? theme.menuButtonOpen : theme.menuButtonClosed} ${
      scrolled && !open ? "hover:bg-transparent" : ""
    }`;

  const renderNavHeader = (className: string) => (
    <header className={className}>
      <WebsiteLink
        aria-label="Avon home"
        className={`shrink-0 ${theme.logo}`}
        href={homePath}
      >
        <img
          alt=""
          className={`h-6 w-auto drop-shadow-[0_1px_1px_rgb(0_0_0_/_12%)] ${solidLightLogo}`}
          height={120}
          src="/avon-logo.svg"
          width={293}
        />
      </WebsiteLink>
      <nav
        aria-label="Main navigation"
        className="hidden min-w-0 items-center gap-7 md:flex"
      >
        <ProductDropdown tone={navTone} />
        <WebsiteLink className={navLinkClassName} href={blogPath}>
          Blog
        </WebsiteLink>
        <a className={navLinkClassName} href={env.VITE_DOCS_URL}>
          Documentation
        </a>
        <a className={navLinkClassName} href="#">
          Contact
        </a>
      </nav>
      <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
        <a
          className={`inline-flex h-9 shrink-0 items-center justify-center rounded-lg border px-4 text-sm font-medium no-underline transition-colors ${theme.signIn}`}
          href="#"
        >
          Sign in
        </a>
      </div>
      <div className="ml-auto md:hidden">
        <button
          aria-controls={menuId}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className={menuButtonClassName(mobileMenuOpen)}
          onClick={toggleMobileMenu}
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
            {renderLucideNodes(mobileMenuOpen ? X : Menu)}
          </svg>
        </button>
      </div>
    </header>
  );

  const renderNavLayer = () => (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[190] px-6 pt-[max(1.25rem,env(safe-area-inset-top,0px))] sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className={`avon-site-nav-pill absolute inset-x-6 top-[max(1.25rem,env(safe-area-inset-top,0px))] mx-auto h-12 max-w-[46rem] rounded-full border shadow-[var(--avon-site-nav-pill-shadow)] transition-opacity duration-200 ease-out motion-reduce:transition-none lg:inset-x-8 ${
          scrolled ? "opacity-100 delay-150" : "opacity-0 delay-0"
        }`}
      />
      <div className={navFrameClassName}>
        {renderNavHeader(navHeaderClassName)}
      </div>
    </div>
  );

  if (!ENABLE_FLOATING_NAV_EXPERIMENT) {
    return (
      <>
        {renderNavHeader(SITE_NAV_HERO_HEADER_CLASS)}
        <MobileSidebar
          id={menuId}
          onClose={closeMobileMenu}
          open={mobileMenuOpen}
          variant="sidebar"
        />
      </>
    );
  }

  return (
    <>
      <div aria-hidden="true" className="h-12" />
      {typeof document !== "undefined"
        ? createPortal(renderNavLayer(), document.body)
        : renderNavLayer()}

      <MobileSidebar
        id={menuId}
        onClose={closeMobileMenu}
        open={mobileMenuOpen}
        variant="dropdown"
      />
    </>
  );
};
