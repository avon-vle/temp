import { Monitor, Moon, Sun } from "lucide";
import {
  useWebsiteTheme,
  type WebsiteThemeMode,
} from "../context/WebsiteThemeContext";
import { renderLucideNodes } from "../lib/icons";
import type { ThemeToggleVariant } from "../lib/navTheme";

const themeOptions: readonly {
  readonly icon: typeof Sun;
  readonly label: string;
  readonly value: WebsiteThemeMode;
}[] = [
  { icon: Sun, label: "Light", value: "light" },
  { icon: Moon, label: "Dark", value: "dark" },
  { icon: Monitor, label: "System", value: "system" },
];

export type ThemeToggleSize = "md" | "lg";

/** md = match Sign in (h-9); lg = match mobile menu button height (h-10). */
const shellClassName = (variant: ThemeToggleVariant, size: ThemeToggleSize) => {
  // Square control like docs (not pill / circular).
  const height = size === "lg" ? "h-10" : "h-9";

  if (variant === "hero") {
    return `inline-flex ${height} shrink-0 items-center rounded-md border border-white/30 bg-white/10 p-0.5 text-white/75`;
  }

  if (variant === "dark") {
    return `inline-flex ${height} shrink-0 items-center rounded-md border border-[#2b3039] bg-[#1a1d24] p-0.5 text-[#78716c]`;
  }

  return `inline-flex ${height} shrink-0 items-center rounded-md border border-stone-200 bg-white p-0.5 text-stone-500`;
};

const optionClassName = (
  active: boolean,
  variant: ThemeToggleVariant,
  size: ThemeToggleSize,
) => {
  // Square cells like docs toggle.
  const cell = size === "lg" ? "h-9 w-9" : "h-8 w-8";
  const base = `inline-flex ${cell} items-center justify-center rounded-[0.3rem] transition-colors`;

  if (active) {
    if (variant === "hero") {
      return `${base} bg-white text-stone-950`;
    }

    if (variant === "dark") {
      return `${base} bg-[#252a33] text-[#f5f5f4]`;
    }

    return `${base} bg-stone-900 text-white`;
  }

  if (variant === "hero") {
    return `${base} hover:bg-white/10 hover:text-white`;
  }

  if (variant === "dark") {
    return `${base} hover:text-[#f5f5f4]`;
  }

  return `${base} hover:text-stone-900`;
};

export const ThemeToggle = ({
  size = "md",
  variant = "solid",
}: {
  readonly size?: ThemeToggleSize;
  readonly variant?: ThemeToggleVariant;
}) => {
  const { mode, setMode } = useWebsiteTheme();

  return (
    <div
      aria-label="Theme"
      className={shellClassName(variant, size)}
      role="group"
    >
      {themeOptions.map((option) => {
        const active = mode === option.value;

        return (
          <button
            aria-label={`${option.label} theme`}
            aria-pressed={active}
            className={optionClassName(active, variant, size)}
            key={option.value}
            onClick={() => {
              setMode(option.value);
            }}
            title={`${option.label} theme`}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {renderLucideNodes(option.icon)}
            </svg>
          </button>
        );
      })}
    </div>
  );
};
