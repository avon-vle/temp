import type { ElementType, ReactNode } from "react";
import { loadRowStyle } from "../constants";

export const LoadRow = ({
  as: Component = "div",
  children,
  className = "",
  index,
}: {
  readonly as?: ElementType;
  readonly children: ReactNode;
  readonly className?: string;
  readonly index: number;
}) => (
  <Component
    className={`avon-load ${className}`.trim()}
    style={loadRowStyle(index)}
  >
    {children}
  </Component>
);
