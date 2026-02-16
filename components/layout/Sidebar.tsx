"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Rocket, Users, Activity, MessageSquare, 
  Terminal, BarChart, Settings, Shield, Plus, Lock, Globe 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Command Center", icon: <BarChart className="w-5 h-5" /> },
    { id: "agents", label: "Spartan Barracks", icon: <Users className="w-5 h-5" /> },
    { id: "operations", label: "Active Operations", icon: <Activity className="w-5 h-5" /> },
    { id: "comms", label: "Global Comms", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "intel", label: "Intel Feed", icon: <Globe className="w-5 h-5" /> },
    { id: "terminal", label: "Root Terminal", icon: <Terminal className="w-5 h-5" /> },
  ];

  const tools = [
    { id: "security", label: "Security Protocol", icon: <Shield className="w-5 h-5" /> },
    { id: "settings", label: "System Config", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 h-screen w-20 hover:w-72 bg-zinc-950/90 border-r border-zinc-800 transition-all duration-300 ease-in-out group z-50 overflow-hidden flex flex-col">
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center border-b border-zinc-800/50 group-hover:justify-start group-hover:px-6 transition-all shrink-0">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-red-600 rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          <div className="absolute inset-0 border border-white rounded-sm rotate-45 scale-75 opacity-50" />
        </div>
        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <h1 className="text-lg font-black tracking-tighter text-white">PROJECT <span className="text-red-600">300</span></h1>
          <div className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">Mission Control v2.0</div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Main Modules
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              "flex items-center w-full p-3 rounded-lg transition-all group-hover:px-4 relative overflow-hidden",
              activeView === item.id 
                ? "bg-red-600/10 text-red-500 border border-red-900/30" 
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent"
            )}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className="ml-4 text-sm font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
              {item.label}
            </span>
            {activeView === item.id && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        ))}

        <div className="my-4 border-t border-zinc-800/50 mx-2" />

        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Tools & Config
        </div>
        {tools.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className="flex items-center w-full p-3 rounded-lg transition-all text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 group-hover:px-4"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className="ml-4 text-sm font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* User / Status Footer */}
      <div className="p-4 border-t border-zinc-800 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <Lock className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-xs font-bold text-white">COMMANDER</div>
            <div className="text-[10px] text-green-500 font-mono">SECURE UPLINK</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
