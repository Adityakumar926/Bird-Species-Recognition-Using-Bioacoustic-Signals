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
    <header className="border-b border-[#E5D9CC] bg-[#FAF6F0]/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#81A6C6] to-[#5E88AC] flex items-center justify-center text-white shadow-md shadow-[#81A6C6]/20 border border-white/40">
            <Bird className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-[#223344] m-0">
                BioAcoustic<span className="text-[#81A6C6]">AI</span>
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#AACDDC]/30 border border-[#81A6C6]/40 text-[#3D6385] font-bold">
                BANet v2.0
              </span>
            </div>
            {/* Note: "Professional" removed as explicitly requested */}
            <p className="text-xs text-[#586E84] font-medium m-0">
              Bird Species Recognition &amp; Habitat Intelligence System
            </p>
          </div>
        </div>

        {/* System Badges with Warm Earthy & Sky Palette */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Accelerator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-[#E5D9CC] text-xs shadow-sm">
            <Cpu className="h-3.5 w-3.5 text-[#81A6C6]" />
            <span className="text-[#586E84] font-medium">Accelerator:</span>
            <span className="font-bold text-[#223344]">
              {serverStatus.device === 'CUDA' ? 'NVIDIA RTX 4050 GPU' : 'CPU'}
            </span>
          </div>

          {/* Species Count */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-[#E5D9CC] text-xs shadow-sm">
            <Database className="h-3.5 w-3.5 text-[#B8A593]" />
            <span className="text-[#586E84] font-medium">Database:</span>
            <span className="font-bold text-[#223344]">{serverStatus.classes} Species</span>
          </div>

          {/* Model Accuracy Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F3E3D0]/70 border border-[#D2C4B4] text-xs shadow-sm">
            <Award className="h-3.5 w-3.5 text-[#81A6C6]" />
            <span className="text-[#3D6385] font-extrabold">Top-5 Acc: 71.73%</span>
          </div>

          {/* Online Pulse */}
          <div className="flex items-center gap-1.5 pl-1.5">
            <div className={`h-2.5 w-2.5 rounded-full ${serverStatus.online ? 'bg-[#55A376] animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-xs font-semibold text-[#586E84]">
              {serverStatus.online ? 'Model Live' : 'Connecting'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
