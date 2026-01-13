import React from 'react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { ProtectionPrayer, AttackStyle, STYLE_COLORS } from '@/lib/constants';
import { Shield, Swords, Zap } from 'lucide-react';
export function PlayerHUD() {
  const playerHp = useGameStore(s => s.player.hp);
  const playerPrayer = useGameStore(s => s.player.prayer);
  const playerStyle = useGameStore(s => s.player.style);
  const togglePrayer = useGameStore(s => s.togglePrayer);
  const setPlayerStyle = useGameStore(s => s.setPlayerStyle);
  const playerAttack = useGameStore(s => s.playerAttack);
  const hpPercent = (playerHp / 99) * 100;
  return (
    <div className="w-full bg-slate-900 border-t-4 border-slate-800 p-6 flex flex-col md:flex-row gap-8 items-center justify-between">
      {/* HP Section */}
      <div className="flex flex-col items-center gap-2 min-w-[150px]">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-red-500 fill-red-500" />
          <span className="font-mono text-2xl font-bold">{playerHp}/99</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full border border-slate-700 overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all duration-300" 
            style={{ width: `${hpPercent}%` }} 
          />
        </div>
      </div>
      {/* Prayers */}
      <div className="flex gap-2">
        {(['MELEE', 'RANGED', 'MAGIC'] as ProtectionPrayer[]).map((p) => (
          <Button
            key={p}
            variant={playerPrayer === p ? 'default' : 'outline'}
            onClick={() => togglePrayer(p)}
            className={`w-16 h-16 rounded-xl flex flex-col gap-1 ${playerPrayer === p ? 'ring-2 ring-yellow-400 scale-105' : ''}`}
          >
            <Shield className="w-6 h-6" />
            <span className="text-[10px] font-bold">{p}</span>
          </Button>
        ))}
      </div>
      {/* Attack Styles */}
      <div className="flex gap-2">
        {(['MELEE', 'RANGED', 'MAGIC'] as AttackStyle[]).map((s) => (
          <Button
            key={s}
            variant={playerStyle === s ? 'secondary' : 'ghost'}
            onClick={() => setPlayerStyle(s)}
            className="w-16 h-16 rounded-xl border border-slate-700 flex flex-col gap-1"
            style={{ borderColor: playerStyle === s ? STYLE_COLORS[s] : '' }}
          >
            <Swords className="w-6 h-6" style={{ color: STYLE_COLORS[s] }} />
            <span className="text-[10px] font-bold">{s}</span>
          </Button>
        ))}
      </div>
      <Button 
        onClick={playerAttack}
        size="lg"
        className="bg-orange-600 hover:bg-orange-500 text-white font-bold h-16 px-8 rounded-xl animate-pulse"
      >
        ATTACK
      </Button>
    </div>
  );
}