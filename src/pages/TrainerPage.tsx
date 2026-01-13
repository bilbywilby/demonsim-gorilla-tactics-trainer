import React, { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GameCanvas } from '@/components/game/GameCanvas';
import { PlayerHUD } from '@/components/game/PlayerHUD';
import { CombatLog } from '@/components/game/CombatLog';
import { AnalyticsOverlay } from '@/components/game/AnalyticsOverlay';
import { useGameStore } from '@/store/gameStore';
import { TICK_MS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play, Trophy } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
export function TrainerPage() {
  const tick = useGameStore(s => s.tick);
  const reset = useGameStore(s => s.reset);
  const stopSession = useGameStore(s => s.stopSession);
  const isRunning = useGameStore(s => s.game.isRunning);
  const startTime = useGameStore(s => s.stats.startTime);
  const endTime = useGameStore(s => s.stats.endTime);
  // Game Loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        tick();
      }, TICK_MS);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);
  // Handle visibility change / tab switching (simulate logging out)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isRunning) {
        stopSession();
      }
    };
    const handleBlur = () => {
      if (isRunning) stopSession();
    };
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isRunning, stopSession]);
  const showAnalytics = !isRunning && startTime > 0 && (endTime > 0 || useGameStore.getState().player.hp <= 0 || useGameStore.getState().gorilla.hp <= 0);
  return (
    <AppLayout className="bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col overflow-hidden relative">
        <div className="py-4 flex justify-between items-center border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center font-bold italic">D</div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none">DemonSim</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Gorilla Tactics Simulator</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={reset} className="bg-orange-600 hover:bg-orange-500 font-bold h-9">
                <Play className="w-4 h-4 mr-2 fill-current" /> Start Training
              </Button>
            ) : (
              <Button variant="outline" onClick={stopSession} className="text-slate-300 border-slate-800 h-9">
                <RefreshCw className="w-4 h-4 mr-2" /> Stop Session
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 py-6 min-h-0">
          <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
            <div className="flex-1 min-h-0 flex flex-col relative">
              <GameCanvas />
            </div>
            <PlayerHUD />
          </div>
          <div className="lg:col-span-1 h-full flex flex-col min-h-0">
            <CombatLog />
          </div>
        </div>
        <AnimatePresence>
          {showAnalytics && <AnalyticsOverlay />}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}