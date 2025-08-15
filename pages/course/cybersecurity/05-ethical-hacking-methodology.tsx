import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, ScanLine, KeyRound, Repeat, FileText } from "lucide-react";
export interface HackingPhase {
  id: string;
  phase: number;
  title: string;
  description: string;
  objectives: string[];
  tools: string[];
  scenario: string;
}

export const hackingPhases: HackingPhase[] = [
  {
    id: "reconnaissance",
    phase: 1,
    title: "Reconnaissance (Pengintaian)",
    description:
      "Ini adalah fase pengumpulan informasi awal. Tujuannya adalah untuk mengetahui sebanyak mungkin tentang target sebelum meluncurkan serangan. Semakin banyak informasi yang dimiliki, semakin tinggi tingkat keberhasilan.",
    objectives: [
      "Mengidentifikasi rentang IP, domain, dan subdomain target.",
      "Menemukan informasi karyawan, alamat email, dan nomor telepon.",
      "Memahami teknologi yang digunakan oleh target (misal: web server, CMS).",
      "Mengumpulkan informasi melalui sumber terbuka (OSINT - Open-Source Intelligence).",
    ],
    tools: [
      "Google Dorking",
      "Shodan",
      "theHarvester",
      "Maltego",
      "WHOIS Lookup",
    ],
    scenario:
      "Seorang ethical hacker menggunakan Google Dorking dengan query seperti `site:targetcompany.com filetype:pdf` untuk menemukan dokumen internal yang mungkin bocor dan menggunakan Shodan untuk melihat port apa saja yang terbuka pada server perusahaan target dari internet.",
  },
  {
    id: "scanning",
    phase: 2,
    title: "Scanning (Pemindaian)",
    description:
      "Setelah informasi awal terkumpul, fase scanning menggunakan data tersebut untuk mencari celah keamanan yang potensial. Ini adalah pendekatan yang lebih aktif dibandingkan reconnaissance.",
    objectives: [
      "Memindai port yang terbuka (Port Scanning).",
      "Mendeteksi layanan dan versi software yang berjalan (Service & Version Detection).",
      "Mencari kerentanan yang diketahui pada sistem dan layanan (Vulnerability Scanning).",
      "Memetakan topologi jaringan.",
    ],
    tools: ["Nmap", "Nessus", "OpenVAS", "Wireshark", "Nikto"],
    scenario:
      "Menggunakan Nmap dengan perintah `nmap -sV -p- target-ip`, hacker memindai semua 65,535 port di server target untuk mengetahui port mana yang terbuka dan layanan apa (beserta versinya) yang berjalan di port tersebut, misalnya 'Apache 2.4.41'.",
  },
  {
    id: "gaining-access",
    phase: 3,
    title: "Gaining Access (Mendapatkan Akses)",
    description:
      "Ini adalah fase 'eksploitasi'. Hacker menggunakan kerentanan yang ditemukan pada fase scanning untuk mendapatkan akses ke dalam sistem. Akses ini bisa berupa level pengguna biasa, atau bahkan level administrator (root).",
    objectives: [
      "Mengeksploitasi kerentanan software (misal: buffer overflow, SQL injection).",
      "Mendapatkan akses melalui rekayasa sosial (social engineering).",
      "Mencuri session cookie untuk membajak sesi pengguna.",
      "Melakukan cracking password.",
    ],
    tools: ["Metasploit Framework", "Hydra", "John the Ripper", "Burp Suite"],
    scenario:
      "Setelah menemukan bahwa target menjalankan versi Apache yang rentan, hacker menggunakan Metasploit Framework untuk meluncurkan eksploit yang sesuai. Jika berhasil, hacker mendapatkan sebuah 'shell' atau akses command-line ke server target.",
  },
  {
    id: "maintaining-access",
    phase: 4,
    title: "Maintaining Access (Mempertahankan Akses)",
    description:
      "Setelah berhasil masuk, tujuan selanjutnya adalah memastikan akses tersebut dapat dipertahankan untuk waktu yang lama. Hacker akan mencoba menginstal 'pintu belakang' (backdoor) atau 'rootkit' agar bisa masuk kembali di lain waktu tanpa harus mengulang proses eksploitasi.",
    objectives: [
      "Menginstal backdoor atau trojan.",
      "Meningkatkan hak akses dari user biasa ke admin (Privilege Escalation).",
      "Menyembunyikan file dan aktivitas berbahaya dari deteksi.",
      "Menggunakan sistem yang telah dikompromikan untuk menyerang sistem lain di dalam jaringan (Pivoting).",
    ],
    tools: ["Meterpreter", "PowerSploit", "Rootkits", "Netcat"],
    scenario:
      "Melalui shell yang didapat, hacker menggunakan Meterpreter (payload dari Metasploit) untuk mengunggah sebuah skrip backdoor. Ia juga memodifikasi registry atau cron job agar skrip tersebut berjalan otomatis saat server di-restart, memastikan aksesnya tetap ada.",
  },
  {
    id: "analysis-reporting",
    phase: 5,
    title: "Analysis & Reporting (Analisis & Pelaporan)",
    description:
      "Ini adalah fase terakhir dan yang membedakan ethical hacker dari black hat hacker. Semua temuan, langkah-langkah yang diambil, dan kerentanan yang ditemukan harus didokumentasikan dalam sebuah laporan yang komprehensif untuk diserahkan kepada klien.",
    objectives: [
      "Menganalisis tingkat keparahan (severity) dari setiap kerentanan.",
      "Memberikan rekomendasi teknis yang jelas untuk perbaikan.",
      "Membuat laporan yang mudah dipahami oleh manajemen dan tim teknis.",
      "Menghapus semua jejak, backdoor, dan tool yang telah diinstal selama pengujian (Clearing Tracks).",
    ],
    tools: [
      "Microsoft Word / Google Docs",
      "Dradis Framework",
      "Faraday",
      "Custom Reporting Scripts",
    ],
    scenario:
      "Hacker menyusun laporan yang berisi Executive Summary untuk C-level, dan Technical Details untuk tim IT. Laporan tersebut merinci kerentanan Apache yang ditemukan, dampak bisnisnya (misal: kebocoran data pelanggan), dan langkah-langkah patch yang harus segera dilakukan.",
  },
];

// Map untuk memilih ikon berdasarkan ID fase
const iconMap: { [key: string]: React.ReactNode } = {
  reconnaissance: <Terminal className="mr-2" />,
  scanning: <ScanLine className="mr-2" />,
  "gaining-access": <KeyRound className="mr-2" />,
  "maintaining-access": <Repeat className="mr-2" />,
  "analysis-reporting": <FileText className="mr-2" />,
};

export default function EthicalHackingPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Hacker's Lifecycle
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Pahami 5 fase metodologi yang digunakan oleh para profesional untuk
          menguji dan mengamankan sistem secara etis.
        </p>
      </div>

      {/* Interactive Tabs Section */}
      <div className="max-w-7xl mx-auto">
        <Tabs
          defaultValue={hackingPhases[0].id}
          orientation="vertical"
          className="grid md:grid-cols-5 gap-8"
        >
          {/* Kolom Kiri: Daftar Fase (Navigasi Tabs) */}
          <TabsList className="md:col-span-2 flex md:flex-col h-auto bg-transparent p-0">
            {hackingPhases.map((phase) => (
              <TabsTrigger
                key={phase.id}
                value={phase.id}
                className="w-full justify-start text-left p-4 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow"
              >
                <div className="flex items-center">
                  {iconMap[phase.id]}
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Fase {phase.phase}
                    </span>
                    <span className="font-bold">{phase.title}</span>
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Kolom Kanan: Konten Fase */}
          <div className="md:col-span-3">
            {hackingPhases.map((phase) => (
              <TabsContent value={phase.id} key={phase.id} className="mt-0">
                <div className="p-6 rounded-lg bg-card text-card-foreground border shadow-sm">
                  <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {phase.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Objektif Utama
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {phase.objectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Contoh Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.tools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Skenario Praktis
                      </h4>
                      <p className="text-sm p-4 bg-muted/50 rounded-md border-l-4 border-primary">
                        {phase.scenario}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </main>
  );
}
