import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "@/lib/tokens";

interface CountUpProps {
  value: number;
  className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: DURATION.slow,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value, reduced]);

  return <span className={className}>{display.toLocaleString()}</span>;
}
