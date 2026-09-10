import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE } from "@/lib/tokens";

interface RotatingTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function RotatingText({ words, className, interval = 2600 }: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => setIndex((prev) => (prev + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval, reduced]);

  const word = words[index % words.length];

  return (
    <motion.span
      layout
      transition={{ duration: DURATION.base, ease: EASE }}
      className={cn(
        "relative inline-flex h-8 items-center overflow-hidden rounded-md bg-primary px-3 text-label text-white",
        className
      )}
    >
      <span className="sr-only">{words.join(" · ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={word} aria-hidden="true" className="inline-flex whitespace-pre">
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ duration: DURATION.base, ease: EASE, delay: charIndex * 0.025 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
