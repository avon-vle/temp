import type { CSSProperties } from "react";
import {
  SECTION_BORDERED_CONTAINER_PADDED_CLASS,
  SECTION_CONTAINER_PADDED_CLASS,
} from "../constants";
import type { IntegrationLogo } from "../types";

export const LogoGridSection = ({
  description,
  items,
  loadDelay = "700ms",
  title,
  variant = "default",
}: {
  readonly description: string;
  readonly items: readonly IntegrationLogo[];
  readonly loadDelay?: string;
  readonly title: string;
  readonly variant?: "default" | "dark" | "muted";
}) => (
  <section
    className={`avon-load overflow-hidden ${
      variant === "dark"
        ? "bg-[#181511] text-white"
        : variant === "muted"
          ? "border-y border-stone-200 bg-stone-50/65 text-stone-950"
          : "bg-white text-stone-950"
    }`}
    style={
      {
        "--avon-load-delay": loadDelay,
      } as CSSProperties
    }
  >
    <div
      className={
        variant === "default"
          ? SECTION_BORDERED_CONTAINER_PADDED_CLASS
          : SECTION_CONTAINER_PADDED_CLASS
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.8fr)] lg:items-end">
        <h2
          className={`avon-section-title font-medium tracking-normal ${
            variant === "dark" ? "text-white" : "text-stone-950"
          }`}
        >
          {title}
        </h2>
        <p
          className={`max-w-xl text-base leading-7 sm:text-lg ${
            variant === "dark" ? "text-white/70" : "text-stone-600"
          }`}
        >
          {description}
        </p>
      </div>
      <div
        className={`mt-12 grid overflow-hidden border ${
          items.length === 3
            ? "sm:[&>*:last-child]:col-span-2 sm:[&>*:nth-child(2)]:border-b lg:grid-cols-3 lg:[&>*:last-child]:col-span-1 lg:[&>*:nth-child(2)]:border-b-0"
            : "lg:grid-cols-4"
        } sm:grid-cols-2 ${
          variant === "dark" ? "border-white/18" : "border-stone-200"
        }`}
      >
        {items.map((item) => (
          <article
            className={`flex min-h-40 items-center justify-center border-b p-6 text-center last:border-b-0 sm:border-r sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-48 lg:[&:nth-last-child(-n+4)]:border-b-0 ${
              variant === "dark"
                ? "border-white/18 bg-white/[0.035]"
                : "border-stone-200 bg-white"
            }`}
            key={item.name}
          >
            <div>
              <img
                alt={item.logoAlt}
                className="mx-auto h-14 w-14 object-contain sm:h-16 sm:w-16"
                src={item.logoSrc}
              />
              <h3
                className={`mt-5 text-lg font-medium leading-tight ${
                  variant === "dark" ? "text-white" : "text-stone-950"
                }`}
              >
                {item.name}
              </h3>
              <p
                className={`mt-2 text-sm ${
                  variant === "dark" ? "text-white/55" : "text-stone-500"
                }`}
              >
                {item.status}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
