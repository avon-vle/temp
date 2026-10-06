import { HeroBackground } from "../components/HeroBackground";
import { LoadRow } from "../components/LoadRow";
import { ProvisionProductPreview } from "../components/ProvisionProductPreview";
import { SiteNav } from "../components/SiteNav";
import { WebsiteLink } from "../components/WebsiteLink";
import {
  PRODUCT_PREVIEW_HEIGHT_CLASS,
  PRODUCT_PREVIEW_OVERLAP_CLASS,
  SECTION_HERO_CONTAINER_CLASS,
  SECTION_SURFACE_CLASS,
} from "../constants";
import type { ProductPageContent } from "../content/productPages";
import { homePath } from "../lib/routes";

const productPreviewShellClassName =
  "relative z-30 mx-auto mt-4 w-full max-w-6xl min-w-0 overflow-hidden rounded-lg border border-white/40 bg-white shadow-[0_24px_60px_rgb(24_21_17_/_22%)] sm:mt-5";

export const ProductHeroSection = ({
  product,
}: {
  readonly product: ProductPageContent;
}) => (
  <>
    <HeroBackground />
    <section className="relative z-20 w-full">
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
        <div className="pt-6 text-center sm:pt-8 lg:pt-10">
          <div className="mx-auto w-full max-w-3xl min-w-0">
            <LoadRow index={1}>
              <p className="text-sm font-medium text-white/75">
                {product.title}
              </p>
            </LoadRow>
            <LoadRow className="mt-2" index={2}>
              <h1 className="avon-section-title font-medium tracking-normal text-white">
                {product.headline}
              </h1>
            </LoadRow>
            <LoadRow className="mt-4" index={3}>
              <p className="mx-auto max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                {product.description}
              </p>
            </LoadRow>
            <LoadRow
              className="mt-6 flex flex-wrap justify-center gap-3"
              index={4}
            >
              <a
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--avon-footer-button-bg)] px-5 text-sm font-medium text-[var(--avon-footer-button-text)] no-underline shadow-[0_2px_8px_rgb(38_33_25_/_10%)] transition-colors hover:bg-[var(--avon-footer-button-hover)]"
                href="#"
              >
                Book a demo
              </a>
              <WebsiteLink
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 px-5 text-sm font-medium text-white no-underline transition-colors hover:border-white/55 hover:bg-white/10"
                href={homePath}
              >
                Back to home
              </WebsiteLink>
            </LoadRow>
          </div>
        </div>

        <div
          className={`avon-load ${productPreviewShellClassName} ${PRODUCT_PREVIEW_HEIGHT_CLASS} ${PRODUCT_PREVIEW_OVERLAP_CLASS}`}
          style={{ "--avon-load-index": 5 } as React.CSSProperties}
        >
          {product.kind === "provision" ? (
            <ProvisionProductPreview />
          ) : (
            <div className="flex h-full items-center justify-center bg-stone-100">
              <span className="text-sm font-medium text-stone-500">TBD</span>
            </div>
          )}
        </div>
      </div>
    </section>
  </>
);
