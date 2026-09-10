export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.15,
  base: 0.35,
  slow: 0.5,
} as const;

export const STAGGER = 0.05;

export const GSAP_EASE = "power3.out";

export const GSAP_EASE_POP = "back.out(2.2)";

export const SCROLL_START = "top 88%";

export const SCROLL_SCRUB = {
  start: "top 92%",
  end: "top 45%",
} as const;
