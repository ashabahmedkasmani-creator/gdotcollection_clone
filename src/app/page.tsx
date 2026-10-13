import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Collections from "@/components/Collections";
import ProductGrid from "@/components/ProductGrid";
import ScrollStory from "@/components/ScrollStory";
import Newsletter from "@/components/Newsletter";
import Faq from "@/components/Faq";
import { FAQS } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { getCategories, getProducts } from "@/lib/woo";

export const revalidate = 300;

export default async function Home() {
  const [cats, prods] = await Promise.all([getCategories(), getProducts({ perPage: 12, orderby: "popularity", order: "desc" })]);
  const items = prods.data.items.filter((p) => p.image);
  const heroImgs = items.slice(0, 5).map((p) => ({ src: p.image, alt: p.name, slug: p.slug }));
  const best = items.slice(0, 8);
  const storyPool = items.slice(3);
  const story = storyPool.length >= 3 ? storyPool.slice(0, 3) : items.slice(0, 3);
  const featured = items.find((p) => p.categories.some((c) => c.slug === "unstitched")) ?? items[items.length - 1];
  const introImg = cats.data.find((c) => c.slug === "stitched")?.image ?? items[0]?.image;

  return (
    <>
      <Hero images={heroImgs} />

      {/* A: editorial introduction */}
      <section className="container-x grid gap-12 py-24 lg:grid-cols-12 lg:py-36" aria-label="About the collection">
        <Reveal as="p" variant="mask" className="h-display text-[clamp(1.9rem,4.6vw,4rem)] lg:col-span-7">
          A full collection of stitched and unstitched ladies’ clothing, from Karachi.
        </Reveal>
        <div className="lg:col-span-4 lg:col-start-9 lg:pt-24">
          {introImg && (
            <Reveal variant="mask">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <Image src={introImg} alt="A stitched look from G. Collection" fill sizes="(max-width:1024px) 90vw, 30vw" className="object-cover" />
              </div>
            </Reveal>
          )}
          <Reveal delay={150}><Link href="/about" className="mt-6 inline-block text-sm font-semibold underline underline-offset-8 hover:text-brand">About G. Collection</Link></Reveal>
        </div>
      </section>

      {/* B: collections */}
      <Collections categories={cats.data} />

      {/* C: best sellers */}
      <section id="best-sellers" className="container-x scroll-mt-28 py-20 lg:py-28" aria-labelledby="bs-title">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <h2 id="bs-title" className="h-display text-[clamp(2.2rem,5vw,4rem)]">Best Sellers</h2>
          <Link href="/shop" className="pill pill-line">See more dresses</Link>
        </Reveal>
        <ProductGrid products={best} />
      </section>

      {/* D: scroll story */}
      <ScrollStory products={story} />

      {/* E: campaign */}
      {featured && (
        <section className="container-x grid items-center gap-10 py-24 lg:grid-cols-12 lg:py-36" aria-labelledby="camp-title">
          <Reveal variant="mask" className="lg:col-span-6">
            <Link href={`/product/${featured.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-stone-100">
              <Image src={featured.image} alt={featured.name} fill sizes="(max-width:1024px) 90vw, 50vw" className="object-cover transition-transform duration-[1400ms] ease-luxe hover:scale-105" />
            </Link>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal><h2 id="camp-title" className="h-display text-[clamp(2.6rem,6vw,5.6rem)]">Unstitched, ready for your tailor.</h2></Reveal>
            <Reveal delay={120}><p className="mt-6 max-w-md text-lg text-stone-700">{featured.name}</p><p className="mt-1 text-stone-500">{formatPrice(featured.price)}</p></Reveal>
            <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
              <Link href={`/product/${featured.slug}`} className="pill pill-brand">View the piece</Link>
              <Link href="/product-category/unstitched" className="pill pill-line">Shop unstitched</Link>
            </Reveal>
          </div>
        </section>
      )}

      <Newsletter />

      {/* G: FAQ */}
      <section className="container-x grid gap-12 py-24 lg:grid-cols-12 lg:py-32" aria-labelledby="faq-title">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="h-display text-[clamp(2.2rem,5vw,4rem)]">Questions, answered.</h2>
          <Link href="/faqs" className="mt-6 inline-block text-sm font-semibold underline underline-offset-8 hover:text-brand">All FAQs</Link>
        </div>
        <div className="lg:col-span-8"><Faq items={FAQS.slice(0, 5)} /></div>
      </section>
    </>
  );
}
