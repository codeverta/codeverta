// app/merge-pdf/page.tsx
"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  File,
  UploadCloud,
  FileCheck,
  Loader2,
  X,
  GripVertical,
} from "lucide-react";

// Tipe untuk file yang diunggah
interface UploadedFile {
  id: string;
  file: File;
}

export default function MergePdfPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk menangani pemilihan file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFiles = Array.from(event.target.files || []);
    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    if (pdfFiles.length !== selectedFiles.length) {
      setError("Hanya file PDF yang diizinkan. Beberapa file telah diabaikan.");
    }

    const newFiles: UploadedFile[] = pdfFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${file.size}`,
      file,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Fungsi untuk menangani akhir dari proses seret dan lepas
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFiles(items);
  };

  // Fungsi untuk menghapus file dari daftar
  const handleRemoveFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  // Fungsi inti untuk menggabungkan PDF
  const handleMergePDFs = async () => {
    if (files.length < 2) {
      setError("Silakan pilih minimal dua file PDF untuk digabungkan.");
      return;
    }

    setIsMerging(true);
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const uploadedFile of files) {
        const pdfBytes = await uploadedFile.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();

      // Membuat blob dan URL untuk diunduh
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Membuat link unduhan dan memicunya
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged-document.pdf";
      document.body.appendChild(link);
      link.click();

      // Membersihkan
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Reset state setelah berhasil
      setFiles([]);
    } catch (err) {
      console.error(err);
      setError(
        "Terjadi kesalahan saat menggabungkan PDF. Pastikan file tidak rusak atau terproteksi kata sandi."
      );
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Gabungkan PDF</CardTitle>
          <CardDescription className="text-md text-gray-600 mt-2">
            Gabungkan beberapa file PDF menjadi satu dokumen dengan mudah.
            Urutkan file sesuai keinginan Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {files.length === 0 ? (
            // Tampilan untuk upload file
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600">
                  Seret & lepas file di sini, atau klik untuk memilih file
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Hanya file PDF yang didukung
                </p>
                <Button asChild className="mt-4">
                  <span>Pilih File PDF</span>
                </Button>
              </label>
            </div>
          ) : (
            // Tampilan daftar file yang akan digabungkan
            <div>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="files">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2 mb-4"
                    >
                      {files.map(({ id, file }, index) => (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                            >
                              <GripVertical className="h-5 w-5 text-gray-500 mr-3" />
                              <File className="h-6 w-6 text-blue-500 mr-4 flex-shrink-0" />
                              <div className="flex-grow">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveFile(id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("file-upload-more")?.click()
                  }
                >
                  Tambah File
                </Button>
                <input
                  type="file"
                  id="file-upload-more"
                  multiple
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  onClick={handleMergePDFs}
                  disabled={isMerging}
                  className="w-48"
                >
                  {isMerging ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileCheck className="mr-2 h-4 w-4" />
                  )}
                  {isMerging ? "Menggabungkan..." : "Gabungkan PDF"}
                </Button>
              </div>
            </div>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
