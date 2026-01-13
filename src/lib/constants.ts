export const TICK_MS = 600;
export const TICKS_PER_ATTACK = 5;
export const DAMAGE_CAP = 50;
export const MAX_HP = 380;
export const PLAYER_MAX_HP = 99;
export const MAX_GORILLAS = 4;
export const BOULDER_CHANCE = 0.05;
export const BOULDER_DAMAGE = 30;
export const BOULDER_TICKS = 3;
export type AttackStyle = 'MELEE' | 'RANGED' | 'MAGIC';
export type ProtectionPrayer = 'NONE' | 'MELEE' | 'RANGED' | 'MAGIC';
export type EventType = 'PRAYER_SWITCH' | 'STYLE_SWITCH' | 'DAMAGE' | 'BOULDER_SPAWN' | 'BOULDER_HIT';
export const ATTACK_STYLES: AttackStyle[] = ['MELEE', 'RANGED', 'MAGIC'];
export const GORILLA_VARIANTS = {
  MELEE: 7144,
  RANGED: 7145,
  MAGIC: 7146,
};
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
export const PROGRESS_THRESHOLDS = {
  SAFE: 25,
  WARNING: 40,
  DANGER: 41,
};
export const AUDIO_PHRASES = {
  MELEE_INCOMING: "Melee incoming",
  RANGED_INCOMING: "Ranged incoming",
  MAGIC_INCOMING: "Magic incoming",
  SWITCH_STYLE: "Switch style",
  BOULDER: "Boulder",
};
export interface GorillaSnapshot {
  id: string;
  variantId: number;
  style: AttackStyle;
  prayer: AttackStyle;
  missCount: number;
  damageTakenInPhase: number;
  hp: number;
  nextAttackTick: number;
  isAttacking: boolean;
  lastUpdated: number;
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
  showPrayerProgress: true,
  progressBarWidth: 64,
  prayerProgressWidth: 64,
  prayerProgressColor: '#F97316',
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