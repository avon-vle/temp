import type { ReactNode } from "react";
import { LoadRow } from "./LoadRow";

export const SectionEyebrow = ({
  children,
}: {
  readonly children: ReactNode;
}) => (
  <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--avon-eyebrow)]">
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 rounded-full bg-[var(--avon-eyebrow)]"
    />
    {children}
  </p>
);

export const SectionHeader = ({
  align = "split",
  description,
  eyebrow,
  loadRowIndex,
  title,
}: {
  readonly align?: "center" | "split";
  readonly description: ReactNode;
  readonly eyebrow: string;
  readonly loadRowIndex: number;
  readonly title: ReactNode;
}) =>
  align === "center" ? (
    <div className="mx-auto max-w-3xl text-center">
      <LoadRow index={loadRowIndex}>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 className="avon-section-title mt-4 font-medium text-stone-950">
          {title}
        </h2>
      </LoadRow>
      <LoadRow className="mt-5" index={loadRowIndex + 1}>
        <p className="mx-auto max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
          {description}
        </p>
      </LoadRow>
    </div>
  ) : (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
      <LoadRow index={loadRowIndex}>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 className="avon-section-title mt-4 max-w-2xl font-medium text-stone-950">
          {title}
        </h2>
      </LoadRow>
      <LoadRow index={loadRowIndex + 1}>
        <p className="max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
          {description}
        </p>
      </LoadRow>
    </div>
  );
