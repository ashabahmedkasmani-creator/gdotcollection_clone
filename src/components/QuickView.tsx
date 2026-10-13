"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import AddToCart from "./AddToCart";
import { CloseIcon } from "./Icons";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [product, onClose]);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-[75] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="page-enter relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white md:grid-cols-2">
        <div className="relative aspect-[2/3] bg-stone-100">{product.image && <Image src={product.image} alt={product.name} fill sizes="(max-width:768px) 90vw, 450px" className="object-cover" />}</div>
        <div className="flex flex-col p-6 sm:p-10">
          <button ref={closeRef} onClick={onClose} aria-label="Close quick view" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90"><CloseIcon /></button>
          <h2 className="h-display text-3xl">{product.name}</h2>
          <p className="mt-3 text-xl">{formatPrice(product.price)}</p>
          {product.shortDescription && <p className="mt-4 text-sm leading-relaxed text-stone-700">{product.shortDescription}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <AddToCart product={product} className="pill pill-brand" />
            <Link href={`/product/${product.slug}`} onClick={onClose} className="pill pill-line">Full details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
