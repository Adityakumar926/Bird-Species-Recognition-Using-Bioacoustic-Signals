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
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#BBDEFB]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9]">
            <Waves className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0D47A1] m-0">
              Bioacoustic Waveform &amp; Amplitude Visualization
            </h3>
            <p className="text-xs text-[#42658A] m-0 font-medium">
              Time-domain sound pressure envelope and 128-band Log-Mel spectrogram
            </p>
          </div>
        </div>

        {/* Telemetry metadata tags with Color Hunt Palette */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#F5FAFF] border border-[#BBDEFB] text-[#42658A]">
            Sampling Rate: <strong className="text-[#2196F3] font-extrabold">{audio_metadata.target_sr.toLocaleString()} Hz</strong>
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#F5FAFF] border border-[#BBDEFB] text-[#42658A]">
            Duration: <strong className="text-[#0D47A1] font-extrabold">{audio_metadata.duration_seconds}s</strong>
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#F5FAFF] border border-[#BBDEFB] text-[#42658A]">
            Resolution: <strong className="text-[#2196F3] font-extrabold">128 &times; 313 Bins</strong>
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-[#2196F3]" />
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
      <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F5FAFF] border border-[#BBDEFB] mb-5">
        <button
          onClick={togglePlay}
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2196F3] to-[#0D47A1] hover:opacity-95 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-[#2196F3]/25 transition-transform active:scale-95 cursor-pointer border border-white/40"
          title={isPlaying ? 'Pause' : 'Play Audio'}
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>

        {/* Progress scrub bar */}
        <div className="flex-1">
          <div className="flex justify-between text-[11px] text-[#42658A] font-mono font-bold mb-1">
            <span>{currentTime.toFixed(2)}s</span>
            <span className="text-[#2196F3] tracking-wider uppercase text-[10px]">Playback Timeline</span>
            <span>{duration.toFixed(2)}s</span>
          </div>
          <div
            className="h-2.5 w-full bg-[#E3F2FD] rounded-full overflow-hidden cursor-pointer relative border border-[#BBDEFB]"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              if (audioRef.current) {
                audioRef.current.currentTime = pos * duration;
              }
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#90CAF9] via-[#2196F3] to-[#0D47A1] transition-all duration-75 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#42658A] font-semibold pr-1">
          <Volume2 className="h-4 w-4 text-[#2196F3]" />
          <span>Waveform</span>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="space-y-5">
        {/* 1. Time-Domain Amplitude Waveform Visualization */}
        <div className="rounded-2xl bg-[#F5FAFF] border border-[#BBDEFB] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold text-[#0D47A1] uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#2196F3]"></span>
              Time-Domain Amplitude Waveform (0.0s to 5.0s Window)
            </span>
            <span className="text-xs text-[#42658A] font-mono font-semibold">Normalized Amplitude [-1.0, +1.0]</span>
          </div>

          {/* Interactive Mirrored Amplitude Envelope Canvas */}
          <div className="relative bg-white border border-[#BBDEFB] rounded-xl p-3.5">
            {/* Playhead Vertical Line Indicator */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#2196F3] z-10 pointer-events-none shadow-[0_0_8px_rgba(33,150,243,0.9)]"
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
                          backgroundColor: isPassed ? '#2196F3' : '#90CAF9',
                        }}
                      />
                      {/* Center Zero Line */}
                      <div className="w-full h-[1px] bg-[#BBDEFB] my-[1px]" />
                      {/* Bottom Mirror Bar */}
                      <div
                        className="w-full rounded-b-sm transition-all duration-75"
                        style={{
                          height: `${heightPercent / 2}%`,
                          backgroundColor: isPassed ? '#0D47A1' : '#E3F2FD',
                        }}
                      />
                    </div>
                  );
                })}
            </div>

            {/* Time Axis Labels */}
            <div className="flex justify-between text-[11px] text-[#42658A] font-mono font-bold pt-2 border-t border-[#BBDEFB] mt-1">
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
        <div className="rounded-2xl bg-[#F5FAFF] border border-[#BBDEFB] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold text-[#0D47A1] uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#2196F3]"></span>
              2D Log-Mel Spectrogram (Time-Frequency Spectral Energy Density)
            </span>
            <span className="text-xs text-[#2196F3] font-mono font-bold">128 Mel Bins &bull; 0 - 16,000 Hz</span>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#BBDEFB] bg-[#0A192F]">
            {spectrogram_image ? (
              <img
                src={spectrogram_image}
                alt="Log-Mel Spectrogram"
                className="w-full h-auto object-cover rounded-xl"
              />
            ) : (
              <div className="h-44 flex items-center justify-center text-xs text-[#42658A]">
                Spectrogram unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
