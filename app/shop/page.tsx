import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "./ShopClient";
export const metadata: Metadata = { title: "Shop all" };
export default function Shop() { return <Suspense><ShopClient /></Suspense>; }
