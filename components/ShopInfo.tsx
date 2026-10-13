"use client";
import { motion } from "framer-motion";
import { STORE, rs } from "@/lib/config";
import { EASE } from "@/lib/motion";

// Only verified store policies (see lib/config.ts). Nothing here is a made-up badge or statistic.
const facts = [["Free shipping", `On bills of ${rs(STORE.freeShippingOver)} and above`], ["Pay your way", STORE.payments.join(" · ")], ["Talk to us", STORE.hours], ["Based in", STORE.city]];

export default function ShopInfo() {
  return (<section aria-labelledby="info-h" className="bg-cream px-5 py-24 md:py-32">
    <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
      <div className="md:col-span-5"><p className="text-xs uppercase tracking-[.3em] text-ink/50">05 — Good to know</p>
        <h2 id="info-h" className="mt-4 font-display text-5xl leading-[.95] md:text-7xl">Shopping with<br />G. Collection</h2>
        <p className="mt-6 max-w-md text-lg text-ink/80">A full collection of stitched and unstitched ladies&apos; clothing, based in {STORE.city}. Our team is available {STORE.hours}.</p></div>
      <dl className="grid md:col-span-7 md:self-end grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/10">
          {facts.map(([h, p], i) => <motion.div key={h} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: i * .08, ease: EASE }} className="bg-cream p-6 transition-colors duration-500 hover:bg-white">
            <dt className="text-xs uppercase tracking-[.2em] text-ink/50">0{i + 1}</dt><dd className="mt-3 font-display text-2xl">{h}</dd><dd className="mt-1 text-sm text-ink/70">{p}</dd></motion.div>)}</dl>
    </div></section>);
}
