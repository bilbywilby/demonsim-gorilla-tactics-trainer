import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { AnimatePresence, motion } from 'framer-motion';
interface Hitsplat {
  id: string;
  amount: number;
  type: 'player' | 'gorilla';
  gorillaId?: string;
}
export function HitsplatManager() {
  const events = useGameStore(s => s.game.events);
  const [hitsplats, setHitsplats] = useState<Hitsplat[]>([]);
  useEffect(() => {
    if (events.length === 0) return;
    const latest = events[events.length - 1];
    if (latest.type === 'DAMAGE') {
      const newSplat: Hitsplat = {
        id: latest.id,
        amount: latest.value.amount,
        type: latest.value.target,
        gorillaId: latest.gorillaId
      };
      setHitsplats(prev => [...prev.slice(-10), newSplat]);
      setTimeout(() => {
        setHitsplats(prev => prev.filter(h => h.id !== newSplat.id));
      }, 1000);
    }
  }, [events]);
  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {hitsplats.map(h => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -100, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 font-mono font-black text-4xl italic drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${
              h.type === 'player' ? 'text-red-500' : h.amount === 0 ? 'text-blue-400' : 'text-orange-400'
            }`}
          >
            {h.amount}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}