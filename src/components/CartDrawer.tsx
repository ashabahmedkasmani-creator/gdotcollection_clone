"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useStore } from "./StoreProvider";
import { CloseIcon } from "./Icons";
import { formatPrice } from "@/lib/format";
import { BRAND } from "@/lib/config";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, setQty, remove } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    if (cartOpen) closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [cartOpen, setCartOpen]);

  const remaining = Math.max(0, 10000 - subtotal);
  return (
    <div className={`fixed inset-0 z-[70] ${cartOpen ? "" : "pointer-events-none"}`} inert={!cartOpen} aria-hidden={!cartOpen}>
      <div onClick={() => setCartOpen(false)} className={`scrim absolute inset-0 bg-black/50 ${cartOpen ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-modal="true" aria-label="Shopping cart" className={`drawer absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="h-display text-2xl">Your bag</h2>
          <button ref={closeRef} onClick={() => setCartOpen(false)} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full hover:bg-stone-100"><CloseIcon /></button>
        </div>
        {lines.length === 0 ? (
          <div className="grid flex-1 place-content-center gap-4 px-6 text-center">
            <p className="text-stone-500">Your bag is empty.</p>
            <Link href="/shop" onClick={() => setCartOpen(false)} className="pill pill-dark">Browse the collection</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-black/10 overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 py-5">
                  <Link href={`/product/${l.slug}`} onClick={() => setCartOpen(false)} className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden bg-stone-100">
                    {l.image && <Image src={l.image} alt={l.name} fill sizes="80px" className="object-cover" />}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/product/${l.slug}`} onClick={() => setCartOpen(false)} className="line-clamp-2 text-sm font-semibold">{l.name}</Link>
                    <p className="mt-1 text-sm text-stone-500">{formatPrice(l.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-black/20">
                        <button onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Decrease quantity of ${l.name}`} className="h-8 w-8">−</button>
                        <span className="w-6 text-center text-sm" aria-live="polite">{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Increase quantity of ${l.name}`} className="h-8 w-8">+</button>
                      </div>
                      <button onClick={() => remove(l.id)} className="text-xs text-stone-500 underline underline-offset-4 hover:text-ink">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/10 px-6 py-5">
              <p className="mb-3 text-sm text-stone-500">
                {remaining > 0 ? `Add ${formatPrice(remaining)} more for free shipping.` : "You qualify for free shipping."}
              </p>
              <div className="mb-4 flex justify-between text-lg font-semibold"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <Link href="/checkout" onClick={() => setCartOpen(false)} className="pill pill-brand w-full">Continue to checkout</Link>
              <p className="mt-3 text-center text-xs text-stone-500">Payment: {BRAND.payments}.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
