import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getCategories, getProducts } from "@/lib/woo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cats, prods] = await Promise.all([getCategories(), getProducts({ perPage: 100 })]);
  const staticRoutes = ["", "/shop", "/about", "/contact", "/faqs", "/shipping-and-payment"];
  return [
    ...staticRoutes.map((r) => ({ url: `${SITE_URL}${r}` })),
    ...cats.data.map((c) => ({ url: `${SITE_URL}/product-category/${c.slug}` })),
    ...prods.data.items.map((p) => ({ url: `${SITE_URL}/product/${p.slug}` })),
  ];
}
