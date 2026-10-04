# BioAcoustic AI - Real-Time Bird Species Recognition Web Application

A full-stack deep learning web application for bioacoustic bird vocalization identification, acoustic feature visualization, and geographic habitat mapping across **264 bird species** from the BirdCLEF benchmark dataset.

---

## Key Capabilities

1. **Universal Audio Ingestion**:
   - Supports standard formats: `.wav`, `.mp3`, `.ogg`, `.flac`, `.m4a`.
   - **Direct `.parquet` Support**: Drag-and-drop BirdCLEF dataset shards directly; the backend extracts audio byte streams on the fly.
2. **Real-Time Bioacoustic Visualizations**:
   - **Time-Domain Amplitude Waveform**: Downsampled peak visualization with audio scrub player.
   - **2D Log-Mel Spectrogram**: High-resolution 128-band frequency energy density plot ($0 - 16\text{ kHz}$ over $5.0\text{ s}$).
3. **Species Intelligence Card**:
   - Displays primary predicted **Common Name**, **Scientific Name**, and **Taxon Code**.
   - Displays prediction confidence percentage with animated gauges.
   - Provides ranked **Top-5 Candidate Species** with relative confidence distributions.
4. **Interactive Geographic Habitat Map**:
   - Displays natural **Latitude and Longitude** coordinates where the detected bird is recorded.
   - Renders an interactive Leaflet dark-mode map pinpointing the bio-region in East Africa / Kenya.

---

## Architecture Overview

```
project/
├── banet_best_weights.pth         # Trained BANet model checkpoint (22.95 MB)
├── GUI/
│   ├── run_app.bat                # One-click Windows launcher
│   ├── backend/
│   │   ├── server.py              # Flask REST API with native CORS
│   │   ├── model.py               # PyTorch BANet model & GPU predictor
│   │   ├── audio_utils.py         # Signal standardizer, Log-Mel generator, WAV encoder
│   │   └── species_db.json        # Database of 264 bird species & coordinates
│   └── frontend/
│       ├── src/
│       │   ├── App.jsx            # Main dashboard
│       │   └── components/
│       │       ├── Header.jsx     # System telemetry & GPU indicators
│       │       ├── FileUpload.jsx # Universal dropzone
│       │       ├── Visualizer.jsx # Waveform & Spectrogram canvas
│       │       ├── SpeciesIntelligence.jsx # Top-5 predictions
│       │       └── HabitatMap.jsx # Interactive Leaflet GPS map
```

---

## How to Launch the Web Application

### Method 1: One-Click Launcher (Recommended)
Double-click [`run_app.bat`](file:///C:/Users/Asus/Desktop/project/GUI/run_app.bat) inside the `GUI` folder.
It will automatically launch the backend, frontend, and open `http://localhost:5173` in your browser.

### Method 2: Manual Terminal Launch
1. **Start the Backend**:
   ```bash
   cd GUI\backend
   C:\Users\Asus\anaconda3\python.exe server.py
   ```
   *Runs at `http://127.0.0.1:5000` on NVIDIA CUDA GPU.*

2. **Start the Frontend**:
   ```bash
   cd GUI\frontend
   npm run dev
   ```
   *Runs at `http://localhost:5173`.*
