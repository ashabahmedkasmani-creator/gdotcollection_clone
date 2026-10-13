import Link from "next/link";
import ProductGrid from "./ProductGrid";
import type { Category, Product } from "@/lib/types";

const SORTS = [
  { key: "date", label: "Newest", orderby: "date", order: "desc" },
  { key: "price-asc", label: "Price: low to high", orderby: "price", order: "asc" },
  { key: "price-desc", label: "Price: high to low", orderby: "price", order: "desc" },
  { key: "title", label: "Name A–Z", orderby: "title", order: "asc" },
] as const;
export type SortKey = (typeof SORTS)[number]["key"];
export const sortFor = (k?: string) => SORTS.find((s) => s.key === k) ?? SORTS[0];

export default function ShopView({ title, intro, base, categories, activeCat, items, page, totalPages, total, sort, q }: {
  title: string; intro?: string; base: string; categories: Category[]; activeCat?: string;
  items: Product[]; page: number; totalPages: number; total: number; sort: SortKey; q?: string;
}) {
  const href = (o: { sort?: string; page?: number }) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    const s = o.sort ?? sort;
    if (s !== "date") p.set("sort", s);
    if ((o.page ?? 1) > 1) p.set("page", String(o.page));
    const qs = p.toString();
    return qs ? `${base}?${qs}` : base;
  };
  return (
    <div className="container-x page-enter pb-8 pt-36 sm:pt-40">
      <h1 className="h-display text-[clamp(2.6rem,6vw,5rem)]">{title}</h1>
      {intro && <p className="mt-3 max-w-xl text-stone-700">{intro}</p>}
      {q && <p className="mt-3 text-stone-700">Results for “{q}” · <Link href={base} className="underline underline-offset-4">clear</Link></p>}

      <div className="mt-10 flex flex-col gap-4 border-y border-black/15 py-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Categories" className="flex flex-wrap gap-2">
          <Link href="/shop" aria-current={!activeCat ? "page" : undefined} className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${!activeCat ? "border-ink bg-ink text-white" : "border-black/20 hover:border-ink"}`}>All</Link>
          {categories.map((c) => (
            <Link key={c.id} href={`/product-category/${c.slug}`} aria-current={activeCat === c.slug ? "page" : undefined} className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${activeCat === c.slug ? "border-ink bg-ink text-white" : "border-black/20 hover:border-ink"}`}>{c.name} <span className="opacity-60">{c.count}</span></Link>
          ))}
        </nav>
        <nav aria-label="Sort" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="text-stone-500">Sort</span>
          {SORTS.map((s) => (
            <Link key={s.key} href={href({ sort: s.key })} aria-current={sort === s.key ? "true" : undefined} className={`underline-offset-8 hover:underline ${sort === s.key ? "font-bold underline decoration-brand decoration-2" : ""}`}>{s.label}</Link>
          ))}
        </nav>
      </div>
      <p className="mt-4 text-sm text-stone-500" aria-live="polite">{total} {total === 1 ? "product" : "products"}</p>

      {items.length ? (
        <div className="mt-8"><ProductGrid products={items} /></div>
      ) : (
        <div className="grid place-items-center gap-4 py-24 text-center"><p className="text-stone-700">No products found here yet.</p><Link href="/shop" className="pill pill-dark">View all products</Link></div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-3">
          {page > 1 && <Link href={href({ page: page - 1 })} className="pill pill-line">Previous</Link>}
          <span className="text-sm text-stone-500">Page {page} of {totalPages}</span>
          {page < totalPages && <Link href={href({ page: page + 1 })} className="pill pill-dark">Next</Link>}
        </nav>
      )}
    </div>
  );
}
