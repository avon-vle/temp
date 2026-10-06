import type { FeatureKind, ProductPoint } from "../types";

export type ProductPageContent = {
  readonly copyDescription: string;
  readonly description: string;
  readonly headline: string;
  readonly kind: FeatureKind;
  readonly points: readonly ProductPoint[];
  readonly sectionTitle: string;
  readonly summary: string;
  readonly title: string;
};

export const productPages: Record<FeatureKind, ProductPageContent> = {
  assess: {
    copyDescription:
      "Avon gives instructors one place to review submissions, finish rubric checks, and hand grades back to the LMS without spreadsheet exports.",
    description:
      "Track submissions, apply rubrics, and push final marks back to Canvas, Moodle, Blackboard, or Brightspace without exporting spreadsheets.",
    headline: "Grades straight to your LMS",
    kind: "assess",
    points: [
      [
        "Submission overview",
        "See who has handed in work, what still needs review, and where marks are blocked.",
      ],
      [
        "Rubric checks",
        "Run structured assessment steps across the cohort and keep feedback tied to each repo.",
      ],
      [
        "LMS handoff",
        "Sync grades and activity status back to the VLE your university already runs.",
      ],
    ],
    sectionTitle: "Assessment without spreadsheet handoffs",
    summary: "Grades to your LMS",
    title: "Assess",
  },
  provision: {
    copyDescription:
      "Avon replaces manual repo setup with a repeatable flow from coursework template to learner repositories and VLE activities.",
    description:
      "Upload starter code once, import your roster, and create the right repositories for every student or team in a single pass.",
    headline: "Starter code to every repo",
    kind: "provision",
    points: [
      [
        "Template to roster",
        "Map learners and teams from your course list, then generate private repos from one coursework template.",
      ],
      [
        "Git forge sync",
        "Provision to GitLab, GitHub, or Bitbucket with the structure your autograder already expects.",
      ],
      [
        "VLE handoff",
        "Publish LTI launch links and deep-link activities back to the course students already use.",
      ],
    ],
    sectionTitle: "Course setup without manual repo work",
    summary: "Starter code to repos",
    title: "Provision",
  },
  suggest: {
    copyDescription:
      "Avon keeps suggestions close to the submission you are reviewing so feedback stays specific, inspectable, and easy to send.",
    description:
      "Review each submission with scoped hints, suggested diffs, and a lecturer-facing assistant that stays tied to the work in front of you.",
    headline: "Hints tied to each submission",
    kind: "suggest",
    points: [
      [
        "Diff-first review",
        "See the exact lines that need attention before you decide what feedback to give.",
      ],
      [
        "Lecturer assistant",
        "Ask for follow-up questions, test ideas, and phrasing without leaving the submission context.",
      ],
      [
        "Scoped suggestions",
        "Keep feedback specific to the learner's code instead of generic model output.",
      ],
    ],
    sectionTitle: "Feedback that stays close to the code",
    summary: "Hints per submission",
    title: "Suggest",
  },
  test: {
    copyDescription:
      "Avon connects coursework testing to the repos students already use, so course teams can see failures early and learners get clearer next steps.",
    description:
      "Run coursework tests on every push, surface failures quickly, and give students feedback they can act on before deadlines.",
    headline: "Autograder feedback students can use",
    kind: "test",
    points: [
      [
        "Continuous runs",
        "Trigger tests from coursework activity and keep results visible in one place.",
      ],
      [
        "Fixture coverage",
        "Run public, hidden, and edge-case fixtures with the same workflow your course team configures.",
      ],
      [
        "Actionable reports",
        "Show learners which checks passed, which are still running, and what to fix next.",
      ],
    ],
    sectionTitle: "Testing that fits coursework delivery",
    summary: "Autograder feedback",
    title: "Test",
  },
};

export const productPageList = Object.values(productPages);
