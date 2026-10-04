import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import birdDofImg from '../assets/bird_hero_dof.png';
import marbleOrbImg from '../assets/marble_orb.jpg';
import soundWaveCrystalImg from '../assets/sound_wave_crystal.jpg';

export default function LandingHero({ onLaunchClick, onExploreClick }) {
  return (
    <div className="relative w-full flex-1 flex flex-col justify-between px-6 lg:px-12 pb-6 pt-2 overflow-hidden select-none">
      {/* 1. Giant Translucent Background Serif Watermark ('BLUEBIRD') */}
      <div className="absolute top-[32%] sm:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <span className="font-serif tracking-[0.26em] text-white/45 font-normal text-[15vw] sm:text-[14vw] lg:text-[13vw] uppercase whitespace-nowrap leading-none drop-shadow-sm pl-[0.26em]">
          BLUEBIRD
        </span>
      </div>

      {/* 2. Center Hero Bird with Continuous Optical Depth-of-Field Blur */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[2%] sm:top-[0%] bottom-[4%] flex items-center justify-center pointer-events-none z-10 w-full max-w-[500px] sm:max-w-[580px] lg:max-w-[650px]">
        {/* Soft atmospheric radial backlight glow behind the head */}
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-white/50 blur-3xl pointer-events-none" />

        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={birdDofImg}
            alt="Bluebird AI Hero Portrait"
            className="w-auto h-full max-h-[82vh] object-contain drop-shadow-[0_20px_35px_rgba(20,45,70,0.12)]"
          />
        </div>
      </div>

      {/* Spacer to push content towards the bottom */}
      <div className="flex-1" />

      {/* 3. Bottom Panoramic Dock: Headline & Buttons on Left, 3 Cards & Proof Pill on Right */}
      <div className="relative z-30 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-end justify-between gap-6 lg:gap-8 pb-1">
        {/* 3A. Left Column: Editorial Bioacoustic Headline & Actions */}
        <div className="space-y-3.5 text-left max-w-sm pl-1 sm:pl-2 shrink-0">
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-sans font-bold text-[#425B9A] tracking-tight leading-[1.04]">
            Acoustic <br />
            <span className="font-serif italic font-normal text-[#425B9A] text-5xl sm:text-6xl lg:text-[70px] leading-[1]">
              &amp; intelligence
            </span>
          </h1>

          <p className="text-xs sm:text-[13px] text-[#3B5A7A] max-w-[270px] leading-relaxed font-medium pt-1">
            At the forefront of bioacoustic AI, identifying 264+ bird species through deep audio intelligence
          </p>

          {/* Pill CTA Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {/* Primary Vibrant Blue Pill with Inner Circle Arrow */}
            <button
              onClick={onLaunchClick}
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0B67E3] hover:bg-[#0856c2] text-white text-xs font-bold shadow-md shadow-[#0B67E3]/35 transition-all cursor-pointer active:scale-95"
            >
              <span>Our Solutions</span>
              <div className="h-6 w-6 rounded-full bg-white text-[#0B67E3] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
            </button>

            {/* Secondary Clean White Pill Button */}
            <button
              onClick={onExploreClick}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-white hover:bg-white/95 text-xs font-bold text-[#1C3852] shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Explore Species
            </button>
          </div>
        </div>

        {/* 3B. Right Column: Floating Active Users Pill + 3 Cards */}
        <div className="flex flex-col items-end w-full lg:w-auto">
          {/* Floating Proof Pill directly above Card 3 */}
          <div className="flex justify-end mb-3 pr-2">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/70 shadow-sm text-xs">
              {/* Overlapping Realistic Researcher Avatar Circles */}
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&auto=format&fit=crop&q=80"
                  alt="Researcher 1"
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white/90 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&auto=format&fit=crop&q=80"
                  alt="Researcher 2"
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white/90 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&auto=format&fit=crop&q=80"
                  alt="Researcher 3"
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white/90 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&auto=format&fit=crop&q=80"
                  alt="Researcher 4"
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white/90 object-cover"
                />
              </div>
              <span className="font-semibold text-[#45637D] text-[11px]">Field Researchers</span>
              <span className="font-extrabold text-[#112F49] text-[11px]">+480</span>
            </div>
          </div>

          {/* Row of 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 items-end w-full lg:w-auto">
            {/* Card 1: Frosted Glass Panel (Bioacoustic AI Detection) */}
            <div className="glass-panel rounded-[26px] p-5 flex flex-col justify-between w-full sm:w-[220px] lg:w-[245px] h-[165px] relative transition-transform hover:-translate-y-1 duration-200">
              {/* Upper row: Crystal Shield Asset + Tag + Arrow */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-11 w-11 rounded-2xl bg-white/60 border border-white/80 overflow-hidden flex items-center justify-center p-0.5 shadow-sm shrink-0">
                    <img src={soundWaveCrystalImg} alt="Bioacoustic Sound Wave" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/60 text-[#425B9A] border border-white/80 whitespace-nowrap shadow-xs">
                    Bioacoustic AI
                  </span>
                </div>
                <div className="h-7 w-7 rounded-full bg-white/70 border border-white/90 flex items-center justify-center text-[#1C3852] shadow-xs shrink-0">
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
                </div>
              </div>

              {/* Title */}
              <div className="mt-2">
                <h4 className="text-sm font-extrabold text-[#112F49] leading-snug">
                  Instant 264-species identification
                </h4>
              </div>
            </div>

            {/* Card 2: Signature Sculpted White Card (Curved Tab with 3D Marble Orb) */}
            <div className="relative w-full sm:w-[220px] lg:w-[245px] h-[165px] transition-transform hover:-translate-y-1 duration-200 shrink-0">
              {/* Sculpted Silhouette SVG Background */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_12px_28px_rgba(20,45,70,0.12)]"
                viewBox="0 0 245 165"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 26 A 26 26 0 0 1 26 0 H 94 A 24 24 0 0 1 118 24 A 20 20 0 0 0 138 44 H 219 A 26 26 0 0 1 245 70 V 139 A 26 26 0 0 1 219 165 H 26 A 26 26 0 0 1 0 139 Z"
                  fill="#FFFFFF"
                />
              </svg>

              {/* Content positioned over the sculpted canvas */}
              <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
                {/* Upper Area: Orb in Tall Tab + Arrow on Lower Terrace */}
                <div className="flex items-start justify-between">
                  {/* 3D Marble Orb inside top-left curved dome */}
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#EBF5FB] to-white border border-[#D5E8F5] overflow-hidden flex items-center justify-center p-1 shadow-sm">
                    <img src={marbleOrbImg} alt="Habitat Orb" className="w-full h-full object-contain" />
                  </div>

                  {/* Circular White Button on Lower Terrace */}
                  <div className="mt-7 mr-0.5 h-7 w-7 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#1C3852]">
                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                </div>

                {/* Body: Title and Subtitle */}
                <div className="mt-1">
                  <h4 className="text-sm font-extrabold text-[#112F49] leading-snug">
                    Habitat Intelligence
                  </h4>
                  <p className="text-[11px] text-[#55738C] font-medium leading-relaxed mt-0.5">
                    Neural network mapping vocalizations to ecological habitats &amp; IUCN conservation status.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Translucent Frosted Glass Stat Card (98%) */}
            <div className="glass-panel rounded-[26px] p-5 flex flex-col justify-between w-full sm:w-[220px] lg:w-[245px] h-[165px] relative transition-transform hover:-translate-y-1 duration-200">
              {/* Upper row: Stat Number + Arrow */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-5xl font-light font-sans text-[#112F49] drop-shadow-sm tracking-tight leading-none">
                    98<span className="text-3xl font-normal text-[#425B9A]">%</span>
                  </span>
                </div>
                <div className="h-7 w-7 rounded-full bg-white/70 border border-white/90 flex items-center justify-center text-[#1C3852] shadow-xs shrink-0">
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
                </div>
              </div>

              {/* Description */}
              <div className="mt-2">
                <p className="text-[11px] text-[#55738C] font-medium leading-relaxed">
                  Precision benchmark across complex avian vocalizations in natural field soundscapes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
