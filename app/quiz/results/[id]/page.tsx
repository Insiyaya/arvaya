"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Share2, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { DoshaResult, ProductRecommendation } from "@/lib/quiz-engine";
import type { Product } from "@/lib/api";

interface ResultData {
  doshaResult: DoshaResult;
  recommendations: ProductRecommendation[];
}

type RecommendedProduct = Product & { reason: string };

function DoshaMeter({ scores }: { scores: Record<string, number> }) {
  const total = Object.values(scores).reduce((a, b) => a + b, 1);
  const colors: Record<string, string> = {
    vata: "#60a5fa",
    pitta: "#C97B63",
    kapha: "#4A7C59",
  };

  return (
    <div className="space-y-3">
      {Object.entries(scores).map(([dosha, score]) => (
        <div key={dosha}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium capitalize text-[#2C2C2C]">{dosha}</span>
            <span className="text-sm text-[#6B5D4F]">{Math.round((score / total) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#A8C09A]/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(score / total) * 100}%`,
                backgroundColor: colors[dosha],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function QuizResultsPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<ResultData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(`arvaya-result-${id}`);
    if (stored) {
      try { setData(JSON.parse(stored)); } catch {}
    }

    fetch("/api/products")
      .then(r => r.json())
      .then(d => setProducts(d.products ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#A8C09A] border-t-[#2F5233] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B5D4F]">Analysing your Prakriti...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">🌿</div>
          <h2 className="font-heading text-2xl text-[#2F5233] mb-3">Results not found</h2>
          <p className="text-[#6B5D4F] mb-6">This quiz result may have expired. Please take the quiz again to get your personalised kit.</p>
          <Link href="/quiz/start" className="inline-flex items-center gap-2 bg-[#2F5233] text-[#FAF7F0] px-6 py-3 rounded-xl font-medium hover:bg-[#4A7C59] transition-colors">
            Retake the Quiz
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const { doshaResult, recommendations } = data;
  const recommendedProducts: RecommendedProduct[] = recommendations
    .map(rec => {
      const product = products.find(p => p.slug === rec.productId);
      return product ? { ...product, reason: rec.reason } : null;
    })
    .filter(Boolean) as RecommendedProduct[];

  const bundleTotal = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleMrp = recommendedProducts.reduce((sum, p) => sum + p.mrp, 0);
  const bundlePrice = Math.round(bundleMrp * 0.8);
  const savings = bundleMrp - bundlePrice;

  return (
    <div className="bg-[#FAF7F0]">
      {/* Prakriti reveal */}
      <section className="section-padding bg-gradient-to-br from-[#2F5233] to-[#1A3A1F] text-[#FAF7F0]">
        <div className="container-max text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[#A8C09A] mb-3">
            Your Prakriti Result
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-light mb-4">
            {doshaResult.label}
          </h1>
          <p className="text-[#FAF7F0]/80 max-w-2xl mx-auto text-base leading-relaxed mb-8">
            {doshaResult.description}
          </p>

          <div className="max-w-sm mx-auto bg-[#FAF7F0]/8 rounded-2xl p-6 border border-[#FAF7F0]/15">
            <p className="text-sm text-[#A8C09A] mb-4">Your dosha balance</p>
            <DoshaMeter scores={doshaResult.scores} />
          </div>
        </div>
      </section>

      {/* Personalised kit */}
      <section className="section-padding bg-[#FAF7F0]">
        <div className="container-max">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">
              Your Personalised Kit
            </p>
            <h2 className="font-heading text-4xl font-light text-[#2F5233] mb-3">
              {recommendedProducts.length > 0
                ? `${recommendedProducts.length} products chosen for you.`
                : "Products coming soon."}
            </h2>
            <p className="text-[#6B5D4F] max-w-xl mx-auto">
              {recommendedProducts.length > 0
                ? `Dr. Farheen selected each product below based on your ${doshaResult.label} Prakriti, your specific skin and hair concerns, and your lifestyle answers.`
                : "Products will be matched to your Prakriti once added to the database."}
            </p>
          </div>

          {recommendedProducts.length > 0 && (
            <>
              <div className="space-y-6 mb-10">
                {recommendedProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6 flex flex-col sm:flex-row gap-6"
                  >
                    <div className="w-full sm:w-32 h-32 rounded-xl bg-gradient-to-br from-[#A8C09A]/20 to-[#F5EFE0] flex items-center justify-center flex-shrink-0 text-4xl">
                      🌿
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                        <div>
                          <span className="text-xs font-medium text-[#4A7C59] uppercase tracking-wide">
                            Pick #{i + 1}
                          </span>
                          <h3 className="font-heading text-xl text-[#2C2C2C]">{product.name}</h3>
                          {product.sanskritName && (
                            <p className="font-devanagari text-sm text-[#6B5D4F]/60">{product.sanskritName}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-heading text-xl text-[#2F5233]">{formatPrice(product.price)}</p>
                          {product.mrp > product.price && (
                            <p className="text-sm text-[#6B5D4F]/50 line-through">{formatPrice(product.mrp)}</p>
                          )}
                        </div>
                      </div>

                      <div className="bg-[#A8C09A]/12 border border-[#A8C09A]/30 rounded-xl px-4 py-3 mb-3">
                        <p className="text-xs font-medium text-[#2F5233] mb-1 flex items-center gap-1">
                          <CheckCircle size={11} />
                          Why this was chosen for you
                        </p>
                        <p className="text-sm text-[#6B5D4F] leading-relaxed">{product.reason}</p>
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm text-[#2F5233] underline underline-offset-2 hover:text-[#4A7C59] transition-colors"
                      >
                        View full product details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#2F5233] rounded-2xl p-8 text-[#FAF7F0] max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl mb-2">Add Full Kit to Cart</h3>
                  {bundleMrp > 0 && (
                    <p className="text-[#FAF7F0]/70 text-sm">Save {Math.round((savings / bundleMrp) * 100)}% when you buy your personalised kit together</p>
                  )}
                </div>

                <div className="flex items-center justify-between bg-[#FAF7F0]/10 rounded-xl p-4 mb-5">
                  <div>
                    <p className="text-xs text-[#A8C09A] mb-1">Bundle Price</p>
                    <p className="font-heading text-3xl">{formatPrice(bundlePrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#A8C09A] mb-1">vs. buying individually</p>
                    <p className="font-heading text-xl text-[#FAF7F0]/50 line-through">{formatPrice(bundleTotal)}</p>
                    <p className="text-sm text-[#D4A24C] font-medium">You save {formatPrice(savings)}</p>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-[#D4A24C] text-[#1A3A1F] py-4 rounded-xl font-medium hover:bg-[#E8C07A] transition-all hover:-translate-y-0.5 text-base">
                  <ShoppingCart size={18} />
                  Add Kit to Cart — {formatPrice(bundlePrice)}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Save results */}
      <section className="section-padding bg-[#F5EFE0]">
        <div className="container-max">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-light text-[#2F5233] mb-3">
              Save your results
            </h2>
            <p className="text-[#6B5D4F] mb-6 text-sm">
              Enter your email and we&apos;ll send your Prakriti profile and kit to your inbox — so you can refer back anytime.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl border border-[#A8C09A]/50 bg-white text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]"
              />
              <button type="submit" className="bg-[#2F5233] text-[#FAF7F0] px-5 py-3 rounded-xl font-medium text-sm hover:bg-[#4A7C59] transition-colors whitespace-nowrap">
                Save Results
              </button>
            </form>

            <button className="inline-flex items-center gap-2 text-sm text-[#6B5D4F] hover:text-[#2F5233] transition-colors mt-2">
              <Share2 size={14} />
              Share my Prakriti
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding py-8 bg-[#FAF7F0]">
        <div className="container-max text-center">
          <p className="text-sm text-[#6B5D4F]">
            Want to try different answers?{" "}
            <Link href="/quiz/start" className="text-[#2F5233] underline underline-offset-2 hover:text-[#4A7C59]">
              Retake the quiz
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
