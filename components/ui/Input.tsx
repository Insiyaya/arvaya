import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#2C2C2C]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-xl border text-[#2C2C2C] text-sm",
            "bg-white placeholder:text-[#6B5D4F]/50",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]",
            error
              ? "border-[#C97B63] focus:ring-[#C97B63]/30"
              : "border-[#A8C09A]/50 hover:border-[#A8C09A]",
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-[#6B5D4F]/70">{hint}</p>}
        {error && <p className="text-xs text-[#C97B63]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
