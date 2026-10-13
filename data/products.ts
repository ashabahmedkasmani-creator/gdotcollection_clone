import type { Product } from "@/types";
// Retrieved from https://gdotcollection.com (home page listing). Replace with a WooCommerce adapter later (see README).
export const products: Product[] = [
 {
  "slug": "baby-pink-embroidered-tunic-set-with-schiffli-lace-sleeves-fringed-hem",
  "name": "Baby Pink Embroidered Tunic Set with Schiffli Lace Sleeves & Fringed Hem",
  "price": 2500,
  "categories": [
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_35-PM-1-533x800.png",
  "tone": "#f4b8c8"
 },
 {
  "slug": "beige-plum-contrast-embroidered-3-piece-lawn-suit-with-dupatta",
  "name": "Beige & Plum Contrast Embroidered 3-Piece Lawn Suit with Dupatta",
  "price": 2500,
  "categories": [
   "accessories",
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_25-PM-533x800.png",
  "tone": "#7a3a62"
 },
 {
  "slug": "black-chikankari-embroidered-kurti-set-with-scalloped-cutwork-borders",
  "name": "Black Chikankari Embroidered Kurti Set with Scalloped Cutwork Borders",
  "price": 2500,
  "categories": [
   "accessories",
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_33-PM-533x800.png",
  "tone": "#2a2a2e"
 },
 {
  "slug": "black-ethnic-printed-lawn-tunic-with-lace-trims-wide-leg-trousers",
  "name": "Black Ethnic Printed Lawn Tunic with Lace Trims & Wide-Leg Trousers",
  "price": 2500,
  "categories": [
   "accessories",
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_13-PM-533x800.png",
  "tone": "#3b3340"
 },
 {
  "slug": "deep-magenta-embroidered-kurti-set-with-lace-sleeves-fringed-hem",
  "name": "Deep Magenta Embroidered Kurti Set with Lace Sleeves & Fringed Hem",
  "price": 2500,
  "categories": [
   "accessories",
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_20-PM-1-533x800.png",
  "tone": "#b3125f"
 },
 {
  "slug": "jet-black-embroidered-tunic-shalwar-set-with-scalloped-cutwork-borders",
  "name": "Jet Black Embroidered Tunic & Shalwar Set with Scalloped Cutwork Borders",
  "price": 2500,
  "categories": [
   "unstitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_39-PM-1-533x800.png",
  "tone": "#1c1c1c"
 },
 {
  "slug": "mint-green-floral-printed-2-piece-suit",
  "name": "Mint Green Floral Printed 2-Piece Suit",
  "price": 2500,
  "categories": [
   "accessories",
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-03_12_23-PM-645x800.png",
  "tone": "#a8dcc4"
 },
 {
  "slug": "mint-green-floral-printed-kurti-with-pastel-pink-grid-trousers",
  "name": "Mint Green Floral Printed Kurti with Pastel Pink Grid Trousers",
  "price": 2500,
  "categories": [
   "accessories",
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_11-PM-533x800.png",
  "tone": "#9fd6c9"
 },
 {
  "slug": "monochrome-abstract-printed-co-ord-set-with-button-down-tunic-wide-leg-trousers",
  "name": "Monochrome Abstract Printed Co-Ord Set with Button-Down Tunic & Wide-Leg Trousers",
  "price": 2500,
  "categories": [
   "accessories",
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_18-PM-1-533x800.png",
  "tone": "#d8d4cf"
 },
 {
  "slug": "off-white-embroidered-long-kurta-with-black-geometric-floral-threadwork",
  "name": "Off-White Embroidered Long Kurta with Black Geometric & Floral Threadwork",
  "price": 2500,
  "categories": [
   "accessories",
   "stitched"
  ],
  "image": "https://gdotcollection.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-12-2026-04_51_28-PM-533x800.png",
  "tone": "#e9dfd0"
 }
];
export const categories = [{ slug: "stitched", label: "Stitched" }, { slug: "unstitched", label: "Unstitched" }, { slug: "accessories", label: "Accessories" }];
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
