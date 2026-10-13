"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/types";

export interface Line {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}
export type Saved = Omit<Line, "qty">;

interface Ctx {
  lines: Line[];
  wishlist: Saved[];
  count: number;
  subtotal: number;
  cartOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  add: (p: Product | Saved, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  toggleWish: (p: Product | Saved) => void;
  inWish: (id: number) => boolean;
}

const StoreCtx = createContext<Ctx | null>(null);
const CART_KEY = "gc.cart.v1";
const WISH_KEY = "gc.wishlist.v1";

const toSaved = (p: Product | Saved): Saved => ({ id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image });

function read<T>(key: string): T[] {
  try {
    const v = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [wishlist, setWishlist] = useState<Saved[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setLines(read<Line>(CART_KEY));
    setWishlist(read<Saved>(WISH_KEY));
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage full or blocked: cart still works for this session */
    }
  }, [lines, wishlist, ready]);

  const add = useCallback((p: Product | Saved, qty = 1) => {
    setLines((cur) => {
      const found = cur.find((l) => l.id === p.id);
      if (found) return cur.map((l) => (l.id === p.id ? { ...l, qty: l.qty + qty } : l));
      return [...cur, { ...toSaved(p), qty }];
    });
    setCartOpen(true);
  }, []);
  const setQty = useCallback((id: number, qty: number) => {
    setLines((cur) => (qty <= 0 ? cur.filter((l) => l.id !== id) : cur.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);
  const remove = useCallback((id: number) => setLines((cur) => cur.filter((l) => l.id !== id)), []);
  const toggleWish = useCallback((p: Product | Saved) => {
    setWishlist((cur) => (cur.some((w) => w.id === p.id) ? cur.filter((w) => w.id !== p.id) : [...cur, toSaved(p)]));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lines,
      wishlist,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
      cartOpen,
      searchOpen,
      setCartOpen,
      setSearchOpen,
      add,
      setQty,
      remove,
      toggleWish,
      inWish: (id: number) => wishlist.some((w) => w.id === id),
    }),
    [lines, wishlist, cartOpen, searchOpen, add, setQty, remove, toggleWish]
  );
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore(): Ctx {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore must be used inside <StoreProvider>");
  return c;
}
