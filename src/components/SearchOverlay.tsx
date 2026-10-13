"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useStore } from "./StoreProvider";
import { CloseIcon } from "./Icons";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    if (searchOpen) setTimeout(() => input.current?.focus(), 50);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (q.trim().length < 2) {
      setItems([]);
      setState("idle");
      return;
    }
    setState("loading");
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error();
        setItems((await res.json()).items);
        setState("done");
      } catch (e) {
        if ((e as Error).name !== "AbortError") setState("error");
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  return (
    <div className={`fixed inset-0 z-[80] bg-white transition-opacity duration-300 ${searchOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} role="dialog" aria-modal="true" aria-label="Search" inert={!searchOpen} aria-hidden={!searchOpen}>
      <div className="container-x flex h-full flex-col pt-6">
        <div className="flex items-center gap-4 border-b border-black/20 pb-4">
          <label htmlFor="site-search" className="sr-only">Search products</label>
          <input id="site-search" ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search kurtas, suits, co-ords…" className="h-display w-full bg-transparent text-3xl outline-none placeholder:text-stone-300 sm:text-5xl" autoComplete="off" />
          <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/20"><CloseIcon /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-8" aria-live="polite">
          {state === "loading" && <p className="text-stone-500">Searching…</p>}
          {state === "error" && <p className="text-stone-700">Search couldn’t reach the store right now. Please try again in a moment.</p>}
          {state === "done" && items.length === 0 && <p className="text-stone-500">No products match “{q}”.</p>}
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((p) => (
              <li key={p.id}>
                <Link href={`/product/${p.slug}`} onClick={() => setSearchOpen(false)} className="group block">
                  <div className="relative aspect-[2/3] overflow-hidden bg-stone-100">
                    {p.image && <Image src={p.image} alt={p.name} fill sizes="(max-width:640px) 45vw, 20vw" className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105" />}
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm font-semibold">{p.name}</p>
                  <p className="text-sm text-stone-500">{formatPrice(p.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
