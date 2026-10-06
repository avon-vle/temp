import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesPath = join(process.cwd(), "src/styles.css");
const layoutPath = join(process.cwd(), "src/website/styles/layout.css");
const featureVisualPath = join(
  process.cwd(),
  "src/website/components/FeatureVisual.tsx",
);
const mockPanelPath = join(
  process.cwd(),
  "src/website/components/MockPanel.tsx",
);
const courseSetupPath = join(
  process.cwd(),
  "src/website/components/CourseSetupMock.tsx",
);

describe("web product UI design system", () => {
  it("styles.css defines light semantic product tokens", () => {
    const css = readFileSync(stylesPath, "utf8");
    for (const token of [
      "--background",
      "--foreground",
      "--card",
      "--primary",
      "--muted",
      "--border",
      "--radius",
    ]) {
      expect(css.includes(token), `missing ${token}`).toBe(true);
    }
    expect(css).toContain("oklch(0.488 0.217 264)");
    expect(css).toMatch(/color-scheme:\s*light/);
  });

  it("layout product chrome uses zinc light surfaces (not stone GH greys)", () => {
    const css = readFileSync(layoutPath, "utf8");
    // Provision demo mirrors app light tokens
    expect(css).toContain("--avon-provision-demo-bg: #fafafa");
    expect(css).toContain("--avon-provision-demo-border: #e4e4e7");
    expect(css).toContain("oklch(0.488 0.217 264)");
    // Nav feature visual light theme uses zinc
    expect(css).toContain("--avon-nfv-border: #e4e4e7");
    expect(css).toContain("--avon-nfv-surface: #fafafa");
    // Old GitHub product greys should not remain as provision defaults
    expect(css).not.toMatch(
      /\.avon-provision-product-preview\s*\{[^}]*#d0d7de/s,
    );
  });

  it("product mocks use semantic token classes instead of stone chrome", () => {
    const feature = readFileSync(featureVisualPath, "utf8");
    const mock = readFileSync(mockPanelPath, "utf8");
    const course = readFileSync(courseSetupPath, "utf8");

    // Default (non-nav) feature window should use border-border / bg-muted
    expect(feature).toContain("border-border bg-muted");
    expect(feature).not.toMatch(
      /featureWindowClassName[\s\S]*border-stone-200 bg-stone-50/,
    );

    expect(mock).toContain("border-border");
    expect(mock).toContain("bg-muted");
    expect(mock).not.toContain("border-stone-200");

    expect(course).toContain("bg-card");
    expect(course).toContain("border-border");
    expect(course).not.toContain("border-stone-200");
  });
});
