"use client";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
// Horizontal rail: native scroll + snap on touch, click-and-drag with the mouse, arrows for keyboard/trackpad-less users.
export default function DragRail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null); const st = useRef({ down: false, x: 0, left: 0, moved: false });
  const by = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * .7), behavior: "smooth" });
  return (<div>
    <div className="mb-4 flex items-center justify-between"><p className="text-xs uppercase tracking-[.25em] text-ink/50">{label}</p>
      <div className="flex gap-2"><button aria-label="Scroll left" onClick={() => by(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream"><ArrowLeft size={16} /></button>
        <button aria-label="Scroll right" onClick={() => by(1)} className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream"><ArrowRight size={16} /></button></div></div>
    <div ref={ref} role="region" aria-label={label} tabIndex={0}
      onPointerDown={(e) => { if (e.pointerType !== "mouse") return; st.current = { down: true, x: e.clientX, left: ref.current!.scrollLeft, moved: false }; }}
      onPointerMove={(e) => { const s = st.current; if (!s.down) return; const dx = e.clientX - s.x; if (Math.abs(dx) > 5) s.moved = true; ref.current!.scrollLeft = s.left - dx; }}
      onPointerUp={() => { st.current.down = false; }} onPointerLeave={() => { st.current.down = false; }}
      onClickCapture={(e) => { if (st.current.moved) { e.preventDefault(); e.stopPropagation(); st.current.moved = false; } }}
      className="no-scrollbar -mx-5 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 active:cursor-grabbing md:snap-none [&_img]:pointer-events-none">{children}</div></div>);
}
