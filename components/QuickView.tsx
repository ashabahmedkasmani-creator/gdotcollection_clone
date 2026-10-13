"use client";
import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Product } from "@/types";
import ProductImage from "@/components/ProductImage";
import AddButton from "@/components/AddButton";
import { useCart } from "@/lib/cart";
import { rs } from "@/lib/config";
import { EASE, catLabel } from "@/lib/motion";
// Portalled to <body>: ancestors with perspective/transform would otherwise trap position:fixed.
export default function QuickView({ p, onClose }: { p: Product; onClose: () => void }) {
  const c = useCart(); const liked = c.wish.includes(p.slug);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); addEventListener("keydown", k); const o = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { removeEventListener("keydown", k); document.body.style.overflow = o; }; }, [onClose]);
  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-ink/60 p-4" onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={p.name} initial={{ y: 40, opacity: 0, clipPath: "inset(8% 8% 8% 8% round 24px)" }} animate={{ y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }} exit={{ y: 30, opacity: 0 }}
        transition={{ duration: .6, ease: EASE }} onClick={(e) => e.stopPropagation()} className="relative grid max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-cream md:grid-cols-2">
        <button autoFocus aria-label="Close quick view" onClick={onClose} className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow"><X size={16} /></button>
        <div style={{ background: p.tone }} className="aspect-[3/4] md:aspect-auto"><ProductImage p={p} className="h-full w-full object-cover" /></div>
        <div className="flex flex-col p-6 md:p-8"><p className="text-xs uppercase tracking-[.25em] text-ink/50">{catLabel(p.categories)}</p>
          <h3 className="mt-2 font-display text-2xl leading-snug">{p.name}</h3><p className="mt-3 text-xl">{rs(p.price)}</p>
          <div className="mt-auto space-y-3 pt-8"><AddButton slug={p.slug} className="w-full py-3" after={onClose} />
            <button onClick={() => c.toggleWish(p.slug)} className="w-full rounded-full border border-ink/20 py-3 text-sm">{liked ? "Remove from wishlist" : "Save to wishlist"}</button>
            <Link href={`/product/${p.slug}`} onClick={onClose} className="block text-center text-sm underline">Full details</Link></div></div>
      </motion.div></motion.div>, document.body);
}
