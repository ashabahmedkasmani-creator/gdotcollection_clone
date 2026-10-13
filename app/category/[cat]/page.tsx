import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShopClient from "@/app/shop/ShopClient";
import { categories } from "@/data/products";
export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ cat: c.slug }));
export const generateMetadata = ({ params }: { params: { cat: string } }): Metadata => ({ title: categories.find((c) => c.slug === params.cat)?.label });
export default function Cat({ params }: { params: { cat: string } }) {
  const c = categories.find((x) => x.slug === params.cat); if (!c) notFound();
  return <Suspense><ShopClient initialCat={c.slug} title={c.label} /></Suspense>;
}
