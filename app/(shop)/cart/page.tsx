import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Trash2, Leaf } from "lucide-react";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <section className="section-padding bg-[#FAF7F0]">
      <div className="container-max">
        <h1 className="font-heading text-4xl font-light text-[#2F5233] mb-8">Your Cart</h1>

        {/* Empty state */}
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#A8C09A]/20 flex items-center justify-center mb-6">
            <ShoppingCart size={32} className="text-[#A8C09A]" />
          </div>
          <h2 className="font-heading text-2xl text-[#2C2C2C] mb-3">Your cart is empty</h2>
          <p className="text-[#6B5D4F] mb-8 max-w-sm mx-auto">
            Not sure where to start? Take our free Prakriti quiz and get a personalised kit.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/quiz" className="inline-flex items-center gap-2 bg-[#2F5233] text-[#FAF7F0] px-6 py-3 rounded-xl font-medium hover:bg-[#4A7C59] transition-colors">
              Take the Quiz
              <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 border border-[#2F5233] text-[#2F5233] px-6 py-3 rounded-xl font-medium hover:bg-[#2F5233] hover:text-[#FAF7F0] transition-all">
              Browse Products
            </Link>
          </div>
        </div>

        {/* When cart has items (placeholder UI) */}
        <div className="hidden grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-4">
            {/* Cart item */}
            <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-5 flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#A8C09A]/20 to-[#F5EFE0] flex items-center justify-center flex-shrink-0 text-[#4A7C59]"><Leaf size={28} /></div>
              <div className="flex-1">
                <h3 className="font-heading text-base text-[#2C2C2C]">Kumkumadi Radiance Serum</h3>
                <p className="text-sm text-[#6B5D4F] mb-2">30ml</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-[#A8C09A]/40 rounded-lg overflow-hidden">
                    <button className="px-3 py-1 text-sm hover:bg-[#A8C09A]/15">−</button>
                    <span className="px-3 py-1 text-sm">1</span>
                    <button className="px-3 py-1 text-sm hover:bg-[#A8C09A]/15">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[#2F5233]">₹1,299</span>
                    <button aria-label="Remove item" className="text-[#C97B63] hover:text-[#A5604A] transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6 h-fit">
            <h2 className="font-heading text-xl text-[#2C2C2C] mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5 pb-5 border-b border-[#A8C09A]/25">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B5D4F]">Subtotal</span>
                <span className="text-[#2C2C2C]">₹1,299</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B5D4F]">Shipping</span>
                <span className="text-[#4A7C59]">Free</span>
              </div>
            </div>
            <div className="flex justify-between font-heading text-lg mb-5">
              <span className="text-[#2C2C2C]">Total</span>
              <span className="text-[#2F5233]">₹1,299</span>
            </div>
            <Link href="/checkout" className="flex items-center justify-center gap-2 w-full bg-[#2F5233] text-[#FAF7F0] py-3.5 rounded-xl font-medium hover:bg-[#4A7C59] transition-colors">
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
