import type { WebsiteResolvedTheme } from "../context/WebsiteThemeContext";

export type ThemeToggleVariant = "hero" | "solid" | "dark";

export type NavTone = "hero" | "solid";

export const navTheme = (
  tone: NavTone = "hero",
  resolvedTheme: WebsiteResolvedTheme = "light",
) => {
  if (tone === "solid") {
    if (resolvedTheme === "dark") {
      return {
        logo: "text-[15px] font-semibold tracking-[0.01em] text-white no-underline",
        menuButtonClosed:
          "border-[#2b3039] text-[#f5f5f4] hover:border-[#38404d] hover:bg-[#1a1d24]",
        menuButtonOpen:
          "border-transparent bg-transparent text-[#f5f5f4] hover:bg-transparent",
        signIn:
          "border-[#2b3039] text-[#f5f5f4] hover:border-[#38404d] hover:bg-[#1a1d24]",
        trigger: "text-[#a8a29e] hover:text-[#f5f5f4]",
        triggerOpen: "text-[#f5f5f4]",
      };
    }

    return {
      logo: "text-[15px] font-semibold tracking-[0.01em] text-stone-950 no-underline",
      menuButtonClosed:
        "border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-100",
      menuButtonOpen:
        "border-transparent bg-transparent text-stone-800 hover:bg-transparent",
      signIn:
        "border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-100",
      trigger: "text-stone-600 hover:text-stone-950",
      triggerOpen: "text-stone-950",
    };
  }

  return {
    logo: "text-[15px] font-semibold tracking-[0.01em] text-white no-underline drop-shadow-[0_1px_1px_rgb(0_0_0_/_12%)]",
    menuButtonClosed:
      "border-white/35 text-white hover:border-white/55 hover:bg-white/10",
    menuButtonOpen: "border-stone-200 bg-white text-stone-700",
    signIn:
      "border-white/30 text-white drop-shadow-[0_1px_1px_rgb(0_0_0_/_12%)] hover:border-white/50 hover:bg-white/10",
    trigger:
      "text-white/75 drop-shadow-[0_1px_1px_rgb(0_0_0_/_12%)] hover:text-white",
    triggerOpen: "text-white",
  };
};

export type NavPreviewTheme = "light" | "dark";

export const productDropdownThemeClass = (
  resolvedTheme: WebsiteResolvedTheme,
) =>
  resolvedTheme === "dark"
    ? "avon-product-dropdown--dark"
    : "avon-product-dropdown--hero";

export const productDropdownPreviewTheme = (
  resolvedTheme: WebsiteResolvedTheme,
): NavPreviewTheme => (resolvedTheme === "dark" ? "dark" : "light");
