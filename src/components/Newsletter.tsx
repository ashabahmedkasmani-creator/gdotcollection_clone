"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong. Please try again.");
      setState("ok");
      setMsg("You’re on the list. Thank you for subscribing.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMsg((err as Error).message);
    }
  }

  return (
    <section className="on-dark bg-ink text-white" aria-labelledby="nl-title">
      <div className="container-x grid gap-10 py-20 lg:grid-cols-2 lg:items-end lg:py-28">
        <div>
          <h2 id="nl-title" className="h-display text-[clamp(2.2rem,5vw,4.2rem)]">New pieces, first.</h2>
          <p className="mt-5 max-w-md text-white/70">Join our newsletter for new arrivals from G. Collection. Your email is used only for this.</p>
        </div>
        <form onSubmit={submit} noValidate={false} className="w-full">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="nl-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" autoComplete="email" aria-describedby="nl-msg" className="h-12 flex-1 rounded-full border border-white/40 bg-transparent px-6 text-white outline-none placeholder:text-white/50 focus:border-brand" />
            <button type="submit" disabled={state === "sending"} className="pill pill-brand h-12 disabled:opacity-60">{state === "sending" ? "Subscribing…" : "Subscribe"}</button>
          </div>
          <p id="nl-msg" role="status" aria-live="polite" className={`mt-3 min-h-5 text-sm ${state === "error" ? "text-brand" : "text-white/80"}`}>{msg}</p>
        </form>
      </div>
    </section>
  );
}
