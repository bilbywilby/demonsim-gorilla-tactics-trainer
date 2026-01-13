import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { GorillaInstance } from './GorillaInstance';
import { cn } from '@/lib/utils';
export function GorillaManager() {
  const count = useGameStore(s => s.gorillas.length);
  const gridCols = count === 1 ? 'grid-cols-1' : count === 2 ? 'grid-cols-2' : 'grid-cols-2';
  const gridRows = count <= 2 ? 'grid-rows-1' : 'grid-rows-2';
  return (
    <div className={cn(
      "grid gap-8 w-full h-full items-center justify-center p-4",
      gridCols,
      gridRows
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <GorillaInstance key={i} index={i} />
      ))}
    </div>
  );
}