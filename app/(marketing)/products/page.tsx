import type { Metadata } from "next";
import Link from "next/link";
import { Filter, SlidersHorizontal, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import AddToCartButton from "@/components/product/AddToCartButton";
import { fetchProducts } from "@/lib/api";
import { STARTER_KIT } from "@/lib/starter-kit";
import { getKitBundlePrice } from "@/lib/quiz-engine";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Products, Ayurvedic Skincare & Haircare",
  description:
    "Browse Arvaya's full range of BAMS doctor-formulated Ayurvedic skincare and haircare products. Filter by dosha, concern, or category.",
};

const CATEGORIES = ["All", "Skin", "Hair", "Wellness"];
const CONCERNS = ["All concerns", "Acne", "Dullness", "Pigmentation", "Aging", "Hair Fall", "Dandruff", "Dryness"];
const DOSHAS = ["All doshas", "Vata", "Pitta", "Kapha"];

export default async function ProductsPage() {
  const products = await fetchProducts();

  // Curated tridoshic starter bundle (resolve its products + bundle price)
  const kitProducts = STARTER_KIT.slugs
    .map(slug => products.find(p => p.slug === slug))
    .filter(Boolean) as typeof products;
  const { bundlePrice, totalMrp, savings } = getKitBundlePrice(STARTER_KIT.slugs, kitProducts);

  return (
    <>
      <section className="section-padding pb-8 bg-[#FAF7F0]">
        <div className="container-max">
          <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">Our Range</p>
          <h1 className="font-heading text-5xl font-light text-[#2F5233] mb-4">
            Every product, <span className="italic">formulated with purpose.</span>
          </h1>
          <p className="text-base text-[#6B5D4F] max-w-2xl">
            Filter by your dosha (constitution), concern, or category. Not sure which is right for
            you?{" "}
            <a href="/quiz" className="text-[#2F5233] underline underline-offset-2 hover:text-[#4A7C59]">
              Take the quiz
            </a>{" "}
            for a personalised routine.
          </p>
        </div>
      </section>

      {/* Dinacharya Starter Ritual — curated tridoshic bundle */}
      {kitProducts.length > 0 && (
        <section className="section-padding pt-0 pb-6 bg-[#FAF7F0]">
          <div className="container-max">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2F5233] via-[#274530] to-[#1A3A1F] text-[#FAF7F0] p-8 md:p-10">
              <div className="grid md:grid-cols-[1fr_auto] gap-8 md:items-center relative z-10">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-[#A8C09A] mb-2">
                    Start Here
                  </p>
                  <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                    <span className="font-devanagari text-2xl text-[#D4A24C] leading-none">{STARTER_KIT.sanskritName}</span>
                    <h2 className="font-heading text-2xl md:text-3xl font-light">{STARTER_KIT.name}</h2>
                  </div>
                  <p className="text-[#FAF7F0]/75 text-sm leading-relaxed max-w-xl mb-4">{STARTER_KIT.blurb}</p>
                  <div className="flex flex-wrap gap-2">
                    {kitProducts.map(p => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="text-xs bg-[#FAF7F0]/10 border border-[#FAF7F0]/20 rounded-full px-3 py-1.5 hover:bg-[#FAF7F0]/15 transition-colors"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="md:text-right">
                  <p className="text-xs text-[#A8C09A] mb-1">Kit price</p>
                  <p className="font-heading text-3xl mb-1">{formatPrice(bundlePrice)}</p>
                  {totalMrp > bundlePrice && (
                    <p className="text-sm mb-4">
                      <span className="text-[#FAF7F0]/50 line-through">{formatPrice(totalMrp)}</span>{" "}
                      <span className="text-[#D4A24C] font-medium">save {formatPrice(savings)}</span>
                    </p>
                  )}
                  <div className="flex flex-col gap-2 md:items-end">
                    <AddToCartButton
                      items={kitProducts.map(p => ({ slug: p.slug, name: p.name, sanskritName: p.sanskritName, price: p.price }))}
                      label="Add kit to cart"
                      iconSize={15}
                      className="inline-flex items-center gap-2 bg-[#D4A24C] text-[#1A3A1F] px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#E8C07A] transition-colors"
                    />
                    <Link
                      href="/quiz"
                      className="inline-flex items-center gap-1.5 text-sm text-[#A8C09A] hover:text-[#FAF7F0] transition-colors"
                    >
                      Personalise mine
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding pt-0 bg-[#FAF7F0]">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-56 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-5 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 mb-5">
                  <SlidersHorizontal size={16} className="text-[#2F5233]" />
                  <span className="font-heading text-sm font-medium text-[#2C2C2C]">Filters</span>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-[#6B5D4F] mb-3">Category</p>
                  <div className="flex flex-col gap-1">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                          cat === "All"
                            ? "bg-[#2F5233] text-[#FAF7F0]"
                            : "text-[#6B5D4F] hover:bg-[#A8C09A]/15 hover:text-[#2F5233]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-[#6B5D4F] mb-3">Concern</p>
                  <div className="flex flex-col gap-1">
                    {CONCERNS.map(c => (
                      <button key={c} className="text-left text-sm px-3 py-2 rounded-xl text-[#6B5D4F] hover:bg-[#A8C09A]/15 hover:text-[#2F5233] transition-colors">
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-[#6B5D4F] mb-3">Dosha</p>
                  <div className="flex flex-col gap-1">
                    {DOSHAS.map(d => (
                      <button key={d} className="text-left text-sm px-3 py-2 rounded-xl text-[#6B5D4F] hover:bg-[#A8C09A]/15 hover:text-[#2F5233] transition-colors">
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[#6B5D4F]">
                  Showing <span className="font-medium text-[#2C2C2C]">{products.length}</span> products
                </p>
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-[#6B5D4F]" />
                  <select className="text-sm text-[#6B5D4F] bg-transparent border-none focus:outline-none cursor-pointer">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                    <option>Best Rated</option>
                  </select>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-24 text-[#6B5D4F]">
                  <p className="text-lg font-heading text-[#2F5233] mb-2">No products yet</p>
                  <p className="text-sm">Products will appear here once added to the database.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
