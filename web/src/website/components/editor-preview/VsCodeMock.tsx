import { CodeLines } from "./CodeLines";
import { vscodeCodeLines } from "./content";
import { EditorMockShell, EditorWindowControls } from "./EditorMockShell";

type FileTreeItem = {
  readonly active?: boolean;
  readonly depth: number;
  readonly label: string;
  readonly open?: boolean;
};

const fileTree: readonly FileTreeItem[] = [
  { depth: 0, label: "coursework", open: true },
  { depth: 1, label: "average.py", active: true },
  { depth: 1, label: "tests", open: false },
  { depth: 2, label: "test_average.py" },
  { depth: 1, label: "README.md" },
  { depth: 0, label: ".avon", open: false },
];

export const VsCodeMock = () => (
  <EditorMockShell
    activityBar={
      <div className="flex flex-col items-center gap-3 border-r border-[#2b2b2b] bg-[#333333] py-3">
        <span className="h-4 w-4 rounded-sm bg-[#007acc]/80" />
        <span className="h-4 w-4 rounded-sm bg-[#858585]/35" />
        <span className="h-4 w-4 rounded-sm bg-[#858585]/35" />
        <span className="h-4 w-4 rounded-sm bg-[#858585]/35" />
      </div>
    }
    borderClassName="border-[#2b2b2b]"
    editor={
      <CodeLines lineNumberClassName="text-[#858585]" lines={vscodeCodeLines} />
    }
    shellClassName="bg-[#1e1e1e] text-[#cccccc]"
    statusBarClassName="border-t border-[#007acc] bg-[#007acc]"
    tabsClassName="border-[#2b2b2b] bg-[#252526]"
    titleBarClassName="border-[#2b2b2b] bg-[#323233]"
    sidebar={
      <div className="overflow-hidden border-r border-[#2b2b2b] bg-[#252526] py-2">
        <div className="px-3 pb-2 text-[9px] font-medium uppercase tracking-[0.12em] text-[#8b8b8b]">
          Explorer
        </div>
        {fileTree.map((item) => (
          <div
            className={`truncate px-2 py-0.5 ${
              item.active ? "bg-[#37373d] text-white" : "text-[#cccccc]/88"
            }`}
            key={item.label}
            style={{ paddingLeft: `${8 + item.depth * 10}px` }}
          >
            {item.open === true ? "▾ " : item.open === false ? "▸ " : "  "}
            {item.label}
          </div>
        ))}
      </div>
    }
    statusBar={
      <>
        <span className="text-white">main</span>
        <span className="hidden text-white sm:inline">
          Python 3.12 · UTF-8 · Ln 8, Col 28
        </span>
        <span className="text-white sm:hidden">Python 3.12</span>
      </>
    }
    tabs={
      <>
        <div className="flex items-center border-r border-[#2b2b2b] bg-[#1e1e1e] px-3 text-[10px] text-white">
          average.py
        </div>
        <div className="flex items-center px-3 text-[10px] text-[#8b8b8b]">
          test_average.py
        </div>
      </>
    }
    titleBar={
      <>
        <EditorWindowControls />
        <span className="ml-2 truncate text-[10px] text-[#9d9d9d]">
          average.py - coursework
        </span>
      </>
    }
  />
);
