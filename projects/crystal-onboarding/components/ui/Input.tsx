import * as React from "react"
import { cn } from "@/lib/utils"

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "flex w-full rounded-none border-b border-foreground/20 bg-transparent px-3 py-3 text-lg font-serif transition-colors placeholder:text-foreground/30 focus-visible:outline-none focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"
