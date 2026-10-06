import { createElement, type SVGProps } from "react";
import { GraduationCap, type IconNode } from "lucide";

type LucideAttributes = SVGProps<SVGElement> & {
  readonly key?: string;
};

export const renderLucideNodes = (icon: IconNode) =>
  icon.map(([tag, attrs], index) =>
    createElement(tag, {
      ...(attrs as LucideAttributes),
      key: (attrs as LucideAttributes).key ?? `${tag}-${index}`,
    }),
  );

export const LucideIcon = ({
  className = "h-4 w-4 text-stone-500 transition-colors duration-200 motion-reduce:transition-none",
  icon,
}: {
  readonly className?: string;
  readonly icon: IconNode;
}) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    {renderLucideNodes(icon)}
  </svg>
);

export const MessageIcon = ({
  role,
}: {
  readonly role: "lecturer" | "assistant";
}) =>
  role === "lecturer" ? (
    <svg
      aria-hidden="true"
      className="mt-[1px] h-3.5 w-3.5 shrink-0 text-stone-500"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {renderLucideNodes(GraduationCap)}
    </svg>
  ) : (
    <span aria-hidden="true" className="shrink-0 leading-4 text-violet-600">
      ✦
    </span>
  );
