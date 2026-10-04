import io
import json
import urllib.request
import soundfile as sf
import numpy as np

sr = 32000
t = np.linspace(0, 3.0, int(sr * 3.0), endpoint=False)
audio = 0.5 * np.sin(2 * np.pi * 3000 * t)
buf = io.BytesIO()
sf.write(buf, audio, sr, format='WAV')
buf.seek(0)
audio_bytes = buf.read()

boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
body = bytearray()
body.extend(f'--{boundary}\r\n'.encode('utf-8'))
body.extend(b'Content-Disposition: form-data; name="audio_file"; filename="test_bird.wav"\r\n')
body.extend(b'Content-Type: audio/wav\r\n\r\n')
body.extend(audio_bytes)
body.extend(f'\r\n--{boundary}--\r\n'.encode('utf-8'))

req = urllib.request.Request(
    'http://127.0.0.1:5000/api/predict',
    data=bytes(body),
    headers={'Content-Type': f'multipart/form-data; boundary={boundary}'}
)

res = urllib.request.urlopen(req)
data = json.loads(res.read().decode('utf-8'))
print('Success:', data['success'])
print('Inference Time (ms):', data['inference_time_ms'])
print('Top Match Common Name:', data['predictions'][0]['common_name'])
print('Top Match Scientific Name:', data['predictions'][0]['scientific_name'])
print('Top Match Latitude/Longitude:', data['predictions'][0]['latitude'], data['predictions'][0]['longitude'])
print('Waveform Peaks Count:', len(data['waveform_peaks']))
print('Spectrogram Data URL Length:', len(data['spectrogram_image']))
