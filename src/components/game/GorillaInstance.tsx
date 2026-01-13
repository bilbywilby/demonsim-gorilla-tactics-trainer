import React from 'react';
import { motion } from 'framer-motion';
import { GorillaAvatar } from './GorillaAvatar';
import { GorillaOverlay } from './GorillaOverlay';
import { useGameStore } from '@/store/gameStore';
import { cn } from '@/lib/utils';
interface GorillaInstanceProps {
  index: number;
}
export function GorillaInstance({ index }: GorillaInstanceProps) {
  const gorilla = useGameStore(s => s.gorillas[index]);
  const activeTargetIndex = useGameStore(s => s.activeTargetIndex);
  const setTarget = useGameStore(s => s.setTarget);
  if (!gorilla) return null;
  const isTargeted = activeTargetIndex === index;
  return (
    <div 
      className={cn(
        "relative p-8 rounded-3xl transition-all duration-300 cursor-pointer group",
        isTargeted ? "bg-white/5 ring-2 ring-orange-500/50" : "hover:bg-white/5"
      )}
      onClick={() => setTarget(index)}
    >
      <div className="flex flex-col items-center">
        <div className="h-40 flex items-end justify-center">
          <GorillaOverlay instanceIndex={index} />
          <GorillaAvatar instanceIndex={index} />
        </div>
        {isTargeted && (
          <motion.div 
            layoutId="target-indicator"
            className="mt-4 px-3 py-1 bg-orange-600 rounded-full text-[10px] font-bold uppercase tracking-tighter text-white"
          >
            Current Target
          </motion.div>
        )}
      </div>
    </div>
  );
}