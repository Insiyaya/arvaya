import Link from "next/link";
import { ShoppingCart, Star, Leaf } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  slug: string;
  name: string;
  sanskritName?: string | null;
  category: string;
  price: number;
  mrp: number;
  shortDesc?: string | null;
  doshas: string[];
  rating?: number | null;
  reviewCount?: number;
  featured?: boolean;
  [key: string]: unknown;
}

export default function ProductCard({
  slug,
  name,
  sanskritName,
  category,
  price,
  mrp,
  shortDesc,
  doshas,
  rating,
  reviewCount = 0,
}: ProductCardProps) {
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <article className="group bg-white rounded-2xl border border-[#A8C09A]/25 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(47,82,51,0.16)] hover:-translate-y-1">
      {/* Image area */}
      <div className="relative aspect-square bg-gradient-to-br from-[#A8C09A]/20 to-[#F5EFE0] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#A8C09A]/20 flex items-center justify-center mb-2 text-[#4A7C59]">
              <Leaf size={28} />
            </div>
            {sanskritName && <p className="font-devanagari text-sm text-[#2F5233]/50">{sanskritName}</p>}
          </div>
        </div>
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#C97B63] text-white text-xs font-medium px-2 py-1 rounded-full">
            {discount}% off
          </span>
        )}
        <span className="absolute top-3 right-3 bg-[#D4A24C]/15 text-[#B8882E] text-[10px] font-medium px-2 py-1 rounded-full border border-[#D4A24C]/30 capitalize">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Dosha badges */}
        <div className="flex gap-1 mb-2 flex-wrap">
          {doshas.map(d => (
            <Badge key={d} variant={`dosha-${d}` as "dosha-vata" | "dosha-pitta" | "dosha-kapha"}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </Badge>
          ))}
        </div>

        <Link href={`/products/${slug}`} className="group/link">
          <h3 className="font-heading text-[#2C2C2C] font-medium leading-snug mb-1 group-hover/link:text-[#2F5233] transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        {shortDesc && <p className="text-xs text-[#6B5D4F] leading-relaxed mb-3 line-clamp-2">{shortDesc}</p>}

        {/* Rating */}
        {rating != null && reviewCount > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <Star size={12} className="fill-[#D4A24C] text-[#D4A24C]" />
            <span className="text-xs font-medium text-[#2C2C2C]">{rating}</span>
            <span className="text-xs text-[#6B5D4F]">({reviewCount})</span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-lg font-medium text-[#2F5233]">
              {formatPrice(price)}
            </span>
            {mrp > price && (
              <span className="text-xs text-[#6B5D4F]/60 line-through">{formatPrice(mrp)}</span>
            )}
          </div>
          <button
            aria-label={`Add ${name} to cart`}
            className="flex items-center gap-1.5 bg-[#2F5233] text-[#FAF7F0] text-xs font-medium px-3 py-2 rounded-xl hover:bg-[#4A7C59] transition-colors"
          >
            <ShoppingCart size={12} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
