"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import type { Product } from "@/types";
import ProductImage from "@/components/ProductImage";
import QuickView from "@/components/QuickView";
import AddButton from "@/components/AddButton";
import { useTilt } from "@/components/useTilt";
import { useCart } from "@/lib/cart";
import { rs } from "@/lib/config";
import { EASE, WIPE, catLabel } from "@/lib/motion";

export type Variant = "grid" | "feature" | "tall" | "rail";
const ratio: Record<Variant, string> = { grid: "aspect-[2/3]", feature: "aspect-[4/5]", tall: "aspect-[3/4.4]", rail: "aspect-[3/4]" };

/**
 * One card, four proportions. Desktop: pointer tilt, and on hover a clip-path wipe swaps the photo for a magnified detail crop
 * of the same garment (embroidery / hem). Touch: no hover needed, Add + Quick view + Save are always visible.
 */
export default function ProductCard({ p, i = 0, variant = "grid", className = "" }: { p: Product; i?: number; variant?: Variant; className?: string }) {
  const c = useCart(); const liked = c.wish.includes(p.slug); const [qv, setQv] = useState(false); const [hover, setHover] = useState(false);
  const { rx, ry, handlers } = useTilt(variant === "feature" ? 5 : 7); const big = variant === "feature";
  return (
    <motion.article initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .9, delay: (i % 4) * .08, ease: EASE }} style={{ perspective: 900 }} className={`group ${className}`}>
      <motion.div {...handlers} onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)} onPointerLeave={() => setHover(false)} style={{ background: p.tone, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`relative overflow-hidden ${variant === "tall" ? "rounded-t-[999px] rounded-b-2xl" : "rounded-2xl"} ${ratio[variant]}`}>
        <Link href={`/product/${p.slug}`} aria-label={p.name} className="absolute inset-0">
          <ProductImage p={p} className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]" />
          {/* detail crop: same real photograph, magnified on the embroidered hem, wiped in from below */}
          <motion.div aria-hidden initial={false} animate={{ clipPath: hover ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }} transition={{ duration: .7, ease: WIPE }} className="absolute inset-0 hidden md:block">
            <ProductImage p={p} className="h-full w-full scale-[1.9] object-cover" style={{ objectPosition: "50% 88%" }} /></motion.div>
        </Link>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.2em] text-ink backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">{catLabel(p.categories)}</span>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button aria-label={liked ? "Remove from wishlist" : "Add to wishlist"} onClick={() => c.toggleWish(p.slug)} className="grid h-9 w-9 place-items-center rounded-full bg-white/90 transition hover:scale-110">
            <motion.span key={String(liked)} initial={{ scale: .5 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}><Heart size={16} className={liked ? "fill-rose text-rose" : ""} /></motion.span></button>
          <button aria-label={`Quick view ${p.name}`} onClick={() => setQv(true)} className="grid h-9 w-9 place-items-center rounded-full bg-white/90 transition hover:scale-110 md:translate-x-12 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:focus:translate-x-0 md:focus:opacity-100"><Eye size={16} /></button></div>
        <div className="absolute inset-x-3 bottom-3 translate-y-0 transition duration-500 md:translate-y-[140%] md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
          <AddButton slug={p.slug} className="w-full py-2.5" /></div>
      </motion.div>
      <div className={`mt-3 flex items-start justify-between gap-3 ${big ? "md:mt-4" : ""}`}>
        <h3 className={`line-clamp-2 font-medium ${big ? "font-display text-xl md:text-2xl" : "text-sm"}`}><Link href={`/product/${p.slug}`} className="hover:text-rose">{p.name}</Link></h3>
        <p className={`shrink-0 ${big ? "text-lg" : "text-sm"} text-ink/70`}>{rs(p.price)}</p></div>
      <AnimatePresence>{qv && <QuickView p={p} onClose={() => setQv(false)} />}</AnimatePresence>
    </motion.article>);
}
