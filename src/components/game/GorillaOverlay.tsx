import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { ATTACK_STYLES, STYLE_COLORS, PRAYER_ICONS, COLOR_STAGES, PROGRESS_THRESHOLDS, DAMAGE_CAP } from '@/lib/constants';
interface GorillaOverlayProps {
  instanceIndex: number;
}
export function GorillaOverlay({ instanceIndex }: GorillaOverlayProps) {
  const gorilla = useGameStore(s => s.gorillas[instanceIndex]);
  const tickCount = useGameStore(s => s.game.tickCount);
  const showPluginOverlay = useGameStore(s => s.config.showPluginOverlay);
  const showPrayerProgress = useGameStore(s => s.config.showPrayerProgress);
  const prayerProgressWidth = useGameStore(s => s.config.prayerProgressWidth);
  const zoom = useGameStore(s => s.config.zoom);
  if (!gorilla || !showPluginOverlay) return null;
  const remainingTicks = Math.max(0, gorilla.nextAttackTick - tickCount);
  const possibleNextStyles = ATTACK_STYLES.filter(s => s !== gorilla.style);
  // Color mapping based on damage thresholds
  let barColor = COLOR_STAGES.SAFE;
  if (gorilla.damageTakenInPhase >= PROGRESS_THRESHOLDS.DANGER) {
    barColor = COLOR_STAGES.DANGER;
  } else if (gorilla.damageTakenInPhase >= PROGRESS_THRESHOLDS.WARNING) {
    barColor = COLOR_STAGES.WARNING;
  }
  const isNearingTransition = gorilla.damageTakenInPhase >= PROGRESS_THRESHOLDS.WARNING;
  const progressPercent = Math.min(100, (gorilla.damageTakenInPhase / DAMAGE_CAP) * 100);
  return (
    <div 
      className="absolute -top-32 flex flex-col items-center gap-2 z-20 pointer-events-none"
      style={{ transform: `scale(${zoom})` }}
    >
      {showPrayerProgress && (
        <div
          className="h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10 shadow-lg"
          style={{ width: prayerProgressWidth }}
        >
          <motion.div
            initial={false}
            animate={{
              width: `${progressPercent}%`,
              backgroundColor: barColor,
              opacity: isNearingTransition ? [1, 0.6, 1] : 1
            }}
            transition={{
              opacity: { repeat: Infinity, duration: 0.5 }
            }}
            className="h-full"
          />
        </div>
      )}
      <div className="flex gap-2 items-center">
        {/* Tick Timer Overlay */}
        <div className="bg-black/80 px-2 py-1 rounded border border-white/10 backdrop-blur-sm min-w-[40px] text-center shadow-xl">
          <div className="text-xs font-mono font-bold" style={{ color: remainingTicks <= 1 ? '#EF4444' : '#FFFFFF' }}>
            {remainingTicks}t
          </div>
        </div>
        {/* Style Prediction */}
        {gorilla.missCount >= 2 && (
          <div className="flex gap-1">
            {possibleNextStyles.map(s => (
              <motion.div
                key={s}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-7 h-7 rounded bg-black/80 flex items-center justify-center text-sm border border-white/10 shadow-xl"
                style={{ borderColor: STYLE_COLORS[s] }}
              >
                {PRAYER_ICONS[s as keyof typeof PRAYER_ICONS]}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}