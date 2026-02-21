"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhaseCard } from "@/components/journey/PhaseCard";
import { ChecklistItem } from "@/components/journey/ChecklistItem";
import { Button } from "@/components/ui/Button";
import { useOnboardingStore } from "@/lib/store";

export default function Phase3Page() {
    const router = useRouter();
    const { addEnergy, setProfileData, setPhase } = useOnboardingStore();

    const [tasks, setTasks] = useState({
        email: false,
        calendar: false,
        slack: false,
        project: false,
    });

    const [favoriteTool, setFavoriteTool] = useState<string | null>(null);

    const toggleTask = (key: keyof typeof tasks) => {
        const isCurrentlyChecked = tasks[key];
        setTasks(prev => ({ ...prev, [key]: !prev[key] }));

        if (!isCurrentlyChecked) {
            // Energy based on tool
            if (key === 'slack') addEnergy('flow', 5);
            if (key === 'project') addEnergy('root', 5);
            if (key === 'calendar') addEnergy('spark', 5);
            if (key === 'email') addEnergy('pulse', 5);
        }
    };

    const allTasksChecked = Object.values(tasks).every(Boolean);

    const handleContinue = () => {
        if (favoriteTool) {
            setProfileData({ favoriteTool });
            setPhase(4);
            router.push('/onboarding/phase-4');
        }
    };

    const tools = ['Slack / Teams', 'E-mail', 'Project Tool', 'Anders'];

    return (
        <PhaseCard
            title="Tools Leren Kennen"
            subtitle="Neem de tijd om je weg te vinden."
        >
            <div className="space-y-12">
                <section>
                    <h2 className="text-xl font-serif mb-4">Eerste stappen</h2>
                    <div className="bg-background rounded-sm shadow-sm border border-foreground/5 overflow-hidden">
                        <ChecklistItem
                            id="email"
                            title="Stuur een bericht naar je manager"
                            isCompleted={tasks.email}
                            onToggle={(id) => toggleTask(id as any)}
                        />
                        <ChecklistItem
                            id="calendar"
                            title="Plan een kennismakingsgesprek in"
                            isCompleted={tasks.calendar}
                            onToggle={(id) => toggleTask(id as any)}
                        />
                        <ChecklistItem
                            id="slack"
                            title="Zeg hoi in het #general kanaal"
                            isCompleted={tasks.slack}
                            onToggle={(id) => toggleTask(id as any)}
                        />
                        <ChecklistItem
                            id="project"
                            title="Bekijk de documentatie van je eerste project"
                            isCompleted={tasks.project}
                            onToggle={(id) => toggleTask(id as any)}
                        />
                    </div>
                </section>

                <section className={`transition-opacity duration-500 ${allTasksChecked ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                    <h2 className="text-xl font-serif mb-4">Welke tool voelt al het meest als thuis?</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {tools.map(tool => (
                            <button
                                key={tool}
                                onClick={() => setFavoriteTool(tool)}
                                className={`p-4 border text-sm tracking-wide transition-colors ${favoriteTool === tool ? 'border-foreground bg-foreground text-background' : 'border-foreground/20 hover:border-foreground/50'}`}
                            >
                                {tool}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="pt-8 flex justify-end">
                    <Button
                        onClick={handleContinue}
                        disabled={!allTasksChecked || !favoriteTool}
                    >
                        Verder naar Wie Ben Jij
                    </Button>
                </div>
            </div>
        </PhaseCard>
    );
}
