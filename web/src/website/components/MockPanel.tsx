import type { ReactNode } from "react";

/** Product mock frame — light card surface (zinc border, soft shadow). */
export const MockPanel = ({ children }: { readonly children: ReactNode }) => (
  <div
    aria-hidden="true"
    className="overflow-hidden rounded-2xl border border-border bg-muted p-4 shadow-xs sm:p-6"
  >
    {children}
  </div>
);
