import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopView, { sortFor } from "@/components/ShopView";
import { getCategories, getProducts } from "@/lib/woo";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ sort?: string; page?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getCategories();
  const c = cats.data.find((x) => x.slug === slug);
  return c ? { title: c.name, alternates: { canonical: `/product-category/${slug}` } } : {};
}

export default async function Category({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const cats = await getCategories();
  const cat = cats.data.find((c) => c.slug === slug);
  if (!cat) notFound();
  const s = sortFor(sp.sort);
  const page = Math.max(1, Number(sp.page) || 1);
  const prods = await getProducts({ category: slug, page, perPage: 12, orderby: s.orderby, order: s.order });
  return <ShopView title={cat.name} base={`/product-category/${slug}`} categories={cats.data} activeCat={slug} items={prods.data.items} page={page} totalPages={prods.data.totalPages} total={prods.data.total} sort={s.key} />;
}
