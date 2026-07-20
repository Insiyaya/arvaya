import type { Metadata } from "next";
import { Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { fetchProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "All Products — Ayurvedic Skincare & Haircare",
  description:
    "Browse Arvaya's full range of BAMS doctor-formulated Ayurvedic skincare and haircare products. Filter by dosha, concern, or category.",
};

const CATEGORIES = ["All", "Skin", "Hair", "Wellness"];
const CONCERNS = ["All concerns", "Acne", "Dullness", "Pigmentation", "Aging", "Hair Fall", "Dandruff", "Dryness"];
const DOSHAS = ["All doshas", "Vata", "Pitta", "Kapha"];

export default async function ProductsPage() {
  const products = await fetchProducts();

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
