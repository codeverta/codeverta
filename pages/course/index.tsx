import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Users, BookOpen, Search, Filter, Calendar } from "lucide-react";
import Layout from "@/components/layout/Landing";
import Link from "next/link";
import { withI18n } from "@/lib/withi18n";
export const getStaticProps = withI18n(["common"]);

const KelasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Data contoh kelas-kelas
  const kelasList = [
    {
      id: 1,
      nama: "Web Development Fundamentals",
      url: "/course/fundamental-web",
      kategori: "Programming",
      instruktur: "Rabih Utomo",
      durasi: "12 minggu",
      peserta: 85,
      harga: "Free",
      level: "Beginner",
      rating: 4.8,
      deskripsi:
        "Pelajari dasar-dasar pengembangan web dengan HTML, CSS, dan JavaScript",
      jadwal: "Senin & Rabu, 19:00-21:00",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&crop=center",
    },
    // {
    //   id: 2,
    //   nama: "UI/UX Design Mastery",
    //   kategori: "Design",
    //   instruktur: "Sari Dewi",
    //   durasi: "8 minggu",
    //   peserta: 62,
    //   harga: "Free",
    //   level: "Intermediate",
    //   rating: 4.9,
    //   deskripsi:
    //     "Kuasai prinsip-prinsip desain UI/UX dengan tools modern seperti Figma",
    //   jadwal: "Selasa & Kamis, 20:00-22:00",
    //   image:
    //     "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&crop=center",
    // },
    // {
    //   id: 3,
    //   nama: "React & Next.js Complete Course",
    //   kategori: "Programming",
    //   instruktur: "Budi Santoso",
    //   durasi: "16 minggu",
    //   peserta: 124,
    //   harga: "Free",
    //   level: "Advanced",
    //   rating: 4.7,
    //   deskripsi:
    //     "Bangun aplikasi web modern dengan React dan Next.js framework",
    //   jadwal: "Sabtu & Minggu, 09:00-12:00",
    //   image:
    //     "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&crop=center",
    // },
    // {
    //   id: 4,
    //   nama: "Digital Marketing Strategy",
    //   kategori: "Marketing",
    //   instruktur: "Maya Putri",
    //   durasi: "10 minggu",
    //   peserta: 78,
    //   harga: "Free",
    //   level: "Intermediate",
    //   rating: 4.6,
    //   deskripsi: "Strategi pemasaran digital yang efektif untuk bisnis modern",
    //   jadwal: "Rabu & Jumat, 19:30-21:30",
    //   image:
    //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
    // },
    // {
    //   id: 5,
    //   nama: "Data Science with Python",
    //   kategori: "Data Science",
    //   instruktur: "Dr. Andi Wijaya",
    //   durasi: "14 minggu",
    //   peserta: 96,
    //   harga: "Free",
    //   level: "Intermediate",
    //   rating: 4.8,
    //   deskripsi: "Analisis data dan machine learning menggunakan Python",
    //   jadwal: "Senin & Kamis, 18:00-20:30",
    //   image:
    //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
    // },
    // {
    //   id: 6,
    //   nama: "Mobile App Development",
    //   kategori: "Programming",
    //   instruktur: "Reza Firmansyah",
    //   durasi: "12 minggu",
    //   peserta: 67,
    //   harga: "Free",
    //   level: "Intermediate",
    //   rating: 4.5,
    //   deskripsi: "Buat aplikasi mobile dengan React Native dan Flutter",
    //   jadwal: "Selasa & Sabtu, 10:00-13:00",
    //   image:
    //     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center",
    // },
    {
      id: 6,
      nama: "AI Engineer",
      kategori: "Programming",
      url: "/course/ai-engineer",
      instruktur: "Rabih Utomo",
      durasi: "12 minggu",
      peserta: 67,
      harga: "Free",
      level: "Advanced",
      rating: 4.5,
      deskripsi:
        "Pelajari cara membangun sistem AI yang canggih menggunakan Python dan TensorFlow",
      jadwal: "Selasa & Sabtu, 10:00-13:00",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 6,
      nama: "Cybersecurity Essentials",
      url: "/course/cybersecurity",
      kategori: "Programming",
      instruktur: "Rabih Utomo",
      durasi: "12 minggu",
      peserta: 67,
      harga: "Free",
      level: "Advanced",
      rating: 4.5,
      deskripsi:
        "Pelajari dasar-dasar keamanan siber dan cara melindungi sistem Anda dari ancaman",
      jadwal: "Selasa & Sabtu, 10:00-13:00",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
    },
  ];

  const categories = [
    "all",
    "Programming",
    "Design",
    "Marketing",
    "Data Science",
  ];

  const filteredKelas = kelasList.filter((kelas) => {
    const matchesSearch =
      kelas.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.instruktur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || kelas.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kelas Tersedia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilih kelas yang sesuai dengan minat dan tingkat keahlian Anda.
            Semua kelas dipimpin oleh instruktur berpengalaman.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari kelas, instruktur, atau kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Kategori</option>
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredKelas.length}
                </p>
                <p className="text-gray-600">Kelas Tersedia</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredKelas.reduce((sum, kelas) => sum + kelas.peserta, 0)}
                </p>
                <p className="text-gray-600">Total Peserta</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
                <p className="text-gray-600">Rating Rata-rata</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kelas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKelas.map((kelas) => (
            <Card
              key={kelas.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={kelas.image}
                  alt={kelas.nama}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getLevelColor(kelas.level)}>
                    {kelas.level}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {kelas.kategori}
                  </Badge>
                  <div className="flex items-center text-sm text-yellow-600">
                    <span className="mr-1">⭐</span>
                    {kelas.rating}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {kelas.nama}
                </CardTitle>
                <CardDescription className="text-sm">
                  {kelas.deskripsi}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="font-medium">{kelas.instruktur}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{kelas.durasi}</span>
                    <span className="mx-2">•</span>
                    <span>{kelas.peserta} peserta</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{kelas.jadwal}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-lg font-bold text-blue-600">
                      {kelas.harga}
                    </span>
                    <Link href={kelas.url} passHref>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Mulai Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredKelas.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tidak ada kelas yang ditemukan
            </h3>
            <p className="text-gray-600">
              Coba ubah kriteria pencarian atau filter Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
KelasPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
export default KelasPage;
