import React, { useEffect, useState } from 'react';
import { Bird, Cpu, Database, Award, Sparkles } from 'lucide-react';

export default function Header() {
  const [serverStatus, setServerStatus] = useState({ online: false, device: 'CUDA', classes: 264 });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'online') {
          setServerStatus({
            online: true,
            device: data.device,
            classes: data.target_species
          });
        }
      })
      .catch(() => {
        setServerStatus({ online: false, device: 'OFFLINE', classes: 264 });
      });
  }, []);

  return (
    <header className="border-b border-[#EDE2C8] bg-[#FFFDF7]/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#359FA0] to-[#226F70] flex items-center justify-center text-white shadow-md shadow-[#359FA0]/25 border border-white/40">
            <Bird className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-[#163333] m-0">
                BioAcoustic<span className="text-[#FF8C52]">AI</span>
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#8AD6D1]/25 border border-[#359FA0]/40 text-[#226F70] font-bold">
                BANet v2.0
              </span>
            </div>
            <p className="text-xs text-[#4B6B6C] font-medium m-0">
              Bird Species Recognition &amp; Habitat Intelligence System
            </p>
          </div>
        </div>

        {/* System Badges with New Color Hunt Palette (8AD6D1, 359FA0, FFF0C5, FF8C52) */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Accelerator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 border border-[#EDE2C8] text-xs shadow-sm">
            <Cpu className="h-3.5 w-3.5 text-[#359FA0]" />
            <span className="text-[#4B6B6C] font-medium">Accelerator:</span>
            <span className="font-bold text-[#163333]">
              {serverStatus.device === 'CUDA' ? 'NVIDIA RTX 4050 GPU' : 'CPU'}
            </span>
          </div>

          {/* Species Count */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 border border-[#EDE2C8] text-xs shadow-sm">
            <Database className="h-3.5 w-3.5 text-[#FF8C52]" />
            <span className="text-[#4B6B6C] font-medium">Database:</span>
            <span className="font-bold text-[#163333]">{serverStatus.classes} Species</span>
          </div>

          {/* Model Accuracy Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0C5]/85 border border-[#F3DEB0] text-xs shadow-sm">
            <Award className="h-3.5 w-3.5 text-[#FF8C52]" />
            <span className="text-[#8C4A1D] font-extrabold">Top-5 Acc: 71.73%</span>
          </div>

          {/* Online Pulse */}
          <div className="flex items-center gap-1.5 pl-1.5">
            <div className={`h-2.5 w-2.5 rounded-full ${serverStatus.online ? 'bg-[#359FA0] shadow-[0_0_8px_#359FA0] animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-xs font-semibold text-[#4B6B6C]">
              {serverStatus.online ? 'Model Live' : 'Connecting'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
