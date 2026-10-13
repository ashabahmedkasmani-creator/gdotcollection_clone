import Link from "next/link";
import { BRAND, WP } from "@/lib/config";
import Logo from "./Logo";

const info = [
  { t: "Free shipping", d: "On orders above Rs. 10,000." },
  { t: "Support", d: `${BRAND.supportHours}.` },
  { t: "Payments", d: `${BRAND.payments}.` },
  { t: "Your data", d: "Used only for order records and shipping." },
];

export default function Footer() {
  const social = [
    { n: "Facebook", h: BRAND.facebook },
    { n: "Instagram", h: BRAND.instagram },
    { n: "WhatsApp", h: `https://wa.me/${BRAND.phoneDigits}` },
  ].filter((s) => s.h);
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container-x grid gap-8 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {info.map((i) => (
          <div key={i.t}>
            <h3 className="h-display text-xl text-brand">{i.t}</h3>
            <p className="mt-2 text-sm text-white/70">{i.d}</p>
          </div>
        ))}
      </div>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo chip />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">{BRAND.tagline}</p>
          <address className="mt-6 space-y-1 text-sm not-italic text-white/80">
            <p>{BRAND.city}</p>
            <p><a className="hover:text-brand" href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
            <p><a className="hover:text-brand" href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>{BRAND.phone}</a></p>
          </address>
        </div>
        <nav aria-label="Shop">
          <h3 className="mb-4 font-semibold">Shop</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-brand" href="/shop">All products</Link></li>
            <li><Link className="hover:text-brand" href="/product-category/stitched">Stitched</Link></li>
            <li><Link className="hover:text-brand" href="/product-category/unstitched">Unstitched</Link></li>
            <li><Link className="hover:text-brand" href="/wishlist">Wishlist</Link></li>
          </ul>
        </nav>
        <nav aria-label="Customer service">
          <h3 className="mb-4 font-semibold">Customer service</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-brand" href="/contact">Contact us</Link></li>
            <li><Link className="hover:text-brand" href="/faqs">FAQs</Link></li>
            <li><Link className="hover:text-brand" href="/shipping-and-payment">Shipping &amp; payment</Link></li>
            <li><a className="hover:text-brand" href={WP.account}>My account</a></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <h3 className="mb-4 font-semibold">Company</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-brand" href="/about">About us</Link></li>
            <li><a className="hover:text-brand" href={WP.blog}>Blog</a></li>
            {social.map((s) => (
              <li key={s.n}><a className="hover:text-brand" href={s.h} target="_blank" rel="noopener noreferrer">{s.n}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15">
        <p className="container-x py-6 text-xs text-white/50">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
