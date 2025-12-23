"use client";

import { useEffect, useRef, useState } from "react";
import * as ort from "onnxruntime-web";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { handlePredictions, processImage } from "@/lib/utils-onnx"; // Import fungsi helper

export default function FaceDetectionPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<ort.InferenceSession | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Load Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Set WASM path agar nextjs bisa serve file .wasm
        ort.env.wasm.wasmPaths =
          "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

        const session = await ort.InferenceSession.create(
          "/models/version-RFB-320.onnx",
          {
            executionProviders: ["wasm"], // Gunakan 'webgl' jika support
          }
        );
        setModel(session);
        setLoading(false);
      } catch (e) {
        console.error("Gagal load model:", e);
      }
    };
    loadModel();
  }, []);

  // 2. Setup Camera
  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current!.play();
          detectFrame(); // Mulai loop deteksi
        };
      }
    }
  };

  // 3. Inference Loop
  const detectFrame = async () => {
    if (!videoRef.current || !canvasRef.current || !model) return;

    if (videoRef.current.readyState === 4) {
      try {
        const tensor = await processImage(videoRef.current);
        if (tensor) {
          const feeds = { input: tensor };
          const results = await model.run(feeds);

          // --- UPDATE DISINI ---
          // Kirim hasil raw ke helper function untuk decoding & drawing
          handlePredictions(results, canvasRef.current);
        }
      } catch (error) {
        console.error("Detection Error:", error);
      }
    }
    requestAnimationFrame(detectFrame);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle>ONNX Face Detection</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative w-[640px] h-[480px] bg-black rounded-lg overflow-hidden">
            {loading && (
              <Skeleton className="w-full h-full absolute top-0 left-0" />
            )}

            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              muted
            />
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="absolute top-0 left-0 w-full h-full z-10"
            />
          </div>

          <div className="flex gap-4">
            <Button disabled={loading || !model} onClick={startCamera}>
              {loading ? "Loading Model..." : "Start Camera"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
