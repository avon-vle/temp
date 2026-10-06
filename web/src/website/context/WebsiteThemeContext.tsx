import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  FOOTER_DARK_IMAGE_URL,
  FOOTER_LIGHT_IMAGE_URL,
  HERO_DARK_IMAGE_URL,
  HERO_LIGHT_IMAGE_URL,
} from "../constants";

export type WebsiteThemeMode = "light" | "dark" | "system";

export type WebsiteResolvedTheme = "light" | "dark";

type WebsiteThemeContextValue = {
  readonly mode: WebsiteThemeMode;
  readonly resolvedTheme: WebsiteResolvedTheme;
  readonly setMode: (mode: WebsiteThemeMode) => void;
};

const THEME_STORAGE_KEY = "avon.website.theme";

const WebsiteThemeContext = createContext<WebsiteThemeContextValue | null>(
  null,
);

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const isThemeMode = (value: string | null): value is WebsiteThemeMode =>
  value === "light" || value === "dark" || value === "system";

const getSystemTheme = (): WebsiteResolvedTheme => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};

const getInitialMode = (): WebsiteThemeMode => {
  if (typeof window === "undefined") {
    return "system";
  }

  if (typeof window.localStorage.getItem !== "function") {
    return "system";
  }

  const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(storedMode) ? storedMode : "system";
};

const applyDocumentTheme = (
  mode: WebsiteThemeMode,
  resolvedTheme: WebsiteResolvedTheme,
) => {
  const root = document.documentElement;
  const themeColor = document.getElementById("avon-theme-color");
  const dark = resolvedTheme === "dark";

  root.dataset.avonTheme = mode;
  root.dataset.avonResolvedTheme = resolvedTheme;
  root.classList.toggle("avon-theme-dark", dark);
  root.classList.toggle("avon-theme-light", !dark);
  root.style.setProperty("--avon-page-bg", dark ? "#111318" : "#fff");
  root.style.setProperty("--avon-sky-blue", dark ? "#020511" : "#0273f1");
  root.style.setProperty(
    "--avon-hero-image",
    `url("${dark ? HERO_DARK_IMAGE_URL : HERO_LIGHT_IMAGE_URL}")`,
  );
  root.style.setProperty(
    "--avon-footer-image",
    `url("${dark ? FOOTER_DARK_IMAGE_URL : FOOTER_LIGHT_IMAGE_URL}")`,
  );
  root.style.setProperty("--avon-footer-bg", dark ? "#020511" : "#0273f1");
  root.style.setProperty(
    "--avon-footer-ground-bg",
    dark ? "#020511" : "#0273f1",
  );
  root.style.setProperty(
    "--avon-footer-overlay",
    dark
      ? "linear-gradient(to bottom, rgb(2 5 17 / 70%), rgb(2 5 17 / 88%))"
      : "linear-gradient(to bottom, rgb(2 115 241 / 65%), rgb(2 115 241 / 82%))",
  );
  root.style.setProperty(
    "--avon-hero-border",
    dark ? "rgb(255 255 255 / 20%)" : "#fff",
  );

  if (themeColor) {
    themeColor.setAttribute("content", dark ? "#020511" : "#0273f1");
  }
};

export const WebsiteThemeProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const [mode, setModeState] = useState<WebsiteThemeMode>(getInitialMode);
  const [systemTheme, setSystemTheme] =
    useState<WebsiteResolvedTheme>(getSystemTheme);
  const resolvedTheme = mode === "system" ? systemTheme : mode;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    applyDocumentTheme(mode, resolvedTheme);
  }, [mode, resolvedTheme]);

  const value = useMemo<WebsiteThemeContextValue>(
    () => ({
      mode,
      resolvedTheme,
      setMode: (nextMode) => {
        if (typeof window.localStorage.setItem === "function") {
          window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
        }

        setModeState(nextMode);
      },
    }),
    [mode, resolvedTheme],
  );

  return (
    <WebsiteThemeContext.Provider value={value}>
      {children}
    </WebsiteThemeContext.Provider>
  );
};

export const useWebsiteTheme = () => {
  const context = useContext(WebsiteThemeContext);

  if (!context) {
    throw new Error("useWebsiteTheme must be used inside WebsiteThemeProvider");
  }

  return context;
};
