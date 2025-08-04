// app/page.tsx
"use client";

import { useState } from "react";
import {
  Combine,
  Split,
  Minimize2,
  FileText,
  FileSpreadsheet,
  FileImage,
  PenSquare,
  RotateCw,
  Unlock,
  Lock,
  Archive,
  Wrench,
  ScanLine,
  FileStack,
  Edit,
  Droplets,
  Globe,
  FolderKanban,
  Hash,
  ScanSearch,
  Columns,
  Paintbrush,
  Crop,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Asumsi path komponen shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Asumsi path komponen shadcn
import { Badge } from "@/components/ui/badge"; // Asumsi path komponen shadcn

// Tipe untuk setiap alat
type Tool = {
  title: string;
  description: string;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
  category: string;
  isNew?: boolean;
};

// Data untuk semua alat PDF
const tools: Tool[] = [
  {
    title: "Merge PDF",
    description:
      "Combine PDFs in the order you want with the easiest PDF merger available.",
    icon: Combine,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
    category: "Organize PDF",
  },
  {
    title: "Split PDF",
    description:
      "Separate one page or a whole set for easy conversion into independent PDF files.",
    icon: Split,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    category: "Organize PDF",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    icon: Minimize2,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    category: "Optimize PDF",
  },
  {
    title: "PDF to Word",
    description:
      "Easily convert your PDF files into easy to edit DOC and DOCX documents.",
    icon: FileText,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    category: "Convert PDF",
  },
  {
    title: "PDF to PowerPoint",
    description:
      "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
    icon: FileStack,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
    category: "Convert PDF",
  },
  {
    title: "PDF to Excel",
    description:
      "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
    icon: FileStack,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    category: "Convert PDF",
  },
  {
    title: "Word to PDF",
    description:
      "Make DOC and DOCX files easy to read by converting them to PDF.",
    icon: FileText,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    category: "Convert PDF",
  },
  {
    title: "PowerPoint to PDF",
    description:
      "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
    icon: FileStack,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
    category: "Convert PDF",
  },
  {
    title: "Excel to PDF",
    description:
      "Make EXCEL spreadsheets easy to read by converting them to PDF.",
    icon: FileSpreadsheet,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    category: "Convert PDF",
  },
  {
    title: "Edit PDF",
    description:
      "Add text, images, shapes or freehand annotations to a PDF document.",
    icon: Edit,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    category: "Edit PDF",
  },
  {
    title: "PDF to JPG",
    description:
      "Convert each PDF page into a JPG or extract all images contained in a PDF.",
    icon: FileImage,
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    category: "Convert PDF",
  },
  {
    title: "JPG to PDF",
    description:
      "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
    icon: FileImage,
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    category: "Convert PDF",
  },
  {
    title: "Sign PDF",
    description: "Sign yourself or request electronic signatures from others.",
    icon: PenSquare,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    category: "PDF Security",
  },
  {
    title: "Watermark",
    description:
      "Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.",
    icon: Droplets,
    iconBgColor: "bg-pink-100",
    iconColor: "text-pink-600",
    category: "Edit PDF",
  },
  {
    title: "Rotate PDF",
    description:
      "Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!",
    icon: RotateCw,
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    category: "Organize PDF",
  },
  {
    title: "HTML to PDF",
    description:
      "Convert webpages in HTML to PDF. Copy and paste the URL of the page you want.",
    icon: Globe,
    iconBgColor: "bg-teal-100",
    iconColor: "text-teal-600",
    category: "Convert PDF",
  },
  {
    title: "Unlock PDF",
    description:
      "Remove PDF password security, giving you the freedom to use your PDFs as you want.",
    icon: Unlock,
    iconBgColor: "bg-gray-100",
    iconColor: "text-gray-600",
    category: "PDF Security",
  },
  {
    title: "Protect PDF",
    description:
      "Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.",
    icon: Lock,
    iconBgColor: "bg-gray-100",
    iconColor: "text-gray-600",
    category: "PDF Security",
  },
  {
    title: "Organize PDF",
    description:
      "Sort pages of your PDF file however you like. Delete or add pages at your convenience.",
    icon: FolderKanban,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    category: "Organize PDF",
  },
  {
    title: "PDF to PDF/A",
    description:
      "Transform your PDF to PDF/A, the ISO-standardized version for long-term archiving.",
    icon: Archive,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    category: "Optimize PDF",
  },
  {
    title: "Repair PDF",
    description:
      "Repair a damaged PDF and recover data from corrupt PDF. Fix PDF files with our Repair tool.",
    icon: Wrench,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
    category: "Optimize PDF",
  },
  {
    title: "Page numbers",
    description:
      "Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.",
    icon: Hash,
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    category: "Edit PDF",
  },
  {
    title: "Scan to PDF",
    description:
      "Capture document scans from your mobile device and send them instantly to your browser.",
    icon: ScanLine,
    iconBgColor: "bg-teal-100",
    iconColor: "text-teal-600",
    category: "Convert PDF",
  },
  {
    title: "OCR PDF",
    description:
      "Easily convert scanned PDF into searchable and selectable documents.",
    icon: ScanSearch,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    category: "Optimize PDF",
    isNew: true,
  },
  {
    title: "Compare PDF",
    description:
      "Show a side-by-side document comparison and easily spot changes between different file versions.",
    icon: Columns,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    category: "Edit PDF",
    isNew: true,
  },
  {
    title: "Redact PDF",
    description:
      "Redact text and graphics to permanently remove sensitive information from a PDF.",
    icon: Paintbrush,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
    category: "PDF Security",
    isNew: true,
  },
  {
    title: "Crop PDF",
    description:
      "Crop margins of PDF documents or select specific areas, then apply the changes.",
    icon: Crop,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    category: "Edit PDF",
    isNew: true,
  },
  {
    title: "Create a workflow",
    description:
      "Create custom workflows with your favorite tools, automate tasks, and reuse them anytime.",
    icon: Workflow,
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    category: "Workflows",
  },
];

// Daftar kategori filter
const filters = [
  "All",
  "Workflows",
  "Organize PDF",
  "Optimize PDF",
  "Convert PDF",
  "Edit PDF",
  "PDF Security",
];

export default function PdfToolsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter alat berdasarkan kategori yang aktif
  const filteredTools =
    activeFilter === "All"
      ? tools
      : tools.filter((tool) => tool.category === activeFilter);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            Every tool you need to work with PDFs in one place
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Every tool you need to use PDFs, at your fingertips. All are 100%
            FREE and easy to use! Merge, split, compress, convert, rotate,
            unlock and watermark PDFs with just a few clicks.
          </p>
        </div>

        {/* Filter Buttons Section */}
        <div className="flex justify-center flex-wrap gap-2 mt-10">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 transition-colors ${
                activeFilter === filter
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Tools Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-12">
          {filteredTools.map((tool) => (
            <Card
              key={tool.title}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden group"
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className={`p-3 rounded-lg ${tool.iconBgColor}`}>
                  <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                </div>
                {tool.isNew && <Badge variant="destructive">New!</Badge>}
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
