import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { CircleDot, FileText, Flame, History, Sparkles, Tag, UserRound, type LucideIcon } from "lucide-react";
import { Section } from "@/components/Section";
import { Body, Caption } from "@/components/Typography";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/lib/i18n";
import { DURATION, GSAP_EASE, GSAP_EASE_POP, SCROLL_START } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import type { ActivityIcon } from "@/content";

const activityIcons: Record<ActivityIcon, LucideIcon> = {
  create: Sparkles,
  progress: CircleDot,
  priority: Flame,
  assign: UserRound,
  note: FileText,
  label: Tag,
};

const activityIconColors: Record<ActivityIcon, string> = {
  create: "text-primary-soft",
  progress: "text-blue",
  priority: "text-orange",
  assign: "text-success",
  note: "text-muted",
  label: "text-violet",
};

function TimelineItems() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-timeline-row]");
      for (const row of rows) {
        const icon = row.querySelector("[data-timeline-icon]");
        const content = row.querySelector("[data-timeline-content]");
        const line = row.querySelector("[data-timeline-line]");
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: row, start: SCROLL_START, once: true },
        });
        if (icon) {
          timeline.from(icon, { scale: 0.3, opacity: 0, duration: DURATION.base, ease: GSAP_EASE_POP });
        }
        if (content) {
          timeline.from(content, { x: -16, opacity: 0, duration: DURATION.base, ease: GSAP_EASE }, "<0.08");
        }
        if (line) {
          gsap.set(line, { transformOrigin: "top" });
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 80%", end: "bottom 65%", scrub: true },
            }
          );
        }
      }
    },
    { scope: containerRef, dependencies: [reduced, t] }
  );

  return (
    <div ref={containerRef} className="flex max-w-3xl flex-col">
      {t.timeline.map((item, index) => {
        const Icon = activityIcons[item.icon];
        const isLast = index === t.timeline.length - 1;
        return (
          <div key={index} data-timeline-row="" className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                data-timeline-icon=""
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-raised"
              >
                <Icon className={cn("size-3", activityIconColors[item.icon])} />
              </span>
              {!isLast && <span data-timeline-line="" className="w-px flex-1 bg-line" />}
            </div>
            <div data-timeline-content="" className={cn("flex min-w-0 flex-col gap-1", !isLast && "pb-6")}>
              <Body tone="muted">{item.text}</Body>
              <Caption tone="faint">{item.meta}</Caption>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ActivityTimeline() {
  const { t } = useLanguage();

  return (
    <Section id="activity" title={t.sections.activity} icon={<History className="size-4 text-blue" />} index="04">
      <TimelineItems />
    </Section>
  );
}
