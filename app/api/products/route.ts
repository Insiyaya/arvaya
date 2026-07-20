import { NextRequest, NextResponse } from "next/server";

const FASTAPI_URL = process.env.FASTAPI_URL ?? "http://localhost:8000";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const params = new URLSearchParams();
  ["category", "dosha", "concern", "featured"].forEach(k => {
    const v = searchParams.get(k);
    if (v) params.set(k, v);
  });

  try {
    const res = await fetch(`${FASTAPI_URL}/api/products?${params}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ products: [], total: 0 }, { status: 200 });
  }
}
