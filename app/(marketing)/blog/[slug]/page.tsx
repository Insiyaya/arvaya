import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight, Leaf } from "lucide-react";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    authors: post.author ? [{ name: post.author }] : undefined,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    fetchBlogPost(slug),
    fetchBlogPosts(),
  ]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl text-[#2F5233] mb-4">Article not found</p>
          <Link href="/blog" className="text-sm text-[#4A7C59] underline">Back to blog</Link>
        </div>
      </div>
    );
  }

  const related = allPosts.filter(p => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    datePublished: post.publishedAt,
    publisher: { "@type": "Organization", name: "Arvaya" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="bg-[#FAF7F0]">
        <div className="section-padding pb-8 bg-[#F5EFE0]">
          <div className="container-max">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-[#4A7C59] hover:text-[#2F5233] transition-colors mb-6">
              <ArrowLeft size={14} />
              All articles
            </Link>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                {post.category && (
                  <span className="text-xs font-medium bg-[#A8C09A]/30 text-[#2F5233] px-3 py-1 rounded-full">{post.category}</span>
                )}
                {post.readTime && (
                  <div className="flex items-center gap-1 text-xs text-[#6B5D4F]">
                    <Clock size={12} />
                    {post.readTime} min read
                  </div>
                )}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-light text-[#2F5233] mb-4 leading-[1.15]">{post.title}</h1>
              {post.excerpt && (
                <p className="text-lg text-[#6B5D4F] leading-relaxed mb-6">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-[#2F5233]/10 flex items-center justify-center text-[#2F5233]"><Leaf size={16} /></div>
                <div>
                  {post.author && (
                    <p className="text-sm font-medium text-[#2C2C2C]">{post.author}</p>
                  )}
                  {post.publishedAt && (
                    <p className="text-xs text-[#6B5D4F]">
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#A8C09A]/20 to-[#F5EFE0] flex items-center justify-center py-16 text-[#4A7C59]">
          <Leaf size={72} strokeWidth={1.25} />
        </div>

        <div className="section-padding">
          <div className="container-max">
            <div className="grid lg:grid-cols-[1fr_280px] gap-12">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-heading prose-headings:font-light prose-headings:text-[#2F5233]
                  prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-[#6B5D4F] prose-p:leading-relaxed
                  prose-strong:text-[#2C2C2C] prose-strong:font-medium
                  prose-li:text-[#6B5D4F] prose-li:leading-relaxed
                  prose-a:text-[#2F5233] prose-a:underline-offset-2"
              >
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <p className="text-[#6B5D4F] italic">Article content will appear here once added to the database.</p>
                )}
              </div>

              <aside className="space-y-6 lg:sticky lg:top-24 self-start">
                <div className="bg-[#2F5233] rounded-2xl p-5 text-[#FAF7F0]">
                  <p className="font-heading text-lg mb-2">Get weekly Ayurvedic tips</p>
                  <p className="text-xs text-[#FAF7F0]/70 mb-4 leading-relaxed">
                    Arvaya sends one dosha tip every week, practical, seasonal, and evidence-based.
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 rounded-lg text-sm text-[#2C2C2C] bg-[#FAF7F0] mb-2 focus:outline-none focus:ring-2 focus:ring-[#A8C09A]/50"
                  />
                  <button className="w-full bg-[#D4A24C] text-[#1A3A1F] py-2.5 rounded-lg text-sm font-medium hover:bg-[#E8C07A] transition-colors">
                    Subscribe
                  </button>
                </div>

                <div className="bg-[#F5EFE0] rounded-2xl p-5 border border-[#D4A24C]/20">
                  <p className="font-heading text-base text-[#2F5233] mb-2">Know your Prakriti</p>
                  <p className="text-xs text-[#6B5D4F] mb-4 leading-relaxed">
                    Take Arvaya&apos;s free 3-minute quiz for a personalised routine based on your constitution.
                  </p>
                  <Link href="/quiz" className="flex items-center justify-center gap-2 bg-[#2F5233] text-[#FAF7F0] py-2.5 rounded-lg text-sm font-medium hover:bg-[#4A7C59] transition-colors">
                    Take the Quiz
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section-padding bg-[#F5EFE0]">
            <div className="container-max">
              <h2 className="font-heading text-3xl font-light text-[#2F5233] mb-8">More from Arvaya</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map(r => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="group bg-white rounded-2xl border border-[#A8C09A]/25 p-5 hover:shadow-[0_8px_32px_rgba(47,82,51,0.12)] transition-all duration-300 hover:-translate-y-1">
                    {r.category && (
                      <span className="text-xs font-medium bg-[#A8C09A]/20 text-[#2F5233] px-2 py-1 rounded-full">{r.category}</span>
                    )}
                    <h3 className="font-heading text-lg text-[#2C2C2C] group-hover:text-[#2F5233] mt-3 mb-2 transition-colors leading-snug">{r.title}</h3>
                    {r.excerpt && (
                      <p className="text-sm text-[#6B5D4F] line-clamp-2">{r.excerpt}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
