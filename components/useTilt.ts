"use client";
import { useMotionValue, useSpring } from "framer-motion";
// Pointer-driven tilt for mouse only (touch/pen are ignored so scrolling stays natural).
export function useTilt(max = 7) {
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 }), ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const handlers = {
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => { if (e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - .5) * max * 2); rx.set(((e.clientY - r.top) / r.height - .5) * -max * 2); },
    onPointerLeave: () => { rx.set(0); ry.set(0); },
  };
  return { rx, ry, handlers };
}
