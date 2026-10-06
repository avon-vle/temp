const students = [
  ["Ada Lovelace", "ada-lovelace"],
  ["Grace Hopper", "grace-hopper"],
  ["Alan Turing", "alan-turing"],
  ["Katherine Johnson", "katherine-johnson"],
  ["Edsger Dijkstra", "edsger-dijkstra"],
  ["Margaret Hamilton", "margaret-hamilton"],
] as const;

const setupSteps = ["Code & tests", "Docker", "Verify", "Provision"] as const;

const CheckIcon = ({ className = "" }: { readonly className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16">
    <path
      d="m3.25 8.25 3 3 6.5-6.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const ProvisionProductPreview = () => (
  <div
    aria-label="Animated preview of Avon provisioning repositories for a course roster"
    role="img"
    className="avon-provision-product-preview relative flex h-full min-h-0 flex-col overflow-hidden bg-[var(--avon-provision-demo-bg)] p-4 text-left text-[var(--avon-provision-demo-fg)] sm:p-5 lg:p-6"
  >
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--avon-provision-demo-border)] pb-3">
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--avon-provision-demo-muted)]">
          Course setup
        </p>
        <h2 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-xl">
          Introduction to programming
        </h2>
      </div>
      <button
        className="hidden rounded-md border border-[var(--avon-provision-demo-border)] bg-[var(--avon-provision-demo-surface)] px-3 py-1.5 text-sm font-medium text-[var(--avon-provision-demo-fg)] shadow-[0_1px_0_rgba(31,35,40,0.04)] sm:block"
        tabIndex={-1}
        type="button"
      >
        Open workspace
      </button>
    </header>

    <nav
      aria-label="Course setup stages"
      className="flex shrink-0 items-center overflow-hidden py-3"
    >
      {setupSteps.map((step, index) => {
        const active = index === setupSteps.length - 1;

        return (
          <div className="contents" key={step}>
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="mx-1 h-px w-3 shrink-0 bg-[var(--avon-provision-demo-connector)] sm:mx-2 sm:w-6 lg:w-10"
              />
            ) : null}
            <div
              className={`flex min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1.5 sm:px-2.5 ${
                active ? "bg-[var(--avon-provision-demo-blue-soft)]" : ""
              }`}
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
                  active
                    ? "bg-[var(--avon-provision-demo-blue)] text-white"
                    : "bg-[var(--avon-provision-demo-green)] text-white"
                }`}
              >
                {active ? index + 1 : <CheckIcon className="size-3" />}
              </span>
              <span
                className={`hidden truncate text-sm font-medium min-[460px]:block ${
                  active
                    ? "text-[var(--avon-provision-demo-blue)]"
                    : "text-[var(--avon-provision-demo-fg)]"
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </nav>

    <section className="relative min-h-0 flex-1 overflow-hidden rounded-md border border-[var(--avon-provision-demo-border)] bg-[var(--avon-provision-demo-surface)] shadow-[0_1px_0_rgba(31,35,40,0.04)]">
      <div className="avon-provision-demo-setup absolute inset-0 flex min-h-0 flex-col p-4">
        <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-2">
          <div className="min-h-0 overflow-hidden">
            <h3 className="text-base font-semibold">Provision</h3>
            <p className="mt-1 text-sm leading-5 text-[var(--avon-provision-demo-muted)]">
              Create repositories from the verified coursework template.
            </p>

            <fieldset className="mt-4 rounded-md border border-[var(--avon-provision-demo-border)] p-3">
              <legend className="px-1 text-sm font-semibold">
                Provisioning mode
              </legend>
              <label className="mt-1 flex gap-3 rounded-md border border-[var(--avon-provision-demo-blue)] bg-[var(--avon-provision-demo-blue-soft)] px-3 py-2.5">
                <input
                  checked
                  className="mt-0.5 size-4 shrink-0 accent-[var(--avon-provision-demo-blue)]"
                  onChange={() => undefined}
                  tabIndex={-1}
                  type="radio"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    One repository per student
                  </span>
                  <span className="mt-0.5 block text-sm text-[var(--avon-provision-demo-muted)]">
                    Use the current course roster.
                  </span>
                </span>
              </label>
              <label className="mt-2 hidden gap-3 rounded-md border border-[var(--avon-provision-demo-border)] px-3 py-2.5 sm:flex">
                <input
                  className="mt-0.5 size-4 shrink-0 accent-[var(--avon-provision-demo-blue)]"
                  disabled
                  type="radio"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    One repository per team
                  </span>
                  <span className="mt-0.5 block text-sm text-[var(--avon-provision-demo-muted)]">
                    Group students using a team roster.
                  </span>
                </span>
              </label>
            </fieldset>
          </div>

          <aside className="hidden min-h-0 flex-col overflow-hidden rounded-md border border-[var(--avon-provision-demo-border)] md:flex">
            <div className="flex h-10 shrink-0 items-center justify-between border-b border-[var(--avon-provision-demo-border)] bg-[var(--avon-provision-demo-subtle)] px-3">
              <h3 className="text-sm font-semibold">Preview</h3>
              <span className="text-xs text-[var(--avon-provision-demo-muted)]">
                6 students
              </span>
            </div>
            <ul className="space-y-2 p-3">
              {students.map(([name, slug]) => (
                <li
                  className="rounded-md border border-[var(--avon-provision-demo-border)] bg-[var(--avon-provision-demo-subtle)] px-3 py-2"
                  key={slug}
                >
                  <span className="block text-sm font-medium">{name}</span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-[var(--avon-provision-demo-muted)]">
                    intro-{slug}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-end border-t border-[var(--avon-provision-demo-border)] pt-3">
          <span className="avon-provision-demo-button rounded-md border border-[var(--avon-provision-demo-button-border)] bg-[var(--avon-provision-demo-button)] px-3 py-1.5 text-sm font-medium text-white shadow-[0_1px_0_rgba(31,35,40,0.1)]">
            Provision 6 repos
          </span>
        </div>
      </div>

      <div className="avon-provision-demo-progress absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0">
        <span className="avon-provision-demo-spinner size-11 rounded-full border-[3px] border-[var(--avon-provision-demo-border)] border-t-[var(--avon-provision-demo-blue)]" />
        <p className="mt-5 text-base font-semibold">
          Provisioning repositories…
        </p>
        <p className="mt-1 text-sm text-[var(--avon-provision-demo-muted)]">
          Creating private student repos
        </p>
        <div className="mt-5 w-full max-w-md">
          <div className="h-2 overflow-hidden rounded-full bg-[var(--avon-provision-demo-inset)]">
            <span className="avon-provision-demo-bar block h-full rounded-full bg-[var(--avon-provision-demo-green)]" />
          </div>
          <div className="mt-2 flex justify-between text-xs text-[var(--avon-provision-demo-muted)]">
            <span>coursework/python-intro</span>
            <span>6 repositories</span>
          </div>
        </div>
      </div>

      <div className="avon-provision-demo-complete absolute inset-0 flex flex-col p-4 opacity-0 sm:p-5">
        <div className="flex items-start gap-3 border-b border-[var(--avon-provision-demo-border)] pb-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--avon-provision-demo-green)] text-white">
            <CheckIcon className="size-4" />
          </span>
          <div>
            <h3 className="text-base font-semibold">
              Repositories provisioned
            </h3>
            <p className="mt-1 text-sm text-[var(--avon-provision-demo-muted)]">
              Starter code is ready for every student.
            </p>
          </div>
        </div>
        <ul className="mt-3 min-h-0 space-y-1.5 overflow-hidden">
          {students.map(([name, slug], index) => (
            <li
              className="avon-provision-demo-repo flex items-center justify-between gap-4 rounded-md border border-[var(--avon-provision-demo-border)] px-3 py-2.5 opacity-0"
              key={slug}
              style={{ "--avon-repo-index": index } as React.CSSProperties}
            >
              <span className="min-w-0">
                <span className="block truncate font-mono text-xs sm:text-sm">
                  intro-{slug}
                </span>
                <span className="mt-0.5 block text-xs text-[var(--avon-provision-demo-muted)]">
                  {name}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[var(--avon-provision-demo-green)]">
                <CheckIcon className="size-3" /> Ready
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </div>
);
