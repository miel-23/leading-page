import React from "react";
import { cn } from "@/lib/utils";

export interface Button12Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export const Button12 = React.forwardRef<HTMLButtonElement, Button12Props>(
  ({ label, className, asChild, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-8 py-4 text-sm sm:text-base font-bold text-neutral-950 shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
          className
        )}
        {...props}
      >
        <span>{label}</span>
        {children}
      </button>
    );
  }
);
Button12.displayName = "Button12";
