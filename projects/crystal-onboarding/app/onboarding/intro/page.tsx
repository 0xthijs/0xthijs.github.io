"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useOnboardingStore } from "@/lib/store";

export default function IntroPage() {
    const router = useRouter();
    const { profile, setPhase } = useOnboardingStore();
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < 2) {
            setStep(s => s + 1);
        } else {
            setPhase(1);
            router.push('/onboarding/phase-1');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl sm:text-5xl font-serif mb-6 leading-tight">
                            Welkom op je eerste dag, {profile.preferredName || profile.name}.
                        </h1>
                        <p className="text-lg text-foreground/70 mb-12 font-serif italic">
                            Voordat we in de systemen duiken, beginnen we met iets persoonlijks.
                        </p>
                        <Button onClick={handleNext} className="px-8 font-serif tracking-wide">
                            Ontdek je reis
                        </Button>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl font-serif mb-6">Het Begint met Energie</h2>
                        <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
                            Achtergrond, ervaring en persoonlijkheid. Iedereen brengt een unieke frequentie mee.
                            Tijdens deze onboarding bouw je een digitaal kristal dat reageert op jouw keuzes.
                        </p>
                        <Button onClick={handleNext} className="px-8 font-serif tracking-wide">
                            Klinkt goed
                        </Button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl font-serif mb-6">Laten we beginnen</h2>
                        <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
                            Doorloop de fases op je eigen tempo. De basis ligt klaar.
                        </p>
                        <Button onClick={handleNext} className="px-8 font-serif tracking-wide">
                            Start Fase 1: Hardware
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
