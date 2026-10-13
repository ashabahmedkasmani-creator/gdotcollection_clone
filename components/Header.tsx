"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import { Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import { rs, STORE } from "@/lib/config";
const nav = [["Shop", "/shop"], ["Stitched", "/category/stitched"], ["Unstitched", "/category/unstitched"], ["Accessories", "/category/accessories"], ["Contact", "/contact"]];
export default function Header() {
  const c = useCart(); const path = usePathname(); const [solid, setSolid] = useState(false); const [menu, setMenu] = useState(false);
  useEffect(() => { const f = () => setSolid(scrollY > 24); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && (c.setOpen(false), setMenu(false)); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [c]);
  return (<>
    <div className="sticky top-0 z-40 h-[68px]">{/* fixed-height slot: the visible bar morphs inside it, so nothing below ever shifts */}
      <header
        className={`absolute inset-x-0 mx-auto border duration-[600ms] motion-reduce:duration-0 transition-[width,top,height,border-radius,background-color,border-color,box-shadow,backdrop-filter] ease-[cubic-bezier(.22,1,.36,1)] ${solid
          ? "top-2 h-14 w-[min(1120px,calc(100%-24px))] rounded-2xl border-ink/15 bg-white/75 shadow-[0_12px_32px_-18px_rgba(23,18,15,.4)] backdrop-blur-[14px] backdrop-saturate-150"
          : "top-0 h-[68px] w-full rounded-none border-transparent border-b-ink/10 bg-white"}`}>
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-5">
          <Logo />
          <nav aria-label="Main" className="hidden gap-8 text-sm font-medium md:flex">{nav.map(([l, h]) => { const on = path === h || (h !== "/shop" && path.startsWith(h)); return (
            <Link key={l} href={h} aria-current={on ? "page" : undefined} className="group relative py-1 transition-colors hover:text-rose">{l}
              <span aria-hidden className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-rose transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} /></Link>); })}</nav>
          <div className="flex items-center gap-4">
            <Link href="/shop" aria-label="Search products"><Search size={20} /></Link>
            <Link href="/shop?wish=1" aria-label={`Wishlist, ${c.wish.length} saved`} className="relative"><Heart size={20} />{c.wish.length > 0 && <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-rose text-[10px] text-white">{c.wish.length}</span>}</Link>
            <button aria-label={`Open cart, ${c.count} items`} onClick={() => c.setOpen(true)} className="relative"><ShoppingBag size={20} /><motion.span key={c.count} initial={{ scale: 1.7 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 14 }} className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-ink text-[10px] text-white">{c.count}</motion.span></button>
            <button aria-label="Menu" className="md:hidden" onClick={() => setMenu(true)}><Menu size={22} /></button>
          </div></div></header></div>
    <AnimatePresence>
      {menu && <motion.div initial={{ clipPath: "circle(0% at 95% 4%)" }} animate={{ clipPath: "circle(150% at 95% 4%)" }} exit={{ clipPath: "circle(0% at 95% 4%)" }} transition={{ duration: .6, ease: [.76, 0, .24, 1] }} className="fixed inset-0 z-50 bg-ink p-8 text-cream md:hidden" role="dialog" aria-label="Menu">
        <button aria-label="Close menu" onClick={() => setMenu(false)} className="absolute right-5 top-5"><X /></button>
        <div className="mt-20 flex flex-col gap-6 font-display text-4xl">{nav.map(([l, h]) => <Link key={l} href={h} onClick={() => setMenu(false)}>{l}</Link>)}</div></motion.div>}
      {c.open && <>
        <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-ink/50" onClick={() => c.setOpen(false)} />
        <motion.aside key="d" role="dialog" aria-label="Cart" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .5, ease: [.76, 0, .24, 1] }} className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-cream p-6">
          <div className="flex justify-between"><h2 className="font-display text-2xl">Your bag ({c.count})</h2><button aria-label="Close cart" onClick={() => c.setOpen(false)}><X /></button></div>
          <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
            {c.lines.length === 0 && <p className="text-ink/60">Your bag is empty. <Link href="/shop" onClick={() => c.setOpen(false)} className="underline">Browse the collection</Link></p>}
            {c.lines.map((l) => { const p = products.find((x) => x.slug === l.slug)!; return (
              <div key={l.slug} className="flex gap-3"><ProductImage p={p} className="h-24 w-16 rounded object-cover" />
                <div className="flex-1 text-sm"><p className="font-medium leading-snug">{p.name}</p><p>{rs(p.price * l.qty)}</p>
                  <div className="mt-2 flex items-center gap-2"><button aria-label="Decrease" onClick={() => c.setQty(l.slug, l.qty - 1)} className="rounded border p-1"><Minus size={14} /></button><span>{l.qty}</span><button aria-label="Increase" onClick={() => c.setQty(l.slug, l.qty + 1)} className="rounded border p-1"><Plus size={14} /></button>
                    <button onClick={() => c.remove(l.slug)} className="ml-auto text-xs underline">Remove</button></div></div></div>); })}
          </div>
          <div className="border-t pt-4 text-sm"><Row a="Subtotal" b={rs(c.subtotal)} /><Row a="Shipping" b={c.shipping ? rs(c.shipping) : c.subtotal ? "Free" : "-"} /><Row a="Total" b={rs(c.total)} bold />
            <p className="mt-1 text-xs text-ink/60">Free shipping over {rs(STORE.freeShippingOver)}</p>
            <Link href="/checkout" onClick={() => c.setOpen(false)} aria-disabled={!c.count} className={`mt-4 block rounded-full bg-ink py-3 text-center text-cream ${c.count ? "" : "pointer-events-none opacity-40"}`}>Checkout</Link></div>
        </motion.aside></>}
    </AnimatePresence></>);
}
const Row = ({ a, b, bold }: { a: string; b: string; bold?: boolean }) => <div className={`flex justify-between py-1 ${bold ? "text-base font-semibold" : ""}`}><span>{a}</span><span>{b}</span></div>;
