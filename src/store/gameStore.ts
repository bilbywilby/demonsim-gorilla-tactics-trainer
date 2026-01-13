import { create } from 'zustand';
import { AttackStyle, ProtectionPrayer, MAX_HP, PLAYER_MAX_HP, DAMAGE_CAP, ATTACK_STYLES } from '@/lib/constants';
interface LogEntry {
  id: string;
  message: string;
  type: 'player' | 'gorilla' | 'info' | 'error';
  timestamp: number;
}
interface GameState {
  gorilla: {
    hp: number;
    style: AttackStyle;
    prayer: AttackStyle;
    lastStyle: AttackStyle | null;
    missCount: number;
    damageTakenInPhase: number;
    nextAttackTick: number;
    isAttacking: boolean;
  };
  player: {
    hp: number;
    prayer: ProtectionPrayer;
    style: AttackStyle;
  };
  game: {
    tickCount: number;
    isRunning: boolean;
    logs: LogEntry[];
  };
  tick: () => void;
  playerAttack: () => void;
  togglePrayer: (prayer: ProtectionPrayer) => void;
  setPlayerStyle: (style: AttackStyle) => void;
  reset: () => void;
  addLog: (message: string, type: LogEntry['type']) => void;
}
export const useGameStore = create<GameState>((set, get) => ({
  gorilla: {
    hp: MAX_HP,
    style: 'MELEE',
    prayer: 'MAGIC',
    lastStyle: null,
    missCount: 0,
    damageTakenInPhase: 0,
    nextAttackTick: 5,
    isAttacking: false,
  },
  player: {
    hp: PLAYER_MAX_HP,
    prayer: 'NONE',
    style: 'MELEE',
  },
  game: {
    tickCount: 0,
    isRunning: false,
    logs: [],
  },
  addLog: (message, type) => set(state => ({
    game: {
      ...state.game,
      logs: [{ id: crypto.randomUUID(), message, type, timestamp: Date.now() }, ...state.game.logs].slice(0, 50)
    }
  })),
  tick: () => {
    const state = get();
    if (!state.game.isRunning) return;
    const newTickCount = state.game.tickCount + 1;
    let newGorilla = { ...state.gorilla, isAttacking: false };
    let newPlayer = { ...state.player };
    // Gorilla Attack Logic
    if (newTickCount >= state.gorilla.nextAttackTick) {
      newGorilla.isAttacking = true;
      newGorilla.nextAttackTick = newTickCount + 5;
      // Check if player blocked
      const isBlocked = state.player.prayer === state.gorilla.style;
      if (isBlocked) {
        get().addLog(`Gorilla's ${state.gorilla.style} attack was blocked!`, 'info');
        newGorilla.missCount += 1;
      } else {
        const dmg = Math.floor(Math.random() * 30) + 1;
        newPlayer.hp = Math.max(0, newPlayer.hp - dmg);
        get().addLog(`Gorilla hits you for ${dmg} with ${state.gorilla.style}!`, 'gorilla');
        newGorilla.missCount = 0;
      }
      // 3-miss mechanic: switch style
      if (newGorilla.missCount >= 3) {
        const otherStyles = ATTACK_STYLES.filter(s => s !== state.gorilla.style);
        const nextStyle = otherStyles[Math.floor(Math.random() * otherStyles.length)];
        newGorilla.lastStyle = state.gorilla.style;
        newGorilla.style = nextStyle;
        newGorilla.missCount = 0;
        get().addLog(`Gorilla switches attack style to ${nextStyle}!`, 'info');
      }
    }
    set({ 
      game: { ...state.game, tickCount: newTickCount },
      gorilla: newGorilla,
      player: newPlayer
    });
  },
  playerAttack: () => {
    const state = get();
    if (!state.game.isRunning) return;
    // Check if gorilla blocks
    if (state.player.style === state.gorilla.prayer) {
      get().addLog(`Your ${state.player.style} attack was protected!`, 'error');
      return;
    }
    const dmg = Math.floor(Math.random() * 40) + 5;
    const newHp = Math.max(0, state.gorilla.hp - dmg);
    const newDamageInPhase = state.gorilla.damageTakenInPhase + dmg;
    get().addLog(`You hit the Gorilla for ${dmg}!`, 'player');
    let newPrayer = state.gorilla.prayer;
    let finalDamageInPhase = newDamageInPhase;
    if (newDamageInPhase >= DAMAGE_CAP) {
      const otherStyles = ATTACK_STYLES.filter(s => s !== state.player.style);
      newPrayer = otherStyles[Math.floor(Math.random() * otherStyles.length)];
      finalDamageInPhase = 0;
      get().addLog(`Gorilla switches prayer to Protect from ${newPrayer}!`, 'info');
    }
    set(s => ({
      gorilla: {
        ...s.gorilla,
        hp: newHp,
        prayer: newPrayer,
        damageTakenInPhase: finalDamageInPhase
      }
    }));
  },
  togglePrayer: (p) => set(s => ({
    player: { ...s.player, prayer: s.player.prayer === p ? 'NONE' : p }
  })),
  setPlayerStyle: (style) => set(s => ({
    player: { ...s.player, style }
  })),
  reset: () => set({
    gorilla: {
      hp: MAX_HP,
      style: 'MELEE',
      prayer: 'MAGIC',
      lastStyle: null,
      missCount: 0,
      damageTakenInPhase: 0,
      nextAttackTick: 5,
      isAttacking: false,
    },
    player: {
      hp: PLAYER_MAX_HP,
      prayer: 'NONE',
      style: 'MELEE',
    },
    game: {
      tickCount: 0,
      isRunning: true,
      logs: [],
    }
  })
}));