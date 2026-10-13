"use client";
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const wrap = (min: number, max: number, v: number) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };
// Continuous fashion-vocabulary band. Drifts on its own, speeds up and tilts with scroll velocity, reverses with scroll direction.
export default function Marquee({ words, dir = 1, outline = false, className = "" }: { words: string[]; dir?: 1 | -1; outline?: boolean; className?: string }) {
  const reduce = useReducedMotion(); const x = useMotionValue(0); const d = useRef(dir);
  const { scrollY } = useScroll(); const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 }); const boost = useTransform(v, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const skew = useTransform(v, [-2000, 2000], reduce ? [0, 0] : [4, -4], { clamp: true });
  useAnimationFrame((_, delta) => { if (reduce) return; const b = boost.get(); if (b < -0.3) d.current = -dir as 1 | -1; else if (b > 0.3) d.current = dir; x.set(wrap(-50, 0, x.get() + d.current * (1.1 + Math.abs(b)) * (delta / 1000) * -3)); });
  const row = (k: number) => <div key={k} aria-hidden={k > 0 || undefined} className="flex shrink-0 items-center gap-8 pr-8 md:gap-14 md:pr-14">{words.map((w) => (
    <span key={w} className="flex items-center gap-8 md:gap-14"><span className={`font-display text-[13vw] italic leading-none md:text-[7vw] ${outline ? "text-transparent [-webkit-text-stroke:1.5px_currentColor]" : ""}`}>{w}</span><span className="text-rose" aria-hidden>✦</span></span>))}</div>;
  return (<div className={`overflow-hidden py-4 md:py-6 ${className}`} role="presentation"><motion.div style={{ x: useTransform(x, (p) => `${p}%`), skewX: skew }} className="flex w-max will-change-transform">{[0, 1].map(row)}</motion.div></div>);
}
