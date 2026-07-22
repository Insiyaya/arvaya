import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Users, Leaf } from "lucide-react";
import { fetchTimeline, fetchCredentials, fetchPillars, type TimelineEntry, type Credential, type BrandPillar } from "@/lib/api";
import VisionLine from "@/components/VisionLine";

export const metadata: Metadata = {
  title: "About — Meet Arvaya",
  description:
    "The story behind Arvaya — formulated from clinical practice. Learn our philosophy of personalised, classical Ayurvedic skincare.",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Award: <Award size={20} />,
  BookOpen: <BookOpen size={20} />,
  Users: <Users size={20} />,
  Leaf: <Leaf size={20} />,
};

function CredentialIcon({ name }: { name?: string | null }) {
  if (!name || !ICON_MAP[name]) return <Award size={20} />;
  return <>{ICON_MAP[name]}</>;
}

export default async function AboutPage() {
  const [timeline, credentials, pillars] = await Promise.all([
    fetchTimeline(),
    fetchCredentials(),
    fetchPillars(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-[#FAF7F0] pt-8">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-4">Our Story</p>
            <h1 className="font-heading text-5xl md:text-6xl font-light leading-[1.1] text-[#2F5233] mb-6">
              Meet Arvaya —<br />
              <span className="italic">your family&apos;s Ayurvedic doctor.</span>
            </h1>
            <p className="text-xl text-[#6B5D4F] leading-relaxed max-w-2xl">
              Arvaya began in a clinic, not a boardroom. Formulating started when patients kept
              asking for what was being prescribed to them. What began as personalised preparations
              for individual patients became a brand built on one principle: classical Ayurvedic
              care, accessible to everyone.
            </p>

            {/* Vision line — shared with the homepage */}
            <div className="mt-8 pl-5 border-l-[3px] border-[#D4A24C] max-w-2xl">
              <VisionLine className="font-heading text-3xl md:text-[2.5rem] font-medium text-[#2F5233] leading-[1.15] tracking-tight" />
            </div>
          </div>
        </div>
      </section>

      {/* Doctor full story */}
      <section className="section-padding bg-[#F5EFE0]">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="aspect-[3/4] rounded-[2rem] bg-gradient-to-br from-[#A8C09A]/30 to-[#F5EFE0] flex items-center justify-center border border-[#A8C09A]/30 shadow-[0_32px_80px_rgba(47,82,51,0.15)]">
                <div className="text-center p-8">
                  <div className="flex justify-center mb-4 text-[#4A7C59]"><Leaf size={72} strokeWidth={1.25} /></div>
                  <p className="font-heading text-2xl text-[#2F5233] mb-1">Arvaya</p>
                  <p className="text-sm text-[#6B5D4F] mb-4">Doctor-Formulated Ayurveda</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["SDM College, Udupi", "Clinical Practice", "Trichology"].map(tag => (
                      <span key={tag} className="text-xs bg-[#2F5233]/10 text-[#2F5233] px-3 py-1 rounded-full border border-[#2F5233]/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-[#6B5D4F] leading-relaxed">
              <p className="text-lg">
                Arvaya&apos;s founders grew up watching a grandmother make her own hair oil every month —
                spending a Sunday crushing herbs, warming oils, and straining the mixture through a
                muslin cloth. Her hair, well into her seventies, was remarkable. It seemed like
                everyone should know this. Most didn&apos;t.
              </p>
              <p>
                Through BAMS training at SDM College of Ayurveda in Udupi, it became clear how
                deeply this knowledge ran — and how badly it had been misrepresented in the market.
                The &apos;Ayurvedic&apos; products found in stores had two or three token herbs in a base of
                petroleum, parabens, and synthetic fragrance. That was not what the Charaka Samhita
                described.
              </p>
              <p>
                After completing that degree and a diploma in Trichology, a clinic opened —
                focused on skin and hair conditions, problems that biomedicine often
                addresses symptomatically but Ayurveda approaches at the root cause. Over twelve
                years, thousands of patients came through with concerns ranging from Pitta-type hair
                fall triggered by stress, to Kapha-dominant acne that no cleanser was touching.
              </p>
              <p>
                In 2018, patients started going home with formulations prepared in-house — an
                Ashwagandha night cream for Vata skin, a Bhringraj oil calibrated for Pitta-driven
                hair fall. The results were consistent. The requests multiplied. By 2021, there was
                enough validation — and enough demand — to launch Arvaya.
              </p>
              <p>
                Every product is still formulated by Arvaya. Every quiz recommendation is based on
                the same logic used in clinic. The quiz cannot replace a consultation, but it can
                give you the next best thing: a routine grounded in your specific constitution and
                concerns, rather than a one-size-fits-all shelf product.
              </p>
              <div className="pt-4 border-t border-[#A8C09A]/30">
                <p className="font-heading text-lg text-[#2F5233] italic">
                  &ldquo;Your skin is not broken. It just needs to be understood.&rdquo;
                </p>
                <p className="text-sm text-[#6B5D4F]/70 mt-1">— Arvaya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-[#FAF7F0]">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">Credentials</p>
            <h2 className="font-heading text-4xl font-light text-[#2F5233]">
              Qualifications that <span className="italic">matter.</span>
            </h2>
          </div>
          {credentials.length === 0 ? (
            <p className="text-center text-sm text-[#6B5D4F]">Credentials will appear here once added.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {credentials.map((c: Credential) => (
                <div key={c.id} className="flex gap-4 bg-white rounded-2xl p-6 border border-[#A8C09A]/25 hover:shadow-[0_8px_32px_rgba(47,82,51,0.10)] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#D4A24C]/15 flex items-center justify-center text-[#D4A24C] flex-shrink-0">
                    <CredentialIcon name={c.iconName} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base text-[#2C2C2C] mb-1">{c.title}</h3>
                    <p className="text-sm text-[#6B5D4F] leading-relaxed">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="section-padding bg-[#F5EFE0]">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">Brand Philosophy</p>
            <h2 className="font-heading text-4xl font-light text-[#2F5233]">Three pillars, one purpose.</h2>
          </div>
          {pillars.length === 0 ? (
            <p className="text-center text-sm text-[#6B5D4F]">Brand pillars will appear here once added.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((p: BrandPillar) => (
                <div key={p.id} className="bg-white rounded-2xl p-8 border border-[#A8C09A]/25">
                  <span className="font-heading text-5xl font-light text-[#A8C09A]">{p.number}</span>
                  <h3 className="font-heading text-2xl text-[#2F5233] mt-4 mb-3">{p.title}</h3>
                  <p className="text-sm text-[#6B5D4F] leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[#FAF7F0]">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">Our Journey</p>
            <h2 className="font-heading text-4xl font-light text-[#2F5233]">How we got here.</h2>
          </div>
          {timeline.length === 0 ? (
            <p className="text-center text-sm text-[#6B5D4F]">Timeline will appear here once added.</p>
          ) : (
            <div className="max-w-2xl mx-auto">
              {timeline.map((entry: TimelineEntry, i: number) => (
                <div key={entry.id} className="flex gap-6 items-start mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#2F5233] text-[#FAF7F0] flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {entry.year.slice(2)}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-0.5 h-8 bg-[#A8C09A]/40 mt-2" />
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="text-xs font-medium text-[#4A7C59] mb-1">{entry.year}</p>
                    <p className="text-[#2C2C2C] leading-relaxed">{entry.event}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#2F5233]">
        <div className="container-max text-center">
          <h2 className="font-heading text-4xl font-light text-[#FAF7F0] mb-4">
            Ready to know your Prakriti?
          </h2>
          <p className="text-[#FAF7F0]/70 mb-8 max-w-md mx-auto">
            Take Arvaya&apos;s 3-minute quiz and get a personalised product routine — the same
            approach used in clinic.
          </p>
          <Link href="/quiz" className="inline-flex items-center gap-2 bg-[#D4A24C] text-[#1A3A1F] px-8 py-4 rounded-2xl font-medium hover:bg-[#E8C07A] transition-all hover:-translate-y-0.5">
            Start Your Free Quiz
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
