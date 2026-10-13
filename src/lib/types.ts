export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  /** price in whole currency units (PKR) */
  price: number;
  regularPrice: number;
  onSale: boolean;
  image: string;
  images: string[];
  categories: { id: number; name: string; slug: string }[];
  shortDescription: string;
  description: string;
  inStock: boolean;
  /** simple products can be added straight to cart; variable ones need option selection on the store */
  purchasable: boolean;
  type: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  image: string | null;
}

export type DataSource = "live" | "snapshot";
export interface Result<T> {
  data: T;
  source: DataSource;
}
