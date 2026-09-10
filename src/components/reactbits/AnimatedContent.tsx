import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { Slot } from "@radix-ui/react-slot";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE, SCROLL_START, STAGGER } from "@/lib/tokens";

type Direction = "up" | "left" | "right";

const offsets: Record<Direction, (distance: number) => gsap.TweenVars> = {
  up: (distance) => ({ y: distance }),
  left: (distance) => ({ x: distance }),
  right: (distance) => ({ x: -distance }),
};

interface AnimatedContentProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  scale?: number;
  blur?: boolean;
  stagger?: boolean;
  asChild?: boolean;
}

export function AnimatedContent({
  children,
  className,
  direction = "up",
  distance = 16,
  delay = 0,
  scale = 1,
  blur = false,
  stagger = false,
  asChild = false,
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (reduced || !root) return;
      const targets = stagger ? Array.from(root.children) : [root];
      if (targets.length === 0) return;
      gsap.fromTo(
        targets,
        { opacity: 0, scale, ...(blur && { filter: "blur(6px)" }), ...offsets[direction](distance) },
        {
          opacity: 1,
          scale: 1,
          ...(blur && { filter: "blur(0px)" }),
          x: 0,
          y: 0,
          duration: DURATION.slow,
          ease: GSAP_EASE,
          delay,
          stagger: stagger ? STAGGER : 0,
          scrollTrigger: { trigger: root, start: SCROLL_START, once: true },
        }
      );
    },
    { scope: ref, dependencies: [reduced, direction, distance, delay, scale, blur, stagger] }
  );

  const Comp = asChild ? Slot : "div";

  if (reduced) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
