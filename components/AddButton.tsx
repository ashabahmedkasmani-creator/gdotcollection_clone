"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
// Add-to-cart with its own confirmation: label swaps to a tick for ~1.8s (the bag drawer still opens as before).
export default function AddButton({ slug, className = "", after, label = "Add to bag" }: { slug: string; className?: string; after?: () => void; label?: string }) {
  const c = useCart(); const [done, setDone] = useState(false); const t = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(t.current), []);
  return <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); c.add(slug); setDone(true); clearTimeout(t.current); t.current = setTimeout(() => setDone(false), 1800); after?.(); }}
    className={`relative overflow-hidden rounded-full text-sm font-medium transition-colors duration-500 ${done ? "bg-rose text-white" : "bg-ink text-cream hover:bg-plum"} ${className}`}>
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={done ? "d" : "i"} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: .25 }} className="flex items-center justify-center gap-2">
        {done ? <><Check size={15} /> Added</> : <><ShoppingBag size={15} /> {label}</>}</motion.span></AnimatePresence></button>;
}
