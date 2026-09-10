import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { ClickSpark } from "@/components/reactbits/ClickSpark";
import { DotGrid } from "@/components/reactbits/DotGrid";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { CommandMenu } from "@/components/CommandMenu";
import { CommentBox } from "@/components/CommentBox";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { SubIssues } from "@/components/SubIssues";
import { TopBar } from "@/components/TopBar";
import { Band } from "@/components/layout/Layout";
import { ScrollTrigger } from "@/lib/gsap";
import { LanguageProvider, useLanguage } from "@/lib/i18n";

function LanguageScrollRefresh() {
  const { lang } = useLanguage();

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, [lang]);

  return null;
}

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <LanguageProvider>
      <TooltipProvider delayDuration={300}>
        <LanguageScrollRefresh />
        <TopBar onOpenCommand={() => setCommandOpen(true)} />
        <main className="flex min-w-0 flex-col">
          <Band backdrop={<DotGrid />}>
            <Hero />
          </Band>
          <Band surface>
            <About />
          </Band>
          <Band>
            <SubIssues />
          </Band>
          <div className="bg-surface py-4">
            <SkillsMarquee />
          </div>
          <Band>
            <Projects />
          </Band>
          <Band surface>
            <Achievements />
          </Band>
          <Band>
            <ActivityTimeline />
          </Band>
          <Band surface>
            <CommentBox />
          </Band>
        </main>
        <Footer />
        <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
        <ClickSpark />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--color-raised)",
              color: "var(--color-text)",
              border: "none",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-overlay)",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </TooltipProvider>
    </LanguageProvider>
  );
}
