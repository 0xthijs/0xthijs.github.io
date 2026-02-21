"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhaseCard } from "@/components/journey/PhaseCard";
import { ChecklistItem } from "@/components/journey/ChecklistItem";
import { Button } from "@/components/ui/Button";
import { useOnboardingStore } from "@/lib/store";

export default function Phase2Page() {
    const router = useRouter();
    const { addEnergy, setPhase, markStepComplete } = useOnboardingStore();

    const [accounts, setAccounts] = useState({
        email: false,
        slack: false,
        hr: false,
        project: false,
        mfa: false,
    });

    const [order, setOrder] = useState<string[]>([]);

    const toggleAccount = (key: keyof typeof accounts) => {
        const nextState = !accounts[key];
        setAccounts(prev => ({ ...prev, [key]: nextState }));

        if (nextState && !order.includes(key)) {
            const newOrder = [...order, key];
            setOrder(newOrder);
            markStepComplete(`phase2_${key}`);

            // More balanced energy distribution
            const points = newOrder.length === 1 ? 5 : 2;
            if (key === 'mfa' || key === 'hr') addEnergy('root', points);
            if (key === 'slack') addEnergy('flow', points);
            if (key === 'project') addEnergy('spark', points);
            if (key === 'email') addEnergy('pulse', points);
        }
    };

    const allAccountsChecked = Object.values(accounts).every(Boolean);

    const handleContinue = () => {
        setPhase(3);
        router.push('/onboarding/phase-3');
    };

    return (
        <PhaseCard
            title="Toegang & Accounts"
            subtitle="Kies zelf waar je mee begint."
        >
            <div className="space-y-12">
                <div className="bg-background rounded-sm shadow-sm border border-foreground/5 overflow-hidden">
                    <ChecklistItem
                        id="mfa"
                        title="🔒 SSO / MFA Activeren"
                        isCompleted={accounts.mfa}
                        onToggle={(id) => toggleAccount(id as any)}
                    />
                    <ChecklistItem
                        id="email"
                        title="📧 E-mail & Agenda inloggen"
                        isCompleted={accounts.email}
                        onToggle={(id) => toggleAccount(id as any)}
                    />
                    <ChecklistItem
                        id="slack"
                        title="💬 Slack of Teams account activeren"
                        isCompleted={accounts.slack}
                        onToggle={(id) => toggleAccount(id as any)}
                    />
                    <ChecklistItem
                        id="hr"
                        title="👤 HR-systeem gegevens controleren"
                        isCompleted={accounts.hr}
                        onToggle={(id) => toggleAccount(id as any)}
                    />
                    <ChecklistItem
                        id="project"
                        title="📋 Project tool eerste login"
                        isCompleted={accounts.project}
                        onToggle={(id) => toggleAccount(id as any)}
                    />
                </div>

                <div className="pt-8 flex justify-end">
                    <Button
                        onClick={handleContinue}
                        disabled={!allAccountsChecked}
                    >
                        Verder naar Tools Leren Kennen
                    </Button>
                </div>
            </div>
        </PhaseCard>
    );
}
