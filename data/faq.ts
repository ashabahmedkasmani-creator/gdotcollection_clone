import { STORE, rs } from "@/lib/config";
export type FaqCat = "orders" | "shipping" | "product" | "returns" | "support";
export type Faq = { cat: FaqCat; q: string; a: string; confirm?: boolean };
export const faqCats: { slug: FaqCat; label: string; blurb: string }[] = [
  { slug: "orders", label: "Orders & payments", blurb: "Paying and placing" }, { slug: "shipping", label: "Shipping & delivery", blurb: "Getting it to you" },
  { slug: "product", label: "Sizes & products", blurb: "What you're buying" }, { slug: "returns", label: "Returns & exchanges", blurb: "If it isn't right" },
  { slug: "support", label: "Customer support", blurb: "Talking to us" }];
const P = STORE.policy;
// An answer is "verified" only when it comes from published store info or a value the owner has filled in (STORE.policy).
const pol = (val: string, fallback: string) => (val ? { a: val } : { a: fallback, confirm: true });
export const faqs: Faq[] = [
  { cat: "orders", q: "How can I pay?", a: `${STORE.payments.join(" and ")} are supported.` },
  { cat: "orders", q: "How does ordering work?", a: "Add pieces to your bag, then check out. Orders are confirmed by the store after you submit them." },
  { cat: "orders", q: "Can I change or cancel an order?", ...pol(P.orderChanges, "Please contact the team as soon as possible. The change and cancellation policy is yet to be confirmed by the store.") },
  { cat: "shipping", q: "How much is shipping?", ...pol(P.belowThresholdShipping ? `Free on bills of ${rs(STORE.freeShippingOver)} and above. Below that: ${P.belowThresholdShipping}` : "", `Free on bills of ${rs(STORE.freeShippingOver)} and above. Charges below that amount are yet to be confirmed by the store.`) },
  { cat: "shipping", q: "How long will delivery take?", ...pol(P.deliveryTime, "Delivery times are yet to be confirmed by the store. Contact the team if you need a date for a specific order.") },
  { cat: "shipping", q: "Where do you deliver?", ...pol(P.deliveryAreas, `We are based in ${STORE.city}. Delivery areas are yet to be confirmed by the store.`) },
  { cat: "product", q: "What's the difference between stitched and unstitched?", a: "Stitched pieces are ready to wear. Unstitched pieces are fabric sets that you have tailored to your own measurements." },
  { cat: "product", q: "Which sizes and colours are available?", a: "The store doesn't publish size or colour options online, so none are shown on product pages. Message the team before ordering and they can tell you about a specific piece." },
  { cat: "product", q: "What kind of pieces do you sell?", a: "Embroidered tunics and kurtis, printed lawn suits and co-ord sets, in stitched and unstitched formats. Each product page lists the full name and price." },
  { cat: "returns", q: "Can I exchange an item?", ...pol(P.exchangeProcess, "Contact the team to ask about an exchange. The full exchange policy is yet to be confirmed by the store.") },
  { cat: "returns", q: "How long do I have to return something?", ...pol(P.returnWindow, "The return window is yet to be confirmed by the store. Please ask the team before ordering if this matters to you.") },
  { cat: "support", q: "When is the team available?", a: STORE.hours + "." },
  { cat: "support", q: "How do I contact you?", a: `Phone or WhatsApp ${STORE.phone}, or email ${STORE.email}.` },
  { cat: "support", q: "What happens to my details?", a: "Your data is used only for order records and the shipping process." },
];
