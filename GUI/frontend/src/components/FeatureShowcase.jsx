import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Activity, Sparkles, Waves, Compass, Radio, ShieldCheck, Database, Cpu, MapPin } from 'lucide-react';
import heroBirdImg from '../assets/hero_bird.jpg';
import featureBird2Img from '../assets/feature_bird_2.jpg';
import featureBird3Img from '../assets/feature_bird_3.jpg';

// Individual Scroll-Reveal Feature Slide Component
function FeatureSlide({ data, onLaunchClick, index }) {
  const slideRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!slideRef.current) return;
      const rect = slideRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 0 = entering bottom of screen
      // 1 = perfectly centered in viewport
      // 2 = exiting top of screen
      const totalDist = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const rawProgress = (currentPos / totalDist) * 2;
      const progress = Math.max(0, Math.min(2, rawProgress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute optical depth-of-field blur, translation, opacity, and scale
  let blurAmount = 0;
  let translateY = 0;
  let opacity = 1;
  let scale = 1;

  if (scrollProgress < 0.75) {
    const entryT = Math.max(0, (0.75 - scrollProgress) / 0.75); // 1.0 (entering) down to 0.0 (in focus)
    blurAmount = entryT * 24; // 24px blur -> 0px
    translateY = entryT * 70; // 70px down -> 0px
    opacity = Math.max(0.1, 1 - entryT * 0.9);
    scale = 0.92 + (1 - entryT) * 0.08;
  } else if (scrollProgress > 1.25) {
    const exitT = Math.min(1, (scrollProgress - 1.25) / 0.75); // 0.0 (in focus) up to 1.0 (exiting)
    blurAmount = exitT * 24; // 0px -> 24px blur
    translateY = -exitT * 50; // 0px -> -50px
    opacity = Math.max(0.15, 1 - exitT * 0.85);
    scale = 1 - exitT * 0.06;
  }

  // Left column text subtle fade/slide
  let textOpacity = 1;
  let textTranslateY = 0;
  if (scrollProgress < 0.7) {
    const entryT = Math.max(0, (0.7 - scrollProgress) / 0.7);
    textOpacity = Math.max(0.2, 1 - entryT * 0.8);
    textTranslateY = entryT * 40;
  } else if (scrollProgress > 1.3) {
    const exitT = Math.min(1, (scrollProgress - 1.3) / 0.7);
    textOpacity = Math.max(0.2, 1 - exitT * 0.8);
    textTranslateY = -exitT * 30;
  }

  return (
    <div
      ref={slideRef}
      id={data.slug}
      className="relative w-full min-h-screen py-24 px-6 lg:px-16 flex items-center justify-center overflow-hidden select-none"
    >
      {/* Decorative ambient glowing backlights */}
      <div className={`absolute top-1/4 ${index % 2 === 0 ? 'left-10' : 'right-10'} w-96 h-96 rounded-full bg-white/40 blur-3xl pointer-events-none`} />
      <div className={`absolute bottom-1/4 ${index % 2 === 0 ? 'right-10' : 'left-10'} w-[450px] h-[450px] rounded-full bg-[#90CAF9]/30 blur-3xl pointer-events-none`} />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* =========================================================================
            LEFT COLUMN: Feature Description
            ========================================================================= */}
        <div
          className="lg:col-span-6 space-y-6 text-left transition-all duration-300 ease-out"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          {/* Category Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/70 shadow-sm text-xs font-bold text-[#0D47A1]">
            <Sparkles className="h-3.5 w-3.5 text-[#2196F3]" />
            <span>{data.tag}</span>
          </div>

          {/* Editorial Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-sans font-bold text-[#0D47A1] tracking-tight leading-[1.06]">
            {data.titleLine1} <br />
            <span className="font-serif italic font-normal text-[#425B9A] text-5xl sm:text-6xl lg:text-[64px] leading-[1]">
              {data.titleLine2}
            </span>
          </h2>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base text-[#2C4866] font-medium leading-relaxed max-w-xl">
            {data.description}
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {data.highlights.map((h, i) => {
              const IconComp = h.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/80 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <div className="h-8 w-8 rounded-xl bg-[#E3F2FD] border border-[#90CAF9] flex items-center justify-center text-[#2196F3] mb-2.5">
                    <IconComp className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
                    {h.title}
                  </h4>
                  <p className="text-[11px] text-[#42658A] font-medium leading-snug mt-1">
                    {h.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Telemetry Stats Bar */}
          <div className="flex items-center gap-6 pt-2 border-t border-white/60">
            {data.stats.map((s, i) => (
              <React.Fragment key={i}>
                <div>
                  <div className={`text-2xl font-black font-sans ${s.accent ? 'text-[#2196F3]' : 'text-[#0D47A1]'}`}>
                    {s.value}
                  </div>
                  <div className="text-[11px] text-[#42658A] font-semibold">{s.label}</div>
                </div>
                {i < data.stats.length - 1 && <div className="h-8 w-[1px] bg-white/60" />}
              </React.Fragment>
            ))}
          </div>

          {/* Action CTA Button */}
          <div className="pt-2">
            <button
              onClick={onLaunchClick}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0B67E3] hover:bg-[#0856c2] text-white text-xs font-bold shadow-lg shadow-[#0B67E3]/35 transition-all cursor-pointer active:scale-95"
            >
              <span>{data.buttonText}</span>
              <div className="h-6 w-6 rounded-full bg-white text-[#0B67E3] flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Smooth Optical Blur Scroll-Reveal Image
            ========================================================================= */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          {/* Frosted Frame Window */}
          <div
            className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-[3/4] rounded-[36px] p-3.5 bg-white/35 backdrop-blur-xl border-2 border-white/80 shadow-2xl overflow-hidden transition-all duration-300 ease-out"
            style={{
              filter: `blur(${blurAmount}px)`,
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity: opacity,
              willChange: 'filter, transform, opacity',
            }}
          >
            {/* The Bird Showcase Image */}
            <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-900/10 shadow-inner">
              <img
                src={data.image}
                alt={data.subjectName}
                className="w-full h-full object-cover object-center"
              />

              {/* Subtle glass reflection sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0D47A1]/20 via-transparent to-white/30 pointer-events-none" />

              {/* Floating Bottom Glass Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/70 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#0D47A1] block">
                    {data.subjectTitle}
                  </span>
                  <span className="text-xs font-extrabold text-[#112F49] block">
                    {data.subjectName}
                  </span>
                </div>
                <div className="h-7 w-7 rounded-full bg-[#0B67E3] text-white flex items-center justify-center shadow-sm">
                  <Activity className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Master Feature Showcase Container
export default function FeatureShowcase({ onLaunchClick }) {
  const featureSlides = [
    {
      id: 1,
      slug: "ingestion",
      tag: "Universal Audio & Parquet Ingestion",
      titleLine1: "Multi-Format Audio",
      titleLine2: "& Direct Parquet Shards",
      description: "Seamlessly ingest bioacoustic field recordings across standard formats (.wav, .mp3, .ogg, .flac, .m4a) or drop BirdCLEF .parquet dataset shards directly. The system decodes embedded byte streams on the fly, resamples to 32 kHz, and standardizes 5.0-second temporal analysis windows.",
      highlights: [
        { icon: Database, title: "Direct Parquet Decoding", desc: "Extracts and parses raw audio byte streams directly from BirdCLEF dataset shards without pre-conversion." },
        { icon: Waves, title: "32 kHz Signal Standardizer", desc: "Automatic mono conversion, peak amplitude normalization, and calibrated 5.0-second chunking." }
      ],
      stats: [
        { value: "6+ Formats", label: "Universal Audio" },
        { value: "32 kHz", label: "Resampling Rate", accent: true },
        { value: "5.0s Chunks", label: "Fixed Time Window" }
      ],
      buttonText: "Upload & Ingest Audio",
      image: heroBirdImg,
      subjectTitle: "Bioacoustic Subject 01",
      subjectName: "Eastern Bluebird (Sialia sialis)"
    },
    {
      id: 2,
      slug: "spectral",
      tag: "Real-Time Spectral Intelligence",
      titleLine1: "Acoustic Waveforms",
      titleLine2: "& 128-Band Spectrograms",
      description: "Transform raw sound pressure signals into dual real-time visual representations. Inspect mirrored time-domain amplitude waveforms with interactive scrub playback, alongside high-resolution 128-band Log-Mel spectrograms capturing frequency energy densities from 0 to 16,000 Hz.",
      highlights: [
        { icon: Activity, title: "Waveform Scrub Player", desc: "Real-time amplitude peak visualization with interactive timeline audio playhead and duration markers." },
        { icon: Sparkles, title: "128-Band Log-Mel Canvas", desc: "High-density spectral energy plot resolving subtle avian harmonics across 313 temporal frames." }
      ],
      stats: [
        { value: "128 Bins", label: "Mel Spectrogram" },
        { value: "0 - 16 kHz", label: "Nyquist Bandwidth", accent: true },
        { value: "313 Frames", label: "Time Resolution" }
      ],
      buttonText: "Inspect Visualizer",
      image: featureBird2Img,
      subjectTitle: "Bioacoustic Subject 02",
      subjectName: "Mountain Bluebird (Sialia currucoides)"
    },
    {
      id: 3,
      slug: "classification",
      tag: "Deep Neural Inference & GIS",
      titleLine1: "264 Species Classification",
      titleLine2: "& Interactive Habitat Mapping",
      description: "Powered by BANet (BioAcoustic Attention Network) with an EfficientNet-B0 backbone, Dual Time-Frequency Attention, and NVIDIA CUDA acceleration. Delivers sub-45ms Top-5 species predictions, paired with an interactive Leaflet map pinpointing natural wilderness observation coordinates.",
      highlights: [
        { icon: Cpu, title: "Dual Time-Frequency Attention", desc: "Suppresses background forest and wind noise to isolate salient vocalizations across 264 bird species." },
        { icon: MapPin, title: "Interactive Leaflet GPS Map", desc: "Resolves species coordinates across East Africa with OpenStreetMap GIS and direct navigation links." }
      ],
      stats: [
        { value: "264 Classes", label: "Avian Species" },
        { value: "< 45ms", label: "CUDA Latency", accent: true },
        { value: "Top-5", label: "Ranked Confidence" }
      ],
      buttonText: "Launch Species Recognition",
      image: featureBird3Img,
      subjectTitle: "Bioacoustic Subject 03",
      subjectName: "Western Bluebird (Sialia mexicana)"
    }
  ];

  return (
    <section
      className="relative w-full flex flex-col items-center"
      style={{
        background: 'linear-gradient(180deg, rgba(169,191,209,0.3) 0%, rgba(202,219,232,0.6) 20%, rgba(223,235,244,0.9) 50%, rgba(202,219,232,0.6) 80%, rgba(169,191,209,0.3) 100%)',
      }}
    >
      {featureSlides.map((slide, index) => (
        <FeatureSlide
          key={slide.id}
          data={slide}
          onLaunchClick={onLaunchClick}
          index={index}
        />
      ))}
    </section>
  );
}
