"use client";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductImage from "@/components/ProductImage";
import AddButton from "@/components/AddButton";
import { products } from "@/data/products";
import { rs } from "@/lib/config";
import type { Product } from "@/types";

// Real pieces whose names carry the three details: lace sleeves + fringed hem / scalloped cutwork / schiffli lace.
const F = products[4], A = products[2], B = products[0];
const short = (p: Product) => p.name.split(" with ")[0];

/**
 * Pinned editorial scene (GSAP ScrollTrigger, scrubbed). One scroll gesture choreographs:
 *  1. the featured photograph opens from an arch into a frame and rotates out of perspective,
 *  2. the headline wipes in line by line while a ghost word drifts behind,
 *  3. two supporting photographs fly in from depth (translateZ), 4. details + shopping controls surface.
 * Reduced motion: no pin, no scrub; the finished composition is simply shown.
 * The CSS below is the finished composition; GSAP only animates *from* the start state *to* it.
 */
export default function ScrollShowcase() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(); const q = gsap.utils.selector(root);
    mm.add({ desk: "(min-width: 768px) and (prefers-reduced-motion: no-preference)", mob: "(max-width: 767px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      const d = !!ctx.conditions?.desk;
      const end = d ? { f: { x: "6vw", y: 0 }, a: { x: "30vw", y: "-17vh" }, b: { x: "24vw", y: "24vh" } } : { f: { x: 0, y: "3vh" }, a: { x: "30vw", y: "-14vh" }, b: { x: "-30vw", y: "16vh" } };
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: q(".sc-stage")[0], start: "top top", end: d ? "+=190%" : "+=170%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true } });
      gsap.set(q(".sc-f"), { x: 0, y: end.f.y === 0 ? 0 : "3vh", scale: d ? 0.7 : 0.78, rotationY: d ? -16 : 0, borderTopLeftRadius: 999, borderTopRightRadius: 999, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 });
      gsap.set(q(".sc-f-img"), { scale: 1.3 });
      gsap.set(q(".sc-line"), { yPercent: 115 });
      gsap.set(q(".sc-fade"), { autoAlpha: 0, y: 24 });
      gsap.set(q(".sc-a"), { x: d ? "70vw" : "60vw", y: d ? "-30vh" : "-28vh", z: -900, rotationY: 28, autoAlpha: 0 });
      gsap.set(q(".sc-b"), { x: d ? "55vw" : "-60vw", y: d ? "45vh" : "40vh", z: -1100, rotationY: -24, autoAlpha: 0 });
      tl.to(q(".sc-word"), { xPercent: -42, ease: "none", duration: 6 }, 0)
        .to(q(".sc-f"), { scale: 1, rotationY: 0, borderTopLeftRadius: 28, borderTopRightRadius: 28, duration: 1.6, ease: "power3.inOut" }, 0)
        .to(q(".sc-f-img"), { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .to(q(".sc-f"), { x: end.f.x, y: end.f.y, duration: 1.4, ease: "power3.inOut" }, 1.4)
        .to(q(".sc-line"), { yPercent: 0, duration: 1, stagger: 0.35 }, 1.7)
        .to(q(".sc-a"), { x: end.a.x, y: end.a.y, z: 0, rotationY: 0, autoAlpha: 1, duration: 1.5, ease: "power3.out" }, 2.8)
        .to(q(".sc-b"), { x: end.b.x, y: end.b.y, z: 0, rotationY: 0, autoAlpha: 1, duration: 1.5, ease: "power3.out" }, 3.2)
        .to(q(".sc-fade"), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.18 }, 4.2)
        .to(q(".sc-bar"), { scaleX: 1, ease: "none", duration: 6 }, 0)
        .to({}, { duration: 0.8 }); // hold on the finished composition
      return () => { /* reverted by matchMedia */ };
    });
    return () => mm.revert();
  }, []);

  const frame = "absolute inset-0 m-auto overflow-hidden will-change-transform";
  return (
    <div ref={root} className="relative -mt-12 md:-mt-16">
      <div aria-hidden className="h-12 rounded-t-[40px] bg-plum md:h-16 md:rounded-t-[72px]" />
      <section aria-labelledby="sc-h" className="sc-stage relative h-[100svh] min-h-[600px] overflow-hidden bg-plum text-cream" style={{ perspective: 1400 }}>
        <p aria-hidden className="sc-word pointer-events-none absolute left-[8vw] top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[38vw] italic leading-none text-cream/[.07] will-change-transform">Lace · Fringe · Cutwork</p>

        <div className="sc-text absolute left-[6vw] right-[6vw] top-[80px] z-10 md:right-auto md:top-1/2 md:w-[32vw] md:-translate-y-1/2">
          <p className="sc-fade text-[10px] uppercase tracking-[.3em] text-cream/60 md:text-xs">03 — The Detail</p>
          <h2 id="sc-h" className="mt-2 font-display text-[9.5vw] leading-[.95] md:mt-4 md:text-[5.2vw]">
            {["Lace.", "Fringe.", "Cutwork."].map((l, i) => <span key={l} className="block overflow-hidden pb-1"><span className={`sc-line block ${i === 1 ? "italic text-rose" : ""}`}>{l}</span></span>)}</h2>
          <p className="sc-fade mt-4 hidden max-w-xs text-cream/75 md:block">Three details, taken from three pieces in the collection.</p>
        </div>

        {/* featured photograph (2:3, never cropped or stretched) */}
        <div className={`sc-f ${frame} z-[2] h-[44svh] aspect-[2/3] translate-y-[3svh] rounded-[28px] md:h-[68svh] md:translate-x-[6vw] md:translate-y-0`} style={{ background: F.tone, transformStyle: "preserve-3d" }}>
          <Link href={`/product/${F.slug}`} aria-label={F.name} className="block h-full w-full"><div className="sc-f-img h-full w-full"><ProductImage p={F} className="h-full w-full object-cover" /></div></Link></div>

        <Link href={`/product/${A.slug}`} aria-label={A.name} className={`sc-a ${frame} z-[3] h-[19svh] aspect-[2/3] translate-x-[30vw] translate-y-[-14svh] rounded-2xl shadow-2xl md:h-[30svh] md:translate-y-[-17svh]`} style={{ background: A.tone }}>
          <ProductImage p={A} className="h-full w-full object-cover" /></Link>
        <Link href={`/product/${B.slug}`} aria-label={B.name} className={`sc-b ${frame} z-[4] h-[17svh] aspect-[2/3] translate-x-[-30vw] translate-y-[16svh] rounded-2xl shadow-2xl md:h-[25svh] md:translate-x-[24vw] md:translate-y-[24svh]`} style={{ background: B.tone }}>
          <ProductImage p={B} className="h-full w-full object-cover" /></Link>

        <div className="sc-fade absolute inset-x-[6vw] bottom-[8svh] z-10 flex items-end justify-between gap-4 md:bottom-[10svh] md:left-[6vw] md:right-auto md:w-[32vw] md:flex-col md:items-start md:justify-end">
          <div className="min-w-0"><p className="font-display text-base leading-tight md:text-2xl">{short(F)}</p><p className="mt-1 text-cream/75">{rs(F.price)}</p></div>
          <div className="flex shrink-0 gap-2"><AddButton slug={F.slug} className="!bg-cream px-5 py-3 !text-ink hover:!bg-rose hover:!text-white" />
            <Link href={`/product/${F.slug}`} className="rounded-full border border-cream/50 px-5 py-3 text-sm font-medium transition hover:bg-cream hover:text-ink">View</Link></div></div>

        <div aria-hidden className="absolute inset-x-[6vw] bottom-[4svh] z-10 h-px bg-cream/20"><div className="sc-bar h-full origin-left scale-x-100 bg-rose" /></div>
      </section>
    </div>);
}
