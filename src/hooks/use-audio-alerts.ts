import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
export function useAudioAlerts() {
  const events = useGameStore(s => s.game.events);
  const enableAudio = useGameStore(s => s.config.enableAudio);
  const voiceSpeed = useGameStore(s => s.config.voiceSpeed);
  const lastEventId = useRef<string | null>(null);
  useEffect(() => {
    if (!enableAudio || events.length === 0) return;
    const latest = events[events.length - 1];
    if (latest.id === lastEventId.current) return;
    lastEventId.current = latest.id;
    if (latest.type === 'STYLE_SWITCH' || latest.type === 'PRAYER_SWITCH') {
      const text = latest.value.toLowerCase();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceSpeed;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
    if (latest.type === 'BOULDER_SPAWN') {
      const utterance = new SpeechSynthesisUtterance("boulder");
      utterance.rate = voiceSpeed * 1.5;
      window.speechSynthesis.speak(utterance);
    }
  }, [events, enableAudio, voiceSpeed]);
}