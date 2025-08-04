// app/components/PdfSplitter.tsx
"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjs from "pdfjs-dist";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { parsePageRanges } from "@/lib/utils";

// Shadcn UI & Icons
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  FileUp,
  FileDown,
  Scissors,
  Plus,
  Trash2,
  Loader2,
  Package,
} from "lucide-react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Define types for our state
type SplitGroup = {
  id: number;
  range: string;
  name: string;
};

type PagePreview = {
  id: number;
  dataUrl: string;
};

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pagePreviews, setPagePreviews] = useState<PagePreview[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  // ✨ 1. The state that holds the array of groups.
  const [groups, setGroups] = useState<SplitGroup[]>([
    { id: 1, range: "", name: "document_part_1.pdf" },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPagePreviews([]);
    setNumPages(0);
    setIsProcessing(true);
    toast.info("Processing PDF...", {
      description: "Generating page previews.",
    });

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      setNumPages(pdf.numPages);

      const previews: PagePreview[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          previews.push({ id: i, dataUrl: canvas.toDataURL() });
        }
      }
      setPagePreviews(previews);
      toast.success("PDF processed successfully!", {
        description: `Found ${pdf.numPages} pages. You can now define your split ranges.`,
      });
    } catch (error) {
      console.error("Failed to process PDF:", error);
      toast.error("Failed to process PDF.", {
        description: "The file might be corrupted or invalid.",
      });
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGroupChange = (
    id: number,
    field: "range" | "name",
    value: string
  ) => {
    setGroups(groups.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  // ✨ 2. The function that adds a new group to the state.
  const addGroup = () => {
    const newId = (groups.at(-1)?.id || 0) + 1;
    setGroups([
      ...groups,
      { id: newId, range: "", name: `document_part_${newId}.pdf` },
    ]);
  };

  const removeGroup = (id: number) => {
    if (groups.length > 1) {
      setGroups(groups.filter((g) => g.id !== id));
    } else {
      toast.warning("You must have at least one split group.");
    }
  };

  const handleSplitPdf = async () => {
    if (!file || groups.some((g) => !g.range || !g.name)) {
      toast.error("Invalid input.", {
        description:
          "Please upload a file and ensure all groups have a page range and a filename.",
      });
      return;
    }

    setIsSplitting(true);
    toast.info("Splitting PDF...", { description: "This may take a moment." });

    try {
      const sourcePdfBytes = await file.arrayBuffer();
      const sourcePdfDoc = await PDFDocument.load(sourcePdfBytes);
      const outputPdfs: { name: string; bytes: Uint8Array }[] = [];

      for (const group of groups) {
        const pageIndexes = parsePageRanges(group.range, numPages).map(
          (p) => p - 1
        );

        if (pageIndexes.length === 0) {
          toast.warning(`Skipping group for "${group.name}"`, {
            description: `No valid pages found for range: ${group.range}`,
          });
          continue;
        }

        const newPdfDoc = await PDFDocument.create();
        const copiedPages = await newPdfDoc.copyPages(
          sourcePdfDoc,
          pageIndexes
        );
        copiedPages.forEach((page) => newPdfDoc.addPage(page));
        const pdfBytes = await newPdfDoc.save();
        outputPdfs.push({ name: group.name, bytes: pdfBytes });
      }

      if (outputPdfs.length === 0) {
        toast.error("No PDFs were created.", {
          description: "Please check your page ranges and try again.",
        });
        setIsSplitting(false);
        return;
      }

      if (outputPdfs.length === 1) {
        const { name, bytes } = outputPdfs[0];
        const blob = new Blob([bytes], { type: "application/pdf" });
        saveAs(blob, name);
      } else {
        const zip = new JSZip();
        outputPdfs.forEach(({ name, bytes }) => zip.file(name, bytes));
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "split_pdfs.zip");
      }
      toast.success("PDFs split and downloaded successfully!");
    } catch (error) {
      console.error("Failed to split PDF:", error);
      toast.error("An error occurred during splitting.");
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Toaster richColors />
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">PDF Splitter</h1>
        <p className="text-muted-foreground mt-2">
          Separate your PDF pages into multiple files with custom ranges.
        </p>
      </header>

      <main className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="w-5 h-5" /> Step 1: Upload PDF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center w-full">
              <Label
                htmlFor="pdf-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Package className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  {file && (
                    <p className="text-xs text-foreground">{file.name}</p>
                  )}
                </div>
                <Input
                  id="pdf-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </Label>
            </div>
            {isProcessing && (
              <div className="flex items-center justify-center mt-4">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Processing PDF... Please wait.
              </div>
            )}
          </CardContent>
        </Card>

        {file && !isProcessing && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scissors className="w-5 h-5" /> Step 2: Define Splits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* ✨ 3. The UI loops over the 'groups' state to display a card for each one. */}
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className="p-3 border rounded-lg space-y-2 relative"
                    >
                      <div className="space-y-1">
                        <Label htmlFor={`range-${group.id}`}>Page Range</Label>
                        <Input
                          id={`range-${group.id}`}
                          placeholder="e.g., 1-3, 5, 8-10"
                          value={group.range}
                          onChange={(e) =>
                            handleGroupChange(group.id, "range", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`name-${group.id}`}>
                          Output Filename
                        </Label>
                        <Input
                          id={`name-${group.id}`}
                          placeholder="output.pdf"
                          value={group.name}
                          onChange={(e) =>
                            handleGroupChange(group.id, "name", e.target.value)
                          }
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-7 w-7"
                        onClick={() => removeGroup(group.id)}
                        disabled={groups.length <= 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {/* ✨ 4. The button calls the 'addGroup' function when clicked. */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={addGroup}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Split Group
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Page Preview ({numPages} pages)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {pagePreviews.map((p) => (
                    <div
                      key={p.id}
                      className="relative border rounded-md overflow-hidden"
                    >
                      <img
                        src={p.dataUrl}
                        alt={`Page ${p.id}`}
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded-tl-md">
                        {p.id}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {file && !isProcessing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="w-5 h-5" /> Step 3: Split & Download
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="w-full"
                onClick={handleSplitPdf}
                disabled={isSplitting}
              >
                {isSplitting ? (
                  <Loader2 className="w-5 h-f animate-spin mr-2" />
                ) : (
                  <Scissors className="w-5 h-5 mr-2" />
                )}
                Split PDF
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
