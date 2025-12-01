import React, { useState } from "react";
import {
  BookOpen,
  PlayCircle,
  CheckCircle,
  Lock,
  Star,
  Clock,
  BarChart,
  Award,
  Globe,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  MessageSquare,
  Share2,
  Bookmark,
  Check,
  Zap,
  ShieldAlert,
  Terminal,
  Brain,
} from "lucide-react";

const CourseDetail = () => {
  // State untuk accordion modul
  const [openModules, setOpenModules] = useState([0, 1]); // Default buka modul 1 & 2

  const toggleModule = (index) => {
    if (openModules.includes(index)) {
      setOpenModules(openModules.filter((i) => i !== index));
    } else {
      setOpenModules([...openModules, index]);
    }
  };

  // Data Kurikulum (Disusun ulang dari list user agar lebih terstruktur)
  const curriculum = [
    {
      title: "Pengantar & Dasar Prompt Engineering",
      duration: "1 Jam 20 Menit",
      lessons: [
        {
          title: "Introduction to Prompt Engineering",
          type: "video",
          duration: "10:00",
          free: true,
        },
        {
          title: "LLM Settings & Configuration",
          type: "video",
          duration: "15:00",
          free: true,
        },
        {
          title: "Basics of Prompting",
          type: "video",
          duration: "12:00",
          free: true,
        },
        {
          title: "Prompt Elements & Structure",
          type: "article",
          duration: "10:00",
          free: false,
        },
        {
          title: "General Tips for Designing Prompts",
          type: "article",
          duration: "08:00",
          free: false,
        },
        {
          title: "Examples of Effective Prompts",
          type: "video",
          duration: "25:00",
          free: false,
        },
      ],
    },
    {
      title: "Teknik Prompting Dasar hingga Menengah",
      duration: "2 Jam 45 Menit",
      lessons: [
        {
          title: "Zero-Shot Prompting",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Few-Shot Prompting",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "Chain-of-Thought (CoT) Prompting",
          type: "video",
          duration: "25:00",
          free: false,
        },
        {
          title: "Self-Consistency",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Generate Knowledge Prompting",
          type: "article",
          duration: "10:00",
          free: false,
        },
        {
          title: "Prompt Chaining",
          type: "video",
          duration: "20:00",
          free: false,
        },
      ],
    },
    {
      title: "Teknik Lanjutan & Reasoning",
      duration: "3 Jam 15 Menit",
      lessons: [
        {
          title: "Tree of Thoughts (ToT)",
          type: "video",
          duration: "30:00",
          free: false,
        },
        {
          title: "Retrieval Augmented Generation (RAG)",
          type: "video",
          duration: "35:00",
          free: false,
        },
        {
          title: "Automatic Reasoning and Tool-use (ART)",
          type: "article",
          duration: "15:00",
          free: false,
        },
        {
          title: "Automatic Prompt Engineer (APE)",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "Active-Prompt",
          type: "article",
          duration: "10:00",
          free: false,
        },
        {
          title: "Directional Stimulus Prompting",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Program-Aided Language Models (PAL)",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "ReAct Prompting",
          type: "video",
          duration: "25:00",
          free: false,
        },
        {
          title: "Multimodal CoT Prompting",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Graph Prompting",
          type: "article",
          duration: "10:00",
          free: false,
        },
      ],
    },
    {
      title: "Aplikasi Praktis & Penggunaan",
      duration: "2 Jam 30 Menit",
      lessons: [
        {
          title: "Function Calling",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "Generating Data & Synthetic Datasets",
          type: "video",
          duration: "25:00",
          free: false,
        },
        {
          title: "Handling Dataset Diversity",
          type: "article",
          duration: "10:00",
          free: false,
        },
        {
          title: "Generating Code & Debugging",
          type: "video",
          duration: "30:00",
          free: false,
        },
        {
          title: "Case Study: Graduate Job Classification",
          type: "case_study",
          duration: "45:00",
          free: false,
        },
        {
          title: "Prompt Hub & Management",
          type: "article",
          duration: "10:00",
          free: false,
        },
      ],
    },
    {
      title: "Domain Spesifik Prompting",
      duration: "2 Jam",
      lessons: [
        {
          title: "Classification Tasks",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Coding & Software Engineering",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "Creativity & Writing",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Information Extraction",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Image Generation (Midjourney/DALL-E)",
          type: "video",
          duration: "25:00",
          free: false,
        },
        {
          title: "Mathematics & Logic",
          type: "article",
          duration: "10:00",
          free: false,
        },
        {
          title: "Question Answering Systems",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Text Summarization",
          type: "video",
          duration: "15:00",
          free: false,
        },
      ],
    },
    {
      title: "Evaluasi, Etika & Risiko",
      duration: "1 Jam 45 Menit",
      lessons: [
        {
          title: "Prompt Evaluation Metrics",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "Truthfulness & Hallucinations",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Adversarial Prompting (Jailbreaking)",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "Factuality & Grounding",
          type: "article",
          duration: "10:00",
          free: false,
        },
        {
          title: "Biases in LLMs",
          type: "video",
          duration: "15:00",
          free: false,
        },
        {
          title: "Risks and Misuses",
          type: "article",
          duration: "10:00",
          free: false,
        },
      ],
    },
    {
      title: "Ekosistem Model & Tools",
      duration: "1 Jam 30 Menit",
      lessons: [
        {
          title: "Overview of Models (ChatGPT, Gemini, Claude)",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "Open Source Models (Llama, Mistral, OLMo)",
          type: "video",
          duration: "20:00",
          free: false,
        },
        {
          title: "Model Collections & Comparisons",
          type: "article",
          duration: "10:00",
          free: false,
        },
        {
          title: "Tools, Notebooks & Datasets",
          type: "resource",
          duration: "15:00",
          free: false,
        },
        {
          title: "Review Papers & Additional Readings",
          type: "resource",
          duration: "10:00",
          free: false,
        },
      ],
    },
    {
      title: "Capstone Project & Sertifikasi",
      duration: "3 Jam",
      lessons: [
        {
          title: "Final Project: Membangun Chatbot RAG Sederhana",
          type: "project",
          duration: "2:00:00",
          free: false,
        },
        {
          title: "Ujian Akhir (Final Exam)",
          type: "quiz",
          duration: "1:00:00",
          free: false,
        },
        {
          title: "Klaim Sertifikat",
          type: "certificate",
          duration: "05:00",
          free: false,
        },
      ],
    },
  ];

  const features = [
    "Akses seumur hidup ke 60+ materi",
    "Sertifikat penyelesaian",
    "Studi kasus dunia nyata",
    "Akses ke komunitas Discord",
    "Resource code & template prompt",
    "Akses di Mobile dan TV",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-blue-300">
                <span className="cursor-pointer hover:underline">
                  Development
                </span>
                <span className="text-slate-500">/</span>
                <span className="cursor-pointer hover:underline">
                  AI & Data Science
                </span>
                <span className="text-slate-500">/</span>
                <span className="text-white">Prompt Engineering</span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Mastering Prompt Engineering: Panduan Lengkap dari Dasar hingga
                Advanced
              </h1>

              <p className="max-w-2xl text-lg text-slate-300">
                Pelajari cara mengontrol LLM (ChatGPT, Gemini, Llama) dengan
                teknik Zero-shot, Few-shot, Chain-of-Thought, RAG, hingga ReAct
                untuk meningkatkan produktivitas dan membangun aplikasi AI
                modern.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <span className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 text-yellow-400 rounded">
                  <span className="text-xs bg-yellow-400 text-slate-900 px-1 rounded font-bold mr-1">
                    BESTSELLER
                  </span>
                  4.8{" "}
                  <div className="flex">
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                  </div>
                  <span className="text-slate-400 ml-1">(1,240 ratings)</span>
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Globe className="h-4 w-4" /> Bahasa Indonesia
                </span>
                <span className="text-slate-300">
                  Updated <span className="text-white">Desember 2025</span>
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Instructor"
                  className="h-10 w-10 rounded-full border-2 border-white/20 bg-slate-800"
                />
                <div>
                  <p className="text-sm font-semibold">
                    Dibuat oleh{" "}
                    <span className="text-blue-400 underline cursor-pointer">
                      Rabih Utomo
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Senior Engineer & Tech Lead
                  </p>
                </div>
              </div>
            </div>

            {/* Right Placeholder for layout balance on large screens (The Card will be floating below) */}
            <div className="hidden lg:block lg:w-1/3"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content Column */}
          <div className="flex-1">
            {/* What you'll learn */}
            <div className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Apa yang akan Anda pelajari
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Memahami fundamental Prompt Engineering dan elemen-elemennya.",
                  "Menguasai teknik Zero-shot, Few-shot, dan Chain-of-Thought (CoT).",
                  "Menerapkan teknik advanced seperti Tree of Thoughts (ToT) & RAG.",
                  "Menggunakan LLM untuk coding, data generation, dan analisis.",
                  "Memahami risiko keamanan (Adversarial) dan bias pada AI.",
                  "Studi kasus nyata dan implementasi Prompt untuk bisnis.",
                  "Perbandingan model: GPT-4, Gemini, Llama, Mistral, dll.",
                  "Membangun alur kerja AI otomatis dengan Function Calling.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-slate-900" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Syllabus */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Konten Kursus
              </h2>
              <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
                <p>8 Bagian • 52 Pelajaran • 18j 30m Total Durasi</p>
                <button
                  onClick={() => setOpenModules(curriculum.map((_, i) => i))}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Expand All Sections
                </button>
              </div>

              <div className="space-y-4">
                {curriculum.map((module, moduleIdx) => (
                  <div
                    key={moduleIdx}
                    className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                  >
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(moduleIdx)}
                      className="flex w-full items-center justify-between bg-slate-50 p-4 text-left transition-colors hover:bg-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        {openModules.includes(moduleIdx) ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                        <div>
                          <h3 className="font-bold text-slate-900">
                            {module.title}
                          </h3>
                          <p className="text-xs text-slate-500 md:hidden">
                            {module.lessons.length} Pelajaran
                          </p>
                        </div>
                      </div>
                      <div className="hidden text-sm text-slate-500 sm:block">
                        {module.lessons.length} Pelajaran • {module.duration}
                      </div>
                    </button>

                    {/* Module Content */}
                    {openModules.includes(moduleIdx) && (
                      <div className="divide-y divide-slate-100">
                        {module.lessons.map((lesson, lessonIdx) => (
                          <div
                            key={lessonIdx}
                            className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.type === "video" ? (
                                <PlayCircle className="h-4 w-4 text-slate-400" />
                              ) : lesson.type === "article" ? (
                                <FileText className="h-4 w-4 text-slate-400" />
                              ) : lesson.type === "project" ? (
                                <Terminal className="h-4 w-4 text-purple-500" />
                              ) : lesson.type === "quiz" ? (
                                <Brain className="h-4 w-4 text-orange-500" />
                              ) : lesson.type === "certificate" ? (
                                <Award className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <FileText className="h-4 w-4 text-slate-400" />
                              )}

                              <span
                                className={`text-sm ${
                                  lesson.free
                                    ? "text-blue-600 font-medium"
                                    : "text-slate-700"
                                }`}
                              >
                                {lesson.title}
                              </span>
                              {lesson.free && (
                                <span className="hidden rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 sm:inline-block">
                                  Preview
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              {lesson.free ? (
                                <button className="text-xs font-medium text-blue-600 underline">
                                  Putar
                                </button>
                              ) : (
                                <Lock className="h-3 w-3 text-slate-400" />
                              )}
                              <span className="w-12 text-right text-xs text-slate-500">
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Deskripsi
              </h2>
              <div className="prose max-w-none text-slate-700">
                <p className="mb-4">
                  <strong>Prompt Engineering</strong> adalah keterampilan paling
                  dicari di era Artificial Intelligence saat ini. Kursus ini
                  dirancang untuk membawa Anda dari pemula yang hanya bisa
                  "chatting" dengan AI, menjadi seorang ahli yang mampu
                  merancang sistem AI yang kompleks.
                </p>
                <p className="mb-4">
                  Kami tidak hanya membahas dasar-dasar. Kami menyelam dalam ke
                  teknik-teknik <em>State-of-the-Art</em> yang digunakan oleh
                  peneliti AI di Google, OpenAI, dan Meta. Anda akan belajar
                  bagaimana meminimalisir halusinasi AI, meningkatkan kemampuan
                  penalaran model, dan mengintegrasikan LLM dengan tools
                  eksternal.
                </p>
                <p className="mb-4">
                  <strong>Materi mencakup:</strong>
                </p>
                <ul className="mb-4 list-disc pl-5">
                  <li>
                    <strong>Dasar & Fundamental:</strong> Struktur prompt yang
                    efektif.
                  </li>
                  <li>
                    <strong>Advanced Techniques:</strong> Chain of Thought, Tree
                    of Thoughts, ReAct.
                  </li>
                  <li>
                    <strong>RAG (Retrieval Augmented Generation):</strong>{" "}
                    Menghubungkan AI dengan data perusahaan Anda.
                  </li>
                  <li>
                    <strong>Keamanan:</strong> Mencegah Prompt Injection dan
                    Jailbreaking.
                  </li>
                  <li>
                    <strong>Praktik Langsung:</strong> 10+ studi kasus dan
                    capstone project.
                  </li>
                </ul>
                <p>
                  Kursus ini cocok untuk Developer, Data Scientist, Content
                  Creator, atau siapa saja yang ingin memaksimalkan potensi AI
                  Generatif dalam pekerjaan mereka.
                </p>
              </div>
            </div>

            {/* Instructor */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Instruktur
              </h2>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex gap-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="Instructor"
                    className="h-20 w-20 rounded-full bg-slate-100"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Rabih Utomo
                    </h3>
                    <p className="text-blue-600">
                      Senior AI Engineer & Tech Lead
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />{" "}
                        4.9 Rating
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> 15,000+ Siswa
                      </div>
                      <div className="flex items-center gap-1">
                        <PlayCircle className="h-3 w-3" /> 12 Kursus
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  Rizky adalah seorang engineer berpengalaman dengan
                  spesialisasi di bidang NLP dan Generative AI. Ia telah bekerja
                  di berbagai startup teknologi unicorn di Indonesia dan
                  berkontribusi pada implementasi LLM skala besar. Misi Rizky
                  adalah mendemokratisasi pengetahuan AI agar dapat diakses oleh
                  semua orang dengan bahasa yang mudah dimengerti.
                </p>
              </div>
            </div>

            {/* Reviews Section Placeholder */}
            <div className="mb-20">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Ulasan Peserta
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((review) => (
                  <div
                    key={review}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-slate-300"></div>
                        <span className="font-semibold text-slate-900">
                          Budi Santoso
                        </span>
                      </div>
                      <div className="flex">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">
                      "Materi sangat lengkap! Akhirnya saya paham bedanya
                      Few-Shot dan CoT. Sangat berguna untuk pekerjaan saya
                      sebagai software engineer."
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Sticky Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              {/* Main CTA Card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                {/* Video Preview Image */}
                <div className="relative aspect-video w-full cursor-pointer bg-slate-900">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40">
                    <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-4 left-4 font-semibold text-white">
                    Preview Kursus ini
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-end gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      Rp 499.000
                    </span>
                    <span className="mb-1 text-lg text-slate-400 line-through">
                      Rp 1.299.000
                    </span>
                    <span className="mb-1 text-sm font-medium text-red-500">
                      Diskon 60%
                    </span>
                  </div>

                  <div className="mb-2 flex items-center gap-2 text-sm text-red-600">
                    <Clock className="h-4 w-4" />
                    <span>Promo berakhir dalam 5 jam lagi!</span>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <button className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 hover:shadow-lg">
                      Beli Sekarang
                    </button>
                    <button className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white py-3.5 font-bold text-slate-700 transition hover:bg-slate-50">
                      Tambah ke Keranjang
                    </button>
                  </div>

                  <div className="mt-6 text-center text-xs text-slate-500">
                    30-Day Money-Back Guarantee
                  </div>

                  <div className="mt-6 space-y-4">
                    <h4 className="font-bold text-slate-900">
                      Kursus ini mencakup:
                    </h4>
                    <ul className="space-y-3">
                      {features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          {idx === 0 && (
                            <PlayCircle className="h-4 w-4 shrink-0 text-slate-900" />
                          )}
                          {idx === 1 && (
                            <Award className="h-4 w-4 shrink-0 text-slate-900" />
                          )}
                          {idx === 2 && (
                            <FileText className="h-4 w-4 shrink-0 text-slate-900" />
                          )}
                          {idx === 3 && (
                            <MessageSquare className="h-4 w-4 shrink-0 text-slate-900" />
                          )}
                          {idx === 4 && (
                            <Zap className="h-4 w-4 shrink-0 text-slate-900" />
                          )}
                          {idx === 5 && (
                            <Smartphone className="h-4 w-4 shrink-0 text-slate-900" />
                          )}
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between border-t pt-4">
                    <button className="flex items-center gap-1 text-sm font-semibold text-slate-900 hover:underline">
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                    <button className="flex items-center gap-1 text-sm font-semibold text-slate-900 hover:underline">
                      <Bookmark className="h-4 w-4" /> Wishlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Business CTA */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-bold text-slate-900">
                  Training 5 orang atau lebih?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Dapatkan akses tim ke 5,000+ kursus teratas kapan saja, di
                  mana saja.
                </p>
                <button className="mt-4 w-full rounded-lg border border-slate-900 bg-transparent py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-100">
                  Coba PromptMastery Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-12 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <span className="text-xl font-bold tracking-tight">
                PromptMastery<span className="text-blue-600">.id</span>
              </span>
              <p className="text-sm text-slate-500">
                Platform belajar AI #1 di Indonesia.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Kursus</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="hover:underline cursor-pointer">
                  Prompt Engineering
                </li>
                <li className="hover:underline cursor-pointer">
                  Generative AI
                </li>
                <li className="hover:underline cursor-pointer">
                  Python for AI
                </li>
                <li className="hover:underline cursor-pointer">Data Science</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="hover:underline cursor-pointer">Tentang Kami</li>
                <li className="hover:underline cursor-pointer">Karir</li>
                <li className="hover:underline cursor-pointer">Blog</li>
                <li className="hover:underline cursor-pointer">Kontak</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="hover:underline cursor-pointer">Terms of Use</li>
                <li className="hover:underline cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:underline cursor-pointer">
                  Cookie Policy
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-slate-500 md:flex-row">
            <p>© 2025 PromptMastery Indonesia. All rights reserved.</p>
            <div className="flex gap-4">
              <Globe className="h-5 w-5 cursor-pointer hover:text-blue-600" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Icon for map
const Smartphone = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

export default CourseDetail;
