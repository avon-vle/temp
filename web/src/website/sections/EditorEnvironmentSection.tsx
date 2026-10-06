import { useRef } from "react";
import { Check } from "lucide";
import { CyclingEditorPreview } from "../components/editor-preview/CyclingEditorPreview";
import { LoadRow } from "../components/LoadRow";
import { SectionEyebrow } from "../components/SectionHeader";
import { SECTION_CONTAINER_CLASS } from "../constants";
import { useCyclingEditor } from "../hooks/useCyclingEditor";
import { useEditorPreviewScale } from "../hooks/useEditorPreviewScale";
import { LucideIcon } from "../lib/icons";

const editorPoints = [
  "Local machines, lab images, or browser-based setups",
  "VS Code, JetBrains, Vim — whatever students already use",
  "Plain Git repositories, no proprietary client to install",
] as const;

export const EditorEnvironmentSection = () => {
  const editor = useCyclingEditor();
  const editorSlotRef = useRef<HTMLDivElement | null>(null);
  const scale = useEditorPreviewScale(editorSlotRef);

  return (
    <section
      aria-label="Student development environments"
      className="bg-white pb-20 sm:pb-24"
    >
      <div className={SECTION_CONTAINER_CLASS}>
        <div className="avon-raised grid min-w-0 overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 lg:grid-cols-2">
          <div className="flex items-center p-8 sm:p-10 lg:p-14">
            <div className="w-full min-w-0">
              <LoadRow index={14}>
                <SectionEyebrow>For students</SectionEyebrow>
                <h2 className="avon-section-title mt-4 font-medium text-stone-950">
                  Students work in a familiar environment
                </h2>
              </LoadRow>
              <LoadRow className="mt-5" index={15}>
                <p className="text-base leading-7 text-stone-600 sm:text-lg">
                  Avon fits around the way your department already teaches. No
                  forced toolchain, no new habits to learn.
                </p>
              </LoadRow>
              <LoadRow as="ul" className="mt-7 grid gap-3" index={16}>
                {editorPoints.map((point) => (
                  <li
                    className="flex items-start gap-3 text-[15px] leading-6 text-stone-700"
                    key={point}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--avon-eyebrow-soft)]">
                      <LucideIcon
                        className="h-3 w-3 text-[var(--avon-eyebrow)]"
                        icon={Check}
                      />
                    </span>
                    {point}
                  </li>
                ))}
              </LoadRow>
            </div>
          </div>

          <LoadRow
            className="relative flex min-h-[22rem] min-w-0 flex-col overflow-hidden lg:min-h-[30rem]"
            index={17}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 [background:var(--avon-editor-gradient)]"
            />
            <div
              aria-hidden="true"
              className="relative h-12 shrink-0 sm:h-14 lg:h-16"
            />
            <div
              className="relative min-h-0 min-w-0 flex-1 overflow-hidden"
              ref={editorSlotRef}
            >
              <div
                className="absolute bottom-0 left-6 w-full max-w-full origin-bottom-left lg:left-8"
                style={{ transform: `scale(${scale})` }}
              >
                <CyclingEditorPreview activeEditor={editor} />
              </div>
            </div>
          </LoadRow>
        </div>
      </div>
    </section>
  );
};
