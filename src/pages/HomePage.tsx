import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Target, Shield, Zap, Sparkles } from 'lucide-react';
export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-400">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>High-Fidelity Combat Simulator</span>
          </div>
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none italic">
              MASTER THE <br />
              <span className="text-orange-500">DEMONIC GORILLAS</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
              Perfect your prayer switches, gear swaps, and 3-miss predictions in a risk-free environment. 
              Built with verified mechanics logic and predictive plugin overlays.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="h-16 px-10 text-xl font-bold bg-orange-600 hover:bg-orange-500 hover:scale-105 transition-all">
              <Link to="/trainer">Enter the Arena</Link>
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-bold border-slate-800 hover:bg-slate-900">
              View Mechanics Guide
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 w-full">
            {[
              { icon: Shield, title: "Prayer Mastery", desc: "React to Melee, Range, and Mage style switches with zero latency." },
              { icon: Target, title: "50 Damage Cap", desc: "Internal logic tracks exact damage to predict NPC prayer transitions." },
              { icon: Zap, title: "3-Miss Tracking", desc: "Automated simulation of the 3-miss mechanic to drill style changes." }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-left space-y-4">
                <feature.icon className="w-10 h-10 text-orange-500" />
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}