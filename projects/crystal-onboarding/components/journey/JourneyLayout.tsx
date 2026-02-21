"use client";

import React from 'react';
import { useOnboardingStore } from '@/lib/store';
import Image from 'next/image';

export function JourneyLayout({ children }: { children: React.ReactNode }) {
    const { profile, energy, currentPhase, fastCompletion } = useOnboardingStore();
    return (
        <div className="min-h-screen bg-[#050505] text-[#f4fbf4] flex flex-col relative overflow-hidden font-sans">

            {/* Premium Centered Abstract Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 mix-blend-screen transition-opacity duration-1000">
                <div className="relative w-[150vw] h-[150vh] md:w-[100vw] md:h-[100vh]">
                    <Image
                        src="/onboarding-bg.png"
                        alt="Abstract Obsidian Shape"
                        fill
                        className="object-cover md:object-contain object-center scale-110"
                        priority
                    />
                </div>
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
