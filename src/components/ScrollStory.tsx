"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import type { Product } from "@/lib/types";

/** One scroll-driven scene: three real products drift at different speeds; the centre frame unmasks as it enters. Not pinned. */
export default function ScrollStory({ products }: { products: Product[] }) {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);
  const [a, b, c] = products;
  if (!a || !b || !c) return null;
  const Frame = ({ p, cls, speed, clip = false }: { p: Product; cls: string; speed: number; clip?: boolean }) => (
    <Link href={`/product/${p.slug}`} className={`story-layer absolute block ${cls}`} style={{ "--s": speed } as React.CSSProperties} aria-label={p.name}>
      <div className={`relative h-full w-full overflow-hidden bg-stone-700 ${clip ? "story-clip" : ""}`}>
        <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 45vw, 28vw" className="object-cover" />
      </div>
    </Link>
  );
  return (
    <section ref={ref} className="on-dark relative overflow-hidden bg-ink py-24 text-white lg:py-36" aria-labelledby="story-title">
      <div className="container-x relative">
        <h2 id="story-title" className="h-display relative z-10 max-w-3xl text-[clamp(2.4rem,6vw,5.4rem)]">Details worth a closer look.</h2>
        <p className="relative z-10 mt-5 max-w-sm text-white/70">From chikankari to scalloped cutwork, the finishing touches set each piece apart.</p>
        <div className="relative mt-10 h-[70vw] max-h-[760px] min-h-[420px] w-full">
          <Frame p={a} cls="left-0 top-[8%] h-[62%] w-[34%]" speed={140} />
          <Frame p={b} cls="left-[30%] top-0 z-10 h-[88%] w-[38%] sm:left-[33%]" speed={60} clip />
          <Frame p={c} cls="right-0 top-[22%] h-[60%] w-[30%]" speed={-110} />
        </div>
      </div>
    </section>
  );
}
