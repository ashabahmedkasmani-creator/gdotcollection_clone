"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { rs } from "@/lib/config";
const picks = [products[4], products[1], products[9], products[2]];
// Pinned, scroll-controlled showcase: scroll progress picks the garment; the stage tilts gently (small angles only, no garment distortion).
export default function Showcase() {
  const ref = useRef<HTMLElement>(null); const [i, setI] = useState(0); const c = useCart();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(picks.length - 1, Math.floor(v * picks.length))));
  const ry = useTransform(scrollYProgress, [0, 1], [-10, 10]); const p = picks[i];
  return (<section ref={ref} style={{ height: `${picks.length * 90}vh` }} className="relative">
    <div className="sticky top-0 grid h-screen items-center overflow-hidden px-5 transition-colors duration-700 md:grid-cols-2" style={{ background: p.tone, color: "#fff8f0" }}>
      <div className="relative z-10 max-w-md md:pl-[6vw]"><p className="text-xs uppercase tracking-[.3em] opacity-70">Featured · {i + 1} / {picks.length}</p>
        <AnimatePresence mode="wait"><motion.div key={p.slug} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: .5 }}>
          <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{p.name.split(" with ")[0]}</h2><p className="mt-3 text-xl">{rs(p.price)}</p>
          <div className="mt-6 flex gap-3"><button onClick={() => c.add(p.slug)} className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink">Add to cart</button><Link href={`/product/${p.slug}`} className="rounded-full border-2 border-cream px-6 py-3 text-sm font-semibold">Details</Link></div></motion.div></AnimatePresence></div>
      <div className="relative mx-auto h-[56vh] w-[38vh] max-w-full md:h-[76vh] md:w-[50vh]" style={{ perspective: 1200 }}>
        <motion.div style={{ rotateY: ry }} className="h-full w-full"><AnimatePresence mode="popLayout"><motion.img key={p.slug} src={p.image} alt={p.name} initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.1 }} animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .9, ease: [.76, 0, .24, 1] }} className="absolute inset-0 h-full w-full rounded-3xl object-cover shadow-2xl" /></AnimatePresence></motion.div></div>
    </div></section>);
}
