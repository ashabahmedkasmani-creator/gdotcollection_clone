"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
export default function AddToCart({ slug }: { slug: string }) {
  const c = useCart(); const [q, setQ] = useState(1);
  return (<div className="mt-8 flex items-center gap-4"><div className="flex items-center gap-3 rounded-full border px-3 py-2"><button aria-label="Decrease quantity" onClick={() => setQ(Math.max(1, q - 1))}><Minus size={16} /></button><span aria-live="polite" className="w-5 text-center">{q}</span><button aria-label="Increase quantity" onClick={() => setQ(q + 1)}><Plus size={16} /></button></div>
    <button onClick={() => { for (let i = 0; i < q; i++) c.add(slug); }} className="flex-1 rounded-full bg-ink py-3.5 text-cream transition hover:bg-plum">Add to cart</button>
    <button onClick={() => c.toggleWish(slug)} className="rounded-full border px-4 py-3.5 text-sm">{c.wish.includes(slug) ? "Saved" : "Save"}</button></div>);
}
