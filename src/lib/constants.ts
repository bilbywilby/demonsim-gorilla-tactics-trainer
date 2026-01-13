export const TICK_MS = 600;
export const TICKS_PER_ATTACK = 5; // Demonic gorillas attack every 5 ticks (3.0s)
export const DAMAGE_CAP = 50;
export const MAX_HP = 380;
export const PLAYER_MAX_HP = 99;
export type AttackStyle = 'MELEE' | 'RANGED' | 'MAGIC';
export type ProtectionPrayer = 'NONE' | 'MELEE' | 'RANGED' | 'MAGIC';
export const ATTACK_STYLES: AttackStyle[] = ['MELEE', 'RANGED', 'MAGIC'];
export const STYLE_COLORS = {
  MELEE: '#EF4444', // Red
  RANGED: '#22C55E', // Green
  MAGIC: '#3B82F6', // Blue
};
export const PRAYER_ICONS = {
  MELEE: '⚔️',
  RANGED: '🏹',
  MAGIC: '✨',
};
export const DEFAULT_CONFIG = {
  zoom: 1.0,
  showProgressBar: true,
  progressBarWidth: 64,
  showPluginOverlay: true,
};
export const COLOR_STAGES = {
  SAFE: '#22C55E',    // Green < 26
  WARNING: '#F97316', // Orange < 41
  DANGER: '#EF4444',  // Red >= 41
};
export const SESSION_INITIAL_STATS = {
  prayersCorrect: 0,
  totalAttacksReceived: 0,
  damageDealt: 0,
  damageTaken: 0,
  startTime: 0,
};