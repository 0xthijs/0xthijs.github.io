"use client";

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { ZODIAC_SVGS } from '@/lib/zodiac-svgs';
import { motion } from 'framer-motion';

interface CrystalProps {
    baseColor: 'amber' | 'blue' | 'green' | 'white' | string;
    dominantEnergy: 'spark' | 'flow' | 'pulse' | 'root' | string;
    zodiacAnimal: string;
    connections: number;
    phase: number;
    interactive: boolean;
    className?: string; // Optional for positioning
}

// -------------------------------------------------------------
// Helper to get color values
// -------------------------------------------------------------
const getColorValue = (colorName: string): string => {
    const map: Record<string, string> = {
        'amber': '#faaf32',
        'warm amber': '#faaf32',
        'blue': '#2878ff',
        'diep blauw': '#2878ff',
        'green': '#78d2a0',
        'zacht groen': '#78d2a0',
        'white': '#ffffff',
        '#ffffff': '#ffffff',
    };
    return map[colorName] || '#ffffff';
};

// -------------------------------------------------------------
// The actual 3D Crystal Mesh Component
// -------------------------------------------------------------
function CrystalMesh({ dominantEnergy, baseColor, phase, interactive }: Partial<CrystalProps>) {
    const meshRef = useRef<THREE.Group>(null);
    const colorHex = getColorValue(baseColor || 'white');
    const [hovered, setHovered] = useState(false);

    // Rotation logic
    useFrame((state, delta) => {
        if (meshRef.current) {
            // Base rotation varies by energy
            let speedY = dominantEnergy === 'pulse' ? 0.8 : 0.4;
            if (dominantEnergy === 'flow') speedY = 0.2;

            // Speed up on hover if interactive
            if (interactive && hovered) speedY *= 3;

            meshRef.current.rotation.y += delta * speedY;
            meshRef.current.rotation.x += delta * (speedY * 0.3); // Slight wobble
        }
    });

    // Decide Base Geometry based on Energy Profile
    const baseGeometry = useMemo(() => {
        // If we want to hide the shape (e.g. during pulsing countdown), use a simple sphere
        if (dominantEnergy === 'hidden') {
            return new THREE.SphereGeometry(1.2, 8, 8); // Low poly sphere as a blob
        }

        switch (dominantEnergy) {
            case 'root':
                // Diamond-like chunky solid geode (32 faces)
                return new THREE.OctahedronGeometry(1.5, 1);
            case 'spark':
                // Highly faceted, erratic gem (320 faces when fully revealed)
                return new THREE.IcosahedronGeometry(1.5, phase && phase > 3 ? 2 : 1);
            case 'pulse':
                // Sharp, aggressive 5-sided spire cone
                return new THREE.CylinderGeometry(0, 1.2, 3, 5, 2);
            case 'flow':
            default:
                // Soft, complex organic multi-face (geodesic dome look)
                return new THREE.DodecahedronGeometry(1.5, 1);
        }
    }, [dominantEnergy, phase]);

    // Convert to Edges Only
    const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(baseGeometry), [baseGeometry]);

    return (
        <group
            ref={meshRef}
            rotation={[0.2, 0, 0.1]} // Initial slight tilt
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Inner Solid Volume for depth */}
            <mesh geometry={baseGeometry} scale={0.99}>
                <meshBasicMaterial color={colorHex} transparent opacity={0.02} />
            </mesh>

            {/* Crisp Base Line Edge Layer */}
            <lineSegments geometry={edgesGeometry}>
                <lineBasicMaterial color={colorHex} transparent opacity={0.5} />
            </lineSegments>

            {/* Very Subtle Outer Glow Edge Layer */}
            <lineSegments geometry={edgesGeometry} scale={1.02}>
                <lineBasicMaterial color={colorHex} transparent opacity={0.15} linewidth={1} />
            </lineSegments>
        </group>
    );
}

// -------------------------------------------------------------
// Zodiac Engraving (SVG projected inside)
// -------------------------------------------------------------
// Note: SVG rendering in Three.js is complex and heavy via SVGLoader.
// For a minimalist web approach, we use a 2D HTML/SVG overlay centered inside the 3D canvas.
function ZodiacOverlay({ animal, color, opacity }: { animal: string, color: string, opacity: number }) {
    const svgData = ZODIAC_SVGS[animal];
    if (!svgData) return null;

    return (
        <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ mixBlendMode: 'screen' }}
        >
            {/* Soft Glow Layer */}
            <svg
                viewBox={svgData.viewBox}
                className="absolute w-28 h-28 sm:w-36 sm:h-36 opacity-80"
                style={{
                    filter: `blur(8px) drop-shadow(0 0 15px ${color})`,
                    transition: 'all 2s ease-in-out'
                }}
            >
                <path
                    d={svgData.path}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Sharp Inner Core Layer */}
            <svg
                viewBox={svgData.viewBox}
                className="absolute w-28 h-28 sm:w-36 sm:h-36"
                style={{
                    opacity: Math.max(opacity, 0.4),
                    filter: `drop-shadow(0 0 2px #ffffff)`,
                    transition: 'all 2s ease-in-out'
                }}
            >
                <path
                    d={svgData.path}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

// -------------------------------------------------------------
// Main Wrapper Component
// -------------------------------------------------------------
export function Crystal({
    baseColor,
    dominantEnergy,
    zodiacAnimal,
    connections,
    phase,
    interactive,
    className
}: CrystalProps) {

    const colorHex = getColorValue(baseColor);

    // Opacity scales with connections (0 to 5) but starting higher so it's not boring at phase 0
    const innerOpacity = phase >= 5 ? 0.9 : Math.min(0.5 + (connections * 0.1), 0.9);

    // Keep it fully opaque and sharp at all phases (no more blur)
    const wrapperOpacity = 1;
    const blur = 'none';

    return (
        <div
            className={cn("relative flex items-center justify-center w-full h-full", className)}
            style={{ opacity: wrapperOpacity, filter: blur, transition: 'all 2s ease-in-out' }}
        >
            {/* Background Radial Glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${colorHex}${Math.floor(innerOpacity * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
                    opacity: 0.6
                }}
            />

            {/* The 3D Canvas */}
            <div className={cn("absolute inset-0 z-0", !interactive && "pointer-events-none")}>
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
                    <ambientLight intensity={1} />
                    <CrystalMesh
                        dominantEnergy={dominantEnergy}
                        baseColor={baseColor}
                        phase={phase}
                        interactive={interactive}
                    />
                </Canvas>
            </div>

            {/* Zodiac Engraving Overlay - Only visible after Phase 4 (where it is asked) */}
            {phase >= 5 && zodiacAnimal !== 'none' && (
                <ZodiacOverlay animal={zodiacAnimal} color={colorHex} opacity={innerOpacity} />
            )}
        </div>
    );
}
