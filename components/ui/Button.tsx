import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "terracotta";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[#4A7C59] to-[#2F5233] text-[#FAF7F0] hover:from-[#5C9068] hover:to-[#3A6440] shadow-[0_4px_24px_rgba(47,82,51,0.25)] hover:shadow-[0_8px_32px_rgba(47,82,51,0.30)]",
  secondary:
    "bg-gradient-to-br from-[#A8C09A]/25 to-[#A8C09A]/10 text-[#2F5233] hover:from-[#A8C09A]/40 hover:to-[#A8C09A]/20 border border-[#A8C09A]/50",
  outline:
    "border border-[#2F5233] text-[#2F5233] hover:bg-gradient-to-br hover:from-[#4A7C59] hover:to-[#2F5233] hover:text-[#FAF7F0]",
  ghost:
    "text-[#6B5D4F] hover:text-[#2F5233] hover:bg-[#A8C09A]/15",
  terracotta:
    "bg-gradient-to-br from-[#DFA090] to-[#C97B63] text-white hover:from-[#C97B63] hover:to-[#A5604A] shadow-[0_4px_24px_rgba(201,123,99,0.25)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-sm rounded-2xl",
  lg: "px-8 py-4 text-base rounded-2xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#2F5233] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
