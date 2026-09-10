import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface MagnetProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnet({ children, className, strength = 0.3 }: MagnetProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  if (reduced) {
    return <div className={cn("inline-flex", className)}>{children}</div>;
  }

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={ref} className={cn("inline-flex", className)} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <motion.div className="inline-flex" style={{ x: springX, y: springY }}>
        {children}
      </motion.div>
    </div>
  );
}
