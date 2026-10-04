import os
import sys
import json
import time
from flask import Flask, request, jsonify

# Local modules
from model import BANetPredictor
from audio_utils import (
    extract_audio_from_bytes,
    standardize_audio_signal,
    compute_mel_spectrogram,
    generate_waveform_peaks,
    render_spectrogram_image_base64,
    encode_audio_as_wav_base64
)

app = Flask(__name__)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(os.path.dirname(BASE_DIR))
WEIGHTS_PATH = os.path.join(PROJECT_DIR, "banet_best_weights.pth")
SPECIES_DB_PATH = os.path.join(BASE_DIR, "species_db.json")

# Load Species Database
species_db = {}
if os.path.exists(SPECIES_DB_PATH):
    with open(SPECIES_DB_PATH, "r", encoding="utf-8") as f:
        species_db = json.load(f)
    print(f"[Server] Loaded {len(species_db)} species from database.")
else:
    print(f"[Server] WARNING: Species DB not found at '{SPECIES_DB_PATH}'")

# Load BANet PyTorch Model in GPU Memory
print(f"[Server] Loading BANet model from '{WEIGHTS_PATH}'...")
predictor = BANetPredictor(weights_path=WEIGHTS_PATH, num_classes=len(species_db) if species_db else 264)
print("[Server] Model ready for real-time inference!")


# Enable CORS natively on all routes
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


@app.route("/api/health", methods=["GET", "OPTIONS"])
def health_check():
    if request.method == "OPTIONS":
        return "", 200
        
    return jsonify({
        "status": "online",
        "model_name": "BioAcoustic Attention Network (BANet)",
        "backbone": "Pre-trained EfficientNet-B0 + BioAcoustic Attention",
        "parameters": "5,660,134",
        "target_species": len(species_db),
        "device": str(predictor.device).upper(),
        "gpu_available": predictor.device.type == "cuda"
    })


@app.route("/api/species", methods=["GET", "OPTIONS"])
def get_all_species():
    if request.method == "OPTIONS":
        return "", 200
        
    return jsonify(list(species_db.values()))


@app.route("/api/predict", methods=["POST", "OPTIONS"])
def predict_audio():
    if request.method == "OPTIONS":
        return "", 200

    if "audio_file" not in request.files:
        return jsonify({"error": "No audio_file attached in request"}), 400

    file = request.files["audio_file"]
    filename = file.filename or "audio.wav"
    file_bytes = file.read()

    if not file_bytes:
        return jsonify({"error": "Uploaded file is empty"}), 400

    start_time = time.time()

    try:
        # 1. Decode Audio (handles .parquet, .wav, .mp3, .ogg, .flac, etc.)
        audio_array, orig_sr = extract_audio_from_bytes(file_bytes, filename=filename)

        # 2. Standardize Signal (32 kHz, 5.0s, peak normalized)
        std_audio, target_sr = standardize_audio_signal(audio_array, orig_sr=orig_sr, target_sr=32000, duration=5.0)

        # 3. Compute 128-band Log-Mel Spectrogram
        log_mel = compute_mel_spectrogram(std_audio, sr=target_sr, n_mels=128)

        # 4. Run PyTorch GPU Inference
        top_preds = predictor.predict(log_mel, top_k=5)

        # 5. Enrich Predictions with Species Intelligence & Geographic Coordinates
        enriched_predictions = []
        for rank, p in enumerate(top_preds, start=1):
            class_id_str = str(p["class_id"])
            meta = species_db.get(class_id_str, {
                "common_name": f"Species #{class_id_str}",
                "scientific_name": "Aves indet.",
                "primary_label": class_id_str,
                "latitude": 0.0,
                "longitude": 37.0
            })

            enriched_predictions.append({
                "rank": rank,
                "class_id": p["class_id"],
                "species_code": meta.get("primary_label", ""),
                "common_name": meta.get("common_name", ""),
                "scientific_name": meta.get("scientific_name", ""),
                "confidence": p["confidence"],
                "latitude": meta.get("latitude", 0.0),
                "longitude": meta.get("longitude", 37.0),
                "sample_count": meta.get("sample_count", 0)
            })

        # 6. Generate Visual Assets
        waveform_peaks = generate_waveform_peaks(std_audio, num_points=120)
        spectrogram_b64 = render_spectrogram_image_base64(log_mel, sr=target_sr)
        playable_audio_b64 = encode_audio_as_wav_base64(std_audio, sr=target_sr)

        inference_time_ms = round((time.time() - start_time) * 1000, 1)

        return jsonify({
            "success": True,
            "filename": filename,
            "inference_time_ms": inference_time_ms,
            "audio_metadata": {
                "original_sr": int(orig_sr),
                "target_sr": target_sr,
                "duration_seconds": 5.0,
                "channels": 1,
                "spectrogram_shape": list(log_mel.shape)
            },
            "predictions": enriched_predictions,
            "waveform_peaks": waveform_peaks,
            "spectrogram_image": spectrogram_b64,
            "playable_audio": playable_audio_b64
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Audio processing error: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"\n=================================================================")
    print(f"  BANet BioAcoustic AI Server listening on http://127.0.0.1:{port}")
    print(f"=================================================================\n")
    app.run(host="0.0.0.0", port=port, debug=False)
