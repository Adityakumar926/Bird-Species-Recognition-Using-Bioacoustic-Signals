import React, { useState } from 'react';
import LandingNavbar from './components/LandingNavbar';
import LandingHero from './components/LandingHero';
import FileUpload from './components/FileUpload';
import Visualizer from './components/Visualizer';
import SpeciesIntelligence from './components/SpeciesIntelligence';
import HabitatMap from './components/HabitatMap';
import { ArrowLeft, Sparkles, Bird, Cpu, Database, Award, Radio } from 'lucide-react';

export default function App() {
  // 'landing' = Initial pure landing page matching reference design
  // 'prediction' = Bird Species Recognition & Habitat Intelligence prediction workspace
  const [currentView, setCurrentView] = useState('landing');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadSuccess = (data) => {
    setAnalysisResult(data);
  };

  const topSpecies = analysisResult?.predictions?.[0];

  return (
    <div className="min-h-screen text-[#163333] flex flex-col font-sans">
      {/* =========================================================================
          VIEW 1: Pure Landing Page (Matching Reference Design Hero Section)
          ========================================================================= */}
      {currentView === 'landing' && (
        <div className="min-h-screen flex flex-col justify-between hero-canvas">
          {/* Top Navbar */}
          <LandingNavbar
            onLaunchClick={() => {
              setCurrentView('prediction');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onSectionClick={(sec) => {
              if (sec === 'services' || sec === 'features' || sec === 'intelligence' || sec === 'model') {
                setCurrentView('prediction');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }
            }}
          />

          {/* Hero Section */}
          <div className="flex-1 flex flex-col justify-center">
            <LandingHero
              onLaunchClick={() => {
                setCurrentView('prediction');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              onExploreClick={() => {
                setCurrentView('prediction');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: Prediction Workspace (Bird Species Recognition & Habitat Intelligence)
          ========================================================================= */}
      {currentView === 'prediction' && (
        <div className="min-h-screen bg-[#FCF9F0] bg-warm-dots flex flex-col animate-fadeIn">
          {/* Workspace Top Header Bar */}
          <header className="border-b border-[#EDE4D2] bg-[#FFFDF7]/95 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
              {/* Back to Home Button & Brand */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setCurrentView('landing');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FFFBF2] border border-[#EDE4D2] text-xs font-bold text-[#1F6263] transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Back to Landing Page"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-[#FF8C52]" />
                  <span>Back to Home</span>
                </button>

                <div className="h-4 w-[1px] bg-[#EDE4D2]" />

                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#359FA0] to-[#226F70] flex items-center justify-center text-white shadow-sm border border-white/40">
                    <Bird className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h1 className="text-lg font-extrabold tracking-tight text-[#163333] m-0">
                      BioAcoustic<span className="text-[#FF8C52]">AI</span>
                    </h1>
                    <p className="text-[11px] text-[#4B6B6C] font-medium m-0">
                      Species Recognition &amp; Habitat Intelligence
                    </p>
                  </div>
                </div>
              </div>

              {/* System Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#EDE4D2] text-xs">
                  <Cpu className="h-3.5 w-3.5 text-[#359FA0]" />
                  <span className="text-[#4B6B6C] font-medium">Engine:</span>
                  <span className="font-bold text-[#163333]">NVIDIA RTX 4050 CUDA</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#EDE4D2] text-xs">
                  <Database className="h-3.5 w-3.5 text-[#FF8C52]" />
                  <span className="text-[#4B6B6C] font-medium">Classes:</span>
                  <span className="font-bold text-[#163333]">264 Species</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FFF0C5]/85 border border-[#F3DEB0] text-xs">
                  <Award className="h-3.5 w-3.5 text-[#FF8C52]" />
                  <span className="text-[#8C4A1D] font-extrabold">Top-5: 71.73%</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Dashboard Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-2">
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

                {/* Section C: Large Geographic Habitat & Coordinates Map */}
                <HabitatMap species={topSpecies} />
              </div>
            )}

            {/* Empty State Card (When no file uploaded yet) */}
            {!analysisResult && !isLoading && (
              <div className="illustrative-card max-w-3xl mx-auto p-7 border border-[#EDE4D2] text-center space-y-4 bg-white shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-[#FFF0C5]/85 border border-[#F3DEB0] mx-auto flex items-center justify-center text-[#FF8C52] shadow-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#163333] mb-1">
                    Ready for Bioacoustic Analysis
                  </h4>
                  <p className="text-xs text-[#4B6B6C] max-w-md mx-auto leading-relaxed">
                    Drag and drop any audio recording or BirdCLEF .parquet file into the box above.
                    The system will automatically extract waveforms, compute spectrograms, identify the species, and display the GPS map.
                  </p>
                </div>

                <div className="pt-3.5 flex flex-wrap items-center justify-center gap-6 text-xs text-[#4B6B6C] border-t border-[#F2EADA] font-medium">
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

          {/* Footer */}
          <footer className="border-t border-[#EDE4D2] bg-[#FFFDF7] py-6 text-center text-xs text-[#4B6B6C]">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="m-0 font-medium">
                BioAcoustic Attention Network (BANet) &bull; BirdCLEF 2023
              </p>
              <p className="m-0 text-[#1F6263] font-semibold">
                PyTorch 2.6 CUDA &bull; React &bull; Leaflet &bull; Flask &bull; Librosa
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
