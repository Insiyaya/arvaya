import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateDosha, mapConcernsToProducts } from "@/lib/quiz-engine";

const FASTAPI_URL = process.env.FASTAPI_URL ?? "http://localhost:8000";

const answersSchema = z.object({
  age: z.string().optional(),
  gender: z.string().optional(),
  "city-type": z.string().optional(),
  "body-frame": z.string().optional(),
  "skin-tendency": z.string().optional(),
  "energy-pattern": z.string().optional(),
  "skin-concern": z.string().optional(),
  "skin-type": z.string().optional(),
  "routine-complexity": z.string().optional(),
  "skin-exposure": z.array(z.string()).optional(),
  "hair-concern": z.string().optional(),
  "hair-type": z.string().optional(),
  "wash-frequency": z.string().optional(),
  "chemical-treatments": z.string().optional(),
  diet: z.string().optional(),
  sleep: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = answersSchema.safeParse(body.answers);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid quiz answers" }, { status: 400 });
    }

    const answers = parsed.data;
    const doshaResult = calculateDosha(answers);
    const recommendations = mapConcernsToProducts(answers, doshaResult);

    // Fetch matching products from FastAPI
    let products: Record<string, unknown>[] = [];
    try {
      const res = await fetch(`${FASTAPI_URL}/api/products`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        products = data.products ?? [];
      }
    } catch { /* DB not connected yet — return recs without product details */ }

    const recommendedProducts = recommendations.map(rec => {
      const product = products.find((p: Record<string, unknown>) => p.slug === rec.productId);
      return { ...rec, product: product ?? null };
    });

    return NextResponse.json({ success: true, doshaResult, recommendations: recommendedProducts });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
