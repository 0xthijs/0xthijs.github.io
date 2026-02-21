import { Crystal } from "@/components/crystal/Crystal";
import { CrystalParams } from "@/lib/crystal";

interface ConnectionCardProps {
    name: string;
    role: string;
    funFact: string;
    crystalParams: CrystalParams;
    onConnect: () => void;
    isConnected: boolean;
}

export function ConnectionCard({ name, role, funFact, crystalParams, onConnect, isConnected }: ConnectionCardProps) {
    return (
        <div className="border border-foreground/10 p-6 flex flex-col items-center text-center space-y-4 bg-background shadow-sm hover:shadow-md transition-shadow">
            <div className="w-24 h-24 mb-2">
                <Crystal
                    baseColor={crystalParams.baseColor}
                    dominantEnergy={
                        crystalParams.shape === 'obelisk' ? 'spark' :
                            crystalParams.shape === 'sphere-like' ? 'flow' :
                                crystalParams.shape === 'cube-like' ? 'root' : 'pulse'
                    }
                    zodiacAnimal={crystalParams.pattern}
                    connections={crystalParams.lightLines}
                    phase={6}
                    interactive={true}
                />
            </div>
            <div>
                <h3 className="font-serif text-lg">{name}</h3>
                <p className="text-xs text-foreground/50 uppercase tracking-widest mt-1">{role}</p>
            </div>
            <p className="text-sm italic text-foreground/80 py-4 border-y border-foreground/5 w-full">"{funFact}"</p>

            <button
                onClick={onConnect}
                disabled={isConnected}
                className={`mt-4 w-full py-3 text-xs uppercase tracking-widest transition-colors border ${isConnected ? 'bg-foreground/5 border-transparent text-foreground/50' : 'border-foreground hover:bg-foreground hover:text-background'}`}
            >
                {isConnected ? 'Verbonden' : 'Zeg Hallo'}
            </button>
        </div>
    );
}
