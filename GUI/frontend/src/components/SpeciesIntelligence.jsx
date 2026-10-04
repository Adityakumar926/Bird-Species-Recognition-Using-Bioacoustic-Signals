import React from 'react';
import { Award, Layers, Sparkles, CheckCircle2, Feather, Compass } from 'lucide-react';

export default function SpeciesIntelligence({ predictions }) {
  if (!predictions || predictions.length === 0) return null;

  const topMatch = predictions[0];

  const getBarColor = (conf) => {
    if (conf >= 70) return 'from-[#FF8C52] to-[#E06F35]';
    if (conf >= 40) return 'from-[#359FA0] to-[#8AD6D1]';
    return 'from-[#F3DEB0] to-[#E2CBA0]';
  };

  return (
    <div className="illustrative-card p-6 sm:p-8 bg-white border border-[#EDE2C8] shadow-sm">
      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#F2E7D0]">
        <div className="p-2.5 rounded-2xl bg-[#FFF0C5]/85 text-[#FF8C52] border border-[#F3DEB0] shadow-sm">
          <Feather className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#163333] m-0">Species Identification Intelligence</h3>
          <p className="text-xs text-[#4B6B6C] m-0 font-medium">BioAcoustic Attention Network probability distribution</p>
        </div>
      </div>

      {/* Primary Top-1 Match Card with Color Hunt Palette */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FFFBF2] via-white to-[#FFF0C5]/40 border-2 border-[#EDE2C8] p-6 sm:p-7 shadow-sm mb-7 relative overflow-hidden">
        {/* Soft Organic Decorative Glow */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-[#8AD6D1]/25 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FF8C52] text-white shadow-sm">
                <Award className="h-3.5 w-3.5" />
                RANK #1 CONFIRMED MATCH
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-lg bg-white border border-[#EDE2C8] text-[#4B6B6C] font-mono font-bold">
                Taxon: {topMatch.species_code}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#163333] tracking-tight m-0">
              {topMatch.common_name}
            </h2>
            <p className="text-sm italic text-[#359FA0] font-bold mt-1">
              {topMatch.scientific_name}
            </p>
          </div>

          {/* Large Confidence Circle / Metric Badge */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/95 border border-[#EDE2C8] min-w-[140px] shrink-0 text-center shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B6B6C]">
              Model Confidence
            </span>
            <span className="text-3xl font-black text-[#FF8C52] mt-0.5">
              {topMatch.confidence}%
            </span>
            <div className="w-full bg-[#FCF9F0] h-2.5 rounded-full mt-2.5 overflow-hidden border border-[#EDE2C8]">
              <div
                className="bg-gradient-to-r from-[#359FA0] via-[#8AD6D1] to-[#FF8C52] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(topMatch.confidence, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Biological metadata snippet */}
        <div className="mt-5 pt-4 border-t border-[#F2E7D0] flex flex-wrap items-center gap-4 text-xs text-[#4B6B6C] font-semibold">
          <div>
            <span>Dataset Observation Count: </span>
            <strong className="text-[#163333]">{topMatch.sample_count || 'N/A'} field recordings</strong>
          </div>
          <div>&bull;</div>
          <div className="flex items-center gap-1.5 text-[#359FA0] font-bold">
            <CheckCircle2 className="h-4 w-4" />
            <span>Optimal Bioacoustic Waveform Match</span>
          </div>
        </div>
      </div>

      {/* Top-5 Candidate Breakdown Table */}
      <div>
        <div className="flex items-center gap-2 mb-3.5">
          <Layers className="h-4 w-4 text-[#359FA0]" />
          <h4 className="text-xs font-bold text-[#163333] uppercase tracking-wider m-0">
            Top-5 Ranked Candidate Species (Relative Confidence Distribution)
          </h4>
        </div>

        <div className="space-y-2.5">
          {predictions.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                idx === 0
                  ? 'bg-[#8AD6D1]/20 border-[#359FA0]/50 shadow-sm'
                  : 'bg-white border-[#F2E7D0] hover:border-[#359FA0]/50'
              }`}
            >
              {/* Rank and names */}
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={`h-7 w-7 rounded-xl text-xs font-extrabold flex items-center justify-center shrink-0 ${
                    idx === 0 ? 'bg-[#FF8C52] text-white shadow-sm' : 'bg-[#FFF0C5] text-[#4B6B6C] border border-[#F3DEB0]'
                  }`}
                >
                  #{item.rank}
                </span>
                <div className="truncate">
                  <div className="text-sm font-bold text-[#163333] truncate">
                    {item.common_name}
                  </div>
                  <div className="text-xs italic text-[#4B6B6C] font-medium truncate">
                    {item.scientific_name}
                  </div>
                </div>
              </div>

              {/* Confidence Bar & Percentage */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 sm:w-40 bg-[#FCF9F0] h-2.5 rounded-full overflow-hidden hidden sm:block border border-[#EDE2C8]">
                  <div
                    className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${getBarColor(item.confidence)}`}
                    style={{ width: `${Math.min(item.confidence, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-[#163333] min-w-[50px] text-right">
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
