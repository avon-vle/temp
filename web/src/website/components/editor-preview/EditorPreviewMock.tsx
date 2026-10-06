import type { EditorChoice } from "../../types";
import { JetBrainsMock } from "./JetBrainsMock";
import { VimMock } from "./VimMock";
import { VsCodeMock } from "./VsCodeMock";

export const EditorPreviewMock = ({
  editor,
}: {
  readonly editor: EditorChoice;
}) => {
  if (editor === "jetbrains") {
    return <JetBrainsMock />;
  }

  if (editor === "vim") {
    return <VimMock />;
  }

  return <VsCodeMock />;
};
