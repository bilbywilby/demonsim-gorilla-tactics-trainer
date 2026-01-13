import React, { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GameCanvas } from '@/components/game/GameCanvas';
import { PlayerHUD } from '@/components/game/PlayerHUD';
import { CombatLog } from '@/components/game/CombatLog';
import { useGameStore } from '@/store/gameStore';
import { TICK_MS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play } from 'lucide-react';
export function TrainerPage() {
  const tick = useGameStore(s => s.tick);
  const reset = useGameStore(s => s.reset);
  const isRunning = useGameStore(s => s.game.isRunning);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        tick();
      }, TICK_MS);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col overflow-hidden bg-[#020617]">
        <div className="py-4 flex justify-between items-center border-b border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-white">Gorilla Tactics Trainer</h1>
            <p className="text-xs text-slate-400">Simulation of Demonic Gorilla Mechanics</p>
          </div>
          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={reset} className="bg-green-600 hover:bg-green-500">
                <Play className="w-4 h-4 mr-2" /> Start Session
              </Button>
            ) : (
              <Button variant="outline" onClick={reset} className="text-slate-300">
                <RefreshCw className="w-4 h-4 mr-2" /> Reset
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 py-6 min-h-0">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex-1 min-h-0">
              <GameCanvas />
            </div>
            <PlayerHUD />
          </div>
          <div className="lg:col-span-1 h-full">
            <CombatLog />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}