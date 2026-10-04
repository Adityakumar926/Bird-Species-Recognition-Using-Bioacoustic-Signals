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

        {/* Wordmark: Blue Bird AI in #425B9A */}
        <div className="flex items-center gap-1.5">
          <span className="font-sans font-bold text-lg text-[#425B9A] tracking-tight">
            Blue Bird
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/50 border border-[#425B9A]/30 text-[#425B9A] shadow-xs backdrop-blur-sm">
            AI
          </span>
        </div>
      </div>

      {/* Floating Center Pill Navigation */}
      <div className="hidden md:flex items-center gap-6 px-7 py-2.5 rounded-full bg-white/35 backdrop-blur-md border border-white/60 shadow-sm text-xs font-semibold text-[#1C3852]">
        <button
          onClick={() => onSectionClick ? onSectionClick('home') : window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-[#0B67E3] transition-colors cursor-pointer"
        >
          home
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('ingestion')}
          className="hover:text-[#0B67E3] transition-colors cursor-pointer"
        >
          audio ingestion
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('spectral')}
          className="hover:text-[#0B67E3] transition-colors cursor-pointer"
        >
          spectral visualizer
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('classification')}
          className="hover:text-[#0B67E3] transition-colors cursor-pointer"
        >
          species intelligence
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('classification')}
          className="hover:text-[#0B67E3] transition-colors cursor-pointer"
        >
          habitat map
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('classification')}
          className="hover:text-[#0B67E3] transition-colors cursor-pointer"
        >
          neural model
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
