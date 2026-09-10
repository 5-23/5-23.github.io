import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { splitWords } from "@/lib/split";
import { DURATION, EASE } from "@/lib/tokens";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}

export function SplitText({ text, className, delay = 0, inView = false }: SplitTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const visible = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      <span className="sr-only">{text}</span>
      {splitWords(text).map((word, index) => (
        <span key={index} aria-hidden="true" className="inline-flex whitespace-nowrap">
          {word.chars.map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block whitespace-pre"
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              {...(inView
                ? { whileInView: visible, viewport: { once: true, margin: "0px 0px -48px 0px" } }
                : { animate: visible })}
              transition={{
                duration: DURATION.slow,
                ease: EASE,
                delay: delay + (word.start + charIndex) * 0.045,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
