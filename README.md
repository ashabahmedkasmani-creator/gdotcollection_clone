# G. Collection — cinematic storefront (first build)
Setup: `npm install && npm run dev` → http://localhost:3000. Check: `npm run typecheck && npm run build`.

## Data
`data/products.ts` holds 10 real products/prices/categories retrieved from gdotcollection.com. Images hotlink from that site's `/wp-content/uploads/` (not downloaded). For production, download them into `public/` or add a server-side WooCommerce adapter (see `.env.example`; keys stay server-side).

## Honest limitations
- Checkout validates but **does not save orders or take payment** (`lib/orders.ts` is the integration point).
- `STORE.flatShipping` (₨250) is a placeholder; only free shipping over ₨10,000 is verified on the site. Edit `lib/config.ts`.
- Testimonials omitted (site's are lorem ipsum). Policy pages, About/Contact/FAQ pages, dedicated category routes (use `/shop?cat=`), and sitemap/robots are not built yet.
- Brand colours are approximations (logo not inspected); edit `tailwind.config.ts`.

## Hero cutouts
The hero expects transparent PNGs at `public/cutouts/<slug>.png`. Generate them with `python scripts/make-cutouts.py` (needs network access to gdotcollection.com + `rembg`). Missing cutouts fall back to the original photo as a rounded card.
