import { ProductCopy } from "../components/ProductCopy";
import {
  PRODUCT_PAGE_CLASS,
  PRODUCT_PREVIEW_CLEARANCE_CLASS,
  SECTION_BORDERED_CONTAINER_PADDED_CLASS,
  SECTION_SURFACE_CLASS,
} from "../constants";
import { productPages } from "../content/productPages";
import { ProductHeroSection } from "../sections/ProductHeroSection";
import { SiteFooter } from "../sections/SiteFooter";
import type { FeatureKind } from "../types";

export const ProductPage = ({ kind }: { readonly kind: FeatureKind }) => {
  const product = productPages[kind];

  return (
    <main
      aria-label={`${product.title} product page`}
      className={PRODUCT_PAGE_CLASS}
    >
      <ProductHeroSection product={product} />

      <section
        className={`relative z-0 ${SECTION_SURFACE_CLASS} ${PRODUCT_PREVIEW_CLEARANCE_CLASS}`}
      >
        <div className={`${SECTION_BORDERED_CONTAINER_PADDED_CLASS} !pt-0`}>
          <ProductCopy
            description={product.copyDescription}
            points={product.points}
            title={product.sectionTitle}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};
