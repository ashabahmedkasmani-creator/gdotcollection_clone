import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductGrid from "@/components/ProductGrid";
import { getProductBySlug, getProducts } from "@/lib/woo";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: p } = await getProductBySlug(slug);
  if (!p) return {};
  return { title: p.name, description: p.shortDescription || undefined, alternates: { canonical: `/product/${p.slug}` }, openGraph: { images: p.image ? [p.image] : [] } };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { data: p } = await getProductBySlug(slug);
  if (!p) notFound();
  const cat = p.categories[0]?.slug;
  const related = (await getProducts({ category: cat, perPage: 5 })).data.items.filter((x) => x.id !== p.id).slice(0, 4);
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, image: p.images, offers: { "@type": "Offer", priceCurrency: "PKR", price: p.price, availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } };
  return (
    <div className="container-x page-enter pt-32 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-stone-500">
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        {p.categories[0] && <> / <Link href={`/product-category/${p.categories[0].slug}`} className="hover:text-ink">{p.categories[0].name}</Link></>}
      </nav>
      <ProductDetail product={p} />
      {related.length > 0 && (
        <section className="mt-24" aria-labelledby="rel">
          <h2 id="rel" className="h-display mb-8 text-3xl sm:text-4xl">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
