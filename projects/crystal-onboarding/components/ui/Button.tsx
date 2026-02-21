import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const variants = {
            primary: "bg-foreground text-background hover:opacity-90",
            secondary: "bg-gray-800 text-white hover:bg-gray-700",
            outline: "border border-foreground/20 bg-transparent hover:bg-foreground/5",
            ghost: "bg-transparent hover:bg-foreground/5",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"
