import React from 'react';
import { JourneyLayout } from '@/components/journey/JourneyLayout';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <JourneyLayout>
            {children}
        </JourneyLayout>
    );
}
