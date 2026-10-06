import type { CSSProperties, RefObject } from "react";
import { loadRowStyle } from "../constants";
import { productPages } from "../content/productPages";
import { useInView } from "../hooks/useInView";
import { LucideIcon } from "../lib/icons";
import { productPath } from "../lib/routes";
import type { Feature } from "../types";
import { FeatureVisual } from "./FeatureVisual";
import { WebsiteLink } from "./WebsiteLink";

const cardClassName =
  "avon-raised group/card relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 no-underline transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_18px_40px_-18px_rgb(24_24_27_/_25%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const visualClassName =
  "avon-feature-card-visual relative mt-auto h-60 overflow-hidden px-1 sm:h-64 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]";

export const FeatureCard = ({
  className = "",
  feature,
  index,
  loadRowIndex,
}: {
  readonly className?: string;
  readonly feature: Feature;
  readonly index: number;
  readonly loadRowIndex: number;
}) => {
  const { inView, ref } = useInView();
  const page = productPages[feature.kind];

  return (
    <WebsiteLink
      aria-label={`Learn more about ${feature.title}`}
      className={`avon-load ${cardClassName} ${className}`}
      href={productPath(feature.kind)}
      ref={ref as RefObject<HTMLAnchorElement | null>}
      style={loadRowStyle(loadRowIndex) as CSSProperties}
    >
      <div className="p-6 pb-7 sm:p-7">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white">
            <LucideIcon
              className="h-4 w-4 text-[var(--avon-eyebrow)]"
              icon={feature.icon}
            />
          </span>
          <h3 className="text-[15px] font-medium text-stone-950">
            {feature.title}
          </h3>
          <span className="ml-auto font-mono text-xs text-stone-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-5 text-xl font-medium leading-snug text-stone-950">
          {page.headline}
        </p>
        <p className="mt-2 max-w-md text-[15px] leading-6 text-stone-600">
          {page.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-stone-900">
          Learn more
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/card:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
      <div className={visualClassName}>
        <FeatureVisual animate={inView} kind={feature.kind} />
      </div>
    </WebsiteLink>
  );
};
