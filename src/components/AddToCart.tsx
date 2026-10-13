"use client";
import { useStore } from "./StoreProvider";
import type { Product } from "@/lib/types";

export default function AddToCart({ product, qty = 1, className = "pill pill-dark" }: { product: Product; qty?: number; className?: string }) {
  const { add } = useStore();
  if (!product.inStock) return <span className={`${className} cursor-not-allowed opacity-50`} aria-disabled="true">Out of stock</span>;
  if (!product.purchasable) {
    return (
      <a href={product.permalink} className={className}>Choose options on store</a>
    );
  }
  return (
    <button type="button" onClick={() => add(product, qty)} className={className}>Add to bag</button>
  );
}
