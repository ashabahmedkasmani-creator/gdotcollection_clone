"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { products, categories } from "@/data/products";
import { EASE, WIPE } from "@/lib/motion";

// Real piece per collection (accessories keeps the existing mint pick).
const pick = (slug: string) => products.find((p) => p.categories.includes(slug) && (slug !== "accessories" || p.slug.includes("mint-green-floral-printed-2")))
  ?? products.find((p) => p.categories.includes(slug))!;
const second = (slug: string, first: string) => products.find((p) => p.categories.includes(slug) && p.slug !== first) ?? products.find((p) => p.slug !== first)!;
const sizes = ["md:mt-0 md:h-[78vh]", "md:mt-14 md:h-[78vh]", "md:mt-0 md:h-[78vh]"];

export default function Collections() {
  const [active, setActive] = useState<number | null>(null);
  return (<section aria-labelledby="coll-h" className="relative bg-cream px-5 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <div className="grid items-end gap-6 md:grid-cols-12">
        <p className="text-xs uppercase tracking-[.3em] text-ink/50 md:col-span-12">01 — Collections</p>
        <motion.h2 id="coll-h" initial="h" whileInView="v" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: .12 }} className="font-display text-5xl leading-[.95] md:col-span-8 md:text-8xl">
          {["Three ways", "to dress the day."].map((l) => <span key={l} className="block overflow-hidden pb-1"><motion.span className="block" variants={{ h: { y: "110%" }, v: { y: 0, transition: { duration: 1, ease: EASE } } }}>{l}</motion.span></span>)}</motion.h2>
        <p className="max-w-xs text-ink/70 md:col-span-4 md:justify-self-end">Stitched, unstitched and everything that goes with them. Pick a collection to start.</p></div>

      <div className="mt-14 flex flex-col gap-5 md:mt-20 md:flex-row md:gap-4" onMouseLeave={() => setActive(null)}>
        {categories.map((c, k) => {
          const a = pick(c.slug), b = second(c.slug, a.slug), n = products.filter((p) => p.categories.includes(c.slug)).length, open = active === k;
          return (
            <motion.div key={c.slug} initial="h" whileInView="v" viewport={{ once: true, margin: "-80px" }} onMouseEnter={() => setActive(k)} onFocus={() => setActive(k)} style={{ flexGrow: open ? 2.3 : 1, transition: "flex-grow .8s cubic-bezier(.22,1,.36,1)" }}
              className={`relative min-w-0 ${sizes[k]} h-[62vh] md:flex-1 md:basis-0`}>
              <motion.div className="h-full" variants={{ h: { clipPath: "inset(100% 0 0 0)" }, v: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.1, delay: k * .15, ease: WIPE } } }}>
              <Link href={`/shop?cat=${c.slug}`} aria-label={`${c.label} collection, ${n} pieces`} className="group relative block h-full w-full overflow-hidden rounded-[28px]" style={{ background: a.tone }} onPointerMove={(e) => { if (e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--px", String(((e.clientX - r.left) / r.width - .5) * 2)); e.currentTarget.style.setProperty("--py", String(((e.clientY - r.top) / r.height - .5) * 2)); }}>
                <ProductImage p={a} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out [transform:translate3d(calc(var(--px,0)*-14px),calc(var(--py,0)*-14px),0)_scale(1.08)]" />
                {/* second look wipes in from the right on hover (desktop) */}
                <motion.div aria-hidden initial={false} animate={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }} transition={{ duration: .9, ease: WIPE }} className="absolute inset-0 hidden md:block" style={{ background: b.tone }}>
                  <ProductImage p={b} className="h-full w-full object-cover" /></motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-cream md:p-8">
                  <div><p className="text-xs tracking-[.3em] opacity-80">0{k + 1} · {n} {n === 1 ? "piece" : "pieces"}</p><h3 className="mt-2 font-display text-4xl md:text-5xl">{c.label}</h3></div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream text-ink transition duration-500 group-hover:rotate-45 group-hover:bg-rose group-hover:text-white"><ArrowUpRight size={20} /></span></div>
              </Link></motion.div></motion.div>);
        })}
      </div>
    </div></section>);
}
