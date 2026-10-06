import type { IconNode } from "lucide";

export type EditorChoice = "vscode" | "jetbrains" | "vim";

export type FeatureKind = "test" | "suggest" | "provision" | "assess";

export type Feature = {
  readonly icon: IconNode;
  readonly kind: FeatureKind;
  readonly title: "Test" | "Suggest" | "Provision" | "Assess";
};

export type NavProductItem = {
  readonly description: string;
  readonly href: string;
  readonly icon: IconNode;
  readonly kind: FeatureKind;
  readonly title: Feature["title"];
};

export type IntegrationLogo = {
  readonly logoAlt: string;
  readonly logoSrc: string;
  readonly name: string;
  readonly status: string;
};

export type IntegrationGroup = {
  readonly label: string;
  readonly logos: readonly IntegrationLogo[];
};

export type ProductPoint = readonly [title: string, description: string];

export type FooterGroup = readonly [heading: string, ...links: string[]];
