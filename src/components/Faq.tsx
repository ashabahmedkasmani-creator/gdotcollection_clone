"use client";
import { useId, useState } from "react";
import { PlusIcon } from "./Icons";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="divide-y divide-black/15 border-y border-black/15">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`${id}-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className="h-display text-xl sm:text-2xl">{it.q}</span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/25 transition-transform duration-500 ease-luxe ${isOpen ? "rotate-45 bg-brand text-brand-ink" : ""}`}><PlusIcon /></span>
              </button>
            </h3>
            <div id={`${id}-${i}`} role="region" aria-labelledby={undefined} className="acc" data-open={isOpen}>
              <div><p className="max-w-2xl pb-6 leading-relaxed text-stone-700">{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
