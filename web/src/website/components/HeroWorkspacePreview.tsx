import canvasLogo from "../../assets/logos/canvas.svg";
import githubLogo from "../../assets/logos/github.svg";
import gitlabLogo from "../../assets/logos/gitlab.svg";
import moodleLogo from "../../assets/logos/moodle.svg";

const sidebarApps = [
  { logo: moodleLogo, name: "Moodle" },
  { logo: canvasLogo, name: "Canvas" },
  { logo: githubLogo, name: "GitHub" },
  { logo: gitlabLogo, name: "GitLab" },
] as const;

export const HeroWorkspacePreview = () => (
  <div
    aria-hidden="true"
    className="avon-hero-workspace avon-keep-light overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_28px_80px_rgb(15_23_42_/_22%)]"
  >
    <div className="flex h-10 items-center gap-2 border-b border-stone-200 bg-[#f6f7f8] px-4">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <div className="ml-3 hidden min-w-0 items-center gap-2 text-[12px] text-stone-500 sm:flex">
        <span>Avon</span>
        <span>/</span>
        <span className="truncate text-stone-700">
          Provision starter code · COMP1001
        </span>
      </div>
    </div>

    <div className="grid min-h-[22rem] grid-cols-1 sm:min-h-[26rem] sm:grid-cols-[13.5rem_minmax(0,1fr)] lg:min-h-[30rem]">
      <aside className="hidden border-r border-stone-200 bg-[#f7f8fa] px-3 py-4 sm:block">
        <div className="flex items-center gap-2 px-2 pb-4">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0273f1] text-[11px] font-semibold text-white">
            A
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-stone-900">
              COMP1001
            </p>
            <p className="truncate text-[11px] text-stone-500">Spring 2026</p>
          </div>
        </div>

        <p className="px-2 pb-2 text-[11px] font-medium text-stone-400">
          Connected
        </p>
        <div className="grid gap-0.5">
          {sidebarApps.map((app) => (
            <div
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-stone-700"
              key={app.name}
            >
              <img alt="" className="h-5 w-5 object-contain" src={app.logo} />
              {app.name}
            </div>
          ))}
        </div>

        <p className="mt-5 px-2 pb-2 text-[11px] font-medium text-stone-400">
          Tasks
        </p>
        <div className="rounded-lg bg-white px-2 py-2 text-[12px] font-medium text-stone-900 shadow-sm ring-1 ring-stone-200">
          Provision starter code
        </div>
        <div className="mt-1 px-2 py-2 text-[12px] text-stone-500">
          Sync grades to Canvas
        </div>
      </aside>

      <div className="flex min-w-0 flex-col bg-white px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex items-center justify-between gap-3 text-[12px] text-stone-400">
          <span className="truncate">
            Avon · Provision starter code · COMP1001
          </span>
        </div>
        <h2 className="mt-4 text-[1.35rem] font-medium tracking-tight text-stone-950 sm:text-[1.6rem]">
          Provision starter code for COMP1001
        </h2>

        <div className="mt-8 flex justify-end">
          <div className="rounded-full bg-stone-100 px-4 py-2 text-[13px] text-stone-700">
            create private repos from the coursework template
          </div>
        </div>

        <p className="mt-10 max-w-xl text-[15px] leading-7 text-stone-700">
          First, I&apos;ll import the roster and create a repository for each
          student
          <span className="avon-caret ml-0.5 inline-block h-[1.05em] w-px translate-y-[2px] bg-stone-900 align-middle" />
        </p>
      </div>
    </div>
  </div>
);
