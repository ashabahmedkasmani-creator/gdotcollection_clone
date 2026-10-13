import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[80svh] place-content-center gap-6 pt-32 text-center">
      <h1 className="h-display text-[clamp(3rem,9vw,8rem)]">Page not found</h1>
      <p className="mx-auto max-w-md text-stone-700">The page you’re looking for has moved or doesn’t exist. Try the shop or head back home.</p>
      <div className="flex justify-center gap-3">
        <Link href="/shop" className="pill pill-brand">Browse the shop</Link>
        <Link href="/" className="pill pill-line">Back home</Link>
      </div>
    </div>
  );
}
