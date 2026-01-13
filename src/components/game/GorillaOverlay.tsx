import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { AttackStyle, ATTACK_STYLES, STYLE_COLORS, PRAYER_ICONS } from '@/lib/constants';
export function GorillaOverlay() {
  const currentStyle = useGameStore(s => s.gorilla.style);
  const lastStyle = useGameStore(s => s.gorilla.lastStyle);
  const missCount = useGameStore(s => s.gorilla.missCount);
  const tickCount = useGameStore(s => s.game.tickCount);
  const nextAttackTick = useGameStore(s => s.gorilla.nextAttackTick);
  // Simple heuristic prediction
  // After 3 misses, it switches to one of the other 2 styles
  const isSwitchComing = missCount >= 2;
  const remainingTicks = Math.max(0, nextAttackTick - tickCount);
  // Predict: If 2 misses, show potential switches
  const possibleNextStyles = ATTACK_STYLES.filter(s => s !== currentStyle);
  return (
    <div className="absolute -top-32 flex gap-4">
      {isSwitchComing && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center bg-black/60 p-2 rounded-lg border border-orange-500/50 backdrop-blur-sm"
        >
          <span className="text-[10px] uppercase font-bold text-orange-400 mb-1">Switch Soon</span>
          <div className="flex gap-2">
            {possibleNextStyles.map(s => (
              <div 
                key={s} 
                className="w-8 h-8 rounded flex items-center justify-center text-lg border border-white/20"
                style={{ backgroundColor: `${STYLE_COLORS[s]}44` }}
              >
                {PRAYER_ICONS[s as keyof typeof PRAYER_ICONS]}
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {/* Attack Timer */}
      <div className="flex flex-col items-center bg-black/60 p-2 rounded-lg border border-slate-500/50 backdrop-blur-sm min-w-[60px]">
        <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Attack</span>
        <div className="text-xl font-mono font-bold" style={{ color: remainingTicks <= 1 ? '#EF4444' : '#FFFFFF' }}>
          {remainingTicks}
        </div>
      </div>
    </div>
  );
}