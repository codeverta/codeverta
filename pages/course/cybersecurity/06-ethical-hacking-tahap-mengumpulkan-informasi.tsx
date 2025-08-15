import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CodeBlock } from "@/components/CodeBlock"; // Gunakan komponen dari respons sebelumnya
import { Fingerprint, Wifi, ShieldAlert } from "lucide-react";
export interface ReconTechnique {
  id: string;
  title: string;
  description: string;
  tools: string[];
  example: {
    description: string;
    code: string;
    language: 'bash' | 'plaintext';
  };
}

export const passiveRecon: ReconTechnique[] = [
  {
    id: "osint",
    title: "Open-Source Intelligence (OSINT)",
    description: "OSINT adalah seni mengumpulkan informasi dari sumber-sumber yang tersedia untuk umum. Ini mencakup situs web perusahaan, media sosial, forum publik, dokumen pemerintah, dan repositori kode seperti GitHub.",
    tools: ["Google, DuckDuckGo", "LinkedIn, Twitter", "GitHub", "Wayback Machine"],
    example: {
      description: "Mencari profil karyawan sebuah perusahaan di LinkedIn untuk menemukan nama, jabatan, dan potensi alamat email (misal: firstname.lastname@company.com).",
      code: "Buka LinkedIn -> Cari 'People' -> Filter berdasarkan 'Current Company' -> 'TargetCompany'.",
      language: 'plaintext',
    },
  },
  {
    id: "google-dorking",
    title: "Google Dorking / Google Hacking",
    description: "Menggunakan operator pencarian canggih di Google untuk menemukan informasi sensitif yang tidak sengaja terindeks oleh mesin pencari, seperti file konfigurasi, halaman login, atau dokumen internal.",
    tools: ["Google Search Engine"],
    example: {
      description: "Menemukan semua file PDF di situs web target yang mungkin berisi informasi sensitif.",
      code: "site:targetcompany.com filetype:pdf",
      language: 'plaintext',
    },
  },
  {
    id: "shodan",
    title: "Shodan - The Hacker's Search Engine",
    description: "Shodan adalah mesin pencari untuk perangkat yang terhubung ke internet (Internet of Things - IoT). Ia dapat menemukan server, webcam, router, dan sistem industri dengan port terbuka atau menggunakan kredensial default.",
    tools: ["Shodan.io"],
    example: {
      description: "Mencari semua server web Apache di Indonesia yang berjalan pada port 8080.",
      code: "apache port:8080 country:\"ID\"",
      language: 'plaintext',
    },
  },
];

export const activeRecon: ReconTechnique[] = [
  {
    id: "dns-enumeration",
    title: "DNS Enumeration",
    description: "Proses menginterogasi server DNS untuk mendapatkan daftar lengkap host, subdomain, dan alamat IP yang terkait dengan sebuah domain. Ini membantu memetakan infrastruktur digital target.",
    tools: ["dig", "nslookup", "dnsenum", "sublist3r"],
    example: {
      description: "Menggunakan 'dig' untuk melakukan transfer zona DNS (AXFR) dan mencoba mendapatkan semua record dari domain target. (Catatan: seringkali sudah diproteksi).",
      code: "dig axfr @ns1.targetcompany.com targetcompany.com",
      language: 'bash',
    },
  },
  {
    id: "port-scanning",
    title: "Port Scanning with Nmap",
    description: "Nmap (Network Mapper) adalah tool standar industri untuk memindai host dan jaringan. Port scanning bertujuan untuk menemukan port mana yang terbuka, yang mengindikasikan layanan apa yang berjalan di server target.",
    tools: ["Nmap"],
    example: {
      description: "Melakukan pemindaian TCP SYN (cepat dan stealthy) pada 1000 port paling umum di server target untuk mendeteksi layanan dan versinya.",
      code: "nmap -sS -sV target-ip-address",
      language: 'bash',
    },
  },
  {
    id: "vulnerability-scanning",
    title: "Vulnerability Scanning",
    description: "Setelah mengetahui layanan yang berjalan, vulnerability scanner akan memeriksa apakah versi layanan tersebut memiliki kerentanan yang sudah diketahui publik (CVEs - Common Vulnerabilities and Exposures).",
    tools: ["Nessus", "OpenVAS", "Nikto (Web Server)"],
    example: {
      description: "Menggunakan Nikto untuk secara spesifik memindai web server di alamat IP target untuk mencari file berbahaya, versi software yang usang, dan miskonfigurasi umum.",
      code: "nikto -h http://target-ip-address",
      language: 'bash',
    },
  },
];

// Asumsikan Anda memiliki komponen CodeBlock dari respons sebelumnya.
// Jika tidak, Anda bisa menggunakan tag <pre><code> sederhana.
export default function ReconnaissancePage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Seni Mengintai
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Menguasai fase pertama dan terpenting dalam ethical hacking:
          mengumpulkan informasi untuk memetakan permukaan serangan.
        </p>
      </div>

      {/* Interactive Tabs: Passive vs Active */}
      <Tabs defaultValue="passive" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="passive" className="py-3">
            <Fingerprint className="mr-2 h-5 w-5" />
            Passive Reconnaissance
          </TabsTrigger>
          <TabsTrigger value="active" className="py-3">
            <Wifi className="mr-2 h-5 w-5" />
            Active Reconnaissance
          </TabsTrigger>
        </TabsList>

        {/* Konten Passive Recon */}
        <TabsContent value="passive">
          <Alert className="mt-6">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Aman & Tersembunyi</AlertTitle>
            <AlertDescription>
              Teknik-teknik ini tidak berinteraksi langsung dengan sistem
              target, sehingga aktivitas Anda tidak akan terdeteksi.
            </AlertDescription>
          </Alert>
          <Accordion type="single" collapsible className="w-full mt-4">
            {passiveRecon.map((tech) => (
              <AccordionItem value={tech.id} key={tech.id}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {tech.title}
                </AccordionTrigger>
                <AccordionContent className="pt-2 space-y-4">
                  <p className="text-base text-muted-foreground">
                    {tech.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-md mb-2">Tools Utama:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.tools.map((tool, i) => (
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
                    <h4 className="font-semibold text-md mb-2">
                      Contoh Praktis:
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {tech.example.description}
                    </p>
                    <CodeBlock
                      language={tech.example.language}
                      code={tech.example.code}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        {/* Konten Active Recon */}
        <TabsContent value="active">
          <Alert variant="destructive" className="mt-6">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Berisiko Terdeteksi</AlertTitle>
            <AlertDescription>
              Teknik-teknik ini mengirimkan paket ke sistem target, yang dapat
              dicatat oleh firewall atau Intrusion Detection Systems (IDS).
            </AlertDescription>
          </Alert>
          <Accordion type="single" collapsible className="w-full mt-4">
            {activeRecon.map((tech) => (
              <AccordionItem value={tech.id} key={tech.id}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {tech.title}
                </AccordionTrigger>
                <AccordionContent className="pt-2 space-y-4">
                  <p className="text-base text-muted-foreground">
                    {tech.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-md mb-2">Tools Utama:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.tools.map((tool, i) => (
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
                    <h4 className="font-semibold text-md mb-2">
                      Contoh Praktis:
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {tech.example.description}
                    </p>
                    <CodeBlock
                      language={tech.example.language}
                      code={tech.example.code}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </main>
  );
}
