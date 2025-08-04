// app/page.tsx
"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  UploadCloud,
  File,
  FileCheck2,
  AlertCircle,
  Download,
} from "lucide-react";

// Define the possible states of our component
type Status = "idle" | "file-selected" | "compressing" | "success" | "error";
type CompressionLevel = "recommended" | "extreme";

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [compressionLevel, setCompressionLevel] =
    useState<CompressionLevel>("recommended");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Invalid file type. Please upload a PDF.");
        setStatus("error");
        return;
      }
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setStatus("file-selected");
      setError(null);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleCompress = () => {
    if (!file) return;

    setStatus("compressing");

    // --- SIMULATED COMPRESSION ---
    // In a real app, you would send the file to a server/API endpoint here.
    setTimeout(() => {
      const reductionFactor = compressionLevel === "recommended" ? 0.4 : 0.75; // 40% or 75% reduction
      const newSize =
        file.size * (1 - reductionFactor) * (0.9 + Math.random() * 0.2); // Add some randomness
      setCompressedSize(Math.max(1000, Math.round(newSize))); // Ensure it's not zero
      setStatus("success");
    }, 2500); // Simulate a 2.5 second compression time
  };

  const handleReset = () => {
    setFile(null);
    setStatus("idle");
    setOriginalSize(0);
    setCompressedSize(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --- Render different UIs based on the current status ---

  const renderIdleState = () => (
    <div
      className="flex flex-col items-center justify-center w-full p-8 mb-6 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        PDF (MAX. 50MB)
      </p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="application/pdf"
      />
    </div>
  );

  const renderFileSelectedState = () => (
    <>
      <div className="flex items-center w-full p-4 mb-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
        <File className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
        <div className="truncate">
          <p className="text-sm font-medium truncate">{file?.name}</p>
          <p className="text-xs text-gray-500">
            {formatFileSize(originalSize)}
          </p>
        </div>
      </div>
      <Tabs
        value={compressionLevel}
        onValueChange={(v) => setCompressionLevel(v as CompressionLevel)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="extreme">Extreme</TabsTrigger>
        </TabsList>
        <TabsContent value="recommended" className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Balances file size and quality for the best results.
          </p>
          <Button
            size="lg"
            className="w-full font-bold"
            onClick={handleCompress}
          >
            Compress PDF
          </Button>
        </TabsContent>
        <TabsContent value="extreme" className="mt-4 text-center">
          <p className="text-sm text-red-600 dark:text-red-400/80 mb-4">
            Achieves the smallest size, but may reduce quality.
          </p>
          <Button
            size="lg"
            variant="destructive"
            className="w-full font-bold"
            onClick={handleCompress}
          >
            Compress PDF
          </Button>
        </TabsContent>
      </Tabs>
    </>
  );

  const renderCompressingState = () => (
    <div className="flex flex-col items-center justify-center w-full p-8">
      <p className="mb-4 text-lg font-medium">Compressing your PDF...</p>
      <Progress value={50} className="w-full animate-pulse" />
      <p className="text-sm text-gray-500 mt-2">Please wait a moment.</p>
    </div>
  );

  const renderSuccessState = () => (
    <div className="text-center">
      <FileCheck2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">Compression Complete!</h3>
      <div className="flex justify-around my-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">Original Size</p>
          <p className="text-lg font-semibold">
            {formatFileSize(originalSize)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-green-600 dark:text-green-400">New Size</p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            {formatFileSize(compressedSize)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Reduction</p>
          <p className="text-lg font-semibold">
            {(((originalSize - compressedSize) / originalSize) * 100).toFixed(
              0
            )}
            %
          </p>
        </div>
      </div>
      {/* In a real app, this URL.createObjectURL would point to the *actual* compressed file from the server */}
      <Button asChild size="lg" className="w-full mb-3 font-bold">
        <a href={file ? URL.createObjectURL(file) : "#"} download={file?.name}>
          <Download className="mr-2 h-5 w-5" />
          Download Compressed PDF
        </a>
      </Button>
      <Button variant="outline" className="w-full" onClick={handleReset}>
        Compress Another File
      </Button>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
        An Error Occurred
      </h3>
      <p className="text-red-600 dark:text-red-400/80 mb-6">{error}</p>
      <Button variant="destructive" className="w-full" onClick={handleReset}>
        Try Again
      </Button>
    </div>
  );

  const renderContent = () => {
    switch (status) {
      case "file-selected":
        return renderFileSelectedState();
      case "compressing":
        return renderCompressingState();
      case "success":
        return renderSuccessState();
      case "error":
        return renderErrorState();
      case "idle":
      default:
        return renderIdleState();
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight md:text-3xl">
              Compress PDF
            </CardTitle>
            <CardDescription className="text-md text-gray-500">
              Reduce file size while optimizing for maximum quality.
            </CardDescription>
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>
      </div>
    </main>
  );
}
