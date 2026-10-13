"use client";
import { HeartIcon } from "./Icons";
import { useStore } from "./StoreProvider";
import type { Product } from "@/lib/types";

export default function WishButton({ product, className = "" }: { product: Product; className?: string }) {
  const { inWish, toggleWish } = useStore();
  const on = inWish(product.id);
  return (
    <button type="button" onClick={() => toggleWish(product)} aria-pressed={on} aria-label={on ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} className={`grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-brand hover:text-brand-ink ${on ? "text-brand" : ""} ${className}`}>
      <HeartIcon filled={on} />
    </button>
  );
}
