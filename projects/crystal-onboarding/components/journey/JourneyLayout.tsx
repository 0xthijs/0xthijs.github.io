"use client";

import React from 'react';
import { useOnboardingStore } from '@/lib/store';
import { Crystal } from '@/components/crystal/Crystal';
import { generateCrystalParams } from '@/lib/crystal';

export function JourneyLayout({ children }: { children: React.ReactNode }) {
    const { profile, energy, currentPhase, fastCompletion } = useOnboardingStore();

    // Dynamically calculate the crystal's current state based on user progress
    // If they haven't chosen a color yet, default to white.
    // If they haven't unlocked a shape/energy yet, generateParams will default to 'flow'.
    const params = generateCrystalParams(
        energy,
        profile.baseColor || '#ffffff',
        profile.zodiac,
        profile.workStyle,
        fastCompletion,
        profile.connections?.length || 0
    );

    // The Crystal should be interactive and slowly spinning throughout the journey
    // We pass the currentPhase so it can evolve its geometry complexity over time
    return (
        <div className="min-h-screen bg-[#050505] text-[#f4fbf4] flex flex-col relative overflow-x-hidden font-sans">

            {/* Subtle Top-Right Persistent Crystal */}
            <div className="fixed top-8 right-8 w-32 h-32 z-50 pointer-events-none opacity-80 mix-blend-screen transition-opacity duration-1000">
                <Crystal
                    baseColor={params.baseColor}
                    dominantEnergy={params.dominantEnergy || 'flow'}
                    zodiacAnimal={params.pattern}
                    connections={params.lightLines}
                    phase={currentPhase || 1}
                    interactive={true}
                    className="drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                />
            </div>

            {/* Main Content Area - Centered and Elegant */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6 py-24 sm:py-32 z-10">
                {children}
            </div>

            {/* Very subtle ambient glow */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.02)_0%,_transparent_50%)]" />
        </div>
    );
}
