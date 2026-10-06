import type { CSSProperties, ReactNode } from "react";
import { Check, MousePointer2 } from "lucide";
import {
  assessBreakdown,
  assessmentFlowRows,
  assessStats,
  chatMessages,
  provisionRows,
  provisionTemplateTree,
  suggestedDiffRows,
  testLogs,
  testSubmissionFiles,
} from "../content/data";
import { MessageIcon, renderLucideNodes } from "../lib/icons";
import type { NavPreviewTheme } from "../lib/navTheme";
import type { FeatureKind } from "../types";

type FeatureVisualVariant = "card" | "nav" | "page";

const motion = (animate: boolean, className: string) =>
  animate ? className : "";

const cardVisualPaddingClass = "p-6 sm:p-5";
const navVisualPaddingClass = "p-2";
const pageVisualPaddingClass = "h-full min-h-0 w-full p-4 sm:p-4";

const visualPaddingClassName = (variant: FeatureVisualVariant) => {
  if (variant === "nav") {
    return `h-full min-h-0 w-full ${navVisualPaddingClass}`;
  }

  if (variant === "page") {
    return pageVisualPaddingClass;
  }

  return cardVisualPaddingClass;
};

const isExpandedLayout = (variant: FeatureVisualVariant) => variant === "page";

const navPreviewShellClass = (previewTheme?: NavPreviewTheme) =>
  previewTheme
    ? `avon-nav-feature-visual avon-nav-feature-visual--${previewTheme} h-full min-h-0`
    : "";

const featureWindowClassName = (previewTheme?: NavPreviewTheme) =>
  previewTheme
    ? "flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-[var(--avon-nfv-border)] bg-[var(--avon-nfv-surface)] text-xs"
    : "flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-muted text-xs";

const featureWindowHeaderClassName = (previewTheme?: NavPreviewTheme) =>
  previewTheme
    ? "flex h-8 shrink-0 items-center justify-between border-b border-[var(--avon-nfv-border)] px-3 text-[var(--avon-nfv-header)]"
    : "flex h-8 shrink-0 items-center justify-between border-b border-border px-3 text-muted-foreground";

const nfvRowClassName = (previewTheme?: NavPreviewTheme) =>
  previewTheme
    ? "border-[var(--avon-nfv-border)] bg-[var(--avon-nfv-panel)] text-[var(--avon-nfv-muted)]"
    : "border-border bg-card text-muted-foreground";

const featureWindowBodyClassName = "relative min-h-0 flex-1 overflow-hidden";

const isPathLikeWindowLabel = (label: string) => /[/\\]/.test(label);

const featureWindowLabelClassName = (label: string) =>
  isPathLikeWindowLabel(label) ? "font-mono" : "font-sans";

const FeatureWindow = ({
  bodyClassName = "",
  children,
  className = "",
  headerClassName = "",
  previewTheme,
  title,
  trailing,
}: {
  readonly bodyClassName?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly headerClassName?: string;
  readonly previewTheme?: NavPreviewTheme;
  readonly title: string;
  readonly trailing?: ReactNode;
}) => (
  <div className={`${featureWindowClassName(previewTheme)} ${className}`}>
    <div
      className={`${featureWindowHeaderClassName(previewTheme)} ${headerClassName}`}
    >
      <span className={featureWindowLabelClassName(title)}>{title}</span>
      {trailing ? (
        typeof trailing === "string" ? (
          <span className={featureWindowLabelClassName(trailing)}>
            {trailing}
          </span>
        ) : (
          trailing
        )
      ) : null}
    </div>
    <div className={`${featureWindowBodyClassName} ${bodyClassName}`}>
      {children}
    </div>
  </div>
);

export const FeatureVisual = ({
  animate,
  kind,
  previewTheme,
  variant = "card",
}: {
  readonly animate: boolean;
  readonly kind: FeatureKind;
  readonly previewTheme?: NavPreviewTheme;
  readonly variant?: FeatureVisualVariant;
}) => {
  if (kind === "test") {
    return (
      <TestFeatureVisual
        animate={animate}
        previewTheme={previewTheme}
        variant={variant}
      />
    );
  }

  if (kind === "suggest") {
    return (
      <SuggestFeatureVisual
        animate={animate}
        previewTheme={previewTheme}
        variant={variant}
      />
    );
  }

  if (kind === "provision") {
    return (
      <ProvisionFeatureVisual
        animate={animate}
        previewTheme={previewTheme}
        variant={variant}
      />
    );
  }

  return (
    <AssessFeatureVisual
      animate={animate}
      previewTheme={previewTheme}
      variant={variant}
    />
  );
};

const TestLogPanel = ({
  animate,
  className = "",
  previewTheme,
}: {
  readonly animate: boolean;
  readonly className?: string;
  readonly previewTheme?: NavPreviewTheme;
}) => (
  <FeatureWindow
    bodyClassName="font-mono"
    className={className}
    previewTheme={previewTheme}
    title="coursework/tests"
    trailing="8 checks"
  >
    <div className="relative h-full overflow-hidden p-3 [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]">
      <div
        className={`flex flex-col ${motion(animate, "animate-[avon-test-log-scroll_11s_linear_infinite] will-change-transform motion-reduce:animate-none")}`}
      >
        {[0, 1].map((group) => (
          <div className="grid gap-3 pb-3" key={group}>
            {testLogs.map(([name, status], index) => (
              <div
                className={`flex items-center justify-between rounded-md border px-3 py-2 ${nfvRowClassName(previewTheme)}`}
                key={`${group}-${name}-${index}`}
              >
                <span>{name}</span>
                <span
                  className={
                    status === "passed"
                      ? "text-emerald-700"
                      : previewTheme
                        ? "text-[var(--avon-nfv-header)]"
                        : "text-muted-foreground"
                  }
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-14 ${
          previewTheme
            ? "bg-[var(--avon-nfv-log-fade)]"
            : "bg-[var(--avon-test-log-top-fade)]"
        }`}
      />
    </div>
  </FeatureWindow>
);

const TestFeatureVisual = ({
  animate,
  previewTheme,
  variant,
}: {
  readonly animate: boolean;
  readonly previewTheme?: NavPreviewTheme;
  readonly variant: FeatureVisualVariant;
}) => {
  if (variant === "page") {
    return (
      <div
        className={`grid h-full min-h-0 min-w-0 gap-3 sm:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] ${visualPaddingClassName(variant)}`}
      >
        <FeatureWindow
          bodyClassName="text-muted-foreground"
          className="h-full min-h-0"
          title="submission/ada"
          trailing="push #14"
        >
          <div className="flex h-full flex-col gap-3 p-3">
            <div className="grid gap-2">
              {testSubmissionFiles.map(([file, status]) => (
                <div
                  className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2"
                  key={file}
                >
                  <span className="font-mono text-[11px]">{file}</span>
                  <span
                    className={
                      status === "passed"
                        ? "text-emerald-700"
                        : status === "modified"
                          ? "text-violet-700"
                          : "text-muted-foreground"
                    }
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-md border border-border bg-muted px-3 py-2 text-[11px] text-muted-foreground">
              Triggered by push to main · runner queued 12s ago
            </div>
          </div>
        </FeatureWindow>
        <TestLogPanel animate={animate} className="h-full min-h-0" />
      </div>
    );
  }

  if (variant === "nav") {
    return (
      <div className={navPreviewShellClass(previewTheme)}>
        <div className={visualPaddingClassName(variant)}>
          <TestLogPanel
            animate={animate}
            className="h-full"
            previewTheme={previewTheme}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={visualPaddingClassName(variant)}>
      <TestLogPanel animate={animate} className="h-full" />
    </div>
  );
};

const SuggestChatPanel = ({
  animate,
  className = "",
  previewTheme,
}: {
  readonly animate: boolean;
  readonly className?: string;
  readonly previewTheme?: NavPreviewTheme;
}) => (
  <FeatureWindow
    className={className}
    previewTheme={previewTheme}
    title="review assistant"
    trailing="student/main"
  >
    <div className="h-full overflow-hidden p-3 [mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)]">
      <div
        className={`flex h-full flex-col ${motion(animate, "animate-[avon-chat-stack_8s_linear_infinite] will-change-transform motion-reduce:animate-none")}`}
      >
        {[0, 1].map((group) => (
          <div className="grid gap-2 pb-2" key={group}>
            {chatMessages.map(([role, text]) => (
              <div
                className={`flex w-full max-w-[14rem] gap-1.5 rounded-lg border px-3 py-2 motion-reduce:animate-none ${
                  role === "lecturer"
                    ? `ml-auto rounded-br-sm ${nfvRowClassName(previewTheme)}`
                    : "rounded-bl-sm border-[var(--avon-ai-border)] bg-[var(--avon-ai-bg)] text-[var(--avon-ai-text)]"
                }`}
                key={`${group}-${text}`}
                style={{
                  animationDelay: `${
                    chatMessages.findIndex(
                      ([, messageText]) => messageText === text,
                    ) * 2500
                  }ms`,
                }}
              >
                <MessageIcon role={role} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </FeatureWindow>
);

const SuggestFeatureVisual = ({
  animate,
  previewTheme,
  variant,
}: {
  readonly animate: boolean;
  readonly previewTheme?: NavPreviewTheme;
  readonly variant: FeatureVisualVariant;
}) => {
  if (variant === "nav") {
    return (
      <div className={navPreviewShellClass(previewTheme)}>
        <div className={visualPaddingClassName(variant)}>
          <SuggestChatPanel
            animate={animate}
            className="h-full min-h-0 w-full"
            previewTheme={previewTheme}
          />
        </div>
      </div>
    );
  }

  const splitLayoutClassName = isExpandedLayout(variant)
    ? "sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
    : "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]";

  const diffPanelClassName = isExpandedLayout(variant)
    ? "flex h-full min-h-0"
    : "hidden h-full lg:flex";

  return (
    <div
      className={`grid h-full min-h-0 min-w-0 gap-3 sm:gap-4 ${splitLayoutClassName} ${visualPaddingClassName(variant)}`}
    >
      <FeatureWindow
        bodyClassName="font-mono"
        className={diffPanelClassName}
        title="coursework/average.py"
      >
        <div className="h-full overflow-hidden p-3 [mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)]">
          <div
            className={`grid gap-1 ${motion(animate, "animate-[avon-diff-scan_5.8s_ease-in-out_infinite] will-change-transform motion-reduce:animate-none")}`}
          >
            {suggestedDiffRows.map(([sign, text], index) => {
              const rowClassName =
                sign === "-"
                  ? "bg-[var(--avon-diff-remove-bg)] text-[var(--avon-diff-remove-text)]"
                  : sign === "+"
                    ? "bg-[var(--avon-diff-add-bg)] text-[var(--avon-diff-add-text)]"
                    : sign === "✦"
                      ? `border border-[var(--avon-ai-border)] bg-[var(--avon-ai-bg)] text-[var(--avon-ai-text)] ${motion(animate, "animate-[avon-warning-pulse_3.8s_ease-in-out_infinite] motion-reduce:animate-none")}`
                      : "text-muted-foreground";
              const signClassName =
                sign === "-"
                  ? "text-[var(--avon-diff-remove-sign)]"
                  : sign === "+"
                    ? "text-[var(--avon-diff-add-sign)]"
                    : sign === "✦"
                      ? "text-[var(--avon-ai-accent)]"
                      : "";

              return (
                <div
                  className={`grid grid-cols-[18px_minmax(0,1fr)] gap-2 rounded px-2 py-1.5 ${rowClassName}`}
                  key={`${sign}-${index}`}
                >
                  <span className={signClassName}>{sign}</span>
                  <span className="truncate">{text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </FeatureWindow>
      <SuggestChatPanel animate={animate} className="h-full" />
    </div>
  );
};

const ProvisionFeatureVisual = ({
  animate,
  previewTheme,
  variant,
}: {
  readonly animate: boolean;
  readonly previewTheme?: NavPreviewTheme;
  readonly variant: FeatureVisualVariant;
}) => {
  const provisionButton = (
    <span className="relative shrink-0">
      <button
        className={`inline-flex h-5 items-center rounded bg-primary px-2 text-[10px] font-medium leading-none text-white shadow-sm ${motion(animate, "animate-[avon-provision-button_7.6s_ease-in-out_infinite] motion-reduce:animate-none")}`}
        type="button"
      >
        Provision
      </button>
      {/* Hidden by default; keyframes fade it in toward the button center. */}
      <svg
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 z-10 h-3 w-3 text-foreground opacity-0 drop-shadow-sm ${motion(animate, "animate-[avon-provision-cursor_7.6s_ease-in-out_infinite] motion-reduce:animate-none")}`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        {renderLucideNodes(MousePointer2)}
      </svg>
    </span>
  );

  const panel = (
    <FeatureWindow
      bodyClassName="font-mono"
      className="h-full min-h-0"
      headerClassName="gap-2"
      previewTheme={previewTheme}
      title="template/coursework-base"
      trailing={provisionButton}
    >
      <div className="relative h-full min-h-0">
        <div
          className={`absolute inset-0 overflow-hidden p-3 [mask-image:linear-gradient(to_bottom,black_0%,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_82%,transparent_100%)] ${motion(animate, "animate-[avon-provision-tree_7.6s_ease-in-out_infinite] motion-reduce:animate-none")}`}
        >
          <div
            className={`grid gap-1 ${previewTheme ? "text-[var(--avon-nfv-muted)]" : "text-muted-foreground"}`}
          >
            {provisionTemplateTree.map((item, index) => (
              <div
                className={`truncate rounded border px-2 py-1 ${nfvRowClassName(previewTheme)} ${
                  item.kind === "dir" ? "font-medium" : ""
                }`}
                key={`${index}-${item.name}`}
                style={{ marginLeft: `${item.depth * 0.7}rem` }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`absolute inset-0 flex flex-col justify-start gap-2 p-3 opacity-0 ${previewTheme ? "text-[var(--avon-nfv-muted)]" : "text-muted-foreground"} ${motion(animate, "animate-[avon-provision-terminal_7.6s_ease-in-out_infinite] motion-reduce:animate-none")}`}
        >
          {provisionRows.map((target, index) => (
            <div
              className={`flex items-center justify-between rounded border px-2 py-1.5 opacity-0 ${nfvRowClassName(previewTheme)} ${motion(animate, "animate-[avon-provision-row_7.6s_ease-in-out_infinite] motion-reduce:animate-none")}`}
              key={target}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span>{target}</span>
              <svg
                aria-hidden="true"
                className="h-3 w-3 text-emerald-700"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {renderLucideNodes(Check)}
              </svg>
            </div>
          ))}
        </div>
      </div>
    </FeatureWindow>
  );

  if (variant === "nav") {
    return (
      <div className={navPreviewShellClass(previewTheme)}>
        <div className={visualPaddingClassName(variant)}>{panel}</div>
      </div>
    );
  }

  return (
    <div
      className={`h-full min-h-0 min-w-0 ${visualPaddingClassName(variant)}`}
    >
      {panel}
    </div>
  );
};

const AssessSubmissionsPanel = ({
  animate,
  className = "",
  fillHeight = false,
  previewTheme,
}: {
  readonly animate: boolean;
  readonly className?: string;
  readonly fillHeight?: boolean;
  readonly previewTheme?: NavPreviewTheme;
}) => (
  <FeatureWindow
    className={className}
    previewTheme={previewTheme}
    title="submissions"
    trailing={fillHeight ? "22 submissions" : undefined}
  >
    <div className="flex h-full flex-col p-3">
      <div
        className={`grid grid-cols-2 gap-3 ${fillHeight ? "flex-1 content-center" : ""}`}
      >
        {assessStats.map(([label, score, color], index) => {
          const offset = 113 - (score / 100) * 113;

          return (
            <div
              className="grid content-center justify-items-center"
              key={label}
            >
              <div className="relative h-[58px] w-[58px]">
                <svg
                  aria-hidden="true"
                  className="-rotate-90"
                  height="58"
                  viewBox="0 0 58 58"
                  width="58"
                >
                  <circle
                    className={
                      previewTheme
                        ? "stroke-[var(--avon-nfv-ring)]"
                        : "stroke-border"
                    }
                    cx="29"
                    cy="29"
                    fill="none"
                    r="18"
                    strokeWidth="5"
                  />
                  <circle
                    className={`${color} ${motion(animate, "animate-[avon-assess-ring_1200ms_ease-out_both] motion-reduce:animate-none")}`}
                    cx="29"
                    cy="29"
                    fill="none"
                    r="18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeDasharray="113"
                    strokeWidth="5"
                    style={
                      {
                        "--avon-assess-offset": offset,
                        animationDelay: `${index * 220}ms`,
                      } as CSSProperties
                    }
                  />
                </svg>
                <span
                  className={`absolute inset-0 grid place-items-center text-[13px] ${previewTheme ? "text-[var(--avon-nfv-strong)]" : "text-foreground"}`}
                >
                  {score}
                </span>
              </div>
              <span
                className={
                  previewTheme
                    ? "mt-2 text-[var(--avon-nfv-muted)]"
                    : "mt-2 text-muted-foreground"
                }
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className={`mt-3 grid grid-cols-3 gap-2 border-t pt-3 text-center ${previewTheme ? "border-[var(--avon-nfv-border)]" : "border-border"}`}
      >
        {assessBreakdown.map(([value, label]) => (
          <div key={label}>
            <div
              className={`text-sm font-medium ${previewTheme ? "text-[var(--avon-nfv-strong)]" : "text-foreground"}`}
            >
              {value}
            </div>
            <div
              className={`mt-0.5 text-[11px] ${previewTheme ? "text-[var(--avon-nfv-muted)]" : "text-muted-foreground"}`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </FeatureWindow>
);

const AssessFeatureVisual = ({
  animate,
  previewTheme,
  variant,
}: {
  readonly animate: boolean;
  readonly previewTheme?: NavPreviewTheme;
  readonly variant: FeatureVisualVariant;
}) => {
  if (variant === "nav") {
    return (
      <div className={navPreviewShellClass(previewTheme)}>
        <div className={visualPaddingClassName(variant)}>
          <AssessSubmissionsPanel
            animate={animate}
            className="h-full"
            fillHeight
            previewTheme={previewTheme}
          />
        </div>
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div
        className={`grid h-full min-h-0 w-full gap-3 text-xs sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] ${visualPaddingClassName(variant)}`}
      >
        <AssessSubmissionsPanel
          animate={animate}
          className="h-full min-h-0"
          fillHeight
        />
        <FeatureWindow
          className="h-full min-h-0 text-muted-foreground"
          title="assessment flow"
          trailing="22 submissions"
        >
          <div className="flex h-full flex-col justify-start p-3">
            {assessmentFlowRows.map(([label, status], index) => (
              <div
                className={`flex items-center justify-between border-t border-border py-1.5 first:border-t-0 ${motion(animate, "animate-[avon-assess-focus_6.2s_ease-in-out_infinite] motion-reduce:animate-none")}`}
                key={label}
                style={{ animationDelay: `${index * 780}ms` }}
              >
                <span>{label}</span>
                <span className="text-muted-foreground">{status}</span>
              </div>
            ))}
          </div>
        </FeatureWindow>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col gap-3 text-xs ${visualPaddingClassName(variant)}`}
    >
      <AssessSubmissionsPanel animate={animate} className="shrink-0" />
      <FeatureWindow
        className="min-h-0 flex-1 text-muted-foreground"
        title="assessment flow"
        trailing="22 submissions"
      >
        <div className="flex h-full flex-col justify-start p-3">
          {assessmentFlowRows.map(([label, status], index) => (
            <div
              className={`flex items-center justify-between border-t border-border py-1.5 first:border-t-0 ${motion(animate, "animate-[avon-assess-focus_6.2s_ease-in-out_infinite] motion-reduce:animate-none")}`}
              key={label}
              style={{ animationDelay: `${index * 780}ms` }}
            >
              <span>{label}</span>
              <span className="text-muted-foreground">{status}</span>
            </div>
          ))}
        </div>
      </FeatureWindow>
    </div>
  );
};
