import ProductImage from "@/components/ProductImage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AddToCart from "./AddToCart";
import { rs, STORE } from "@/lib/config";
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const p = getProduct(params.slug); return p ? { title: p.name, openGraph: { images: [p.image] } } : {}; }
export default function Page({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug); if (!p) notFound();
  return (<div className="mx-auto max-w-7xl px-5 pt-10"><div className="grid gap-10 md:grid-cols-2">
    <div className="overflow-hidden rounded-3xl" style={{ background: p.tone }}><ProductImage p={p} eager className="aspect-[2/3] w-full object-cover" /></div>
    <div className="md:pt-8"><p className="text-sm uppercase tracking-widest text-ink/60">{p.categories.join(" · ")}</p><h1 className="mt-2 font-display text-3xl md:text-5xl">{p.name}</h1><p className="mt-4 text-2xl">{rs(p.price)}</p>
      <AddToCart slug={p.slug} />
      <p className="mt-8 text-sm text-ink/70">Free shipping on orders of {rs(STORE.freeShippingOver)}+. Payment: {STORE.payments.join(" / ")}. Size and colour options are not published on the store, so none are shown.</p></div></div>
    <h2 className="mb-6 mt-24 font-display text-3xl">You may also like</h2>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.filter((x) => x.slug !== p.slug).slice(0, 4).map((x, i) => <ProductCard key={x.slug} p={x} i={i} />)}</div></div>);
}
