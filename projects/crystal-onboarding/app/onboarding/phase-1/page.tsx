"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhaseCard } from "@/components/journey/PhaseCard";
import { ChecklistItem } from "@/components/journey/ChecklistItem";
import { Button } from "@/components/ui/Button";
import { useOnboardingStore } from "@/lib/store";

export default function Phase1Page() {
    const router = useRouter();
    const { addEnergy, setProfileData, setPhase } = useOnboardingStore();

    const [hardwareSetup, setHardwareSetup] = useState({
        laptop: false,
        charger: false,
        mouse: false,
        screen: false,
    });

    const [workStyle, setWorkStyle] = useState<string | null>(null);

    const toggleHardware = (key: keyof typeof hardwareSetup) => {
        const isCurrentlyChecked = hardwareSetup[key];
        setHardwareSetup(prev => ({ ...prev, [key]: !prev[key] }));

        // Distribute energy to different types to guarantee diversity
        if (!isCurrentlyChecked) {
            if (key === 'laptop') addEnergy('root', 2);
            if (key === 'charger') addEnergy('pulse', 2);
            if (key === 'mouse') addEnergy('flow', 2);
            if (key === 'screen') addEnergy('spark', 2);
        }
    };

    const allHardwareChecked = Object.values(hardwareSetup).every(Boolean);

    const handleContinue = () => {
        if (workStyle) {
            setProfileData({ workStyle });
            setPhase(2);
            router.push('/onboarding/phase-2');
        }
    };

    return (
        <PhaseCard
            title="Hardware & Setup"
            subtitle="Laten we zorgen dat je er klaar voor bent."
        >
            <div className="space-y-12">
                <section>
                    <h2 className="text-xl font-serif mb-4">Hardware Checklist</h2>
                    <div className="bg-background rounded-sm shadow-sm border border-foreground/5 overflow-hidden">
                        <ChecklistItem
                            id="laptop"
                            title="Laptop ontvangen"
                            isCompleted={hardwareSetup.laptop}
                            onToggle={(id) => toggleHardware(id as any)}
                        />
                        <ChecklistItem
                            id="charger"
                            title="Oplader aangesloten"
                            isCompleted={hardwareSetup.charger}
                            onToggle={(id) => toggleHardware(id as any)}
                        />
                        <ChecklistItem
                            id="mouse"
                            title="Muis & Toetsenbord"
                            isCompleted={hardwareSetup.mouse}
                            onToggle={(id) => toggleHardware(id as any)}
                        />
                        <ChecklistItem
                            id="screen"
                            title="Extra Scherm (optioneel)"
                            isCompleted={hardwareSetup.screen}
                            onToggle={(id) => toggleHardware(id as any)}
                        />
                    </div>
                </section>

                <section className={`transition-opacity duration-500 ${allHardwareChecked ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                    <h2 className="text-xl font-serif mb-4">Hoe werk jij het liefst?</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {['Thuis', 'Kantoor', 'Hybride', 'Onderweg'].map(style => (
                            <button
                                key={style}
                                onClick={() => {
                                    setWorkStyle(style);
                                    // Adds specific energy based on choice
                                    if (style === 'Kantoor') addEnergy('flow', 5);
                                    if (style === 'Thuis') addEnergy('root', 5);
                                    if (style === 'Hybride') addEnergy('pulse', 5);
                                    if (style === 'Onderweg') addEnergy('spark', 5);
                                }}
                                className={`p-4 border text-sm tracking-wide transition-colors ${workStyle === style ? 'border-foreground bg-foreground text-background' : 'border-foreground/20 hover:border-foreground/50'}`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="pt-8 flex justify-end">
                    <Button
                        onClick={handleContinue}
                        disabled={!allHardwareChecked || !workStyle}
                    >
                        Verder naar Accounts
                    </Button>
                </div>
            </div>
        </PhaseCard>
    );
}
