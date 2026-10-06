import { useEffect, useState } from "react";
import type { EditorChoice } from "../../types";
import { EditorPreviewMock } from "./EditorPreviewMock";

export const CyclingEditorPreview = ({
  activeEditor,
}: {
  readonly activeEditor: EditorChoice;
}) => {
  const [shownEditor, setShownEditor] = useState(activeEditor);
  const [incomingEditor, setIncomingEditor] = useState<EditorChoice | null>(
    null,
  );
  const [incomingVisible, setIncomingVisible] = useState(false);

  useEffect(() => {
    if (activeEditor === shownEditor) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setShownEditor(activeEditor);
      setIncomingEditor(null);
      setIncomingVisible(false);
      return;
    }

    setIncomingEditor(activeEditor);
    setIncomingVisible(false);

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIncomingVisible(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeEditor, shownEditor]);

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (
      event.propertyName !== "opacity" ||
      !incomingEditor ||
      !incomingVisible
    ) {
      return;
    }

    setShownEditor(incomingEditor);
    setIncomingEditor(null);
    setIncomingVisible(false);
  };

  return (
    <div className="relative h-[18rem] w-full">
      <div className="absolute inset-0 z-0">
        <EditorPreviewMock editor={shownEditor} />
      </div>

      {incomingEditor ? (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
            incomingVisible ? "opacity-100" : "opacity-0"
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          <EditorPreviewMock editor={incomingEditor} />
        </div>
      ) : null}
    </div>
  );
};
