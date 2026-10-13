import { STORE, rs } from "@/lib/config";
const TBC = "Owner to confirm before launch.";
export type Page = { title: string; intro: string; sections: { h: string; p: string }[] };
export const pages: Record<string, Page> = {
  about: { title: "About G. Collection", intro: "G. Collection is a full collection of stitched and unstitched ladies' clothing, based in Karachi, Pakistan.", sections: [
    { h: "What we make", p: "Embroidered tunics and kurtis, printed lawn suits and co-ord sets, in stitched and unstitched formats." }, { h: "Support", p: `Our team is available ${STORE.hours}.` }, { h: "Your data", p: "Your data is used only for order records and the shipping process." }] },
  contact: { title: "Contact us", intro: "Reach the G. Collection team directly.", sections: [
    { h: "Phone / WhatsApp", p: STORE.phone }, { h: "Email", p: STORE.email }, { h: "Location", p: STORE.city }, { h: "Hours", p: STORE.hours }] },
  faqs: { title: "Frequently asked questions", intro: "Answers based on the store's published information.", sections: [
    { h: "What is G. Collection?", p: "A collection of stitched and unstitched ladies' clothing from Karachi." },
    { h: "How much is shipping?", p: `Free shipping on bills of ${rs(STORE.freeShippingOver)}. Charges below that: ${TBC}` },
    { h: "How can I pay?", p: `${STORE.payments.join(" and ")}.` }, { h: "Can I exchange an item?", p: `Contact the team via the Contact page. Full policy: ${TBC}` },
    { h: "When is support available?", p: STORE.hours }] },
  shipping: { title: "Shipping policy", intro: "What we can confirm today.", sections: [
    { h: "Free shipping", p: `Orders of ${rs(STORE.freeShippingOver)} or more ship free.` }, { h: "Standard charges, delivery times, areas", p: TBC }] },
  returns: { title: "Returns & exchanges", intro: "Please contact us to start a return or exchange.", sections: [{ h: "Policy details", p: `Eligibility window, condition and process: ${TBC}` }, { h: "How to reach us", p: `${STORE.email} or ${STORE.phone}.` }] },
  privacy: { title: "Privacy policy", intro: "Template summary: have it reviewed before launch.", sections: [
    { h: "Data use", p: "Your data is used only for order records and the shipping process." }, { h: "Storage on this site", p: "Your cart and wishlist are stored in your own browser. Nothing is sent to a server until an order backend is connected." }] },
  terms: { title: "Terms & conditions", intro: "Template summary: have it reviewed before launch.", sections: [
    { h: "Orders", p: "Orders are confirmed by the store after you submit them." }, { h: "Payments", p: `Supported: ${STORE.payments.join(", ")}.` }, { h: "Other terms", p: TBC }] },
};
