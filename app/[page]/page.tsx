import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { pages } from "@/data/pages";
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(pages).map((page) => ({ page }));
export const generateMetadata = ({ params }: { params: { page: string } }): Metadata => ({ title: pages[params.page]?.title });
export default function Page({ params }: { params: { page: string } }) {
  const p = pages[params.page]; if (!p) notFound();
  return (<div className="mx-auto max-w-3xl px-5 pb-10 pt-14"><h1 className="font-display text-5xl md:text-7xl">{p.title}</h1><p className="mt-5 text-lg text-ink/70">{p.intro}</p>
    <div className="mt-12 divide-y">{p.sections.map((s) => <section key={s.h} className="grid gap-2 py-6 md:grid-cols-[1fr_2fr]"><h2 className="font-semibold">{s.h}</h2><p className="text-ink/80">{s.p}</p></section>)}</div>
    <Link href="/shop" className="mt-10 inline-block rounded-full bg-ink px-7 py-3 text-cream">Continue shopping</Link></div>);
}
