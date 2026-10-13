"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, WIPE } from "@/lib/motion";
// Re-mounts on every route change: a plum curtain lifts and the page rises in. Skipped on the very first load.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [nav] = useState(() => typeof window !== "undefined" && !!(window as unknown as { __gcNav?: boolean }).__gcNav);
  useEffect(() => { (window as unknown as { __gcNav?: boolean }).__gcNav = true; }, []);
  const on = nav && !reduce;
  return (<>
    {on && <motion.div aria-hidden initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: .8, ease: WIPE }} style={{ transformOrigin: "top" }} className="pointer-events-none fixed inset-0 z-[80] bg-plum" />}
    <motion.div initial={on ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .25, ease: EASE }}>{children}</motion.div></>);
}
