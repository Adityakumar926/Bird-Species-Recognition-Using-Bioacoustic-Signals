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
    <div className="min-h-screen bg-[#FCF9F0] bg-warm-dots text-[#163333] flex flex-col font-sans">
      {/* 1. App Header */}
      <Header />

      {/* 2. Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8AD6D1]/25 border border-[#359FA0]/35 text-[#175253] text-xs font-bold shadow-sm">
            <Radio className="h-3.5 w-3.5 text-[#359FA0]" />
            BioAcoustic AI &bull; PyTorch BANet Deep Learning Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#163333] tracking-tight">
            Bird Species Recognition &amp; Habitat Intelligence
          </h2>
          <p className="text-sm text-[#4B6B6C] max-w-xl mx-auto font-medium">
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
          <div className="illustrative-card max-w-3xl mx-auto p-8 border border-[#EDE2C8] text-center space-y-5 bg-white shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-[#FFF0C5]/85 border border-[#F3DEB0] mx-auto flex items-center justify-center text-[#FF8C52] shadow-sm">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#163333] mb-1.5">
                Ready for Bioacoustic Analysis
              </h4>
              <p className="text-xs text-[#4B6B6C] max-w-md mx-auto leading-relaxed">
                Drag and drop any audio recording or BirdCLEF .parquet file into the box above.
                The system will automatically extract waveforms, compute spectrograms, identify the species, and display the GPS map.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#4B6B6C] border-t border-[#F2E7D0] font-medium">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#359FA0]"></span>
                <strong className="text-[#163333]">EfficientNet-B0</strong> Backbone
              </div>
              <div className="text-[#E2D5B1]">&bull;</div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8AD6D1]"></span>
                <strong className="text-[#163333]">Time &amp; Frequency</strong> Attention
              </div>
              <div className="text-[#E2D5B1]">&bull;</div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF8C52]"></span>
                <strong className="text-[#163333]">Dual Pooling</strong> (GAP + GMP)
              </div>
              <div className="text-[#E2D5B1]">&bull;</div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF8C52]"></span>
                <strong className="text-[#FF8C52] font-extrabold">71.73%</strong> Top-5 Accuracy
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-[#EDE2C8] bg-[#FFFDF7] py-6 mt-12 text-center text-xs text-[#4B6B6C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="m-0 font-medium">
            BioAcoustic Attention Network (BANet) &bull; Project Group 18 &bull; BirdCLEF 2023
          </p>
          <p className="m-0 text-[#1F6263] font-semibold">
            PyTorch 2.6 CUDA &bull; React &bull; Leaflet &bull; Flask &bull; Librosa
          </p>
        </div>
      </footer>
    </div>
  );
}
