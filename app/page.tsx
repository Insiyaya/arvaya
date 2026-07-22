import Link from "next/link";
import {
  ArrowRight,
  Star,
  CheckCircle,
  ChevronRight,
  Mail,
  Leaf,
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import {
  fetchProducts,
  fetchTestimonials,
  fetchBlogPosts,
  type Product,
  type Testimonial,
  type BlogPost,
} from "@/lib/api";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/StaggerReveal";
import WhyUsPinned from "@/components/home/WhyUsPinned";
import HowItWorksPinned from "@/components/home/HowItWorksPinned";
import HeroVisual from "@/components/home/HeroVisual";
import Typewriter from "@/components/home/Typewriter";

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#FAF7F0] to-[#F5EFE0] pb-16 md:pb-24">
      {/* Animated background orbs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#A8C09A]/12 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#D4A24C]/8 blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none animate-[pulse_10s_ease-in-out_infinite_2s]" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-[#A8C09A]/6 blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left, text */}
          <div className="max-w-xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em] text-[#4A7C59] mb-5"
              style={{ animation: "fade-up 0.7s 0.05s ease-out both" }}
            >
              Recipes from a doctor&apos;s mind
            </p>

            <h1
              className="font-heading text-5xl md:text-6xl lg:text-[4.5rem] font-light leading-[1.1] tracking-tight text-[#2F5233] mb-6"
              style={{ animation: "fade-up 0.7s 0.1s ease-out both" }}
            >
              <span className="font-devanagari font-medium">आयुर्वेद</span>,{" "}
              <span className="italic text-[#4A7C59]">personalised</span>
              <br />
              for your{" "}
              <Typewriter
                words={["वात", "पित्त", "कफ", "प्रकृति"]}
                className="font-devanagari font-medium text-[#4A7C59]"
              />
            </h1>

            <p
              className="text-lg text-[#6B5D4F] leading-relaxed mb-8 max-w-lg"
              style={{ animation: "fade-up 0.7s 0.2s ease-out both" }}
            >
              Every skin and hair concern has roots in your unique प्रकृति (Prakriti),
              your Ayurvedic constitution. Formulations born in a doctor&apos;s clinic,
              matched to <em>you</em>, never a generic skin type.
            </p>

            <div
              className="flex flex-wrap gap-3 mb-10"
              style={{ animation: "fade-up 0.7s 0.3s ease-out both" }}
            >
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#4A7C59] to-[#2F5233] text-[#FAF7F0] px-7 py-3.5 rounded-2xl font-medium text-sm hover:from-[#5C9068] hover:to-[#3A6440] transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(47,82,51,0.28)]"
              >
                Take the Free Quiz
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border border-[#2F5233] text-[#2F5233] px-7 py-3.5 rounded-2xl font-medium text-sm hover:bg-[#2F5233] hover:text-[#FAF7F0] transition-all hover:-translate-y-0.5"
              >
                Shop Products
              </Link>
            </div>

          </div>

          {/* Right, layered visual */}
          <div className="relative lg:h-[540px] flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* WhyUsSection replaced by <WhyUsPinned /> (sticky scroll, imported above) */

/* ─── Doctor ──────────────────────────────────────────────────────────────── */
function DoctorSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-[#F5EFE0] via-[#FAF7F0] to-[#FAF7F0]">
      <div className="container-max">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[#2F5233] via-[#274530] to-[#1A3A1F] rounded-[2rem] p-8 md:p-12 text-[#FAF7F0] relative overflow-hidden">
            <div className="absolute right-8 top-8 opacity-10 pointer-events-none select-none">
              <Leaf size={200} strokeWidth={0.75} />
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#A8C09A]/20 border-2 border-[#A8C09A]/30 flex items-center justify-center flex-shrink-0">
                  <Leaf size={44} className="text-[#A8C09A]" />
                </div>
                <div>
                  <p className="font-heading text-2xl md:text-3xl text-[#FAF7F0]">
                    Arvaya
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#A8C09A] mb-4">
                  Our Origin
                </p>
                <p className="text-[#FAF7F0]/85 leading-relaxed mb-6">
                  &ldquo;Arvaya started because patients kept asking where they could buy the
                  formulations being recommended to them. The mass-market options were full of chemicals, and
                  the &lsquo;Ayurvedic&rsquo; brands weren&apos;t actually rooted in classical texts. So we
                  made what we&apos;d give our own families.&rdquo;
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#D4A24C] hover:text-[#E8C07A] transition-colors"
                >
                  Read our full story
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* HowItWorksSection replaced by <HowItWorksPinned /> (sticky scroll, imported above) */

/* ─── Featured Products ───────────────────────────────────────────────────── */
function FeaturedProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="section-padding bg-gradient-to-b from-[#FAF7F0] to-[#F5EFE0]">
      <div className="container-max">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">
              Our Products
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#2F5233]">
              Classical formulas,
              <br />
              <span className="italic">modern results.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#2F5233] hover:text-[#4A7C59] transition-colors"
          >
            View all <ChevronRight size={16} />
          </Link>
        </ScrollReveal>

        {products.length === 0 ? (
          <ScrollReveal className="text-center py-16 text-[#6B5D4F]">Products coming soon.</ScrollReveal>
        ) : (
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard {...product} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        )}
      </div>
    </section>
  );
}

/* ─── Testimonials ────────────────────────────────────────────────────────── */
function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-gradient-to-br from-[#2F5233] via-[#264a2d] to-[#1A3A1F] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1A3A1F]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#4A7C59]/20 blur-3xl pointer-events-none" />
      <div className="container-max relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-[#A8C09A] mb-3">
            Real Results
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#FAF7F0] mb-4">
            What our customers say.
          </h2>
          <p className="text-[#FAF7F0]/70 text-base max-w-md mx-auto">
            Every review is from a verified purchaser who took the quiz and followed their
            personalised routine.
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <div className="h-full bg-[#FAF7F0]/5 border border-[#FAF7F0]/10 rounded-2xl p-6 hover:bg-[#FAF7F0]/10 transition-colors">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-[#D4A24C] text-[#D4A24C]" />
                  ))}
                </div>
                <h3 className="font-heading text-lg text-[#FAF7F0] mb-2">{t.title}</h3>
                <p className="text-sm text-[#FAF7F0]/70 leading-relaxed mb-4 line-clamp-4">{t.body}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#FAF7F0]/10">
                  <div>
                    <p className="text-sm font-medium text-[#FAF7F0]">{t.name}</p>
                    <p className="text-xs text-[#A8C09A]">{t.location}</p>
                  </div>
                  {t.verified && (
                    <div className="flex items-center gap-1 text-[#A8C09A]">
                      <CheckCircle size={12} />
                      <span className="text-[10px]">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ─── Blog ────────────────────────────────────────────────────────────────── */
function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-[#F5EFE0] via-[#FAF7F0] to-[#FAF7F0]">
      <div className="container-max">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">
              The Arvaya Blog
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#2F5233]">
              Learn from Arvaya.
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#2F5233] hover:text-[#4A7C59] transition-colors"
          >
            All articles <ChevronRight size={16} />
          </Link>
        </ScrollReveal>

        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full bg-white rounded-2xl border border-[#A8C09A]/25 overflow-hidden hover:shadow-[0_8px_32px_rgba(47,82,51,0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-[#A8C09A]/20 to-[#F5EFE0] flex items-center justify-center">
                  <Leaf size={36} className="text-[#4A7C59]" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium bg-[#A8C09A]/20 text-[#2F5233] px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#6B5D4F]">{post.readTime} min read</span>
                  </div>
                  <h3 className="font-heading text-lg text-[#2C2C2C] mb-2 group-hover:text-[#2F5233] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#6B5D4F] leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <p className="text-xs font-medium text-[#4A7C59]">{post.author}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ─── Newsletter (redesigned) ─────────────────────────────────────────────── */
function NewsletterSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-[#FAF7F0] to-[#F5EFE0] relative overflow-hidden">
      {/* Soft ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8C09A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#D4A24C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <ScrollReveal>
          <div className="relative bg-gradient-to-br from-[#2F5233] to-[#1A3A1F] rounded-[2rem] overflow-hidden shadow-[0_32px_80px_rgba(47,82,51,0.30)]">
            {/* Decorative large leaf */}
            <div className="absolute right-0 top-0 h-full flex items-center pr-10 pointer-events-none select-none overflow-hidden text-[#FAF7F0]">
              <Leaf size={288} strokeWidth={0.5} className="opacity-[0.06]" />
            </div>

            {/* Dot grid texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #FAF7F0 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative z-10 p-8 md:p-14">
              <div className="grid md:grid-cols-[1fr_360px] gap-10 items-center">
                {/* Left, copy */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-6 h-px bg-[#A8C09A]" />
                    <span className="text-xs font-medium uppercase tracking-widest text-[#A8C09A]">
                      Weekly Wisdom
                    </span>
                  </div>

                  <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-light text-[#FAF7F0] leading-[1.1] mb-4">
                    Your weekly{" "}
                    <span className="italic text-[#D4A24C]">dosha tip.</span>
                  </h2>

                  <p className="text-[#FAF7F0]/70 text-base leading-relaxed max-w-md mb-6">
                    Every Sunday, Arvaya shares one Ayurvedic tip for your skin, hair, or
                    lifestyle, based on the season and clinical observations. Practical wisdom,
                    not marketing.
                  </p>

                </div>

                {/* Right, form */}
                <div className="bg-white/8 border border-white/12 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#D4A24C]/20 flex items-center justify-center">
                      <Mail size={18} className="text-[#D4A24C]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#FAF7F0]">Join the newsletter</p>
                      <p className="text-xs text-[#FAF7F0]/50">Free, every Sunday</p>
                    </div>
                  </div>

                  <form className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-[#FAF7F0] text-sm placeholder:text-[#FAF7F0]/35 focus:outline-none focus:ring-2 focus:ring-[#A8C09A]/40 focus:border-[#A8C09A]/40 transition-all"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#E8C07A] to-[#D4A24C] text-[#1A3A1F] px-6 py-3.5 rounded-xl font-semibold text-sm hover:from-[#EDCB8F] hover:to-[#DDAD5E] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,162,76,0.40)]"
                    >
                      Subscribe Free
                      <ArrowRight size={15} />
                    </button>
                  </form>

                  <p className="text-[11px] text-[#FAF7F0]/35 mt-3 text-center leading-relaxed">
                    Sent every Sunday morning · Unsubscribe with one click
                  </p>

                  {/* Recent issue teaser */}
                  <div className="mt-5 pt-5 border-t border-white/10">
                    <p className="text-[11px] text-[#FAF7F0]/40 uppercase tracking-wider mb-2">
                      Last week's tip
                    </p>
                    <p className="text-xs text-[#FAF7F0]/65 leading-relaxed italic">
                      &ldquo;Why Kapha types should avoid dry shampoo, and what to use instead.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default async function HomePage() {
  const [featuredProducts, testimonials, blogPosts] = await Promise.all([
    fetchProducts({ featured: true }),
    fetchTestimonials(),
    fetchBlogPosts(),
  ]);

  const displayProducts = featuredProducts.slice(0, 4);
  const displayPosts = blogPosts.slice(0, 3);

  return (
    <>
      <HeroSection />
      <WhyUsPinned />
      <DoctorSection />
      <HowItWorksPinned />
      <FeaturedProductsSection products={displayProducts} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={displayPosts} />
      <NewsletterSection />
    </>
  );
}
