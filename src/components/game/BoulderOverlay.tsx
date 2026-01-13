import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
export function BoulderOverlay() {
  const boulders = useGameStore(s => s.game.boulders);
  const tickCount = useGameStore(s => s.game.tickCount);
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
      <AnimatePresence>
        {boulders.map((b) => {
          const progress = (tickCount - b.spawnTick) / (b.hitTick - b.spawnTick);
          return (
            <React.Fragment key={b.id}>
              {/* Shadow */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 0.6 }}
                exit={{ scale: 2.5, opacity: 0 }}
                className="absolute w-16 h-8 bg-black blur-md rounded-full bottom-20"
              />
              {/* Rock */}
              <motion.div
                initial={{ y: -600, opacity: 1, rotate: 0 }}
                animate={{ y: -80, rotate: 360 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.8, ease: "linear" }}
                className="absolute text-7xl filter drop-shadow-2xl"
              >
                🪨
              </motion.div>
            </React.Fragment>
          );
        })}
      </AnimatePresence>
    </div>
  );
}