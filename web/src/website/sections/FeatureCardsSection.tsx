import { FeatureCard } from "../components/FeatureCard";
import { SectionHeader } from "../components/SectionHeader";
import { SECTION_CONTAINER_CLASS } from "../constants";
import { features } from "../content/data";

/** Alternating wide/narrow spans so the 2×2 grid reads as a bento. */
const bentoSpanClassNames = [
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
];

export const FeatureCardsSection = () => (
  <section
    aria-label="Product features"
    className="relative z-10 bg-white py-20 sm:py-24"
    id="workflow"
  >
    <div className={SECTION_CONTAINER_CLASS}>
      <SectionHeader
        description="Provision coursework, run tests, review suggestions, and track submissions in a single flow — each step connected to the last."
        eyebrow="The workflow"
        loadRowIndex={8}
        title="One workflow from setup to assessment"
      />

      <div className="mt-12 grid min-w-0 gap-4 sm:gap-5 lg:grid-cols-5">
        {features.map((feature, index) => (
          <FeatureCard
            className={bentoSpanClassNames[index] ?? ""}
            feature={feature}
            index={index}
            key={feature.title}
            loadRowIndex={10 + index}
          />
        ))}
      </div>
    </div>
  </section>
);
