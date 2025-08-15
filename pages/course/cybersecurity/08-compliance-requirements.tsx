// File: app/cybersecurity/compliance/page.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  FileText,
  Banknote,
  Hospital,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

export default function ComplianceCoursePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          Materi Kursus: Standar Kepatuhan Cybersecurity
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Pahami pilar-pilar kepatuhan digital yang paling penting: GDPR, HIPAA,
          dan SOX. Pelajari mengapa standar ini krusial untuk melindungi data
          dan menjaga integritas bisnis.
        </p>
      </header>

      <main>
        <Tabs defaultValue="gdpr" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="gdpr">
              <Shield className="mr-2 h-4 w-4" /> GDPR
            </TabsTrigger>
            <TabsTrigger value="hipaa">
              <Hospital className="mr-2 h-4 w-4" /> HIPAA
            </TabsTrigger>
            <TabsTrigger value="sox">
              <FileText className="mr-2 h-4 w-4" /> SOX
            </TabsTrigger>
          </TabsList>

          {/* Materi GDPR */}
          <TabsContent value="gdpr">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center">
                  <Shield className="mr-3 h-8 w-8 text-blue-500" />
                  GDPR: General Data Protection Regulation
                </CardTitle>
                <CardDescription>
                  Regulasi perlindungan data pribadi untuk semua individu di
                  dalam Uni Eropa (EU) dan Wilayah Ekonomi Eropa (EEA).
                </CardDescription>
                <div className="pt-2">
                  <Badge variant="secondary" className="mr-2">
                    Berlaku untuk: Data Warga EU
                  </Badge>
                  <Badge variant="secondary">
                    Fokus: Privasi & Perlindungan Data
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Prinsip Utama GDPR (Interaktif)
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        1. Lawfulness, Fairness, and Transparency
                      </AccordionTrigger>
                      <AccordionContent>
                        Data harus diproses secara sah, adil, dan transparan.
                        Subjek data harus tahu bagaimana data mereka
                        dikumpulkan, digunakan, dan diproses.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>2. Purpose Limitation</AccordionTrigger>
                      <AccordionContent>
                        Data hanya boleh dikumpulkan untuk tujuan yang spesifik,
                        eksplisit, dan sah, serta tidak boleh diproses lebih
                        lanjut dengan cara yang tidak sesuai dengan tujuan
                        tersebut.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>3. Data Minimisation</AccordionTrigger>
                      <AccordionContent>
                        Data yang dikumpulkan harus relevan dan terbatas pada
                        apa yang diperlukan sehubungan dengan tujuan
                        pemrosesannya. Jangan kumpulkan data yang tidak perlu.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>4. Accuracy</AccordionTrigger>
                      <AccordionContent>
                        Data pribadi harus akurat dan selalu diperbarui.
                        Langkah-langkah yang wajar harus diambil untuk
                        memastikan data yang tidak akurat dihapus atau
                        diperbaiki tanpa penundaan.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>5. Storage Limitation</AccordionTrigger>
                      <AccordionContent>
                        Data pribadi tidak boleh disimpan lebih lama dari yang
                        diperlukan untuk tujuan pemrosesan data tersebut.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>
                        6. Integrity and Confidentiality
                      </AccordionTrigger>
                      <AccordionContent>
                        Data harus diproses dengan cara yang menjamin keamanan
                        yang memadai, termasuk perlindungan terhadap pemrosesan
                        yang tidak sah, kehilangan, perusakan, atau kerusakan
                        yang tidak disengaja.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <Card className="bg-gray-50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>
                      Studi Kasus: Pelanggaran GDPR oleh "SocialNet"
                    </CardTitle>
                    <CardDescription>
                      Sebuah perusahaan media sosial fiktif.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Skenario:</strong> SocialNet meluncurkan fitur
                      kuis kepribadian baru. Untuk mengikuti kuis, pengguna
                      tanpa sadar memberikan izin kepada aplikasi pihak ketiga
                      untuk mengakses tidak hanya data profil mereka, tetapi
                      juga seluruh daftar teman dan pesan pribadi mereka. Data
                      ini kemudian dijual kepada pengiklan tanpa persetujuan
                      eksplisit.
                    </p>
                    <p>
                      <strong>Pelanggaran:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Kurangnya Persetujuan (Consent):</strong>{" "}
                        Persetujuan yang diberikan tidak spesifik dan tidak
                        jelas.
                      </li>
                      <li>
                        <strong>Purpose Limitation:</strong> Data digunakan
                        untuk tujuan (penjualan ke pengiklan) yang berbeda dari
                        tujuan awal (kuis kepribadian).
                      </li>
                      <li>
                        <strong>Data Minimisation:</strong> Mengambil data pesan
                        pribadi dan daftar teman adalah tindakan berlebihan
                        untuk sebuah kuis.
                      </li>
                    </ul>
                    <p>
                      <strong>Konsekuensi:</strong> SocialNet didenda €50 Juta
                      karena gagal mendapatkan persetujuan yang sah dan
                      memproses data di luar tujuan yang dinyatakan, yang
                      berdampak pada jutaan pengguna Uni Eropa.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
              <CardFooter>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Sanksi & Denda</AlertTitle>
                  <AlertDescription>
                    Denda dapat mencapai hingga €20 juta atau 4% dari omset
                    tahunan global perusahaan, mana yang lebih tinggi.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Materi HIPAA */}
          <TabsContent value="hipaa">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center">
                  <Hospital className="mr-3 h-8 w-8 text-red-500" />
                  HIPAA: Health Insurance Portability and Accountability Act
                </CardTitle>
                <CardDescription>
                  Undang-undang federal AS yang menetapkan standar nasional
                  untuk melindungi data kesehatan sensitif pasien agar tidak
                  diungkapkan tanpa persetujuan atau sepengetahuan pasien.
                </CardDescription>
                <div className="pt-2">
                  <Badge variant="secondary" className="mr-2">
                    Berlaku untuk: Industri Kesehatan AS
                  </Badge>
                  <Badge variant="secondary">
                    Fokus: Perlindungan Data Kesehatan (PHI)
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Aturan Utama HIPAA (Interaktif)
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>1. The Privacy Rule</AccordionTrigger>
                      <AccordionContent>
                        Menetapkan standar nasional untuk melindungi rekam medis
                        dan informasi kesehatan pribadi lainnya (dikenal sebagai
                        Protected Health Information - PHI). Memberikan pasien
                        kontrol lebih besar atas data kesehatan mereka.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>2. The Security Rule</AccordionTrigger>
                      <AccordionContent>
                        Menetapkan standar untuk perlindungan PHI yang disimpan
                        atau ditransfer dalam bentuk elektronik (e-PHI).
                        Mengharuskan adanya pengamanan administratif, fisik, dan
                        teknis.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        3. The Breach Notification Rule
                      </AccordionTrigger>
                      <AccordionContent>
                        Mengharuskan entitas yang tercakup (Covered Entities)
                        dan rekan bisnis (Business Associates) untuk
                        memberitahukan individu jika terjadi pelanggaran data
                        PHI mereka yang tidak aman.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <Card className="bg-gray-50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>
                      Studi Kasus: Kelalaian di Rumah Sakit "City General"
                    </CardTitle>
                    <CardDescription>
                      Sebuah rumah sakit fiktif yang sibuk.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Skenario:</strong> Seorang karyawan di bagian
                      pendaftaran rumah sakit merasa penasaran dengan kondisi
                      medis seorang selebriti lokal yang dirawat. Menggunakan
                      akses loginnya, karyawan tersebut membuka rekam medis
                      elektronik (EHR) selebriti tersebut, melihat diagnosisnya,
                      dan kemudian menceritakannya kepada teman-temannya.
                    </p>
                    <p>
                      <strong>Pelanggaran:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Akses Tidak Sah:</strong> Karyawan mengakses PHI
                        tanpa adanya kebutuhan pekerjaan yang sah (bukan untuk
                        perawatan, pembayaran, atau operasi kesehatan). Ini
                        melanggar Privacy Rule.
                      </li>
                      <li>
                        <strong>Kegagalan Kontrol Akses:</strong> Sistem rumah
                        sakit gagal mencegah atau mendeteksi akses yang tidak
                        pantas ini secara real-time, menunjukkan kelemahan dalam
                        pengamanan administratif dan teknis di bawah Security
                        Rule.
                      </li>
                    </ul>
                    <p>
                      <strong>Konsekuensi:</strong> Karyawan tersebut dipecat
                      dan menghadapi tuntutan hukum. Rumah sakit dikenai denda
                      sebesar $650,000 oleh U.S. Department of Health and Human
                      Services karena gagal menerapkan kebijakan dan prosedur
                      yang wajar untuk melindungi PHI.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
              <CardFooter>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Sanksi & Denda</AlertTitle>
                  <AlertDescription>
                    Denda bervariasi dari $100 hingga $50,000 per pelanggaran
                    (atau per catatan), dengan batas maksimum tahunan $1.5 juta.
                    Hukuman pidana juga dimungkinkan.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Materi SOX */}
          <TabsContent value="sox">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center">
                  <FileText className="mr-3 h-8 w-8 text-green-500" />
                  SOX: Sarbanes-Oxley Act
                </CardTitle>
                <CardDescription>
                  Undang-undang federal AS yang bertujuan untuk melindungi
                  investor dengan meningkatkan akurasi dan keandalan
                  pengungkapan keuangan perusahaan publik.
                </CardDescription>
                <div className="pt-2">
                  <Badge variant="secondary" className="mr-2">
                    Berlaku untuk: Perusahaan Publik di AS
                  </Badge>
                  <Badge variant="secondary">
                    Fokus: Integritas & Keamanan Data Keuangan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Kewajiban IT di Bawah SOX (Interaktif)
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        Section 302: Corporate Responsibility for Financial
                        Reports
                      </AccordionTrigger>
                      <AccordionContent>
                        CEO dan CFO harus secara pribadi mengesahkan keakuratan
                        laporan keuangan. Ini secara tidak langsung menuntut
                        adanya kontrol IT yang kuat untuk memastikan data yang
                        menjadi dasar laporan tersebut akurat dan tidak dapat
                        diubah secara tidak sah.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Section 404: Management Assessment of Internal Controls
                      </AccordionTrigger>
                      <AccordionContent>
                        Manajemen harus membuat dan memelihara kontrol internal
                        yang memadai untuk pelaporan keuangan. Departemen IT
                        harus menyediakan bukti bahwa kontrol keamanan IT
                        (seperti kontrol akses, manajemen perubahan, dan backup)
                        efektif.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        Pentingnya Kontrol Akses & Keamanan Data
                      </AccordionTrigger>
                      <AccordionContent>
                        SOX mengharuskan perusahaan untuk melindungi catatan
                        keuangan dari akses tidak sah. Ini berarti menerapkan
                        kebijakan "least privilege", memantau akses ke database
                        keuangan, dan memastikan jejak audit (audit trail) yang
                        lengkap untuk setiap perubahan data.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <Card className="bg-gray-50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>
                      Studi Kasus: Kegagalan Kontrol Internal di "Global Corp"
                    </CardTitle>
                    <CardDescription>
                      Sebuah perusahaan manufaktur publik fiktif.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Skenario:</strong> Tim IT di Global Corp tidak
                      memiliki proses manajemen perubahan (change management)
                      yang formal. Seorang developer, saat memperbaiki bug,
                      secara tidak sengaja mengubah logika kalkulasi pendapatan
                      di sistem ERP utama tanpa melalui pengujian atau
                      persetujuan. Perubahan ini tidak terdeteksi selama dua
                      bulan.
                    </p>
                    <p>
                      <strong>Pelanggaran:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Kegagalan Kontrol Perubahan:</strong> Tidak
                        adanya proses untuk meninjau, menguji, dan menyetujui
                        perubahan pada sistem keuangan kritis merupakan
                        kelemahan besar dalam kontrol internal (pelanggaran
                        Section 404).
                      </li>
                      <li>
                        <strong>Integritas Data:</strong> Karena perubahan yang
                        tidak sah, data keuangan yang dihasilkan menjadi tidak
                        akurat, membahayakan kebenaran laporan keuangan yang
                        harus disahkan oleh CEO/CFO (risiko di bawah Section
                        302).
                      </li>
                    </ul>
                    <p>
                      <strong>Konsekuensi:</strong> Auditor eksternal menemukan
                      kelemahan material ini. Akibatnya, Global Corp harus
                      menunda rilis laporan keuangannya, melakukan audit ulang
                      yang mahal, dan melaporkan kelemahan kontrol internal
                      kepada publik. Harga saham perusahaan turun drastis dan
                      kepercayaan investor runtuh.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
              <CardFooter>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Sanksi & Denda</AlertTitle>
                  <AlertDescription>
                    Sanksi bisa sangat berat, termasuk denda jutaan dolar bagi
                    perusahaan dan denda pribadi serta hukuman penjara hingga 20
                    tahun bagi eksekutif yang terbukti bersalah.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
