// File: app/cybersecurity/network-monitoring/page.tsx

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
  Network,
  FileSearch,
  ShieldCheck,
  AreaChart,
  Bot,
  LocateFixed,
  Eye,
} from "lucide-react";

export default function NetworkMonitoringPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          Materi Kursus: Network Monitoring & Analysis
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Pelajari cara melihat, memahami, dan menganalisis apa yang terjadi di
          dalam jaringan Anda. Ini adalah mata dan telinga seorang profesional
          cybersecurity.
        </p>
      </header>

      <main className="space-y-12">
        {/* Core Concepts Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Konsep-Konsep Fundamental
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-4xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                <FileSearch className="mr-3 h-5 w-5 text-blue-500" /> Analisis
                Paket (Packet Analysis)
              </AccordionTrigger>
              <AccordionContent>
                Ini adalah proses menangkap dan memeriksa data mentah yang
                melintasi jaringan, paket demi paket. Analisis ini memberikan
                detail paling mendalam tentang komunikasi jaringan.
                <br />
                <br />
                <strong>Analogi:</strong> Seperti membaca setiap surat yang
                dikirim melalui kantor pos untuk memahami isi percakapannya.
                <br />
                <strong>Alat Utama:</strong> Wireshark.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">
                <AreaChart className="mr-3 h-5 w-5 text-green-500" /> Analisis
                Arus (Flow Analysis)
              </AccordionTrigger>
              <AccordionContent>
                Berbeda dengan analisis paket yang melihat "isi surat", analisis
                arus melihat "metadata pengiriman": siapa mengirim ke siapa,
                kapan, dan berapa banyak. Ini sangat efisien untuk mendapatkan
                gambaran besar pola lalu lintas jaringan.
                <br />
                <br />
                <strong>Analogi:</strong> Seperti melihat catatan logistik
                kantor pos tanpa membuka suratnya.
                <br />
                <strong>Teknologi Umum:</strong> NetFlow, sFlow, IPFIX.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">
                <ShieldCheck className="mr-3 h-5 w-5 text-red-500" /> Intrusion
                Detection System (IDS/IPS)
              </AccordionTrigger>
              <AccordionContent>
                Sistem ini bekerja seperti alarm keamanan untuk jaringan Anda.
                IDS/IPS memantau lalu lintas jaringan untuk mencari tanda-tanda
                aktivitas berbahaya atau pelanggaran kebijakan.
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    <strong>IDS (Detection):</strong> Hanya mendeteksi dan
                    memberi peringatan (alert).
                  </li>
                  <li>
                    <strong>IPS (Prevention):</strong> Dapat secara aktif
                    memblokir lalu lintas yang dicurigai berbahaya.
                  </li>
                </ul>
                <strong>Alat Utama:</strong> Snort, Suricata.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">
                <Bot className="mr-3 h-5 w-5 text-yellow-500" /> Analisis Log &
                SIEM
              </AccordionTrigger>
              <AccordionContent>
                Setiap perangkat di jaringan (firewall, server, router)
                menghasilkan log. Menganalisis log ini sangat penting untuk
                investigasi insiden.
                <br />
                <br />
                <strong>
                  SIEM (Security Information and Event Management)
                </strong>{" "}
                adalah platform terpusat yang mengumpulkan, menghubungkan
                (correlate), dan menganalisis data log dari berbagai sumber
                untuk mendeteksi ancaman secara cerdas.
                <br />
                <strong>Alat Utama:</strong> Splunk, ELK Stack (Elasticsearch,
                Logstash, Kibana).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Tools of the Trade Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Alat Utama Seorang Analis Jaringan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Wireshark</CardTitle>
                <CardDescription>The Packet Sniffer</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>
                  Standar de-facto untuk analisis protokol jaringan.
                  Memungkinkan Anda melihat lalu lintas jaringan di tingkat
                  mikroskopis.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">
                  Use Case: Troubleshooting, Forensik
                </Badge>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Nmap</CardTitle>
                <CardDescription>The Network Mapper</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>
                  Alat esensial untuk penemuan jaringan (network discovery) dan
                  audit keamanan. Dapat mengidentifikasi host, layanan, dan
                  sistem operasi.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">
                  Use Case: Reconnaissance, Inventarisasi
                </Badge>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Snort</CardTitle>
                <CardDescription>The IDS/IPS</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>
                  Sistem deteksi intrusi berbasis signature yang paling banyak
                  digunakan di dunia. Mampu melakukan analisis lalu lintas
                  secara real-time.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">
                  Use Case: Deteksi Ancaman, Keamanan Perimeter
                </Badge>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>ELK Stack</CardTitle>
                <CardDescription>The Log Manager</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>
                  Kombinasi kuat dari Elasticsearch, Logstash, dan Kibana untuk
                  manajemen dan visualisasi log terpusat (SIEM).
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">
                  Use Case: Incident Response, Visualisasi Data
                </Badge>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Practical Walkthrough Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Studi Kasus Interaktif: Misteri Server yang Lambat
          </h2>
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <LocateFixed className="mr-3" /> Skenario
              </CardTitle>
              <CardDescription>
                Pengguna mengeluh bahwa server file internal (`10.10.20.5`)
                sangat lambat dan sering tidak responsif. Tim helpdesk
                mengonfirmasi tidak ada masalah hardware.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg flex items-center mb-2">
                  <span className="flex h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                  Langkah 1: Network Discovery dengan Nmap
                </h4>
                <p className="mb-3">
                  Kita mulai dengan memetakan server untuk melihat apakah ada
                  sesuatu yang tidak biasa. Kita jalankan Nmap untuk pemindaian
                  port dan layanan secara cepat.
                </p>
                <div className="bg-black text-white font-mono text-sm p-4 rounded-md">
                  <code className="whitespace-pre-wrap">
                    $ nmap -F 10.10.20.5
                  </code>
                </div>
                <Alert className="mt-3">
                  <Eye className="h-4 w-4" />
                  <AlertTitle>Hasil Analisis</AlertTitle>
                  <AlertDescription>
                    Nmap menunjukkan port yang diharapkan terbuka (SMB/445,
                    SSH/22), tetapi juga menemukan port `TCP/8080` yang terbuka
                    dengan layanan `Apache Tomcat`. Ini aneh, karena server ini
                    seharusnya hanya server file.
                  </AlertDescription>
                </Alert>
              </div>
              <div>
                <h4 className="font-semibold text-lg flex items-center mb-2">
                  <span className="flex h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                  Langkah 2: Inspeksi Lalu Lintas dengan Wireshark
                </h4>
                <p className="mb-3">
                  Karena ada layanan web yang tidak terduga, kita perlu melihat
                  lalu lintas yang menuju ke port 8080. Kita akan menggunakan
                  Wireshark untuk menangkap paket.
                </p>
                <div className="bg-gray-800 text-white font-mono text-sm p-4 rounded-md">
                  <p className="text-gray-400">// Filter di Wireshark:</p>
                  <code className="whitespace-pre-wrap">
                    ip.addr == 10.10.20.5 and tcp.port == 8080
                  </code>
                </div>
                <Alert className="mt-3" variant="default">
                  <Eye className="h-4 w-4" />
                  <AlertTitle>Hasil Analisis</AlertTitle>
                  <AlertDescription>
                    Wireshark menunjukkan ribuan permintaan HTTP GET ke port
                    8080 dari satu alamat IP internal (`10.10.50.112`).
                    Permintaan ini mencoba mengakses URL yang terlihat seperti
                    upaya eksploitasi (misal: `/struts2/exploit.action`). Host
                    `10.10.50.112` kemungkinan telah terinfeksi malware dan
                    mencoba menyebar ke server.
                  </AlertDescription>
                </Alert>
              </div>
              <div>
                <h4 className="font-semibold text-lg flex items-center mb-2">
                  <span className="flex h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                  Langkah 3: Kesimpulan dan Tindakan
                </h4>
                <p className="mb-3">
                  Analisis menunjukkan bahwa server file yang "lambat"
                  sebenarnya adalah korban dari serangan worm atau malware
                  internal yang mencoba mengeksploitasi layanan web yang tidak
                  seharusnya ada di sana.
                </p>
                <Alert variant="destructive" className="mt-3">
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>Rencana Tindakan</AlertTitle>
                  <AlertDescription>
                    <ol className="list-decimal list-inside">
                      <li>
                        Segera isolasi host yang terinfeksi (`10.10.50.112`)
                        dari jaringan.
                      </li>
                      <li>
                        Nonaktifkan dan hapus layanan Apache Tomcat yang tidak
                        sah dari server file.
                      </li>
                      <li>
                        Lakukan pemindaian penuh pada server file untuk mencari
                        tanda-tanda kompromi.
                      </li>
                      <li>
                        Lakukan investigasi forensik pada host yang terinfeksi
                        untuk mengetahui sumber awal infeksi.
                      </li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
