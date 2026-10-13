"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CircleAlert, Loader2 } from "lucide-react";
import { subscribe, validEmail } from "@/lib/newsletter";
import { EASE } from "@/lib/motion";

type S = { kind: "idle" } | { kind: "invalid" } | { kind: "loading" } | { kind: "saved" } | { kind: "unconfigured" } | { kind: "error" };
const msg: Record<string, string> = {
  invalid: "That email doesn't look right. Please check it and try again.",
  saved: "You're on the list. Thank you for subscribing.",
  unconfigured: "Your address looks valid, but newsletter signup isn't connected yet, so nothing was saved. Please check back soon.",
  error: "We couldn't save your email just now. Please try again in a moment.",
};
const line = { h: { y: "110%" }, v: { y: 0, transition: { duration: 1, ease: EASE } } };

export default function Newsletter() {
  const [state, setState] = useState<S>({ kind: "idle" }); const [email, setEmail] = useState(""); const id = useId(); const reduce = !!useReducedMotion();
  const bad = state.kind === "invalid" || state.kind === "error"; const done = state.kind === "saved";
  async function submit(e: React.FormEvent) {
    e.preventDefault(); if (state.kind === "loading") return;
    if (!validEmail(email)) return setState({ kind: "invalid" });
    setState({ kind: "loading" }); const r = await subscribe(email); setState({ kind: r });
    if (r === "saved") setEmail("");
  }
  return (<section aria-labelledby="nl-h" className="relative overflow-hidden bg-cream px-5 pt-24 md:pt-32">
    <div className="mx-auto grid max-w-7xl items-end gap-12 md:grid-cols-12 md:gap-8">
      <motion.div initial="h" whileInView="v" viewport={{ once: true, margin: "-80px" }} transition={{ staggerChildren: .12 }} className="pb-16 md:col-span-7 md:pb-28">
        <p className="text-xs uppercase tracking-[.3em] text-ink/50">07 — The Letter</p>
        <h2 id="nl-h" className="mt-5 font-display text-5xl leading-[.95] md:text-7xl lg:text-8xl">
          {["Be first to see", "what's new."].map((l, k) => <span key={l} className="block overflow-hidden pb-2"><motion.span variants={line} className={`block ${k ? "italic text-plum" : ""}`}>{l}</motion.span></span>)}</h2>
        <motion.p variants={{ h: { opacity: 0, y: 20 }, v: { opacity: 1, y: 0, transition: { duration: .9, ease: EASE } } }} className="mt-6 max-w-md text-lg text-ink/75">
          New arrivals and news from G. Collection, in your inbox. Just your email, nothing else.</motion.p>
        <motion.form noValidate onSubmit={submit} variants={{ h: { opacity: 0, y: 24 }, v: { opacity: 1, y: 0, transition: { duration: .9, ease: EASE } } }} className="mt-10 max-w-xl">
          <label htmlFor={id} className="text-xs uppercase tracking-[.25em] text-ink/60">Email address</label>
          <div className={`group mt-2 flex items-center gap-3 border-b-2 pb-2 transition-colors duration-500 ${bad ? "border-rose" : "border-ink/80 focus-within:border-rose"}`}>
            <input id={id} name="email" type="email" inputMode="email" autoComplete="email" value={email} disabled={done} onChange={(e) => { setEmail(e.target.value); if (state.kind !== "idle" && state.kind !== "loading") setState({ kind: "idle" }); }}
              aria-invalid={bad} aria-describedby={`${id}-s`} placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent py-2 font-display text-2xl text-ink placeholder:text-ink/30 focus:outline-none md:text-3xl" />
            <button type="submit" disabled={done || state.kind === "loading"} className="group/btn relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-colors duration-500 hover:bg-plum focus-visible:bg-plum disabled:opacity-60">
              <span aria-hidden className="absolute inset-0 -translate-x-full bg-rose transition-transform duration-500 group-hover/btn:translate-x-0" />
              <span className="relative">{state.kind === "loading" ? "Sending" : done ? "Subscribed" : "Subscribe"}</span>
              <span className="relative">{state.kind === "loading" ? <Loader2 size={16} className="animate-spin" /> : done ? <Check size={16} /> : <ArrowRight size={16} className="transition-transform duration-500 group-hover/btn:translate-x-1" />}</span></button></div>
          <div id={`${id}-s`} role="status" aria-live="polite" className="min-h-[3.5rem] pt-3 text-sm">
            <AnimatePresence mode="wait" initial={false}>{msg[state.kind] && <motion.p key={state.kind} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}
              className={`flex items-start gap-2 ${bad ? "text-[#b3125f]" : done ? "text-ink" : "text-ink/75"}`}>
              {bad ? <CircleAlert size={16} className="mt-0.5 shrink-0" /> : <Check size={16} className="mt-0.5 shrink-0" />}<span>{msg[state.kind]}</span></motion.p>}</AnimatePresence></div>
        </motion.form>
      </motion.div>

      {/* Plum arch rises straight out of the footer: the section ends where the dark begins */}
      <motion.div aria-hidden initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} className="relative mx-auto h-[300px] w-[240px] md:col-span-5 md:h-[460px] md:w-[360px] md:justify-self-end">
        <div className="absolute inset-0 rounded-t-[999px] bg-plum" />
        <div className="absolute inset-3 rounded-t-[999px] border border-dashed border-rose/70" />
        <div className="absolute inset-0 grid place-items-center pb-10"><p className="font-display text-[8rem] italic leading-none text-cream md:text-[12rem]">G<span className="text-rose">.</span></p></div>
        <p className="absolute inset-x-0 bottom-6 text-center text-[10px] uppercase tracking-[.35em] text-cream/70">Stitched · Unstitched</p></motion.div>
    </div></section>);
}
