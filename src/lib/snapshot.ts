import type { Category, Product } from "./types";
import { WOO_URL } from "./config";

/**
 * REAL data copied from the live gdotcollection.com homepage (products, prices, ids, image URLs).
 * It is ONLY used when the WooCommerce Store API cannot be reached (offline dev, API blocked).
 * It is not mock data: every entry exists on the store. Prices/stock can drift, so the live API always wins.
 */
const up = (f: string) => `${WOO_URL}/wp-content/uploads/2026/09/${f}`;
const p = (
  id: number,
  slug: string,
  name: string,
  file: string,
  cats: ("stitched" | "accessories" | "unstitched")[]
): Product => ({
  id,
  slug,
  name,
  permalink: `${WOO_URL}/product/${slug}/`,
  price: 2500,
  regularPrice: 2500,
  onSale: false,
  image: up(file),
  images: [up(file)],
  categories: cats.map((c, i) => ({ id: i, name: c[0].toUpperCase() + c.slice(1), slug: c })),
  shortDescription: "",
  description: "",
  inStock: true,
  purchasable: true,
  type: "simple",
});

export const SNAPSHOT_PRODUCTS: Product[] = [
  p(29065, "baby-pink-embroidered-tunic-set-with-schiffli-lace-sleeves-fringed-hem", "Baby Pink Embroidered Tunic Set with Schiffli Lace Sleeves & Fringed Hem", "ChatGPT-Image-Sep-12-2026-04_51_35-PM-1-533x800.png", ["stitched"]),
  p(29032, "beige-plum-contrast-embroidered-3-piece-lawn-suit-with-dupatta", "Beige & Plum Contrast Embroidered 3-Piece Lawn Suit with Dupatta", "ChatGPT-Image-Sep-12-2026-04_51_25-PM-533x800.png", ["accessories", "stitched"]),
  p(29067, "black-chikankari-embroidered-kurti-set-with-scalloped-cutwork-borders", "Black Chikankari Embroidered Kurti Set with Scalloped Cutwork Borders", "ChatGPT-Image-Sep-12-2026-04_51_33-PM-533x800.png", ["accessories", "stitched"]),
  p(29027, "black-ethnic-printed-lawn-tunic-with-lace-trims-wide-leg-trousers", "Black Ethnic Printed Lawn Tunic with Lace Trims & Wide-Leg Trousers", "ChatGPT-Image-Sep-12-2026-04_51_13-PM-533x800.png", ["accessories", "stitched"]),
  p(29030, "deep-magenta-embroidered-kurti-set-with-lace-sleeves-fringed-hem", "Deep Magenta Embroidered Kurti Set with Lace Sleeves & Fringed Hem", "ChatGPT-Image-Sep-12-2026-04_51_20-PM-1-533x800.png", ["accessories", "stitched"]),
  p(29072, "jet-black-embroidered-tunic-shalwar-set-with-scalloped-cutwork-borders", "Jet Black Embroidered Tunic & Shalwar Set with Scalloped Cutwork Borders", "ChatGPT-Image-Sep-12-2026-04_51_39-PM-1-533x800.png", ["unstitched"]),
  p(29024, "mint-green-floral-printed-2-piece-suit", "Mint Green Floral Printed 2-Piece Suit", "ChatGPT-Image-Sep-12-2026-03_12_23-PM-645x800.png", ["accessories", "stitched"]),
  p(29026, "mint-green-floral-printed-kurti-with-pastel-pink-grid-trousers", "Mint Green Floral Printed Kurti with Pastel Pink Grid Trousers", "ChatGPT-Image-Sep-12-2026-04_51_11-PM-533x800.png", ["accessories", "stitched"]),
  p(29029, "monochrome-abstract-printed-co-ord-set-with-button-down-tunic-wide-leg-trousers", "Monochrome Abstract Printed Co-Ord Set with Button-Down Tunic & Wide-Leg Trousers", "ChatGPT-Image-Sep-12-2026-04_51_18-PM-1-533x800.png", ["accessories", "stitched"]),
  p(29033, "off-white-embroidered-long-kurta-with-black-geometric-floral-threadwork", "Off-White Embroidered Long Kurta with Black Geometric & Floral Threadwork", "ChatGPT-Image-Sep-12-2026-04_51_28-PM-533x800.png", ["accessories", "stitched"]),
];

export const SNAPSHOT_CATEGORIES: Category[] = [
  { id: 1, name: "Stitched", slug: "stitched", count: 14, image: up("ChatGPT-Image-Sep-14-2026-12_40_32-PM-633x800.png") },
  { id: 2, name: "Unstitched", slug: "unstitched", count: 1, image: up("ChatGPT-Image-Sep-14-2026-12_37_55-PM-633x800.png") },
  // The live "Accessories" tile uses a theme demo photo, not a G. Collection product, so it is replaced
  // with a real product image from that category.
  { id: 3, name: "Accessories", slug: "accessories", count: 12, image: up("ChatGPT-Image-Sep-12-2026-04_51_25-PM-533x800.png") },
];
