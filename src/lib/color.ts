export type Rgb = [number, number, number];

export function parseHex(value: string, fallback: Rgb): Rgb {
  const hex = value.trim().replace("#", "");
  if (hex.length !== 6) return fallback;
  const num = parseInt(hex, 16);
  if (Number.isNaN(num)) return fallback;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function mixRgb(from: Rgb, to: Rgb, t: number): string {
  const r = Math.round(from[0] + (to[0] - from[0]) * t);
  const g = Math.round(from[1] + (to[1] - from[1]) * t);
  const b = Math.round(from[2] + (to[2] - from[2]) * t);
  return `rgb(${r} ${g} ${b})`;
}
