"use client";

import React from 'react';
import { useOnboardingStore } from '@/lib/store';

export function JourneyLayout({ children }: { children: React.ReactNode }) {
    const { profile, energy, currentPhase, fastCompletion } = useOnboardingStore();
    return (
        <div className="min-h-screen bg-[#050505] text-[#f4fbf4] flex flex-col relative overflow-hidden font-sans">
            {/* Main Content Area - Centered and Elegant with Glassmorphism Panel */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 sm:px-6 py-24 sm:py-32 z-10">
                <div className="w-full bg-white/[0.02] backdrop-blur-md border border-white/[0.05] p-6 sm:p-10 md:p-12 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    {children}
                </div>
            </div>

            {/* Very subtle ambient glow */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.02)_0%,_transparent_50%)]" />
        </div>
    );
}
