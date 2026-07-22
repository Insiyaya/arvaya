import type { Metadata } from "next";
import CartContents from "@/components/cart/CartContents";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <section className="section-padding bg-[#FAF7F0]">
      <div className="container-max">
        <h1 className="font-heading text-4xl font-light text-[#2F5233] mb-8">Your Cart</h1>
        <CartContents />
      </div>
    </section>
  );
}
