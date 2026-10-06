import type { CSSProperties } from "react";

export const AVON_SKY_BLUE = "#0273f1";

export const HERO_NIGHT_SKY = "#020511";

export const HERO_DAY_SKY = AVON_SKY_BLUE;

export const HERO_LIGHT_IMAGE_URL = "/hero-sky-campus-day.webp";

export const HERO_DARK_IMAGE_URL = "/hero-sky-campus-night.webp";

export const FOOTER_LIGHT_IMAGE_URL = "/hero-scenic.webp";

export const FOOTER_DARK_IMAGE_URL = "/hero-scenic-night.webp";

const pageShellClassName =
  "avon-site relative min-h-screen w-full max-w-[100vw] overflow-x-clip bg-white text-[#181511]";

const heroCutoffClassName =
  "[--hero-cutoff:33.5rem] sm:[--hero-cutoff:41.5rem] lg:[--hero-cutoff:42.5rem]";

export const PAGE_CLASS = `${pageShellClassName} ${heroCutoffClassName}`;

/** Home hero carries more copy than product heroes, so its sky runs taller on small screens. Keep in sync with `index.html`. */
const homeHeroCutoffClassName =
  "[--hero-cutoff:44rem] sm:[--hero-cutoff:44rem] lg:[--hero-cutoff:42.5rem]";

export const HOME_PAGE_CLASS = `${pageShellClassName} ${homeHeroCutoffClassName}`;

export const PRODUCT_PAGE_CLASS = PAGE_CLASS;

export const BLOG_PAGE_CLASS = `${pageShellClassName} avon-blog-page`;

export const HERO_CONTENT_HEIGHT_CLASS =
  "min-h-[max(14rem,calc(var(--hero-cutoff)-4.25rem))] lg:h-[calc(var(--hero-cutoff)-4.25rem)] lg:min-h-0";

export const PRODUCT_PREVIEW_HEIGHT_CLASS =
  "h-[32rem] sm:h-[40rem] lg:h-[48rem]";

export const PRODUCT_PREVIEW_OVERLAP_CLASS =
  "translate-y-[2rem] sm:translate-y-[2.5rem] lg:translate-y-[3rem]";

export const PRODUCT_PREVIEW_CLEARANCE_CLASS =
  "pt-[5rem] sm:pt-[6rem] lg:pt-[7rem]";

export const SECTION_MAX_WIDTH_CLASS = "max-w-7xl";

export const SECTION_INSET_X_CLASS = "px-6 sm:px-6 lg:px-8";

export const SECTION_GUTTER_LEFT_CLASS =
  "pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]";

export const SECTION_PADDING_Y_CLASS = "py-10";

export const SECTION_SURFACE_CLASS = "bg-white";

export const SECTION_BORDER_X_CLASS = "border-x border-stone-200";

export const SECTION_CONTAINER_CLASS = `mx-auto w-full min-w-0 ${SECTION_MAX_WIDTH_CLASS} ${SECTION_INSET_X_CLASS}`;

export const SECTION_BORDERED_SHELL_CLASS = `mx-auto w-full min-w-0 ${SECTION_MAX_WIDTH_CLASS} ${SECTION_BORDER_X_CLASS}`;

export const SECTION_BORDERED_CONTAINER_CLASS = `${SECTION_CONTAINER_CLASS} ${SECTION_BORDER_X_CLASS}`;

export const SECTION_CONTAINER_PADDED_CLASS = `${SECTION_CONTAINER_CLASS} ${SECTION_PADDING_Y_CLASS}`;

export const SECTION_BORDERED_CONTAINER_PADDED_CLASS = `${SECTION_BORDERED_CONTAINER_CLASS} ${SECTION_PADDING_Y_CLASS}`;

export const SITE_NAV_HERO_HEADER_CLASS =
  "relative z-30 flex h-12 w-full items-center gap-8";

export const SECTION_HERO_CONTAINER_CLASS = `${SECTION_CONTAINER_CLASS} pb-0 pt-[max(1.25rem,env(safe-area-inset-top,0px))]`;

export const LOAD_ROW_STEP_MS = 85;

export const loadRowStyle = (index: number): CSSProperties =>
  ({
    "--avon-load-index": index,
  }) as CSSProperties;
