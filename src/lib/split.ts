export interface SplitWord {
  chars: string[];
  start: number;
}

export function splitWords(text: string): SplitWord[] {
  const words = text.split(" ");
  let offset = 0;
  return words.map((word, index) => {
    const chars = Array.from(index < words.length - 1 ? `${word} ` : word);
    const start = offset;
    offset += chars.length;
    return { chars, start };
  });
}
