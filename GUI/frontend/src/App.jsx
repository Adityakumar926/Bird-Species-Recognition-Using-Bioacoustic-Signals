import React, { useState } from 'react';
import LandingNavbar from './components/LandingNavbar';
import LandingHero from './components/LandingHero';
import FeatureShowcase from './components/FeatureShowcase';
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
          VIEW 1: Pure Landing Page (Hero Section + Scroll-Reveal Feature Showcase)
          ========================================================================= */}
      {currentView === 'landing' && (
        <div className="min-h-screen w-full overflow-x-hidden flex flex-col hero-canvas">
          {/* 1A. Hero Viewport Screen (Full 100vh Initial Experience) */}
          <div className="h-screen max-h-screen w-full flex flex-col justify-between shrink-0 relative">
            {/* Top Navbar */}
            <LandingNavbar
              onLaunchClick={() => {
                setCurrentView('prediction');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              onSectionClick={(sec) => {
                if (sec === 'home') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  return;
                }
                const targetEl = document.getElementById(sec);
                if (targetEl) {
                  targetEl.scrollIntoView({ behavior: 'smooth' });
                  return;
                }
                const showcaseEl = document.getElementById('feature-showcase');
                if (showcaseEl) {
                  showcaseEl.scrollIntoView({ behavior: 'smooth' });
                  return;
                }
                setCurrentView('prediction');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            />

            {/* Hero Section */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <LandingHero
                onLaunchClick={() => {
                  setCurrentView('prediction');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                onExploreClick={() => {
                  const showcaseEl = document.getElementById('feature-showcase');
                  if (showcaseEl) {
                    showcaseEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setCurrentView('prediction');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
              />
            </div>
          </div>

          {/* 1B. Scroll-Reveal Feature Showcase Section */}
          <div id="feature-showcase" className="w-full">
            <FeatureShowcase
              onLaunchClick={() => {
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
        <div className="min-h-screen bg-[#E3F2FD] bg-blue-dots flex flex-col animate-fadeIn">
          {/* Workspace Top Header Bar */}
          <header className="border-b border-[#BBDEFB] bg-white/95 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
              {/* Back to Home Button & Brand */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setCurrentView('landing');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#E3F2FD] border border-[#90CAF9] text-xs font-bold text-[#0D47A1] transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Back to Landing Page"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-[#2196F3]" />
                  <span>Back to Home</span>
                </button>

                <div className="h-4 w-[1px] bg-[#BBDEFB]" />

                {/* Brand Logo: Blue Bird AI matching Landing Page */}
                <div className="flex items-center gap-2.5 select-none">
                  {/* Circular White Container with #425B9A Bird */}
                  <div className="h-9 w-9 rounded-full bg-white border border-[#BBDEFB] flex items-center justify-center shadow-sm">
                    <Bird className="h-5 w-5 stroke-[2.2] text-[#425B9A]" />
                  </div>

                  {/* Wordmark: Blue Bird AI */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans font-bold text-lg text-[#0D47A1] tracking-tight">
                      Blue Bird
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#2196F3] shadow-sm">
                      AI
                    </span>
                  </div>
                </div>
              </div>

              {/* System Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#BBDEFB] text-xs">
                  <Cpu className="h-3.5 w-3.5 text-[#2196F3]" />
                  <span className="text-[#42658A] font-medium">Engine:</span>
                  <span className="font-bold text-[#0D47A1]">NVIDIA RTX 4050 CUDA</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#BBDEFB] text-xs">
                  <Database className="h-3.5 w-3.5 text-[#2196F3]" />
                  <span className="text-[#42658A] font-medium">Classes:</span>
                  <span className="font-bold text-[#0D47A1]">264 Species</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#E3F2FD] border border-[#90CAF9] text-xs">
                  <Award className="h-3.5 w-3.5 text-[#2196F3]" />
                  <span className="text-[#0D47A1] font-extrabold">Top-5: 71.73%</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Dashboard Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D47A1] tracking-tight">
                Bird Species Recognition &amp; Habitat Intelligence
              </h2>
              <p className="text-sm text-[#42658A] max-w-xl mx-auto font-medium">
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
          <footer className="border-t border-[#BBDEFB] bg-white py-6 text-center text-xs text-[#42658A]">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="m-0 font-medium">
                BioAcoustic Attention Network (BANet) &bull; BirdCLEF 2023
              </p>
              <p className="m-0 text-[#0D47A1] font-semibold">
                PyTorch 2.6 CUDA &bull; React &bull; Leaflet &bull; Flask &bull; Librosa
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
