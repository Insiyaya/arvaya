// Server-only data access. Client components import only the exported *types*
// from this module (type-only imports are erased), so Prisma never reaches the
// browser bundle.
import { prisma } from "@/lib/prisma";

export type Product = {
  id: string;
  slug: string;
  name: string;
  sanskritName?: string | null;
  category: string;
  concerns: string[];
  doshas: string[];
  price: number;
  mrp: number;
  shortDesc?: string | null;
  description?: string | null;
  ingredients: string[];
  benefits: string[];
  howToUse?: string | null;
  doctorNote?: string | null;
  images: string[];
  stock: number;
  featured: boolean;
  published?: boolean;
  rating?: number | null;
  reviewCount: number;
  createdAt?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  category?: string | null;
  author?: string | null;
  readTime?: number | null;
  published: boolean;
  publishedAt?: string | null;
  image?: string | null;
  createdAt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location?: string | null;
  rating: number;
  title?: string | null;
  body: string;
  product?: string | null;
  verified: boolean;
};

export type QuizQuestion = {
  id: string;
  section: string;
  sectionTitle: string;
  question: string;
  hint?: string | null;
  type: string;
  options: Array<{ value: string; label: string; dosha?: string; points?: number }>;
  order: number;
};

export type TimelineEntry = { id: string; year: string; event: string; order: number };
export type Credential = { id: string; iconName?: string | null; title: string; description: string; order: number };
export type BrandPillar = { id: string; number: string; title: string; description: string; order: number };

// Scalar fields returned for a Product (omits createdAt/updatedAt Date columns so
// the shape maps cleanly onto the Product type above).
const productSelect = {
  id: true,
  slug: true,
  name: true,
  sanskritName: true,
  category: true,
  concerns: true,
  doshas: true,
  price: true,
  mrp: true,
  shortDesc: true,
  description: true,
  ingredients: true,
  benefits: true,
  howToUse: true,
  doctorNote: true,
  images: true,
  stock: true,
  featured: true,
  published: true,
  rating: true,
  reviewCount: true,
} as const;

type ProductFilter = { category?: string; dosha?: string; concern?: string; featured?: boolean };

export async function fetchProducts(params?: ProductFilter): Promise<Product[]> {
  try {
    return await prisma.product.findMany({
      where: {
        published: true,
        ...(params?.category ? { category: params.category } : {}),
        ...(params?.dosha ? { doshas: { has: params.dosha } } : {}),
        ...(params?.concern ? { concerns: { has: params.concern } } : {}),
        ...(params?.featured ? { featured: true } : {}),
      },
      select: productSelect,
      orderBy: { createdAt: "asc" },
    });
  } catch (err) {
    console.error("fetchProducts failed:", err);
    return [];
  }
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    return await prisma.product.findUnique({ where: { slug }, select: productSelect });
  } catch (err) {
    console.error("fetchProduct failed:", err);
    return null;
  }
}

export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true, ...(category ? { category } : {}) },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map(r => ({
      ...r,
      publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
      createdAt: r.createdAt.toISOString(),
      image: null,
    }));
  } catch (err) {
    console.error("fetchBlogPosts failed:", err);
    return [];
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const r = await prisma.blogPost.findUnique({ where: { slug } });
    if (!r || !r.published) return null;
    return {
      ...r,
      publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
      createdAt: r.createdAt.toISOString(),
      image: null,
    };
  } catch (err) {
    console.error("fetchBlogPost failed:", err);
    return null;
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
      select: { id: true, name: true, location: true, rating: true, title: true, body: true, product: true, verified: true },
    });
  } catch (err) {
    console.error("fetchTestimonials failed:", err);
    return [];
  }
}

export async function fetchQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const rows = await prisma.quizQuestion.findMany({ orderBy: { order: "asc" } });
    return rows.map(r => ({
      id: r.id,
      section: r.section,
      sectionTitle: r.sectionTitle,
      question: r.question,
      hint: r.hint,
      type: r.type,
      options: r.options as QuizQuestion["options"],
      order: r.order,
    }));
  } catch (err) {
    console.error("fetchQuizQuestions failed:", err);
    return [];
  }
}

export async function fetchTimeline(): Promise<TimelineEntry[]> {
  try {
    return await prisma.timeline.findMany({
      orderBy: { order: "asc" },
      select: { id: true, year: true, event: true, order: true },
    });
  } catch (err) {
    console.error("fetchTimeline failed:", err);
    return [];
  }
}

export async function fetchCredentials(): Promise<Credential[]> {
  try {
    return await prisma.credential.findMany({
      orderBy: { order: "asc" },
      select: { id: true, iconName: true, title: true, description: true, order: true },
    });
  } catch (err) {
    console.error("fetchCredentials failed:", err);
    return [];
  }
}

export async function fetchPillars(): Promise<BrandPillar[]> {
  try {
    return await prisma.brandPillar.findMany({
      orderBy: { order: "asc" },
      select: { id: true, number: true, title: true, description: true, order: true },
    });
  } catch (err) {
    console.error("fetchPillars failed:", err);
    return [];
  }
}
