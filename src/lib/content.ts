import { BRAND } from "./config";

/**
 * FAQ answers use ONLY facts published on gdotcollection.com (shipping threshold, support hours,
 * payment methods, data use, business location). Return/exchange rules are not published anywhere
 * I could verify, so that question points people to support instead of inventing a policy.
 * Edit freely once you confirm your policies.
 */
export const FAQS = [
  { q: "What is G. Collection?", a: "G. Collection is a full collection of stitched and unstitched ladies clothing, based in Karachi, Pakistan." },
  { q: "Is shipping free?", a: "Yes, on orders above Rs. 10,000." },
  { q: "How can I pay?", a: "We accept Cash on Delivery and Bank Transfer." },
  { q: "When can I reach customer support?", a: `Our team is available ${BRAND.supportHours}. Call or WhatsApp ${BRAND.phone}, or email ${BRAND.email}.` },
  { q: "How is my personal data used?", a: "Your data is used only for order records and the shipping process." },
  { q: "How do I ask about returns or exchanges?", a: `Please contact us at ${BRAND.email} or ${BRAND.phone} and our team will help with your order.` },
];

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Stitched", href: "/product-category/stitched" },
  { label: "Unstitched", href: "/product-category/unstitched" },
];
