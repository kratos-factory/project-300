"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { AgentCard } from "@/components/features/AgentCard";
import { MissionBoard } from "@/components/features/MissionBoard";
import { AgentDetail } from "@/components/features/AgentDetail";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Wifi, Cpu, HardDrive, Battery, Plus, Settings } from "lucide-react";

export default function MissionControl() {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  // Mock Agents Data
  const [agents, setAgents] = useState([
    { id: "elon", name: "ELON", role: "Visionary Architect", status: "active", specialty: "Scale Engineering", load: 78, color: "blue" },
    { id: "gary", name: "GARY", role: "Attention Warlord", status: "active", specialty: "Content Strategy", load: 45, color: "green" },
    { id: "alex", name: "ALEX", role: "Offer Tactician", status: "active", specialty: "Systems & Acquisition", load: 62, color: "yellow" },
    { id: "socrates", name: "SOCRATES", role: "Logic Core", status: "standby", specialty: "Strategic Reasoning", load: 12, color: "purple" },
  ]);

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-red-900 selection:text-white flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-1 ml-20 transition-all duration-300 relative z-10 p-8 overflow-y-auto custom-scrollbar bg-black/95">
        
        {/* Header / Status Bar */}
        <header className="flex justify-between items-center mb-10 border-b border-zinc-900 pb-6 sticky top-0 bg-black/80 backdrop-blur-md z-40">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              {activeView === 'dashboard' ? 'Command Center' : activeView}
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              SYSTEM STATUS: <span className="text-green-500">OPTIMAL</span> // ENCRYPTION: <span className="text-blue-500">AES-256</span>
            </p>
          </div>
          <div className="flex gap-6">
            <StatusMetric label="CPU" value="12%" icon={<Cpu size={14} />} color="text-blue-500" />
            <StatusMetric label="MEM" value="45%" icon={<HardDrive size={14} />} color="text-purple-500" />
            <StatusMetric label="PWR" value="98%" icon={<Battery size={14} />} color="text-green-500" />
          </div>
        </header>

        {/* Dynamic Content Views */}
        <AnimatePresence mode="wait">
          
          {/* DASHBOARD VIEW */}
          {activeView === "dashboard" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Agent Quick View */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Activity size={16} /> Active Spartans
                  </h3>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    <Plus size={14} /> DEPLOY UNIT
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agents.map((agent) => (
                    <AgentCard 
                      key={agent.id} 
                      agent={agent} 
                      onClick={() => {
                        setSelectedAgentId(agent.id);
                        setActiveView("agents"); // Switch to detail view
                      }} 
                    />
                  ))}
                  {/* Empty Slot Placeholder */}
                  <div className="border border-dashed border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-zinc-600 hover:border-zinc-700 hover:bg-zinc-900/30 transition-all cursor-pointer group h-full min-h-[140px]">
                    <Plus size={24} className="mb-2 group-hover:text-zinc-400" />
                    <span className="text-xs font-mono uppercase tracking-widest group-hover:text-zinc-400">Initialize New Slot</span>
                  </div>
                </div>
              </div>

              {/* Mission / Intel Board */}
              <div className="lg:col-span-1 h-full min-h-[500px]">
                <MissionBoard />
              </div>
            </motion.div>
          )}

          {/* AGENTS VIEW */}
          {activeView === "agents" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col"
            >
               <AgentDetail 
                 agent={agents.find(a => a.id === selectedAgentId) || agents[0]} 
                 allAgents={agents}
                 onSelect={setSelectedAgentId}
               />
            </motion.div>
          )}

          {/* Placeholder for other views */}
          {["operations", "comms", "intel", "terminal"].includes(activeView) && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] text-zinc-600 font-mono border border-dashed border-zinc-800 rounded-xl bg-zinc-950/30"
            >
              <div className="w-16 h-16 border-2 border-zinc-800 rounded-full flex items-center justify-center mb-4 animate-spin-slow">
                <Settings size={32} />
              </div>
              <div className="text-lg font-bold text-zinc-500">MODULE UNDER CONSTRUCTION</div>
              <div className="text-xs mt-2">Spartan Engineers are deploying updates...</div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/10 via-black to-black" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
        </div>
      </div>
    </div>
  );
}

function StatusMetric({ label, value, icon, color }: any) {
  return (
    <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-lg">
      <div className={color}>{icon}</div>
      <div className="flex flex-col">
        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{label}</span>
        <span className="text-xs font-mono font-bold text-white">{value}</span>
      </div>
    </div>
  );
}
