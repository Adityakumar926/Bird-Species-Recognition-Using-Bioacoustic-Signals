import React from 'react';
import { Bird, ArrowUpRight } from 'lucide-react';

export default function LandingNavbar({ onLaunchClick, onSectionClick }) {
  return (
    <nav className="w-full max-w-7xl mx-auto px-6 pt-6 pb-2 flex items-center justify-between relative z-30">
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="h-9 w-9 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-[#2A4B69] shadow-sm">
          <Bird className="h-5 w-5 stroke-[2.2]" />
        </div>
        <span className="text-sm font-bold tracking-wider uppercase text-[#223E56] hidden sm:inline">
          Bluebird<span className="text-[#3572A0]">AI</span>
        </span>
      </div>

      {/* Floating Center Pill Navigation */}
      <div className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full bg-white/35 backdrop-blur-md border border-white/60 shadow-sm text-xs font-semibold text-[#2F4D66]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-[#183247] transition-colors cursor-pointer"
        >
          home
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('about')}
          className="hover:text-[#183247] transition-colors cursor-pointer"
        >
          about
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('features')}
          className="hover:text-[#183247] transition-colors cursor-pointer"
        >
          features
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('model')}
          className="hover:text-[#183247] transition-colors cursor-pointer"
        >
          model
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('intelligence')}
          className="hover:text-[#183247] transition-colors cursor-pointer"
        >
          bioacoustics
        </button>
        <button
          onClick={() => onSectionClick && onSectionClick('contact')}
          className="hover:text-[#183247] transition-colors cursor-pointer"
        >
          contact
        </button>
      </div>

      {/* Right Action Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onLaunchClick}
          className="px-5 py-2 rounded-full bg-white/90 hover:bg-white text-xs font-bold text-[#1C3A53] shadow-sm hover:shadow transition-all cursor-pointer border border-white/80 active:scale-95"
        >
          Launch Analyzer
        </button>
      </div>
    </nav>
  );
}
