import React from 'react';
import { motion } from 'framer-motion';
import { GorillaAvatar } from './GorillaAvatar';
import { GorillaOverlay } from './GorillaOverlay';
import { useGameStore } from '@/store/gameStore';
export function GameCanvas() {
  const zoom = useGameStore(s => s.config.zoom);
  return (
    <div className="relative w-full aspect-square md:aspect-video bg-slate-950 rounded-2xl border border-slate-800/50 shadow-inner overflow-hidden flex items-center justify-center">
      {/* Background/Environment */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/40 via-transparent to-transparent" />
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-slate-700/30" />
          ))}
        </div>
      </div>
      {/* Scalable Container */}
      <motion.div 
        className="relative flex flex-col items-center"
        animate={{ scale: zoom }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <GorillaOverlay />
        <GorillaAvatar />
        {/* Ground shadow - linked to gorilla position */}
        <div className="absolute bottom-[-10px] w-32 h-6 bg-black/60 blur-xl rounded-full -z-10" />
      </motion.div>
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-700" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-700" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-700" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-700" />
    </div>
  );
}