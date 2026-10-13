import type { Metadata } from "next";
import ShopView, { sortFor } from "@/components/ShopView";
import { getCategories, getProducts } from "@/lib/woo";

export const metadata: Metadata = { title: "Shop", alternates: { canonical: "/shop" } };

export default async function Shop({ searchParams }: { searchParams: Promise<{ sort?: string; page?: string; q?: string }> }) {
  const sp = await searchParams;
  const s = sortFor(sp.sort);
  const page = Math.max(1, Number(sp.page) || 1);
  const [cats, prods] = await Promise.all([getCategories(), getProducts({ page, perPage: 12, orderby: s.orderby, order: s.order, search: sp.q })]);
  return <ShopView title="Shop" base="/shop" categories={cats.data} items={prods.data.items} page={page} totalPages={prods.data.totalPages} total={prods.data.total} sort={s.key} q={sp.q} />;
}
