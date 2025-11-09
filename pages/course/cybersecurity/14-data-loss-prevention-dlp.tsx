// Salin semua kode ini ke dalam file: app/page.tsx
"use client"; // Diperlukan untuk interaktivitas (useState, onClick)

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

// 1. Definisikan Tipe Data untuk Materi dan Kuis
interface Module {
  id: string;
  title: string;
  content: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

// 2. Konten Materi (Materi Lengkap)
const courseModules: Module[] = [
  {
    id: "m1",
    title: "Apa itu Data Loss Prevention (DLP)?",
    content:
      "Data Loss Prevention (DLP) adalah serangkaian strategi, proses, dan teknologi yang dirancang untuk mencegah data sensitif atau rahasia agar tidak keluar dari jaringan organisasi tanpa izin. Tujuannya adalah untuk melindungi data dari pencurian, kebocoran, atau paparan yang tidak disengaja.",
  },
  {
    id: "m2",
    title: "Mengapa DLP Penting?",
    content:
      "Di era digital, data adalah aset paling berharga. Kebocoran data dapat menyebabkan kerugian finansial yang besar, kerusakan reputasi, sanksi hukum (misalnya pelanggaran GDPR atau UU PDP), dan hilangnya keunggulan kompetitif. DLP membantu memitigasi risiko-risiko ini.",
  },
  {
    id: "m3",
    title: "Tiga Jenis Utama DLP",
    content:
      "1. **DLP Jaringan (Network DLP):** Memantau data yang bergerak di seluruh jaringan (email, web, FTP). \n2. **DLP Endpoint (Endpoint DLP):** Memantau data di perangkat pengguna akhir (laptop, PC, USB drive). \n3. **DLP Cloud (Cloud DLP):** Melindungi data yang disimpan dan dibagikan di aplikasi cloud (Google Drive, O365, Salesforce).",
  },
  {
    id: "m4",
    title: "Praktik Terbaik DLP untuk Karyawan",
    content:
      "1. **Klasifikasikan Data:** Pahami mana data yang bersifat publik, internal, rahasia, atau sangat rahasia. \n2. **Hati-hati dengan Email:** Jangan pernah mengirim data sensitif ke alamat email pribadi atau eksternal yang tidak terverifikasi. \n3. **Gunakan Perangkat Aman:** Hindari menggunakan USB drive yang tidak dikenal atau komputer publik untuk mengakses data perusahaan. \n4. **Laporkan Insiden:** Jika Anda mencurigai adanya kebocoran data, segera laporkan ke tim IT atau keamanan.",
  },
];

// 3. Konten Kuis
const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Apa tujuan utama dari strategi Data Loss Prevention (DLP)?",
    options: [
      "Mempercepat koneksi internet",
      "Mencegah data sensitif keluar dari organisasi tanpa izin",
      "Membuat cadangan (backup) semua data",
      "Memblokir semua email eksternal",
    ],
    correctAnswer: "Mencegah data sensitif keluar dari organisasi tanpa izin",
  },
  {
    id: "q2",
    question:
      "Memantau data di laptop dan USB drive adalah contoh dari jenis DLP apa?",
    options: ["DLP Jaringan", "DLP Endpoint", "DLP Cloud", "DLP Fisik"],
    correctAnswer: "DLP Endpoint",
  },
  {
    id: "q3",
    question:
      "Manakah di bawah ini yang BUKAN merupakan praktik terbaik DLP untuk karyawan?",
    options: [
      "Mengirim data rahasia ke email pribadi agar bisa dikerjakan di rumah",
      "Mengklasifikasikan dokumen sebelum membagikannya",
      "Melaporkan email phishing yang mencurigakan ke tim IT",
      "Menggunakan VPN saat terhubung ke jaringan publik",
    ],
    correctAnswer:
      "Mengirim data rahasia ke email pribadi agar bisa dikerjakan di rumah",
  },
];

// 4. Komponen Halaman Utama
export default function DlpCoursePage() {
  // State untuk melacak jawaban kuis
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  // State untuk melacak status kuis (sudah disubmit atau belum)
  const [isSubmitted, setIsSubmitted] = useState(false);
  // State untuk skor
  const [score, setScore] = useState(0);

  // Fungsi untuk menangani perubahan jawaban radio button
  const handleAnswerChange = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Fungsi untuk menghitung dan menampilkan skor
  const handleSubmitQuiz = () => {
    let newScore = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setIsSubmitted(true);
  };

  // Fungsi untuk mengulang kuis
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setScore(0);
    setIsSubmitted(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gray-50">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-700">
            Kursus Interaktif: Data Loss Prevention (DLP)
          </CardTitle>
          <CardDescription>
            Pelajari dasar-dasar cara melindungi data sensitif organisasi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Bagian Materi Pelajaran */}
          <h2 className="text-2xl font-semibold mb-4">Materi Pelajaran</h2>
          <Accordion type="single" collapsible className="w-full mb-8">
            {courseModules.map((module) => (
              <AccordionItem value={module.id} key={module.id}>
                <AccordionTrigger className="text-lg font-medium">
                  {module.title}
                </AccordionTrigger>
                <AccordionContent className="text-base whitespace-pre-line">
                  {module.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bagian Kuis Interaktif */}
          <h2 className="text-2xl font-semibold mb-6">Uji Pemahaman Anda</h2>

          {isSubmitted && (
            <Alert
              className={`mb-6 ${
                score / quizQuestions.length >= 0.7
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              {score / quizQuestions.length >= 0.7 ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertTitle
                className={
                  score / quizQuestions.length >= 0.7
                    ? "text-green-700"
                    : "text-red-700"
                }
              >
                Hasil Kuis Anda
              </AlertTitle>
              <AlertDescription>
                Anda menjawab benar {score} dari {quizQuestions.length}{" "}
                pertanyaan.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {quizQuestions.map((q) => (
              <div key={q.id} className="p-4 border rounded-lg bg-gray-50/50">
                <p className="font-medium mb-4">{q.question}</p>
                <RadioGroup
                  value={selectedAnswers[q.id]}
                  onValueChange={(value) => handleAnswerChange(q.id, value)}
                  disabled={isSubmitted}
                >
                  {q.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${q.id}-${index}`} />
                      <Label htmlFor={`${q.id}-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          {isSubmitted ? (
            <Button variant="outline" onClick={handleResetQuiz}>
              Ulangi Kuis
            </Button>
          ) : (
            <Button onClick={handleSubmitQuiz}>Kirim Jawaban</Button>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
