import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  text: string;
  className?: string;
}

export function ScrollReveal({ text, className }: ScrollRevealProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const words = ref.current?.querySelectorAll("[data-word]");
      if (!words || words.length === 0) return;
      gsap.fromTo(
        words,
        { opacity: 0.15, filter: "blur(4px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [text, reduced] }
  );

  return (
    <span ref={ref} className={cn("inline", className)}>
      {text.split(" ").map((word, index) => (
        <span key={`${index}-${word}`} data-word="" className="inline-block whitespace-pre">
          {`${word} `}
        </span>
      ))}
    </span>
  );
}
