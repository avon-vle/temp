import type { ReactNode } from "react";
import {
  BLOG_PAGE_CLASS,
  SECTION_CONTAINER_CLASS,
  SECTION_HERO_CONTAINER_CLASS,
} from "../../constants";
import { SiteFooter } from "../../sections/SiteFooter";
import { SiteNav } from "../SiteNav";

export const BlogShell = ({
  ariaLabel,
  children,
}: {
  readonly ariaLabel: string;
  readonly children: ReactNode;
}) => (
  <main aria-label={ariaLabel} className={BLOG_PAGE_CLASS}>
    <div className={`relative z-30 ${SECTION_HERO_CONTAINER_CLASS}`}>
      <SiteNav tone="solid" />
    </div>
    <div className={`pb-16 pt-10 sm:pb-20 sm:pt-14 ${SECTION_CONTAINER_CLASS}`}>
      {children}
    </div>
    <SiteFooter loadStartIndex={4} />
  </main>
);
