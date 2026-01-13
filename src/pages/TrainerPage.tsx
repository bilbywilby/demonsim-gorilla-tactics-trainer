import React, { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GorillaManager } from '@/components/game/GorillaManager';
import { BoulderOverlay } from '@/components/game/BoulderOverlay';
import { HitsplatManager } from '@/components/game/HitsplatManager';
import { PlayerHUD } from '@/components/game/PlayerHUD';
import { CombatLog } from '@/components/game/CombatLog';
import { AnalyticsOverlay } from '@/components/game/AnalyticsOverlay';
import { useGameStore } from '@/store/gameStore';
import { useAudioAlerts } from '@/hooks/use-audio-alerts';
import { TICK_MS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
export function TrainerPage() {
  const tick = useGameStore(s => s.tick);
  const reset = useGameStore(s => s.reset);
  const stopSession = useGameStore(s => s.stopSession);
  const isRunning = useGameStore(s => s.game.isRunning);
  const startTime = useGameStore(s => s.stats.startTime);
  const endTime = useGameStore(s => s.stats.endTime);
  const zoom = useGameStore(s => s.config.zoom);
  // Initialize Audio Engine
  useAudioAlerts();
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => tick(), TICK_MS);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden' && isRunning) stopSession();
    };
    window.addEventListener('visibilitychange', handleVisibility);
    return () => window.removeEventListener('visibilitychange', handleVisibility);
  }, [isRunning, stopSession]);
  const showAnalytics = !isRunning && startTime > 0 && (endTime > 0 || useGameStore.getState().player.hp <= 0);
  return (
    <AppLayout className="bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 h-screen flex flex-col overflow-hidden">
        <div className="py-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center font-bold text-white italic">D</div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none">DemonSim v2</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Multi-Gorilla Trainer</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={reset} className="bg-orange-600 hover:bg-orange-500 font-bold h-9">
                <Play className="w-4 h-4 mr-2 fill-current" /> Start Training
              </Button>
            ) : (
              <Button variant="outline" onClick={stopSession} className="text-slate-300 border-white/10 h-9">
                <RefreshCw className="w-4 h-4 mr-2" /> Stop Session
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 py-6 min-h-0">
          <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
            <div className="flex-1 relative bg-slate-900 rounded-3xl border border-white/5 overflow-auto custom-scrollbar">
              <motion.div 
                className="min-h-full flex items-center justify-center"
                animate={{ scale: zoom }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <GorillaManager />
                <BoulderOverlay />
                <HitsplatManager />
              </motion.div>
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