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
  const variantId = useGameStore(s => s.gorillas[instanceIndex]?.variantId ?? 7144);
  const damageTakenInPhase = useGameStore(s => s.gorillas[instanceIndex]?.damageTakenInPhase ?? 0);
  const hpPercent = (hp / MAX_HP) * 100;
  return (
    <div className="relative">
      {/* Variant ID Label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-[10px] font-mono font-bold text-slate-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
          NPC ID: {variantId}
        </span>
      </div>
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3 }}
          className="text-4xl filter drop-shadow-md"
        >
          {PRAYER_ICONS[prayer as keyof typeof PRAYER_ICONS]}
        </motion.div>
      </div>
      <motion.div
        animate={isAttacking ? { x: [0, -20, 0], scale: [1, 1.05, 1] } : {}}
        key={damageTakenInPhase} // Shake on damage
        initial={false}
        className="relative"
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden shadow-2xl"
          style={{
            backgroundColor: `${STYLE_COLORS[style as keyof typeof STYLE_COLORS]}22`,
            border: `3px solid ${STYLE_COLORS[style as keyof typeof STYLE_COLORS]}`,
            boxShadow: `0 0 20px ${STYLE_COLORS[style as keyof typeof STYLE_COLORS]}33`
          }}
        >
          <div className="text-5xl select-none filter drop-shadow-sm">��</div>
        </div>
        {/* HP Bar */}
        <div className="absolute -top-4 left-0 w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <motion.div
            initial={false}
            animate={{ width: `${hpPercent}%` }}
            className={`h-full ${hpPercent > 50 ? 'bg-green-500' : hpPercent > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
          />
        </div>
      </motion.div>
    </div>
  );
}