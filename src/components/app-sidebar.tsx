import React from "react";
import { Settings, RefreshCw, Eye, Maximize, Ruler } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
export function AppSidebar(): JSX.Element {
  const zoom = useGameStore(s => s.config.zoom);
  const showProgressBar = useGameStore(s => s.config.showProgressBar);
  const showPluginOverlay = useGameStore(s => s.config.showPluginOverlay);
  const progressBarWidth = useGameStore(s => s.config.progressBarWidth);
  const setConfig = useGameStore(s => s.setConfig);
  const reset = useGameStore(s => s.reset);
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <Settings className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-bold uppercase tracking-wider">Simulator Settings</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Viewport Scaling</SidebarGroupLabel>
          <div className="px-3 py-4 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-xs flex items-center gap-2"><Maximize className="w-3 h-3" /> Zoom</Label>
                <span className="text-[10px] font-mono bg-accent px-1 rounded">{zoom.toFixed(1)}x</span>
              </div>
              <Slider 
                value={[zoom]} 
                min={0.5} 
                max={2.0} 
                step={0.1} 
                onValueChange={([v]) => setConfig('zoom', v)}
              />
            </div>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Plugin Configuration</SidebarGroupLabel>
          <div className="px-3 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs flex items-center gap-2"><Eye className="w-3 h-3" /> Show Overlay</Label>
              <Switch 
                checked={showPluginOverlay} 
                onCheckedChange={(v) => setConfig('showPluginOverlay', v)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs flex items-center gap-2"><Ruler className="w-3 h-3" /> Prayer Progress</Label>
              <Switch 
                checked={showProgressBar} 
                onCheckedChange={(v) => setConfig('showProgressBar', v)} 
              />
            </div>
            {showProgressBar && (
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] text-muted-foreground uppercase">Bar Width</Label>
                  <span className="text-[10px] font-mono">{progressBarWidth}px</span>
                </div>
                <Slider 
                  value={[progressBarWidth]} 
                  min={32} 
                  max={128} 
                  step={8} 
                  onValueChange={([v]) => setConfig('progressBarWidth', v)}
                />
              </div>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button 
          variant="destructive" 
          className="w-full gap-2 text-xs" 
          onClick={reset}
        >
          <RefreshCw className="w-3 h-3" /> Reset Session
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}