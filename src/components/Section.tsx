import { useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { Text } from "@/components/Typography";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/tokens";

interface SectionProps {
  id?: string;
  title: string;
  count?: string;
  icon?: ReactNode;
  index?: string;
  onSurface?: boolean;
  actions?: ReactNode;
  children: ReactNode;
}

export function Section({ id, title, count, icon, index, onSurface, actions, children }: SectionProps) {
  const [open, setOpen] = useState(true);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const watermarkRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (reduced || !index) return;
      gsap.fromTo(
        watermarkRef.current,
        { y: -12 },
        {
          y: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [reduced, index] }
  );

  return (
    <section id={id} ref={sectionRef} className="relative isolate scroll-mt-16">
      {index && (
        <Text
          ref={watermarkRef}
          aria-hidden="true"
          as="span"
          variant="watermark"
          className="pointer-events-none absolute -top-14 right-0 -z-10 select-none text-line"
        >
          {index}
        </Text>
      )}
      <AnimatedContent direction="right" distance={12} className="-mx-2 flex items-center justify-between">
        <h2 className="min-w-0">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "group flex h-8 items-center gap-2 rounded-md px-2 transition-colors ease-smooth",
              onSurface ? "hover:bg-raised" : "hover:bg-surface"
            )}
          >
            <ChevronDown
              className={cn("size-4 text-faint transition-transform ease-smooth", !open && "-rotate-90")}
            />
            {icon}
            <Text as="span" variant="label">
              {title}
            </Text>
            {count && (
              <Text as="span" variant="caption" tone="faint">
                {count}
              </Text>
            )}
          </button>
        </h2>
        {actions && <div className="px-2">{actions}</div>}
      </AnimatedContent>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : DURATION.base, ease: EASE }}
            onAnimationComplete={() => ScrollTrigger.refresh()}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
