import { HOME_PAGE_CLASS } from "./constants";
import { EditorEnvironmentSection } from "./sections/EditorEnvironmentSection";
import { FaqSection } from "./sections/FaqSection";
import { FeatureCardsSection } from "./sections/FeatureCardsSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { SiteFooter } from "./sections/SiteFooter";

export const HomePage = () => (
  <main aria-label="Avon homepage" className={HOME_PAGE_CLASS}>
    <HeroSection />
    <FeatureCardsSection />
    <EditorEnvironmentSection />
    <HowItWorksSection />
    <FaqSection />
    <SiteFooter loadStartIndex={25} />
  </main>
);
