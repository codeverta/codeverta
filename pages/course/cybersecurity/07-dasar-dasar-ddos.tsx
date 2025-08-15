import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Waves, Bot, Server, Shield, Globe, Layers3, Cpu } from "lucide-react";

export interface DdosAttack {
  id: string;
  title: string;
  description: string;
  analogy: string;
  impact: string;
}

export interface MitigationStrategy {
  title: string;
  description: string;
}

// JENIS-JENIS SERANGAN
export const volumetricAttacks: DdosAttack[] = [
  {
    id: "udp-flood",
    title: "UDP Flood",
    description:
      "Penyerang mengirimkan sejumlah besar paket User Datagram Protocol (UDP) ke port acak di server target. Server akan mencoba memeriksa aplikasi yang menunggu di port tersebut, dan karena tidak ada, ia akan membalas dengan paket ICMP 'Destination Unreachable'.",
    analogy:
      "Bayangkan mengirim ribuan surat ke setiap kamar di sebuah hotel besar. Resepsionis harus memeriksa setiap kamar, menemukan kamar itu kosong, lalu menulis surat balasan 'kamar tidak ditemukan' untuk setiap surat yang masuk. Ini menghabiskan waktu dan tenaga resepsionis.",
    impact:
      "Menghabiskan bandwidth jaringan target dan sumber daya server untuk memproses paket UDP dan mengirim balasan ICMP.",
  },
  {
    id: "icmp-flood",
    title: "ICMP Flood (Ping Flood)",
    description:
      "Serangan ini membanjiri target dengan paket ICMP Echo Request (dikenal sebagai 'ping'). Server target harus memproses setiap request dan merespons dengan paket ICMP Echo Reply, yang menghabiskan bandwidth masuk dan keluar.",
    analogy:
      "Sekelompok besar orang (pasukan ping) terus-menerus berteriak 'Apakah kamu di sana?' kepada satu orang. Orang itu merasa wajib menjawab 'Ya, saya di sini!' untuk setiap teriakan, hingga ia kelelahan dan tidak bisa melakukan pekerjaan lain.",
    impact:
      "Saturasi bandwidth jaringan, membuat layanan tidak dapat diakses oleh pengguna sah.",
  },
];

export const protocolAttacks: DdosAttack[] = [
  {
    id: "syn-flood",
    title: "SYN Flood",
    description:
      "Mengeksploitasi proses 'three-way handshake' TCP. Penyerang mengirim banyak paket SYN (permintaan koneksi) dengan alamat IP sumber palsu. Server merespons dengan SYN-ACK dan menunggu paket ACK terakhir yang tidak akan pernah datang, membuat koneksi setengah terbuka dan menghabiskan sumber daya.",
    analogy:
      "Seorang prankster menelepon sebuah toko ribuan kali. Setiap kali resepsionis mengangkat dan berkata 'Halo?', penelepon diam saja. Resepsionis menunggu sebentar sebelum menutup, tetapi telepon baru terus berdatangan, membuat semua saluran telepon sibuk.",
    impact:
      "Menghabiskan tabel koneksi di server, firewall, dan load balancer, sehingga menolak permintaan koneksi dari pengguna sah.",
  },
  {
    id: "ping-of-death",
    title: "Ping of Death (PoD)",
    description:
      "Penyerang mengirimkan paket IP yang terfragmentasi dan ukurannya melebihi batas maksimum (65,535 byte) saat dirakit kembali oleh server target. Sistem yang lebih tua bisa crash atau reboot saat mencoba menangani paket abnormal ini.",
    analogy:
      "Mengirim 'surat bom' melalui pos dalam potongan-potongan kecil. Ketika tukang pos mencoba merakit kembali semua potongan di kantor pos, ternyata ukurannya terlalu besar untuk kotak surat mana pun, menyebabkan kekacauan dan menghentikan operasional.",
    impact:
      "Menyebabkan sistem target menjadi tidak stabil, crash, atau reboot. (Catatan: Sebagian besar sistem modern sudah kebal terhadap serangan ini).",
  },
];

export const applicationLayerAttacks: DdosAttack[] = [
  {
    id: "http-flood",
    title: "HTTP Flood",
    description:
      "Penyerang membuat botnet mengirimkan jutaan request HTTP GET atau POST yang terlihat sah ke sebuah web server. Karena request ini terlihat seperti trafik normal, sulit untuk dibedakan dari pengguna asli.",
    analogy:
      "Ribuan robot menyamar sebagai manusia dan masuk ke perpustakaan. Masing-masing meminta pustakawan untuk mencari buku yang paling sulit ditemukan. Para pustakawan menjadi sibuk melayani robot-robot ini, sehingga pengunjung asli tidak bisa dilayani.",
    impact:
      "Menghabiskan sumber daya server seperti CPU, RAM, dan koneksi database, menyebabkan aplikasi web menjadi sangat lambat atau tidak responsif.",
  },
  {
    id: "slowloris",
    title: "Slowloris",
    description:
      "Penyerang membuka banyak koneksi ke web server dan menjaga koneksi tersebut tetap terbuka selama mungkin dengan cara mengirimkan request HTTP secara parsial dan sangat lambat. Ini secara perlahan menghabiskan semua slot koneksi yang tersedia di server.",
    analogy:
      "Satu orang masuk ke 10 antrian kasir di supermarket. Di setiap kasir, ia sangat lambat mengeluarkan barang satu per satu dari keranjangnya, membuat semua antrian macet total, meskipun ia tidak membeli banyak barang.",
    impact:
      "Menghabiskan kumpulan koneksi (connection pool) web server, sehingga server tidak dapat menerima koneksi baru dari pengguna sah.",
  },
];

// STRATEGI MITIGASI
export const mitigationStrategies: MitigationStrategy[] = [
  {
    title: "Rate Limiting",
    description:
      "Membatasi jumlah request yang dapat diterima dari satu alamat IP dalam periode waktu tertentu untuk mencegah banjir request.",
  },
  {
    title: "Content Delivery Network (CDN)",
    description:
      "Mendistribusikan konten ke berbagai server di seluruh dunia. CDN dapat menyerap dan menyaring trafik DDoS di 'edge' sebelum mencapai server asli.",
  },
  {
    title: "Web Application Firewall (WAF)",
    description:
      "WAF dapat menganalisis trafik HTTP/S dan memblokir request berbahaya di lapisan aplikasi, seperti SQL Injection atau HTTP Flood.",
  },
  {
    title: "IP Blackholing/Null-routing",
    description:
      "Metode di mana semua trafik ke alamat IP target dibuang ke 'lubang hitam' (dibuang begitu saja) oleh provider internet. Ini efektif menghentikan serangan, tetapi juga memblokir trafik sah.",
  },
];

export default function DdosPage() {
  const attackCategories = [
    {
      value: "volumetric",
      title: "Volumetric Attacks",
      data: volumetricAttacks,
      icon: <Waves className="mr-2" />,
    },
    {
      value: "protocol",
      title: "Protocol Attacks",
      data: protocolAttacks,
      icon: <Layers3 className="mr-2" />,
    },
    {
      value: "application",
      title: "Application Layer Attacks",
      data: applicationLayerAttacks,
      icon: <Cpu className="mr-2" />,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Anatomi Banjir Digital
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Menyelami dunia serangan Distributed Denial-of-Service (DDoS) dari A
          sampai Z.
        </p>
      </div>

      {/* DDoS Triad Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Tiga Aktor Utama
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe />
                Attacker
              </CardTitle>
            </CardHeader>
            <CardContent>
              Otak di balik serangan yang mengorganisir dan meluncurkan
              serangan.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot />
                Botnet
              </CardTitle>
            </CardHeader>
            <CardContent>
              Jaringan komputer 'zombie' yang telah terinfeksi malware dan
              dikendalikan oleh penyerang untuk mengirim trafik serangan.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server />
                Victim
              </CardTitle>
            </CardHeader>
            <CardContent>
              Server atau jaringan target yang menjadi sasaran serangan DDoS,
              dengan tujuan membuat layanannya tidak tersedia.
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Types of Attacks Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Jenis-Jenis Serangan DDoS
        </h2>
        <Tabs defaultValue="volumetric" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            {attackCategories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="py-2.5">
                {cat.icon}
                {cat.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {attackCategories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <Accordion type="single" collapsible className="w-full mt-4">
                {cat.data.map((attack) => (
                  <AccordionItem value={attack.id} key={attack.id}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      {attack.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {attack.description}
                      </p>
                      <p className="text-sm italic border-l-4 pl-4">
                        <strong>Analogi:</strong> {attack.analogy}
                      </p>
                      <p className="text-sm">
                        <strong className="text-destructive">Dampak:</strong>{" "}
                        {attack.impact}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Mitigation Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          🛡️ Strategi Mitigasi
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {mitigationStrategies.map((strat) => (
            <Card key={strat.title}>
              <CardHeader>
                <CardTitle>{strat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {strat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Case Study Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">
          Studi Kasus Nyata
        </h2>
        <Alert className="max-w-4xl mx-auto border-primary">
          <Globe className="h-4 w-4" />
          <AlertTitle className="font-bold">
            Serangan Terhadap AWS pada Februari 2020
          </AlertTitle>
          <AlertDescription>
            Amazon Web Services (AWS) berhasil memitigasi serangan DDoS masif
            dengan volume puncak **2.3 Terabit per detik (Tbps)**. Serangan ini
            menggunakan teknik CLDAP Reflection, sebuah jenis UDP flood.
            Keberhasilan AWS dalam menangani serangan sebesar ini menunjukkan
            betapa pentingnya infrastruktur mitigasi DDoS yang terdistribusi
            secara global dan selalu aktif.
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
