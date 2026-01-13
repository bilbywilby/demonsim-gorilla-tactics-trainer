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
import { RefreshCw, Play, Keyboard } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
export function TrainerPage() {
  const tick = useGameStore(s => s.tick);
  const reset = useGameStore(s => s.reset);
  const stopSession = useGameStore(s => s.stopSession);
  const clearActiveMechanics = useGameStore(s => s.clearActiveMechanics);
  const isRunning = useGameStore(s => s.game.isRunning);
  const startTime = useGameStore(s => s.stats.startTime);
  const endTime = useGameStore(s => s.stats.endTime);
  const hp = useGameStore(s => s.player.hp);
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
      if (document.visibilityState === 'hidden' && isRunning) {
        stopSession();
        clearActiveMechanics();
      }
    };
    window.addEventListener('visibilitychange', handleVisibility);
    return () => window.removeEventListener('visibilitychange', handleVisibility);
  }, [isRunning, stopSession, clearActiveMechanics]);
  const showAnalytics = !isRunning && startTime > 0 && (endTime > 0 || hp <= 0);
  return (
    <AppLayout className="bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="py-6 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-orange-600 flex items-center justify-center font-black text-white italic text-xl shadow-xl">D</div>
            <div>
              <h1 className="text-xl font-black text-white leading-none tracking-tighter italic">DEMONSIM PRO</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">High-Fidelity Trainer</p>
            </div>
          </div>
          <div className="flex gap-3">
            {!isRunning ? (
              <Button onClick={reset} size="lg" className="bg-orange-600 hover:bg-orange-500 font-black h-11 px-8 shadow-lg shadow-orange-600/20">
                <Play className="w-5 h-5 mr-2 fill-current" /> START SESSION
              </Button>
            ) : (
              <Button variant="outline" onClick={stopSession} size="lg" className="text-slate-300 border-white/10 hover:bg-white/5 font-bold h-11">
                <RefreshCw className="w-4 h-4 mr-2" /> STOP
              </Button>
            )}
          </div>
        </div>
        {/* Main Arena */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 py-8 md:py-10 lg:py-12 min-h-0">
          <div className="lg:col-span-3 flex flex-col gap-8 overflow-hidden">
            <div className="flex-1 relative bg-slate-900/50 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl backdrop-blur-sm flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent pointer-events-none" />
              <GorillaManager />
              <BoulderOverlay />
              <HitsplatManager />
              {/* Keyboard Legend Overlay */}
              <div className="absolute bottom-6 left-6 flex gap-4 text-white/20">
                <div className="flex items-center gap-2"><Keyboard className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">Esc to Stop</span></div>
              </div>
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