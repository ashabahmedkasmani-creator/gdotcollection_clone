import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, WP } from "@/lib/config";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };

export default function About() {
  return (
    <div className="container-x page-enter pb-8 pt-36 sm:pt-40">
      <h1 className="h-display max-w-4xl text-[clamp(2.6rem,7vw,6rem)]">Stitched and unstitched, for her.</h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <p className="text-xl leading-relaxed lg:col-span-6">{BRAND.tagline} We’re based in {BRAND.city}.</p>
        <div className="space-y-4 text-stone-700 lg:col-span-5 lg:col-start-8">
          <p>Browse ready-to-wear stitched pieces, or choose unstitched and have them made your way.</p>
          <p>Questions about an order or a piece? Our team is available {BRAND.supportHours}.</p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="/shop" className="pill pill-brand">Shop the collection</Link>
            <Link href="/contact" className="pill pill-line">Contact us</Link>
          </div>
          <p className="pt-6 text-sm text-stone-500">Our full story lives on the <a className="underline underline-offset-4 hover:text-brand" href={WP.about}>existing About page</a>.</p>
        </div>
      </div>
    </div>
  );
}
