"use client";
import { useCallback, useState } from "react";
import ProductCard from "./ProductCard";
import QuickView from "./QuickView";
import type { Product } from "@/lib/types";

/** Grid with quick view. Used by the homepage showcase, shop and category pages. */
export default function ProductGrid({ products, className = "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6" }: { products: Product[]; className?: string }) {
  const [qv, setQv] = useState<Product | null>(null);
  const close = useCallback(() => setQv(null), []);
  return (
    <>
      <div className={className}>
        {products.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} onQuickView={setQv} />)}
      </div>
      <QuickView product={qv} onClose={close} />
    </>
  );
}
