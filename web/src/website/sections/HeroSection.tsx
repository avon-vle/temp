import type { CSSProperties } from "react";
import { env } from "../../env";
import { HeroBackground } from "../components/HeroBackground";
import { LoadRow } from "../components/LoadRow";
import { ProvisionProductPreview } from "../components/ProvisionProductPreview";
import { SiteNav } from "../components/SiteNav";
import { WebsiteLink } from "../components/WebsiteLink";
import {
  SECTION_CONTAINER_CLASS,
  SECTION_HERO_CONTAINER_CLASS,
  SECTION_SURFACE_CLASS,
} from "../constants";
import { gitProviderLogos, lmsLogos } from "../content/data";
import { blogPostPath } from "../lib/routes";

const integrationLogos = [...gitProviderLogos, ...lmsLogos];

const previewShellClassName =
  "avon-load relative z-30 mx-auto mt-12 h-[30rem] w-full max-w-6xl min-w-0 overflow-hidden rounded-xl border border-white/40 bg-white shadow-[0_24px_60px_rgb(24_21_17_/_22%)] ring-8 ring-white/15 sm:mt-14 sm:h-[38rem] lg:h-[44rem]";

export const HeroSection = () => (
  <>
    <HeroBackground />
    <section className="relative z-10 w-full">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 top-[var(--hero-cutoff)] ${SECTION_SURFACE_CLASS}`}
      />
      <div
        className={`relative flex w-full flex-col ${SECTION_HERO_CONTAINER_CLASS}`}
      >
        <div className="relative z-30">
          <SiteNav />
        </div>

        <div className="pt-10 text-center sm:pt-14 lg:pt-16">
          <LoadRow index={1}>
            <WebsiteLink
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 py-1 pl-1 pr-3 text-[13px] font-medium text-white no-underline backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20"
              href={blogPostPath("introducing-avon")}
            >
              <span className="rounded-full bg-white px-2 py-0.5 text-[12px] font-semibold text-[var(--avon-sky-blue)]">
                New
              </span>
              Introducing Avon
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </WebsiteLink>
          </LoadRow>

          <LoadRow className="mt-6" index={2}>
            <h1 className="avon-hero-statement mx-auto max-w-5xl font-medium">
              <span className="text-white">Avon gives CS courses</span>{" "}
              <span className="text-white/60">
                one workflow for code, feedback, and assessment.
              </span>
            </h1>
          </LoadRow>

          <LoadRow className="mt-6" index={3}>
            <p className="avon-hero-subtitle mx-auto max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Provision repos from starter code, run autograders, suggest
              targeted hints, and send marks back to your VLE — launched
              straight from the course page.
            </p>
          </LoadRow>

          <LoadRow
            className="mt-8 flex flex-wrap justify-center gap-3"
            index={4}
          >
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--avon-footer-button-bg)] px-6 text-sm font-medium text-[var(--avon-footer-button-text)] no-underline shadow-[0_2px_8px_rgb(38_33_25_/_10%)] transition-colors hover:bg-[var(--avon-footer-button-hover)]"
              href="#"
            >
              Book a demo
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 bg-white/5 px-6 text-sm font-medium text-white no-underline backdrop-blur-md transition-colors hover:border-white/55 hover:bg-white/10"
              href={env.VITE_DOCS_URL}
            >
              View documentation
            </a>
          </LoadRow>
        </div>

        <div
          className={previewShellClassName}
          style={{ "--avon-load-index": 5 } as CSSProperties}
        >
          <ProvisionProductPreview />
        </div>
      </div>

      <div
        className={`relative ${SECTION_CONTAINER_CLASS} pb-16 pt-14 sm:pt-16`}
      >
        <LoadRow index={6}>
          <p className="text-center text-sm font-medium text-stone-500">
            Works with the Git forges and learning platforms you already run
          </p>
        </LoadRow>
        <LoadRow index={7}>
          <ul
            aria-label="Supported integrations"
            className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12"
          >
            {integrationLogos.map((logo) => (
              <li
                className="avon-logo-strip-item flex items-center gap-2.5"
                key={logo.name}
              >
                <img
                  alt=""
                  className="h-7 w-7 object-contain"
                  height={28}
                  src={logo.logoSrc}
                  width={28}
                />
                <span className="text-base font-medium text-stone-700">
                  {logo.name}
                </span>
              </li>
            ))}
          </ul>
        </LoadRow>
      </div>
    </section>
  </>
);
