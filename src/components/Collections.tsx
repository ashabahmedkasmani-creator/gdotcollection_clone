import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";
import type { Category } from "@/lib/types";

const layouts = [
  "lg:col-span-5 aspect-[4/5.4]",
  "lg:col-span-4 lg:mt-24 aspect-[4/5]",
  "lg:col-span-3 lg:mt-8 aspect-[3/4]",
];

export default function Collections({ categories }: { categories: Category[] }) {
  const cats = [...categories].sort((a, b) => b.count - a.count).slice(0, 3);
  return (
    <section className="container-x py-20 lg:py-28" aria-labelledby="coll-title">
      <Reveal as="div" className="mb-12 flex items-end justify-between gap-6">
        <h2 id="coll-title" className="h-display text-[clamp(2.2rem,5vw,4rem)]">Shop by collection</h2>
        <Link href="/shop" className="hidden text-sm font-semibold underline underline-offset-8 hover:text-brand sm:block">All products</Link>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {cats.map((c, i) => (
          <Reveal key={c.id} delay={i * 120} variant="mask" className={layouts[i]}>
            <Link href={`/product-category/${c.slug}`} className="tile relative block h-full w-full overflow-hidden bg-stone-100">
              {c.image && <Image src={c.image} alt={`${c.name} collection`} fill sizes="(max-width:1024px) 100vw, 40vw" className="tile-img object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="on-dark absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <div>
                  <h3 className="h-display text-3xl sm:text-4xl">{c.name}</h3>
                  <p className="mt-1 text-sm text-white/80">{c.count} {c.count === 1 ? "product" : "products"}</p>
                </div>
                <span className="tile-arrow grid h-12 w-12 place-items-center rounded-full bg-white/20 backdrop-blur"><ArrowIcon /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
