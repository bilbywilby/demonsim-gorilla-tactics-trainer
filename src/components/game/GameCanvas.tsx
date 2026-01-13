import React from 'react';
import { GorillaAvatar } from './GorillaAvatar';
import { GorillaOverlay } from './GorillaOverlay';
export function GameCanvas() {
  return (
    <div className="relative w-full aspect-square md:aspect-video bg-slate-900 rounded-xl border-4 border-slate-800 overflow-hidden flex items-center justify-center">
      {/* Background/Environment */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 via-transparent to-transparent" />
        <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-slate-500/20" />
          ))}
        </div>
      </div>
      <div className="relative flex flex-col items-center">
        <GorillaOverlay />
        <GorillaAvatar />
      </div>
      {/* Ground shadows/fx */}
      <div className="absolute bottom-1/4 w-32 h-8 bg-black/40 blur-xl rounded-full -z-10" />
    </div>
  );
}