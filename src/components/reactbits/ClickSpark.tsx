import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const SPARK_COUNT = 8;
const SPARK_SIZE = 10;
const SPARK_RADIUS = 20;
const SPARK_DURATION = 400;

interface Spark {
  x: number;
  y: number;
  angle: number;
  start: number;
}

export function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let running = false;
    let color = "#9aa0f9";

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(document.documentElement).getPropertyValue("--color-primary-soft").trim() || color;
    };
    resize();
    window.addEventListener("resize", resize);

    const easeOut = (t: number) => t * (2 - t);

    const draw = (now: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.start;
        if (elapsed >= SPARK_DURATION) return false;
        const progress = easeOut(elapsed / SPARK_DURATION);
        const distance = progress * SPARK_RADIUS;
        const length = SPARK_SIZE * (1 - progress);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + length) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + length) * Math.sin(spark.angle);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        return true;
      });
      if (sparksRef.current.length > 0) {
        frame = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const onClick = (event: MouseEvent) => {
      const now = performance.now();
      for (let i = 0; i < SPARK_COUNT; i += 1) {
        sparksRef.current.push({
          x: event.clientX,
          y: event.clientY,
          angle: (Math.PI * 2 * i) / SPARK_COUNT,
          start: now,
        });
      }
      if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
    };
  }, [reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-toast size-full" />;
}
