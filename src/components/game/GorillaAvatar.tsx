import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { PRAYER_ICONS, STYLE_COLORS, AttackStyle } from '@/lib/constants';
export function GorillaAvatar() {
  const hp = useGameStore(s => s.gorilla.hp);
  const style = useGameStore(s => s.gorilla.style);
  const prayer = useGameStore(s => s.gorilla.prayer);
  const isAttacking = useGameStore(s => s.gorilla.isAttacking);
  const hpPercent = (hp / 380) * 100;
  return (
    <div className="relative">
      {/* Overhead Prayer */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="text-4xl filter drop-shadow-md">
          {PRAYER_ICONS[prayer as keyof typeof PRAYER_ICONS]}
        </div>
      </div>
      {/* Damage Shake & Attack Lunge */}
      <motion.div
        animate={isAttacking ? { x: [0, -20, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.2 }}
        className="relative group"
      >
        <div 
          className="w-48 h-48 rounded-full flex items-center justify-center transition-colors duration-500 relative overflow-hidden"
          style={{ 
            backgroundColor: `${STYLE_COLORS[style as keyof typeof STYLE_COLORS]}33`,
            border: `4px solid ${STYLE_COLORS[style as keyof typeof STYLE_COLORS]}`
          }}
        >
          <div className="text-6xl select-none">🦍</div>
          {/* Internal Style Indicator Glow */}
          <div 
            className="absolute inset-0 animate-pulse opacity-20"
            style={{ backgroundColor: STYLE_COLORS[style as keyof typeof STYLE_COLORS] }}
          />
        </div>
        {/* HP Bar */}
        <div className="absolute -top-4 left-0 w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: `${hpPercent}%` }}
            className="h-full bg-green-500"
          />
        </div>
      </motion.div>
    </div>
  );
}