import type { MetadataRoute } from "next";
import { products, categories } from "@/data/products";
import { pages } from "@/data/pages";
import { STORE } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => ({ url: STORE.url + p });
  return [u("/"), u("/shop"), u("/cart"), ...categories.map((c) => u(`/category/${c.slug}`)), ...Object.keys(pages).map((p) => u(`/${p}`)), ...products.map((p) => u(`/product/${p.slug}`))];
}
