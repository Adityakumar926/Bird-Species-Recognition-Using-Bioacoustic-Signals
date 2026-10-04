import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import birdImg from '../assets/bird.png';
import marbleOrbImg from '../assets/marble_orb.jpg';
import crystalShieldImg from '../assets/crystal_shield.jpg';

export default function LandingHero({ onLaunchClick, onExploreClick }) {
  return (
    <div className="relative w-full overflow-hidden hero-canvas min-h-[92vh] flex flex-col justify-between pt-2 pb-8">
      {/* 1. Giant Translucent Background Serif Watermark ('BLUEBIRD') */}
      <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <span className="font-serif tracking-[0.22em] text-white/35 font-semibold text-[15vw] sm:text-[14vw] lg:text-[13vw] uppercase whitespace-nowrap leading-none drop-shadow-sm">
          BLUEBIRD
        </span>
      </div>

      {/* 2. Main Hero Grid Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-between pt-4 sm:pt-6">
        {/* Top-Right Floating Avatar Proof Pill */}
        <div className="flex justify-end mb-2">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm text-xs text-[#2A4B68]">
            {/* Overlapping Avatar Stacks */}
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white/80 bg-[#359FA0] flex items-center justify-center text-[10px] font-bold text-white">
                BC
              </div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white/80 bg-[#FF8C52] flex items-center justify-center text-[10px] font-bold text-white">
                AI
              </div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white/80 bg-[#224A6D] flex items-center justify-center text-[10px] font-bold text-white">
                264
              </div>
            </div>
            <span className="font-semibold text-[#1C364F]">Active Users</span>
            <span className="font-extrabold text-[#0D62B5]">+323</span>
          </div>
        </div>

        {/* Center & Hero Subject Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative min-h-[440px] my-auto">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-5 space-y-5 text-left z-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-[#193751] tracking-tight leading-[1.05]">
              Innovation <br />
              <span className="font-serif italic font-normal text-[#2A5173] text-5xl sm:text-6xl lg:text-7xl">
                &amp; security
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#466580] max-w-xs leading-relaxed font-medium">
              We are at the forefront of merging cutting-edge technology
            </p>

            {/* Pill CTA Buttons Matching Reference */}
            <div className="flex items-center gap-3 pt-2">
              {/* Primary Vibrant Blue Pill with Inner Circle Arrow */}
              <button
                onClick={onLaunchClick}
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0D6EE6] hover:bg-[#085CC6] text-white text-xs font-bold shadow-md shadow-[#0D6EE6]/25 transition-all cursor-pointer active:scale-95"
              >
                <span>Our Solutions</span>
                <div className="h-6 w-6 rounded-full bg-white text-[#0D6EE6] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
              </button>

              {/* Secondary Frosted White Pill Button */}
              <button
                onClick={onExploreClick}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/85 hover:bg-white text-xs font-bold text-[#1C3852] border border-white/80 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Contact us
              </button>
            </div>
          </div>

          {/* Center Column: Transparent Bird Cutout Subject with Soft Glow */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-start lg:-ml-12">
            {/* Ambient soft backlight behind bird */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/40 blur-3xl pointer-events-none" />

            {/* User Provided Bird Image (src/assets/bird.png) with layered depth */}
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[430px] lg:max-w-[490px] transform hover:scale-[1.01] transition-transform duration-500">
              <img
                src={birdImg}
                alt="Bluebird BioAcoustic AI Hero"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(20,50,80,0.18)] select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Bottom Row: 3 Floating Cards (Directly Matching Reference Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 sm:pt-4 relative z-20">
          {/* Card 1: Translucent Frosted Glass Card (Crystal Lock/Shield) */}
          <div className="glass-panel rounded-3xl p-5 flex flex-col justify-between min-h-[160px] relative transition-transform hover:-translate-y-1 duration-200">
            {/* Upper row: Crystal Shield Asset + Tag + Arrow */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-white/40 border border-white/70 overflow-hidden flex items-center justify-center p-1 shadow-sm">
                  <img src={crystalShieldImg} alt="Shield Icon" className="w-full h-full object-contain" />
                </div>
                <span className="text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/50 text-[#1C3B56] border border-white/70">
                  Perfect Security
                </span>
              </div>
              <div className="h-7 w-7 rounded-full bg-white/50 border border-white/70 flex items-center justify-center text-[#2A4E6E]">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Content */}
            <div className="mt-3">
              <h4 className="text-sm font-extrabold text-[#163652] leading-snug">
                AI ensures total protection
              </h4>
            </div>
          </div>

          {/* Card 2: Signature Sculpted White Card (Curved Tab with 3D Marble Orb) */}
          <div className="sculpted-white-card rounded-3xl p-5 flex flex-col justify-between min-h-[160px] relative transition-transform hover:-translate-y-1 duration-200">
            {/* Upper row: 3D Marble Orb + Title + Arrow */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#EBF5FB] to-white border border-[#D5E8F5] overflow-hidden flex items-center justify-center p-1 shadow-sm">
                  <img src={marbleOrbImg} alt="3D Marble Orb" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#112F49] leading-snug">
                    Integrated AI Agent
                  </h4>
                </div>
              </div>
              <div className="h-7 w-7 rounded-full bg-[#F0F5FA] border border-[#D8E6F3] flex items-center justify-center text-[#2A4E6E]">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Content */}
            <div className="mt-3">
              <p className="text-[11px] text-[#55738C] font-medium leading-relaxed">
                Integrated AI agent for personalized client experiences.
              </p>
            </div>
          </div>

          {/* Card 3: Translucent Glass Stat Card (42% join us in redefining) */}
          <div className="glass-panel rounded-3xl p-5 flex flex-col justify-between min-h-[160px] relative transition-transform hover:-translate-y-1 duration-200">
            {/* Upper row: Stat Number + Arrow */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-4xl sm:text-5xl font-light font-sans text-white drop-shadow-sm tracking-tight">
                  42<span className="text-3xl font-extralight text-white/90">%</span>
                </span>
              </div>
              <div className="h-7 w-7 rounded-full bg-white/50 border border-white/70 flex items-center justify-center text-[#2A4E6E]">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Content */}
            <div className="mt-2">
              <p className="text-[11px] text-white/80 font-medium leading-tight">
                Join us in redefining the future of security with innovative solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
