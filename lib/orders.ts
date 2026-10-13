// Integration point. No backend is connected: this does NOT save an order or take payment.
// Replace with a POST to your order API (e.g. WooCommerce REST /wp-json/wc/v3/orders via a server route using env keys).
export type OrderInput = { name: string; phone: string; email: string; address: string; city: string; payment: string; lines: { slug: string; qty: number }[]; total: number };
export async function submitOrder(o: OrderInput): Promise<{ ok: boolean; saved: false; note: string }> {
  console.info("Order request (not persisted):", o);
  return { ok: true, saved: false, note: "Order request prepared. Backend not connected, so nothing was sent or charged." };
}
