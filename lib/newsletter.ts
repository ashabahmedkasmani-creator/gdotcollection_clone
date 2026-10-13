// Newsletter subscription adapter. Connect your backend by setting NEXT_PUBLIC_NEWSLETTER_ENDPOINT (see .env.example):
// it must accept POST {"email": string} and answer 2xx only when the address has really been saved.
export type SubResult = "saved" | "unconfigured" | "error";
export const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export async function subscribe(email: string): Promise<SubResult> {
  const url = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
  if (!url) return "unconfigured"; // nothing is stored, and the UI must not claim otherwise
  try { const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email: email.trim() }) }); return r.ok ? "saved" : "error"; }
  catch { return "error"; }
}
