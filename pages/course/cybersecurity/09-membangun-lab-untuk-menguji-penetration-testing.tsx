"use client";
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
  Server,
  Network,
  ShieldAlert,
  TerminalSquare,
  MousePointerClick,
  Download,
} from "lucide-react";

export default function SetupLabPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          Modul 9: Ethical Hacking & Penetration Testing
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Topik: Membangun Laboratorium Pengujian (Testing Lab) yang Aman
        </p>
      </header>

      <main>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center">
              <Server className="mr-3 h-8 w-8 text-indigo-500" />
              Fondasi Penting: Lab Pribadimu
            </CardTitle>
            <CardDescription>
              Sebelum memulai peretasan etis, Anda wajib memiliki lingkungan
              yang terisolasi dan aman. Lab ini adalah arena latihan Anda untuk
              mengasah keterampilan tanpa membahayakan sistem lain.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Komponen Inti Lab */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 border-l-4 border-indigo-500 pl-4">
                Komponen Inti Lab
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MousePointerClick className="mr-2 h-5 w-5" />
                      Virtualization Software
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Aplikasi untuk membuat dan mengelola mesin virtual (VM).
                      Ini memungkinkan Anda menjalankan beberapa sistem operasi
                      di satu komputer fisik.
                    </p>
                    <div className="mt-3">
                      <Badge>Contoh:</Badge>{" "}
                      <span className="text-sm">
                        VirtualBox (Gratis), VMware Workstation Player.
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TerminalSquare className="mr-2 h-5 w-5" />
                      Attacker Machine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Sistem operasi yang dilengkapi dengan ratusan alat untuk
                      penetration testing. Dari sinilah Anda akan melancarkan
                      serangan simulasi.
                    </p>
                    <div className="mt-3">
                      <Badge>Rekomendasi:</Badge>{" "}
                      <span className="text-sm">Kali Linux.</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Server className="mr-2 h-5 w-5 text-red-500" />
                      Target Machines (Victims)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Mesin virtual yang sengaja dibuat rentan (vulnerable). Ini
                      adalah target latihan Anda untuk dieksploitasi.
                    </p>
                    <div className="mt-3">
                      <Badge>Contoh:</Badge>{" "}
                      <span className="text-sm">
                        Metasploitable2, OWASP WebGoat.
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Panduan Setup Interaktif */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 border-l-4 border-indigo-500 pl-4">
                Panduan Setup Langkah-demi-Langkah
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    Langkah 1: Instalasi VirtualBox
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p>
                      VirtualBox adalah software virtualisasi gratis dan
                      open-source dari Oracle yang sangat populer untuk pemula.
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        Kunjungi situs resmi{" "}
                        <a
                          href="https://www.virtualbox.org/wiki/Downloads"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          VirtualBox
                        </a>
                        .
                      </li>
                      <li>
                        Unduh installer yang sesuai dengan sistem operasi Anda
                        (Windows, macOS, atau Linux).
                      </li>
                      <li>
                        Jalankan installer dan ikuti petunjuk instalasi dengan
                        pengaturan default.
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg">
                    Langkah 2: Instalasi Kali Linux (Attacker VM)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p>
                      Kali Linux adalah distribusi Linux berbasis Debian yang
                      dirancang untuk digital forensics dan penetration testing.
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        Kunjungi halaman{" "}
                        <a
                          href="https://www.kali.org/get-kali/#kali-virtual-machines"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          download VM Kali Linux
                        </a>
                        .
                      </li>
                      <li>
                        Pilih versi untuk VirtualBox dan unduh file-nya
                        (biasanya dalam format .ova).
                      </li>
                      <li>
                        Di VirtualBox, pilih{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                          File &gt; Import Appliance
                        </code>
                        .
                      </li>
                      <li>
                        Pilih file .ova yang sudah diunduh dan ikuti wizard
                        untuk mengimpor VM. Biarkan pengaturan default.
                      </li>
                      <li>
                        Setelah selesai, Anda bisa menjalankan Kali Linux dari
                        VirtualBox. Login default biasanya `kali` / `kali`.
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg">
                    Langkah 3: Deploy Metasploitable2 (Target VM)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p>
                      Metasploitable2 adalah VM Linux yang sengaja dibuat sangat
                      rentan. Ini adalah "gym" yang sempurna untuk melatih skill
                      Anda.
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        Unduh Metasploitable2 dari situs resmi Rapid7 atau
                        SourceForge (cari "Metasploitable 2"). File ini akan
                        berbentuk .zip.
                      </li>
                      <li>
                        Ekstrak file .zip tersebut. Anda akan mendapatkan folder
                        berisi beberapa file, termasuk file dengan ekstensi
                        .vmdk.
                      </li>
                      <li>
                        Di VirtualBox, buat VM baru:{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                          Machine &gt; New
                        </code>
                        .
                      </li>
                      <li>
                        Beri nama (misal: "Metasploitable2"), set Type ke
                        `Linux` dan Version ke `Ubuntu (64-bit)`.
                      </li>
                      <li>
                        Saat mencapai bagian Hard Disk, pilih{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                          "Use an existing virtual hard disk file"
                        </code>{" "}
                        dan arahkan ke file .vmdk yang sudah Anda ekstrak.
                      </li>
                      <li>
                        Selesaikan pembuatan VM. Login default biasanya
                        `msfadmin` / `msfadmin`.
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg">
                    Langkah 4: Konfigurasi Jaringan Terisolasi
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p>
                      Ini adalah langkah KRUSIAL untuk keamanan. Kita akan
                      memastikan VM attacker dan target bisa saling
                      berkomunikasi, tetapi terisolasi dari jaringan utama Anda.
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Matikan kedua VM (Kali dan Metasploitable2).</li>
                      <li>
                        Untuk setiap VM, buka{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                          Settings &gt; Network
                        </code>
                        .
                      </li>
                      <li>
                        Pada bagian{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                          Attached to
                        </code>
                        , ubah pengaturannya dari `NAT` menjadi{" "}
                        <strong className="text-indigo-400">
                          `Host-only Adapter`
                        </strong>
                        .
                      </li>
                      <li>
                        Pastikan keduanya menggunakan nama adapter yang sama
                        (misal: `vboxnet0`).
                      </li>
                      <li>
                        Dengan konfigurasi ini, VM Anda berada dalam jaringan
                        virtual pribadi. Mereka tidak bisa mengakses internet
                        dan komputer Anda tidak bisa diakses dari mereka secara
                        langsung.
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Contoh Praktis */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 border-l-4 border-indigo-500 pl-4">
                Studi Kasus: Tes Koneksi Lab
              </h3>
              <Card className="bg-gray-50 dark:bg-gray-800/50">
                <CardContent className="pt-6">
                  <p className="mb-4">
                    Mari kita verifikasi bahwa lab kita berfungsi. Kita akan
                    melakukan pemindaian (scan) dari Kali Linux ke
                    Metasploitable2 untuk menemukan port yang terbuka.
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Nyalakan kedua VM.</li>
                    <li>
                      Login ke Metasploitable2 dan ketik perintah `ifconfig`
                      untuk mengetahui alamat IP-nya (misalnya,
                      `192.168.56.101`).
                    </li>
                    <li>Login ke Kali Linux, buka Terminal.</li>
                    <li>
                      Lakukan ping untuk memastikan koneksi: `ping
                      192.168.56.101`. Jika ada balasan, koneksi berhasil.
                    </li>
                    <li>Jalankan Nmap untuk memindai port:</li>
                  </ol>
                  <div className="bg-black text-white font-mono text-sm p-4 rounded-md my-4">
                    <code className="whitespace-pre">
                      nmap -sV 192.168.56.101
                    </code>
                  </div>
                  <p>
                    Anda akan melihat daftar panjang port yang terbuka di
                    Metasploitable2. Ini membuktikan bahwa mesin target Anda
                    rentan dan siap untuk dieksplorasi. Selamat, lab Anda sudah
                    siap!
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter>
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>PERINGATAN KERAS: Etika & Hukum</AlertTitle>
              <AlertDescription>
                Laboratorium ini adalah untuk tujuan **pendidikan saja**.
                Menggunakan teknik yang dipelajari di sini pada sistem apa pun
                tanpa izin eksplisit adalah tindakan **ilegal** dan dapat
                mengakibatkan konsekuensi hukum yang serius. Selalu bertindak
                secara etis dan bertanggung jawab.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
