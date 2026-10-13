"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { products } from "@/data/products";
import { rs } from "@/lib/config";
import ProductImage from "@/components/ProductImage";

// Hero slides: saturated background per look (like the reference), product cutout in /public/cutouts/<slug>.png
const slides = [
  { p: products[0], bg: "#f27ba5" }, { p: products[6], bg: "#2fbf8f" }, { p: products[4], bg: "#8c1450" },
  { p: products[1], bg: "#c9863b" }, { p: products[2], bg: "#2b2f6b" },
];
const N = slides.length;
const isDark = (h: string) => parseInt(h.slice(1, 3), 16) * .3 + parseInt(h.slice(3, 5), 16) * .59 + parseInt(h.slice(5, 7), 16) * .11 < 150;
const ease = [.22, 1, .36, 1] as const;
// Slot positions: 0 = main, 1/2 = smaller companions stepping down, "out" = left exit, "wait" = parked right
const desk = [{ x: "17vw", y: "0vh", s: 1 }, { x: "37vw", y: "-7vh", s: .5 }, { x: "46vw", y: "9vh", s: .32 }];
const mob = [{ x: "0vw", y: "9vh", s: 1.05 }, { x: "33vw", y: "-12vh", s: .42 }, { x: "40vw", y: "16vh", s: .3 }];

function Cut({ p, eager }: { p: (typeof products)[number]; eager?: boolean }) {
  // Cutout PNG first, then the original photo, then the full-res upload, then a tone plate: never a broken image.
  return <ProductImage p={p} cutout eager={eager} className="h-full w-full select-none" cutoutClassName="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,.28)]" photoClassName="rounded-3xl object-cover shadow-2xl" />;
}

export default function Hero() {
  const [i, setI] = useState(0); const [mobile, setMobile] = useState(false); const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion(); const ref = useRef<HTMLElement>(null);
  useEffect(() => { const m = matchMedia("(max-width: 767px)"); const f = () => setMobile(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  useEffect(() => { if (reduce || paused) return; const t = setInterval(() => setI((x) => (x + 1) % N), 4800); return () => clearInterval(t); }, [reduce, paused]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]); const stageY = useTransform(scrollYProgress, [0, 1], ["0vh", "-14vh"]);
  const stageRot = useTransform(scrollYProgress, [0, 1], [0, 6]); const textY = useTransform(scrollYProgress, [0, 1], ["0vh", "-22vh"]); const textO = useTransform(scrollYProgress, [0, .6], [1, 0]);
  const mx = useMotionValue(0), my = useMotionValue(0); const sx = useSpring(mx, { stiffness: 50, damping: 14 }), sy = useSpring(my, { stiffness: 50, damping: 14 });
  const ry = useTransform(sx, [-1, 1], [-9, 9]); const rx = useTransform(sy, [-1, 1], [5, -5]);

  const cur = slides[i]; const dark = isDark(cur.bg); const fg = dark ? "#fff8f0" : "#1a1210"; const pos = mobile ? mob : desk;
  return (
    <section ref={ref} onMouseMove={(e) => { mx.set(e.clientX / innerWidth * 2 - 1); my.set(e.clientY / innerHeight * 2 - 1); }}
      className="relative h-[calc(100svh-104px)] min-h-[560px] overflow-hidden transition-colors duration-[900ms]" style={{ backgroundColor: cur.bg, color: fg }}>
      {/* soft light bloom behind the products, like the reference */}
      <div aria-hidden className="pointer-events-none absolute right-[-10vw] top-[8vh] h-[80vh] w-[70vw] rounded-full bg-white/15 blur-3xl" />

      <motion.div style={{ y: textY, opacity: textO }} className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-start px-5 pt-8 md:justify-center md:pt-0">
        <div className="max-w-[min(90vw,560px)]">
          <h1 className="font-sans text-[13vw] font-extrabold leading-[.95] tracking-tight md:text-[6.2vw]" style={{ fontFamily: "ui-sans-serif, system-ui, 'Segoe UI', sans-serif" }}>
            {["Wear the Story,", "Every Stitch"].map((l, k) => <span key={l} className="block overflow-hidden"><motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: .2 + k * .12, ease }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7, duration: .8, ease }} className="mt-4 max-w-sm text-sm opacity-90 md:text-base">
            Stitched and unstitched ladies&apos; clothing from Karachi. Embroidery, lace and lawn in colours that move with you.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: .8, ease }} className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-105" style={{ background: fg, color: cur.bg }}>Shop Collection</Link>
            <Link href={`/product/${cur.p.slug}`} className="rounded-full border-2 px-6 py-3 text-sm font-semibold transition hover:scale-105" style={{ borderColor: fg }}>View this look</Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Product stage: perspective + mouse tilt + scroll scale */}
      <div className="absolute inset-0 z-10" style={{ perspective: 1400 }}>
        <motion.div style={{ rotateX: rx, rotateY: ry, scale: stageScale, y: stageY, rotateZ: stageRot }} className="absolute inset-0">
          {slides.map((s, k) => {
            const slot = (k - i + N) % N; const out = slot === N - 1; const wait = slot >= 3 && !out; const t = out ? { x: "-30vw", y: pos[0].y, s: .8 } : wait ? { x: "58vw", y: "0vh", s: .2 } : pos[slot];
            return (
              <motion.div key={s.p.slug} aria-hidden={slot !== 0} initial={{ opacity: 0, x: "70vw", scale: .4, rotateY: 40, filter: "blur(14px)" }}
                animate={{ opacity: out || wait ? 0 : 1, x: t.x, y: t.y, scale: t.s, rotateY: out ? -30 : 0, filter: out ? "blur(14px)" : slot === 0 ? "blur(0px)" : "blur(1.5px)" }}
                transition={{ duration: 1.1, ease, delay: i === 0 && k === 0 ? .35 : 0 }}
                className="absolute left-1/2 top-1/2 -ml-[min(20svh,22vw)] -mt-[31svh] h-[62svh] w-[min(40svh,44vw)]" style={{ zIndex: 10 - slot }}>
                <button onClick={() => setI(k)} aria-label={`Show ${s.p.name}`} className="h-full w-full cursor-pointer"><Cut p={s.p} eager /></button>
              </motion.div>);
          })}
        </motion.div>
      </div>

      {/* bottom-left "now showing" pill + bottom-right dots, as in reference */}
      <div className="absolute bottom-16 left-5 z-20 flex items-center gap-3 md:left-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="flex -space-x-2">{slides.map((s, k) => <button key={s.p.slug} aria-label={`Look ${k + 1}`} onClick={() => setI(k)} className={`h-6 w-6 rounded-full border-2 transition ${k === i ? "scale-125" : "opacity-70"}`} style={{ background: s.bg, borderColor: fg }} />)}</div>
        <div className="hidden text-xs leading-tight sm:block"><p className="font-semibold">Now showing</p><p className="max-w-[14rem] truncate opacity-80">{cur.p.name} · {rs(cur.p.price)}</p></div>
      </div>
      <div className="absolute bottom-16 right-5 z-20 flex gap-2 md:right-10" role="tablist" aria-label="Hero slides">
        {slides.map((s, k) => <button key={s.p.slug} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8" : "w-2.5 opacity-50"}`} style={{ background: fg }} />)}</div>

      {/* wave + ticker strip into next section */}
      <svg aria-hidden viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-8 z-10 h-7 w-full fill-ink"><path d="M0 40V18C240-6 480 40 720 18s480-24 720 0v22z" /></svg>
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-8 items-center overflow-hidden bg-ink text-[11px] font-semibold uppercase tracking-widest text-cream">
        <div className="marquee flex shrink-0 gap-10 whitespace-nowrap pr-10">{[0, 1, 2, 3].map((n) => <span key={n}>Free shipping over ₨10,000 · Cash on Delivery &amp; Bank Transfer · Stitched &amp; Unstitched · Karachi, Pakistan ·</span>)}</div>
      </div>
    </section>);
}
