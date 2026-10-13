"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { formatPrice } from "@/lib/format";

export default function Wishlist() {
  const { wishlist, toggleWish, add } = useStore();
  return (
    <div className="container-x page-enter min-h-[70svh] pt-36 sm:pt-40">
      <h1 className="h-display text-[clamp(2.6rem,6vw,5rem)]">Wishlist</h1>
      <p className="mt-3 text-stone-700">Saved on this device. Sign in on the store to keep a wishlist across devices.</p>
      {wishlist.length === 0 ? (
        <div className="grid place-items-center gap-4 py-24 text-center"><p>Nothing saved yet. Tap the heart on any piece you love.</p><Link href="/shop" className="pill pill-dark">Browse the shop</Link></div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {wishlist.map((w) => (
            <li key={w.id}>
              <Link href={`/product/${w.slug}`} className="relative block aspect-[2/3] overflow-hidden bg-stone-100">{w.image && <Image src={w.image} alt={w.name} fill sizes="25vw" className="object-cover" />}</Link>
              <p className="mt-3 line-clamp-2 text-[15px] font-semibold">{w.name}</p>
              <p className="text-stone-500">{formatPrice(w.price)}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => add(w)} className="pill pill-dark !px-4 !py-2 text-[13px]">Add to bag</button>
                <button onClick={() => toggleWish(w)} className="pill pill-line !px-4 !py-2 text-[13px]">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
