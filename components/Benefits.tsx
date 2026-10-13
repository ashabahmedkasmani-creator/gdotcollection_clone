import { STORE, rs } from "@/lib/config";
// Only verified store policies (from gdotcollection.com).
const items = [["Free shipping", `On bills of ${rs(STORE.freeShippingOver)}`], ["Pay your way", STORE.payments.join(" & ")], ["Support", STORE.hours], ["Your data", "Used only for orders and shipping"]];
export default function Benefits() {
  return <section aria-label="Shopping benefits" className="border-y border-ink/10"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4">{items.map(([h, p]) => <div key={h}><p className="font-display text-xl">{h}</p><p className="text-sm text-ink/60">{p}</p></div>)}</div></section>;
}
