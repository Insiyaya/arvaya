"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight, Trash2, Leaf, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CartContents() {
  const { items, subtotal, count, setQty, remove, clear, ready } = useCart();

  // Avoid an empty-cart flash before localStorage hydrates
  if (!ready) return <div className="py-24" />;

  if (items.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8">
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.slug} className="bg-white rounded-2xl border border-[#A8C09A]/25 p-5 flex gap-4">
            <Link
              href={`/products/${item.slug}`}
              className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#A8C09A]/20 to-[#F5EFE0] flex items-center justify-center flex-shrink-0 text-[#4A7C59]"
            >
              <Leaf size={28} />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`}>
                <h3 className="font-heading text-base text-[#2C2C2C] hover:text-[#2F5233] transition-colors leading-snug">{item.name}</h3>
              </Link>
              {item.sanskritName && (
                <p className="font-devanagari text-sm text-[#6B5D4F]/60 mb-2">{item.sanskritName}</p>
              )}
              <div className="flex items-center justify-between gap-3 mt-2">
                <div className="flex items-center border border-[#A8C09A]/40 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(item.slug, item.qty - 1)}
                    aria-label="Decrease quantity"
                    className="px-2.5 py-1.5 text-[#6B5D4F] hover:bg-[#A8C09A]/15 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 py-1 text-sm min-w-[2.5rem] text-center">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.slug, item.qty + 1)}
                    aria-label="Increase quantity"
                    className="px-2.5 py-1.5 text-[#6B5D4F] hover:bg-[#A8C09A]/15 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-[#2F5233]">{formatPrice(item.price * item.qty)}</span>
                  <button
                    onClick={() => remove(item.slug)}
                    aria-label={`Remove ${item.name}`}
                    className="text-[#C97B63] hover:text-[#A5604A] transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={clear}
          className="text-sm text-[#6B5D4F] hover:text-[#C97B63] transition-colors"
        >
          Clear cart
        </button>
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6 h-fit lg:sticky lg:top-24">
        <h2 className="font-heading text-xl text-[#2C2C2C] mb-5">Order Summary</h2>
        <div className="space-y-3 mb-5 pb-5 border-b border-[#A8C09A]/25">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B5D4F]">Subtotal ({count} {count === 1 ? "item" : "items"})</span>
            <span className="text-[#2C2C2C]">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B5D4F]">Shipping</span>
            <span className="text-[#4A7C59]">Free</span>
          </div>
        </div>
        <div className="flex justify-between font-heading text-lg mb-5">
          <span className="text-[#2C2C2C]">Total</span>
          <span className="text-[#2F5233]">{formatPrice(subtotal)}</span>
        </div>
        <Link
          href="/checkout"
          className="flex items-center justify-center gap-2 w-full bg-[#2F5233] text-[#FAF7F0] py-3.5 rounded-xl font-medium hover:bg-[#4A7C59] transition-colors"
        >
          Proceed to Checkout
          <ArrowRight size={16} />
        </Link>
        <Link href="/products" className="block text-center text-sm text-[#6B5D4F] hover:text-[#2F5233] mt-3 transition-colors">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
