import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret || !signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expected = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expected !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const { order_id, id: payment_id } = event.payload.payment.entity;
      // Update order status in DB:
      // await prisma.order.updateMany({ where: { razorpayOrderId: order_id }, data: { status: "paid", razorpayPaymentId: payment_id } });
      console.log("Payment captured:", { order_id, payment_id });
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
