import { useEffect, useRef, type CanvasHTMLAttributes, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { parseHex, type Rgb } from "@/lib/color";

export interface CanvasFrame {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  now: number;
  mouse: { x: number; y: number };
  base: Rgb;
  active: Rgb;
  reduced: boolean;
}

type CanvasLayerProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
  ref: RefObject<HTMLCanvasElement | null>;
};

const OFFSCREEN = { x: -9999, y: -9999 };

export function useCanvasBackground(draw: (frame: CanvasFrame) => void): CanvasLayerProps {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let base: Rgb = [39, 43, 55];
    let active: Rgb = [154, 160, 249];
    let mouse = { ...OFFSCREEN };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      base = parseHex(styles.getPropertyValue("--color-line"), base);
      active = parseHex(styles.getPropertyValue("--color-primary-soft"), active);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = (now: number) => {
      if (width === 0 || height === 0) return;
      context.clearRect(0, 0, width, height);
      drawRef.current({ context, width, height, now, mouse, base, active, reduced: Boolean(reduced) });
    };

    const loop = (now: number) => {
      paint(now);
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!visible) return;
      const rect = canvas.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouse = { ...OFFSCREEN };
    };

    readColors();
    resize();
    paint(0);

    const resizeObserver = new ResizeObserver(() => {
      readColors();
      resize();
      paint(performance.now());
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !reduced && !frame) {
        frame = requestAnimationFrame(loop);
      } else if (!visible) {
        stop();
      }
    });
    intersectionObserver.observe(canvas);

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [reduced]);

  return {
    ref: canvasRef,
    "aria-hidden": true,
    className: "pointer-events-none absolute inset-0 -z-10 size-full",
  };
}
