import { CodeLines } from "./CodeLines";
import { averageCodeLines } from "./content";
import { EditorMockShell, EditorWindowControls } from "./EditorMockShell";

type ProjectTreeItem = {
  readonly active?: boolean;
  readonly depth: number;
  readonly label: string;
};

const projectTree: readonly ProjectTreeItem[] = [
  { depth: 0, label: "coursework" },
  { depth: 1, label: "average.py", active: true },
  { depth: 1, label: "tests" },
  { depth: 2, label: "test_average.py" },
  { depth: 1, label: "README.md" },
  { depth: 0, label: ".avon" },
];

export const JetBrainsMock = () => (
  <EditorMockShell
    activityBar={
      <div className="flex flex-col items-center gap-3 border-r border-[#1e1e1e] bg-[#333333] py-3">
        <span className="h-4 w-4 rounded-sm bg-[#ff8f2b]/85" />
        <span className="h-4 w-4 rounded-sm bg-[#6e6e6e]/45" />
        <span className="h-4 w-4 rounded-sm bg-[#6e6e6e]/45" />
        <span className="h-4 w-4 rounded-sm bg-[#6e6e6e]/45" />
      </div>
    }
    borderClassName="border-[#323232]"
    editor={
      <CodeLines
        lineNumberClassName="text-[#606366]"
        lines={averageCodeLines}
      />
    }
    shellClassName="bg-[#2b2b2b] text-[#bbbbbb]"
    statusBarClassName="border-t border-[#1e1e1e] bg-[#3c3f41]"
    tabsClassName="border-[#1e1e1e] bg-[#3c3f41]"
    titleBarClassName="border-[#1e1e1e] bg-[#3c3f41]"
    sidebar={
      <div className="overflow-hidden border-r border-[#1e1e1e] bg-[#313335] py-2">
        <div className="px-3 pb-2 text-[9px] font-medium uppercase tracking-[0.12em] text-[#787878]">
          Project
        </div>
        {projectTree.map((item) => (
          <div
            className={`truncate px-2 py-0.5 ${
              item.active ? "bg-[#4b4f51] text-white" : "text-[#bbbbbb]/90"
            }`}
            key={item.label}
            style={{ paddingLeft: `${8 + item.depth * 10}px` }}
          >
            {item.label}
          </div>
        ))}
      </div>
    }
    statusBar={
      <>
        <span className="text-[#afb1b3]">main</span>
        <span className="hidden text-[#afb1b3] sm:inline">
          Python 3.12 · UTF-8 · Ln 8, Col 28
        </span>
        <span className="text-[#afb1b3] sm:hidden">Python 3.12</span>
      </>
    }
    tabs={
      <>
        <div className="flex items-center border-b-2 border-[#ff8f2b] bg-[#2b2b2b] px-3 text-[10px] text-white">
          average.py
        </div>
        <div className="flex items-center px-3 text-[10px] text-[#afb1b3]">
          test_average.py
        </div>
      </>
    }
    titleBar={
      <>
        <EditorWindowControls />
        <span className="ml-2 truncate text-[10px] text-[#afb1b3]">
          coursework - PyCharm
        </span>
      </>
    }
  />
);
