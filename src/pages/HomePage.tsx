import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Target, Shield, Zap, Sparkles, Activity, Cpu } from 'lucide-react';
export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 md:py-32 flex flex-col items-center text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-sm text-slate-400 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="font-bold tracking-tight">VERSION 4.0 FINAL RELEASE</span>
          </motion.div>
          <div className="space-y-8 max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] italic">
              UNBEATABLE <br />
              <span className="text-orange-500 drop-shadow-[0_10px_10px_rgba(249,115,22,0.2)]">REFLEXES.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto">
              Master the Demonic Gorilla mechanics with pixel-perfect simulation. Predict style switches and prayer transitions with zero risk.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <Button asChild size="lg" className="h-20 px-12 text-2xl font-black bg-orange-600 hover:bg-orange-500 hover:scale-105 transition-all shadow-2xl shadow-orange-600/20 italic tracking-tight">
              <Link to="/trainer">ENTER THE ARENA</Link>
            </Button>
            <Button variant="outline" size="lg" className="h-20 px-12 text-2xl font-black border-white/10 hover:bg-white/5 transition-all italic tracking-tight">
              MECHANICS LOG
            </Button>
          </div>
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 w-full max-w-4xl">
            {[
              { label: 'Latency', val: '0ms' },
              { label: 'Accuracy', val: '1:1' },
              { label: 'NPC Logic', val: 'Verified' },
              { label: 'Browser', val: 'Web-Ready' }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{s.label}</span>
                <span className="text-2xl font-black italic">{s.val}</span>
              </div>
            ))}
          </div>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-24 md:py-32 w-full">
            {[
              { icon: Shield, title: "Prayer Mastery", desc: "Granular prayer progress bars with color mapping (Green/Orange/Red) to predict NPC resets." },
              { icon: Cpu, title: "Deterministic FSM", desc: "Identical state machine to the OSRS Demonic Gorillas, handling damage caps and miss counts." },
              { icon: Activity, title: "Real-time Analytics", desc: "Post-session breakdown of reaction times, damage efficiency, and prayer accuracy." }
            ].map((feature, i) => (
              <div key={i} className="group bg-slate-900/40 p-10 rounded-[2rem] border border-white/5 text-left space-y-6 hover:bg-slate-900/60 transition-all hover:border-orange-500/20 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black italic tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}