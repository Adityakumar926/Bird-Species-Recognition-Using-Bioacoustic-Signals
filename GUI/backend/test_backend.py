import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import json
import numpy as np
from model import BANetPredictor
from audio_utils import (
    standardize_audio_signal,
    compute_mel_spectrogram,
    generate_waveform_peaks,
    render_spectrogram_image_base64,
    encode_audio_as_wav_base64
)

print("[Test] Testing BANetPredictor initialization...")
base_dir = os.path.dirname(os.path.abspath(__file__))
weights_path = os.path.join(os.path.dirname(os.path.dirname(base_dir)), "banet_best_weights.pth")
predictor = BANetPredictor(weights_path=weights_path, num_classes=264)

# Generate synthetic 3-second chirp
sr = 32000
t = np.linspace(0, 3.0, int(sr * 3.0), endpoint=False)
synthetic_audio = 0.5 * np.sin(2 * np.pi * 2500 * t)

print("[Test] Testing signal standardization...")
std_audio, target_sr = standardize_audio_signal(synthetic_audio, orig_sr=sr)
assert len(std_audio) == 160000, f"Expected 160000 samples, got {len(std_audio)}"

print("[Test] Testing mel spectrogram calculation...")
log_mel = compute_mel_spectrogram(std_audio, sr=target_sr)
assert log_mel.shape == (128, 313), f"Expected (128, 313), got {log_mel.shape}"

print("[Test] Testing model inference...")
preds = predictor.predict(log_mel, top_k=5)
print(f"[Test] Predictions: {preds}")

print("[Test] Testing waveform downsampling...")
peaks = generate_waveform_peaks(std_audio, num_points=120)
assert len(peaks) == 120

print("[Test] Testing spectrogram base64 rendering...")
b64_img = render_spectrogram_image_base64(log_mel, sr=target_sr)
assert b64_img.startswith("data:image/png;base64,")

print("[Test] Testing playable wav base64 encoding...")
b64_audio = encode_audio_as_wav_base64(std_audio, sr=target_sr)
assert b64_audio.startswith("data:audio/wav;base64,")

print("\nALL BACKEND TESTS PASSED SUCCESSFULLY!")
