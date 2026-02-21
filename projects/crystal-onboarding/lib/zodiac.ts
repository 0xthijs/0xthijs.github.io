export const ZODIAC_ANIMALS = [
    'Aap', 'Haan', 'Hond', 'Varkentje',
    'Rat', 'Os', 'Tijger', 'Konijn',
    'Draak', 'Slang', 'Paard', 'Geit'
] as const;

export type ZodiacAnimal = typeof ZODIAC_ANIMALS[number];

export function getZodiacSign(year: number): ZodiacAnimal {
    // 1920 was a Monkey year.
    // We use this as a stable offset.
    const offset = year % 12;
    return ZODIAC_ANIMALS[offset];
}

export function getZodiacDescription(animal: ZodiacAnimal): string {
    const descriptions: Record<ZodiacAnimal, string> = {
        'Rat': 'Snel van begrip, vindingrijk en veelzijdig.',
        'Os': 'Betrouwbaar, sterk en vastberaden.',
        'Tijger': 'Moedig, onvoorspelbaar en zelfverzekerd.',
        'Konijn': 'Rustig, elegant en verantwoordelijk.',
        'Draak': 'Zelfverzekerd, intelligent en enthousiast.',
        'Slang': 'Raadselachtig, intelligent en wijs.',
        'Paard': 'Geanimeerd, actief en energiek.',
        'Geit': 'Kalm, zachtaardig en sympathiek.',
        'Aap': 'Scherp, slim en nieuwsgierig.',
        'Haan': 'Opmerkzaam, hardwerkend en moedig.',
        'Hond': 'Loyaal, eerlijk en vriendelijk.',
        'Varkentje': 'Medelijdend, genereus en ijverig.'
    };
    return descriptions[animal];
}
