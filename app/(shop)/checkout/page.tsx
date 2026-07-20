import type { Metadata } from "next";
import { Lock, CreditCard } from "lucide-react";

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

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6">
              <h2 className="font-heading text-lg text-[#2C2C2C] mb-5">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Phone</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233] placeholder:text-[#6B5D4F]/40" />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6">
              <h2 className="font-heading text-lg text-[#2C2C2C] mb-5">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Address Line 1</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Address Line 2 (optional)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">City</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">State</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">PIN Code</label>
                  <input type="text" maxLength={6} className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6">
              <div className="flex items-center gap-2 mb-5">
                <h2 className="font-heading text-lg text-[#2C2C2C]">Payment</h2>
                <CreditCard size={16} className="text-[#6B5D4F]" />
              </div>
              <div className="bg-[#A8C09A]/10 border border-[#A8C09A]/30 rounded-xl p-4 text-sm text-[#6B5D4F] leading-relaxed">
                <p>Payments are processed securely via Razorpay. We accept UPI, Cards, NetBanking, and Wallets.</p>
                <p className="mt-2 text-xs text-[#6B5D4F]/70">Your card details are never stored on our servers.</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6 sticky top-24">
              <h2 className="font-heading text-xl text-[#2C2C2C] mb-5">Order Summary</h2>
              <div className="text-sm text-[#6B5D4F] text-center py-6 border border-dashed border-[#A8C09A]/40 rounded-xl mb-5">
                Cart is empty. <a href="/products" className="text-[#2F5233] underline">Add products</a>
              </div>
              <button disabled className="w-full bg-[#2F5233] text-[#FAF7F0] py-3.5 rounded-xl font-medium opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
                <Lock size={15} />
                Pay Securely via Razorpay
              </button>
              <p className="text-xs text-[#6B5D4F]/60 text-center mt-3">By placing an order you agree to our Terms of Service.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
