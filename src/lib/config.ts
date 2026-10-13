export const WOO_URL = (process.env.NEXT_PUBLIC_WOO_URL || "https://gdotcollection.com").replace(/\/$/, "");
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Verified business details taken from the live gdotcollection.com footer / info boxes. */
export const BRAND = {
  name: "G. Collection",
  tagline: "A full collection of stitched and unstitched ladies clothing.",
  city: "Karachi, Pakistan",
  email: "support@gdotcollection.com",
  phone: "+92 334 7779231",
  phoneDigits: "923347779231",
  supportHours: "Mon–Sat, 11:00 AM – 9:00 PM",
  freeShipping: "Free Shipping on Orders Above Rs. 10,000",
  payments: "Cash on Delivery and Bank Transfer",
  logo: `${WOO_URL}/wp-content/uploads/2026/09/G.png`,
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
};

/** Pages that still live on the existing WordPress site (not rebuilt in this project). */
export const WP = {
  about: `${WOO_URL}/about-us-3/`,
  contact: `${WOO_URL}/contact-us/`,
  blog: `${WOO_URL}/blog/`,
  account: `${WOO_URL}/my-account/`,
  faqs: `${WOO_URL}/faqs`,
  checkout: `${WOO_URL}/checkout/`,
  cart: `${WOO_URL}/cart/`,
};

export const STORE_API = `${WOO_URL}/wp-json/wc/store/v1`;
