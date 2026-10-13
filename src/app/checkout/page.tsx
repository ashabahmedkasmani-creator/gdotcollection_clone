"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { formatPrice } from "@/lib/format";
import { BRAND, WOO_URL, WP } from "@/lib/config";

/**
 * INTEGRATION BOUNDARY. Orders, payments and customer sessions live in WooCommerce on the existing store.
 * This page does NOT take orders. It hands each bag item to the store through its standard
 * "?add-to-cart=ID" links, then to the store's real checkout (Cash on Delivery / Bank Transfer).
 * A one-click bag sync needs a bridge on the WordPress side (see README, "Checkout").
 */
export default function Checkout() {
  const { lines, subtotal, setQty, remove } = useStore();
  return (
    <div className="container-x page-enter min-h-[70svh] pt-36 sm:pt-40">
      <h1 className="h-display text-[clamp(2.6rem,6vw,5rem)]">Checkout</h1>
      {lines.length === 0 ? (
        <div className="grid place-items-center gap-4 py-24 text-center"><p>Your bag is empty.</p><Link href="/shop" className="pill pill-dark">Browse the shop</Link></div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <ul className="divide-y divide-black/10 border-y border-black/10 lg:col-span-7">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-4 py-5">
                <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden bg-stone-100">{l.image && <Image src={l.image} alt={l.name} fill sizes="80px" className="object-cover" />}</div>
                <div className="flex flex-1 flex-col gap-2">
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-sm text-stone-500">{formatPrice(l.price)} × {l.qty}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center rounded-full border border-black/20">
                      <button onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Decrease ${l.name}`} className="h-8 w-8">−</button>
                      <span className="w-6 text-center">{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Increase ${l.name}`} className="h-8 w-8">+</button>
                    </span>
                    <a className="underline underline-offset-4 hover:text-brand" href={`${WOO_URL}/?add-to-cart=${l.id}&quantity=${l.qty}`}>Add to store bag</a>
                    <button onClick={() => remove(l.id)} className="text-stone-500 underline underline-offset-4 hover:text-ink">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="lg:col-span-5">
            <div className="bg-stone-50 p-6 sm:p-8">
              <div className="flex justify-between text-lg font-semibold"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <p className="mt-2 text-sm text-stone-500">{subtotal >= 10000 ? "Free shipping applies." : `Free shipping on orders above Rs. 10,000.`} Payment: {BRAND.payments}.</p>
              <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-stone-700">
                <li>Use “Add to store bag” for each item. Each opens the store with that item added.</li>
                <li>Finish on the store’s secure checkout, where your order is placed and recorded.</li>
              </ol>
              <a href={WP.checkout} className="pill pill-brand mt-6 w-full">Go to store checkout</a>
              <p className="mt-4 text-xs text-stone-500">Orders are placed on gdotcollection.com. This site does not collect payment or store addresses.</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
