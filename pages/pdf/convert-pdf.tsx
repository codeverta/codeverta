// File: components/pdf-converter.tsx

"use client";

import { useState, useRef, DragEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";

export default function PdfConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [conversionProgress, setConversionProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError(null);
      setIsSuccess(false);
    } else if (file) {
      setError("Invalid file type. Please select a PDF file.");
      setSelectedFile(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] || null;
    handleFileSelect(file);
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setIsSuccess(false);
    setError(null);
    setConversionProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setConversionProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval); // Stop simulating progress

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Conversion failed.");
      }

      setConversionProgress(100);
      setIsSuccess(true);

      // Trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      const contentDisposition = response.headers.get("content-disposition");
      let fileName = "converted.docx"; // Default filename
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch && fileNameMatch.length > 1) {
          fileName = fileNameMatch[1];
        }
      }
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message);
      setIsSuccess(false);
    } finally {
      setIsConverting(false);
      setSelectedFile(null); // Clear file after attempt
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          📄 PDF to Word Converter
        </CardTitle>
        <CardDescription className="text-center">
          Easily convert your PDF files into easy to edit DOC and DOCX
          documents.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold text-primary">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-gray-500">PDF only, max 10MB</p>
        </div>

        {selectedFile && !isConverting && (
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium truncate max-w-[250px]">
                {selectedFile.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedFile(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {isConverting && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">
              Converting your file...
            </p>
            <Progress value={conversionProgress} className="w-full" />
          </div>
        )}

        {isSuccess && (
          <Alert
            variant="default"
            className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
          >
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800 dark:text-green-300">
              Conversion Successful!
            </AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Your DOCX file has started downloading.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Conversion Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleConvert}
          disabled={!selectedFile || isConverting}
          className="w-full font-semibold"
        >
          {isConverting ? "Converting..." : "Convert to Word"}
        </Button>
      </CardFooter>
    </Card>
  );
}
