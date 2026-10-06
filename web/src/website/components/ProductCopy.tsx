import { Check } from "lucide";
import { renderLucideNodes } from "../lib/icons";
import type { ProductPoint } from "../types";

export const ProductCopy = ({
  description,
  points,
  title,
}: {
  readonly description: string;
  readonly points: readonly ProductPoint[];
  readonly title: string;
}) => (
  <div className="w-full">
    <div className="max-w-3xl">
      <h2 className="avon-section-title font-medium tracking-normal text-stone-950">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-stone-600 sm:text-lg">
        {description}
      </p>
    </div>
    <div className="mt-12 grid gap-5 lg:grid-cols-3">
      {points.map(([pointTitle, pointDescription]) => (
        <div className="border-t border-stone-200 pt-5" key={pointTitle}>
          <div className="flex items-start gap-3">
            <svg
              aria-hidden="true"
              className="mt-1 h-4 w-4 shrink-0 text-stone-500"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.9"
              viewBox="0 0 24 24"
            >
              {renderLucideNodes(Check)}
            </svg>
            <div>
              <h3 className="text-[16px] font-medium text-stone-900">
                {pointTitle}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-stone-600">
                {pointDescription}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
