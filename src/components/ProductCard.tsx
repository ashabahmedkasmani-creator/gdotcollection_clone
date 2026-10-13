"use client";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";
import WishButton from "./WishButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product, sizes = "(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw", priority = false, onQuickView }: { product: Product; sizes?: string; priority?: boolean; onQuickView?: (p: Product) => void }) {
  const second = product.images[1];
  return (
    <article className="pc group">
      <div className="relative aspect-[2/3] overflow-hidden bg-stone-100">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 block" aria-label={product.name}>
          {product.image && <Image src={product.image} alt={product.name} fill sizes={sizes} priority={priority} className="pc-main object-cover" />}
          {second && <Image src={second} alt="" fill sizes={sizes} className="pc-second object-cover" />}
        </Link>
        {product.onSale && <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-ink">Sale</span>}
        <WishButton product={product} className="absolute right-3 top-3" />
        <div className="pc-actions absolute inset-x-3 bottom-3 flex gap-2">
          <div className="flex-1"><AddToCart product={product} className="pill pill-dark w-full !py-2.5 text-[13px]" /></div>
          {onQuickView && <button type="button" onClick={() => onQuickView(product)} className="pill bg-white text-ink !px-4 !py-2.5 text-[13px] hover:bg-ink hover:text-white">Quick view</button>}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug"><Link href={`/product/${product.slug}`} className="hover:text-brand">{product.name}</Link></h3>
        <p className="shrink-0 text-[15px]">
          {product.onSale && <s className="mr-2 text-stone-500">{formatPrice(product.regularPrice)}</s>}
          {formatPrice(product.price)}
        </p>
      </div>
      {product.categories[0] && <p className="mt-1 text-sm text-stone-500">{product.categories[0].name}</p>}
    </article>
  );
}
