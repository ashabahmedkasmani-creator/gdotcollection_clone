"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fullRes } from "@/lib/motion";
import type { Product } from "@/types";

type P = Pick<Product, "slug" | "name" | "image" | "tone">;
/**
 * Never-broken product image. Tries, in order:
 *   1. /cutouts/<slug>.png (only when `cutout`)  2. the listing photo  3. the full-resolution upload
 * and finally renders a tone-coloured plate with the product name, so there is never a broken icon or empty frame.
 * The mount check catches images that failed BEFORE React hydrated (their onError never fires on the client).
 */
export default function ProductImage({ p, cutout, eager, className = "", cutoutClassName, photoClassName, style, draggable = false }: {
  p: P; cutout?: boolean; eager?: boolean; className?: string; cutoutClassName?: string; photoClassName?: string; style?: React.CSSProperties; draggable?: boolean;
}) {
  const srcs = useMemo(() => Array.from(new Set([cutout ? `/cutouts/${p.slug}.png` : "", p.image, fullRes(p.image)].filter(Boolean))), [cutout, p.slug, p.image]);
  const [idx, setIdx] = useState(0); const ref = useRef<HTMLImageElement>(null);
  const next = useCallback(() => setIdx((i) => i + 1), []);
  useEffect(() => { const el = ref.current; if (el && el.complete && el.naturalWidth === 0) next(); }, [idx, next]);
  if (idx >= srcs.length) return (
    <div role="img" aria-label={p.name} style={{ background: `linear-gradient(160deg, ${p.tone}, ${p.tone}cc)`, ...style }} className={`${className} ${photoClassName ?? ""} grid place-items-center overflow-hidden p-4 text-center`}>
      <span className="font-display text-lg leading-snug text-white/90 mix-blend-difference">{p.name.split(" with ")[0]}</span></div>);
  const isCut = cutout && idx === 0 && srcs[0].startsWith("/cutouts/");
  return <img ref={ref} src={srcs[idx]} alt={p.name} onError={next} draggable={draggable} referrerPolicy="no-referrer" decoding="async" loading={eager ? "eager" : "lazy"}
    fetchPriority={eager ? "high" : undefined} style={style} className={`${className} ${isCut ? cutoutClassName ?? "" : photoClassName ?? ""}`} />;
}
