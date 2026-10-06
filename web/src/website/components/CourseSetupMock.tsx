import { GitBranch } from "lucide";
import { courseFiles, courseSetupRows } from "../content/data";
import { LucideIcon } from "../lib/icons";
import { MockPanel } from "./MockPanel";

/** Product UI mock of course setup — mirrors app Card/muted surfaces. */
export const CourseSetupMock = () => (
  <MockPanel>
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm">
        <span className="font-medium text-foreground">Course setup</span>
        <span className="text-muted-foreground">CS204 / Week 3</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-lg border border-border bg-muted p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <LucideIcon icon={GitBranch} />
            coursework-base
          </div>
          <div className="grid gap-2 font-mono text-xs text-muted-foreground">
            {courseFiles.map((item) => (
              <div
                className="rounded-md border border-border bg-card px-3 py-2"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {courseSetupRows.map(([label, value, status]) => (
            <div
              className="rounded-lg border border-border bg-muted px-4 py-3"
              key={label}
            >
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-foreground">{label}</span>
                <span className="text-xs text-success-foreground">
                  {status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </MockPanel>
);
