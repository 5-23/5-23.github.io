import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE, STAGGER } from "@/lib/tokens";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function BlurText({ text, className, delay = 0, stagger = STAGGER * 2 }: BlurTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: DURATION.slow, ease: EASE, delay: delay + index * stagger }}
        >
          {index < words.length - 1 ? `${word} ` : word}
        </motion.span>
      ))}
    </span>
  );
}
