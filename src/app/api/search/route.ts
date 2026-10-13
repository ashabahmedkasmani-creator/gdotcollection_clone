import { NextResponse } from "next/server";
import { getProducts } from "@/lib/woo";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ items: [] });
  const { data, source } = await getProducts({ search: q, perPage: 10 });
  return NextResponse.json({ items: data.items, source });
}
