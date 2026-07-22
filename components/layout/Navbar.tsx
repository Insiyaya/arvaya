"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, Menu, X, Leaf, User, LogOut } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/quiz", label: "Take the Quiz" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-[#FAF7F0]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(47,82,51,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-[#2F5233] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Leaf size={16} className="text-[#FAF7F0]" />
              </div>
              <span className="font-heading text-xl font-medium text-[#2F5233] tracking-tight">
                Arvaya
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                const isQuiz = href === "/quiz";
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isQuiz
                        ? "bg-[#2F5233] text-[#FAF7F0] hover:bg-[#4A7C59] ml-2"
                        : isActive
                        ? "text-[#2F5233] bg-[#A8C09A]/20"
                        : "text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/15"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Account + Cart + mobile toggle */}
            <div className="flex items-center gap-2">
              {status === "authenticated" ? (
                <div className="hidden md:flex items-center gap-1">
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/20 transition-colors"
                  >
                    <User size={17} />
                    {session.user?.name?.split(" ")[0] || "Account"}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    aria-label="Sign out"
                    className="p-2 rounded-full text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/20 transition-colors"
                  >
                    <LogOut size={17} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/20 transition-colors"
                >
                  <User size={17} />
                  Login
                </Link>
              )}

              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="relative p-2 rounded-full text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/20 transition-colors"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C97B63] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              <button
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle menu"
                className="md:hidden p-2 rounded-full text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/20 transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#FAF7F0]/98 border-t border-[#A8C09A]/30 px-4 py-4">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                const isQuiz = href === "/quiz";
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isQuiz
                        ? "bg-[#2F5233] text-[#FAF7F0] text-center mt-2"
                        : isActive
                        ? "text-[#2F5233] bg-[#A8C09A]/20"
                        : "text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/10"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}

              <div className="border-t border-[#A8C09A]/20 mt-2 pt-2">
                {status === "authenticated" ? (
                  <>
                    <Link
                      href="/account"
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        pathname === "/account"
                          ? "text-[#2F5233] bg-[#A8C09A]/20"
                          : "text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/10"
                      }`}
                    >
                      <User size={16} />
                      My Account
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/10 transition-all"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/10 transition-all"
                  >
                    <User size={16} />
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}
