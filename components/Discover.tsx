"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import AddButton from "@/components/AddButton";
import { products, categories } from "@/data/products";
import { rs } from "@/lib/config";
import { EASE, WIPE, catLabel } from "@/lib/motion";

// Index-style browser: real category filter, hover (or tap on touch) previews the garment, every row links and adds to bag.
export default function Discover() {
  const [cat, setCat] = useState("all"); const [hot, setHot] = useState<string | null>(null);
  const list = useMemo(() => products.filter((p) => cat === "all" || p.categories.includes(cat)), [cat]);
  const shown = list.find((p) => p.slug === hot) ?? list[0];
  const tabs = [{ slug: "all", label: "All" }, ...categories];
  return (<section aria-labelledby="dis-h" className="relative z-[1] -mt-12 rounded-t-[40px] bg-ink px-5 pb-24 pt-24 text-cream md:-mt-16 md:rounded-t-[72px] md:pb-32 md:pt-32">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs uppercase tracking-[.3em] text-cream/50">04 — The Index</p>
      <h2 id="dis-h" className="mt-4 font-display text-5xl leading-[.95] md:text-8xl">Find your piece.</h2>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by collection">
        {tabs.map((t) => { const n = t.slug === "all" ? products.length : products.filter((p) => p.categories.includes(t.slug)).length;
          return (<button key={t.slug} aria-pressed={cat === t.slug} onClick={() => { setCat(t.slug); setHot(null); }} className="relative rounded-full border border-cream/25 px-5 py-2 text-sm">
            {cat === t.slug && <motion.span layoutId="dis-pill" transition={{ duration: .5, ease: EASE }} className="absolute inset-0 rounded-full bg-cream" />}
            <span className={`relative transition-colors ${cat === t.slug ? "text-ink" : ""}`}>{t.label} <sup className="text-[10px] opacity-60">{n}</sup></span></button>); })}</div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
        <ul className="min-w-0 md:col-span-7" onMouseLeave={() => setHot(null)}>
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <motion.li layout key={p.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .5, ease: EASE }}
                onMouseEnter={() => setHot(p.slug)} onFocus={() => setHot(p.slug)} className={`group flex items-center gap-4 border-t border-cream/15 py-4 transition-opacity duration-500 ${shown?.slug === p.slug ? "" : "md:opacity-45"} last:border-b`}>
                <span className="w-8 text-xs tabular-nums text-cream/40">{String(i + 1).padStart(2, "0")}</span>
                <Link href={`/product/${p.slug}`} className="flex min-w-0 flex-1 items-center gap-4">
                  <span className="h-[84px] w-14 shrink-0 overflow-hidden rounded-lg md:hidden" style={{ background: p.tone }}><ProductImage p={p} className="h-full w-full object-cover" /></span>
                  <span className="min-w-0"><span className="block truncate font-display text-lg transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">{p.name.split(" with ")[0]}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[.2em] text-cream/50">{catLabel(p.categories)} · {rs(p.price)}</span></span></Link>
                <AddButton slug={p.slug} label="Add" className="shrink-0 !bg-cream px-4 py-2 !text-ink hover:!bg-rose hover:!text-white" /></motion.li>))}
          </AnimatePresence>
          {list.length === 0 && <li className="py-12 text-cream/60">Nothing here yet.</li>}
        </ul>

        <div className="relative hidden md:col-span-5 md:block"><div className="sticky top-28">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px]" style={{ background: shown?.tone }}>
            <AnimatePresence initial={false}>{shown && <motion.div key={shown.slug} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 1 }} transition={{ duration: .8, ease: WIPE }} className="absolute inset-0" style={{ background: shown.tone }}>
              <ProductImage p={shown} className="h-full w-full object-cover" /></motion.div>}</AnimatePresence></div>
          {shown && <Link href={`/product/${shown.slug}`} className="mt-5 flex items-center justify-between gap-4 text-sm"><span className="line-clamp-2">{shown.name}</span><span className="inline-flex shrink-0 items-center gap-1 underline">View <ArrowUpRight size={14} /></span></Link>}</div></div>
      </div></div></section>);
}
