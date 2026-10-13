"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCart from "./AddToCart";
import WishButton from "./WishButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductDetail({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const imgs = product.images.length ? product.images : product.image ? [product.image] : [];
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
          {imgs.length > 1 && (
            <ul className="order-2 flex gap-3 sm:order-1 sm:flex-col" aria-label="Product images">
              {imgs.map((src, i) => (
                <li key={src}>
                  <button type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-current={active === i} className={`relative block aspect-[2/3] w-16 overflow-hidden bg-stone-100 sm:w-20 ${active === i ? "ring-2 ring-brand" : "opacity-70 hover:opacity-100"}`}>
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="relative order-1 aspect-[2/3] w-full overflow-hidden bg-stone-100 sm:order-2">
            {imgs[active] ? <Image key={imgs[active]} src={imgs[active]} alt={product.name} fill priority sizes="(max-width:1024px) 100vw, 55vw" className="page-enter object-cover" /> : <p className="grid h-full place-items-center text-stone-500">Image unavailable</p>}
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
        <h1 className="h-display text-[clamp(1.9rem,3.6vw,3rem)]">{product.name}</h1>
        <p className="mt-4 text-2xl">
          {product.onSale && <s className="mr-3 text-lg text-stone-500">{formatPrice(product.regularPrice)}</s>}
          {formatPrice(product.price)}
        </p>
        {product.shortDescription && <p className="mt-6 leading-relaxed text-stone-700">{product.shortDescription}</p>}
        <div className="mt-8 flex items-center gap-3">
          {product.purchasable && product.inStock && (
            <div className="flex items-center rounded-full border border-black/25" role="group" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="h-12 w-11">−</button>
              <span className="w-8 text-center" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="h-12 w-11">+</button>
            </div>
          )}
          <AddToCart product={product} qty={qty} className="pill pill-brand h-12 flex-1" />
          <WishButton product={product} className="!h-12 !w-12 border border-black/20" />
        </div>
        {!product.purchasable && <p className="mt-3 text-sm text-stone-500">This item has options (such as size or colour) that are selected on the store’s own product page.</p>}
        <dl className="mt-10 divide-y divide-black/10 border-y border-black/10 text-sm">
          <div className="flex justify-between gap-4 py-3"><dt className="text-stone-500">Shipping</dt><dd>Free on orders above Rs. 10,000</dd></div>
          <div className="flex justify-between gap-4 py-3"><dt className="text-stone-500">Payment</dt><dd>Cash on Delivery, Bank Transfer</dd></div>
          {product.categories.length > 0 && (
            <div className="flex justify-between gap-4 py-3"><dt className="text-stone-500">Category</dt><dd>{product.categories.map((c, i) => (<span key={c.slug}>{i > 0 && ", "}<Link className="underline underline-offset-4 hover:text-brand" href={`/product-category/${c.slug}`}>{c.name}</Link></span>))}</dd></div>
          )}
        </dl>
        {product.description && <p className="mt-8 max-w-prose leading-relaxed text-stone-700">{product.description}</p>}
      </div>
    </div>
  );
}
