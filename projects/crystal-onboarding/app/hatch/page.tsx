"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/lib/store";
import { generateCrystalParams } from "@/lib/crystal";
import { calculateDominantEnergy, calculateSecondaryEnergy, getEnergyDescription } from "@/lib/energy";
import { CrystalReveal } from "@/components/crystal/CrystalReveal";
import { CrystalCard } from "@/components/crystal/CrystalCard";
import { motion, AnimatePresence } from "framer-motion";

export default function HatchPage() {
    const { profile, energy, fastCompletion } = useOnboardingStore();
    const [isRevealed, setIsRevealed] = useState(false);

    const finalParams = generateCrystalParams(
        energy,
        profile.baseColor || '#ffffff',
        profile.zodiac,
        profile.workStyle,
        fastCompletion,
        profile.connections.length
    );

    const dominant = calculateDominantEnergy(energy);
    const secondary = calculateSecondaryEnergy(energy, dominant);
    const description = getEnergyDescription(dominant, secondary);

    return (
        <main className="min-h-screen bg-[#090c09] text-[#f4fbf4] flex flex-col items-center justify-center p-4 sm:p-8 overflow-x-hidden">
            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-2xl flex flex-col items-center justify-center space-y-12"
                    >
                        <div className="text-center space-y-6">
                            <h1 className="text-4xl md:text-5xl font-serif tracking-wide">De Vorming</h1>
                            <p className="text-foreground/50 max-w-lg mx-auto leading-relaxed font-light tracking-widest uppercase text-xs">
                                Naarmate je je weg hebt gevonden, heeft je energie vorm gekregen.
                                Neem even de tijd voor dit moment.
                            </p>
                        </div>

                        <div className="h-96 flex items-center justify-center">
                            <CrystalReveal
                                params={finalParams}
                                onRevealComplete={() => setIsRevealed(true)}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-full flex flex-col items-center"
                    >
                        <div className="mb-16 text-center space-y-8 max-w-2xl">
                            <h1 className="text-5xl md:text-6xl font-serif font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 pb-2">Welkom, {profile.preferredName || profile.name}.</h1>
                            <p className="text-foreground/50 leading-loose font-serif italic text-xl px-4">
                                "Dit kristal is van jou gemaakt — door hoe je werkt, wie je opzoekt, wat je belangrijk vindt. Geen twee zijn hetzelfde."
                            </p>
                        </div>
                        <CrystalCard
                            profile={profile}
                            params={finalParams}
                            energyDescription={description}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
