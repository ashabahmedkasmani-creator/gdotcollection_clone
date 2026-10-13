import type { Metadata } from "next";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = { title: "Contact us", alternates: { canonical: "/contact" } };

export default function Contact() {
  const rows = [
    { t: "WhatsApp or call", v: BRAND.phone, h: `https://wa.me/${BRAND.phoneDigits}`, note: "Tap to open WhatsApp" },
    { t: "Email", v: BRAND.email, h: `mailto:${BRAND.email}` },
    { t: "Support hours", v: BRAND.supportHours },
    { t: "Based in", v: BRAND.city },
  ];
  return (
    <div className="container-x page-enter min-h-[70svh] pb-8 pt-36 sm:pt-40">
      <h1 className="h-display text-[clamp(2.6rem,7vw,6rem)]">Talk to us.</h1>
      <p className="mt-4 max-w-lg text-stone-700">Orders, sizing, shipping or anything else: reach our team directly.</p>
      <dl className="mt-12 divide-y divide-black/15 border-y border-black/15">
        {rows.map((r) => (
          <div key={r.t} className="grid gap-1 py-6 sm:grid-cols-3">
            <dt className="text-stone-500">{r.t}</dt>
            <dd className="h-display text-2xl sm:col-span-2 sm:text-3xl">
              {r.h ? <a href={r.h} className="hover:text-brand">{r.v}</a> : r.v}
              {r.note && <span className="ml-3 font-sans text-sm text-stone-500">{r.note}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
