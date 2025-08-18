import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Network,
  Database,
  FileText,
  Users,
  Zap,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  Play,
  ChevronRight,
  ChevronLeft,
  Home,
  Target,
  TrendingUp,
  Globe,
  Brain,
  Lightbulb,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const Module1CybersecurityIntro = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Bagian-bagian modul dalam Bahasa Indonesia
  const sections = [
    {
      id: "overview",
      title: "Tinjauan Kursus",
      duration: "5 min",
      type: "intro",
    },
    {
      id: "definition",
      title: "Apa itu Cybersecurity?",
      duration: "15 min",
      type: "content",
    },
    {
      id: "importance",
      title: "Mengapa Cybersecurity Penting",
      duration: "20 min",
      type: "content",
    },
    {
      id: "landscape",
      title: "Lanskap Ancaman Digital",
      duration: "25 min",
      type: "content",
    },
    {
      id: "principles",
      title: "Prinsip-Prinsip Keamanan Inti",
      duration: "30 min",
      type: "content",
    },
    {
      id: "career",
      title: "Jalur Karir Cybersecurity",
      duration: "15 min",
      type: "content",
    },
    {
      id: "quiz",
      title: "Uji Pengetahuan",
      duration: "10 min",
      type: "assessment",
    },
  ];

  // Pertanyaan kuis dalam Bahasa Indonesia
  const quizQuestions = [
    {
      id: 1,
      question: "Apa tujuan utama dari cybersecurity?",
      options: [
        "Untuk menghasilkan uang dari perangkat lunak keamanan",
        "Untuk melindungi aset digital dari akses tidak sah dan ancaman",
        "Untuk memata-matai aktivitas pengguna",
        "Untuk memperlambat sistem komputer",
      ],
      correct: 1,
    },
    {
      id: 2,
      question:
        "Manakah dari berikut ini yang BUKAN merupakan prinsip inti dari CIA Triad?",
      options: [
        "Confidentiality",
        "Integrity",
        "Availability",
        "Accountability",
      ],
      correct: 3,
    },
    {
      id: 3,
      question:
        "Berapa persentase serangan siber (cyberattack) yang menargetkan bisnis kecil?",
      options: ["10%", "25%", "43%", "75%"],
      correct: 2,
    },
  ];

  const handleNext = () => {
    if (!completedSections.includes(currentSection)) {
      toggleSectionCompletion(currentSection);
    }
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const toggleSectionCompletion = (sectionIndex) => {
    setCompletedSections((prev) =>
      prev.includes(sectionIndex)
        ? prev.filter((i) => i !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizCompleted(false);
    setCompletedSections((prev) => prev.filter((i) => i !== 6));
  };

  const submitQuiz = () => {
    setQuizCompleted(true);
    if (!completedSections.includes(6)) {
      toggleSectionCompletion(6);
    }
  };

  const getQuizScore = () => {
    if (quizQuestions.length === 0) return 0;
    let correct = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    return Math.round((correct / quizQuestions.length) * 100);
  };

  const progressPercentage = (completedSections.length / sections.length) * 100;

  const renderContent = () => {
    const section = sections[currentSection];

    switch (section.id) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Selamat Datang di Dasar-Dasar Cybersecurity
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Dalam pelajaran pertama ini, kita akan menjelajahi apa arti
                cybersecurity, mengapa ini krusial di dunia digital kita, dan
                bagaimana dampaknya bagi semua orang dari individu hingga
                perusahaan besar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Tujuan Pembelajaran
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Memahami konsep dan prinsip inti cybersecurity
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Durasi
                  </h3>
                  <p className="text-slate-300 text-sm">Konten sekitar 2 jam</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Penilaian
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Uji pengetahuan di akhir modul
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                Apa yang akan Anda Pelajari
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />{" "}
                  Mendefinisikan cybersecurity dan komponen intinya
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-400" /> Memahami
                  lanskap ancaman saat ini
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />{" "}
                  Mempelajari prinsip-prinsip CIA Triad
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />{" "}
                  Menjelajahi peluang karir di bidang cybersecurity
                </li>
              </ul>
            </div>
          </div>
        );

      case "definition":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Apa itu Cybersecurity?
            </h2>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Definisi
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                <strong className="text-blue-400">Cybersecurity</strong> adalah
                praktik melindungi sistem, jaringan, program, dan data dari
                serangan digital, akses tidak sah, dan kerusakan. Ini mencakup
                teknologi, proses, dan praktik yang dirancang untuk menjaga aset
                digital dan memelihara kerahasiaan, integritas, dan ketersediaan
                informasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-400" />
                    Komponen Kunci
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">
                        Keamanan Informasi
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Melindungi data dan sistem informasi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">
                        Keamanan Jaringan
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Mengamankan infrastruktur dan komunikasi jaringan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">
                        Keamanan Aplikasi
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Mengamankan aplikasi dan layanan perangkat lunak
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">
                        Keamanan Operasional
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Mengamankan operasi dan proses bisnis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-400" />
                    Tujuan Utama
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">
                        Mencegah Serangan
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Menghentikan aktivitas berbahaya sebelum terjadi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">
                        Mendeteksi Ancaman
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Mengidentifikasi aktivitas mencurigakan dengan cepat
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">
                        Merespons & Memulihkan
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Meminimalkan kerusakan dan memulihkan operasi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">
                        Menjaga Kepercayaan
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Memelihara kepercayaan pelanggan dan pemangku
                        kepentingan
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Evolusi Cybersecurity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      1970-an - 1980-an
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Proteksi kata sandi dasar dan keamanan fisik
                    </p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      1990-an - 2000-an
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Munculnya Firewall, antivirus, dan keamanan jaringan
                    </p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      2010-an - Sekarang
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Keamanan berbasis AI, proteksi cloud, model zero-trust
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "importance":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Mengapa Cybersecurity Penting
            </h2>

            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                Biaya dari Serangan Siber
                {/* sumber */}
                <span className="text-xs">
                  {" "}
                  According to IBM’s Cost of Data Breach Report 2023
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-red-400">
                    $4.45 Juta
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Rata-rata biaya pelanggaran data pada 2023
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-orange-400">43%</h4>
                  <p className="text-slate-300 text-sm">
                    Serangan siber menargetkan bisnis kecil
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-yellow-400">
                    277 hari
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Rata-rata waktu untuk mengidentifikasi dan menahan
                    pelanggaran
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-400" />
                    Dampak Transformasi Digital
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">
                    Seiring organisasi semakin bergantung pada teknologi
                    digital, permukaan serangan telah meluas secara dramatis:
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />{" "}
                      Lingkungan kerja jarak jauh (remote)
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />{" "}
                      Adopsi komputasi cloud
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />{" "}
                      Proliferasi perangkat IoT
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />{" "}
                      Pendekatan mobile-first
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                    Lanskap Ancaman yang Berkembang
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">
                    Ancaman siber menjadi lebih canggih dan sering terjadi:
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-400" />{" "}
                      Serangan berbasis AI
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-400" />{" "}
                      Evolusi ransomware
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-400" />{" "}
                      Serangan pada rantai pasokan (supply chain)
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-400" />{" "}
                      Taktik social engineering
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Area Dampak di Dunia Nyata
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-purple-400" />
                      Pribadi
                    </h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Pencurian identitas</li>
                      <li>• Kerugian finansial</li>
                      <li>• Pelanggaran privasi</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2 flex items-center">
                      <Network className="h-4 w-4 mr-2 text-blue-400" />
                      Bisnis
                    </h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Gangguan operasional</li>
                      <li>• Kehilangan pendapatan</li>
                      <li>• Kerusakan reputasi</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-green-400" />
                      Pemerintah
                    </h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Keamanan nasional</li>
                      <li>• Infrastruktur kritis</li>
                      <li>• Layanan publik</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2 flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-yellow-400" />
                      Masyarakat
                    </h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Stabilitas ekonomi</li>
                      <li>• Kepercayaan sosial</li>
                      <li>• Perlindungan demokrasi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "landscape":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Lanskap Ancaman Digital
            </h2>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Statistik Ancaman Saat Ini
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-purple-400">4.000+</h4>
                  <p className="text-slate-300 text-sm">
                    Serangan siber per hari
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-pink-400">95%</h4>
                  <p className="text-slate-300 text-sm">
                    Disebabkan oleh kesalahan manusia
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-cyan-400">68%</h4>
                  <p className="text-slate-300 text-sm">
                    Pemimpin bisnis merasa rentan
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-green-400">
                    $10.5 Triliun
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Kerugian kejahatan siber global pada 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                    Jenis Ancaman Umum
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">Malware</h4>
                        <p className="text-slate-300 text-sm">
                          Virus, worm, trojan, ransomware
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">Phishing</h4>
                        <p className="text-slate-300 text-sm">
                          Email dan situs web menipu
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">
                          Social Engineering
                        </h4>
                        <p className="text-slate-300 text-sm">
                          Taktik manipulasi psikologis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">
                          Ancaman dari Dalam (Insider Threats)
                        </h4>
                        <p className="text-slate-300 text-sm">
                          Karyawan yang berniat jahat atau lalai
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-blue-400" />
                    Vektor Serangan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">
                          Berbasis Jaringan
                        </h4>
                        <p className="text-slate-300 text-sm">
                          Mengeksploitasi kerentanan jaringan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">
                          Berbasis Aplikasi
                        </h4>
                        <p className="text-slate-300 text-sm">
                          Menargetkan kelemahan perangkat lunak
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">Fisik</h4>
                        <p className="text-slate-300 text-sm">
                          Akses langsung ke sistem
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">
                          Berbasis Manusia
                        </h4>
                        <p className="text-slate-300 text-sm">
                          Mengeksploitasi psikologi manusia
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Ancaman yang Sedang Muncul
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      Serangan Berbasis AI
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Machine learning digunakan untuk membuat kampanye phishing
                      dan deepfake yang canggih
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      Kerentanan IoT
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Miliaran perangkat terhubung dengan keamanan lemah
                      menciptakan permukaan serangan baru
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      Komputasi Kuantum
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Ancaman masa depan terhadap metode enkripsi saat ini yang
                      memerlukan solusi kriptografi baru
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "principles":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Prinsip-Prinsip Keamanan Inti
            </h2>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">CIA Triad</h3>
              <p className="text-slate-300 max-w-3xl mx-auto">
                CIA Triad adalah model dasar yang memandu kebijakan dan praktik
                cybersecurity. Terdiri dari tiga prinsip inti: Confidentiality,
                Integrity, dan Availability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <Lock className="h-10 w-10 text-red-400 mx-auto mb-3" />
                  <CardTitle className="text-white">
                    Confidentiality (Kerahasiaan)
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Menjamin privasi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Mencegah pengungkapan informasi yang tidak sah. Data hanya
                    boleh diakses oleh individu yang berwenang.
                    <br />
                    <strong className="text-white mt-2 block">
                      Contoh:
                    </strong>{" "}
                    Enkripsi, Kontrol Akses.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-green-400 mx-auto mb-3" />
                  <CardTitle className="text-white">
                    Integrity (Integritas)
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Menjamin akurasi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Menjaga konsistensi, akurasi, dan kepercayaan data. Data
                    tidak boleh diubah secara tidak sah.
                    <br />
                    <strong className="text-white mt-2 block">
                      Contoh:
                    </strong>{" "}
                    Hashing, Tanda Tangan Digital.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <Zap className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                  <CardTitle className="text-white">
                    Availability (Ketersediaan)
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Menjamin akses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Memastikan bahwa sistem dan data dapat diakses oleh pengguna
                    yang berwenang saat mereka membutuhkannya.
                    <br />
                    <strong className="text-white mt-2 block">
                      Contoh:
                    </strong>{" "}
                    Redundansi, Backup, mitigasi DDoS.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Prinsip Kunci Lainnya
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    Principle of Least Privilege (PoLP)
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Pengguna dan sistem hanya boleh memiliki tingkat akses—atau
                    izin—minimum yang diperlukan untuk melakukan fungsi
                    pekerjaan mereka.
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    Defense in Depth
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Strategi yang menggunakan beberapa lapisan kontrol keamanan.
                    Jika satu lapisan gagal, lapisan lain siap untuk melindungi
                    aset.
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Zero Trust</h4>
                  <p className="text-slate-300 text-sm">
                    Model keamanan yang mengasumsikan tidak ada pengguna atau
                    perangkat yang dipercaya secara default. "Jangan pernah
                    percaya, selalu verifikasi" adalah konsep intinya.
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    Separation of Duties
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Memastikan tidak ada satu individu pun yang memiliki kendali
                    atas semua aspek tugas kritis, untuk mencegah penipuan dan
                    kesalahan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "career":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Jalur Karir Cybersecurity
            </h2>
            <p className="text-slate-300 mb-6">
              Bidang cybersecurity sangat luas dan menawarkan berbagai peluang
              karir. Berikut adalah beberapa domain umum.
            </p>

            <Tabs defaultValue="analyst" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-800">
                <TabsTrigger value="analyst">Analis & Operasi</TabsTrigger>
                <TabsTrigger value="engineering">
                  Rekayasa & Arsitektur
                </TabsTrigger>
                <TabsTrigger value="testing">Pengujian & Audit</TabsTrigger>
                <TabsTrigger value="leadership">
                  Kepemimpinan & Tata Kelola
                </TabsTrigger>
              </TabsList>
              <TabsContent value="analyst" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Analis Keamanan (Security Analyst)
                      </CardTitle>
                      <CardDescription>
                        Memantau jaringan, menyelidiki insiden, dan menganalisis
                        ancaman.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Penanggap Insiden (Incident Responder)
                      </CardTitle>
                      <CardDescription>
                        Responden pertama pada insiden siber, fokus pada
                        penahanan dan pemulihan.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="engineering" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Insinyur Keamanan (Security Engineer)
                      </CardTitle>
                      <CardDescription>
                        Merancang, membangun, dan memelihara infrastruktur
                        keamanan organisasi.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Arsitek Keamanan (Security Architect)
                      </CardTitle>
                      <CardDescription>
                        Merancang struktur dan strategi keamanan keseluruhan
                        untuk sebuah organisasi.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="testing" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Penetration Tester
                      </CardTitle>
                      <CardDescription>
                        Juga dikenal sebagai "ethical hacker", mereka menguji
                        sistem untuk mencari kerentanan.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Auditor Keamanan (Security Auditor)
                      </CardTitle>
                      <CardDescription>
                        Menilai kontrol keamanan terhadap standar dan kebijakan
                        yang telah ditetapkan.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="leadership" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">CISO</CardTitle>
                      <CardDescription>
                        Chief Information Security Officer, seorang eksekutif
                        senior yang bertanggung jawab atas keamanan.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Manajer Keamanan (Security Manager)
                      </CardTitle>
                      <CardDescription>
                        Mengelola tim keamanan, proyek, dan implementasi
                        strategi.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case "quiz":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Uji Pengetahuan
            </h2>
            {!quizCompleted ? (
              <div className="space-y-8">
                {quizQuestions.map((q, index) => (
                  <Card key={q.id} className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Pertanyaan {index + 1}
                      </CardTitle>
                      <CardDescription className="text-slate-300 text-lg pt-2">
                        {q.question}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((option, i) => (
                        <Button
                          key={i}
                          variant={
                            quizAnswers[q.id] === i ? "default" : "outline"
                          }
                          className={`justify-start text-left h-auto whitespace-normal ${
                            quizAnswers[q.id] === i
                              ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                              : "border-slate-600 hover:bg-slate-700 hover:text-white"
                          }`}
                          onClick={() => handleQuizAnswer(q.id, i)}
                        >
                          {option}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={submitQuiz}
                  disabled={
                    Object.keys(quizAnswers).length !== quizQuestions.length
                  }
                  className="w-full md:w-auto text-lg px-8 py-6 bg-green-600 hover:bg-green-700"
                >
                  Kirim Jawaban
                </Button>
              </div>
            ) : (
              <Card className="bg-slate-800/50 border-slate-700 text-center p-8">
                <CardHeader>
                  <Award
                    className={`h-20 w-20 mx-auto mb-4 ${
                      getQuizScore() >= 80
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  />
                  <CardTitle className="text-3xl text-white">
                    Kuis Selesai!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300 text-xl">Skor Anda:</p>
                  <h3 className="text-6xl font-bold text-white">
                    {getQuizScore()}%
                  </h3>
                  <p className="text-slate-400">
                    {getQuizScore() >= 80
                      ? "Kerja bagus! Anda memiliki pemahaman yang kuat tentang dasar-dasarnya."
                      : "Usaha yang bagus! Tinjau kembali materinya dan coba lagi untuk meningkatkan skormu."}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="border-slate-600 hover:bg-slate-700 hover:text-white"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Ulangi Kuis
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={currentSection === sections.length - 1}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Selesaikan Modul <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return <div>Konten tidak ditemukan.</div>;
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 lg:max-w-xs flex-shrink-0">
          <Card className="bg-slate-800/50 border-slate-700 sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl">Modul 1: Pengantar</CardTitle>
              <CardDescription>Dasar-Dasar Cybersecurity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <Progress value={progressPercentage} className="w-full" />
                <p className="text-sm text-slate-400 text-right">
                  {Math.round(progressPercentage)}% Selesai
                </p>
              </div>
              <nav className="space-y-1">
                {sections.map((sec, index) => (
                  <button
                    key={sec.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      currentSection === index
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-700/50 text-slate-300"
                    }`}
                  >
                    {completedSections.includes(index) ? (
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <div
                        className={`h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full ${
                          currentSection === index
                            ? "bg-white/20"
                            : "bg-slate-700"
                        }`}
                      >
                        <div className="h-2 w-2 bg-slate-400 rounded-full"></div>
                      </div>
                    )}
                    <span className="flex-grow">{sec.title}</span>
                    <Badge
                      variant="secondary"
                      className="flex-shrink-0 bg-slate-600 text-slate-300"
                    >
                      {sec.duration}
                    </Badge>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 sm:p-8 lg:p-10 min-h-[600px]">
            {renderContent()}
          </div>
          {/* Navigation */}
          <div className="mt-6 flex justify-between items-center">
            <Button
              onClick={handlePrev}
              disabled={currentSection === 0}
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 hover:text-white"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Sebelumnya
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentSection === sections.length - 1 || quizCompleted}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentSection === sections.length - 2
                ? "Mulai Kuis"
                : "Selanjutnya"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Module1CybersecurityIntro;
