import { Check } from "lucide-react";

interface ChecklistItemProps {
    id: string;
    title: string;
    isCompleted: boolean;
    onToggle: (id: string) => void;
}

export function ChecklistItem({ id, title, isCompleted, onToggle }: ChecklistItemProps) {
    return (
        <div
            onClick={() => onToggle(id)}
            className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-300 border-b border-foreground/10 last:border-0 hover:bg-foreground/5 ${isCompleted ? 'opacity-50' : 'opacity-100'}`}
        >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isCompleted ? 'bg-foreground border-foreground text-background' : 'border-foreground/30'}`}>
                {isCompleted && <Check size={12} strokeWidth={3} />}
            </div>
            <span className={`text-base font-sans transition-all ${isCompleted ? 'line-through' : ''}`}>{title}</span>
        </div>
    );
}
