import { STORE_API } from "./config";
import { stripHtml } from "./format";
import { SNAPSHOT_CATEGORIES, SNAPSHOT_PRODUCTS } from "./snapshot";
import type { Category, Product, Result } from "./types";


async function api(path: string, revalidate = 300): Promise<{ json: any; headers: Headers } | null> {
  try {
    const res = await fetch(`${STORE_API}${path}`, {
      next: { revalidate },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { json: await res.json(), headers: res.headers };
  } catch (err) {
    console.warn(`[woo] Store API unavailable for ${path}:`, (err as Error).message);
    return null;
  }
}

function minor(v: unknown, unit: number): number {
  const n = Number(v);
  return Number.isFinite(n) ? n / Math.pow(10, unit) : 0;
}

function mapProduct(raw: any): Product {
  const unit = raw.prices?.currency_minor_unit ?? 0;
  const imgs: string[] = (raw.images || []).map((i: any) => i.src).filter(Boolean);
  return {
    id: raw.id,
    name: stripHtml(raw.name || ""),
    slug: raw.slug,
    permalink: raw.permalink,
    price: minor(raw.prices?.price, unit),
    regularPrice: minor(raw.prices?.regular_price, unit),
    onSale: !!raw.on_sale,
    image: imgs[0] || "",
    images: imgs,
    categories: (raw.categories || []).map((c: any) => ({ id: c.id, name: stripHtml(c.name), slug: c.slug })),
    shortDescription: stripHtml(raw.short_description || ""),
    description: stripHtml(raw.description || ""),
    inStock: raw.is_in_stock !== false,
    purchasable: raw.is_purchasable !== false && raw.type === "simple",
    type: raw.type || "simple",
  };
}

export async function getCategories(): Promise<Result<Category[]>> {
  const r = await api("/products/categories?per_page=100&hide_empty=true");
  if (!r || !Array.isArray(r.json)) return { data: SNAPSHOT_CATEGORIES, source: "snapshot" };
  const data: Category[] = r.json
    .filter((c: any) => c.slug !== "uncategorized" && c.parent === 0)
    .map((c: any) => ({
      id: c.id,
      name: stripHtml(c.name),
      slug: c.slug,
      count: c.count,
      image: c.image?.src || null,
    }));
  return { data, source: "live" };
}

export interface ProductQuery {
  category?: string; // slug
  orderby?: "date" | "price" | "popularity" | "title";
  order?: "asc" | "desc";
  page?: number;
  perPage?: number;
  search?: string;
}

export async function getProducts(q: ProductQuery = {}): Promise<Result<{ items: Product[]; totalPages: number; total: number }>> {
  const params = new URLSearchParams();
  params.set("per_page", String(q.perPage ?? 12));
  params.set("page", String(q.page ?? 1));
  if (q.orderby) params.set("orderby", q.orderby);
  if (q.order) params.set("order", q.order);
  if (q.search) params.set("search", q.search);

  if (q.category) {
    const cats = await getCategories();
    const cat = cats.data.find((c) => c.slug === q.category);
    if (cats.source === "live" && cat) params.set("category", String(cat.id));
  }

  const r = await api(`/products?${params.toString()}`);
  if (!r || !Array.isArray(r.json)) {
    let items = SNAPSHOT_PRODUCTS;
    if (q.category) items = items.filter((p) => p.categories.some((c) => c.slug === q.category));
    if (q.search) items = items.filter((p) => p.name.toLowerCase().includes(q.search!.toLowerCase()));
    if (q.orderby === "title") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    return { data: { items, totalPages: 1, total: items.length }, source: "snapshot" };
  }
  return {
    data: {
      items: r.json.map(mapProduct),
      totalPages: Number(r.headers.get("x-wp-totalpages") || 1),
      total: Number(r.headers.get("x-wp-total") || r.json.length),
    },
    source: "live",
  };
}

export async function getProductBySlug(slug: string): Promise<Result<Product | null>> {
  const r = await api(`/products/${encodeURIComponent(slug)}`);
  if (r && r.json && r.json.id) return { data: mapProduct(r.json), source: "live" };
  const snap = SNAPSHOT_PRODUCTS.find((p) => p.slug === slug) || null;
  // Only trust the snapshot when the API itself was unreachable; a reachable API that says "not found" means 404.
  return { data: r === null ? snap : null, source: "snapshot" };
}
