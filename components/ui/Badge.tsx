import { cn } from "@/lib/utils";

type BadgeVariant = "dosha-vata" | "dosha-pitta" | "dosha-kapha" | "concern" | "category" | "turmeric" | "sage";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  "dosha-vata": "bg-sky-50 text-sky-700 border border-sky-200",
  "dosha-pitta": "bg-[#C97B63]/10 text-[#A5604A] border border-[#C97B63]/30",
  "dosha-kapha": "bg-[#A8C09A]/25 text-[#2F5233] border border-[#A8C09A]/60",
  concern: "bg-[#F5EFE0] text-[#6B5D4F] border border-[#D4A24C]/30",
  category: "bg-[#2F5233]/10 text-[#2F5233] border border-[#2F5233]/20",
  turmeric: "bg-[#D4A24C]/15 text-[#B8882E] border border-[#D4A24C]/40",
  sage: "bg-[#A8C09A]/20 text-[#2F5233] border border-[#A8C09A]/40",
};

export default function Badge({ children, variant = "sage", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
