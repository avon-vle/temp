import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
	title: "Avon",
	description: "Coursework is evolving, and so are we.",
	metadataBase: new URL("https://avon.ac"),
	icons: { icon: "./favicon.svg" },
	openGraph: {
		title: "Avon",
		description: "Coursework is evolving, and so are we.",
		url: "https://avon.ac",
		siteName: "Avon",
		images: [
			{
				url: "/og-image.png",
				width: 2872,
				height: 1624,
				alt: "Coursework is evolving, and so are we.",
			},
		],
		locale: "en_GB",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Avon",
		description: "Coursework is evolving, and so are we.",
		images: ["/og-image.png"],
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			className="scroll-smooth overflow-hidden bg-avon-paper motion-reduce:scroll-auto"
			lang="en"
			suppressHydrationWarning
		>
			<body className="min-w-[320px] overflow-hidden bg-avon-paper font-sans text-avon-ink [font-synthesis:none] [text-rendering:optimizeLegibility]">
				{children}
			</body>
		</html>
	);
}
