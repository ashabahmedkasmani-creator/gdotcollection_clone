"use client";
import { MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { products } from "@/data/products";
import { STORE } from "@/lib/config";
type Line = { slug: string; qty: number };
type Ctx = { lines: Line[]; add: (s: string) => void; remove: (s: string) => void; setQty: (s: string, q: number) => void; clear: () => void;
  count: number; subtotal: number; shipping: number; total: number; open: boolean; setOpen: (b: boolean) => void;
  wish: string[]; toggleWish: (s: string) => void };
const C = createContext<Ctx>(null!);
export const useCart = () => useContext(C);
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]); const [wish, setWish] = useState<string[]>([]); const [open, setOpen] = useState(false); const [ready, setReady] = useState(false);
  useEffect(() => { try { setLines(JSON.parse(localStorage.getItem("gc-cart") || "[]")); setWish(JSON.parse(localStorage.getItem("gc-wish") || "[]")); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) { localStorage.setItem("gc-cart", JSON.stringify(lines)); localStorage.setItem("gc-wish", JSON.stringify(wish)); } }, [lines, wish, ready]);
  const v = useMemo<Ctx>(() => {
    const subtotal = lines.reduce((a, l) => a + (products.find((p) => p.slug === l.slug)?.price ?? 0) * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= STORE.freeShippingOver ? 0 : STORE.flatShipping;
    return { lines, open, setOpen, wish, subtotal, shipping, total: subtotal + shipping, count: lines.reduce((a, l) => a + l.qty, 0),
      add: (s) => { setLines((L) => L.find((l) => l.slug === s) ? L.map((l) => l.slug === s ? { ...l, qty: l.qty + 1 } : l) : [...L, { slug: s, qty: 1 }]); setOpen(true); },
      remove: (s) => setLines((L) => L.filter((l) => l.slug !== s)),
      setQty: (s, q) => setLines((L) => q < 1 ? L.filter((l) => l.slug !== s) : L.map((l) => l.slug === s ? { ...l, qty: q } : l)),
      clear: () => setLines([]), toggleWish: (s) => setWish((W) => W.includes(s) ? W.filter((x) => x !== s) : [...W, s]) };
  }, [lines, open, wish]);
  return <C.Provider value={v}><MotionConfig reducedMotion="user">{children}</MotionConfig></C.Provider>;
}
