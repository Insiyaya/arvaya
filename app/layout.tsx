import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Arvaya, Ayurvedic Skincare & Haircare, Doctor Formulated",
    template: "%s | Arvaya Ayurveda",
  },
  description:
    "Personalised Ayurvedic skincare and haircare formulated by Arvaya. Take our free Prakriti quiz for your personalised product kit. 100% natural, chemical-free.",
  keywords: [
    "ayurvedic skincare india",
    "personalized hair care ayurveda",
    "doctor formulated ayurvedic products",
    "BAMS ayurvedic brand",
    "prakriti quiz",
    "dosha skincare",
    "natural skincare india",
  ],
  authors: [{ name: "Arvaya" }],
  creator: "Arvaya Ayurveda",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://arvaya.in",
    siteName: "Arvaya Ayurveda",
    title: "Arvaya, Ayurvedic Skincare & Haircare, Doctor Formulated",
    description:
      "Personalised Ayurvedic skincare and haircare formulated by Arvaya. Take the free Prakriti quiz.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Arvaya Ayurveda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvaya, Doctor Formulated Ayurvedic Skincare",
    description: "Personalised Ayurvedic skincare & haircare. Take your free Prakriti quiz.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://arvaya.in"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FAF7F0] text-[#2C2C2C] antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
