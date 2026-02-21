export interface ZodiacSVG {
    path: string;
    viewBox: string;
}

// Abstract, single/continuous line style SVGs for Zodiac animals
// Clean geometric paths representing the animal spirit
export const ZODIAC_SVGS: Record<string, ZodiacSVG> = {
    Rat: {
        viewBox: "0 0 24 24",
        path: "M10 16a4 4 0 0 0 4-4c0-2.5-2-4-4-4s-4 1.5-4 4 2 4 4 4zm0 0l-4 4m8-4l4 4m-4-10l2-2m-8 2L6 8"
    },
    Os: {
        viewBox: "0 0 24 24",
        path: "M4 8c2-2 4-2 8-2s6 0 8 2M6 12h12M8 12v6c0 1 1 2 2 2h4c1 0 2-1 2-2v-6m-4 0v4"
    },
    Tijger: {
        viewBox: "0 0 24 24",
        path: "M5 7h14M7 11h10M9 15h6M12 4v16M8 8l-2 4m10-4l2 4"
    },
    Konijn: {
        viewBox: "0 0 24 24",
        path: "M10 14a2 2 0 1 0 4 0v-4c0-2-1.5-3-3-3s-3 1-3 3v4z m-4 4h12M14 6l2-2m-8 2L6 4"
    },
    Draak: {
        viewBox: "0 0 24 24",
        path: "M4 12c4-4 6-2 8 0s4 4 8 0M8 8l2 2m4-2l-2 2M6 18c2-2 4-2 6 0"
    },
    Slang: {
        viewBox: "0 0 24 24",
        path: "M5 8c3-3 5 0 7 2s6 4 7 0M5 16c3 3 5 0 7-2s6-4 7 0"
    },
    Paard: {
        viewBox: "0 0 24 24",
        path: "M8 18V9c0-2 2-3 4-3s4 1 4 3v9M12 6V3m-4 6H5m14 0h-3M8 18h8"
    },
    Geit: {
        viewBox: "0 0 24 24",
        path: "M6 10c2-2 4-2 6-2s4 0 6 2M8 14h8M12 8v12M12 12l-3 3m3-3l3 3"
    },
    Aap: {
        viewBox: "0 0 24 24",
        path: "M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0zm-2 0C4 12 3 14 3 16s2 3 4 3M18 12c2 0 3 2 3 4s-2 3-4 3"
    },
    Haan: {
        viewBox: "0 0 24 24",
        path: "M12 18v-8M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-3 4l-3-2m9 2l3-2M10 20h4"
    },
    Hond: {
        viewBox: "0 0 24 24",
        path: "M8 16a4 4 0 1 0 8 0 4 4 0 1 0-8 0zm-2-6l-2-2m12 2l2-2m-8-2h4"
    },
    Varkentje: {
        viewBox: "0 0 24 24",
        path: "M6 14a6 6 0 1 0 12 0 6 6 0 1 0-12 0zm3-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 4h6"
    }
};
