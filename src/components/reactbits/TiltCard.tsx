import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export function TiltCard({ children, className, max = 4 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const element = ref.current;
      if (!element) return;
      gsap.set(element, { transformPerspective: 800 });
      const rotateX = gsap.quickTo(element, "rotationX", { duration: 0.5, ease: "power2.out" });
      const rotateY = gsap.quickTo(element, "rotationY", { duration: 0.5, ease: "power2.out" });

      const onMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(px * max * 2);
        rotateX(-py * max * 2);
      };

      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseleave", onLeave);
      return () => {
        element.removeEventListener("mousemove", onMove);
        element.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref, dependencies: [reduced, max] }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
