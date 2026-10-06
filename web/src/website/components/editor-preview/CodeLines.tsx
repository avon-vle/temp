import type { ReactNode } from "react";
import type { CodeLine } from "./content";

export const CodeLines = ({
  lineNumberClassName,
  lines,
  renderLineSuffix,
}: {
  readonly lineNumberClassName: string;
  readonly lines: readonly CodeLine[];
  readonly renderLineSuffix?: (line: CodeLine) => ReactNode;
}) => (
  <div className="grid h-full grid-cols-[2rem_minmax(0,1fr)] gap-x-2 overflow-hidden px-2 py-3 leading-5">
    {lines.map((line) => (
      <div className="contents" key={line.num}>
        <span className={`select-none text-right ${lineNumberClassName}`}>
          {line.num}
        </span>
        <span>
          {line.tokens.map((token) => (
            <span className={token.color} key={token.text}>
              {token.text}
            </span>
          ))}
          {renderLineSuffix?.(line)}
        </span>
      </div>
    ))}
  </div>
);
