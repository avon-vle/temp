import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avon: the future of AI in coursework",
  description:
    "Avon is working on the future of AI in coursework, one considered step at a time.",
  icons: { icon: "./favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
		<html className="scroll-smooth overflow-hidden bg-avon-paper motion-reduce:scroll-auto" lang="en" suppressHydrationWarning>
			<body className="min-w-[320px] overflow-hidden bg-avon-paper font-sans text-avon-ink [font-synthesis:none] [text-rendering:optimizeLegibility]">
				{children}
			</body>
    </html>
  );
}
