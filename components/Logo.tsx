"use client";
import Link from "next/link";
import { useState } from "react";
import { STORE } from "@/lib/config";
// Official logo image when configured (lib/config.ts), otherwise (or if it fails to load) the typographic wordmark.
export default function Logo({ on = "light", className = "" }: { on?: "light" | "dark"; className?: string }) {
  const src = on === "dark" ? STORE.logo.onDark : STORE.logo.onLight; const [fail, setFail] = useState(false);
  return (<Link href="/" aria-label="G. Collection, home" className={className}>
    {src && !fail ? <img src={src} alt="G. Collection" height={36} className="h-9 w-auto" onError={() => setFail(true)} referrerPolicy="no-referrer" />
      : <span className="font-display text-2xl font-bold tracking-tight">G<span className="text-rose">.</span> Collection</span>}</Link>);
}
