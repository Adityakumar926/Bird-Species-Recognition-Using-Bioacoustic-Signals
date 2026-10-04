import React from 'react';
import { Bird } from 'lucide-react';

export default function LandingNavbar({ onLaunchClick, onSectionClick }) {
  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-3 flex items-center justify-between relative z-30">
      {/* Brand Logo: Bird Logo from Git + 'Blue Bird AI' */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer group transition-transform hover:scale-105 select-none" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {/* Bird Logo in Frosted White Circle */}
        <div className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-md border border-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
          <Bird className="h-5 w-5 stroke-[2.2] text-[#425B9A]" />
        </div>

        {/* Wordmark: Blue Bird AI */}
        <div className="flex items-center gap-1.5">
          <span className="font-sans font-bold text-lg text-white tracking-tight drop-shadow-sm">
            Blue Bird
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/25 border border-white/50 text-white shadow-sm backdrop-blur-sm">
            AI
          </span>
        </div>
      </div>

      {/* Floating Center Pill Navigation */}
      <div className="hidden md:flex items-center gap-7 px-7 py-2.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-sm text-xs font-semibold text-[#1E3B54]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-[#0C2438] transition-colors cursor-pointer"
        >
          home
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('species')}
          className="hover:text-[#0C2438] transition-colors cursor-pointer"
        >
          species catalog
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('analyzer')}
          className="hover:text-[#0C2438] transition-colors cursor-pointer"
        >
          audio analyzer
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('habitat')}
          className="hover:text-[#0C2438] transition-colors cursor-pointer"
        >
          habitat maps
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('model')}
          className="hover:text-[#0C2438] transition-colors cursor-pointer"
        >
          neural model
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('research')}
          className="hover:text-[#0C2438] transition-colors cursor-pointer"
        >
          research
        </button>
      </div>

      {/* Right Action Button: Clean White Pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={onLaunchClick}
          className="px-6 py-2 rounded-full bg-white text-xs font-bold text-[#1C3A53] shadow-sm hover:shadow-md transition-all cursor-pointer border border-white/90 active:scale-95"
        >
          Launch AI
        </button>
      </div>
    </nav>
  );
}
