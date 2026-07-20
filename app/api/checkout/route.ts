import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      slug: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().min(1),
    })
  ).min(1),
  email: z.string().email(),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid checkout data" }, { status: 400 });
    }

    const { items, email } = parsed.data;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // In production: create Razorpay order and DB record
    // const razorpayOrder = await razorpay.orders.create({ amount: total * 100, currency: "INR", receipt: orderId });

    return NextResponse.json({
      success: true,
      orderId,
      total,
      currency: "INR",
      email,
      // razorpayOrderId: razorpayOrder.id,  // Uncomment with real Razorpay
      // key: process.env.RAZORPAY_KEY_ID,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
