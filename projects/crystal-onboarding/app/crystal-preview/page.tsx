"use client";

import { useState } from "react";
import { Crystal } from "@/components/crystal/Crystal";

export default function CrystalPreviewPage() {
    const [interactive, setInteractive] = useState(false);

    // Configuration matrices for the grid
    const energies = ['spark', 'flow', 'pulse', 'root'];
    const colors = [
        { name: 'white', hex: '#ffffff' },
        { name: 'amber', hex: 'warm amber' },
        { name: 'blue', hex: 'diep blauw' },
        { name: 'green', hex: 'zacht groen' }
    ];
    const phases = [0, 2, 4, 6]; // To show evolution
    const animals = ['Rat', 'Tijger', 'Draak', 'Varkentje'];

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-12">

                <header className="flex items-center justify-between border-b border-white/20 pb-4">
                    <div>
                        <h1 className="text-3xl font-serif">Crystal Preview (3D Wireframes)</h1>
                        <p className="text-white/60">Standalone validatie omgeving voor de Three.js implementatie</p>
                    </div>
                    <button
                        onClick={() => setInteractive(!interactive)}
                        className={`px-4 py-2 border text-sm uppercase tracking-wider transition-colors ${interactive ? 'bg-white text-black' : 'border-white/50 hover:border-white'}`}
                    >
                        Interactive Hover: {interactive ? 'ON' : 'OFF'}
                    </button>
                </header>

                {/* Section 1: Geometries by Energy */}
                <section>
                    <h2 className="text-xl font-serif mb-6 text-white/50 border-b border-white/10 pb-2">1. Abstract Geometries by Dominant Energy (Phase 6)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {energies.map(energy => (
                            <div key={`geo-${energy}`} className="border border-white/10 p-4 rounded-sm flex flex-col items-center bg-zinc-950">
                                <div className="w-full h-64">
                                    <Crystal
                                        dominantEnergy={energy}
                                        baseColor="white"
                                        zodiacAnimal="none"
                                        connections={3}
                                        phase={6}
                                        interactive={interactive}
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="font-serif capitalize text-lg tracking-wider">{energy}</p>
                                    <p className="text-xs text-white/40 mt-1">
                                        {energy === 'spark' && 'Highly Faceted, Erratic Gem'}
                                        {energy === 'flow' && 'Geodesic Dome (Soft, complex)'}
                                        {energy === 'pulse' && 'Aggressive Spire Cone (Sharp)'}
                                        {energy === 'root' && 'Solid Geode (Chunky, symmetric)'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Colors and Glows */}
                <section>
                    <h2 className="text-xl font-serif mb-6 text-white/50 border-b border-white/10 pb-2">2. Base Colors & Dynamic Glow (Flow Energy)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {colors.map((color, i) => (
                            <div key={`color-${color.name}`} className="border border-white/10 p-4 rounded-sm flex flex-col items-center bg-zinc-950">
                                <div className="w-full h-64">
                                    <Crystal
                                        dominantEnergy="flow"
                                        baseColor={color.hex}
                                        zodiacAnimal="none"
                                        connections={i * 1.5} // Vary glow intensity
                                        phase={6}
                                        interactive={interactive}
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="font-serif capitalize text-lg tracking-wider">{color.name}</p>
                                    <p className="text-xs text-white/40 mt-1">Connections (Glow): {i * 1.5}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Zodiac Engravings */}
                <section>
                    <h2 className="text-xl font-serif mb-6 text-white/50 border-b border-white/10 pb-2">3. Zodiac Engravings (Spark Energy, Amber)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {animals.map((animal) => (
                            <div key={`zodiac-${animal}`} className="border border-white/10 p-4 rounded-sm flex flex-col items-center bg-zinc-950">
                                <div className="w-full h-64 relative">
                                    <Crystal
                                        dominantEnergy="spark"
                                        baseColor="warm amber"
                                        zodiacAnimal={animal}
                                        connections={5} // Max glow
                                        phase={6}
                                        interactive={interactive}
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="font-serif capitalize text-lg tracking-wider">{animal}</p>
                                    <p className="text-xs text-white/40 mt-1">SVG Overlay Layer</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
