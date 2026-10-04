import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Visualizer from './components/Visualizer';
import SpeciesIntelligence from './components/SpeciesIntelligence';
import HabitatMap from './components/HabitatMap';
import { Radio, Sparkles, Feather, Waves, Compass, ShieldCheck } from 'lucide-react';

export default function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadSuccess = (data) => {
    setAnalysisResult(data);
  };

  const topSpecies = analysisResult?.predictions?.[0];

  return (
    <div className="min-h-screen bg-[#F8F4EE] bg-warm-dots text-[#223344] flex flex-col font-sans">
      {/* 1. App Header */}
      <Header />

      {/* 2. Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#AACDDC]/30 border border-[#81A6C6]/40 text-[#2B4E6F] text-xs font-bold shadow-sm">
            <Radio className="h-3.5 w-3.5 text-[#81A6C6]" />
            BioAcoustic AI &bull; PyTorch BANet Deep Learning Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#223344] tracking-tight">
            Bird Species Recognition &amp; Habitat Intelligence
          </h2>
          <p className="text-sm text-[#586E84] max-w-xl mx-auto font-medium">
            Upload any bioacoustic field recording (.wav, .mp3, .parquet) to visualize amplitude waveforms,
            extract Log-Mel spectrograms, identify bird species, and inspect geographic habitats.
          </p>
        </div>

        {/* Upload Dropzone */}
        <div className="max-w-3xl mx-auto">
          <FileUpload
            onUploadSuccess={handleUploadSuccess}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>

        {/* Results Workspace */}
        {analysisResult && (
          <div className="space-y-8 animate-fadeIn">
            {/* Section A: Bioacoustic Signal & Amplitude Visualization */}
            <Visualizer data={analysisResult} />

            {/* Section B: Species Identification Intelligence */}
            <SpeciesIntelligence predictions={analysisResult.predictions} />

            {/* Section C: Large Geographic Habitat & Coordinates Map (Placed at Bottom as requested) */}
            <HabitatMap species={topSpecies} />
          </div>
        )}

        {/* Empty State Card (When no file uploaded yet) */}
        {!analysisResult && !isLoading && (
          <div className="illustrative-card max-w-3xl mx-auto p-8 border border-[#E5D9CC] text-center space-y-5 bg-white shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-[#F3E3D0]/70 border border-[#D2C4B4] mx-auto flex items-center justify-center text-[#81A6C6] shadow-sm">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#223344] mb-1.5">
                Ready for Bioacoustic Analysis
              </h4>
              <p className="text-xs text-[#586E84] max-w-md mx-auto leading-relaxed">
                Drag and drop any audio recording or BirdCLEF .parquet file into the box above.
                The system will automatically extract waveforms, compute spectrograms, identify the species, and display the GPS map.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#586E84] border-t border-[#EADFD4] font-medium">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#81A6C6]"></span>
                <strong className="text-[#223344]">EfficientNet-B0</strong> Backbone
              </div>
              <div className="text-[#D2C4B4]">&bull;</div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#AACDDC]"></span>
                <strong className="text-[#223344]">Time &amp; Frequency</strong> Attention
              </div>
              <div className="text-[#D2C4B4]">&bull;</div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D2C4B4]"></span>
                <strong className="text-[#223344]">Dual Pooling</strong> (GAP + GMP)
              </div>
              <div className="text-[#D2C4B4]">&bull;</div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#5E88AC]"></span>
                <strong className="text-[#5E88AC] font-bold">71.73%</strong> Top-5 Accuracy
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-[#E5D9CC] bg-[#FAF6F0] py-6 mt-12 text-center text-xs text-[#586E84]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="m-0 font-medium">
            BioAcoustic Attention Network (BANet) &bull; Project Group 18 &bull; BirdCLEF 2023
          </p>
          <p className="m-0 text-[#4A5D70] font-semibold">
            PyTorch 2.6 CUDA &bull; React &bull; Leaflet &bull; Flask &bull; Librosa
          </p>
        </div>
      </footer>
    </div>
  );
}
