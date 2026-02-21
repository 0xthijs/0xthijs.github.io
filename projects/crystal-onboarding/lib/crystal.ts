import { EnergyScores, calculateDominantEnergy } from './energy';

export interface CrystalParams {
    baseColor: string;
    dominantEnergy: string;
    shape: string;
    facetDensity: number;
    innerLight: number;
    pattern: string;
    background: string;
    lightLines: number;
}

export function generateCrystalParams(
    scores: EnergyScores,
    baseColorChoice: string | null,
    zodiac: string | null,
    workplace: string | null,
    fastCompletion: boolean,
    connectionsMade: number
): CrystalParams {
    const dominant = calculateDominantEnergy(scores);

    const shapes: Record<string, string> = {
        spark: 'obelisk',
        flow: 'sphere-like',
        pulse: 'asymmetric',
        root: 'cube-like',
    };

    const backgrounds: Record<string, string> = {
        'thuis': 'soft-glow',
        'kantoor': 'structured-grid',
        'hybride': 'split-tone',
        'onderweg': 'dynamic-lines'
    };

    return {
        baseColor: baseColorChoice || '#ffffff',
        dominantEnergy: dominant,
        shape: shapes[dominant] || 'obelisk',
        facetDensity: fastCompletion ? 5 : 12, // fewer facets if fast, more if took time
        innerLight: connectionsMade * 10,
        pattern: zodiac || 'none',
        background: workplace ? (backgrounds[workplace.toLowerCase()] || 'transparent') : 'transparent',
        lightLines: connectionsMade,
    };
}
