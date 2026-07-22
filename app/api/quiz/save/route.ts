import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const saveSchema = z.object({
  answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  doshaResult: z.object({
    primary: z.string(),
    secondary: z.string().nullable(),
    scores: z.record(z.string(), z.number()),
    label: z.string(),
    description: z.string(),
  }),
  recommendations: z.array(
    z.object({ productId: z.string(), reason: z.string(), priority: z.number() })
  ),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to save your results" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = saveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid quiz result data" }, { status: 400 });
  }

  const { answers, doshaResult, recommendations } = parsed.data;

  const quizResponse = await prisma.quizResponse.create({
    data: {
      userId: session.user.id,
      answers,
      doshaResult,
      recommendedProducts: recommendations.map(r => r.productId),
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { doshaProfile: doshaResult.label },
  });

  return NextResponse.json({ success: true, id: quizResponse.id });
}
