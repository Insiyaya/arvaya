import type { Metadata } from "next";
import { Lock } from "lucide-react";
import CheckoutClient from "@/components/cart/CheckoutClient";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <section className="section-padding bg-[#FAF7F0]">
      <div className="container-max">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="font-heading text-4xl font-light text-[#2F5233]">Checkout</h1>
          <div className="flex items-center gap-1 text-xs text-[#4A7C59]">
            <Lock size={12} />
            <span>Secure</span>
          </div>
        </div>
        <CheckoutClient />
      </div>
    </section>
  );
}
