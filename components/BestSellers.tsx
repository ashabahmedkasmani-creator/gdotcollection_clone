"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import DragRail from "@/components/DragRail";
import { products } from "@/data/products";
import { EASE } from "@/lib/motion";

// Same eight pieces the page already called Best Sellers, now composed as feature + supporting + rail.
const feature = products[4], support = [products[7], products[1]], rail = [0, 2, 5, 6, 8].map((i) => products[i]);

export default function BestSellers() {
  return (<section aria-labelledby="bs-h" className="bg-white px-5 pb-16 pt-24 md:pb-20 md:pt-32">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6"><p className="text-xs uppercase tracking-[.3em] text-ink/50">02 — Best Sellers</p>
          <div className="mt-4 md:sticky md:top-28"><ProductCard p={feature} variant="feature" /></div></div>
        <div className="md:col-span-6 md:pl-6">
          <div className="flex items-end justify-between gap-6"><motion.h2 id="bs-h" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }} className="font-display text-5xl leading-[.95] md:text-7xl">Most loved,<br />right now.</motion.h2>
            <Link href="/shop" className="hidden shrink-0 text-sm underline md:block">See all</Link></div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
            <ProductCard p={support[0]} variant="tall" i={1} />
            <ProductCard p={support[1]} variant="grid" i={2} className="mt-12 md:mt-24" /></div></div></div>
      <div className="mt-20 md:mt-28"><DragRail label="More from the collection · drag or swipe">{rail.map((p, i) => <ProductCard key={p.slug} p={p} variant="rail" i={i} className="w-[64vw] shrink-0 snap-start sm:w-[44vw] md:w-[22rem]" />)}</DragRail></div>
    </div></section>);
}
