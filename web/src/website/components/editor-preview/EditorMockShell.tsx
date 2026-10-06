import type { ReactNode } from "react";

export const editorMockBodyClassName =
  "grid h-[14.25rem] shrink-0 grid-cols-[36px_minmax(0,8.5rem)_minmax(0,1fr)] overflow-hidden sm:grid-cols-[40px_minmax(0,9.5rem)_minmax(0,1fr)]";

export const EditorMockShell = ({
  activityBar,
  borderClassName,
  editor,
  layout = "ide",
  shellClassName,
  sidebar,
  statusBar,
  statusBarClassName,
  tabs,
  tabsClassName,
  titleBar,
  titleBarClassName,
}: {
  readonly activityBar?: ReactNode;
  readonly borderClassName: string;
  readonly editor: ReactNode;
  readonly layout?: "buffer" | "ide";
  readonly shellClassName: string;
  readonly sidebar?: ReactNode;
  readonly statusBar: ReactNode;
  readonly statusBarClassName: string;
  readonly tabs?: ReactNode;
  readonly tabsClassName?: string;
  readonly titleBar: ReactNode;
  readonly titleBarClassName: string;
}) => (
  <div
    aria-hidden="true"
    className={`flex h-[18rem] w-full flex-col overflow-hidden rounded-xl rounded-bl-none border font-mono text-[11px] shadow-[0_28px_70px_rgb(24_21_17_/_22%)] sm:text-xs ${borderClassName} ${shellClassName}`}
  >
    <div
      className={`flex h-8 shrink-0 items-center gap-2 border-b px-3 ${titleBarClassName}`}
    >
      {titleBar}
    </div>

    {layout === "buffer" ? (
      <div className="h-[14.25rem] shrink-0 overflow-hidden">{editor}</div>
    ) : (
      <div className={editorMockBodyClassName}>
        {activityBar}
        {sidebar}
        <div className="flex min-w-0 flex-col overflow-hidden">
          <div
            className={`flex h-7 shrink-0 items-stretch border-b ${tabsClassName}`}
          >
            {tabs}
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">{editor}</div>
        </div>
      </div>
    )}

    <div
      className={`flex h-7 shrink-0 items-center justify-between px-3 text-[9px] ${statusBarClassName}`}
    >
      {statusBar}
    </div>
  </div>
);

export const EditorWindowControls = () => (
  <div className="flex gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
  </div>
);
