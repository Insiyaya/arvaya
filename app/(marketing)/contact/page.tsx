import type { Metadata } from "next";
import { MessageCircle, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Arvaya. Questions about your Prakriti, our products, or orders — we're here. Chat on WhatsApp for fastest response.",
};

const FAQS = [
  {
    q: "How do I know which products are right for my skin?",
    a: "Take our free Prakriti quiz — 15 questions, 3 minutes. The quiz matches your constitution (Prakriti), skin type, concerns, and lifestyle to a personalised 3–5 product routine formulated by Dr. Farheen Husain, BAMS.",
  },
  {
    q: "Are your products safe for sensitive skin?",
    a: "All Arvaya products are free from parabens, sulfates, synthetic fragrances, and mineral oil. They are formulated for Indian skin and climate. However, we always recommend a patch test before full application. If you have a known allergy to any ingredient, please check the ingredient list or contact us.",
  },
  {
    q: "How long before I see results?",
    a: "Ayurvedic formulations work with your body's natural cycles. Most customers report visible improvement in 4–8 weeks with consistent use. Results depend on your specific concern, constitution, and how faithfully you follow the routine.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes, we ship pan-India via trusted courier partners. Free shipping on orders above ₹999. Standard delivery is 4–7 business days; express options available at checkout.",
  },
  {
    q: "Can I use your products if I'm pregnant or breastfeeding?",
    a: "We recommend consulting your doctor before introducing any new skincare during pregnancy or breastfeeding. While our ingredients are natural, some Ayurvedic herbs are traditionally avoided during these periods. Please share the ingredient list with your physician.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-day return window for unopened products. For opened products, we offer a 30-day satisfaction guarantee — if you've followed your personalised routine for 30 days and are not satisfied, contact us for a resolution.",
  },
  {
    q: "Are your products tested on animals?",
    a: "Arvaya is 100% cruelty-free. We do not test on animals, and we do not work with suppliers who do.",
  },
  {
    q: "Can I consult Dr. Farheen Husain directly?",
    a: "Dr. Husain offers limited online consultations through the Arvaya platform for complex skin and hair concerns. Contact us via WhatsApp or email and we'll check availability and fees.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding pb-8 bg-[#FAF7F0]">
        <div className="container-max">
          <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">Get in Touch</p>
          <h1 className="font-heading text-5xl font-light text-[#2F5233] mb-4">
            We&apos;re here to help.
          </h1>
          <p className="text-lg text-[#6B5D4F] max-w-xl leading-relaxed">
            Questions about your Prakriti, a product, or your order? Our team (and sometimes Dr.
            Farheen herself) will respond within 24 hours. WhatsApp is fastest.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0 bg-[#FAF7F0]">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-8 shadow-[0_4px_24px_rgba(47,82,51,0.08)]">
                <h2 className="font-heading text-2xl text-[#2F5233] mb-6">Send us a message</h2>
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Ananya Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233] bg-white placeholder:text-[#6B5D4F]/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233] bg-white placeholder:text-[#6B5D4F]/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="concern" className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                      Type of Query
                    </label>
                    <select
                      id="concern"
                      className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233] bg-white appearance-none"
                    >
                      <option value="">Select a topic...</option>
                      <option>Product recommendation</option>
                      <option>Order / shipping query</option>
                      <option>Return or refund</option>
                      <option>Quiz or Prakriti question</option>
                      <option>Wholesale / bulk inquiry</option>
                      <option>Press / collaboration</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 rounded-xl border border-[#A8C09A]/50 text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233] bg-white placeholder:text-[#6B5D4F]/40 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2F5233] text-[#FAF7F0] py-3.5 rounded-xl font-medium hover:bg-[#4A7C59] transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(47,82,51,0.25)]"
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-[#6B5D4F]/60 text-center">
                    We respond within 24 hours on business days.
                  </p>
                </form>
              </div>
            </div>

            {/* Contact info + WhatsApp */}
            <div className="space-y-6">
              {/* WhatsApp CTA */}
              <div className="bg-[#2F5233] rounded-2xl p-6 text-[#FAF7F0]">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center mb-4">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <h3 className="font-heading text-xl mb-2">Chat on WhatsApp</h3>
                <p className="text-[#FAF7F0]/70 text-sm leading-relaxed mb-5">
                  For the fastest response — product queries, order tracking, or a quick question for
                  Dr. Farheen — WhatsApp is the best way to reach us.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Arvaya%21%20I%20have%20a%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#1ea855] transition-colors"
                >
                  <MessageCircle size={16} />
                  Start WhatsApp Chat
                </a>
              </div>

              {/* Contact details */}
              <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6">
                <h3 className="font-heading text-lg text-[#2F5233] mb-5">Other ways to reach us</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "hello@arvaya.in", href: "mailto:hello@arvaya.in" },
                    { icon: Clock, label: "Hours", value: "Mon–Sat: 9 AM – 6 PM IST", href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#A8C09A]/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[#2F5233]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#6B5D4F]/70 uppercase tracking-wide mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-[#2C2C2C] hover:text-[#2F5233] transition-colors">{value}</a>
                        ) : (
                          <p className="text-sm text-[#2C2C2C]">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#F5EFE0]">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">FAQ</p>
            <h2 className="font-heading text-4xl font-light text-[#2F5233]">Common questions.</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl border border-[#A8C09A]/25 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer font-heading text-base text-[#2C2C2C] hover:text-[#2F5233] transition-colors list-none">
                  {q}
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8C09A]/20 flex items-center justify-center text-[#2F5233] font-body text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-sm text-[#6B5D4F] leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
