
"use client";

import { useEffect, useRef } from "react";

export default function GradientPanel() {
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scroller = document.querySelector<HTMLElement>("[data-content-scroll]");
		const panel = panelRef.current;
		const logo = document.querySelector<HTMLElement>("[data-content-logo]");
		const tagline = document.querySelector<HTMLElement>("#page-title");
		const root = document.documentElement;

		if (!scroller || !panel) return;

		const updateGradient = () => {
			const maxScroll = scroller.scrollHeight - scroller.clientHeight;
			const progress = maxScroll > 0 ? scroller.scrollTop / maxScroll : 0;
			const fadeDistance = Math.max(
				1,
				(tagline?.getBoundingClientRect().top ?? 144) +
					scroller.scrollTop -
					(logo?.getBoundingClientRect().top ?? 0),
			);
			const logoOpacity = Math.max(0, 1 - scroller.scrollTop / fadeDistance);

			root.style.setProperty("--gradient-position", `${progress * 100}%`);
			panel.style.setProperty("--gradient-brightness", `${1 - progress * 0.28}`);
			logo?.style.setProperty("opacity", `${logoOpacity}`);
			logo?.style.setProperty("pointer-events", logoOpacity > 0 ? "auto" : "none");
		};

		updateGradient();
		scroller.addEventListener("scroll", updateGradient, { passive: true });
		window.addEventListener("resize", updateGradient);

		return () => {
			scroller.removeEventListener("scroll", updateGradient);
			window.removeEventListener("resize", updateGradient);
		};
	}, []);

	return (
		<div aria-hidden="true" className="logo-panel-stage">
			<div className="logo-panel" ref={panelRef} />
		</div>
	);
}
