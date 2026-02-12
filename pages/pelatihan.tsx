import React from "react";
import {
  BookOpen,
  Code,
  Box,
  Globe,
  Star,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Landing";
import {
  Bot,
  Code2,
  Globe2,
  GraduationCap,
  Languages,
  Sparkles,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import fs from "fs";
import path from "path";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Clock,
  Monitor,
  Smartphone,
  Gamepad2,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Course {
  id: string;
  title: string;
  ageGroup: string;
  duration: string;
  sessions: string;
  description: string;
  tools: string[];
  outcomes: string[];
  image: string;
  icon: React.ReactNode;
}

const courses: Course[] = [
  {
    id: "roblox-2d",
    title: "2D Games Development with Roblox",
    ageGroup: "8-12",
    duration: "90 menit",
    sessions: "20 sesi",
    description:
      "Siswa akan belajar cara membuat dan memprogram animasi dan game sederhana melalui berbagai tugas dan proyek. Mempelajari elemen dan konsep dasar game dan menerapkan pengetahuan ini untuk membuat proyek game mereka sendiri.",
    tools: ["Computer", "Mouse", "Internet"],
    outcomes: [
      "Memahami alur proses pengembangan game",
      "Animasi sederhana, game (platformer, flappy bird, penemuan virus, dll)",
      "Desain 3D dengan Roblox Studio",
    ],
    image: "/images/roblox-2d-games.jpg",
    icon: <Gamepad2 className="w-5 h-5" />,
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps Development",
    ageGroup: "8-12",
    duration: "90 menit",
    sessions: "20 sesi",
    description:
      "Siswa akan mempelajari dasar-dasar pemrograman situs web menggunakan HTML & CSS untuk membuat situs web statis sederhana. Mereka juga akan belajar tentang struktur situs web.",
    tools: ["Computer", "Mouse", "Internet"],
    outcomes: [
      "Memahami alur proses pengembangan aplikasi",
      "Membuat aplikasi dan game seluler",
      "Pengembangan keterampilan Block Coding dan desain pada tingkat lanjut",
    ],
    image: "/images/mobile-apps.jpg",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "roblox-1",
    title: "Roblox I",
    ageGroup: "8-12",
    duration: "90 menit",
    sessions: "20 sesi",
    description:
      "Siswa belajar tentang bahasa pemrograman LUA dan membuat game di Roblox Studio. Siswa akan belajar dari dasar dan mereka dapat membuat game Roblox mereka sendiri.",
    tools: ["Computer", "Mouse", "Internet"],
    outcomes: [
      "Game interaktif di Roblox seperti game mengumpulkan hadiah, game Obby, game Teleporter, dll.",
    ],
    image: "/images/roblox-1.jpg",
    icon: <Gamepad2 className="w-5 h-5" />,
  },
  {
    id: "roblox-2",
    title: "Roblox II",
    ageGroup: "13-16",
    duration: "90 menit",
    sessions: "20 sesi",
    description:
      "Siswa akan terus belajar coding menggunakan pemrograman LUA dan lebih fokus pada desain 3D untuk membuat game profesional (menambahkan efek dan model 3D menggunakan blender).",
    tools: ["Computer", "Mouse", "Internet"],
    outcomes: [
      "Memahami alur proses pengembangan game 3D",
      "Membuat game Roblox",
      "Pengembangan keterampilan pengkodean dan desain tekstual",
    ],
    image: "/images/roblox-2.jpg",
    icon: <Box className="w-5 h-5" />,
  },
  {
    id: "website-dev",
    title: "Website Development",
    ageGroup: "13-16",
    duration: "90 menit",
    sessions: "20 sesi",
    description:
      "Siswa akan belajar membuat situs web mereka sendiri dan membuat kode tata letak situs web. Mereka akan belajar membuat halaman web menggunakan HTML dan CSS. Dalam kursus ini, mereka juga akan belajar tentang struktur situs web dan cara kerjanya.",
    tools: ["Computer", "Mouse", "Internet"],
    outcomes: [
      "Mempelajari sintaksis HTML, CSS dan PHP dan menggunakannya dalam sebuah kode",
      "Membuat situs web statis dengan database",
      "Pengembangan keterampilan pengkodean tekstual dan desain pada tingkat dasar",
    ],
    image: "/images/website-dev.jpg",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    id: "2d-3d-design",
    title: "2D & 3D Design",
    ageGroup: "13-16",
    duration: "90 menit",
    sessions: "20 sesi",
    description:
      "Siswa akan belajar membuat desain 2D dan 3D, serta mempelajari konsep pemrograman untuk membuat model 2D dan 3D. Siswa akan belajar bagaimana desain dan pemrograman saling berhubungan.",
    tools: ["Computer", "Mouse", "Internet"],
    outcomes: [
      "Keterampilan desain dan pengembangan kreativitas",
      "Membuat desain 2D dan 3D",
      "Pengembangan keterampilan pengkodean pada tingkat dasar",
    ],
    image: "/images/2d-3d-design.jpg",
    icon: <Box className="w-5 h-5" />,
  },
];

export async function getStaticProps({ locale }) {
  const filePath = path.join(process.cwd(), "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  const projects = data.projects || [];

  return {
    props: {
      projects: projects.slice(0, 3),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const formSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
  program: z.string().min(1, "Pilih salah satu program"),
});

const CoursePage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeAgeGroup, setActiveAgeGroup] = useState<
    "all" | "8-12" | "13-16"
  >("all");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Pendaftaran Terkirim! Kami akan menghubungi via WhatsApp.");
        reset();
        setOpen(false);
      }
    } catch (error) {
      alert("Gagal mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses =
    activeAgeGroup === "all"
      ? courses
      : courses.filter((course) => course.ageGroup === activeAgeGroup);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-pink-500 uppercase mb-2">
                Explore Our Programs
              </h2>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                <span className="text-slate-900">Kursus</span>
                <span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                  Unggulan Kami
                </span>
              </h1>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed max-w-md">
              Kurikulum internasional yang dirancang khusus untuk mengasah
              kreativitas melalui
              <span className="font-semibold text-slate-900">
                {" "}
                project-based learning
              </span>
              . Mulai petualangan digital mereka hari ini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-7 text-lg rounded-2xl shadow-xl">
                    Daftar Sekarang
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[450px] rounded-3xl p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                      Bergabung Sekarang
                    </DialogTitle>
                  </DialogHeader>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 pt-4"
                  >
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">
                        Nama Penanggung Jawab
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="Contoh: Budi Santoso"
                        className="rounded-xl"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">
                        Nomor WhatsApp
                      </label>
                      <Input
                        {...register("whatsapp")}
                        type="tel"
                        placeholder="0812345xxx"
                        className="rounded-xl"
                      />
                      {errors.whatsapp && (
                        <p className="text-xs text-red-500">
                          {errors.whatsapp.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">
                        Email Aktif
                      </label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="budi@email.com"
                        className="rounded-xl"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">
                        Pilih Program
                      </label>
                      <Select onValueChange={(val) => setValue("program", val)}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Pilih tingkat kursus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Little Koders (4-7 Tahun)">
                            Little Koders (4-7 Thn)
                          </SelectItem>
                          <SelectItem value="Junior Koders (8-16 Tahun)">
                            Junior Koders (8-16 Thn)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.program && (
                        <p className="text-xs text-red-500">
                          {errors.program.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 py-7 rounded-2xl font-bold text-lg text-white shadow-lg shadow-pink-100 transition-all"
                      disabled={loading}
                    >
                      {loading ? "Memproses..." : "Konfirmasi Pendaftaran"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Link href="#curriculum">
                <Button
                  variant="outline"
                  className="px-8 py-7 text-lg rounded-2xl border-2"
                >
                  Lihat Kurikulum
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="group relative bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src="/images/little-koders.jpg"
                  alt="Kelas Anak-anak"
                  className="w-full h-30 object-cover transform group-hover:scale-110 transition-duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-pink-600 font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                  4-7 TAHUN
                </div>
              </div>
              <div className="px-2 pb-2">
                <h3 className="font-bold text-xl text-slate-900">
                  Little Koders
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  Dasar logika & kreativitas digital.
                </p>
                <div className="w-full h-1 bg-pink-100 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-pink-500" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src="/images/junior-koders.jpg"
                  alt="Kelas Remaja"
                  className="w-full h-30 object-cover transform group-hover:scale-110 transition-duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-600 font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                  8-16 TAHUN
                </div>
              </div>
              <div className="px-2 pb-2">
                <h3 className="font-bold text-xl text-slate-900">
                  Junior Koders
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  Pemrograman tingkat lanjut & AI.
                </p>
                <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Little Koders Detail Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/images/little-koders.jpg"
                alt="Kelas Anak-anak"
                className="rounded-3xl shadow-2xl w-full max-h-[400px] object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <Badge className="bg-pink-500 text-white px-4 py-1 text-sm">
                4-7 Tahun
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900">
                Kelas Anak-anak
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Kami membekali generasi muda dengan bahasa masa depan. Melalui
                kurikulum pemrograman yang interaktif, siswa tidak hanya belajar
                coding, tapi juga mengasah ketajaman logika dan kemampuan
                pemecahan masalah secara natural. Dengan bimbingan mentor ahli
                dan metode hands-on learning, kami memastikan setiap sesi
                menjadi petualangan belajar yang seru.
              </p>
              <div className="pt-6 border-t border-pink-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  The Next-Gen Growth Map
                </h4>
                <p className="text-gray-500 text-sm">
                  Karena investasi terbaik adalah pendidikan yang relevan dengan
                  perkembangan zaman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kelas Remaja Detail Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-500 text-white px-4 py-1 text-sm">
                8-16 Tahun
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900">Kelas Remaja</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Dirancang khusus untuk rentang usia 8 hingga 16 tahun, program
                ini mengubah imajinasi menjadi aplikasi nyata. Siswa akan
                bereksplorasi mulai dari visual coding hingga menguasai syntax
                murni (Python & JS). Fokus kami adalah project-based
                learning—memastikan setiap siswa pulang dengan karya digital
                yang siap dipamerkan.
              </p>
              <div className="pt-6 border-t border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Future Leadership Blueprint
                </h4>
                <p className="text-gray-500 text-sm">
                  Kami berkomitmen menghadirkan kualitas pendidikan yang sepadan
                  dengan potensi besar mereka.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/images/junior-koders.jpg"
                alt="Kelas Remaja"
                className="rounded-3xl shadow-2xl w-full max-h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Offered Section */}
      <section
        id="curriculum"
        className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-50 to-cyan-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-500 mb-2">
              We believe your child deserve the best education.
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Programs Offered:
            </h2>

            {/* Age Group Filter */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={activeAgeGroup === "all" ? "default" : "outline"}
                onClick={() => setActiveAgeGroup("all")}
                className={activeAgeGroup === "all" ? "bg-gray-900" : ""}
              >
                Semua
              </Button>
              <Button
                variant={activeAgeGroup === "8-12" ? "default" : "outline"}
                onClick={() => setActiveAgeGroup("8-12")}
                className={activeAgeGroup === "8-12" ? "bg-blue-500" : ""}
              >
                8 - 12 Tahun
              </Button>
              <Button
                variant={activeAgeGroup === "13-16" ? "default" : "outline"}
                onClick={() => setActiveAgeGroup("13-16")}
                className={activeAgeGroup === "13-16" ? "bg-purple-500" : ""}
              >
                13 - 16 Tahun
              </Button>
            </div>

            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Badge
                variant="outline"
                className="border-green-500 text-green-600"
              >
                Available Online & Offline
              </Badge>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-0 shadow-lg"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={`${
                        course.ageGroup === "8-12"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      } text-white`}
                    >
                      {course.ageGroup} Tahun
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        course.ageGroup === "8-12"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {course.icon}
                    </div>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration} / sesi • {course.sessions}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Monitor className="w-4 h-4" />
                      <span>{course.tools.length} Tools</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        course.ageGroup === "8-12"
                          ? "text-blue-500 hover:text-blue-600"
                          : "text-purple-500 hover:text-purple-600"
                      } flex items-center gap-1`}
                    >
                      Detail <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Detail Dialog */}
      <Dialog
        open={!!selectedCourse}
        onOpenChange={() => setSelectedCourse(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={`${
                        selectedCourse.ageGroup === "8-12"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      } text-white`}
                    >
                      {selectedCourse.ageGroup} Tahun
                    </Badge>
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold">
                  {selectedCourse.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedCourse.duration} / sesi
                  </span>
                  <span>•</span>
                  <span>{selectedCourse.sessions}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Tentang Kursus:
                  </h4>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Tools Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.tools.map((tool, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Monitor className="w-3 h-3" />
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hasil:</h4>
                  <ul className="space-y-2">
                    {selectedCourse.outcomes.map((outcome, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursePage;

CoursePage.getLayout = function getLayout(page) {
  return (
    <Layout
      seo={{
        title: "Pelatihan IT untuk Anak dan Remaja",
        description:
          "Kelas privat coding, AI, dan 3D Design untuk anak-anak dan remaja yang diajarkan secara bilingual oleh Samantha Meliora.",
        keywords:
          "pelatihan IT anak, kursus coding remaja, kelas AI untuk anak, belajar 3D design, tutor IT privat",
      }}
    >
      {page}
    </Layout>
  );
};
