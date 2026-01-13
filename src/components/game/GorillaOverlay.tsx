import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { ATTACK_STYLES, STYLE_COLORS, PRAYER_ICONS, COLOR_STAGES } from '@/lib/constants';
interface GorillaOverlayProps {
  instanceIndex: number;
}
export function GorillaOverlay({ instanceIndex }: GorillaOverlayProps) {
  const gorilla = useGameStore(s => s.gorillas[instanceIndex]);
  const tickCount = useGameStore(s => s.game.tickCount);
  const showPluginOverlay = useGameStore(s => s.config.showPluginOverlay);
  const showProgressBar = useGameStore(s => s.config.showProgressBar);
  const progressBarWidth = useGameStore(s => s.config.progressBarWidth);
  if (!gorilla || !showPluginOverlay) return null;
  const remainingTicks = Math.max(0, gorilla.nextAttackTick - tickCount);
  const possibleNextStyles = ATTACK_STYLES.filter(s => s !== gorilla.style);
  let barColor = COLOR_STAGES.SAFE;
  if (gorilla.damageTakenInPhase >= 41) barColor = COLOR_STAGES.DANGER;
  else if (gorilla.damageTakenInPhase >= 26) barColor = COLOR_STAGES.WARNING;
  const progressPercent = Math.min(100, (gorilla.damageTakenInPhase / 50) * 100);
  return (
    <div className="absolute -top-32 flex flex-col items-center gap-2 z-20 pointer-events-none">
      {showProgressBar && (
        <div
          className="h-1 bg-black/60 rounded-full overflow-hidden border border-white/10"
          style={{ width: progressBarWidth }}
        >
          <motion.div
            initial={false}
            animate={{
              width: `${progressPercent}%`,
              backgroundColor: barColor,
            }}
            className="h-full"
          />
        </div>
      )}
      <div className="flex gap-2 scale-75">
        <div className="bg-black/80 px-2 py-1 rounded border border-white/10 backdrop-blur-sm min-w-[50px] text-center">
          <div className="text-[10px] font-mono font-bold" style={{ color: remainingTicks <= 1 ? '#EF4444' : '#FFFFFF' }}>
            {remainingTicks}t
          </div>
        </div>
        {gorilla.missCount >= 2 && (
          <div className="flex gap-1">
            {possibleNextStyles.map(s => (
              <div
                key={s}
                className="w-6 h-6 rounded flex items-center justify-center text-sm border border-white/10"
                style={{ backgroundColor: `${STYLE_COLORS[s]}55` }}
              >
                {PRAYER_ICONS[s as keyof typeof PRAYER_ICONS]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}