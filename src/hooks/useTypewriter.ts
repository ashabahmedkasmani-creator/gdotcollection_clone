"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Types `text` once on mount. Returns the number of visible characters, or `null`
 * before hydration / when motion is reduced (callers then show the full text).
 * The caller keeps the untyped remainder in the layout (visibility:hidden), so there is no layout shift.
 */
export function useTypewriter(text: string, { delay = 900, speed = 28 } = {}): number | null {
  const reduced = useReducedMotion();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(null);
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    setCount(0);
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, speed, reduced]);

  return count;
}
