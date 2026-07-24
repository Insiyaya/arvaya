import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bundleDiscount } from "@/lib/cart";

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
  shipping: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      address1: z.string().optional(),
      address2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid checkout data" }, { status: 400 });
    }

    const { items, email, phone, shipping } = parsed.data;

    // Compute totals server-side (never trust a client-sent total).
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = bundleDiscount(
      items.map(i => ({ slug: i.slug, qty: i.quantity, price: i.price }))
    ).amount;
    const total = Math.max(0, subtotal - discount);

    // Attach the order to the signed-in user when there is a session.
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    const order = await prisma.order.create({
      data: {
        userId,
        items,
        subtotal,
        discount,
        total,
        status: "confirmed",
        shippingAddress: shipping ? { ...shipping, email, phone: phone ?? null } : { email, phone: phone ?? null },
      },
      select: { id: true, total: true },
    });

    // In production: create a Razorpay order here and return its id/key.
    // const razorpayOrder = await razorpay.orders.create({ amount: total * 100, currency: "INR", receipt: order.id });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      subtotal,
      discount,
      total: order.total,
      currency: "INR",
      email,
    });
  } catch (err) {
    console.error("checkout failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
