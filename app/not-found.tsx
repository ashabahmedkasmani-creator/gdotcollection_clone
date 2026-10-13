import Link from "next/link";
export default function NotFound() { return <div className="grid min-h-[70vh] place-items-center text-center"><div><h1 className="font-display text-7xl">404</h1><p className="mt-3">This page isn&apos;t in the collection.</p><Link href="/shop" className="mt-6 inline-block rounded-full bg-ink px-7 py-3 text-cream">Back to shop</Link></div></div>; }
