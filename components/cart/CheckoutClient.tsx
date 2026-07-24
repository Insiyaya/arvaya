"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Lock, ShoppingCart, CheckCircle2, ArrowRight, Leaf } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { bundleDiscount } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

type Placed = { orderId: string; total: number; email: string };

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233] placeholder:text-[#6B5D4F]/40";

export default function CheckoutClient() {
  const { items, subtotal, ready, clear } = useCart();
  const bundle = bundleDiscount(items);
  const total = subtotal - bundle.amount;

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address1: "", address2: "", city: "", state: "", pincode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Placed | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function placeOrder(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.slug, slug: i.slug, name: i.name, price: i.price, quantity: i.qty })),
          email: form.email,
          phone: form.phone || undefined,
          shipping: {
            firstName: form.firstName,
            lastName: form.lastName,
            address1: form.address1,
            address2: form.address2 || undefined,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not place your order. Please check your details.");
        setSubmitting(false);
        return;
      }
      setPlaced({ orderId: data.orderId, total, email: form.email });
      clear();
    } catch {
      setError("Something went wrong placing your order. Please try again.");
      setSubmitting(false);
    }
  }

  if (!ready) return <div className="py-24" />;

  // Order confirmation
  if (placed) {
    return (
      <div className="max-w-lg mx-auto text-center py-10">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#A8C09A]/20 flex items-center justify-center mb-5 text-[#2F5233]">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="font-heading text-3xl font-light text-[#2F5233] mb-3">Order placed</h2>
        <p className="text-[#6B5D4F] mb-2">
          Thank you. Your order <span className="font-medium text-[#2C2C2C]">#{placed.orderId.slice(-8)}</span> is confirmed.
        </p>
        <p className="text-[#6B5D4F] mb-8 text-sm">
          A confirmation has been sent to {placed.email}. Total paid: {formatPrice(placed.total)}.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/products" className="inline-flex items-center gap-2 bg-[#2F5233] text-[#FAF7F0] px-6 py-3 rounded-xl font-medium hover:bg-[#4A7C59] transition-colors">
            Continue shopping <ArrowRight size={16} />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 border border-[#2F5233] text-[#2F5233] px-6 py-3 rounded-xl font-medium hover:bg-[#2F5233] hover:text-[#FAF7F0] transition-all">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#A8C09A]/20 flex items-center justify-center mb-6 text-[#A8C09A]">
          <ShoppingCart size={32} />
        </div>
        <h2 className="font-heading text-2xl text-[#2C2C2C] mb-3">Your cart is empty</h2>
        <p className="text-[#6B5D4F] mb-8 max-w-sm mx-auto">Add a product or a kit before checking out.</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-[#2F5233] text-[#FAF7F0] px-6 py-3 rounded-xl font-medium hover:bg-[#4A7C59] transition-colors">
          Browse Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={placeOrder} className="grid lg:grid-cols-[1fr_360px] gap-8">
      {/* Form */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6">
          <h2 className="font-heading text-lg text-[#2C2C2C] mb-5">Contact Information</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">First Name</label>
                <input required value={form.firstName} onChange={set("firstName")} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Last Name</label>
                <input required value={form.lastName} onChange={set("lastName")} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Email</label>
              <input required type="email" value={form.email} onChange={set("email")} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Phone</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set("phone")} className={inputCls} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6">
          <h2 className="font-heading text-lg text-[#2C2C2C] mb-5">Shipping Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Address Line 1</label>
              <input required value={form.address1} onChange={set("address1")} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Address Line 2 (optional)</label>
              <input value={form.address2} onChange={set("address2")} className={inputCls} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">City</label>
                <input required value={form.city} onChange={set("city")} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">State</label>
                <input required value={form.state} onChange={set("state")} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Pincode</label>
                <input required value={form.pincode} onChange={set("pincode")} className={inputCls} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6 h-fit lg:sticky lg:top-24">
        <h2 className="font-heading text-xl text-[#2C2C2C] mb-5">Order Summary</h2>
        <div className="space-y-3 mb-4 max-h-56 overflow-y-auto">
          {items.map(item => (
            <div key={item.slug} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#A8C09A]/20 to-[#F5EFE0] flex items-center justify-center flex-shrink-0 text-[#4A7C59]">
                <Leaf size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#2C2C2C] leading-snug line-clamp-1">{item.name}</p>
                <p className="text-[11px] text-[#6B5D4F]">Qty {item.qty}</p>
              </div>
              <span className="text-sm text-[#2C2C2C]">{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 mb-4 pt-4 border-t border-[#A8C09A]/25 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6B5D4F]">Subtotal</span>
            <span className="text-[#2C2C2C]">{formatPrice(subtotal)}</span>
          </div>
          {bundle.amount > 0 && (
            <div className="flex justify-between text-[#4A7C59]">
              <span>Kit saving ({bundle.label})</span>
              <span>−{formatPrice(bundle.amount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#6B5D4F]">Shipping</span>
            <span className="text-[#4A7C59]">Free</span>
          </div>
        </div>
        <div className="flex justify-between font-heading text-lg mb-5 pt-4 border-t border-[#A8C09A]/25">
          <span className="text-[#2C2C2C]">Total</span>
          <span className="text-[#2F5233]">{formatPrice(total)}</span>
        </div>

        {error && (
          <p className="text-sm text-[#C97B63] bg-[#C97B63]/10 border border-[#C97B63]/25 rounded-xl px-4 py-2.5 mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 w-full bg-[#2F5233] text-[#FAF7F0] py-3.5 rounded-xl font-medium hover:bg-[#4A7C59] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Lock size={15} />
          {submitting ? "Placing order…" : `Place Order · ${formatPrice(total)}`}
        </button>
        <p className="text-[11px] text-center text-[#6B5D4F]/70 mt-3">
          Demo checkout — no real payment is taken.
        </p>
      </div>
    </form>
  );
}
