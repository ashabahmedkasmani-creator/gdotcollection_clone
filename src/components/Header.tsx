"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { BagIcon, CloseIcon, HeartIcon, SearchIcon, UserIcon } from "./Icons";
import { useStore } from "./StoreProvider";
import { BRAND, WP } from "@/lib/config";
import { NAV } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { count, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    if (menu) closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        openRef.current?.focus();
      }
    };
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [menu]);

  const overDark = isHome && !scrolled;
  const text = overDark ? "text-white" : "text-ink";
  const Item = ({ onClick, label, children }: { onClick?: () => void; label: string; children: React.ReactNode }) => (
    <button type="button" onClick={onClick} aria-label={label} className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-brand hover:text-brand-ink ${overDark ? "on-dark" : ""}`}>
      {children}
    </button>
  );

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        {/* Announcement bar: collapses on scroll so the compact header can float */}
        <div className={`overflow-hidden bg-brand text-brand-ink transition-[max-height] duration-500 ease-luxe ${scrolled ? "max-h-0" : "max-h-10"}`}>
          <p className="py-2 text-center text-[13px] font-semibold tracking-wide">{BRAND.freeShipping}</p>
        </div>
        <header
          className={`mx-auto flex items-center justify-between transition-all duration-500 ease-luxe ${text} ${
            scrolled
              ? "mt-3 h-14 max-w-[1240px] rounded-full border border-black/10 bg-white/80 px-4 shadow-sm backdrop-blur-md sm:px-6"
              : "h-20 max-w-[1400px] px-5 sm:px-8 lg:px-12"
          }`}
        >
          <Logo chip={overDark} />
          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-semibold lg:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-luxe hover:after:scale-x-100 ${pathname === n.href ? "after:scale-x-100" : ""}`}>
                {n.label}
              </Link>
            ))}
            <Link href="/about" className="py-1 hover:text-brand">About</Link>
            <Link href="/contact" className="py-1 hover:text-brand">Contact</Link>
          </nav>
          <div className="flex items-center gap-0.5">
            <Item label="Search" onClick={() => setSearchOpen(true)}><SearchIcon /></Item>
            <Link href="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className={`relative hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-brand hover:text-brand-ink sm:grid ${overDark ? "on-dark" : ""}`}>
              <HeartIcon />
              {wishlist.length > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-ink">{wishlist.length}</span>}
            </Link>
            <a href={WP.account} aria-label="Login or register" className={`hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-brand hover:text-brand-ink sm:grid ${overDark ? "on-dark" : ""}`}>
              <UserIcon />
            </a>
            <button type="button" onClick={() => setCartOpen(true)} aria-label={`Cart, ${count} items`} className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-brand hover:text-brand-ink ${overDark ? "on-dark" : ""}`}>
              <BagIcon />
              {count > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-ink">{count}</span>}
            </button>
            <button ref={openRef} type="button" onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-menu" className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${overDark ? "on-dark" : ""}`}>
              <span className="grid gap-1.5"><span className="block h-px w-6 bg-current" /><span className="block h-px w-6 bg-current" /></span>
            </button>
          </div>
        </header>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!menu} className={`fixed inset-0 z-[60] bg-ink text-white transition-[clip-path] duration-700 ease-luxe lg:hidden ${menu ? "pointer-events-auto" : "pointer-events-none"}`} style={{ clipPath: menu ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }} inert={!menu}>
        <div className="flex h-20 items-center justify-between px-5">
          <Logo chip />
          <button ref={closeRef} type="button" onClick={() => { setMenu(false); openRef.current?.focus(); }} aria-label="Close menu" className="on-dark grid h-10 w-10 place-items-center rounded-full border border-white/30"><CloseIcon /></button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pt-8">
          {[...NAV, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Wishlist", href: "/wishlist" }, { label: "FAQs", href: "/faqs" }].map((n, i) => (
            <Link key={n.href} href={n.href} onClick={() => setMenu(false)} className="on-dark h-display text-4xl py-2 transition-all duration-700 ease-luxe hover:text-brand" style={{ transitionDelay: `${menu ? 150 + i * 50 : 0}ms`, opacity: menu ? 1 : 0, transform: menu ? "none" : "translateY(24px)" }}>
              {n.label}
            </Link>
          ))}
          <a href={WP.account} className="on-dark mt-6 pill pill-brand self-start">Login / Register</a>
        </nav>
      </div>
    </>
  );
}
