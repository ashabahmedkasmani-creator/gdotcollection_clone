"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import { rs, STORE } from "@/lib/config";
import { submitOrder } from "@/lib/orders";
export default function Checkout() {
  const c = useCart(); const [err, setErr] = useState<Record<string, string>>({}); const [msg, setMsg] = useState("");
  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>; const E: Record<string, string> = {};
    if (f.name.trim().length < 2) E.name = "Enter your full name."; if (!/^(\+92|0)?3\d{9}$/.test(f.phone.replace(/[\s-]/g, ""))) E.phone = "Enter a valid Pakistani mobile number.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) E.email = "Enter a valid email."; if (f.address.trim().length < 8) E.address = "Enter your full address."; if (!f.city.trim()) E.city = "Enter your city.";
    setErr(E); if (Object.keys(E).length || !c.count) return;
    const r = await submitOrder({ ...(f as any), lines: c.lines, total: c.total }); setMsg(r.note);
  }
  const F = ({ n, l, t = "text", req = true }: { n: string; l: string; t?: string; req?: boolean }) => (<label className="block text-sm">{l}{!req && " (optional)"}<input name={n} type={t} aria-invalid={!!err[n]} aria-describedby={`${n}-e`} className="mt-1 w-full rounded-lg border bg-white px-3 py-2.5" />{err[n] && <span id={`${n}-e`} role="alert" className="text-xs text-rose">{err[n]}</span>}</label>);
  return (<div className="mx-auto grid max-w-5xl gap-10 px-5 pt-10 md:grid-cols-[1fr_340px]"><form onSubmit={go} noValidate className="space-y-4"><h1 className="font-display text-4xl">Checkout</h1>
    <F n="name" l="Full name" /><F n="phone" l="Phone" t="tel" /><F n="email" l="Email" t="email" req={false} /><F n="address" l="Shipping address" /><F n="city" l="City" />
    <label className="block text-sm">Payment<select name="payment" className="mt-1 w-full rounded-lg border bg-white px-3 py-2.5">{STORE.payments.map((p) => <option key={p}>{p}</option>)}</select></label>
    <button disabled={!c.count} className="w-full rounded-full bg-ink py-3.5 text-cream disabled:opacity-40">Place order</button>
    {msg && <p role="status" className="rounded-lg bg-[#f4d9e3] p-3 text-sm">{msg}</p>}</form>
    <aside className="h-fit rounded-2xl bg-white p-5 text-sm"><h2 className="mb-3 font-semibold">Order summary</h2>{c.lines.map((l) => { const p = products.find((x) => x.slug === l.slug)!; return <div key={l.slug} className="flex justify-between gap-3 py-1"><span className="line-clamp-1">{p.name} × {l.qty}</span><span>{rs(p.price * l.qty)}</span></div>; })}
      <hr className="my-3" /><div className="flex justify-between"><span>Subtotal</span><span>{rs(c.subtotal)}</span></div><div className="flex justify-between"><span>Shipping</span><span>{c.shipping ? rs(c.shipping) : "Free"}</span></div><div className="mt-2 flex justify-between font-semibold"><span>Total</span><span>{rs(c.total)}</span></div></aside></div>);
}
