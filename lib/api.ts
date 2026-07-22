import { PRODUCTS } from "@/lib/dummy-data";

const FASTAPI_URL = process.env.FASTAPI_URL ?? "http://localhost:8000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${FASTAPI_URL}${path}`, {
      next: { revalidate: 60 },
      ...init,
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

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
  id: number;
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
  id: number;
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

export type TimelineEntry = { id: number; year: string; event: string; order: number };
export type Credential = { id: number; iconName?: string | null; title: string; description: string; order: number };
export type BrandPillar = { id: number; number: string; title: string; description: string; order: number };

// Products are served from the local catalogue in lib/dummy-data.ts (no backend
// required). filterProducts is shared with the /api/products route handler.
export function filterProducts(params?: {
  category?: string;
  dosha?: string;
  concern?: string;
  featured?: boolean;
}): Product[] {
  let items = PRODUCTS as Product[];
  if (params?.category) items = items.filter(p => p.category === params.category);
  if (params?.dosha) items = items.filter(p => p.doshas.includes(params.dosha!));
  if (params?.concern) items = items.filter(p => p.concerns.includes(params.concern!));
  if (params?.featured) items = items.filter(p => p.featured);
  return items;
}

export async function fetchProducts(params?: {
  category?: string;
  dosha?: string;
  concern?: string;
  featured?: boolean;
}): Promise<Product[]> {
  return filterProducts(params);
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  return (PRODUCTS as Product[]).find(p => p.slug === slug) ?? null;
}

export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
  const search = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await apiFetch<{ posts: BlogPost[] }>(`/api/blog${search}`);
  return data?.posts ?? [];
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  return apiFetch<BlogPost>(`/api/blog/${slug}`);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const data = await apiFetch<{ testimonials: Testimonial[] }>("/api/testimonials");
  return data?.testimonials ?? [];
}

export async function fetchQuizQuestions(): Promise<QuizQuestion[]> {
  const data = await apiFetch<{ questions: QuizQuestion[] }>("/api/quiz/questions");
  return data?.questions ?? [];
}

export async function fetchTimeline(): Promise<TimelineEntry[]> {
  const data = await apiFetch<TimelineEntry[]>("/api/about/timeline");
  return data ?? [];
}

export async function fetchCredentials(): Promise<Credential[]> {
  const data = await apiFetch<Credential[]>("/api/about/credentials");
  return data ?? [];
}

export async function fetchPillars(): Promise<BrandPillar[]> {
  const data = await apiFetch<BrandPillar[]>("/api/about/pillars");
  return data ?? [];
}
