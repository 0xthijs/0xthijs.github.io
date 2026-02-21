"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhaseCard } from "@/components/journey/PhaseCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useOnboardingStore } from "@/lib/store";
import { Crystal } from "@/components/crystal/Crystal";
import { motion, AnimatePresence } from "framer-motion";

const COLLEAGUES = [
    { id: "anna", name: "Anna", role: "Design", energy: "flow", color: "diep blauw", animal: "Draak" },
    { id: "boris", name: "Boris", role: "Engineering", energy: "spark", color: "warm amber", animal: "Rat" },
    { id: "claire", name: "Claire", role: "Product", energy: "root", color: "zacht groen", animal: "Tijger" },
    { id: "david", name: "David", role: "Marketing", energy: "pulse", color: "white", animal: "Varkentje" }
];

export default function Phase5Page() {
    const router = useRouter();
    const { addConnection, setPhase } = useOnboardingStore();

    const [activeInput, setActiveInput] = useState<string | null>(null);
    const [messages, setMessages] = useState<Record<string, string>>({});
    const [connected, setConnected] = useState<string[]>([]);

    const handleSendMessage = (id: string) => {
        if (messages[id]?.trim() && !connected.includes(id)) {
            setConnected([...connected, id]);
            setActiveInput(null);
            addConnection(id);
        }
    };

    const handleContinue = () => {
        if (connected.length > 0) {
            setPhase(6);
            router.push('/hatch');
        }
    };

    const isFormComplete = connected.length > 0;

    return (
        <PhaseCard
            title="Samenwerking"
            subtitle="Ontmoet de mensen waarmee je het meest zult samenwerken."
        >
            <div className="space-y-12">
                <section className="space-y-8">
                    <h2 className="text-xl font-serif text-center mb-8">Wie wil je begroeten?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {COLLEAGUES.map((person) => {
                            const isConnected = connected.includes(person.id);
                            const isDrafting = activeInput === person.id;

                            return (
                                <motion.div
                                    key={person.id}
                                    layout
                                    className={`relative flex flex-col items-center justify-between p-6 rounded-xl border transition-all duration-500 overflow-hidden ${isConnected ? 'border-primary/50 bg-primary/5' : 'border-foreground/10 bg-background/50 hover:border-foreground/30'}`}
                                >
                                    {/* Subdued ambient glow behind the card */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

                                    <div className="w-24 h-24 mb-6 relative">
                                        <Crystal
                                            baseColor={person.color}
                                            dominantEnergy={person.energy}
                                            zodiacAnimal={person.animal}
                                            connections={5}
                                            phase={6}
                                            interactive={false}
                                            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                                        />
                                    </div>
                                    <div className="text-center z-10 w-full mb-6">
                                        <p className="font-serif text-xl tracking-wide">{person.name}</p>
                                        <p className="text-sm text-foreground/50 tracking-widest uppercase mt-1">{person.role}</p>
                                    </div>

                                    <div className="w-full z-10">
                                        <AnimatePresence mode="wait">
                                            {isConnected ? (
                                                <motion.div
                                                    key="connected"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="w-full text-center py-2 text-sm text-foreground/60 italic font-serif"
                                                >
                                                    Bericht verstuurd ✓
                                                </motion.div>
                                            ) : isDrafting ? (
                                                <motion.div
                                                    key="drafting"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="w-full space-y-3"
                                                >
                                                    <Input
                                                        value={messages[person.id] || ""}
                                                        onChange={(e) => setMessages({ ...messages, [person.id]: e.target.value })}
                                                        placeholder={`Zeg hoi tegen ${person.name}...`}
                                                        autoFocus
                                                        className="text-sm bg-black/50 border-foreground/20"
                                                    />
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            className="flex-1 text-xs py-1 px-2 h-8"
                                                            onClick={() => setActiveInput(null)}
                                                        >
                                                            Annuleren
                                                        </Button>
                                                        <Button
                                                            className="flex-1 text-xs py-1 px-2 h-8"
                                                            disabled={!messages[person.id]?.trim()}
                                                            onClick={() => handleSendMessage(person.id)}
                                                        >
                                                            Verzend
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="button"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="w-full"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        className="w-full font-serif border-foreground/20 hover:bg-foreground/10"
                                                        onClick={() => setActiveInput(person.id)}
                                                    >
                                                        Stuur bericht
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                <div className="pt-8 flex justify-center">
                    <Button
                        onClick={handleContinue}
                        disabled={!isFormComplete}
                        className="px-12 py-6 text-lg font-serif tracking-widest uppercase transition-all"
                    >
                        Verder naar je Kristal
                    </Button>
                </div>
            </div>
        </PhaseCard>
    );
}
