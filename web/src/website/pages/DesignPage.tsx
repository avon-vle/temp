import { useRef, useState } from "react";
import { env } from "../../env";
import { CyclingEditorPreview } from "../components/editor-preview/CyclingEditorPreview";
import { WebsiteLink } from "../components/WebsiteLink";
import { features, footerGroups, gitProviderLogos, lmsLogos } from "../content/data";
import { productPages } from "../content/productPages";
import { LogoMark } from "../design/LogoMark";
import "../design/design.css";
import { brand, productColors, type BrandTheme } from "../design/tokens";
import { useCyclingEditor } from "../hooks/useCyclingEditor";
import { useEditorPreviewScale } from "../hooks/useEditorPreviewScale";
import { blogPath, homePath, productPath } from "../lib/routes";
import type { FeatureKind } from "../types";

const workflow: readonly {
  readonly color: string;
  readonly description: string;
  readonly headline: string;
  readonly kind: FeatureKind;
  readonly title: string;
}[] = features.map((feature) => {
  const page = productPages[feature.kind];
  const color =
    productColors.find((item) => item.name === feature.title)?.hex ?? brand.ink;

  return {
    color,
    description: page.description,
    headline: page.headline,
    kind: feature.kind,
    title: feature.title,
  };
});

const MOCKUPS = [
  {
    alt: "Pavement sign with the Avon mark and four-color diagonal",
    src: "/design/sign.jpg",
  },
  {
    alt: "Campus tote with the Avon mark and four-color stripe",
    src: "/design/tote.jpg",
  },
  {
    alt: "Corridor poster with the Avon mark and blocked color stripes",
    src: "/design/poster.jpg",
  },
] as const;

export const DesignPage = () => {
  const [theme, setTheme] = useState<BrandTheme>("light");

  return (
    <main
      aria-label="Avon design homepage"
      className="avon-design min-h-screen"
      data-theme={theme}
    >
      <Nav theme={theme} onThemeChange={setTheme} />
      <Hero />
      <Workflow />
      <Editor />
      <Integrations />
      <Applications />
      <Footer />
    </main>
  );
};

const Nav = ({
  onThemeChange,
  theme,
}: {
  readonly onThemeChange: (theme: BrandTheme) => void;
  readonly theme: BrandTheme;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--avon-line)]">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <WebsiteLink
          aria-label="Avon home"
          className="flex items-center gap-3 text-[var(--avon-ink)] no-underline"
          href={homePath}
        >
          <LogoMark className="h-6 w-[2.5rem]" />
          <span className="text-sm font-medium">Avon</span>
        </WebsiteLink>

        <nav
          aria-label="Product"
          className="hidden min-w-0 items-center gap-5 md:flex"
        >
          {workflow.map((item) => (
            <WebsiteLink
              className="text-sm text-[var(--avon-mute)] no-underline hover:text-[var(--avon-ink)]"
              href={productPath(item.kind)}
              key={item.kind}
            >
              {item.title}
            </WebsiteLink>
          ))}
        </nav>

        <nav
          aria-label="Site"
          className="ml-auto hidden items-center gap-5 md:flex"
        >
          <WebsiteLink
            className="text-sm text-[var(--avon-mute)] no-underline hover:text-[var(--avon-ink)]"
            href={blogPath}
          >
            Blog
          </WebsiteLink>
          <a
            className="text-sm text-[var(--avon-mute)] no-underline hover:text-[var(--avon-ink)]"
            href={env.VITE_DOCS_URL}
          >
            Documentation
          </a>
          <ThemeToggle onThemeChange={onThemeChange} theme={theme} />
          <a
            className="inline-flex h-9 items-center rounded-md bg-[var(--avon-ink)] px-4 text-sm font-medium text-[var(--avon-paper)] no-underline"
            href="#"
          >
            Book a demo
          </a>
        </nav>

        <button
          aria-expanded={open}
          className="ml-auto h-9 rounded-md px-3 text-sm md:hidden"
          onClick={() => {
            setOpen((current) => !current);
          }}
          type="button"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="grid gap-3 border-t border-[var(--avon-line)] px-6 py-4 md:hidden">
          {workflow.map((item) => (
            <WebsiteLink
              className="text-sm text-[var(--avon-ink)] no-underline"
              href={productPath(item.kind)}
              key={item.kind}
            >
              {item.title}
            </WebsiteLink>
          ))}
          <WebsiteLink
            className="text-sm text-[var(--avon-ink)] no-underline"
            href={blogPath}
          >
            Blog
          </WebsiteLink>
          <a
            className="text-sm text-[var(--avon-ink)] no-underline"
            href={env.VITE_DOCS_URL}
          >
            Documentation
          </a>
          <ThemeToggle onThemeChange={onThemeChange} theme={theme} />
          <a
            className="inline-flex h-9 w-fit items-center rounded-md bg-[var(--avon-ink)] px-4 text-sm font-medium text-[var(--avon-paper)] no-underline"
            href="#"
          >
            Book a demo
          </a>
        </div>
      ) : null}

      <div aria-hidden="true" className="avon-design-bands h-1.5 w-full" />
    </header>
  );
};

const Hero = () => (
  <section className="border-b border-[var(--avon-line)]">
    <div className="mx-auto grid max-w-6xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="flex flex-col justify-center px-6 py-16 sm:py-20 lg:py-24">
        <h1 className="max-w-xl text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.02] font-medium tracking-tight">
          Avon gives CS courses{" "}
          <span className="text-[var(--avon-mute)]">
            one workflow for code, feedback, and assessment.
          </span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="inline-flex h-10 items-center rounded-md bg-[var(--avon-ink)] px-5 text-sm font-medium text-[var(--avon-paper)] no-underline"
            href="#"
          >
            Book a demo
          </a>
          <a
            className="inline-flex h-10 items-center rounded-md border border-[var(--avon-line)] px-5 text-sm font-medium no-underline hover:border-[var(--avon-ink)]"
            href={env.VITE_DOCS_URL}
          >
            View documentation
          </a>
        </div>
      </div>
      <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[22rem] lg:min-h-full">
        <div aria-hidden="true" className="avon-design-bands absolute inset-0" />
        <LogoMark className="absolute top-1/2 left-1/2 h-24 w-[6.4rem] -translate-x-1/2 -translate-y-1/2 text-white sm:h-32 sm:w-[8.5rem]" />
      </div>
    </div>
  </section>
);

const Workflow = () => (
  <section aria-label="Product features" className="mx-auto max-w-6xl px-6 py-16">
    <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
      <h2 className="max-w-lg text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.08] font-medium tracking-tight">
        One workflow from setup to assessment
      </h2>
      <p className="max-w-xl text-base leading-7 text-[var(--avon-mute)] sm:text-lg">
        Provision coursework, run tests, review suggestions, and track
        submissions in a single flow - each step connected to the last.
      </p>
    </div>
    <div className="mt-12 grid gap-3 sm:grid-cols-2">
      {workflow.map((item) => (
        <WebsiteLink
          aria-label={`Learn more about ${item.title}`}
          className="group block rounded-lg border border-[var(--avon-line)] bg-[var(--avon-paper)] no-underline hover:bg-[var(--avon-mist)]"
          href={productPath(item.kind)}
          key={item.kind}
        >
          <div className="h-2" style={{ backgroundColor: item.color }} />
          <div className="p-5">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-2 text-xl font-medium tracking-tight">
              {item.headline}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--avon-mute)]">
              {item.description}
            </p>
          </div>
        </WebsiteLink>
      ))}
    </div>
  </section>
);

const Editor = () => {
  const editor = useCyclingEditor();
  const editorSlotRef = useRef<HTMLDivElement | null>(null);
  const scale = useEditorPreviewScale(editorSlotRef);

  return (
    <section
      aria-label="Student development environments"
      className="border-y border-[var(--avon-line)]"
    >
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16">
          <h2 className="max-w-lg text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.08] font-medium tracking-tight">
            Students work in a familiar environment
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--avon-mute)] sm:text-lg">
            Avon fits around local machines, lab images, and browser-based
            setups. Students open coursework in VS Code, JetBrains, Vim, or
            whatever they prefer - no forced toolchain, no new habits to learn.
          </p>
          <a
            className="mt-8 inline-flex h-10 w-fit items-center rounded-md bg-[var(--avon-ink)] px-5 text-sm font-medium text-[var(--avon-paper)] no-underline"
            href="#"
          >
            Book a demo
          </a>
        </div>
        <div className="relative min-h-[22rem] overflow-hidden bg-[var(--avon-mist)] lg:min-h-[28rem]">
          <div
            aria-hidden="true"
            className="avon-design-bands absolute inset-y-0 left-0 w-1.5"
          />
          <div
            className="relative min-h-[22rem] min-w-0 lg:min-h-[28rem]"
            ref={editorSlotRef}
          >
            <div
              className="absolute bottom-0 left-6 w-full max-w-full origin-bottom-left lg:left-8"
              style={{ transform: `scale(${scale})` }}
            >
              <CyclingEditorPreview activeEditor={editor} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Integrations = () => (
  <section aria-label="Git and LMS integrations" className="mx-auto max-w-6xl px-6 py-16">
    <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
      <h2 className="max-w-lg text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.08] font-medium tracking-tight">
        Connect to the Git forges and LMS platforms you already run
      </h2>
      <p className="max-w-xl text-base leading-7 text-[var(--avon-mute)] sm:text-lg">
        Avon plugs into GitLab, GitHub, Bitbucket, Blackboard, Moodle, Canvas,
        and Brightspace. You do not need to switch providers or ask faculty to
        leave the systems they already trust.
      </p>
    </div>
    <div className="mt-12 grid gap-10">
      <LogoGroup
        heading="Git forges"
        items={gitProviderLogos.map((item) => ({
          alt: item.logoAlt,
          name: item.name,
          src: item.logoSrc,
        }))}
      />
      <LogoGroup
        heading="VLE and LMS"
        items={lmsLogos.map((item) => ({
          alt: item.logoAlt,
          name: item.name,
          src: item.logoSrc,
        }))}
      />
    </div>
  </section>
);

const Applications = () => (
  <section className="border-t border-[var(--avon-line)]">
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.08] font-medium tracking-tight">
        Work that flows
      </h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-[var(--avon-mute)] sm:text-lg">
        White field, black mark, one diagonal of four colors. Same system on
        a sign, a bag, and a corridor poster.
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {MOCKUPS.map((item) => (
          <div
            className="overflow-hidden rounded-lg border border-[var(--avon-line)]"
            key={item.src}
          >
            <img alt={item.alt} className="h-full w-full object-cover" src={item.src} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative overflow-hidden bg-[var(--avon-ink)] text-[var(--avon-paper)]">
    <div aria-hidden="true" className="avon-design-bands h-2 w-full" />
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h2 className="max-w-3xl text-[clamp(1.75rem,3.5vw,3.25rem)] leading-[1.05] font-medium tracking-tight">
            Set up assessments without the hassle
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            Avon keeps submissions, autograding, rubrics, feedback, and LMS
            handoff in one university-grade workflow.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex h-10 items-center rounded-md bg-[var(--avon-paper)] px-5 text-sm font-medium text-[var(--avon-ink)] no-underline"
            href="#"
          >
            Book a demo
          </a>
          <a
            className="inline-flex h-10 items-center rounded-md border border-white/20 px-5 text-sm font-medium text-white no-underline hover:border-white/45"
            href={env.VITE_DOCS_URL}
          >
            Read the docs
          </a>
        </div>
      </div>

      <div className="mt-14 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {footerGroups.map(([heading, ...links]) => (
          <div key={heading}>
            <h3 className="text-sm font-medium">{heading}</h3>
            <div className="mt-4 grid gap-3">
              {links.map((link) => (
                <a
                  className="text-sm text-white/65 no-underline hover:text-white"
                  href="#"
                  key={link}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
        <WebsiteLink
          className="flex items-center gap-3 text-[var(--avon-paper)] no-underline"
          href={homePath}
        >
          <LogoMark className="h-5 w-8" />
          <span className="text-sm">Avon</span>
        </WebsiteLink>
        <span className="text-sm text-white/50">Design preview</span>
      </div>
    </div>
  </footer>
);

const ThemeToggle = ({
  onThemeChange,
  theme,
}: {
  readonly onThemeChange: (theme: BrandTheme) => void;
  readonly theme: BrandTheme;
}) => (
  <div className="flex gap-1">
    {(["light", "dark"] as const).map((mode) => (
      <button
        className={`h-8 rounded-md px-3 text-sm ${
          theme === mode
            ? "bg-[var(--avon-ink)] text-[var(--avon-paper)]"
            : "text-[var(--avon-mute)] hover:text-[var(--avon-ink)]"
        }`}
        key={mode}
        onClick={() => {
          onThemeChange(mode);
        }}
        type="button"
      >
        {mode === "light" ? "Light" : "Dark"}
      </button>
    ))}
  </div>
);

const LogoGroup = ({
  heading,
  items,
}: {
  readonly heading: string;
  readonly items: readonly {
    readonly alt: string;
    readonly name: string;
    readonly src: string;
  }[];
}) => (
  <div>
    <h3 className="text-sm font-medium text-[var(--avon-mute)]">{heading}</h3>
    <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-lg border border-[var(--avon-line)] sm:grid-cols-4">
      {items.map((item) => (
        <article
          className="flex min-h-32 flex-col items-center justify-center border-[var(--avon-line)] p-5 not-last:border-b sm:border-b-0 sm:not-last:border-r"
          key={item.name}
        >
          <img
            alt={item.alt}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            src={item.src}
          />
          <p className="mt-3 text-sm font-medium">{item.name}</p>
        </article>
      ))}
    </div>
  </div>
);
