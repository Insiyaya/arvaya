import type { Metadata } from "next";
import Link from "next/link";
import { Search, Leaf } from "lucide-react";
import { fetchBlogPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog, Ayurvedic Skin & Hair Wisdom from Arvaya",
  description:
    "Articles on Ayurvedic skincare, haircare, Ritucharya (seasonal living), and ingredient science, written by Arvaya.",
};

const CATEGORIES = ["All", "Skin Ayurveda", "Hair Ayurveda", "Ritucharya", "Ingredients", "Lifestyle"];

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  return (
    <>
      <section className="section-padding pb-8 bg-[#FAF7F0]">
        <div className="container-max">
          <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">The Blog</p>
          <h1 className="font-heading text-5xl font-light text-[#2F5233] mb-4">
            Ayurvedic wisdom,<br />
            <span className="italic">explained plainly.</span>
          </h1>
          <p className="text-base text-[#6B5D4F] max-w-xl leading-relaxed">
            Arvaya writes about Ayurvedic skincare, haircare, ingredients, and seasonal living
            (Ritucharya), combining classical texts with evidence and practical clinic experience.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0 bg-[#FAF7F0]">
        <div className="container-max">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5D4F]/50" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#A8C09A]/50 bg-white text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233] placeholder:text-[#6B5D4F]/40"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`text-xs font-medium px-3 py-2 rounded-full transition-colors ${
                    cat === "All"
                      ? "bg-[#2F5233] text-[#FAF7F0]"
                      : "bg-[#A8C09A]/20 text-[#2F5233] hover:bg-[#A8C09A]/35 border border-[#A8C09A]/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {!featured ? (
            <div className="text-center py-24 text-[#6B5D4F]">
              <p className="text-lg font-heading text-[#2F5233] mb-2">No articles yet</p>
              <p className="text-sm">Articles will appear here once added to the database.</p>
            </div>
          ) : (
            <>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block bg-white rounded-[2rem] border border-[#A8C09A]/25 overflow-hidden hover:shadow-[0_16px_48px_rgba(47,82,51,0.14)] transition-all duration-300 hover:-translate-y-1 mb-8"
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto min-h-[260px] bg-gradient-to-br from-[#A8C09A]/30 to-[#F5EFE0] flex items-center justify-center text-[#4A7C59]">
                    <Leaf size={64} strokeWidth={1.25} />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium bg-[#D4A24C]/15 text-[#B8882E] px-3 py-1 rounded-full border border-[#D4A24C]/30">
                        Featured
                      </span>
                      {featured.category && (
                        <span className="text-xs font-medium bg-[#A8C09A]/20 text-[#2F5233] px-2 py-1 rounded-full">
                          {featured.category}
                        </span>
                      )}
                      {featured.readTime && (
                        <span className="text-xs text-[#6B5D4F]">{featured.readTime} min read</span>
                      )}
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl text-[#2C2C2C] mb-3 group-hover:text-[#2F5233] transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-[#6B5D4F] leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between">
                      {featured.author && (
                        <p className="text-sm font-medium text-[#4A7C59]">{featured.author}</p>
                      )}
                      {featured.publishedAt && (
                        <p className="text-xs text-[#6B5D4F]">
                          {new Date(featured.publishedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(post => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl border border-[#A8C09A]/25 overflow-hidden hover:shadow-[0_8px_32px_rgba(47,82,51,0.12)] transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-[16/9] bg-gradient-to-br from-[#A8C09A]/20 to-[#F5EFE0] flex items-center justify-center text-[#4A7C59]">
                        <Leaf size={44} strokeWidth={1.25} />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {post.category && (
                            <span className="text-xs font-medium bg-[#A8C09A]/20 text-[#2F5233] px-2 py-1 rounded-full">
                              {post.category}
                            </span>
                          )}
                          {post.readTime && (
                            <span className="text-xs text-[#6B5D4F]">{post.readTime} min read</span>
                          )}
                        </div>
                        <h3 className="font-heading text-lg text-[#2C2C2C] mb-2 group-hover:text-[#2F5233] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-[#6B5D4F] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-[#A8C09A]/20">
                          {post.author && (
                            <p className="text-xs font-medium text-[#4A7C59]">{post.author}</p>
                          )}
                          {post.publishedAt && (
                            <p className="text-xs text-[#6B5D4F]">
                              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
