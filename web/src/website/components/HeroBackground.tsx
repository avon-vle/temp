import {
  HERO_DARK_IMAGE_URL,
  HERO_DAY_SKY,
  HERO_LIGHT_IMAGE_URL,
  HERO_NIGHT_SKY,
} from "../constants";
import { useWebsiteTheme } from "../context/WebsiteThemeContext";

const heroTopFadeClassName =
  "avon-hero-top-fade pointer-events-none absolute inset-x-0 top-0 z-10 h-44 sm:h-52 lg:h-60";

const skyRgb = (hex: string) => {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
};

const heroTopFade = (hex: string) => {
  const rgb = skyRgb(hex);
  return `linear-gradient(to bottom, rgb(${rgb}) 0%, rgb(${rgb}) 18%, rgb(${rgb} / 78%) 42%, rgb(${rgb} / 0%) 100%)`;
};

export const HeroBackground = () => {
  const { resolvedTheme } = useWebsiteTheme();
  const dark = resolvedTheme === "dark";
  const imageUrl = dark ? HERO_DARK_IMAGE_URL : HERO_LIGHT_IMAGE_URL;
  const skyColor = dark ? HERO_NIGHT_SKY : HERO_DAY_SKY;
  const topFade = heroTopFade(skyColor);

  return (
    <div
      className="absolute inset-x-0 top-0 h-[var(--hero-cutoff)] overflow-hidden bg-cover bg-center"
      style={{
        backgroundColor: skyColor,
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <img
        alt=""
        className="h-full w-full object-cover object-center"
        decoding="sync"
        fetchPriority="high"
        height={941}
        loading="eager"
        src={imageUrl}
        width={1672}
      />
      <div
        aria-hidden="true"
        className={heroTopFadeClassName}
        style={{ background: topFade }}
      />
    </div>
  );
};
