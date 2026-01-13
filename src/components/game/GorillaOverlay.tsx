import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { ATTACK_STYLES, STYLE_COLORS, PRAYER_ICONS, COLOR_STAGES } from '@/lib/constants';
export function GorillaOverlay() {
  const currentStyle = useGameStore(s => s.gorilla.style);
  const missCount = useGameStore(s => s.gorilla.missCount);
  const tickCount = useGameStore(s => s.game.tickCount);
  const nextAttackTick = useGameStore(s => s.gorilla.nextAttackTick);
  const damageTakenInPhase = useGameStore(s => s.gorilla.damageTakenInPhase);
  const showPluginOverlay = useGameStore(s => s.config.showPluginOverlay);
  const showProgressBar = useGameStore(s => s.config.showProgressBar);
  const progressBarWidth = useGameStore(s => s.config.progressBarWidth);
  const zoom = useGameStore(s => s.config.zoom);
  if (!showPluginOverlay) return null;
  const remainingTicks = Math.max(0, nextAttackTick - tickCount);
  const possibleNextStyles = ATTACK_STYLES.filter(s => s !== currentStyle);
  // Determine bar color based on phase damage
  let barColor = COLOR_STAGES.SAFE;
  if (damageTakenInPhase >= 41) barColor = COLOR_STAGES.DANGER;
  else if (damageTakenInPhase >= 26) barColor = COLOR_STAGES.WARNING;
  const progressPercent = Math.min(100, (damageTakenInPhase / 50) * 100);
  return (
    <div 
      className="absolute -top-36 flex flex-col items-center gap-4 z-20 pointer-events-none"
      style={{ transform: `scale(${zoom})`, transformOrigin: 'bottom center' }}
    >
      {/* Damage Progress Bar */}
      {showProgressBar && (
        <div className="flex flex-col items-center">
           <div 
            className="h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10"
            style={{ width: progressBarWidth }}
          >
            <motion.div
              initial={false}
              animate={{ 
                width: `${progressPercent}%`,
                backgroundColor: barColor,
                boxShadow: damageTakenInPhase >= 50 ? `0 0 8px ${barColor}` : 'none'
              }}
              className={`h-full ${damageTakenInPhase >= 50 ? 'animate-pulse' : ''}`}
            />
          </div>
        </div>
      )}
      <div className="flex gap-3">
        {/* Neutral Miss Tracker */}
        <div className="flex flex-col items-center bg-black/80 px-2 py-1.5 rounded border border-white/10 backdrop-blur-sm min-w-[64px]">
          <span className="text-[9px] uppercase font-bold text-slate-500 mb-0.5">Misses</span>
          <div className="text-sm font-mono font-bold text-white">
            {missCount}/3
          </div>
        </div>
        {/* Attack Style Options (No advice, just display possible outcomes) */}
        {missCount >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-1.5"
          >
            {possibleNextStyles.map(s => (
              <div
                key={s}
                className="w-8 h-8 rounded flex items-center justify-center text-lg border border-white/20"
                style={{ backgroundColor: `${STYLE_COLORS[s]}55` }}
              >
                {PRAYER_ICONS[s as keyof typeof PRAYER_ICONS]}
              </div>
            ))}
          </motion.div>
        )}
        {/* Attack Timer */}
        <div className="flex flex-col items-center bg-black/80 px-2 py-1.5 rounded border border-white/10 backdrop-blur-sm min-w-[60px]">
          <span className="text-[9px] uppercase font-bold text-slate-500 mb-0.5">Next</span>
          <div className="text-sm font-mono font-bold" style={{ color: remainingTicks <= 1 ? '#EF4444' : '#FFFFFF' }}>
            {remainingTicks}t
          </div>
        </div>
      </div>
    </div>
  );
}