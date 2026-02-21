"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crystal } from "./Crystal";
import { CrystalParams } from "@/lib/crystal";

interface CrystalRevealProps {
    params: CrystalParams;
    onRevealComplete?: () => void;
}

export function CrystalReveal({ params, onRevealComplete }: CrystalRevealProps) {
    const [phase, setPhase] = useState<"pulsing" | "blooming" | "revealed">("pulsing");
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (phase === "pulsing") {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setPhase("blooming");
                        setTimeout(() => {
                            setPhase("revealed");
                            if (onRevealComplete) onRevealComplete();
                        }, 2000);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [phase, onRevealComplete]);

    // Extract the needed 3D props from the generic params
    const getProps = (phaseLevel: number) => ({
        baseColor: params.baseColor,
        dominantEnergy: params.dominantEnergy || 'flow',
        zodiacAnimal: params.pattern,
        connections: params.lightLines,
        phase: phaseLevel,
        interactive: phaseLevel > 3 // Only interactive when revealed
    });

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            {phase === "pulsing" && (
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-64 h-64"
                >
                    <Crystal
                        {...getProps(0)}
                        dominantEnergy="hidden"
                        zodiacAnimal="none"
                        connections={0}
                        interactive={false}
                    />
                </motion.div>
            )}

            {phase === "pulsing" && (
                <motion.p
                    key={countdown}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-2xl font-serif"
                >
                    {countdown}
                </motion.p>
            )}

            {phase === "blooming" && (
                <motion.div
                    initial={{ scale: 0.5, filter: "blur(20px)", opacity: 0 }}
                    animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="w-[400px] h-[400px] drop-shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                >
                    <Crystal {...getProps(6)} />
                </motion.div>
            )}

            {phase === "revealed" && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-[400px] h-[400px] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                    <Crystal {...getProps(6)} />
                </motion.div>
            )}
        </div>
    );
}
