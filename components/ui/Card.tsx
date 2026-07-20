import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "sage" | "ivory" | "dark";
}

const variantClasses = {
  default: "bg-white border border-[#A8C09A]/25",
  sage: "bg-[#A8C09A]/10 border border-[#A8C09A]/30",
  ivory: "bg-[#F5EFE0] border border-[#D4A24C]/20",
  dark: "bg-[#2F5233] text-[#FAF7F0] border border-[#4A7C59]",
};

export default function Card({ children, className, hover = false, variant = "default" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        variantClasses[variant],
        hover && "transition-all duration-300 hover:shadow-[0_8px_32px_rgba(47,82,51,0.16)] hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
