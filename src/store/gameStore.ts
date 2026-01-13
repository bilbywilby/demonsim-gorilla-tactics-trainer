import { create } from 'zustand';
import {
  AttackStyle,
  ProtectionPrayer,
  MAX_HP,
  PLAYER_MAX_HP,
  DAMAGE_CAP,
  ATTACK_STYLES,
  DEFAULT_CONFIG,
  SESSION_INITIAL_STATS,
  BOULDER_CHANCE,
  BOULDER_DAMAGE,
  BOULDER_TICKS,
  GORILLA_VARIANTS,
  GameEvent,
  GorillaSnapshot
} from '@/lib/constants';
interface GorillaState extends GorillaSnapshot {}
interface BoulderState {
  id: string;
  spawnTick: number;
  hitTick: number;
}
interface GameState {
  gorillas: GorillaState[];
  activeTargetIndex: number;
  player: {
    hp: number;
    prayer: ProtectionPrayer;
    style: AttackStyle;
  };
  game: {
    tickCount: number;
    isRunning: boolean;
    logs: any[];
    events: GameEvent[];
    boulders: BoulderState[];
  };
  config: typeof DEFAULT_CONFIG;
  stats: typeof SESSION_INITIAL_STATS & { endTime: number };
  tick: () => void;
  playerAttack: (gorillaId: string) => void;
  togglePrayer: (prayer: ProtectionPrayer) => void;
  setPlayerStyle: (style: AttackStyle) => void;
  setTarget: (index: number) => void;
  setConfig: (key: keyof typeof DEFAULT_CONFIG, value: any) => void;
  stopSession: () => void;
  clearActiveMechanics: () => void;
  reset: () => void;
  addLog: (message: string, type: string) => void;
  pushEvent: (type: GameEvent['type'], value: any, gorillaId?: string) => void;
}
const createGorilla = (id: string): GorillaState => ({
  id,
  variantId: GORILLA_VARIANTS.MELEE,
  hp: MAX_HP,
  style: 'MELEE',
  prayer: 'MAGIC',
  missCount: 0,
  damageTakenInPhase: 0,
  nextAttackTick: 5,
  isAttacking: false,
  lastUpdated: Date.now(),
});
export const useGameStore = create<GameState>((set, get) => ({
  gorillas: [createGorilla('g1')],
  activeTargetIndex: 0,
  player: { hp: PLAYER_MAX_HP, prayer: 'NONE', style: 'MELEE' },
  game: { tickCount: 0, isRunning: false, logs: [], events: [], boulders: [] },
  config: { ...DEFAULT_CONFIG },
  stats: { ...SESSION_INITIAL_STATS, endTime: 0 },
  addLog: (message, type) => set(state => ({
    game: {
      ...state.game,
      logs: [{ id: crypto.randomUUID(), message, type, timestamp: Date.now() }, ...state.game.logs].slice(0, 50)
    }
  })),
  pushEvent: (type, value, gorillaId) => set(state => ({
    game: {
      ...state.game,
      events: [...state.game.events, { id: crypto.randomUUID(), type, value, gorillaId, timestamp: Date.now() }].slice(-20)
    }
  })),
  setConfig: (key, value) => set(state => ({ config: { ...state.config, [key]: value } })),
  setTarget: (index) => set({ activeTargetIndex: index }),
  stopSession: () => set(state => ({
    game: { ...state.game, isRunning: false, boulders: [] },
    stats: { ...state.stats, endTime: Date.now() }
  })),
  clearActiveMechanics: () => set(state => ({
    game: { ...state.game, boulders: [] },
    gorillas: state.gorillas.map(g => ({ ...g, isAttacking: false }))
  })),
  tick: () => {
    const state = get();
    if (!state.game.isRunning) return;
    const newTick = state.game.tickCount + 1;
    const now = Date.now();
    let newPlayerHp = state.player.hp;
    let newStats = { ...state.stats };
    let newBoulders = [...state.game.boulders];
    if (Math.random() < BOULDER_CHANCE) {
      const bId = crypto.randomUUID();
      newBoulders.push({ id: bId, spawnTick: newTick, hitTick: newTick + BOULDER_TICKS });
      state.pushEvent('BOULDER_SPAWN', bId);
    }
    newBoulders = newBoulders.filter(b => {
      if (b.hitTick === newTick) {
        newPlayerHp = Math.max(0, newPlayerHp - BOULDER_DAMAGE);
        newStats.damageTaken += BOULDER_DAMAGE;
        state.pushEvent('BOULDER_HIT', BOULDER_DAMAGE);
        state.addLog(`A boulder crushes you for ${BOULDER_DAMAGE}!`, 'error');
        return false;
      }
      return true;
    });
    const newGorillas = state.gorillas.map(g => {
      const updatedGorilla = { ...g, isAttacking: false, lastUpdated: now };
      if (newTick >= updatedGorilla.nextAttackTick) {
        updatedGorilla.isAttacking = true;
        updatedGorilla.nextAttackTick = newTick + 5;
        newStats.totalAttacksReceived += 1;
        if (state.player.prayer === updatedGorilla.style) {
          updatedGorilla.missCount += 1;
          newStats.prayersCorrect += 1;
        } else {
          const dmg = Math.floor(Math.random() * 30) + 1;
          newPlayerHp = Math.max(0, newPlayerHp - dmg);
          newStats.damageTaken += dmg;
          state.pushEvent('DAMAGE', { amount: dmg, target: 'player' }, updatedGorilla.id);
          updatedGorilla.missCount = 0;
        }
        if (updatedGorilla.missCount >= 3) {
          const others = ATTACK_STYLES.filter(s => s !== updatedGorilla.style);
          updatedGorilla.style = others[Math.floor(Math.random() * others.length)];
          updatedGorilla.variantId = GORILLA_VARIANTS[updatedGorilla.style];
          updatedGorilla.missCount = 0;
          state.pushEvent('STYLE_SWITCH', updatedGorilla.style, updatedGorilla.id);
        }
      }
      return updatedGorilla;
    });
    if (newPlayerHp <= 0) {
      state.stopSession();
      state.addLog("You have died.", "error");
    }
    set({
      game: { ...state.game, tickCount: newTick, boulders: newBoulders },
      gorillas: newGorillas,
      player: { ...state.player, hp: newPlayerHp },
      stats: newStats
    });
  },
  playerAttack: (id) => {
    const state = get();
    if (!state.game.isRunning) return;
    const gIndex = state.gorillas.findIndex(g => g.id === id);
    if (gIndex === -1) return;
    const g = { ...state.gorillas[gIndex] };
    if (state.player.style === g.prayer) {
      state.pushEvent('DAMAGE', { amount: 0, target: 'gorilla' }, g.id);
      return;
    }
    const dmg = Math.floor(Math.random() * 40) + 5;
    g.hp = Math.max(0, g.hp - dmg);
    g.damageTakenInPhase += dmg;
    state.pushEvent('DAMAGE', { amount: dmg, target: 'gorilla' }, g.id);
    if (g.damageTakenInPhase >= DAMAGE_CAP) {
      const others = ATTACK_STYLES.filter(s => s !== state.player.style);
      g.prayer = others[Math.floor(Math.random() * others.length)];
      g.damageTakenInPhase = 0; // Precise reset on transition
      state.pushEvent('PRAYER_SWITCH', g.prayer, g.id);
    }
    const newGorillas = [...state.gorillas];
    newGorillas[gIndex] = g;
    set(s => ({
      gorillas: newGorillas,
      stats: { ...s.stats, damageDealt: s.stats.damageDealt + dmg }
    }));
    if (newGorillas.every(gorilla => gorilla.hp <= 0)) {
      state.stopSession();
      state.addLog("All Gorillas defeated!", "info");
    }
  },
  togglePrayer: (p) => set(s => ({
    player: { ...s.player, prayer: s.player.prayer === p ? 'NONE' : p }
  })),
  setPlayerStyle: (style) => set(s => ({
    player: { ...s.player, style }
  })),
  reset: () => {
    const { config } = get();
    const newGorillas = Array.from({ length: config.gorillaCount }).map((_, i) => createGorilla(`g${i}`));
    set({
      gorillas: newGorillas,
      activeTargetIndex: 0,
      player: { hp: PLAYER_MAX_HP, prayer: 'NONE', style: 'MELEE' },
      game: { tickCount: 0, isRunning: true, logs: [], events: [], boulders: [] },
      stats: { ...SESSION_INITIAL_STATS, startTime: Date.now(), endTime: 0 }
    });
  }
}));