import { env } from "../../env";
import { LoadRow } from "../components/LoadRow";
import { ThemeToggle } from "../components/ThemeToggle";
import { SECTION_CONTAINER_CLASS } from "../constants";
import { footerGroups } from "../content/data";

export const SiteFooter = ({
  loadStartIndex = 18,
}: {
  readonly loadStartIndex?: number;
}) => (
  <footer
    className="avon-site-footer relative min-h-[42rem] overflow-hidden border-t border-stone-200 bg-[var(--avon-footer-bg)] bg-cover bg-bottom text-white lg:min-h-[54rem]"
    style={{ backgroundImage: "var(--avon-footer-image)" }}
  >
    <div
      className="absolute inset-0"
      style={{ background: "var(--avon-footer-overlay)" }}
    />
    <div
      className={`relative z-10 flex min-h-[42rem] flex-col pb-24 pt-10 lg:min-h-[54rem] lg:pb-32 ${SECTION_CONTAINER_CLASS}`}
    >
      <div className="flex flex-1 items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.9fr)_320px] lg:items-end">
          <LoadRow index={loadStartIndex}>
            <div className="avon-site-footer-copy">
              <h2 className="avon-footer-title max-w-4xl font-medium tracking-normal text-white">
                Set up assessments without the hassle
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--avon-footer-body-text)] sm:text-lg">
                Avon keeps submissions, autograding, rubrics, feedback, and LMS
                handoff in one university-grade workflow.
              </p>
            </div>
          </LoadRow>
          <LoadRow
            className="flex flex-wrap gap-3 lg:justify-end"
            index={loadStartIndex + 1}
          >
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--avon-footer-button-bg)] px-5 text-sm font-medium text-[var(--avon-footer-button-text)] no-underline transition-colors hover:bg-[var(--avon-footer-button-hover)]"
              href="#"
            >
              Book a demo
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-medium text-white no-underline transition-colors hover:border-white/45 hover:bg-white/10"
              href={env.VITE_DOCS_URL}
            >
              Read the docs
            </a>
          </LoadRow>
        </div>
      </div>

      <LoadRow
        className="mt-12 border-t border-[var(--avon-footer-divider)] pt-8 lg:mt-0"
        index={loadStartIndex + 2}
      >
        <div className="avon-site-footer-copy grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map(([heading, ...links]) => (
            <div key={heading}>
              <h3 className="text-sm font-medium text-white">{heading}</h3>
              <div className="mt-4 grid gap-3">
                {links.map((link) => (
                  <a
                    className="text-sm text-[var(--avon-footer-link-text)] no-underline transition-colors hover:text-white"
                    href="#"
                    key={link}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="avon-site-footer-copy mt-10 flex flex-col gap-4 border-t border-[var(--avon-footer-divider-subtle)] pt-6 text-sm text-[var(--avon-footer-muted-text)] sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <span>Avon</span>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <span>© 2026 Avon. All rights reserved.</span>
            <ThemeToggle variant="hero" />
          </div>
        </div>
      </LoadRow>
    </div>
  </footer>
);
