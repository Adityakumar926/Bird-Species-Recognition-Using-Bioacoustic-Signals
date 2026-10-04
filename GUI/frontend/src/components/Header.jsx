import React, { useEffect, useState } from 'react';
import { Bird, Cpu, Database, Award } from 'lucide-react';

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
    <header className="border-b border-[#EDE4D2] bg-[#FFFDF7]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5 select-none">
          <div className="h-9 w-9 rounded-full bg-white border border-[#BBDEFB] flex items-center justify-center shadow-sm">
            <Bird className="h-5 w-5 stroke-[2.2] text-[#425B9A]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-sans font-bold text-lg text-[#0D47A1] tracking-tight">
              Blue Bird
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#2196F3] shadow-sm">
              AI
            </span>
          </div>
        </div>

        {/* System Badges with refined borders and less curve */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Accelerator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#EDE4D2] text-xs">
            <Cpu className="h-3.5 w-3.5 text-[#359FA0]" />
            <span className="text-[#4B6B6C] font-medium">Accelerator:</span>
            <span className="font-bold text-[#163333]">
              {serverStatus.device === 'CUDA' ? 'NVIDIA RTX 4050 GPU' : 'CPU'}
            </span>
          </div>

          {/* Species Count */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#EDE4D2] text-xs">
            <Database className="h-3.5 w-3.5 text-[#FF8C52]" />
            <span className="text-[#4B6B6C] font-medium">Database:</span>
            <span className="font-bold text-[#163333]">{serverStatus.classes} Species</span>
          </div>

          {/* Model Accuracy Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FFF0C5]/85 border border-[#F3DEB0] text-xs">
            <Award className="h-3.5 w-3.5 text-[#FF8C52]" />
            <span className="text-[#8C4A1D] font-extrabold">Top-5 Acc: 71.73%</span>
          </div>

          {/* Online Pulse */}
          <div className="flex items-center gap-1.5 pl-1.5">
            <div className={`h-2.5 w-2.5 rounded-full ${serverStatus.online ? 'bg-[#359FA0] shadow-[0_0_6px_#359FA0]' : 'bg-rose-500'}`} />
            <span className="text-xs font-semibold text-[#4B6B6C]">
              {serverStatus.online ? 'Model Live' : 'Connecting'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
