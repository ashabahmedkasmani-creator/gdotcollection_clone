import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STORE } from "@/lib/config";
export const metadata: Metadata = { metadataBase: new URL("http://localhost:3000"), title: { default: "G. Collection — Stitched & Unstitched Ladies' Clothing", template: "%s | G. Collection" },
  description: "Stitched and unstitched ladies' clothing from Karachi.", openGraph: { title: "G. Collection", description: "Stitched and unstitched ladies' clothing.", siteName: STORE.name } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><CartProvider><AnnouncementBar /><Header /><main>{children}</main><Footer /></CartProvider></body></html>);
}
