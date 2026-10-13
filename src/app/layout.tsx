import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import { BRAND, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "G. Collection | Stitched & Unstitched Ladies Clothing", template: "%s | G. Collection" },
  description: BRAND.tagline + " Based in Karachi, Pakistan.",
  alternates: { canonical: "/" },
  openGraph: { siteName: BRAND.name, type: "website", locale: "en_PK" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0a0a" };

// Opts in to hidden start-states for reveals only when JS runs and motion is allowed.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: motionScript }} /></head>
      <body>
        <StoreProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </StoreProvider>
      </body>
    </html>
  );
}
