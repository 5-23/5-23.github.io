import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollVelocityProps {
  children: ReactNode;
  className?: string;
  baseVelocity?: number;
}

const COPIES = 4;

export function ScrollVelocity({ children, className, baseVelocity = 70 }: ScrollVelocityProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const track = trackRef.current;
      if (!track) return;
      let position = 0;
      let lastScroll = window.scrollY;
      let direction = 1;
      const wrap = gsap.utils.wrap(-100 / COPIES, 0);

      const tick = (_time: number, deltaTime: number) => {
        const width = track.offsetWidth;
        if (width === 0) return;
        const scroll = window.scrollY;
        const velocity = scroll - lastScroll;
        lastScroll = scroll;
        if (velocity !== 0) direction = velocity > 0 ? 1 : -1;
        const speed = baseVelocity + Math.min(Math.abs(velocity) * 5, 400);
        position -= ((direction * speed * (deltaTime / 1000)) / width) * 100;
        gsap.set(track, { xPercent: wrap(position) });
      };

      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: containerRef, dependencies: [reduced, baseVelocity] }
  );

  return (
    <div ref={containerRef} aria-hidden="true" className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max">
        {Array.from({ length: reduced ? 1 : COPIES }).map((_, index) => (
          <div key={index} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
