# Arvaya — Ayurvedic Skincare & Haircare E-Commerce

Premium Ayurvedic skincare and haircare brand with a personalized Prakriti quiz-based recommendation engine. Doctor-founded (BAMS-qualified), built on Next.js 16 / Tailwind CSS v4.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme`) |
| Animations | Framer Motion |
| UI Primitives | Custom components + Radix UI primitives |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Database | PostgreSQL + Prisma ORM |
| Payments | Razorpay (Indian market) |
| Email | Resend |
| Image CDN | Cloudinary |
| Deployment | Vercel |

---

## Project Structure

```
/app
  /(marketing)         → Homepage, About, Products, Blog, Contact
  /quiz                → Quiz landing, multi-step flow, results
  /(shop)              → Cart, Checkout, Account
  /api                 → Quiz, Products, Checkout, Razorpay webhook
/components
  /layout              → Navbar, Footer, WhatsApp button
  /ui                  → Button, Card, Badge, Input
  /product             → ProductCard
  /quiz                → (quiz step components)
  /marketing           → (section components)
/lib
  /quiz-engine.ts      → Dosha calculation + product mapping logic
  /dummy-data.ts       → Placeholder products, blog posts, testimonials
  /prisma.ts           → Prisma client singleton
  /utils.ts            → cn(), formatPrice(), slugify()
/prisma
  /schema.prisma       → Full DB schema
/public
  /herbs               → SVG botanical illustrations
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo>
cd arvaya
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in the required values (see `.env.example` for all variables). Minimum required to run locally:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
```

### 3. Set up database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | NextAuth secret (32-char random string) |
| `NEXTAUTH_URL` | Yes | Base URL of your app |
| `RAZORPAY_KEY_ID` | For payments | Razorpay key ID (test or live) |
| `RAZORPAY_KEY_SECRET` | For payments | Razorpay secret key |
| `RAZORPAY_WEBHOOK_SECRET` | For payments | Razorpay webhook signature secret |
| `RESEND_API_KEY` | For email | Resend API key |
| `EMAIL_FROM` | For email | From email address |
| `CLOUDINARY_CLOUD_NAME` | For images | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | For images | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | For images | Cloudinary API secret |
| `NEXT_PUBLIC_SITE_URL` | For SEO | Production URL (e.g. https://arvaya.in) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | For WhatsApp | Phone number with country code (no +) |

---

## Key Features

### Prakriti Quiz Engine (`/lib/quiz-engine.ts`)
- 15-question multi-section quiz covering Prakriti, skin, hair, lifestyle
- `calculateDosha()` — weights Prakriti questions highest, returns primary + secondary dosha
- `mapConcernsToProducts()` — maps dosha + concern answers to product IDs
- `generatePersonalizationNotes()` — generates human-readable personalisation reasons
- Progress saved to localStorage; survives page refresh

### Design System
- Colors defined in `app/globals.css` via Tailwind v4 `@theme` block
- Primary: `#2F5233` (deep medicinal green)
- Accent: `#D4A24C` (turmeric gold), `#C97B63` (terracotta)
- Fonts: Fraunces (headings, serif warmth) + Inter (body, clean readability)

### SEO
- Per-page Metadata API (title, description, OG tags)
- JSON-LD structured data on Product and Article pages
- `next-sitemap` for sitemap.xml + robots.txt
- `next/image` with Cloudinary domain

### Indian Market Features
- Razorpay payment gateway (UPI, Cards, NetBanking, Wallets)
- WhatsApp floating contact button
- Prices in INR via `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })`

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Add all environment variables in Vercel project settings
4. Deploy

Add a Razorpay webhook pointing to `https://yourdomain.com/api/webhook/razorpay` for payment confirmation.

---

## Content Placeholders

The following need to be replaced with real content before launch:

- **Doctor name, photo, credentials** — update in `lib/dummy-data.ts` and page components
- **Product catalogue** — replace dummy products in `lib/dummy-data.ts` with real formulations
- **Blog articles** — replace dummy content in `lib/dummy-data.ts` and `blog/[slug]/page.tsx`
- **WhatsApp number** — update `NEXT_PUBLIC_WHATSAPP_NUMBER` and `components/layout/WhatsAppButton.tsx`
- **Contact email/phone** — update `components/layout/Footer.tsx` and `contact/page.tsx`
- **Product images** — add to `/public/products/` or Cloudinary and update image paths

---

## Disclaimer

Products described on this site are not intended to diagnose, treat, cure, or prevent any disease. All claims use language such as "traditionally used for", "Ayurveda suggests", or "may help support". This language is enforced throughout the codebase.
