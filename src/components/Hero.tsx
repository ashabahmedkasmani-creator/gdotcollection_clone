"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

export interface HeroImage { src: string; alt: string; slug: string }

const SENTENCE = "Discover thoughtfully styled stitched and unstitched looks for every occasion.";

/**
 * Cinematic hero. No licensed fashion footage was available, so the "scrub" interaction drives a
 * filmstrip of real product photography: horizontal pointer movement (or a horizontal finger drag)
 * scrubs the strip with eased, per-card depth. Vertical scrolling is never blocked (touch-action: pan-y).
 */
export default function Hero({ images }: { images: HeroImage[] }) {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const typed = useTypewriter(SENTENCE);

  useEffect(() => {
    const el = root.current;
    const st = strip.current;
    if (!el || !st) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let target = 0, cur = 0, raf = 0, range = 0;
    const measure = () => { range = Math.max(0, st.scrollWidth - el.clientWidth * 0.55); };
    const tick = () => {
      cur += (target - cur) * 0.08;
      el.style.setProperty("--hx", cur.toFixed(2));
      raf = Math.abs(target - cur) > 0.2 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      const p = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
      target = -p * range;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    measure();
    window.addEventListener("resize", measure);
    el.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      el.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const bg = images[Math.min(2, images.length - 1)];
  const hidden = typed === null ? "" : SENTENCE.slice(typed);
  const shown = typed === null ? SENTENCE : SENTENCE.slice(0, typed);

  return (
    <section ref={root} className="on-dark relative min-h-[100svh] overflow-hidden bg-ink text-white" style={{ touchAction: "pan-y" }} aria-label="Introduction">
      {bg && <Image src={bg.src} alt="" fill priority sizes="100vw" className="scale-125 object-cover opacity-35 blur-2xl" aria-hidden />}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

      {/* filmstrip: starts right of centre on desktop, top on mobile */}
      <div className="absolute inset-x-0 top-24 sm:top-28 lg:left-[38%] lg:top-1/2 lg:-translate-y-[46%]">
        <div ref={strip} className="hero-strip flex w-max gap-4 px-5 sm:gap-6 lg:px-0">
          {images.map((img, i) => (
            <Link key={img.slug} href={`/product/${img.slug}`} className="hero-card relative block aspect-[2/3] h-[44svh] shrink-0 overflow-hidden bg-stone-700 sm:h-[50svh] lg:h-[64svh]" style={{ "--k": (0.06 + (i % 3) * 0.05).toFixed(2), marginTop: i % 2 ? "2.5rem" : 0 } as React.CSSProperties} aria-label={img.alt}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width:1024px) 30vw, 24vw" priority={i < 3} className="object-cover" />
            </Link>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-12 pt-[60svh] sm:pb-16 lg:pt-32">
        <div className="container-x">
          <p className="page-enter text-xs font-semibold tracking-[0.22em]" style={{ animationDelay: "150ms" }}>G. COLLECTION — THE NEW EDIT</p>
          <h1 className="h-display page-enter mt-4 max-w-3xl text-[clamp(2.6rem,7.4vw,6.4rem)]" style={{ animationDelay: "300ms" }}>
            Tradition, Tailored for Today.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg" aria-label={SENTENCE}>
            <span className={typed === null ? "" : "tw-caret"} aria-hidden>{shown}</span>
            <span className="invisible" aria-hidden>{hidden}</span>
          </p>
          <div className="page-enter mt-8 flex flex-wrap gap-3" style={{ animationDelay: "600ms" }}>
            <Link href="/shop" className="pill pill-brand">Explore Collection</Link>
            <Link href="/#best-sellers" className="pill pill-ghost">Shop Best Sellers</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
