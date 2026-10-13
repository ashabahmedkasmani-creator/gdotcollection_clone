"use client";
import { ArrowUp } from "lucide-react";
export default function BackToTop() {
  return <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} className="inline-flex items-center gap-2 self-start text-cream/65 transition hover:text-cream md:self-auto">Back to top <ArrowUp size={14} /></button>;
}
