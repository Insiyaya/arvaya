import Link from "next/link";
import { Leaf, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Shop: [
    { href: "/products?category=skin", label: "Skincare" },
    { href: "/products?category=hair", label: "Haircare" },
    { href: "/products?category=wellness", label: "Wellness" },
    { href: "/products?featured=true", label: "Bestsellers" },
  ],
  Learn: [
    { href: "/quiz", label: "Take the Quiz" },
    { href: "/blog", label: "Blog & Articles" },
    { href: "/about", label: "Our Story" },
    { href: "/blog?category=ingredients", label: "Ingredient Guide" },
  ],
  Support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping Policy" },
    { href: "/returns", label: "Returns & Refunds" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1F4326] to-[#1A3A1F] text-[#FAF7F0]/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-full bg-[#A8C09A]/20 border border-[#A8C09A]/30 flex items-center justify-center group-hover:bg-[#A8C09A]/30 transition-colors">
                <Leaf size={16} className="text-[#A8C09A]" />
              </div>
              <span className="font-heading text-xl text-[#FAF7F0]">Arvaya</span>
            </Link>

            <p className="text-sm leading-relaxed mb-4 text-[#FAF7F0]/60">
              Doctor-formulated Ayurvedic skincare and haircare, rooted in classical texts and personalised to your unique Prakriti (constitution). Founded by Dr. Farheen Husain, BAMS.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                {
                  label: "Instagram",
                  href: "#",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  href: "#",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "#",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                    </svg>
                  ),
                },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#FAF7F0]/10 flex items-center justify-center hover:bg-[#A8C09A]/20 transition-colors text-[#FAF7F0]/70 hover:text-[#A8C09A]"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading text-sm font-medium text-[#FAF7F0] mb-4 tracking-wide">{category}</h3>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[#FAF7F0]/60 hover:text-[#A8C09A] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="mt-12 pt-8 border-t border-[#FAF7F0]/10">
          <a
            href="mailto:hello@arvaya.in"
            className="flex items-center gap-2 text-sm text-[#FAF7F0]/60 hover:text-[#A8C09A] transition-colors w-fit"
          >
            <Mail size={14} className="flex-shrink-0" />
            hello@arvaya.in
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FAF7F0]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#FAF7F0]/40">
            © {new Date().getFullYear()} Arvaya. All rights reserved.
          </p>
          <p className="text-xs text-[#FAF7F0]/40">
            Products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Use"].map(label => (
              <Link
                key={label}
                href="#"
                className="text-xs text-[#FAF7F0]/40 hover:text-[#A8C09A] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
