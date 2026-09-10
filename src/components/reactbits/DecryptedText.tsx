import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/";

interface DecryptedTextProps {
  text: string;
  className?: string;
  trigger?: "mount" | "hover";
  delay?: number;
}

export function DecryptedText({ text, className, trigger = "mount", delay = 0 }: DecryptedTextProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(0);
  const timeoutRef = useRef(0);

  const run = useCallback(() => {
    if (reduced) return;
    const chars = Array.from(text);
    let revealed = 0;
    window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      revealed += 1;
      setDisplay(
        chars
          .map((char, index) => {
            if (index < revealed || char === " ") return char;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("")
      );
      if (revealed >= chars.length) window.clearInterval(intervalRef.current);
    }, 40);
  }, [text, reduced]);

  useEffect(() => {
    setDisplay(text);
    if (trigger === "mount") {
      timeoutRef.current = window.setTimeout(run, delay * 1000);
    }
    return () => {
      window.clearTimeout(timeoutRef.current);
      window.clearInterval(intervalRef.current);
    };
  }, [run, trigger, delay, text]);

  const handlers = trigger === "hover" ? { onMouseEnter: run } : {};

  return (
    <span className={cn("relative inline-block overflow-hidden whitespace-nowrap", className)} {...handlers}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {display}
      </span>
    </span>
  );
}
