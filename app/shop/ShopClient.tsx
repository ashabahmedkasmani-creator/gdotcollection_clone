"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useCart } from "@/lib/cart";
export default function ShopClient({ initialCat, title }: { initialCat?: string; title?: string }) {
  const sp = useSearchParams(); const { wish } = useCart();
  const [cat, setCat] = useState(initialCat ?? sp.get("cat") ?? "all"); const [q, setQ] = useState(""); const [sort, setSort] = useState("default"); const [n, setN] = useState(8);
  const wishOnly = sp.get("wish") === "1";
  const list = useMemo(() => { let l = products.filter((p) => (cat === "all" || p.categories.includes(cat)) && p.name.toLowerCase().includes(q.toLowerCase()) && (!wishOnly || wish.includes(p.slug)));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price); if (sort === "high") l = [...l].sort((a, b) => b.price - a.price); if (sort === "az") l = [...l].sort((a, b) => a.name.localeCompare(b.name)); return l; }, [cat, q, sort, wishOnly, wish]);
  return (<div className="mx-auto max-w-7xl px-5 pb-10 pt-10"><h1 className="font-display text-5xl">{wishOnly ? "Wishlist" : title ?? "Shop"}</h1>
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {[{ slug: "all", label: "All" }, ...categories].map((c) => <button key={c.slug} onClick={() => { setCat(c.slug); setN(8); }} aria-pressed={cat === c.slug} className={`rounded-full border px-4 py-1.5 text-sm ${cat === c.slug ? "bg-ink text-cream" : ""}`}>{c.label}</button>)}
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" className="ml-auto rounded-full border bg-transparent px-4 py-1.5 text-sm" />
      <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" className="rounded-full border bg-transparent px-3 py-1.5 text-sm"><option value="default">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name A–Z</option></select></div>
    {list.length === 0 ? <p className="py-24 text-center text-ink/60">{wishOnly ? "Your wishlist is empty." : "No products match your filters."}</p> :
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">{list.slice(0, n).map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}</div>}
    {list.length > n && <button onClick={() => setN(n + 8)} className="mx-auto mt-12 block rounded-full border px-8 py-3">Load more</button>}</div>);
}
