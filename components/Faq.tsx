"use client";
import { forwardRef, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTilt } from "@/components/useTilt";
import { faqCats, faqs, type Faq, type FaqCat } from "@/data/faq";
import { STORE } from "@/lib/config";
import { EASE } from "@/lib/motion";

// Brand-derived card surfaces per category (all text/background pairs keep readable contrast).
const skin: Record<FaqCat, { bg: string; fg: string; sub: string; chip: string }> = {
  orders: { bg: "#f4d9e3", fg: "#17120f", sub: "rgba(23,18,15,.72)", chip: "rgba(23,18,15,.08)" },
  shipping: { bg: "#ffffff", fg: "#17120f", sub: "rgba(23,18,15,.72)", chip: "rgba(23,18,15,.07)" },
  product: { bg: "#5b2a4a", fg: "#faf3ea", sub: "rgba(250,243,234,.8)", chip: "rgba(250,243,234,.14)" },
  returns: { bg: "#e9dfd0", fg: "#17120f", sub: "rgba(23,18,15,.75)", chip: "rgba(23,18,15,.08)" },
  support: { bg: "#17120f", fg: "#faf3ea", sub: "rgba(250,243,234,.8)", chip: "rgba(250,243,234,.14)" },
};
const span = (i: number) => (i % 5 === 0 ? "md:col-span-2" : "");

const Card = forwardRef<HTMLLIElement, { f: Faq; n: number; i: number; reduce: boolean }>(function Card({ f, n, i, reduce }, ref) {
  const [open, setOpen] = useState(false); const id = useId(); const s = skin[f.cat]; const { rx, ry, handlers } = useTilt(2.5);
  const cat = faqCats.find((c) => c.slug === f.cat)!;
  return (
    <motion.li ref={ref} layout={!reduce} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, scale: .96 }} transition={{ duration: .7, delay: Math.min(i, 5) * .05, ease: EASE, layout: { duration: .6, ease: EASE } }}
      style={{ perspective: 900 }} className={`self-start ${span(i)}`}>
      <motion.div {...(reduce ? {} : handlers)} style={reduce ? undefined : { rotateX: rx, rotateY: ry }} whileHover={reduce ? undefined : { y: -4 }}
        className="group relative overflow-hidden rounded-[26px] border border-ink/10 transition-shadow duration-500 hover:shadow-[0_24px_50px_-22px_rgba(23,18,15,.45)]">
        <div style={{ background: s.bg, color: s.fg }} className="relative">
          {/* hover wash + stitched inner border */}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 to-white/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <span aria-hidden className="pointer-events-none absolute inset-2 rounded-[20px] border border-dashed opacity-0 transition-opacity duration-700 group-hover:opacity-30" style={{ borderColor: s.fg }} />
          <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="relative flex w-full items-start gap-4 p-6 text-left md:p-7">
            <span className="mt-1 text-xs tabular-nums tracking-[.2em]" style={{ color: s.sub }}>{String(n).padStart(2, "0")}</span>
            <span className="flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[.25em]" style={{ color: s.sub }}>{cat.label}</span>
              <span className="mt-2 block font-display text-xl leading-snug md:text-2xl">{f.q}</span></span>
            <span aria-hidden className="relative mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 group-hover:bg-white/10" style={{ borderColor: s.sub }}>
              <span className="absolute h-px w-4 bg-current" /><motion.span animate={{ rotate: open ? 90 : 0, scaleY: open ? 0 : 1 }} transition={{ duration: reduce ? 0 : .45, ease: EASE }} className="absolute h-4 w-px bg-current" /></span>
          </button>
          <AnimatePresence initial={false}>{open && (
            <motion.div id={id} role="region" aria-label={f.q} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : .55, ease: EASE }} className="relative overflow-hidden">
              <div className="px-6 pb-7 pl-[4.25rem] md:px-7 md:pb-8 md:pl-[4.75rem]">
                <p className="max-w-prose text-base leading-relaxed" style={{ color: s.fg }}>{f.a}</p>
                {f.confirm && <p className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[.15em]" style={{ background: s.chip }}><span className="h-1.5 w-1.5 rounded-full bg-current" />Store to confirm</p>}</div></motion.div>)}</AnimatePresence>
        </div></motion.div></motion.li>);
});

export default function FaqSection() {
  const [cat, setCat] = useState<"all" | FaqCat>("all"); const reduce = !!useReducedMotion();
  const list = faqs.filter((f) => cat === "all" || f.cat === cat);
  const tabs = [{ slug: "all" as const, label: "All questions", n: faqs.length }, ...faqCats.map((c) => ({ slug: c.slug, label: c.label, n: faqs.filter((f) => f.cat === c.slug).length }))];
  return (<section id="faq" aria-labelledby="faq-h" className="relative overflow-hidden bg-[#fbeef3] px-5 py-24 md:py-32">
    {/* decorative running stitch */}
    <motion.div aria-hidden initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true }} transition={{ duration: 2.4, ease: EASE }} className="absolute inset-x-0 top-8 h-6 text-rose/60 motion-reduce:[clip-path:none!important]">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full"><path d="M0 20 C150 0 300 40 450 20 S750 0 900 20 S1100 36 1200 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 9" /></svg></motion.div>
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4"><div className="md:sticky md:top-28">
        <p className="text-xs uppercase tracking-[.3em] text-ink/50">06 — FAQ</p>
        <h2 id="faq-h" className="mt-4 font-display text-5xl leading-[.95] md:text-6xl lg:text-7xl">Questions,<br /><em className="text-plum">answered.</em></h2>
        <p className="mt-5 max-w-xs text-ink/70">Everything we can confirm today about orders, delivery and sizes. Where the store hasn&apos;t published a policy, the card says so.</p>
        <div role="group" aria-label="Filter questions by topic" className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-col md:items-start md:overflow-visible md:px-0">
          {tabs.map((t) => { const on = cat === t.slug; return (
            <button key={t.slug} type="button" aria-pressed={on} onClick={() => setCat(t.slug)} className="relative shrink-0 whitespace-nowrap rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors hover:border-ink/40">
              {on && <motion.span layoutId="faq-pill" transition={{ duration: reduce ? 0 : .5, ease: EASE }} className="absolute inset-0 rounded-full bg-ink" />}
              <span className={`relative transition-colors duration-300 ${on ? "text-cream" : ""}`}>{t.label} <sup className="text-[10px] opacity-60">{t.n}</sup></span></button>); })}</div>
        <div className="mt-10 hidden rounded-3xl border border-ink/10 bg-white/60 p-6 md:block"><p className="font-display text-xl">Still wondering?</p>
          <p className="mt-2 text-sm text-ink/70">{STORE.hours}</p>
          <a href={`https://wa.me/${STORE.phone.replace(/\D/g, "")}`} className="mt-4 block text-sm underline underline-offset-4 hover:text-rose">WhatsApp {STORE.phone}</a>
          <a href={`mailto:${STORE.email}`} className="mt-1 block break-all text-sm underline underline-offset-4 hover:text-rose">{STORE.email}</a></div>
      </div></div>

      <ul className="grid grid-cols-1 gap-4 md:col-span-8 md:grid-cols-2 md:gap-5">
        <AnimatePresence mode="popLayout" initial={false}>{list.map((f, i) => <Card key={f.q} f={f} n={faqs.indexOf(f) + 1} i={i} reduce={reduce} />)}</AnimatePresence></ul>

      <div className="rounded-3xl border border-ink/10 bg-white/60 p-6 md:hidden"><p className="font-display text-xl">Still wondering?</p><p className="mt-2 text-sm text-ink/70">{STORE.hours}</p>
        <a href={`https://wa.me/${STORE.phone.replace(/\D/g, "")}`} className="mt-4 block py-2 text-sm underline underline-offset-4">WhatsApp {STORE.phone}</a>
        <a href={`mailto:${STORE.email}`} className="block break-all py-2 text-sm underline underline-offset-4">{STORE.email}</a></div>
    </div></section>);
}
