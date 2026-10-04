import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.models as models

class ChannelAttention(nn.Module):
    """
    Frequency Channel Attention: Dynamically recalibrates frequency/feature channels.
    Highlights vocal energy bands and suppresses background rumble.
    """
    def __init__(self, in_planes, ratio=16):
        super().__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.max_pool = nn.AdaptiveMaxPool2d(1)
        self.fc = nn.Sequential(
            nn.Conv2d(in_planes, max(in_planes // ratio, 16), 1, bias=False),
            nn.ReLU(inplace=True),
            nn.Conv2d(max(in_planes // ratio, 16), in_planes, 1, bias=False)
        )
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = self.fc(self.avg_pool(x))
        max_out = self.fc(self.max_pool(x))
        scale = self.sigmoid(avg_out + max_out)
        return x * scale


class TemporalSpatialAttention(nn.Module):
    """
    Temporal-Spatial Attention: Focuses on vocalization burst time frames, ignoring background silence.
    """
    def __init__(self):
        super().__init__()
        self.conv = nn.Conv2d(2, 1, kernel_size=7, padding=3, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = torch.mean(x, dim=1, keepdim=True)
        max_out, _ = torch.max(x, dim=1, keepdim=True)
        scale = self.sigmoid(self.conv(torch.cat([avg_out, max_out], dim=1)))
        return x * scale


class BANet(nn.Module):
    """
    BioAcoustic Attention Network (BANet) with Pre-trained EfficientNet-B0 Backbone.
    """
    def __init__(self, num_classes=264, pretrained=False):
        super().__init__()
        
        # 1. EfficientNet-B0 Backbone
        base_model = models.efficientnet_b0(weights=None)
        self.features = base_model.features  # 1280 channels
        
        # 2. BioAcoustic Attention Modules
        self.channel_att = ChannelAttention(1280, ratio=16)
        self.temporal_att = TemporalSpatialAttention()
        
        # 3. Dual Pooling (GAP + GMP)
        self.gap = nn.AdaptiveAvgPool2d(1)
        self.gmp = nn.AdaptiveMaxPool2d(1)
        
        # 4. Multi-Class Classification Head (2560-dim -> 264 classes)
        self.classifier = nn.Sequential(
            nn.Dropout(p=0.3, inplace=True),
            nn.Linear(1280 * 2, 512),
            nn.BatchNorm1d(512),
            nn.SiLU(inplace=True),
            nn.Dropout(p=0.2, inplace=True),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        if x.size(1) == 1:
            x = x.repeat(1, 3, 1, 1)
            
        feat = self.features(x)
        feat = self.channel_att(feat)
        feat = self.temporal_att(feat)
        
        avg_pool = self.gap(feat).flatten(1)
        max_pool = self.gmp(feat).flatten(1)
        fused = torch.cat([avg_pool, max_pool], dim=1)
        
        return self.classifier(fused)


class BANetPredictor:
    def __init__(self, weights_path, num_classes=264):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"[BANetPredictor] Initializing on device: {self.device}")
        
        self.model = BANet(num_classes=num_classes, pretrained=False).to(self.device)
        
        if os.path.exists(weights_path):
            state_dict = torch.load(weights_path, map_location=self.device)
            self.model.load_state_dict(state_dict)
            print(f"[BANetPredictor] Successfully loaded weights from '{weights_path}'")
        else:
            print(f"[BANetPredictor] WARNING: Weights file not found at '{weights_path}'")
            
        self.model.eval()

    def predict(self, spec_numpy, top_k=5):
        """
        Runs inference on a numpy log-mel spectrogram (128, 313) and returns top-k predictions.
        """
        spec_tensor = torch.tensor(spec_numpy, dtype=torch.float32).unsqueeze(0).unsqueeze(0).to(self.device)
        
        with torch.no_grad():
            if self.device.type == "cuda":
                with torch.amp.autocast("cuda"):
                    logits = self.model(spec_tensor)
            else:
                logits = self.model(spec_tensor)
                
            probs = F.softmax(logits, dim=1).squeeze(0)
            
        top_probs, top_indices = torch.topk(probs, k=min(top_k, probs.size(0)))
        
        results = []
        for p, idx in zip(top_probs, top_indices):
            results.append({
                "class_id": int(idx.item()),
                "confidence": round(float(p.item()) * 100.0, 2)
            })
            
        return results
