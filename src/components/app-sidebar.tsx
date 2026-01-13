import React from "react";
import { Settings, RefreshCw, Eye, Maximize, Ruler, Volume2, Users, Sliders, ShieldCheck } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
export function AppSidebar(): JSX.Element {
  const zoom = useGameStore(s => s.config.zoom);
  const showPrayerProgress = useGameStore(s => s.config.showPrayerProgress);
  const showPluginOverlay = useGameStore(s => s.config.showPluginOverlay);
  const prayerProgressWidth = useGameStore(s => s.config.prayerProgressWidth);
  const enableAudio = useGameStore(s => s.config.enableAudio);
  const voiceSpeed = useGameStore(s => s.config.voiceSpeed);
  const gorillaCount = useGameStore(s => s.config.gorillaCount);
  const setConfig = useGameStore(s => s.setConfig);
  const reset = useGameStore(s => s.reset);
  return (
    <Sidebar className="border-r border-white/5 bg-slate-950">
      <SidebarHeader className="border-b border-white/5">
        <div className="flex items-center gap-2 px-4 py-6">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shadow-lg">
            <Settings className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-black uppercase tracking-tight text-white block">Simulator</span>
            <span className="text-[10px] text-slate-500 font-mono">v4.0.0-PRO</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-bold px-4">Combat Config</SidebarGroupLabel>
          <div className="px-4 py-4 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Gorilla Count
                </Label>
                <span className="text-[10px] font-mono bg-slate-900 text-orange-500 px-2 py-0.5 rounded border border-orange-500/20">{gorillaCount}</span>
              </div>
              <Slider
                value={[gorillaCount]}
                min={1}
                max={4}
                step={1}
                onValueChange={([v]) => setConfig('gorillaCount', v)}
              />
            </div>
          </div>
        </SidebarGroup>
        <SidebarSeparator className="opacity-10" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-bold px-4">Plugin Parity</SidebarGroupLabel>
          <div className="px-4 py-4 space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-slate-300 flex items-center gap-2"><Eye className="w-3.5 h-3.5" /> Predictive Overlay</Label>
              <Switch checked={showPluginOverlay} onCheckedChange={(v) => setConfig('showPluginOverlay', v)} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs text-slate-300 flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> Prayer Progress</Label>
              <Switch checked={showPrayerProgress} onCheckedChange={(v) => setConfig('showPrayerProgress', v)} />
            </div>
            {showPrayerProgress && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Bar Width</Label>
                  <span className="text-[10px] font-mono text-slate-400">{prayerProgressWidth}px</span>
                </div>
                <Slider
                  value={[prayerProgressWidth]}
                  min={40}
                  max={120}
                  step={4}
                  onValueChange={([v]) => setConfig('prayerProgressWidth', v)}
                />
              </div>
            )}
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-bold px-4">Audio Feedback</SidebarGroupLabel>
          <div className="px-4 py-4 space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-slate-300 flex items-center gap-2"><Volume2 className="w-3.5 h-3.5" /> Descriptive TTS</Label>
              <Switch checked={enableAudio} onCheckedChange={(v) => setConfig('enableAudio', v)} />
            </div>
            {enableAudio && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Voice Speed</Label>
                  <span className="text-[10px] font-mono text-slate-400">{voiceSpeed.toFixed(1)}x</span>
                </div>
                <Slider
                  value={[voiceSpeed]}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  onValueChange={([v]) => setConfig('voiceSpeed', v)}
                />
              </div>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 bg-slate-900/50 border-t border-white/5">
        <Button variant="destructive" className="w-full gap-2 text-xs font-black italic tracking-tight shadow-lg" onClick={reset}>
          <RefreshCw className="w-3.5 h-3.5" /> REBOOT SIMULATOR
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}