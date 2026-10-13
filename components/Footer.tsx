import Link from "next/link";
import Logo from "@/components/Logo";
import BackToTop from "@/components/BackToTop";
import { STORE } from "@/lib/config";

const cols: { h: string; links: [string, string][] }[] = [
  { h: "Shop", links: [["All products", "/shop"], ["Stitched", "/category/stitched"], ["Unstitched", "/category/unstitched"], ["Accessories", "/category/accessories"]] },
  // Order tracking is intentionally absent: the store has no tracking feature yet.
  { h: "Customer support", links: [["Contact us", "/contact"], ["FAQs", "/faqs"], ["Shipping information", "/shipping"], ["Returns & exchanges", "/returns"]] },
  { h: "Policies", links: [["Privacy policy", "/privacy"], ["Terms & conditions", "/terms"], ["About G. Collection", "/about"]] },
];
const a = "inline-block break-words py-1 text-cream/65 transition duration-300 hover:translate-x-1 hover:text-cream";
export default function Footer() {
  const wa = `https://wa.me/${STORE.phone.replace(/\D/g, "")}`; const socials = Object.entries(STORE.social);
  return (<footer id="contact" className="relative bg-ink text-cream">
    <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-rose/70 to-transparent" />
    <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-16 grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pt-24">
      <div className="col-span-2 lg:col-span-3 lg:pr-6"><div className="text-cream"><Logo on="dark" /></div>
        <p className="mt-5 max-w-xs leading-relaxed text-cream/65">A full collection of stitched and unstitched ladies&apos; clothing, based in {STORE.city}.</p>
        {socials.length > 0 && <ul className="mt-6 flex gap-5 text-sm">{socials.map(([n, u]) => <li key={n}><a href={u} rel="noopener noreferrer" target="_blank" className="capitalize text-cream/65 underline-offset-4 transition hover:text-cream hover:underline">{n}</a></li>)}</ul>}</div>
      {cols.map((c) => <nav key={c.h} aria-label={c.h} className="text-sm lg:col-span-2"><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-rose">{c.h}</p>
        <ul className="mt-4 space-y-1">{c.links.map(([l, h]) => <li key={l}><Link href={h} className={a}>{l}</Link></li>)}</ul></nav>)}
      <div className="col-span-2 text-sm sm:col-span-1 lg:col-span-3"><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-rose">Contact</p>
        <ul className="mt-4 space-y-1 text-cream/65"><li className="py-1">{STORE.city}</li>
          <li><a className={a} href={`mailto:${STORE.email}`}>{STORE.email}</a></li>
          <li><a className={a} href={`tel:${STORE.phone.replace(/\s/g, "")}`}>{STORE.phone}</a></li>
          <li><a className={a} href={wa} rel="noopener noreferrer" target="_blank">WhatsApp</a></li>
          <li className="py-1">{STORE.hours}</li></ul></div>
    </div>
    <div className="mx-auto max-w-7xl px-5"><div className="flex flex-col gap-3 border-t border-cream/15 py-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
      <p>© 2026 G. Collection. All rights reserved.</p><p>Payments: {STORE.payments.join(" · ")}</p><BackToTop /></div></div>
  </footer>);
}
