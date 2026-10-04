@echo off
title BioAcoustic AI - Bird Species Recognition System
color 0A

echo =====================================================================
echo           BioAcoustic AI - Real-Time Bird Species System
echo               PyTorch BANet + React + Leaflet Map
echo =====================================================================
echo.

cd /d "%~dp0"

echo [1/3] Starting Python BANet Inference Backend (Port 5000)...
start "BioAcoustic AI Backend" cmd /k "C:\Users\Asus\anaconda3\python.exe backend\server.py"

echo [2/3] Waiting 4 seconds for model weights to load into GPU memory...
timeout /t 4 /nobreak >nul

echo [3/3] Starting React Vite Frontend Dashboard (Port 5173)...
cd frontend
start "BioAcoustic AI Frontend" cmd /k "npm run dev"

echo.
echo =====================================================================
echo Application started successfully!
echo Opening dashboard in your browser: http://localhost:5173
echo =====================================================================
timeout /t 2 /nobreak >nul
start http://localhost:5173

pause
