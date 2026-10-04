import io
import base64
import numpy as np
import soundfile as sf
import librosa
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pyarrow.parquet as pq

def extract_audio_from_bytes(file_bytes, filename="audio.wav"):
    """
    Decodes audio from diverse file formats, including .parquet, .wav, .mp3, .ogg, .flac, etc.
    Returns: audio_array (np.ndarray), original_sr (int)
    """
    lower_name = filename.lower()
    
    # 1. Special Handling for .parquet Dataset files
    if lower_name.endswith('.parquet'):
        try:
            reader = pa_buffer = io.BytesIO(file_bytes)
            table = pq.read_table(reader)
            if 'audio' in table.column_names:
                audio_col = table['audio']
                first_row = audio_col[0].as_py()
                if isinstance(first_row, dict) and 'bytes' in first_row:
                    raw_bytes = first_row['bytes']
                    return sf.read(io.BytesIO(raw_bytes))
                elif isinstance(first_row, bytes):
                    return sf.read(io.BytesIO(first_row))
            raise ValueError("Parquet file does not contain an 'audio' column with bytes.")
        except Exception as e:
            raise RuntimeError(f"Failed to extract audio from parquet: {str(e)}")
            
    # 2. Standard Audio Formats (.wav, .mp3, .ogg, .flac, .m4a)
    try:
        data, sr = sf.read(io.BytesIO(file_bytes))
        return data, sr
    except Exception:
        # Fallback to librosa if soundfile fails on mp3/compressed
        data, sr = librosa.load(io.BytesIO(file_bytes), sr=None, mono=False)
        if data.ndim > 1:
            data = data.T  # Match soundfile shape (N, channels)
        return data, sr


def standardize_audio_signal(audio_array, orig_sr, target_sr=32000, duration=5.0):
    """
    Standardizes audio to 32 kHz, mono, 5.0 seconds (160,000 samples) with peak normalization.
    """
    # 1. Convert to mono if multi-channel
    if audio_array.ndim > 1:
        audio_array = np.mean(audio_array, axis=1)
        
    audio_array = audio_array.astype(np.float32)
    
    # 2. Resample to target_sr if necessary
    if orig_sr != target_sr:
        audio_array = librosa.resample(audio_array, orig_sr=orig_sr, target_sr=target_sr)
        
    # 3. Fixed duration window (5.0s = 160,000 samples)
    target_len = int(target_sr * duration)
    cur_len = len(audio_array)
    
    if cur_len < target_len:
        pad_width = target_len - cur_len
        audio_array = np.pad(audio_array, (0, pad_width), mode='constant')
    elif cur_len > target_len:
        start = (cur_len - target_len) // 2
        audio_array = audio_array[start:start + target_len]
        
    # 4. Peak Amplitude Normalization
    max_val = np.max(np.abs(audio_array))
    if max_val > 0:
        audio_array = audio_array / max_val
        
    return audio_array, target_sr


def compute_mel_spectrogram(audio_array, sr=32000, n_mels=128, n_fft=2048, hop_length=512):
    """
    Extracts 128-band Log-Mel Spectrogram. Shape: (128, 313).
    """
    mel_spec = librosa.feature.melspectrogram(
        y=audio_array,
        sr=sr,
        n_fft=n_fft,
        hop_length=hop_length,
        n_mels=n_mels,
        fmin=50,
        fmax=sr // 2,
        power=2.0
    )
    log_mel = librosa.power_to_db(mel_spec, ref=np.max)
    return log_mel


def generate_waveform_peaks(audio_array, num_points=120):
    """
    Generates downsampled amplitude values for real-time frontend canvas waveform rendering.
    """
    chunk_size = len(audio_array) // num_points
    peaks = []
    for i in range(num_points):
        chunk = audio_array[i * chunk_size : (i + 1) * chunk_size]
        if len(chunk) > 0:
            peaks.append(round(float(np.max(np.abs(chunk))), 3))
        else:
            peaks.append(0.0)
    return peaks


def render_spectrogram_image_base64(log_mel, sr=32000, hop_length=512):
    """
    Renders high-res bioacoustic spectrogram visualization with dark theme and returns Base64 data URL.
    """
    fig, ax = plt.subplots(figsize=(10, 3.5), dpi=120)
    fig.patch.set_facecolor('#0F172A')
    ax.set_facecolor('#0F172A')
    
    img = librosa.display.specshow(
        log_mel,
        sr=sr,
        hop_length=hop_length,
        x_axis='time',
        y_axis='mel',
        fmin=50,
        fmax=sr // 2,
        cmap='magma',
        ax=ax
    )
    
    ax.set_title('Log-Mel Spectrogram (BioAcoustic Energy Distribution)', color='#38BDF8', fontsize=12, fontweight='bold', pad=10)
    ax.set_xlabel('Time (seconds)', color='#94A3B8', fontsize=10)
    ax.set_ylabel('Frequency (Hz)', color='#94A3B8', fontsize=10)
    ax.tick_params(colors='#94A3B8', labelsize=8)
    for spine in ax.spines.values():
        spine.set_color('#334155')
        
    cbar = fig.colorbar(img, ax=ax, format='%+2.0f dB')
    cbar.ax.yaxis.set_tick_params(color='#94A3B8')
    plt.setp(plt.getp(cbar.ax.axes, 'yticklabels'), color='#94A3B8')
    cbar.outline.set_edgecolor('#334155')
    
    plt.tight_layout()
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close(fig)
    buf.seek(0)
    
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    return f"data:image/png;base64,{encoded}"


def encode_audio_as_wav_base64(audio_array, sr=32000):
    """
    Encodes float audio into a playable 16-bit PCM WAV base64 string for HTML5 browser audio playback.
    """
    pcm_audio = np.int16(audio_array * 32767)
    buf = io.BytesIO()
    sf.write(buf, pcm_audio, sr, format='WAV', subtype='PCM_16')
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    return f"data:audio/wav;base64,{encoded}"
