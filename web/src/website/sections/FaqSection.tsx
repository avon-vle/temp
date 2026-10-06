import { env } from "../../env";
import { LoadRow } from "../components/LoadRow";
import { SectionEyebrow } from "../components/SectionHeader";
import { SECTION_CONTAINER_CLASS } from "../constants";
import { faqs } from "../content/data";

export const FaqSection = () => (
  <section
    aria-label="Frequently asked questions"
    className="bg-white py-20 sm:py-24"
  >
    <div
      className={`${SECTION_CONTAINER_CLASS} grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16`}
    >
      <LoadRow index={23}>
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="avon-section-title mt-4 font-medium text-stone-950">
          Questions from course teams
        </h2>
        <p className="mt-5 max-w-sm text-base leading-7 text-stone-600">
          Can’t find what you need? The{" "}
          <a
            className="font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900"
            href={env.VITE_DOCS_URL}
          >
            documentation
          </a>{" "}
          covers setup, platforms, and each product area in detail.
        </p>
      </LoadRow>

      <LoadRow
        className="divide-y divide-stone-200 border-y border-stone-200"
        index={24}
      >
        {faqs.map(([question, answer]) => (
          <details className="avon-faq group" key={question}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
              {question}
              <span
                aria-hidden="true"
                className="relative h-4 w-4 shrink-0 text-stone-500 before:absolute before:inset-x-0 before:top-1/2 before:h-[1.5px] before:-translate-y-1/2 before:bg-current before:content-[''] after:absolute after:inset-y-0 after:left-1/2 after:w-[1.5px] after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-200 after:content-[''] group-open:after:scale-y-0"
              />
            </summary>
            <p className="-mt-1 max-w-2xl pb-5 pr-10 text-[15px] leading-7 text-stone-600">
              {answer}
            </p>
          </details>
        ))}
      </LoadRow>
    </div>
  </section>
);
