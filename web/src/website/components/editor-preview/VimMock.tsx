import { CodeLines } from "./CodeLines";
import { vimCodeLines } from "./content";
import { EditorMockShell, EditorWindowControls } from "./EditorMockShell";

const vimLines = [
  ...vimCodeLines,
  { num: 9, tokens: [{ text: "~", color: "text-[#1f4d7a]" }] },
  { num: 10, tokens: [{ text: "~", color: "text-[#1f4d7a]" }] },
  { num: 11, tokens: [{ text: "~", color: "text-[#1f4d7a]" }] },
  { num: 12, tokens: [{ text: "~", color: "text-[#1f4d7a]" }] },
  { num: 13, tokens: [{ text: "~", color: "text-[#1f4d7a]" }] },
] as const;

export const VimMock = () => (
  <EditorMockShell
    borderClassName="border-[#3a3a3a]"
    editor={<CodeLines lineNumberClassName="text-[#5c5c5c]" lines={vimLines} />}
    layout="buffer"
    shellClassName="bg-[#0a0a0a] text-[#c8c8c8]"
    statusBar={
      <>
        <span className="text-[#6fcf6f]">-- NORMAL --</span>
        <span className="text-[#5c5c5c]">average.py · 8,29 · All</span>
      </>
    }
    statusBarClassName="border-t border-[#2a2a2a] bg-[#1c1c1c]"
    titleBar={
      <>
        <EditorWindowControls />
        <span className="ml-2 truncate text-[10px] text-[#7a7a7a]">
          student@lab: ~/coursework - vim
        </span>
      </>
    }
    titleBarClassName="border-[#2a2a2a] bg-[#1c1c1c]"
  />
);
