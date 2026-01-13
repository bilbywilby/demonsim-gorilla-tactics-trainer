import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Target, ShieldAlert, HeartPulse, History } from 'lucide-react';
export function AnalyticsOverlay() {
  const stats = useGameStore(s => s.stats);
  const reset = useGameStore(s => s.reset);
  const durationMs = stats.endTime - stats.startTime;
  const durationSec = Math.floor(durationMs / 1000);
  const accuracy = stats.totalAttacksReceived > 0 
    ? Math.round((stats.prayersCorrect / stats.totalAttacksReceived) * 100) 
    : 0;
  const metrics = [
    { label: 'Time Active', value: `${durationSec}s`, icon: History, color: 'text-blue-400' },
    { label: 'Prayer Accuracy', value: `${accuracy}%`, icon: Target, color: accuracy > 80 ? 'text-green-400' : 'text-orange-400' },
    { label: 'Damage Dealt', value: stats.damageDealt, icon: Trophy, color: 'text-yellow-400' },
    { label: 'Damage Taken', value: stats.damageTaken, icon: ShieldAlert, color: 'text-red-400' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-slate-900 border-slate-800 text-white shadow-2xl">
          <CardHeader className="text-center border-b border-slate-800 pb-6">
            <div className="mx-auto w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-orange-500" />
            </div>
            <CardTitle className="text-3xl font-black italic tracking-tight">SESSION SUMMARY</CardTitle>
            <p className="text-slate-400 text-sm">Post-Combat Performance Analytics</p>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <div key={i} className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-slate-900 ${m.color}`}>
                    <m.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{m.label}</p>
                    <p className="text-2xl font-mono font-bold">{m.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button 
                onClick={reset}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold h-12 text-lg"
              >
                Restart Session
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => useGameStore.setState(s => ({ stats: { ...s.stats, startTime: 0 } }))}
                className="text-slate-500 hover:text-slate-300"
              >
                Close Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}