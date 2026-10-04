import React from 'react';
import { Award, Layers, Sparkles, CheckCircle2, Feather, Compass } from 'lucide-react';

export default function SpeciesIntelligence({ predictions }) {
  if (!predictions || predictions.length === 0) return null;

  const topMatch = predictions[0];

  const getBarColor = (conf) => {
    if (conf >= 70) return 'from-[#81A6C6] to-[#5E88AC]';
    if (conf >= 40) return 'from-[#AACDDC] to-[#81A6C6]';
    return 'from-[#D2C4B4] to-[#B8A593]';
  };

  return (
    <div className="illustrative-card p-6 sm:p-8 bg-white border border-[#E5D9CC] shadow-sm">
      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#EADFD4]">
        <div className="p-2.5 rounded-2xl bg-[#F3E3D0]/70 text-[#5E88AC] border border-[#D2C4B4] shadow-sm">
          <Feather className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#223344] m-0">Species Identification Intelligence</h3>
          <p className="text-xs text-[#586E84] m-0 font-medium">BioAcoustic Attention Network probability distribution</p>
        </div>
      </div>

      {/* Primary Top-1 Match Card with Soft Sand/Cream Gradient */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FAF6F0] via-white to-[#F3E3D0]/40 border-2 border-[#E5D9CC] p-6 sm:p-7 shadow-sm mb-7 relative overflow-hidden">
        {/* Soft Organic Decorative Glow */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-[#AACDDC]/20 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#81A6C6] text-white shadow-sm">
                <Award className="h-3.5 w-3.5" />
                RANK #1 CONFIRMED MATCH
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-lg bg-white border border-[#D2C4B4] text-[#4A5D70] font-mono font-bold">
                Taxon: {topMatch.species_code}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#223344] tracking-tight m-0">
              {topMatch.common_name}
            </h2>
            <p className="text-sm italic text-[#5E88AC] font-bold mt-1">
              {topMatch.scientific_name}
            </p>
          </div>

          {/* Large Confidence Circle / Metric Badge */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/95 border border-[#D2C4B4] min-w-[140px] shrink-0 text-center shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#586E84]">
              Model Confidence
            </span>
            <span className="text-3xl font-black text-[#81A6C6] mt-0.5">
              {topMatch.confidence}%
            </span>
            <div className="w-full bg-[#FAF4EC] h-2.5 rounded-full mt-2.5 overflow-hidden border border-[#E5D9CC]">
              <div
                className="bg-gradient-to-r from-[#81A6C6] to-[#AACDDC] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(topMatch.confidence, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Biological metadata snippet */}
        <div className="mt-5 pt-4 border-t border-[#EADFD4] flex flex-wrap items-center gap-4 text-xs text-[#586E84] font-semibold">
          <div>
            <span>Dataset Observation Count: </span>
            <strong className="text-[#223344]">{topMatch.sample_count || 'N/A'} field recordings</strong>
          </div>
          <div>&bull;</div>
          <div className="flex items-center gap-1.5 text-[#488B67]">
            <CheckCircle2 className="h-4 w-4" />
            <span>Optimal Bioacoustic Waveform Match</span>
          </div>
        </div>
      </div>

      {/* Top-5 Candidate Breakdown Table */}
      <div>
        <div className="flex items-center gap-2 mb-3.5">
          <Layers className="h-4 w-4 text-[#81A6C6]" />
          <h4 className="text-xs font-bold text-[#223344] uppercase tracking-wider m-0">
            Top-5 Ranked Candidate Species (Relative Confidence Distribution)
          </h4>
        </div>

        <div className="space-y-2.5">
          {predictions.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                idx === 0
                  ? 'bg-[#AACDDC]/20 border-[#81A6C6]/50 shadow-sm'
                  : 'bg-white border-[#EADFD4] hover:border-[#81A6C6]/50'
              }`}
            >
              {/* Rank and names */}
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={`h-7 w-7 rounded-xl text-xs font-extrabold flex items-center justify-center shrink-0 ${
                    idx === 0 ? 'bg-[#81A6C6] text-white shadow-sm' : 'bg-[#FAF6F0] text-[#586E84] border border-[#D2C4B4]'
                  }`}
                >
                  #{item.rank}
                </span>
                <div className="truncate">
                  <div className="text-sm font-bold text-[#223344] truncate">
                    {item.common_name}
                  </div>
                  <div className="text-xs italic text-[#586E84] font-medium truncate">
                    {item.scientific_name}
                  </div>
                </div>
              </div>

              {/* Confidence Bar & Percentage */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 sm:w-40 bg-[#FAF4EC] h-2.5 rounded-full overflow-hidden hidden sm:block border border-[#E5D9CC]">
                  <div
                    className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${getBarColor(item.confidence)}`}
                    style={{ width: `${Math.min(item.confidence, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-[#223344] min-w-[50px] text-right">
                  {item.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
