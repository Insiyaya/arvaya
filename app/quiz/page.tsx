import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Lock, Star, Dna, Gift, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Prakriti Quiz — Discover Your Ayurvedic Constitution",
  description:
    "15 questions, 3 minutes. Find your Prakriti (Ayurvedic constitution) and get a doctor-formulated personalised skincare and haircare routine.",
};

const WHAT_YOU_GET = [
  { icon: Dna, title: "Your Prakriti profile", desc: "Vata, Pitta, Kapha, or a combination — explained in plain language" },
  { icon: Gift, title: "Personalised product kit", desc: "3–5 products matched to your constitution, concerns, and climate" },
  { icon: FileText, title: "A reason for every pick", desc: "Arvaya explains why each product was chosen for you specifically" },
  { icon: Mail, title: "Saved results via email", desc: "Your kit and Prakriti profile sent to your inbox to revisit" },
];

export default function QuizLandingPage() {
  return (
    <>
      <section className="section-padding bg-[#FAF7F0]">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4A24C]/15 border border-[#D4A24C]/30 px-3 py-1.5 rounded-full mb-6">
                <Star size={12} className="text-[#D4A24C] fill-[#D4A24C]" />
                <span className="text-xs font-medium text-[#B8882E]">Free · 3 minutes · Saved to your profile</span>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl font-light leading-[1.1] text-[#2F5233] mb-6">
                Discover your<br />
                <span className="italic text-[#4A7C59]">Prakriti.</span>
              </h1>

              <p className="text-lg text-[#6B5D4F] leading-relaxed mb-6 max-w-lg">
                Prakriti (प्रकृति) is your unique Ayurvedic constitution — the combination of Vata, Pitta,
                and Kapha energies you were born with. Understanding it is the foundation of every
                Ayurvedic recommendation Arvaya makes.
              </p>

              <p className="text-base text-[#6B5D4F] leading-relaxed mb-8 max-w-lg">
                This 15-question quiz covers your constitution, skin, hair, lifestyle, and local
                climate. At the end, you get a personalised 3–5 product routine with Arvaya&apos;s
                explanation for each pick.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-[#6B5D4F]">
                  <Clock size={15} className="text-[#4A7C59]" />
                  About 3 minutes
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6B5D4F]">
                  <Lock size={15} className="text-[#4A7C59]" />
                  Private &amp; secure
                </div>
              </div>

              <Link
                href="/quiz/start"
                className="inline-flex items-center gap-2 bg-[#2F5233] text-[#FAF7F0] px-8 py-4 rounded-2xl font-medium hover:bg-[#4A7C59] transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(47,82,51,0.28)] text-base"
              >
                Start the Prakriti Quiz
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Right: what you get */}
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-5">What you get</p>
              {WHAT_YOU_GET.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#A8C09A]/25 hover:shadow-[0_4px_16px_rgba(47,82,51,0.10)] transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#A8C09A]/15 flex items-center justify-center text-[#4A7C59] flex-shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-heading text-base text-[#2C2C2C] mb-1">{title}</p>
                    <p className="text-sm text-[#6B5D4F] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}

              <div className="bg-[#F5EFE0] rounded-2xl p-5 border border-[#D4A24C]/20 mt-4">
                <p className="text-sm text-[#6B5D4F] leading-relaxed">
                  <span className="font-medium text-[#2C2C2C]">A note from Arvaya:</span>{" "}
                  &ldquo;This quiz replicates the first 20 minutes of a clinic consultation. It can&apos;t
                  replace a direct examination, but it can give you the same starting framework used
                  with every patient.&rdquo; — Arvaya
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
