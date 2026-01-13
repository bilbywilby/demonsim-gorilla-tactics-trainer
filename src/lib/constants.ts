export const TICK_MS = 600;
export const TICKS_PER_ATTACK = 5;
export const DAMAGE_CAP = 50;
export const MAX_HP = 380;
export const PLAYER_MAX_HP = 99;
export const MAX_GORILLAS = 4;
export const BOULDER_CHANCE = 0.05; // 5% chance per tick to spawn a boulder
export const BOULDER_DAMAGE = 30;
export const BOULDER_TICKS = 3; // 1.8 seconds warning
export type AttackStyle = 'MELEE' | 'RANGED' | 'MAGIC';
export type ProtectionPrayer = 'NONE' | 'MELEE' | 'RANGED' | 'MAGIC';
export type EventType = 'PRAYER_SWITCH' | 'STYLE_SWITCH' | 'DAMAGE' | 'BOULDER_SPAWN' | 'BOULDER_HIT';
export const ATTACK_STYLES: AttackStyle[] = ['MELEE', 'RANGED', 'MAGIC'];
export const STYLE_COLORS = {
  MELEE: '#EF4444',
  RANGED: '#22C55E',
  MAGIC: '#3B82F6',
};
export const PRAYER_ICONS = {
  MELEE: '⚔️',
  RANGED: '🏹',
  MAGIC: '✨',
};
export interface GorillaSnapshot {
  id: string;
  style: AttackStyle;
  prayer: AttackStyle;
  missCount: number;
  damageTakenInPhase: number;
  hp: number;
  nextAttackTick: number;
  isAttacking: boolean;
}
export interface GameEvent {
  id: string;
  type: EventType;
  value: any;
  gorillaId?: string;
  timestamp: number;
}
export const DEFAULT_CONFIG = {
  zoom: 1.0,
  showProgressBar: true,
  progressBarWidth: 64,
  showPluginOverlay: true,
  enableAudio: true,
  voiceSpeed: 1.2,
  gorillaCount: 1,
};
export const COLOR_STAGES = {
  SAFE: '#22C55E',
  WARNING: '#F97316',
  DANGER: '#EF4444',
};
export const SESSION_INITIAL_STATS = {
  prayersCorrect: 0,
  totalAttacksReceived: 0,
  damageDealt: 0,
  damageTaken: 0,
  startTime: 0,
};