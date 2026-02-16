"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, ChevronRight, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: string;
  specialty: string;
  load: number;
  color: string;
}

interface AgentDetailProps {
  agent: Agent;
  allAgents: Agent[];
  onSelect: (id: string) => void;
}

export function AgentDetail({ agent, allAgents, onSelect }: AgentDetailProps) {
  const [messages, setMessages] = useState<string[]>([
    "INITIALIZING UPLINK...",
    "SECURE CHANNEL ESTABLISHED.",
    "AWAITING COMMAND..."
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, `> ${input}`, `COMMAND ACKNOWLEDGED. PROCESSING...`]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-6 flex justify-between items-start z-10 sticky top-0">
        <div className="flex items-center gap-6">
          <div className={cn("w-16 h-16 rounded-2xl bg-black border-2 border-zinc-700 flex items-center justify-center text-2xl font-bold shadow-lg", `text-${agent.color}-500 border-${agent.color}-500/50`)}>
            {agent.name[0]}
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">{agent.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn("w-2 h-2 rounded-full animate-pulse", agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500')} />
              <span className="text-xs text-zinc-400 font-mono uppercase">{agent.role} // LOAD: {agent.load}%</span>
            </div>
          </div>
        </div>
        
        {/* Agent Selector (Quick Switch) */}
        <div className="flex items-center gap-2 bg-black rounded-lg p-1 border border-zinc-800">
          {allAgents.map(a => (
            <button 
              key={a.id}
              onClick={() => onSelect(a.id)}
              className={cn("w-8 h-8 rounded flex items-center justify-center transition-all", 
                a.id === agent.id 
                  ? `bg-${a.color}-900/30 text-${a.color}-500 border border-${a.color}-500/30` 
                  : "text-zinc-600 hover:text-white hover:bg-zinc-800"
              )}
              title={a.name}
            >
              {a.name[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-3 gap-6 p-6 overflow-hidden">
        
        {/* Left: Stats & Intel */}
        <div className="col-span-1 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Core Specialty</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-mono">
              {agent.specialty}
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Neural Metrics</h3>
            <div className="space-y-3">
              <MetricBar label="Cognition" value={agent.load} color={agent.color} />
              <MetricBar label="Efficiency" value={agent.load + 10} color="green" />
              <MetricBar label="Latency" value={12} color="blue" inverse />
            </div>
          </div>
        </div>

        {/* Right: Terminal / Chat */}
        <div className="col-span-2 bg-black border border-zinc-800 rounded-lg flex flex-col font-mono text-xs overflow-hidden relative group hover:border-zinc-700 transition-colors">
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Terminal size={12} /> Live Uplink</span>
            <span className="text-green-500 animate-pulse">SECURE</span>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-zinc-400 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={cn("break-words", msg.startsWith(">") ? "text-white font-bold" : "text-zinc-500")}>
                {msg}
              </div>
            ))}
            <div className="animate-blink w-2 h-4 bg-red-600/50 inline-block align-middle ml-1" />
          </div>

          <form onSubmit={handleSend} className="border-t border-zinc-800 p-2 flex gap-2 bg-zinc-900/50">
            <div className="flex-1 relative">
              <ChevronRight size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded px-8 py-2 text-white focus:outline-none focus:border-zinc-600 transition-colors placeholder-zinc-700"
                placeholder="Enter command protocol..."
                autoFocus
              />
            </div>
            <button type="submit" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-3 rounded transition-colors">
              <Send size={14} />
            </button>
          </form>
        </div>

      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none rotate-12">
         <User size={400} />
      </div>

    </div>
  );
}

function MetricBar({ label, value, color, inverse }: any) {
  const width = inverse ? 100 - value : value;
  return (
    <div className="flex items-center gap-3">
       <span className="text-[10px] text-zinc-500 w-16 text-right uppercase">{label}</span>
       <div className="flex-1 h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${Math.min(width, 100)}%` }}
             className={cn("h-full", `bg-${color}-500`)}
          />
       </div>
       <span className="text-[10px] text-zinc-400 w-8 font-mono">{value}%</span>
    </div>
  );
}
