"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import ProductImage from "@/components/ProductImage";
import { products } from "@/data/products";
import { rs } from "@/lib/config";
import { EASE, WIPE } from "@/lib/motion";
import type { Product } from "@/types";

const [a, b, c] = [products[0], products[9], products[2]];

function Plate({ p, n, shape, speed, className = "" }: { p: Product; n: string; shape: string; speed: [number, number]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed[0], speed[1]]); const inner = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (<motion.figure ref={ref} style={{ y }} className={`relative ${className}`} initial="h" whileInView="v" viewport={{ once: true, margin: "-10%" }}>
    <motion.div variants={{ h: { clipPath: "inset(0 0 100% 0)" }, v: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.3, ease: WIPE } } }}
      className={`relative overflow-hidden ${shape}`} style={{ background: p.tone }}>
      <motion.div style={{ y: inner, scale: 1.15 }} className="h-full w-full"><ProductImage p={p} className="h-full w-full object-cover" /></motion.div></motion.div>
    <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm"><span className="text-xs tracking-[.25em] text-ink/50">No. {n}</span>
      <Link href={`/product/${p.slug}`} className="line-clamp-1 flex-1 font-medium underline-offset-4 hover:underline">{p.name.split(" with ")[0]}</Link><span className="text-ink/70">{rs(p.price)}</span></figcaption></motion.figure>);
}

export default function Editorial() {
  return (<section aria-labelledby="ed-h" className="relative overflow-hidden bg-[#f4d9e3] px-5 pb-40 pt-24 md:pb-56 md:pt-36">
    <div className="relative mx-auto max-w-7xl">
      <div className="flex items-center justify-between border-b border-ink/20 pb-4 text-[11px] uppercase tracking-[.3em]"><span>The Edit</span><span className="hidden sm:block">Embroidery · Lace · Lawn</span><span>Karachi</span></div>
      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-5"><h2 id="ed-h" className="font-display text-6xl leading-[.9] md:text-8xl">Made<br /><em className="text-plum">by hand,</em><br />worn by you.</h2>
          <p className="mt-8 max-w-sm text-lg text-ink/80">Schiffli lace sleeves. Fringed hems. Scalloped cutwork borders. The details that make a kurti feel considered.</p>
          <Magnetic className="mt-8"><Link href="/shop" className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-cream transition hover:bg-plum">Shop the edit</Link></Magnetic></div>
        <Plate p={a} n="01" shape="aspect-[3/4] rounded-t-[999px]" speed={[40, -60]} className="md:col-span-5 md:col-start-8" />
      </div>
      <div className="mt-14 grid gap-14 md:mt-0 md:grid-cols-12 md:gap-x-8">
        <Plate p={b} n="02" shape="aspect-[4/5] rounded-2xl" speed={[60, -40]} className="md:col-span-5 md:col-start-2 md:-mt-24" />
        <Plate p={c} n="03" shape="aspect-[3/4] rounded-2xl" speed={[90, -30]} className="md:col-span-3 md:col-start-9 md:mt-32" /></div>
    </div></section>);
}
