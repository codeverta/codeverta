import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/CodeBlock";

// Tipe data untuk konsep keamanan
export interface SecurityConcept {
  id: string;
  title: string;
  description: string;
  risk: string;
  prevention: string[];
  vulnerableCode?: {
    language: string;
    code: string;
  };
  secureCode?: {
    language: string;
    code: string;
  };
}

// Tipe data untuk studi kasus
export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  lesson: string;
  year: number;
}

// Data Konsep Keamanan
export const securityConcepts: SecurityConcept[] = [
  {
    id: "private-key",
    title: "Keamanan Private Key",
    description: "Private key adalah kredensial rahasia yang memberikan pemiliknya hak untuk mengakses dan mengelola dana cryptocurrency mereka. Kehilangan atau kebocoran private key berarti kehilangan akses permanen terhadap aset.",
    risk: "Pencurian seluruh aset digital dalam wallet yang terkait. Transaksi tidak dapat dibatalkan atau dikembalikan.",
    prevention: [
      "Gunakan Hardware Wallet (seperti Ledger atau Trezor) untuk menyimpan private key secara offline.",
      "Jangan pernah menyimpan private key dalam bentuk digital di perangkat yang terhubung ke internet (komputer, ponsel, cloud).",
      "Buat cadangan seed phrase secara fisik (tulis di kertas/logam) dan simpan di beberapa lokasi aman.",
      "Waspada terhadap serangan phishing yang mencoba menipu Anda untuk memasukkan private key atau seed phrase.",
    ],
  },
  {
    id: "smart-contract",
    title: "Kerentanan Smart Contract",
    description: "Smart contract adalah program yang berjalan di atas blockchain. Seperti perangkat lunak lainnya, smart contract bisa memiliki bug atau celah logika yang dapat dieksploitasi, misalnya Reentrancy.",
    risk: "Penyerang dapat mencuri dana yang dikelola oleh smart contract, membekukan kontrak, atau mengubah logikanya secara tidak sah.",
    prevention: [
      "Gunakan pola desain yang aman seperti 'Checks-Effects-Interactions Pattern' untuk mencegah Reentrancy.",
      "Lakukan audit keamanan profesional oleh pihak ketiga sebelum meluncurkan smart contract.",
      "Gunakan library yang sudah teruji dan terverifikasi seperti OpenZeppelin.",
      "Lakukan pengujian unit dan integrasi yang komprehensif.",
    ],
    vulnerableCode: {
      language: "solidity",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// KONTRAK RENTAN REENTRANCY
contract EtherStore {
    mapping(address => uint) public balances;

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        // BAHAYA: Transfer dilakukan SEBELUM state diubah.
        // Penyerang bisa memanggil withdraw() lagi sebelum saldo di-nol-kan.
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }
    // ... fungsi lain
}`
    },
    secureCode: {
      language: "solidity",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// KONTRAK AMAN DARI REENTRANCY
contract EtherStore is ReentrancyGuard {
    mapping(address => uint) public balances;

    // AMAN: Menggunakan Checks-Effects-Interactions Pattern & nonReentrant modifier
    function withdraw() public nonReentrant {
        uint bal = balances[msg.sender]; // Check
        require(bal > 0);

        balances[msg.sender] = 0; // Effect (state diubah dulu)

        // Interaction (transfer dilakukan terakhir)
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
    }
    // ... fungsi lain
}`
    },
  },
  {
    id: "51-attack",
    title: "Serangan 51% (51% Attack)",
    description: "Serangan ini terjadi pada blockchain Proof-of-Work (PoW) ketika satu entitas atau kelompok berhasil menguasai lebih dari 50% total hashing power jaringan. Ini memungkinkan mereka untuk memanipulasi blockchain.",
    risk: "Penyerang dapat mencegah konfirmasi transaksi baru, menghentikan pembayaran antar pengguna, dan yang paling berbahaya, melakukan 'double-spending' (menggunakan koin yang sama lebih dari satu kali).",
    prevention: [
      "Bagi penambang: bergabunglah dengan pool yang tidak mendominasi jaringan.",
      "Bagi pengembang: tingkatkan hashing power jaringan secara keseluruhan agar lebih mahal untuk diserang.",
      "Bagi bursa/exchange: tingkatkan jumlah konfirmasi yang dibutuhkan untuk setoran koin dari blockchain yang rentan.",
    ],
  },
  // Tambahkan konsep lain seperti: Phishing Attacks, Dusting Attacks, etc.
];

// Data Studi Kasus
export const caseStudies: CaseStudy[] = [
  {
    id: "dao-hack",
    title: "The DAO Hack",
    year: 2016,
    summary: "Sebuah smart contract di Ethereum bernama 'The DAO' diretas karena kerentanan 'Reentrancy'. Peretas berhasil mencuri 3.6 juta ETH (sekitar $50 juta saat itu) dengan cara memanggil fungsi penarikan dana secara berulang sebelum saldo pengguna diperbarui.",
    lesson: "Insiden ini menunjukkan betapa berbahayanya bug dalam smart contract dan memicu hard fork kontroversial yang melahirkan Ethereum (ETH) dan Ethereum Classic (ETC). Pentingnya audit kode dan pola desain yang aman menjadi pelajaran utama."
  },
  {
    id: "parity-wallet",
    title: "Parity Wallet Freeze",
    year: 2017,
    summary: "Seorang pengguna secara tidak sengaja memanggil fungsi untuk mengubah kepemilikan library contract yang digunakan oleh banyak wallet Parity. Dengan menjadi pemilik, ia kemudian menghancurkan library tersebut, yang mengakibatkan dana senilai lebih dari $150 juta di ratusan wallet menjadi beku dan tidak dapat diakses selamanya.",
    lesson: "Menyoroti bahaya dari logika smart contract yang terlalu kompleks dan bug yang tidak terduga terkait kontrol akses. Kejelasan dan kesederhanaan dalam desain contract sangatlah krusial."
  },
    {
    id: "mt-gox",
    title: "Mt. Gox Collapse",
    year: 2014,
    summary: "Bursa cryptocurrency terbesar pada masanya, Mt. Gox, bangkrut setelah kehilangan sekitar 850.000 Bitcoin (senilai $450 juta saat itu). Penyebabnya adalah kombinasi dari keamanan yang buruk, pencurian private key dari hot wallet bursa, dan manipulasi bug 'transaction malleability'.",
    lesson: "Ini adalah pelajaran keras tentang pentingnya keamanan di tingkat bursa (exchange) dan risiko menyimpan aset di 'hot wallet' yang terhubung ke internet. Penggunaan 'cold storage' menjadi standar industri setelah insiden ini."
  }
];

import {
  ShieldCheck,
  ShieldAlert,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

export default function BlockchainSecurityPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16 bg-gray-50/50 dark:bg-gray-900/50">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 dark:text-gray-50">
          Mengamankan Aset Digital
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          Panduan Komprehensif Keamanan Blockchain & Cryptocurrency
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Kolom Kiri: Konsep Keamanan */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <ShieldCheck className="text-blue-500" /> Konsep Inti Keamanan
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {securityConcepts.map((concept) => (
              <AccordionItem value={concept.id} key={concept.id}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {concept.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                  <p className="text-base text-muted-foreground">
                    {concept.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-md mb-2 flex items-center gap-2">
                      <AlertTriangle size={18} className="text-red-500" />{" "}
                      Risiko
                    </h4>
                    <p className="text-sm">{concept.risk}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-md mb-2 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-green-500" /> Cara
                      Pencegahan
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      {concept.prevention.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Code Tabs */}
                  {concept.vulnerableCode && concept.secureCode && (
                    <Tabs defaultValue="vulnerable" className="w-full mt-6">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="vulnerable">
                          Kode Rentan
                        </TabsTrigger>
                        <TabsTrigger value="secure">Kode Aman</TabsTrigger>
                      </TabsList>
                      <TabsContent value="vulnerable">
                        <CodeBlock
                          language={concept.vulnerableCode.language}
                          code={concept.vulnerableCode.code}
                        />
                      </TabsContent>
                      <TabsContent value="secure">
                        <CodeBlock
                          language={concept.secureCode.language}
                          code={concept.secureCode.code}
                        />
                      </TabsContent>
                    </Tabs>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Kolom Kanan: Studi Kasus */}
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="text-purple-500" /> Studi Kasus
          </h2>
          <div className="space-y-6">
            {caseStudies.map((study) => (
              <Card key={study.id}>
                <CardHeader>
                  <CardTitle>{study.title}</CardTitle>
                  <CardDescription>{study.year}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {study.summary}
                  </p>
                  <div>
                    <h5 className="font-semibold text-sm mb-1">
                      Pelajaran Penting:
                    </h5>
                    <p className="text-sm">{study.lesson}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
