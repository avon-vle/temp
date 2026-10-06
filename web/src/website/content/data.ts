import {
  ChartNoAxesColumnIncreasing,
  GitBranch,
  Sparkles,
  TestTubeDiagonal,
} from "lucide";
import bitbucketLogo from "../../assets/logos/bitbucket.svg";
import blackboardLogo from "../../assets/logos/blackboard.svg";
import brightspaceLogo from "../../assets/logos/brightspace.svg";
import canvasLogo from "../../assets/logos/canvas.svg";
import githubLogo from "../../assets/logos/github.svg";
import gitlabLogo from "../../assets/logos/gitlab.svg";
import microsoft365Logo from "../../assets/logos/microsoft-365.svg";
import moodleLogo from "../../assets/logos/moodle.svg";
import type {
  Feature,
  FooterGroup,
  IntegrationGroup,
  IntegrationLogo,
  NavProductItem,
  ProductPoint,
} from "../types";

export const features: readonly Feature[] = [
  {
    icon: GitBranch,
    kind: "provision",
    title: "Provision",
  },
  {
    icon: TestTubeDiagonal,
    kind: "test",
    title: "Test",
  },
  {
    icon: Sparkles,
    kind: "suggest",
    title: "Suggest",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    kind: "assess",
    title: "Assess",
  },
];

export const navProductItems: readonly NavProductItem[] = [
  {
    description: "Starter code to repos",
    href: "/product/provision",
    icon: GitBranch,
    kind: "provision",
    title: "Provision",
  },
  {
    description: "Autograder feedback",
    href: "/product/test",
    icon: TestTubeDiagonal,
    kind: "test",
    title: "Test",
  },
  {
    description: "Hints per submission",
    href: "/product/suggest",
    icon: Sparkles,
    kind: "suggest",
    title: "Suggest",
  },
  {
    description: "Grades to your LMS",
    href: "/product/assess",
    icon: ChartNoAxesColumnIncreasing,
    kind: "assess",
    title: "Assess",
  },
];

export const gitProviderLogos: readonly IntegrationLogo[] = [
  {
    logoAlt: "GitLab logo",
    logoSrc: gitlabLogo,
    name: "GitLab",
    status: "Supported",
  },
  {
    logoAlt: "GitHub logo",
    logoSrc: githubLogo,
    name: "GitHub",
    status: "Supported",
  },
  {
    logoAlt: "Bitbucket logo",
    logoSrc: bitbucketLogo,
    name: "Bitbucket",
    status: "Supported",
  },
];

export const lmsLogos: readonly IntegrationLogo[] = [
  {
    logoAlt: "Moodle logo",
    logoSrc: moodleLogo,
    name: "Moodle",
    status: "Supported",
  },
  {
    logoAlt: "Canvas logo",
    logoSrc: canvasLogo,
    name: "Canvas",
    status: "Supported",
  },
  {
    logoAlt: "Blackboard logo",
    logoSrc: blackboardLogo,
    name: "Blackboard",
    status: "Supported",
  },
  {
    logoAlt: "Brightspace logo",
    logoSrc: brightspaceLogo,
    name: "Brightspace",
    status: "Supported",
  },
];

export const integrationGroups: readonly IntegrationGroup[] = [
  {
    label: "Git forges",
    logos: gitProviderLogos,
  },
  {
    label: "VLE and LMS",
    logos: lmsLogos,
  },
  {
    label: "Identity",
    logos: [
      {
        logoAlt: "Microsoft 365 logo",
        logoSrc: microsoft365Logo,
        name: "Microsoft 365",
        status: "Supported",
      },
    ],
  },
];

export const courseSetupPoints: readonly ProductPoint[] = [
  [
    "Template to roster",
    "Upload starter code, import teams or students, and create the right repositories in one pass.",
  ],
  [
    "VLE handoff",
    "Publish LTI launch and deep-link activities back to the course your students already use.",
  ],
];

export const footerGroups: readonly FooterGroup[] = [
  ["Product", "Provisioning", "Testing", "Feedback", "Assessment"],
  ["Courses", "Git workflows", "LMS launch", "Team projects", "Rubrics"],
  ["Resources", "Documentation", "Examples", "API reference", "Support"],
  ["Company", "Contact", "Security", "Privacy", "Status"],
];

/** Indented Python coursework template tree for the provision feature visual. */
export const provisionTemplateTree: readonly {
  readonly depth: number;
  readonly kind?: "dir";
  readonly name: string;
}[] = [
  { depth: 0, name: ".gitignore" },
  { depth: 0, name: "README.md" },
  { depth: 0, name: "pyproject.toml" },
  { depth: 0, name: "requirements.txt" },
  { depth: 0, kind: "dir", name: "src/" },
  { depth: 1, name: "__init__.py" },
  { depth: 1, name: "average.py" },
  { depth: 1, name: "stats.py" },
  { depth: 1, name: "utils.py" },
  { depth: 0, kind: "dir", name: "tests/" },
  { depth: 1, name: "__init__.py" },
  { depth: 1, name: "test_average.py" },
  { depth: 1, name: "test_stats.py" },
  { depth: 1, kind: "dir", name: "fixtures/" },
  { depth: 2, name: "scores.csv" },
  { depth: 2, name: "edge_cases.json" },
  { depth: 0, kind: "dir", name: ".github/" },
  { depth: 1, kind: "dir", name: "workflows/" },
  { depth: 2, name: "tests.yml" },
  { depth: 0, name: ".gitlab-ci.yml" },
];

export const provisionRows = [
  "student/ada",
  "student/grace",
  "student/alan",
  "student/katherine",
  "student/margaret",
  "student/dennis",
  "student/barbara",
  "student/linus",
  "team-systems",
  "team-compilers",
];

export const courseFiles = ["README.md", "src/", "tests/", "rubric.yml"];

export const courseSetupRows = [
  ["VLE connection", "LTI 1.3 launch + deep link", "ready"],
  ["Identity", "SSO domains and course roles", "mapped"],
  ["Roster import", "148 learners / 32 teams", "synced"],
  ["Repository job", "private repos from starter code", "queued"],
] as const;

export const testSubmissionFiles = [
  ["average.py", "modified"],
  ["tests/test_average.py", "passed"],
  [".gitlab-ci.yml", "unchanged"],
] as const;

export const testLogs = [
  ["setup.spec.ts", "passed"],
  ["submission-fixture", "passed"],
  ["edge-cases", "running"],
  ["feedback-report", "queued"],
  ["coverage-threshold", "passed"],
  ["lint-rules", "passed"],
  ["hidden-fixtures", "running"],
  ["rubric-export", "queued"],
] as const;

export const chatMessages = [
  ["lecturer", "What should I ask them?"],
  ["assistant", "Ask why the loop skips the last score."],
  ["lecturer", "How do I test understanding?"],
  ["assistant", "Ask them to run it with three marks."],
  ["lecturer", "Best follow-up?"],
  ["assistant", "Ask what happens with an empty list."],
] as const;

export const suggestedDiffRows = [
  ["-", "for i in range(len(marks) - 1):"],
  ["+", "for mark in marks:"],
  ["+", "    total += mark"],
  [" ", "return total / len(marks)"],
  ["✦", "last mark is skipped"],
] as const;

export const assessStats = [
  ["submitted", 86, "text-emerald-700"],
  ["passing", 74, "text-violet-700"],
] as const;

export const assessBreakdown = [
  ["22", "total"],
  ["18", "graded"],
  ["4", "left"],
] as const;

export const assessmentFlowRows = [
  ["rubric checks", "18 done"],
  ["feedback queue", "4 left"],
  ["grade sync", "ready"],
  ["LMS handoff", "queued"],
] as const;

export const faqs: readonly (readonly [question: string, answer: string])[] = [
  [
    "Do students need a separate Avon account?",
    "No. Students and staff open Avon from an activity in their course. Avon verifies the LTI 1.3 launch with the learning platform and opens the right workspace, so there is no extra password to manage.",
  ],
  [
    "Which learning platforms does Avon support?",
    "Moodle, Canvas, Blackboard, and Brightspace, plus other platforms that support LTI 1.3 external tools.",
  ],
  [
    "Which Git forges can we provision to?",
    "GitLab, GitHub, and Bitbucket. Avon creates private repositories from one coursework template for every student or team.",
  ],
  [
    "Do students have to change their editor or toolchain?",
    "No. Repositories are plain Git, so students can work in VS Code, JetBrains, Vim, lab images, or browser-based setups.",
  ],
  [
    "How do marks get back to the VLE?",
    "Assess keeps submissions, rubric checks, and feedback together, then syncs grades and activity status back to the course — no spreadsheet exports.",
  ],
];
