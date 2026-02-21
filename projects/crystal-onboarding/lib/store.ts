import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EnergyScores, INITIAL_ENERGY, EnergyType } from './energy';

export interface Profile {
    name: string;
    preferredName: string;
    baseColor: string | null;
    workStyle: string | null;
    favoriteTool: string | null;
    birthYear: number | null;
    zodiac: string | null;
    funFacts: string[];
    connections: string[];
}

export interface OnboardingState {
    profile: Profile;
    energy: EnergyScores;
    currentPhase: number;
    completedSteps: string[];
    fastCompletion: boolean;

    setProfileData: (data: Partial<Profile>) => void;
    addEnergy: (type: EnergyType, amount: number) => void;
    setPhase: (phase: number) => void;
    markStepComplete: (step: string) => void;
    addConnection: (person: string) => void;
    reset: () => void;
}

const initialProfile: Profile = {
    name: '',
    preferredName: '',
    baseColor: null,
    workStyle: null,
    favoriteTool: null,
    birthYear: null,
    zodiac: null,
    funFacts: [],
    connections: [],
};

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            profile: initialProfile,
            energy: INITIAL_ENERGY,
            currentPhase: 0,
            completedSteps: [],
            fastCompletion: true,

            setProfileData: (data) =>
                set((state) => ({
                    profile: { ...state.profile, ...data }
                })),

            addEnergy: (type, amount) =>
                set((state) => ({
                    energy: {
                        ...state.energy,
                        [type]: state.energy[type] + amount,
                    }
                })),

            setPhase: (phase) =>
                set({ currentPhase: phase }),

            markStepComplete: (step) =>
                set((state) => ({
                    completedSteps: state.completedSteps.includes(step)
                        ? state.completedSteps
                        : [...state.completedSteps, step]
                })),

            addConnection: (person) =>
                set((state) => ({
                    profile: {
                        ...state.profile,
                        connections: [...state.profile.connections, person]
                    }
                })),

            reset: () => set({
                profile: initialProfile,
                energy: INITIAL_ENERGY,
                currentPhase: 0,
                completedSteps: []
            }),
        }),
        {
            name: 'crystal-onboarding-storage',
        }
    )
);
