"use client";

import { motion } from "framer-motion";
import { User, Activity, CircleCheck, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    role: string;
    status: string;
    specialty: string;
    load: number;
    color: string;
  };
  onClick: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const statusColors = {
    active: "bg-green-500",
    standby: "bg-yellow-500",
    offline: "bg-zinc-500",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:border-zinc-600 hover:shadow-lg hover:shadow-red-900/10 transition-all flex flex-col justify-between h-[200px] relative overflow-hidden group"
    >
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-full border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center font-bold text-lg text-white group-hover:border-red-600 transition-colors", `text-${agent.color}-500`)}>
            {agent.name[0]}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white tracking-wide group-hover:text-red-500 transition-colors">{agent.name}</h4>
            <span className="text-xs text-zinc-500 uppercase tracking-widest">{agent.role}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
           <div className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold text-black ${statusColors[agent.status as keyof typeof statusColors]}`}>
             {agent.status}
           </div>
           <span className="text-[10px] text-zinc-600 font-mono">ID: {agent.id.toUpperCase()}</span>
        </div>
      </div>

      <div className="space-y-3 z-10">
        <div className="flex justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
          <span>Specialty</span>
          <span className="text-white font-medium text-right max-w-[120px] truncate">{agent.specialty}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-zinc-500 uppercase tracking-wider">
             <span>Neural Load</span>
             <span>{agent.load}%</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${agent.load}%` }}
               className={cn("h-full", agent.load > 80 ? "bg-red-500" : agent.load > 50 ? "bg-yellow-500" : "bg-green-500")}
             />
          </div>
        </div>
      </div>

      {/* Hover Effect Background */}
      <div className="absolute -bottom-10 -right-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rotate-12">
         <User size={150} />
      </div>
    </motion.div>
  );
}
