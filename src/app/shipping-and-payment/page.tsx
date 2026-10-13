import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = { title: "Shipping & payment", alternates: { canonical: "/shipping-and-payment" } };

/** Only facts published on gdotcollection.com. Delivery times and the returns/exchange policy are not published there, so they are intentionally absent. */
export default function Shipping() {
  const blocks = [
    { t: "Shipping", d: "Free shipping on orders above Rs. 10,000." },
    { t: "Payment", d: `We accept ${BRAND.payments}.` },
    { t: "Your data", d: "Your data is used only for order records and the shipping process." },
    { t: "Returns, exchanges and delivery times", d: `For questions about these, contact our team at ${BRAND.email} or ${BRAND.phone} (${BRAND.supportHours}).` },
  ];
  return (
    <div className="container-x page-enter pb-8 pt-36 sm:pt-40">
      <h1 className="h-display text-[clamp(2.6rem,7vw,6rem)]">Shipping &amp; payment</h1>
      <div className="mt-12 max-w-3xl divide-y divide-black/15 border-y border-black/15">
        {blocks.map((b) => (
          <section key={b.t} className="py-7"><h2 className="h-display text-2xl">{b.t}</h2><p className="mt-2 text-stone-700">{b.d}</p></section>
        ))}
      </div>
      <Link href="/contact" className="pill pill-brand mt-10">Contact support</Link>
    </div>
  );
}
