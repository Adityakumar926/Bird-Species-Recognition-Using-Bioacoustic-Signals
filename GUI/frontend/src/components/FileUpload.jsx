import React, { useState, useRef } from 'react';
import { UploadCloud, FileSpreadsheet, AlertCircle, CheckCircle2, Loader2, Music2, Feather } from 'lucide-react';

export default function FileUpload({ onUploadSuccess, isLoading, setIsLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndProcessFile = (file) => {
    if (!file) return;
    setErrorMsg(null);
    const ext = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['wav', 'mp3', 'ogg', 'flac', 'm4a', 'parquet'];

    if (!validExtensions.includes(ext)) {
      setErrorMsg(`Unsupported file type: .${ext}. Please upload a .wav, .mp3, .flac, .ogg, or .parquet file.`);
      return;
    }

    setSelectedFile(file);
    uploadFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file) => {
    setIsLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('audio_file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Server error status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        onUploadSuccess(data);
      } else {
        throw new Error(data.error || 'Failed to analyze bioacoustic signal');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setErrorMsg(err.message || 'Error connecting to the BANet inference backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const isParquet = selectedFile && selectedFile.name.toLowerCase().endsWith('.parquet');

  return (
    <div className="w-full">
      {/* Illustrative Upload Dropzone with Palette (8AD6D1, 359FA0, FFF0C5, FF8C52) */}
      <div
        className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-10 text-center cursor-pointer shadow-sm ${
          dragActive
            ? 'border-[#FF8C52] bg-[#FFF0C5]/45 scale-[1.01]'
            : 'border-[#E0D4B8] hover:border-[#359FA0] bg-white/95 hover:bg-[#FFFBF2]'
        } ${isLoading ? 'opacity-65 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".wav,.mp3,.ogg,.flac,.m4a,.parquet"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-center gap-3.5">
          {/* Illustrative Icon Badge */}
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-[#FFF0C5] to-[#8AD6D1]/40 border border-[#EEDBBA] flex items-center justify-center text-[#359FA0] shadow-sm transition-transform hover:scale-105">
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin text-[#FF8C52]" />
            ) : isParquet ? (
              <FileSpreadsheet className="h-8 w-8 text-[#FF8C52]" />
            ) : (
              <UploadCloud className="h-8 w-8 stroke-[2.2]" />
            )}
          </div>

          {/* Heading */}
          <div>
            <h3 className="text-lg font-bold text-[#163333] mb-1">
              {isLoading ? (
                'Analyzing Bioacoustic Signal with BANet...'
              ) : selectedFile ? (
                `Selected Recording: ${selectedFile.name}`
              ) : (
                'Drop Bioacoustic Audio or Dataset Shard'
              )}
            </h3>
            <p className="text-xs text-[#4B6B6C] max-w-md mx-auto">
              Select or drop any field sound recording to compute amplitude waveforms and species intelligence
            </p>
          </div>

          {/* Supported Format Badges using Palette */}
          <div className="flex items-center gap-2 flex-wrap justify-center mt-1">
            <span className="text-[11px] font-bold px-3 py-1 rounded-xl bg-[#FFF0C5]/80 border border-[#F3DEB0] text-[#7A4E24]">
              .WAV
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-xl bg-[#FFF0C5]/80 border border-[#F3DEB0] text-[#7A4E24]">
              .MP3
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-xl bg-[#FFF0C5]/80 border border-[#F3DEB0] text-[#7A4E24]">
              .OGG
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-xl bg-[#FFF0C5]/80 border border-[#F3DEB0] text-[#7A4E24]">
              .FLAC
            </span>
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-xl bg-[#8AD6D1]/30 border border-[#359FA0]/50 text-[#175253]">
              .PARQUET (BirdCLEF Shards)
            </span>
          </div>

          {/* Parquet Alert Badge */}
          {isParquet && !isLoading && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8AD6D1]/25 border border-[#359FA0]/40 text-[#185354] text-xs font-semibold shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-[#359FA0]" />
              <span>BirdCLEF Parquet File Detected &bull; Extracting embedded byte stream</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Message Box */}
      {errorMsg && (
        <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800 shadow-sm">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <span className="font-bold">Notice:</span> {errorMsg}
          </div>
        </div>
      )}
    </div>
  );
}
