import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { PRAYER_ICONS, STYLE_COLORS, MAX_HP } from '@/lib/constants';
interface GorillaAvatarProps {
  instanceIndex: number;
}
export function GorillaAvatar({ instanceIndex }: GorillaAvatarProps) {
  const hp = useGameStore(s => s.gorillas[instanceIndex]?.hp ?? 0);
  const style = useGameStore(s => s.gorillas[instanceIndex]?.style ?? 'MELEE');
  const prayer = useGameStore(s => s.gorillas[instanceIndex]?.prayer ?? 'MAGIC');
  const isAttacking = useGameStore(s => s.gorillas[instanceIndex]?.isAttacking ?? false);
  const hpPercent = (hp / MAX_HP) * 100;
  return (
    <div className="relative">
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <div className="text-4xl filter drop-shadow-md">
          {PRAYER_ICONS[prayer as keyof typeof PRAYER_ICONS]}
        </div>
      </div>
      <motion.div
        animate={isAttacking ? { x: [0, -20, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center transition-colors duration-500 relative overflow-hidden"
          style={{
            backgroundColor: `${STYLE_COLORS[style as keyof typeof STYLE_COLORS]}33`,
            border: `3px solid ${STYLE_COLORS[style as keyof typeof STYLE_COLORS]}`
          }}
        >
          <div className="text-5xl select-none">🦍</div>
        </div>
        <div className="absolute -top-4 left-0 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={false}
            animate={{ width: `${hpPercent}%` }}
            className="h-full bg-green-500"
          />
        </div>
      </motion.div>
    </div>
  );
}