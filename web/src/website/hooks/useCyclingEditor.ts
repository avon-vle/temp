import { useEffect, useState } from "react";
import type { EditorChoice } from "../types";

export const editorCycle: readonly EditorChoice[] = [
  "vscode",
  "jetbrains",
  "vim",
];

export const useCyclingEditor = (intervalMs = 4500) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % editorCycle.length);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [intervalMs]);

  return editorCycle[index] ?? "vscode";
};
