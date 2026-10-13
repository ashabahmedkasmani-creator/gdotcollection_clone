import { STORE, rsLong } from "@/lib/config";
// Verified on gdotcollection.com: free shipping on the bill of Rs. 10,000. (No other offer is shown on purpose.)
export default function AnnouncementBar() {
  return (<div role="region" aria-label="Shipping offer" className="relative z-50 flex h-9 items-center justify-center bg-plum px-4 text-center whitespace-nowrap text-[9px] font-medium uppercase tracking-[.12em] text-cream min-[360px]:text-[10px] min-[360px]:tracking-[.18em] sm:text-[11px] sm:tracking-[.22em]">
    <span aria-hidden className="mr-3 hidden h-px w-8 bg-rose sm:block" />
    <p>Free shipping on orders above <span className="font-semibold">{rsLong(STORE.freeShippingOver)}</span></p>
    <span aria-hidden className="ml-3 hidden h-px w-8 bg-rose sm:block" /></div>);
}
