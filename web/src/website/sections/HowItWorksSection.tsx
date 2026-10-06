import type { ReactNode } from "react";
import { LoadRow } from "../components/LoadRow";
import { SectionHeader } from "../components/SectionHeader";
import { SECTION_CONTAINER_CLASS } from "../constants";
import { lmsLogos } from "../content/data";

const StepVisualFrame = ({ children }: { readonly children: ReactNode }) => (
  <div
    aria-hidden="true"
    className="mt-6 flex h-36 items-center justify-center rounded-xl border border-stone-200 bg-white p-4"
  >
    {children}
  </div>
);

const RegisterVisual = () => (
  <StepVisualFrame>
    <div className="grid grid-cols-4 gap-3">
      {lmsLogos.map((logo) => (
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl border border-stone-200 bg-stone-50"
          key={logo.name}
        >
          <img alt="" className="h-7 w-7 object-contain" src={logo.logoSrc} />
        </div>
      ))}
    </div>
  </StepVisualFrame>
);

const SelectVisual = () => (
  <StepVisualFrame>
    <div className="w-full max-w-60 text-xs">
      <p className="font-medium text-stone-500">Select content</p>
      <div className="mt-2 grid gap-1.5">
        {["Lab 3 · Averages", "Coursework 1 · Stats"].map((label, index) => (
          <div
            className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 ${
              index === 0
                ? "border-[var(--avon-eyebrow)] bg-[var(--avon-eyebrow-soft)] text-stone-900"
                : "border-stone-200 text-stone-600"
            }`}
            key={label}
          >
            {label}
            {index === 0 ? (
              <span className="text-[var(--avon-eyebrow)]">●</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  </StepVisualFrame>
);

const LaunchVisual = () => (
  <StepVisualFrame>
    <div className="grid w-full max-w-60 gap-2 text-xs">
      {[
        ["Instructor", "Staff workspace"],
        ["Learner", "Student workspace"],
      ].map(([role, workspace]) => (
        <div
          className="flex items-center justify-between rounded-md border border-stone-200 px-2.5 py-2"
          key={role}
        >
          <span className="font-medium text-stone-900">{role}</span>
          <span className="text-stone-500">→ {workspace}</span>
        </div>
      ))}
    </div>
  </StepVisualFrame>
);

const steps = [
  {
    description:
      "Your VLE admin adds Avon as an LTI 1.3 external tool in Moodle, Canvas, Blackboard, or Brightspace.",
    title: "Register Avon once",
    visual: <RegisterVisual />,
  },
  {
    description:
      "Course staff use Select content (or their platform’s equivalent) to drop an Avon activity into the module.",
    title: "Add an activity",
    visual: <SelectVisual />,
  },
  {
    description:
      "Students and staff click the activity and land in the right workspace — no separate Avon password.",
    title: "Launch from the course",
    visual: <LaunchVisual />,
  },
] as const;

export const HowItWorksSection = () => (
  <section
    aria-label="How Avon works"
    className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24"
  >
    <div className={SECTION_CONTAINER_CLASS}>
      <SectionHeader
        align="center"
        description="Avon lives inside the learning platform your university already runs, so there is nothing new for students to sign up for."
        eyebrow="How it works"
        loadRowIndex={18}
        title="Up and running from your VLE"
      />

      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <LoadRow
            as="li"
            className="avon-raised flex flex-col rounded-2xl border border-stone-200 bg-white p-6 sm:p-7"
            index={20 + index}
            key={step.title}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full avon-step-number bg-stone-950 text-xs font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-medium text-stone-950">
              {step.title}
            </h3>
            <p className="mt-2 text-[15px] leading-6 text-stone-600">
              {step.description}
            </p>
            {step.visual}
          </LoadRow>
        ))}
      </ol>
    </div>
  </section>
);
