"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Target, Trophy, Brain, BarChart, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "active" | "standby" | "training" | "offline";
  specialty: string;
  avatar: React.ReactNode;
  color: string;
  load: number;
}

const INITIAL_SPARTANS: Agent[] = [
  {
    id: "elon",
    name: "ELON",
    role: "Visionary Architect",
    status: "active",
    specialty: "First Principles, Rapid Engineering, Scale",
    avatar: <Rocket className="w-6 h-6" />,
    color: "text-blue-500",
    load: 78
  },
  {
    id: "gary",
    name: "GARY",
    role: "Attention Warlord",
    status: "active",
    specialty: "Content Strategy, Social Domination, Empathy",
    avatar: <Target className="w-6 h-6" />,
    color: "text-green-500",
    load: 45
  },
  {
    id: "alex",
    name: "ALEX",
    role: "Offer Tactician",
    status: "active",
    specialty: "Grand Offers, Systems, Acquisition",
    avatar: <Trophy className="w-6 h-6" />,
    color: "text-yellow-500",
    load: 62
  }
];

export default function MissionControl() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_SPARTANS);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-red-900 selection:text-white flex flex-col overflow-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: "linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)", backgroundSize: "60px 60px" }}>
        </div>
      </div>

      {/* Top Bar */}
      <header className="h-16 border-b border-zinc-900 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 z-50 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-4 h-4 bg-red-600 rounded-sm rotate-45 animate-pulse shadow-[0_0_15px_#dc2626]" />
             <div className="absolute inset-0 w-4 h-4 border border-red-600 rounded-sm rotate-45 scale-150 opacity-50" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white leading-none">
              PROJECT <span className="text-red-600">300</span>
            </h1>
            <div className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] uppercase">Spartan Command Protocol</div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
           <StatusIndicator label="Active Spartans" value={agents.length.toString()} max="300" color="text-red-500" />
           <StatusIndicator label="System Load" value="62%" color="text-yellow-500" />
           <StatusIndicator label="Neural Net" value="Stable" color="text-green-500" />
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-6 z-10 overflow-hidden flex gap-6">
        
        {/* Left: Agent Roster */}
        <div className="w-1/3 flex flex-col gap-4 h-full">
           <div className="flex justify-between items-center mb-2">
             <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
               <Brain size={14} /> Active Units
             </h2>
             <button className="text-[10px] bg-zinc-900 border border-zinc-800 hover:border-red-900 text-zinc-400 hover:text-white px-3 py-1 rounded-full transition-all flex items-center gap-1">
               <Plus size={10} /> SPAWN UNIT
             </button>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
             {agents.map((agent) => (
               <AgentCard 
                 key={agent.id} 
                 agent={agent} 
                 isSelected={selectedAgent?.id === agent.id}
                 onClick={() => setSelectedAgent(agent)} 
               />
             ))}
             
             {/* Placeholder for future 297 agents */}
             {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-zinc-800 text-xs font-mono uppercase tracking-widest">
                   [Empty Slot {i + 4}]
                </div>
             ))}
           </div>
        </div>

        {/* Right: Agent Control / Detail View */}
        <div className="flex-1 bg-zinc-950/50 border border-zinc-900 rounded-2xl p-8 relative overflow-hidden flex flex-col">
          {selectedAgent ? (
             <AgentDetailView agent={selectedAgent} />
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 font-mono text-sm opacity-50">
               <div className="w-24 h-24 rounded-full border border-zinc-800 flex items-center justify-center mb-4 animate-pulse-slow">
                 <div className="w-2 h-2 bg-red-600 rounded-full" />
               </div>
               <div>SELECT A SPARTAN UNIT TO INITIALIZE COMMAND UPLINK</div>
             </div>
          )}
          
          {/* Background Detail Decor */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BarChart size={200} />
          </div>
        </div>

      </main>
      
      {/* Footer */}
      <footer className="h-8 border-t border-zinc-900 bg-black flex items-center justify-between px-6 text-[10px] text-zinc-600 uppercase tracking-widest z-50 font-mono">
        <div>Vistro Technologies // Project 300 // v1.0.0</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-900 rounded-full animate-pulse" />
          <span>Gateway: Online</span>
        </div>
      </footer>
    </div>
  );
}

// --- Components ---

function StatusIndicator({ label, value, max, color }: any) {
  return (
    <div className="flex flex-col items-end">
       <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</span>
       <div className={cn("text-lg font-bold font-mono leading-none", color)}>
         {value}{max && <span className="text-zinc-700 text-xs">/{max}</span>}
       </div>
    </div>
  );
}

function AgentCard({ agent, isSelected, onClick }: { agent: Agent, isSelected: boolean, onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl border cursor-pointer transition-all relative overflow-hidden group",
        isSelected 
          ? "bg-zinc-900/80 border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.1)]" 
          : "bg-zinc-950/50 border-zinc-900 hover:border-zinc-700"
      )}
    >
      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-lg bg-black border border-zinc-800", agent.color)}>
            {agent.avatar}
          </div>
          <div>
            <h3 className={cn("font-bold text-sm tracking-wide", isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>
              {agent.name}
            </h3>
            <div className="text-[10px] text-zinc-500 font-mono uppercase">{agent.role}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
           <StatusBadge status={agent.status} />
           <div className="text-[10px] text-zinc-600 font-mono">LOAD: {agent.load}%</div>
        </div>
      </div>
      
      {/* Load Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-zinc-900 w-full">
         <div className={cn("h-full transition-all duration-500", agent.color.replace('text-', 'bg-'))} style={{ width: `${agent.load}%` }} />
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Agent['status'] }) {
  const styles = {
    active: "bg-green-900/20 text-green-500 border-green-900/30",
    standby: "bg-yellow-900/20 text-yellow-500 border-yellow-900/30",
    training: "bg-blue-900/20 text-blue-500 border-blue-900/30",
    offline: "bg-zinc-900 text-zinc-500 border-zinc-800",
  };
  
  return (
    <span className={cn("text-[9px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider", styles[status])}>
      {status}
    </span>
  );
}

function AgentDetailView({ agent }: { agent: Agent }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={agent.id}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-8 border-b border-zinc-900 pb-6">
        <div className="flex items-center gap-6">
          <div className={cn("w-20 h-20 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center shadow-2xl", agent.color)}>
             <div className="scale-[2]">
               {agent.avatar}
             </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h2 className="text-4xl font-black text-white tracking-tight">{agent.name}</h2>
               <StatusBadge status={agent.status} />
            </div>
            <p className="text-lg text-zinc-400 font-light">{agent.role}</p>
          </div>
        </div>
        
        <div className="text-right">
           <div className="text-[10px] text-zinc-600 font-mono uppercase mb-1">UNIT ID</div>
           <div className="font-mono text-zinc-400">SPARTAN-{agent.id.toUpperCase()}-001</div>
        </div>
      </div>

      {/* Stats & Capabilities */}
      <div className="grid grid-cols-2 gap-8 mb-8">
         <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Core Specialty</h3>
            <p className="text-sm text-zinc-300 leading-relaxed p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
               {agent.specialty}
            </p>
         </div>
         <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Neural Metrics</h3>
            <div className="space-y-3">
               <MetricRow label="Cognitive Load" value={agent.load} color={agent.color.replace('text-', 'bg-')} />
               <MetricRow label="Output Velocity" value={agent.load + 12} color="bg-zinc-600" />
               <MetricRow label="Accuracy" value={99} color="bg-zinc-600" />
            </div>
         </div>
      </div>

      {/* Terminal / Task Log */}
      <div className="flex-1 bg-black rounded-xl border border-zinc-900 p-4 font-mono text-xs overflow-hidden flex flex-col relative">
         <div className="flex justify-between items-center mb-2 border-b border-zinc-900 pb-2">
            <span className="text-zinc-500 uppercase">Comm-Link // {agent.name}</span>
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
               <div className="w-2 h-2 rounded-full bg-yellow-500" />
               <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto space-y-2 text-zinc-400">
            <div className="text-zinc-600">[{new Date().toLocaleTimeString()}] System Initialized. Uplink established.</div>
            <div className={cn("font-bold", agent.color)}>
               {">"} Ready for instructions, Commander.
            </div>
            {agent.id === 'elon' && (
               <>
                 <div>{">"} Analyzing first principles of current objective...</div>
                 <div>{">"} Scale potential: UNLIMITED.</div>
               </>
            )}
            {agent.id === 'gary' && (
               <>
                 <div>{">"} Checking social signals... Attention is underpriced.</div>
                 <div>{">"} We need to post 64 pieces of content today.</div>
               </>
            )}
            {agent.id === 'alex' && (
               <>
                 <div>{">"} The offer needs to be so good they feel stupid saying no.</div>
                 <div>{">"} Calculating LTV:CAC ratio...</div>
               </>
            )}
            <div className="animate-pulse">_</div>
         </div>

         {/* Input Area */}
         <div className="mt-4 flex gap-2">
            <input 
              type="text" 
              placeholder={`Issue command to ${agent.name}...`}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-300 focus:outline-none focus:border-red-900 transition-colors placeholder-zinc-700"
            />
            <button className="bg-red-900/20 text-red-500 border border-red-900/50 px-4 rounded hover:bg-red-900 hover:text-white transition-colors">
               EXECUTE
            </button>
         </div>
      </div>
    </motion.div>
  );
}

function MetricRow({ label, value, color }: any) {
  return (
    <div className="flex items-center gap-3">
       <span className="text-[10px] text-zinc-500 w-24 text-right">{label}</span>
       <div className="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${Math.min(value, 100)}%` }}
             className={cn("h-full", color)}
          />
       </div>
       <span className="text-[10px] text-zinc-400 font-mono w-8">{value}%</span>
    </div>
  );
}
