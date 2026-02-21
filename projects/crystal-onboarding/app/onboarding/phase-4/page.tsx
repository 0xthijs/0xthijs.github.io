"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhaseCard } from "@/components/journey/PhaseCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useOnboardingStore } from "@/lib/store";
import { getZodiacSign, getZodiacDescription } from "@/lib/zodiac";
import { motion } from "framer-motion";

export default function Phase4Page() {
    const router = useRouter();
    const { setProfileData, setPhase } = useOnboardingStore();

    const [funFact1, setFunFact1] = useState("");
    const [funFact2, setFunFact2] = useState("");
    const [funFact3, setFunFact3] = useState("");
    const [birthYearStr, setBirthYearStr] = useState("");

    const isFormComplete = funFact1.trim() && funFact2.trim() && funFact3.trim() && birthYearStr.length === 4;

    const handleContinue = () => {
        if (isFormComplete) {
            const year = parseInt(birthYearStr, 10);
            const zodiac = getZodiacSign(year);
            setProfileData({
                funFacts: [funFact1, funFact2, funFact3],
                birthYear: year,
                zodiac,
            });
            setPhase(5);
            router.push('/onboarding/phase-5');
        }
    };

    return (
        <PhaseCard
            title="Wie Ben Jij?"
            subtitle="Jouw unieke perspectief voegt waarde toe."
        >
            <div className="space-y-12">
                <section className="space-y-6">
                    <h2 className="text-xl font-serif">Achter de schermen</h2>
                    <div className="space-y-8">
                        <div>
                            <label className="text-sm text-foreground/70 mb-2 block tracking-wide uppercase text-xs">Mijn superpower buiten het werk:</label>
                            <Input
                                value={funFact1}
                                onChange={e => setFunFact1(e.target.value)}
                                placeholder="Bijv. ik kan perfect een ui snipperen..."
                                className="text-base pb-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-foreground/70 mb-2 block tracking-wide uppercase text-xs">Iets wat mensen verbaast over mij:</label>
                            <Input
                                value={funFact2}
                                onChange={e => setFunFact2(e.target.value)}
                                placeholder="..."
                                className="text-base pb-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-foreground/70 mb-2 block tracking-wide uppercase text-xs">Mijn guilty pleasure:</label>
                            <Input
                                value={funFact3}
                                onChange={e => setFunFact3(e.target.value)}
                                placeholder="..."
                                className="text-base pb-2"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-6 border-t border-foreground/10 pt-8">
                    <h2 className="text-xl font-serif">De bron van je energie</h2>
                    <p className="text-sm text-foreground/60 leading-relaxed font-serif italic">
                        In de oosterse filosofie voegt je geboortejaar een unieke textuur toe aan je karakter.
                        Je kristal absorbeert dit als een subtiele gravure.
                    </p>
                    <div>
                        <label className="text-sm text-foreground/70 mb-2 block tracking-wide uppercase text-xs">Geboortejaar (YYYY):</label>
                        <Input
                            type="number"
                            value={birthYearStr}
                            onChange={e => setBirthYearStr(e.target.value)}
                            placeholder="1990"
                            className="text-base w-32 tracking-wider"
                            maxLength={4}
                        />
                    </div>
                    {birthYearStr.length === 4 && !isNaN(parseInt(birthYearStr, 10)) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-4 bg-foreground/5 italic font-serif text-sm border-l-2 border-foreground/30"
                        >
                            Je bent geboren in het jaar van de <span className="font-bold">{getZodiacSign(parseInt(birthYearStr, 10))}</span>. <br />
                            {getZodiacDescription(getZodiacSign(parseInt(birthYearStr, 10)))}
                        </motion.div>
                    )}
                </section>

                <div className="pt-8 flex justify-end">
                    <Button
                        onClick={handleContinue}
                        disabled={!isFormComplete}
                    >
                        Verder naar Verbinding Maken
                    </Button>
                </div>
            </div>
        </PhaseCard>
    );
}
