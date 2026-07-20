import type { Metadata } from "next";
import Link from "next/link";
import { Star, ShoppingCart, ArrowRight, ChevronLeft, CheckCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/product/ProductCard";
import { fetchProduct, fetchProducts } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — Arvaya Ayurveda`,
    description: product.shortDesc ?? undefined,
  };
}

const TABS = ["Benefits", "Ingredients", "How to Use", "Doctor's Note"] as const;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    fetchProduct(slug),
    fetchProducts(),
  ]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl text-[#2F5233] mb-4">Product not found</p>
          <Link href="/products" className="text-sm text-[#4A7C59] underline">Back to products</Link>
        </div>
      </div>
    );
  }

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;
  const related = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDesc,
    brand: { "@type": "Brand", name: "Arvaya" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    ...(product.rating != null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-padding bg-[#FAF7F0]">
        <div className="container-max">
          <div className="flex items-center gap-2 text-xs text-[#6B5D4F] mb-8">
            <Link href="/products" className="hover:text-[#2F5233] transition-colors flex items-center gap-1">
              <ChevronLeft size={14} />
              All Products
            </Link>
            <span>/</span>
            <span className="text-[#2C2C2C]">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-[#A8C09A]/20 via-[#F5EFE0] to-[#D4A24C]/15 flex items-center justify-center border border-[#A8C09A]/25 shadow-[0_16px_48px_rgba(47,82,51,0.12)] mb-4">
                <div className="text-center">
                  <div className="text-8xl mb-3">🌿</div>
                  {product.sanskritName && (
                    <p className="font-devanagari text-xl text-[#2F5233]/60">{product.sanskritName}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-[#A8C09A]/15 to-[#F5EFE0] border border-[#A8C09A]/20 flex items-center justify-center cursor-pointer hover:border-[#2F5233]/40 transition-colors">
                    <span className="text-2xl">🌿</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex gap-2 flex-wrap mb-3">
                {product.doshas.map(d => (
                  <Badge key={d} variant={`dosha-${d}` as "dosha-vata" | "dosha-pitta" | "dosha-kapha"}>
                    {d.charAt(0).toUpperCase() + d.slice(1)} skin
                  </Badge>
                ))}
                <Badge variant="category">{product.category}</Badge>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-light text-[#2C2C2C] mb-1">
                {product.name}
              </h1>
              {product.sanskritName && (
                <p className="font-devanagari text-lg text-[#6B5D4F]/70 mb-4">{product.sanskritName}</p>
              )}

              {product.rating != null && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating!) ? "fill-[#D4A24C] text-[#D4A24C]" : "text-[#A8C09A]"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[#2C2C2C]">{product.rating}</span>
                  <span className="text-sm text-[#6B5D4F]">({product.reviewCount} reviews)</span>
                </div>
              )}

              {product.shortDesc && (
                <p className="text-[#6B5D4F] leading-relaxed mb-6">{product.shortDesc}</p>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-heading text-3xl font-light text-[#2F5233]">
                  {formatPrice(product.price)}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-lg text-[#6B5D4F]/50 line-through">{formatPrice(product.mrp)}</span>
                    <span className="text-sm font-medium text-[#C97B63] bg-[#C97B63]/10 px-2 py-0.5 rounded-full">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-3 mb-6">
                <div className="flex items-center border border-[#A8C09A]/50 rounded-xl overflow-hidden">
                  <button className="px-4 py-3 text-[#6B5D4F] hover:bg-[#A8C09A]/15 transition-colors">−</button>
                  <span className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center">1</span>
                  <button className="px-4 py-3 text-[#6B5D4F] hover:bg-[#A8C09A]/15 transition-colors">+</button>
                </div>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#2F5233] text-[#FAF7F0] py-3 rounded-xl font-medium hover:bg-[#4A7C59] transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(47,82,51,0.25)]">
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>

              <div className="flex flex-col gap-2 pt-5 border-t border-[#A8C09A]/25">
                {[
                  "Formulated by Dr. Farheen Husain, BAMS",
                  "100% natural ingredients",
                  "No parabens, sulfates, or synthetic fragrance",
                  "Free shipping above ₹999",
                ].map(point => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#4A7C59] flex-shrink-0" />
                    <span className="text-sm text-[#6B5D4F]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0 bg-[#FAF7F0]">
        <div className="container-max">
          <div className="max-w-3xl">
            <div className="flex gap-2 flex-wrap mb-8 border-b border-[#A8C09A]/30 pb-0">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-0.5 ${
                    i === 0
                      ? "border-[#2F5233] text-[#2F5233]"
                      : "border-transparent text-[#6B5D4F] hover:text-[#2F5233]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {product.benefits.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-heading text-xl text-[#2F5233] mb-4">Key Benefits</h3>
                {product.benefits.map(benefit => (
                  <div key={benefit} className="flex items-start gap-3 p-4 bg-[#A8C09A]/10 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-[#2F5233] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={12} className="text-[#FAF7F0]" />
                    </div>
                    <p className="text-sm text-[#6B5D4F] leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#6B5D4F]">Benefits will be listed here once added.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F5EFE0]">
        <div className="container-max">
          <div className="bg-[#2F5233] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-[#FAF7F0]">
              <p className="font-heading text-xl mb-1">Not sure if this product is right for you?</p>
              <p className="text-[#FAF7F0]/70 text-sm">
                Take the Prakriti quiz. It takes 3 minutes and tells you exactly which products suit
                your constitution and concerns.
              </p>
            </div>
            <Link href="/quiz" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#D4A24C] text-[#1A3A1F] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#E8C07A] transition-all">
              Take the Quiz
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-[#FAF7F0]">
          <div className="container-max">
            <h2 className="font-heading text-3xl font-light text-[#2F5233] mb-8">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
