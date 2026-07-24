import { NextRequest, NextResponse } from "next/server";
import { fetchProducts } from "@/lib/api";

// Serves the product catalogue from the database. The quiz results page fetches
// this endpoint to enrich its recommendations.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const products = await fetchProducts({
    category: searchParams.get("category") ?? undefined,
    dosha: searchParams.get("dosha") ?? undefined,
    concern: searchParams.get("concern") ?? undefined,
    featured: searchParams.get("featured") === "true" ? true : undefined,
  });
  return NextResponse.json({ products, total: products.length }, { status: 200 });
}
