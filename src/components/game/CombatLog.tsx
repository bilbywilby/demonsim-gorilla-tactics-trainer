import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { ScrollArea } from '@/components/ui/scroll-area';
export function CombatLog() {
  const logs = useGameStore(s => s.game.logs);
  return (
    <div className="w-full h-full bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
      <div className="p-3 bg-slate-900 border-b border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Combat Log</h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {logs.map((log) => (
            <div 
              key={log.id} 
              className={`text-sm font-mono leading-tight border-l-2 pl-3 ${
                log.type === 'player' ? 'text-green-400 border-green-400' :
                log.type === 'gorilla' ? 'text-red-400 border-red-400' :
                log.type === 'error' ? 'text-yellow-500 border-yellow-500' :
                'text-slate-300 border-slate-600'
              }`}
            >
              <span className="opacity-40 mr-2">[{new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              {log.message}
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-slate-500 text-center italic py-10">No combat activity yet...</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}