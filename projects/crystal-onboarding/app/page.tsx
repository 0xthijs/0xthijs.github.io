"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import { Crystal } from '@/components/crystal/Crystal';
import { generateCrystalParams } from '@/lib/crystal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function WelcomePage() {
  const router = useRouter();
  const { profile, energy, setProfileData, setPhase, fastCompletion, addEnergy, reset } = useOnboardingStore();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [nameInput, setNameInput] = useState('');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameInput.trim();
    if (name) {
      reset(); // Clear purely local history
      setProfileData({ name: name, preferredName: name });

      // Determine base shape via name length/characters so every user starts slightly differently
      const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const types: ('spark' | 'flow' | 'root' | 'pulse')[] = ['spark', 'flow', 'root', 'pulse'];
      const initialType = types[charCodeSum % 4];

      addEnergy(initialType, 5); // Seed the shape

      setStep(1);
    }
  };

  const handleColorSelect = (color: string) => {
    setProfileData({ baseColor: color });
    setStep(2);
    setTimeout(() => {
      setPhase(1);
      router.push('/onboarding/intro');
    }, 3000);
  };

  const colors = [
    { id: '#ffffff', label: 'Helder wit' },
    { id: 'warm amber', label: 'Warm amber' },
    { id: 'diep blauw', label: 'Diep blauw' },
    { id: 'zacht groen', label: 'Zacht groen' },
  ];

  const tempParams = generateCrystalParams(
    energy,
    profile.baseColor || '#ffffff',
    profile.zodiac,
    profile.workStyle,
    fastCompletion,
    profile.connections.length
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground overflow-hidden">
      <AnimatePresence mode="wait">

        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md text-center space-y-12"
          >
            <Crystal
              baseColor={tempParams.baseColor}
              dominantEnergy={tempParams.dominantEnergy || "flow"}
              zodiacAnimal="none"
              connections={0}
              phase={0}
              interactive={false}
            />
            <div className="space-y-2">
              <h1 className="text-4xl font-serif">Welkom.</h1>
              <p className="text-foreground/50 tracking-wide">Hoe mogen we je noemen?</p>
            </div>
            <form onSubmit={handleNameSubmit} className="space-y-8">
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Jouw roepnaam"
                className="text-center text-3xl pb-4 border-b-2"
                autoFocus
              />
              <Button type="submit" disabled={!nameInput.trim()} className="w-full py-4 text-sm tracking-widest uppercase">
                Verder
              </Button>
            </form>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md text-center space-y-16"
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-serif">Kies intuïtief.</h1>
              <p className="text-foreground/50 tracking-wide">Welke kleur voelt passend?</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorSelect(c.id)}
                  className="p-8 border border-foreground/10 hover:border-foreground/40 transition-colors uppercase tracking-widest text-xs font-medium"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md text-center space-y-12"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="mx-auto w-64 h-64"
            >
              <Crystal
                baseColor={profile.baseColor || 'white'}
                dominantEnergy={tempParams.dominantEnergy} // Use the seed derived from the name!
                zodiacAnimal="none"
                connections={0}
                phase={1}
                interactive={false}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-serif text-2xl italic text-foreground/80"
            >
              Je kristal heeft zijn eerste facet.
            </motion.p>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
