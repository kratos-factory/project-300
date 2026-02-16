"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, CheckSquare, Plus, Archive, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Mission {
  id: string;
  title: string;
  status: "pending" | "active" | "completed";
  priority: "low" | "medium" | "high";
}

export function MissionBoard() {
  const [missions, setMissions] = useState<Mission[]>([
    { id: "1", title: "Scale Twitter Presence", status: "active", priority: "high" },
    { id: "2", title: "Refine Lead Magnet Funnel", status: "pending", priority: "medium" },
    { id: "3", title: "Analyze Competitor Pricing", status: "completed", priority: "low" },
  ]);

  const [newMissionTitle, setNewMissionTitle] = useState("");

  const addMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMissionTitle.trim()) return;
    const mission: Mission = {
      id: Date.now().toString(),
      title: newMissionTitle,
      status: "pending",
      priority: "medium",
    };
    setMissions([mission, ...missions]);
    setNewMissionTitle("");
  };

  const toggleStatus = (id: string) => {
    setMissions(missions.map(m => 
      m.id === id ? { ...m, status: m.status === "completed" ? "active" : "completed" } : m
    ));
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 h-full flex flex-col relative overflow-hidden group hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-center mb-6 z-10">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <Target size={16} /> Active Missions
        </h3>
        <span className="text-xs text-zinc-600 font-mono">
          {missions.filter(m => m.status === "completed").length}/{missions.length} Complete
        </span>
      </div>

      {/* Input */}
      <form onSubmit={addMission} className="relative z-10 mb-4 flex gap-2">
        <input
          type="text"
          value={newMissionTitle}
          onChange={(e) => setNewMissionTitle(e.target.value)}
          placeholder="New Objective..."
          className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600 transition-colors placeholder-zinc-700"
        />
        <button type="submit" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition-colors">
          <Plus size={14} />
        </button>
      </form>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar z-10">
        <AnimatePresence>
          {missions.map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className={cn(
                "group/item flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer select-none",
                mission.status === "completed" 
                  ? "bg-zinc-900/30 border-green-900/10 opacity-50" 
                  : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-600"
              )}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <button 
                  onClick={() => toggleStatus(mission.id)}
                  className={cn("w-4 h-4 rounded border flex items-center justify-center transition-colors", 
                    mission.status === "completed" ? "bg-green-600 border-green-600 text-black" : "border-zinc-600 hover:border-white"
                  )}
                >
                  {mission.status === "completed" && <CheckSquare size={10} />}
                </button>
                <span className={cn("text-xs font-medium truncate", mission.status === "completed" ? "line-through text-zinc-600" : "text-zinc-300")}>
                  {mission.title}
                </span>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <span className={cn("text-[8px] uppercase font-bold px-1.5 py-0.5 rounded", 
                  mission.priority === "high" ? "bg-red-900/20 text-red-500" : 
                  mission.priority === "medium" ? "bg-yellow-900/20 text-yellow-500" : 
                  "bg-blue-900/20 text-blue-500"
                )}>
                  {mission.priority}
                </span>
                <button className="text-zinc-600 hover:text-red-500 transition-colors">
                  <Archive size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-45">
        <Target size={200} />
      </div>
    </div>
  );
}
