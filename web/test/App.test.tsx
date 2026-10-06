import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "../src/App";
import { resolveWebsiteRoute } from "../src/website/lib/routes";

describe("App", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the Avon landing page", () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);

    render(<App />);

    expect(screen.getByRole("main", { name: "Avon homepage" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Avon home" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Blog" })).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Avon gives CS courses one workflow for code, feedback, and assessment.",
      }),
    ).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "Book a demo" })).toHaveLength(
      2,
    );
    expect(
      screen.getByRole("link", { name: "View documentation" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("list", { name: "Supported integrations" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "One workflow from setup to assessment",
      }),
    ).toBeTruthy();
    const features = within(
      screen.getByRole("region", { name: "Product features" }),
    );
    for (const name of ["Provision", "Test", "Suggest", "Assess"]) {
      expect(features.getByRole("heading", { name })).toBeTruthy();
    }
    expect(
      screen.getByRole("heading", {
        name: "Students work in a familiar environment",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Up and running from your VLE" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Questions from course teams" }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Read the docs" })).toBeTruthy();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("renders a product page route", () => {
    window.history.replaceState({}, "", "/product/provision");

    render(<App />);

    expect(
      screen.getByRole("main", { name: "Provision product page" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Starter code to every repo" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Course setup without manual repo work",
      }),
    ).toBeTruthy();
  });

  it("resolves website routes for product pages", () => {
    expect(resolveWebsiteRoute("/")).toEqual({ kind: "home" });
    expect(resolveWebsiteRoute("/product/test")).toEqual({
      kind: "product",
      product: "test",
    });
    expect(resolveWebsiteRoute("/product/assess/")).toEqual({
      kind: "product",
      product: "assess",
    });
    // Docs lives in @avon/docs; marketing treats unknown paths as home.
    expect(resolveWebsiteRoute("/docs")).toEqual({ kind: "home" });
  });

  it("resolves website routes for blog pages", () => {
    expect(resolveWebsiteRoute("/blog")).toEqual({ kind: "blog" });
    expect(resolveWebsiteRoute("/blog/")).toEqual({ kind: "blog" });
    expect(resolveWebsiteRoute("/blog/introducing-avon")).toEqual({
      kind: "blog-post",
      slug: "introducing-avon",
    });
    expect(resolveWebsiteRoute("/blog/hello%20world")).toEqual({
      kind: "blog-post",
      slug: "hello world",
    });
  });

  it("renders the blog index and a markdown post", () => {
    window.history.replaceState({}, "", "/blog");
    render(<App />);

    expect(screen.getByRole("main", { name: "Avon blog" })).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "News and updates" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Introducing Avon" }),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("link", { name: /Introducing Avon/u }));

    expect(screen.getByRole("main", { name: "Introducing Avon" })).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Why we built it" }),
    ).toBeTruthy();
    expect(screen.getByText(/university-grade platform/u)).toBeTruthy();
  });
});
