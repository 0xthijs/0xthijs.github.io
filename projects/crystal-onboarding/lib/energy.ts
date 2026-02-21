export type EnergyType = 'spark' | 'flow' | 'pulse' | 'root';

export interface EnergyScores {
    spark: number;
    flow: number;
    pulse: number;
    root: number;
}

export const INITIAL_ENERGY: EnergyScores = {
    spark: 0,
    flow: 0,
    pulse: 0,
    root: 0,
};

export function calculateDominantEnergy(scores: EnergyScores): EnergyType {
    let dominant: EnergyType = 'spark';
    let maxScore = -1;

    (Object.keys(scores) as EnergyType[]).forEach((key) => {
        if (scores[key] > maxScore) {
            maxScore = scores[key];
            dominant = key;
        }
    });

    return dominant;
}

export function calculateSecondaryEnergy(scores: EnergyScores, dominant: EnergyType): EnergyType {
    let secondary: EnergyType = dominant === 'spark' ? 'flow' : 'spark';
    let maxScore = -1;

    (Object.keys(scores) as EnergyType[]).forEach((key) => {
        if (key !== dominant && scores[key] > maxScore) {
            maxScore = scores[key];
            secondary = key;
        }
    });

    return secondary;
}

export function getEnergyDescription(dominant: EnergyType, secondary: EnergyType): string {
    const map: Record<string, string> = {
        'spark-flow': 'Een verbinder die weet waar naartoe.',
        'spark-root': 'Iemand die beslissingen neemt waar anderen nog nadenken.',
        'flow-pulse': 'Een bruggenbouwer met onverwachte invalshoeken.',
        'flow-root': 'De stabiele kracht waar anderen op terugvallen.',
        'pulse-spark': 'Een ideeënmachine met de energie om ze ook uit te voeren.',
        'pulse-flow': 'Creatief denker die mensen meeneemt in zijn of haar wereld.',
        'root-spark': 'Iemand die structuur brengt zonder vaart te verliezen.',
        'root-flow': 'Betrouwbaar, doordacht, en altijd oog voor de mensen eromheen.',
    };

    const key = `${dominant}-${secondary}`;
    const reverseKey = `${secondary}-${dominant}`;

    if (map[key]) return map[key];
    if (map[reverseKey]) return map[reverseKey]; // Fallback

    return 'Een unieke en gebalanceerde combinatie van energieën.';
}
