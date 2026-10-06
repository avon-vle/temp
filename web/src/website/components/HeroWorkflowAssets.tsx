import canvasLogo from "../../assets/logos/canvas.svg";
import gitlabLogo from "../../assets/logos/gitlab.svg";
import moodleLogo from "../../assets/logos/moodle.svg";

const shellClassName =
  "absolute overflow-hidden rounded-xl border border-stone-200 bg-white text-[#181511] shadow-[0_2px_8px_rgb(15_23_42_/_18%)]";

const headerClassName =
  "flex h-9 items-center gap-2 border-b border-stone-200 bg-stone-50 px-3 font-mono text-[10px] text-stone-500";

const RepoAsset = () => (
  <div
    className={`${shellClassName} left-[1%] top-[11%] hidden w-56 -rotate-6 sm:block lg:left-[2%] lg:top-[12%] lg:w-64`}
  >
    <div className={headerClassName}>
      <img alt="" className="h-4 w-4 rounded" src={gitlabLogo} />
      <span>template/coursework-base</span>
    </div>
    <div className="grid gap-2.5 p-3 font-mono text-[10px] sm:p-4">
      {[
        ["README.md", "course brief"],
        ["src/", "starter code"],
        ["tests/", "8 checks"],
      ].map(([file, detail]) => (
        <div className="flex items-center justify-between gap-3" key={file}>
          <span className="text-stone-800">{file}</span>
          <span className="text-stone-400">{detail}</span>
        </div>
      ))}
    </div>
  </div>
);

const TestAsset = () => (
  <div
    className={`${shellClassName} bottom-[9%] left-[7%] hidden w-52 rotate-3 lg:block lg:w-60`}
  >
    <div className={headerClassName}>
      <span className="font-sans text-xs font-semibold text-stone-700">
        Test
      </span>
      <span>coursework/tests</span>
    </div>
    <div className="grid gap-2 p-3 font-mono text-[10px]">
      <div className="flex items-center justify-between">
        <span>submission-fixture</span>
        <span className="font-semibold text-emerald-700">passed</span>
      </div>
      <div className="flex items-center justify-between">
        <span>edge-cases</span>
        <span className="font-semibold text-emerald-700">passed</span>
      </div>
      <div className="h-1 overflow-hidden rounded-sm bg-stone-100">
        <div className="h-full w-[87%] bg-emerald-500" />
      </div>
      <span className="text-stone-400">7 of 8 checks complete</span>
    </div>
  </div>
);

const SuggestAsset = () => (
  <div
    className={`${shellClassName} right-[3%] top-[10%] hidden w-56 rotate-6 lg:block lg:w-64`}
  >
    <div className={headerClassName}>
      <span className="font-sans text-xs font-semibold text-violet-700">
        Suggest
      </span>
      <span>average.py</span>
    </div>
    <div className="grid font-mono text-[10px] leading-6">
      <div className="bg-red-50 px-3 text-red-800">
        - for i in range(len(marks) - 1):
      </div>
      <div className="bg-emerald-50 px-3 text-emerald-800">
        + for mark in marks:
      </div>
      <div className="px-3 text-stone-500">Last mark is skipped</div>
    </div>
  </div>
);

const SubmissionAsset = () => (
  <div
    className={`${shellClassName} bottom-[8%] right-[2%] hidden w-60 -rotate-3 sm:block lg:right-[3%] lg:w-72`}
  >
    <div className={headerClassName}>
      <span className="font-sans text-xs font-semibold text-stone-700">
        Selected submission
      </span>
      <span className="ml-auto">4f8c2a1</span>
    </div>
    <div className="grid gap-3 p-3 sm:p-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">Run succeeded</span>
        <span className="font-mono text-emerald-700">86 / 100</span>
      </div>
      <div className="flex items-center gap-2 border-t border-stone-100 pt-3 text-[10px] text-stone-500">
        <span>Grade sync ready</span>
        <span className="ml-auto flex items-center gap-1.5">
          <img alt="" className="h-5 w-5 rounded" src={canvasLogo} />
          <img alt="" className="h-5 w-5 rounded" src={moodleLogo} />
        </span>
      </div>
    </div>
  </div>
);

export const HeroWorkflowAssets = () => (
  <div aria-hidden="true" className="absolute inset-0 z-0">
    <RepoAsset />
    <TestAsset />
    <SuggestAsset />
    <SubmissionAsset />
  </div>
);
