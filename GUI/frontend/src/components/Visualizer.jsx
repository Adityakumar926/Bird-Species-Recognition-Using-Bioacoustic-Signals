import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, BarChart3, Zap, Activity, Waves } from 'lucide-react';

export default function Visualizer({ data }) {
  if (!data) return null;

  const { audio_metadata, waveform_peaks, spectrogram_image, playable_audio, inference_time_ms } = data;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(5.0);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [data]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="illustrative-card p-6 sm:p-7 bg-white">
      {/* Title & Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#F0E6D4]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#8AD6D1]/25 text-[#359FA0] border border-[#8AD6D1]/40">
            <Waves className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#163333] m-0">
              Bioacoustic Waveform &amp; Amplitude Visualization
            </h3>
            <p className="text-xs text-[#4B6B6C] m-0 font-medium">
              Time-domain sound pressure envelope and 128-band Log-Mel spectrogram
            </p>
          </div>
        </div>

        {/* Telemetry metadata tags with less curve */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#FFFBF2] border border-[#EDE4D2] text-[#4B6B6C]">
            Sampling Rate: <strong className="text-[#359FA0] font-extrabold">{audio_metadata.target_sr.toLocaleString()} Hz</strong>
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#FFFBF2] border border-[#EDE4D2] text-[#4B6B6C]">
            Duration: <strong className="text-[#FF8C52] font-extrabold">{audio_metadata.duration_seconds}s</strong>
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#FFFBF2] border border-[#EDE4D2] text-[#4B6B6C]">
            Resolution: <strong className="text-[#359FA0] font-extrabold">128 &times; 313 Bins</strong>
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#FFF0C5]/85 border border-[#F3DEB0] text-[#8C4A1D] flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-[#FF8C52]" />
            Latency: {inference_time_ms} ms
          </span>
        </div>
      </div>

      {/* Hidden Audio Element */}
      {playable_audio && (
        <audio
          ref={audioRef}
          src={playable_audio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration || 5.0)}
        />
      )}

      {/* Audio Player Control Bar */}
      <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FFFBF2] border border-[#F0E6D4] mb-5">
        <button
          onClick={togglePlay}
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#FF8C52] to-[#E06F35] hover:opacity-90 text-white font-bold flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95 cursor-pointer border border-white/40"
          title={isPlaying ? 'Pause' : 'Play Audio'}
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>

        {/* Progress scrub bar */}
        <div className="flex-1">
          <div className="flex justify-between text-[11px] text-[#4B6B6C] font-mono font-bold mb-1">
            <span>{currentTime.toFixed(2)}s</span>
            <span className="text-[#359FA0] tracking-wider uppercase text-[10px]">Playback Timeline</span>
            <span>{duration.toFixed(2)}s</span>
          </div>
          <div
            className="h-2.5 w-full bg-[#EDE4D2] rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              if (audioRef.current) {
                audioRef.current.currentTime = pos * duration;
              }
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#359FA0] via-[#8AD6D1] to-[#FF8C52] transition-all duration-75 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#4B6B6C] font-semibold pr-1">
          <Volume2 className="h-4 w-4 text-[#359FA0]" />
          <span>Waveform</span>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="space-y-5">
        {/* 1. Time-Domain Amplitude Waveform Visualization */}
        <div className="rounded-xl bg-[#FFFBF2] border border-[#F0E6D4] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold text-[#163333] uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#359FA0]"></span>
              Time-Domain Amplitude Waveform (0.0s to 5.0s Window)
            </span>
            <span className="text-xs text-[#4B6B6C] font-mono font-semibold">Normalized Amplitude [-1.0, +1.0]</span>
          </div>

          {/* Interactive Mirrored Amplitude Envelope Canvas */}
          <div className="relative bg-white border border-[#EDE4D2] rounded-lg p-3.5">
            {/* Playhead Vertical Line Indicator */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#FF8C52] z-10 pointer-events-none shadow-[0_0_6px_rgba(255,140,82,0.9)]"
              style={{ left: `${progressPercent}%` }}
            />

            {/* Amplitude Scale Bars */}
            <div className="h-28 sm:h-32 w-full flex items-center justify-between gap-[2px]">
              {waveform_peaks &&
                waveform_peaks.map((val, idx) => {
                  const heightPercent = Math.max(val * 100, 4);
                  const isPassed = (idx / waveform_peaks.length) * 100 <= progressPercent;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-center h-full">
                      {/* Top Mirror Bar */}
                      <div
                        className="w-full rounded-t-sm transition-all duration-75"
                        style={{
                          height: `${heightPercent / 2}%`,
                          backgroundColor: isPassed ? '#359FA0' : '#8AD6D1',
                        }}
                      />
                      {/* Center Zero Line */}
                      <div className="w-full h-[1px] bg-[#EDE4D2] my-[1px]" />
                      {/* Bottom Mirror Bar */}
                      <div
                        className="w-full rounded-b-sm transition-all duration-75"
                        style={{
                          height: `${heightPercent / 2}%`,
                          backgroundColor: isPassed ? '#FF8C52' : '#F3DEB0',
                        }}
                      />
                    </div>
                  );
                })}
            </div>

            {/* Time Axis Labels */}
            <div className="flex justify-between text-[11px] text-[#4B6B6C] font-mono font-bold pt-2 border-t border-[#F2EADA] mt-1">
              <span>0.0s</span>
              <span>1.0s</span>
              <span>2.0s</span>
              <span>3.0s</span>
              <span>4.0s</span>
              <span>5.0s</span>
            </div>
          </div>
        </div>

        {/* 2. 2D Log-Mel Spectrogram Display */}
        <div className="rounded-xl bg-[#FFFBF2] border border-[#F0E6D4] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold text-[#163333] uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF8C52]"></span>
              2D Log-Mel Spectrogram (Time-Frequency Spectral Energy Density)
            </span>
            <span className="text-xs text-[#359FA0] font-mono font-bold">128 Mel Bins &bull; 0 - 16,000 Hz</span>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#EDE4D2] bg-[#0E1F1F]">
            {spectrogram_image ? (
              <img
                src={spectrogram_image}
                alt="Log-Mel Spectrogram"
                className="w-full h-auto object-cover rounded-lg"
              />
            ) : (
              <div className="h-44 flex items-center justify-center text-xs text-[#4B6B6C]">
                Spectrogram unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
