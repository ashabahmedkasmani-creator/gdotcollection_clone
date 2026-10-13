"use client";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import { rs, STORE } from "@/lib/config";
export default function CartPage() {
  const c = useCart();
  if (!c.lines.length) return <div className="grid min-h-[70vh] place-items-center px-5 text-center"><div><h1 className="font-display text-5xl">Your bag is empty</h1><p className="mt-3 text-ink/60">Nothing here yet. Start with the collection.</p><Link href="/shop" className="mt-6 inline-block rounded-full bg-ink px-7 py-3 text-cream">Shop all</Link></div></div>;
  return (<div className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 md:grid-cols-[1fr_320px]"><div><h1 className="font-display text-5xl">Your bag</h1>
    <ul className="mt-8 divide-y">{c.lines.map((l) => { const p = products.find((x) => x.slug === l.slug)!; return (<li key={l.slug} className="flex gap-4 py-5"><Link href={`/product/${p.slug}`}><ProductImage p={p} className="h-36 w-24 rounded-lg object-cover" /></Link>
      <div className="flex-1"><p className="font-medium">{p.name}</p><p className="text-sm text-ink/60">{rs(p.price)} each</p>
        <div className="mt-3 flex items-center gap-3"><button aria-label="Decrease" onClick={() => c.setQty(l.slug, l.qty - 1)} className="rounded border p-1.5"><Minus size={14} /></button><span>{l.qty}</span><button aria-label="Increase" onClick={() => c.setQty(l.slug, l.qty + 1)} className="rounded border p-1.5"><Plus size={14} /></button><button onClick={() => c.remove(l.slug)} className="ml-4 text-sm underline">Remove</button></div></div><p className="font-medium">{rs(p.price * l.qty)}</p></li>); })}</ul></div>
    <aside className="h-fit rounded-2xl bg-white p-5 text-sm"><div className="flex justify-between py-1"><span>Subtotal</span><span>{rs(c.subtotal)}</span></div><div className="flex justify-between py-1"><span>Shipping</span><span>{c.shipping ? rs(c.shipping) : "Free"}</span></div>
      <div className="mt-2 flex justify-between border-t pt-3 text-base font-semibold"><span>Total</span><span>{rs(c.total)}</span></div><p className="mt-2 text-xs text-ink/60">Free shipping over {rs(STORE.freeShippingOver)}</p>
      <Link href="/checkout" className="mt-4 block rounded-full bg-ink py-3 text-center text-cream">Checkout</Link></aside></div>);
}
