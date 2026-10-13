import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const hook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!hook) {
    // Honest boundary: no backend configured, so we do NOT pretend the sign-up worked.
    return NextResponse.json({ error: "Newsletter sign-up isn’t connected yet. Please try again later." }, { status: 501 });
  }
  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.NEWSLETTER_WEBHOOK_AUTH ? { Authorization: process.env.NEWSLETTER_WEBHOOK_AUTH } : {}) },
      body: JSON.stringify({ email, source: "gdotcollection-next" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We couldn’t save your email just now. Please try again." }, { status: 502 });
  }
}
