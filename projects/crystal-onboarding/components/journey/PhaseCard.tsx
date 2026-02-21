import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface PhaseCardProps extends HTMLMotionProps<"div"> {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export function PhaseCard({ title, subtitle, className, children, ...props }: PhaseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("w-full max-w-2xl mx-auto space-y-8", className)}
            {...props}
        >
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-serif">{title}</h1>
                {subtitle && <p className="text-foreground/50 tracking-wide text-sm">{subtitle}</p>}
            </div>
            <div className="bg-foreground/5 border border-foreground/10 p-8 shadow-sm">
                {children}
            </div>
        </motion.div>
    );
}
