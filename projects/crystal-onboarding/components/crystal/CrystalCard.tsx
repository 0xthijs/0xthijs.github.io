"use client";

import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Crystal } from "./Crystal";
import { CrystalParams } from "@/lib/crystal";
import { Profile } from "@/lib/store";

interface CrystalCardProps {
    profile: Profile;
    params: CrystalParams;
    energyDescription: string;
}

export function CrystalCard({ profile, params, energyDescription }: CrystalCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleExport = async () => {
        if (!cardRef.current) return;
        try {
            const url = await htmlToImage.toPng(cardRef.current, {
                backgroundColor: "#111111", // Match Vogue dark theme background
                pixelRatio: 2,
            });
            const a = document.createElement("a");
            a.href = url;
            a.download = `${profile.preferredName || profile.name || "Colleague"}-crystal.png`;
            a.click();
        } catch (err) {
            console.error("Export failed", err);
        }
    };

    const displayName = profile.preferredName || profile.name || "Jouw Naam";

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
            <div
                ref={cardRef}
                className="relative w-full p-8 pb-12 flex flex-col items-center bg-[#111111] text-[#fafafa] overflow-hidden rounded-xl border border-[#ffffff1a] min-h-[600px]"
            >
                <div className="flex-1 w-full flex items-center justify-center">
                    <Crystal
                        baseColor={params.baseColor}
                        dominantEnergy={params.dominantEnergy || 'flow'}
                        zodiacAnimal={params.pattern}
                        connections={params.lightLines}
                        phase={6}
                        interactive={false}
                        className="w-64 h-64"
                    />
                </div>

                <div className="w-full space-y-6 text-center z-10 pt-4">
                    <div>
                        <h1 className="text-3xl font-serif tracking-wide text-[#fafafa]">{displayName}</h1>
                        <p className="text-[#a1a1aa] mt-1 uppercase tracking-widest text-xs">
                            Start: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <p className="font-serif italic text-lg leading-relaxed text-[#e4e4e7]">
                        "{energyDescription}"
                    </p>

                    <div className="flex flex-col gap-2 text-sm text-[#d4d4d8]">
                        {profile.zodiac && (
                            <p>✧ {profile.zodiac}</p>
                        )}
                        {profile.favoriteTool && (
                            <p>Favorite tool: {profile.favoriteTool}</p>
                        )}
                        {profile.workStyle && (
                            <p>Werkstijl: {profile.workStyle}</p>
                        )}
                    </div>

                    {profile.funFacts.length > 0 && (
                        <div className="pt-4 border-t border-[#ffffff1a] text-xs text-left w-full space-y-2">
                            {profile.funFacts.map((fact, i) => (
                                <p key={i} className="flex gap-2">
                                    <span className="text-[#71717a]">✦</span>
                                    <span className="text-[#d4d4d8]">{fact}</span>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handleExport}
                className="px-6 py-3 bg-white text-black font-sans font-medium tracking-wide rounded-full hover:bg-gray-200 transition-colors"
            >
                Download Avatar
            </button>
        </div>
    );
}
