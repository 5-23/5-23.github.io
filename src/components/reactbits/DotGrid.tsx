import { useCanvasBackground } from "@/hooks/useCanvasBackground";
import { mixRgb } from "@/lib/color";

const GAP = 28;
const BASE_RADIUS = 1.5;
const ACTIVE_RADIUS = 2.5;
const INFLUENCE = 140;

export function DotGrid() {
  const layer = useCanvasBackground(({ context, width, height, mouse, base, active, reduced }) => {
    const offset = window.scrollY % GAP;
    for (let x = GAP / 2; x < width; x += GAP) {
      for (let row = GAP / 2 - GAP; row < height + GAP; row += GAP) {
        const y = row + offset;
        let t = 0;
        if (!reduced) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < INFLUENCE) t = 1 - distance / INFLUENCE;
        }
        context.fillStyle = mixRgb(base, active, t);
        context.beginPath();
        context.arc(x, y, BASE_RADIUS + (ACTIVE_RADIUS - BASE_RADIUS) * t, 0, Math.PI * 2);
        context.fill();
      }
    }
  });

  return <canvas {...layer} />;
}
