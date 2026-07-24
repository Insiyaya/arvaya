/**
 * Seeds the Arvaya database from the authored content in lib/dummy-data.ts.
 * Run with: npx tsx prisma/seed.ts  (loads .env.local for DATABASE_URL)
 *
 * Idempotent: products / blog posts / quiz questions are upserted by their
 * natural key (slug or id); testimonials / timeline / credentials / pillars are
 * fully replaced (deleteMany + create) since they have no stable natural key.
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PRODUCTS,
  BLOG_POSTS,
  TESTIMONIALS,
  QUIZ_QUESTIONS,
  TIMELINE,
  CREDENTIALS,
  PILLARS,
} from "../lib/dummy-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Long-form article bodies (HTML) for the three blog posts, keyed by slug.
const BLOG_CONTENT: Record<string, string> = {
  "vata-pitta-kapha-skin-types": `
    <p>In Ayurveda, skin is never described as simply "oily" or "dry". It is read as an expression of your <strong>Prakriti</strong> &mdash; the unique balance of the three doshas (Vata, Pitta and Kapha) that you were born with. Understanding which dosha governs your skin is the first step to caring for it well.</p>
    <h2>Vata skin</h2>
    <p>When Vata predominates, skin tends to be <strong>dry, thin and cool</strong> to the touch. It loses moisture quickly, is prone to fine lines, and reacts to cold, wind and air conditioning. Vata skin thrives on warmth and richness: nourishing oils, gentle non-foaming cleansers, and consistency above all.</p>
    <ul><li>Favour heavier oils such as sesame and almond.</li><li>Avoid over-cleansing, which strips an already fragile barrier.</li><li>Hydrate morning and night, and never skip a facial oil.</li></ul>
    <h2>Pitta skin</h2>
    <p>Pitta skin runs <strong>warm and reactive</strong>. It is often sensitive, flushes easily, and is prone to redness, breakouts and pigmentation after sun exposure. The guiding principle here is <em>cooling</em>: sandalwood, rose, Manjistha and Kumkumadi are classical Pitta-pacifying ingredients.</p>
    <h2>Kapha skin</h2>
    <p>Kapha skin is <strong>thick, oily and cool</strong>, with larger pores and a tendency toward congestion and blackheads. It ages slowly and stays supple, but needs regular, gentle clarifying. Neem, Tulsi and Multani mitti help without over-drying.</p>
    <h2>Most of us are a blend</h2>
    <p>Very few people are a single dosha. Combination skin &mdash; an oily T-zone with dry cheeks &mdash; is often a Kapha-Vata or Pitta-Kapha pattern. This is exactly why a routine built for your specific constitution works where a generic "skin type" product falls short.</p>
    <p>Not sure where you sit? Arvaya's three-minute Prakriti quiz maps your constitution and your current concerns to a routine grounded in classical logic.</p>
  `,
  "ritucharya-seasonal-skincare": `
    <p><strong>Ritucharya</strong> (&#2315;&#2340;&#2369;&#2330;&#2352;&#2381;&#2351;&#2366;) is the Ayurvedic science of seasonal living. Its core insight is simple: the same routine cannot serve you all year. As the seasons change, so does the balance of the doshas in the body &mdash; and your skin and hair must adapt with them.</p>
    <h2>Summer (Grishma)</h2>
    <p>Heat aggravates Pitta. Skin flushes, sweats and breaks out more easily. Lighten your routine, lean on cooling mists and gels, and protect against the sun.</p>
    <h2>Monsoon (Varsha)</h2>
    <p>Humidity and fluctuating temperatures unsettle all three doshas. This is a season for gentle, clarifying care &mdash; and for keeping the scalp clean to prevent fungal flare-ups.</p>
    <h2>Winter (Hemanta &amp; Shishira)</h2>
    <p>Cold, dry air aggravates Vata. Skin tightens and flakes; hair loses moisture. Switch to richer oils and creams, and increase the frequency of nourishing masks and hair oiling.</p>
    <h2>The transitional seasons</h2>
    <p>Spring (Vasanta) is when accumulated Kapha begins to liquefy, often showing up as congestion and breakouts. Autumn (Sharada) brings a Pitta rebound. Both reward a period of gentle detoxification and simplified routines.</p>
    <p>The takeaway: review your routine every time the season turns. Your Prakriti stays constant, but the care it needs shifts through the year.</p>
  `,
  "bhringraj-hair-fall-science": `
    <p><strong>Bhringraj</strong> (<em>Eclipta prostrata</em>) is called <em>Keshraj</em> in the classical texts &mdash; the "ruler of hair". It is the single most-cited herb in Ayurvedic hair care. But what does the evidence actually say, and how should you use it?</p>
    <h2>What the classical texts say</h2>
    <p>The Charaka Samhita and later compendia describe Bhringraj as a Rasayana (rejuvenative) that nourishes the roots, calms the scalp, and supports natural hair colour. It is traditionally prepared as a medicated oil, applied to the scalp and left to work over hours.</p>
    <h2>What modern research suggests</h2>
    <p>Preclinical studies on Eclipta extracts have observed effects on the hair growth cycle &mdash; specifically, a longer growth (anagen) phase in animal models. This is promising, but it is not the same as large human trials, and claims should stay measured.</p>
    <h2>How to use it well</h2>
    <ul>
      <li><strong>Consistency beats intensity.</strong> Two to three scalp massages a week, over 8&ndash;12 weeks, is the realistic window for visible change.</li>
      <li><strong>Warm the oil.</strong> Gentle warmth improves absorption and makes the massage more relaxing &mdash; itself useful, since stress is a common driver of shedding.</li>
      <li><strong>Pair with the root cause.</strong> Vata-type dryness, Pitta-type inflammation and Kapha-type congestion each need slightly different support. This is where a constitution-based routine matters.</li>
    </ul>
    <p>Bhringraj is not a miracle cure, and honest Ayurveda never claims it is. Used consistently and matched to your Prakriti, it is one of the most reliable tools we have for scalp and hair health.</p>
  `,
};

async function main() {
  // ---- Products (upsert by slug) ----
  for (const p of PRODUCTS) {
    const data = {
      slug: p.slug,
      name: p.name,
      sanskritName: p.sanskritName,
      category: p.category,
      concerns: p.concerns,
      doshas: p.doshas,
      price: p.price,
      mrp: p.mrp,
      shortDesc: p.shortDesc,
      description: p.description,
      ingredients: p.ingredients,
      benefits: p.benefits,
      howToUse: p.howToUse,
      doctorNote: p.doctorNote,
      images: p.images,
      stock: p.stock,
      featured: p.featured,
      published: true,
      rating: p.rating,
      reviewCount: p.reviewCount,
    };
    await prisma.product.upsert({ where: { slug: p.slug }, update: data, create: data });
  }
  console.log(`Seeded ${PRODUCTS.length} products`);

  // ---- Blog posts (upsert by slug; supply HTML content) ----
  for (const b of BLOG_POSTS) {
    const content = (BLOG_CONTENT[b.slug] ?? `<p>${b.excerpt}</p>`).trim();
    const data = {
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content,
      category: b.category,
      author: b.author,
      readTime: b.readTime,
      published: true,
      publishedAt: new Date(b.publishedAt),
    };
    await prisma.blogPost.upsert({ where: { slug: b.slug }, update: data, create: data });
  }
  console.log(`Seeded ${BLOG_POSTS.length} blog posts`);

  // ---- Quiz questions (upsert by id; order = array index) ----
  for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
    const q = QUIZ_QUESTIONS[i];
    const data = {
      id: q.id,
      section: q.section,
      sectionTitle: q.sectionTitle,
      question: q.question,
      hint: "hint" in q ? (q.hint as string) : null,
      type: q.type,
      options: q.options,
      order: i,
    };
    await prisma.quizQuestion.upsert({ where: { id: q.id }, update: data, create: data });
  }
  console.log(`Seeded ${QUIZ_QUESTIONS.length} quiz questions`);

  // ---- Testimonials (full replace) ----
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: TESTIMONIALS.map((t, i) => ({
      name: t.name,
      location: t.location,
      rating: t.rating,
      title: t.title,
      body: t.body,
      product: t.product,
      verified: t.verified,
      order: i,
    })),
  });
  console.log(`Seeded ${TESTIMONIALS.length} testimonials`);

  // ---- About: timeline / credentials / pillars (full replace) ----
  await prisma.timeline.deleteMany();
  await prisma.timeline.createMany({
    data: TIMELINE.map((t, i) => ({ year: t.year, event: t.event, order: i })),
  });
  await prisma.credential.deleteMany();
  await prisma.credential.createMany({
    data: CREDENTIALS.map((c, i) => ({ iconName: c.iconName, title: c.title, description: c.description, order: i })),
  });
  await prisma.brandPillar.deleteMany();
  await prisma.brandPillar.createMany({
    data: PILLARS.map((p, i) => ({ number: p.number, title: p.title, description: p.description, order: i })),
  });
  console.log(`Seeded ${TIMELINE.length} timeline, ${CREDENTIALS.length} credentials, ${PILLARS.length} pillars`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
