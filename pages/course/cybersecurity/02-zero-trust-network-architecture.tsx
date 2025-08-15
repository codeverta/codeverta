"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Users,
  Network,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldAlert,
  ShieldQuestion,
  Smartphone,
  Server,
  FileLock2,
} from "lucide-react";

export default function ZeroTrustPage() {
  const coreComponents = [
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Manajemen Identitas & Akses (IAM)",
      description:
        "Memastikan hanya pengguna terotentikasi dan berwenang yang dapat mengakses sumber daya.",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-green-500" />,
      title: "Keamanan Titik Akhir (Endpoint Security)",
      description:
        "Memverifikasi postur keamanan setiap perangkat yang mencoba terhubung ke jaringan.",
    },
    {
      icon: <Server className="h-6 w-6 text-purple-500" />,
      title: "Mesin Kebijakan (Policy Engine)",
      description:
        "Otak ZTNA yang memutuskan 'siapa', 'apa', 'kapan', 'di mana', dan 'bagaimana' akses diberikan.",
    },
    {
      icon: <FileLock2 className="h-6 w-6 text-yellow-500" />,
      title: "Segmentasi Mikro",
      description:
        "Membagi jaringan menjadi zona-zona kecil dan aman untuk membatasi pergerakan lateral penyerang.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="container mx-auto px-4 py-10">
        {/* --- Header --- */}
        <header className="mb-10 text-center">
          <Badge variant="destructive" className="mb-4">
            Materi Cybersecurity
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Arsitektur Jaringan Zero Trust (ZTNA)
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Pelajari pergeseran paradigma dari "percaya tapi verifikasi" menjadi
            "jangan pernah percaya, selalu verifikasi" untuk mengamankan aset
            digital modern.
          </p>
        </header>

        <div className="grid gap-8">
          {/* --- Pengenalan ZTNA --- */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <ShieldQuestion className="h-10 w-10 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">
                  Apa itu Arsitektur Zero Trust?
                </CardTitle>
                <CardDescription>
                  Dasar-dasar dan mengapa ini sangat penting saat ini.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-base text-gray-700 leading-relaxed">
              <p>
                Zero Trust adalah model keamanan yang didasarkan pada prinsip
                bahwa tidak ada pengguna atau perangkat, baik di dalam maupun di
                luar jaringan, yang boleh dipercaya secara default. Model ini
                menghilangkan konsep "jaringan terpercaya" (seperti jaringan
                kantor) dan "jaringan tidak terpercaya" (seperti internet).{" "}
                <br />
                <br />
                Setiap permintaan akses diperlakukan seolah-olah berasal dari
                jaringan terbuka dan harus melalui proses verifikasi yang ketat
                sebelum akses diberikan—dan bahkan setelah itu, akses yang
                diberikan adalah hak istimewa minimum (least privilege) yang
                hanya cukup untuk menyelesaikan tugas tertentu.
              </p>
            </CardContent>
          </Card>

          {/* --- Prinsip Inti --- */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <KeyRound className="h-7 w-7 text-green-600" />
                Prinsip Inti Zero Trust
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold">
                    1. Verifikasi Secara Eksplisit (Verify Explicitly)
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600">
                    Selalu otentikasi dan otorisasi berdasarkan semua titik data
                    yang tersedia, termasuk identitas pengguna, lokasi,
                    kesehatan perangkat, layanan atau beban kerja, klasifikasi
                    data, dan anomali.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold">
                    2. Gunakan Akses Hak Istimewa Minimum (Least Privilege)
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600">
                    Batasi akses pengguna hanya ke sumber daya yang mereka
                    butuhkan (Just-in-Time dan Just-Enough-Access). Ini membantu
                    meminimalkan pergerakan lateral penyerang jika akun pengguna
                    berhasil disusupi.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold">
                    3. Asumsikan Adanya Pelanggaran (Assume Breach)
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600">
                    Minimalkan radius ledakan dan segmentasikan akses.
                    Verifikasi enkripsi ujung-ke-ujung dan gunakan analitik
                    untuk mendapatkan visibilitas, mendeteksi ancaman, dan
                    meningkatkan pertahanan. Asumsikan bahwa penyerang sudah ada
                    di dalam jaringan Anda.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* --- Komponen Inti --- */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Network className="h-7 w-7 text-purple-600" />
                Komponen Inti Implementasi ZTNA
              </CardTitle>
              <CardDescription>
                Teknologi yang menjadi fondasi arsitektur Zero Trust.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreComponents.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 border rounded-lg bg-slate-50"
                  >
                    <div className="flex-shrink-0 mr-4">{component.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {component.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {component.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* --- Manfaat --- */}
          <Card className="bg-green-50 border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3 text-green-800">
                <ShieldCheck className="h-7 w-7" />
                Manfaat Menerapkan ZTNA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-green-900">
                  <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                  Mengurangi permukaan serangan secara signifikan.
                </li>
                <li className="flex items-center gap-3 text-green-900">
                  <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                  Mencegah pergerakan lateral penyerang di dalam jaringan.
                </li>
                <li className="flex items-center gap-3 text-green-900">
                  <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                  Memfasilitasi kerja jarak jauh dan adopsi cloud yang aman.
                </li>
                <li className="flex items-center gap-3 text-green-900">
                  <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                  Memberikan visibilitas dan kontrol yang lebih baik atas akses
                  data.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* --- Navigasi --- */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Materi Sebelumnya
            </Button>
            <Button>
              Materi Selanjutnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
