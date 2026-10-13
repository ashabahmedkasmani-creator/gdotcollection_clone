"use client";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
// Mouse-only magnetic pull for primary calls to action.
export default function Magnetic({ children, strength = .3, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion(); const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 }), y = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });
  return <motion.span className={`inline-block ${className}`} style={{ x, y }} onPointerMove={(e) => { if (reduce || e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * strength); y.set((e.clientY - r.top - r.height / 2) * strength); }} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>;
}
