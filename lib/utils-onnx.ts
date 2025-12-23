import * as ort from "onnxruntime-web";

// KONFIGURASI SESUAI MODEL
const INPUT_WIDTH = 320;
const INPUT_HEIGHT = 240;
const CONF_THRESHOLD = 0.5; // Minimal akurasi 50%
const IOU_THRESHOLD = 0.25; // Untuk membuang kotak tumpang tindih

// Variance dari model UltraFace (standar)
const VARIANCE = [0.1, 0.2];

// 1. Pre-processing: Konversi Video ke Tensor
export async function processImage(video: HTMLVideoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = INPUT_WIDTH;
  canvas.height = INPUT_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(video, 0, 0, INPUT_WIDTH, INPUT_HEIGHT);
  const imageData = ctx.getImageData(0, 0, INPUT_WIDTH, INPUT_HEIGHT);
  const { data } = imageData;

  const float32Data = new Float32Array(3 * INPUT_WIDTH * INPUT_HEIGHT);
  for (let i = 0; i < INPUT_WIDTH * INPUT_HEIGHT; i++) {
    float32Data[i] = (data[i * 4] - 127) / 128; // R
    float32Data[INPUT_WIDTH * INPUT_HEIGHT + i] = (data[i * 4 + 1] - 127) / 128; // G
    float32Data[2 * INPUT_WIDTH * INPUT_HEIGHT + i] =
      (data[i * 4 + 2] - 127) / 128; // B
  }

  return new ort.Tensor("float32", float32Data, [
    1,
    3,
    INPUT_HEIGHT,
    INPUT_WIDTH,
  ]);
}

// 2. Generator Anchors (Priors) - Dihitung sekali saja
// Ini peta referensi untuk model mendeteksi ukuran wajah
const generateAnchors = (width: number, height: number) => {
  const strides = [8, 16, 32, 64];
  const min_sizes = [
    [10, 16, 24],
    [32, 48],
    [64, 96],
    [128, 192, 256],
  ];
  const anchors = [];

  for (let i = 0; i < strides.length; i++) {
    const stride = strides[i];
    const featureW = Math.ceil(width / stride);
    const featureH = Math.ceil(height / stride);

    for (let y = 0; y < featureH; y++) {
      for (let x = 0; x < featureW; x++) {
        for (let min_size of min_sizes[i]) {
          const s_kx = min_size / width;
          const s_ky = min_size / height;
          const cx = ((x + 0.5) * stride) / width;
          const cy = ((y + 0.5) * stride) / height;
          anchors.push([cx, cy, s_kx, s_ky]);
        }
      }
    }
  }
  return anchors;
};

// Cache anchors agar tidak generate ulang tiap frame
const anchors = generateAnchors(INPUT_WIDTH, INPUT_HEIGHT);

// 3. Post-Processing Utama
export function handlePredictions(
  results: ort.InferenceSession.OnnxValueMapType,
  canvas: HTMLCanvasElement
) {
  const scores = results.scores.data as Float32Array; // Output Confidences
  const boxes = results.boxes.data as Float32Array; // Output Raw Box Offsets

  // Format output UltraFace biasanya [Batch, N, 2] untuk scores
  // Kita ambil index confidence "wajah" (biasanya index ke-1 dari pasangan [background, face])
  const numAnchors = anchors.length;
  const detectedBoxes = [];

  for (let i = 0; i < numAnchors; i++) {
    const score = scores[i * 2 + 1]; // Ambil probability 'Face'
    if (score > CONF_THRESHOLD) {
      // DECODING MATH: Mengubah offset menjadi koordinat x,y
      const boxIdx = i * 4;
      const prior = anchors[i]; // [cx, cy, w, h]

      // Raw offsets
      const dx = boxes[boxIdx];
      const dy = boxes[boxIdx + 1];
      const dw = boxes[boxIdx + 2];
      const dh = boxes[boxIdx + 3];

      // Apply formula UltraFace
      const cx = prior[0] + dx * VARIANCE[0] * prior[2];
      const cy = prior[1] + dy * VARIANCE[0] * prior[3];
      const w = prior[2] * Math.exp(dw * VARIANCE[1]);
      const h = prior[3] * Math.exp(dh * VARIANCE[1]);

      // Convert center-wh to x1,y1,x2,y2
      const x1 = cx - w / 2;
      const y1 = cy - h / 2;
      const x2 = cx + w / 2;
      const y2 = cy + h / 2;

      detectedBoxes.push([x1, y1, x2, y2, score]);
    }
  }

  // NMS (Non-Maximum Suppression) - Hapus kotak duplikat
  const finalBoxes = nms(detectedBoxes);

  // Gambar ke Canvas
  drawBoxes(canvas, finalBoxes);
}

// 4. Helper: NMS (Sederhana)
function nms(boxes: number[][]) {
  if (boxes.length === 0) return [];

  // Urutkan berdasarkan score tertinggi
  boxes.sort((a, b) => b[4] - a[4]);

  const selected = [];
  while (boxes.length > 0) {
    const best = boxes.shift()!;
    selected.push(best);

    // Filter sisa kotak yg overlap terlalu banyak dengan 'best'
    for (let i = boxes.length - 1; i >= 0; i--) {
      if (iou(best, boxes[i]) > IOU_THRESHOLD) {
        boxes.splice(i, 1);
      }
    }
  }
  return selected;
}

// 5. Helper: IoU (Intersection over Union)
function iou(boxA: number[], boxB: number[]) {
  const xA = Math.max(boxA[0], boxB[0]);
  const yA = Math.max(boxA[1], boxB[1]);
  const xB = Math.min(boxA[2], boxB[2]);
  const yB = Math.min(boxA[3], boxB[3]);

  const interArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
  const boxAArea = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1]);
  const boxBArea = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1]);

  return interArea / (boxAArea + boxBArea - interArea);
}

// 6. Draw Function
function drawBoxes(canvas: HTMLCanvasElement, boxes: number[][]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan frame sebelumnya

  const w = canvas.width;
  const h = canvas.height;

  boxes.forEach((box) => {
    const [x1, y1, x2, y2, score] = box;

    // Scale 0-1 coordinate ke ukuran canvas sebenarnya
    const _x = x1 * w;
    const _y = y1 * h;
    const _w = (x2 - x1) * w;
    const _h = (y2 - y1) * h;

    // Gambar Kotak
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 3;
    ctx.strokeRect(_x, _y, _w, _h);

    // Gambar Text Score
    ctx.fillStyle = "#00FF00";
    ctx.font = "16px Arial";
    ctx.fillText(`Face: ${Math.round(score * 100)}%`, _x, _y - 5);
  });
}
