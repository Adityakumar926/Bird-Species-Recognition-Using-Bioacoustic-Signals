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
    <div className="illustrative-card p-6 sm:p-8 bg-white border border-[#E5D9CC] shadow-sm">
      {/* Title & Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-[#EADFD4]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#AACDDC]/30 text-[#5E88AC] border border-[#81A6C6]/30 shadow-sm">
            <Waves className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#223344] m-0">
              Bioacoustic Waveform &amp; Amplitude Visualization
            </h3>
            <p className="text-xs text-[#586E84] m-0 font-medium">
              Time-domain sound pressure envelope and 128-band Log-Mel spectrogram
            </p>
          </div>
        </div>

        {/* Telemetry metadata tags with Color Hunt Palette */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#D2C4B4] text-[#4A5D70]">
            Sampling Rate: <strong className="text-[#81A6C6] font-extrabold">{audio_metadata.target_sr.toLocaleString()} Hz</strong>
          </span>
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#D2C4B4] text-[#4A5D70]">
            Duration: <strong className="text-[#5E88AC] font-extrabold">{audio_metadata.duration_seconds}s</strong>
          </span>
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#D2C4B4] text-[#4A5D70]">
            Resolution: <strong className="text-[#81A6C6] font-extrabold">128 &times; 313 Bins</strong>
          </span>
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-[#F3E3D0]/70 border border-[#D2C4B4] text-[#3D6385] flex items-center gap-1 shadow-sm">
            <Zap className="h-3.5 w-3.5 text-[#81A6C6]" />
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
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF6F0] border border-[#EADFD4] mb-6 shadow-sm">
        <button
          onClick={togglePlay}
          className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#81A6C6] to-[#5E88AC] hover:opacity-90 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-[#81A6C6]/25 transition-transform active:scale-95 cursor-pointer border border-white/40"
          title={isPlaying ? 'Pause' : 'Play Audio'}
        >
          {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
        </button>

        {/* Progress scrub bar */}
        <div className="flex-1">
          <div className="flex justify-between text-[11px] text-[#586E84] font-mono font-bold mb-1.5">
            <span>{currentTime.toFixed(2)}s</span>
            <span className="text-[#81A6C6] tracking-wider uppercase text-[10px]">Playback Timeline</span>
            <span>{duration.toFixed(2)}s</span>
          </div>
          <div
            className="h-3 w-full bg-[#E5D9CC] rounded-full overflow-hidden cursor-pointer relative shadow-inner"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              if (audioRef.current) {
                audioRef.current.currentTime = pos * duration;
              }
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#81A6C6] to-[#AACDDC] transition-all duration-75 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#586E84] font-semibold pr-2">
          <Volume2 className="h-4 w-4 text-[#81A6C6]" />
          <span>Standard Waveform</span>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="space-y-6">
        {/* 1. Time-Domain Amplitude Waveform Visualization */}
        <div className="rounded-2xl bg-[#FAF6F0] border border-[#EADFD4] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-[#223344] uppercase tracking-wider flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#81A6C6]"></span>
              Time-Domain Amplitude Waveform (0.0s to 5.0s Window)
            </span>
            <span className="text-xs text-[#586E84] font-mono font-semibold">Normalized Amplitude [-1.0, +1.0]</span>
          </div>

          {/* Interactive Mirrored Amplitude Envelope Canvas */}
          <div className="relative bg-white border border-[#E5D9CC] rounded-xl p-4 shadow-sm">
            {/* Playhead Vertical Line Indicator */}
            <div
              className="absolute top-0 bottom-0 w-[2.5px] bg-[#5E88AC] z-10 pointer-events-none shadow-[0_0_8px_rgba(94,136,172,0.8)]"
              style={{ left: `${progressPercent}%` }}
            />

            {/* Amplitude Scale Bars */}
            <div className="h-32 w-full flex items-center justify-between gap-[2px]">
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
                          backgroundColor: isPassed ? '#5E88AC' : '#AACDDC',
                        }}
                      />
                      {/* Center Zero Line */}
                      <div className="w-full h-[1px] bg-[#E5D9CC] my-[1px]" />
                      {/* Bottom Mirror Bar */}
                      <div
                        className="w-full rounded-b-sm transition-all duration-75"
                        style={{
                          height: `${heightPercent / 2}%`,
                          backgroundColor: isPassed ? '#81A6C6' : '#D2C4B4',
                        }}
                      />
                    </div>
                  );
                })}
            </div>

            {/* Time Axis Labels */}
            <div className="flex justify-between text-[11px] text-[#586E84] font-mono font-bold pt-2.5 border-t border-[#F3E3D0] mt-1">
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
        <div className="rounded-2xl bg-[#FAF6F0] border border-[#EADFD4] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-[#223344] uppercase tracking-wider flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#AACDDC]"></span>
              2D Log-Mel Spectrogram (Time-Frequency Spectral Energy Density)
            </span>
            <span className="text-xs text-[#5E88AC] font-mono font-bold">128 Mel Bins &bull; 0 - 16,000 Hz</span>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#E5D9CC] bg-[#111827] shadow-sm">
            {spectrogram_image ? (
              <img
                src={spectrogram_image}
                alt="Log-Mel Spectrogram"
                className="w-full h-auto object-cover rounded-xl"
              />
            ) : (
              <div className="h-44 flex items-center justify-center text-xs text-[#586E84]">
                Spectrogram unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
