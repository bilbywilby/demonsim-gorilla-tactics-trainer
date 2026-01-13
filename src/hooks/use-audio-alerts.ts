import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { AUDIO_PHRASES } from '@/lib/constants';
export function useAudioAlerts() {
  const events = useGameStore(s => s.game.events);
  const enableAudio = useGameStore(s => s.config.enableAudio);
  const voiceSpeed = useGameStore(s => s.config.voiceSpeed);
  const lastEventId = useRef<string | null>(null);
  const speechTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!enableAudio || events.length === 0) return;
    const latest = events[events.length - 1];
    if (latest.id === lastEventId.current) return;
    lastEventId.current = latest.id;
    const speak = (text: string) => {
      // Basic debounce to prevent overlapping voices in multi-gorilla encounters
      if (speechTimeout.current) clearTimeout(speechTimeout.current);
      speechTimeout.current = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = voiceSpeed;
        utterance.pitch = 1.0;
        window.speechSynthesis.cancel(); // Cancel current to prioritize new logic
        window.speechSynthesis.speak(utterance);
      }, 50);
    };
    if (latest.type === 'STYLE_SWITCH') {
      const phrase = (AUDIO_PHRASES as any)[`${latest.value}_INCOMING`] || latest.value;
      speak(phrase);
    } else if (latest.type === 'PRAYER_SWITCH') {
      speak(AUDIO_PHRASES.SWITCH_STYLE);
    } else if (latest.type === 'BOULDER_SPAWN') {
      speak(AUDIO_PHRASES.BOULDER);
    }
    return () => {
      if (speechTimeout.current) clearTimeout(speechTimeout.current);
    };
  }, [events, enableAudio, voiceSpeed]);
}