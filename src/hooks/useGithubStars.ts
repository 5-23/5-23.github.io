import { useEffect, useState } from "react";

export type StarsStatus = "loading" | "ready" | "error";

export interface StarsState {
  status: StarsStatus;
  stars: Record<string, number>;
}

const CACHE_KEY = "asta-gh-stars";
const CACHE_TTL = 60 * 60 * 1000;

export function repoFromUrl(href: string): string | null {
  const match = href.match(/github\.com\/([^/]+\/[^/#?]+)/);
  return match ? match[1].toLowerCase() : null;
}

function readCache(repos: string[]): Record<string, number> | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; stars: Record<string, number> };
    if (Date.now() - parsed.at > CACHE_TTL) return null;
    if (!repos.every((repo) => repo in parsed.stars)) return null;
    return parsed.stars;
  } catch {
    return null;
  }
}

export function useGithubStars(repos: string[]) {
  const [state, setState] = useState<StarsState>({ status: "loading", stars: {} });
  const reposKey = repos.join(",");

  useEffect(() => {
    const targets = reposKey.split(",").filter(Boolean);
    const cached = readCache(targets);
    if (cached) {
      setState({ status: "ready", stars: cached });
      return;
    }

    let cancelled = false;

    Promise.allSettled(
      targets.map(async (repo) => {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) throw new Error(`${response.status}`);
        const data = (await response.json()) as { stargazers_count: number };
        return [repo, data.stargazers_count] as const;
      })
    ).then((results) => {
      if (cancelled) return;
      const stars: Record<string, number> = {};
      for (const result of results) {
        if (result.status === "fulfilled") {
          stars[result.value[0]] = result.value[1];
        }
      }
      if (Object.keys(stars).length === 0) {
        setState({ status: "error", stars: {} });
        return;
      }
      if (Object.keys(stars).length === targets.length) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), stars }));
        } catch {
          void 0;
        }
      }
      setState({ status: "ready", stars });
    });

    return () => {
      cancelled = true;
    };
  }, [reposKey]);

  return state;
}
