"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  risk: string;
  exampleCase: string;
  prevention: string[];
  vulnerableCode: {
    language: string;
    code: string;
  };
  secureCode: {
    language: string;
    code: string;
  };
}

export const owaspTop10: Vulnerability[] = [
  {
    id: "A01:2021",
    title: "Broken Access Control",
    description:
      "Kerentanan ini terjadi ketika penyerang dapat mengakses fungsionalitas atau data yang seharusnya tidak dapat mereka akses. Ini adalah masalah otorisasi, bukan autentikasi.",
    risk: "Penyerang dapat melihat data sensitif pengguna lain, mengubah data, atau bahkan mengambil alih fungsi admin.",
    exampleCase:
      "Seorang pengguna dengan ID `123` mengubah URL di browser dari `/user/123/profile` menjadi `/user/124/profile` dan berhasil melihat profil pengguna lain tanpa izin.",
    prevention: [
      "Terapkan pengecekan izin di setiap endpoint yang memerlukan otorisasi.",
      "Gunakan role-based access control (RBAC) atau attribute-based access control (ABAC).",
      "Tolak akses secara default (deny-by-default).",
      "Verifikasi hak akses user tidak hanya di sisi frontend, tetapi yang terpenting di sisi backend.",
    ],
    vulnerableCode: {
      language: "javascript",
      code: `// Express.js - VULNERABLE
app.get('/user/:id/documents', (req, res) => {
  const { id } = req.params;
  // BAHAYA: Tidak ada pengecekan apakah user yang login
  // berhak melihat dokumen milik user 'id'.
  const documents = db.documents.findByOwner(id);
  res.json(documents);
});`,
    },
    secureCode: {
      language: "javascript",
      code: `// Express.js - SECURE
app.get('/user/:id/documents', (req, res) => {
  const { id } = req.params;
  const loggedInUserId = req.session.userId;

  // AMAN: Verifikasi bahwa user yang login
  // hanya bisa mengakses datanya sendiri.
  if (id !== loggedInUserId) {
    return res.status(403).send('Forbidden: You do not have access.');
  }

  const documents = db.documents.findByOwner(id);
  res.json(documents);
});`,
    },
  },
  {
    id: "A02:2021",
    title: "Cryptographic Failures",
    description:
      "Juga dikenal sebagai 'Sensitive Data Exposure'. Terjadi ketika data sensitif seperti password, NIK, atau nomor kartu kredit tidak dilindungi dengan baik melalui enkripsi saat disimpan (at-rest) atau saat dikirim (in-transit).",
    risk: "Bocornya data sensitif yang dapat disalahgunakan untuk penipuan, pencurian identitas, atau kerugian finansial.",
    exampleCase:
      "Sebuah website menyimpan password pengguna dalam format plain text di database. Jika database bocor, semua password pengguna langsung terekspos.",
    prevention: [
      "Enkripsi semua data sensitif saat disimpan (at-rest) menggunakan algoritma yang kuat (misal: AES-256).",
      "Gunakan protokol TLS/SSL terbaru untuk mengenkripsi data saat transit (HTTPS).",
      "Jangan menyimpan data yang tidak perlu.",
      "Untuk password, gunakan fungsi hashing yang kuat dan di-salt seperti Argon2, scrypt, atau bcrypt.",
    ],
    vulnerableCode: {
      language: "sql",
      code: `CREATE TABLE Users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  -- BAHAYA: Password disimpan sebagai teks biasa!
  password VARCHAR(50) 
);`,
    },
    secureCode: {
      language: "sql",
      code: `CREATE TABLE Users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  -- AMAN: Hanya hash dari password yang disimpan.
  password_hash VARCHAR(255) 
);`,
    },
  },
  {
    id: "A03:2021",
    title: "Injection",
    description:
      "Kerentanan injection terjadi ketika data yang tidak dipercaya (biasanya dari input pengguna) dikirim ke interpreter sebagai bagian dari perintah atau query. Ini menipu interpreter untuk menjalankan perintah yang tidak diinginkan atau mengakses data tanpa otorisasi.",
    risk: "Pencurian data, kehilangan integritas data, penolakan layanan (Denial of Service), hingga pengambilalihan server secara penuh.",
    exampleCase:
      "Pada form login, penyerang memasukkan `' OR '1'='1` di field password. Jika query SQL dibuat dengan menggabungkan string, query tersebut menjadi `SELECT * FROM users WHERE username = 'admin' AND password = '' OR '1'='1'`, yang akan selalu benar dan membuat penyerang berhasil login.",
    prevention: [
      "Gunakan Prepared Statements (Parameterized Queries) untuk memisahkan data dari perintah.",
      "Gunakan Object-Relational Mapping (ORM) yang secara default sudah menangani ini.",
      "Lakukan validasi input di sisi server (server-side validation).",
      "Escape semua karakter khusus dari input pengguna jika tidak ada cara lain.",
    ],
    vulnerableCode: {
      language: "javascript",
      code: `// Node.js (mysql) - VULNERABLE
const userInput = req.body.username;
const query = "SELECT * FROM users WHERE username = '" + userInput + "';";

// BAHAYA: userInput langsung digabung ke dalam string query.
db.query(query, (err, results) => {
  // ...
});`,
    },
    secureCode: {
      language: "javascript",
      code: `// Node.js (mysql) - SECURE
const userInput = req.body.username;
const query = "SELECT * FROM users WHERE username = ?";

// AMAN: Parameter dipisahkan dari query.
// Database engine akan menangani input dengan aman.
db.query(query, [userInput], (err, results) => {
  // ...
});`,
    },
  },
  {
    id: "A04:2021",
    title: "Insecure Design",
    description:
      "Ini adalah kategori luas yang berfokus pada kelemahan dalam desain dan arsitektur sistem. Kerentanan ini ada karena proses desain tidak mempertimbangkan ancaman keamanan (threat modeling) sejak awal.",
    risk: "Sistem yang rentan sejak dari fondasinya, yang sulit diperbaiki tanpa perancangan ulang yang signifikan. Dapat memicu berbagai jenis kerentanan lain.",
    exampleCase:
      "Sebuah fitur 'beli sekarang' menghitung total harga di sisi klien (frontend) dan mengirimkannya ke server. Penyerang bisa memanipulasi request untuk mengubah total harga menjadi lebih murah sebelum dikirim ke server, dan server memprosesnya tanpa verifikasi ulang.",
    prevention: [
      "Terapkan metodologi pengembangan yang aman (Secure Development Lifecycle).",
      "Gunakan threat modeling untuk mengidentifikasi ancaman pada tahap desain.",
      "Gunakan secure design patterns & principles (misal: defense in depth).",
      "Jangan pernah percaya pada data yang dikirim dari sisi klien; selalu validasi di server.",
    ],
    vulnerableCode: {
      language: "javascript",
      code: `// Frontend Logic - VULNERABLE
function checkout() {
  const price = 100000; // Harga dari client
  const quantity = 1;
  const totalPrice = price * quantity;
  
  // BAHAYA: Total harga ditentukan oleh klien
  fetch('/api/purchase', {
    method: 'POST',
    body: JSON.stringify({ itemId: 'abc', totalPrice: totalPrice })
  });
}`,
    },
    secureCode: {
      language: "javascript",
      code: `// Backend Logic - SECURE
app.post('/api/purchase', (req, res) => {
  const { itemId, quantity } = req.body;
  
  // AMAN: Harga diambil dari database di server, bukan dari klien.
  const item = db.items.findById(itemId);
  const serverTotalPrice = item.price * quantity;

  // Proses pembayaran dengan serverTotalPrice...
});`,
    },
  },
  {
    id: "A05:2021",
    title: "Security Misconfiguration",
    description:
      "Kerentanan ini terjadi akibat konfigurasi keamanan yang tidak tepat atau tidak lengkap. Ini bisa berupa penggunaan konfigurasi default, pesan error yang terlalu detail, atau layanan cloud yang tidak diamankan dengan benar.",
    risk: "Memungkinkan penyerang mendapatkan akses tidak sah ke sistem atau data, atau mendapatkan informasi sensitif tentang arsitektur sistem.",
    exampleCase:
      "Sebuah Amazon S3 bucket yang berisi data pengguna dibiarkan 'public' sehingga siapa saja bisa mengaksesnya. Atau, framework web menampilkan pesan error lengkap dengan stack trace saat terjadi kesalahan di mode produksi.",
    prevention: [
      "Lakukan proses hardening untuk setiap komponen sistem (OS, framework, database).",
      "Gunakan konfigurasi minimalis (disable fitur yang tidak perlu).",
      "Otomatisasi proses pengecekan konfigurasi keamanan.",
      "Pastikan pesan error di mode produksi bersifat generik dan tidak membocorkan detail internal.",
    ],
    vulnerableCode: {
      language: "javascript",
      code: `// Express.js Error Handler - VULNERABLE
app.use((err, req, res, next) => {
  console.error(err.stack);
  // BAHAYA: Mengirim seluruh detail error ke klien
  // di lingkungan produksi.
  res.status(500).send({
    message: err.message,
    stack: err.stack, // Membocorkan struktur internal
  });
});`,
    },
    secureCode: {
      language: "javascript",
      code: `// Express.js Error Handler - SECURE
app.use((err, req, res, next) => {
  console.error(err.stack);
  // AMAN: Hanya mengirim pesan generik.
  res.status(500).send({
    error: 'Terjadi kesalahan pada server.'
  });
});`,
    },
  },
  {
    id: "A06:2021",
    title: "Vulnerable and Outdated Components",
    description:
      "Terjadi ketika aplikasi menggunakan komponen (library, framework, modul) pihak ketiga yang memiliki kerentanan keamanan yang sudah diketahui publik. Penyerang dapat mengeksploitasi kelemahan pada komponen tersebut untuk menyerang aplikasi.",
    risk: "Tergantung pada kerentanan komponennya, risikonya bisa bervariasi dari kebocoran data hingga eksekusi kode dari jarak jauh (Remote Code Execution).",
    exampleCase:
      "Sebuah aplikasi masih menggunakan versi library `log4j` 2.14.1 yang rentan terhadap Log4Shell (CVE-2021-44228), memungkinkan penyerang mengambil alih server hanya dengan mengirim log message berbahaya.",
    prevention: [
      "Hapus dependensi, fitur, dan file yang tidak digunakan.",
      "Gunakan tool pemindai dependensi secara rutin (misal: `npm audit`, Snyk, Dependabot).",
      "Selalu perbarui komponen ke versi stabil terbaru setelah melakukan pengujian.",
      "Dapatkan komponen hanya dari sumber resmi.",
    ],
    vulnerableCode: {
      language: "json",
      code: `{
  "name": "my-vulnerable-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "4.17.1",
    "lodash": "4.17.15" // Versi ini memiliki kerentanan prototype pollution
  }
}`,
    },
    secureCode: {
      language: "json",
      code: `{
  "name": "my-secure-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "4.19.2", // Versi terbaru dan aman
    "lodash": "4.17.21" // Versi yang sudah ditambal
  }
}`,
    },
  },
  {
    id: "A07:2021",
    title: "Identification and Authentication Failures",
    description:
      "Kerentanan terkait dengan cara aplikasi mengelola identitas pengguna, autentikasi, dan sesi. Termasuk di dalamnya adalah kebijakan password yang lemah, tidak ada perlindungan terhadap serangan brute force, dan manajemen sesi yang tidak aman.",
    risk: "Pengambilalihan akun pengguna (account takeover), yang dapat menyebabkan akses tidak sah ke data sensitif atau fungsionalitas sistem.",
    exampleCase:
      "Sebuah halaman login tidak membatasi jumlah percobaan login yang gagal. Penyerang dapat menggunakan skrip otomatis untuk mencoba ribuan kombinasi password (brute force) pada satu akun hingga berhasil.",
    prevention: [
      "Terapkan Multi-Factor Authentication (MFA).",
      "Terapkan pembatasan percobaan (rate limiting) dan penguncian akun (account lockout).",
      "Gunakan kebijakan password yang kuat.",
      "Jangan mengirim Session ID melalui URL; gunakan cookie yang aman (HttpOnly, Secure).",
    ],
    vulnerableCode: {
      language: "javascript",
      code: `// Login Logic - VULNERABLE
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find({ username });
  
  // BAHAYA: Tidak ada rate limiting.
  // Penyerang bisa mencoba berkali-kali tanpa batas.
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    req.session.userId = user.id;
    res.send('Login berhasil!');
  } else {
    res.status(401).send('Username atau password salah.');
  }
});`,
    },
    secureCode: {
      language: "javascript",
      code: `// Login Logic - SECURE
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Batasi 5 request per IP dalam 15 menit
  message: 'Terlalu banyak percobaan login, coba lagi nanti.',
});

// AMAN: Terapkan middleware rate limiting pada endpoint login.
app.post('/login', loginLimiter, (req, res) => {
  // ... logika login yang sama ...
});`,
    },
  },
  {
    id: "A08:2021",
    title: "Software and Data Integrity Failures",
    description:
      "Kerentanan ini berkaitan dengan kegagalan dalam memverifikasi integritas perangkat lunak, data, dan proses CI/CD. Ini termasuk menerima data atau update dari sumber yang tidak dipercaya tanpa verifikasi tanda tangan digital (digital signature).",
    risk: "Instalasi malware, eksekusi kode dari jarak jauh, atau pengiriman data yang rusak ke sistem.",
    exampleCase:
      "Sebuah aplikasi mengambil dependensi dari repositori pihak ketiga yang tidak aman. Penyerang menyusup ke repositori tersebut dan menyisipkan kode berbahaya ke dalam salah satu dependensi. Ketika aplikasi di-build, kode berbahaya itu ikut masuk ke dalam sistem.",
    prevention: [
      "Gunakan tanda tangan digital untuk memverifikasi keaslian perangkat lunak atau update.",
      "Pastikan pipeline CI/CD Anda aman dari modifikasi yang tidak sah.",
      "Verifikasi integritas dependensi yang diunduh (misal: via checksum).",
      "Hindari proses deserialisasi data dari sumber yang tidak dipercaya.",
    ],
    vulnerableCode: {
      language: "bash",
      code: `# CI/CD Script - VULNERABLE
# BAHAYA: Mengunduh dan menjalankan skrip dari URL 
# tanpa memverifikasi isinya atau sumbernya.
curl http://untrusted-source.com/deploy.sh | bash`,
    },
    secureCode: {
      language: "bash",
      code: `# CI/CD Script - SECURE
# AMAN: Verifikasi checksum sebelum menjalankan.
wget https://trusted-source.com/deploy.sh
echo "EXPECTED_CHECKSUM deploy.sh" | sha256sum --check --status

if [ $? -eq 0 ]; then
  bash deploy.sh
else
  echo "Checksum mismatch! Aborting."
  exit 1
fi`,
    },
  },
  {
    id: "A09:2021",
    title: "Security Logging and Monitoring Failures",
    description:
      "Kegagalan dalam mencatat (logging), memantau (monitoring), dan merespons insiden keamanan secara efektif. Tanpa log yang cukup, aktivitas mencurigakan bisa tidak terdeteksi.",
    risk: "Memperlambat atau bahkan mencegah deteksi adanya serangan. Penyerang dapat beroperasi lebih lama di dalam sistem tanpa terdeteksi, dan analisis forensik setelah insiden menjadi sangat sulit.",
    exampleCase:
      "Seorang penyerang berhasil mendapatkan akses admin dan menghapus data penting. Karena tidak ada log yang mencatat siapa yang login dan aktivitas apa yang dilakukan, tim keamanan tidak dapat melacak siapa pelakunya dan apa saja yang telah diubah.",
    prevention: [
      "Catat (log) semua event penting seperti login, gagal login, dan transaksi bernilai tinggi.",
      "Pastikan log memiliki konteks yang cukup (user ID, timestamp, IP asal).",
      "Terapkan sistem monitoring dan peringatan (alerting) untuk mendeteksi aktivitas anomali.",
      "Lindungi file log dari modifikasi atau penghapusan yang tidak sah.",
    ],
    vulnerableCode: {
      language: "javascript",
      code: `// High-value transaction - VULNERABLE
function transferFunds(fromUser, toUser, amount) {
  // BAHAYA: Transaksi penting terjadi,
  // tapi tidak ada log yang dicatat.
  db.executeTransaction(fromUser, toUser, amount);
  return { success: true };
}`,
    },
    secureCode: {
      language: "javascript",
      code: `// High-value transaction - SECURE
function transferFunds(fromUser, toUser, amount, sourceIp) {
  // AMAN: Mencatat event sebelum dan sesudah transaksi.
  logger.info({
    event: 'TRANSFER_ATTEMPT',
    from: fromUser.id,
    to: toUser.id,
    amount: amount,
    ip: sourceIp
  });

  const result = db.executeTransaction(fromUser, toUser, amount);

  logger.info({
    event: 'TRANSFER_SUCCESS',
    transactionId: result.transactionId
  });

  return { success: true };
}`,
    },
  },
  {
    id: "A10:2021",
    title: "Server-Side Request Forgery (SSRF)",
    description:
      "SSRF terjadi ketika penyerang dapat memaksa server aplikasi untuk mengirimkan request ke lokasi yang tidak diinginkan. Server yang rentan dapat dipaksa untuk berinteraksi dengan layanan internal di dalam infrastruktur atau dengan sistem eksternal lainnya.",
    risk: "Memindai jaringan internal, mengakses layanan internal yang tidak terproteksi (misal: panel admin, database), atau membocorkan data sensitif.",
    exampleCase:
      "Sebuah fitur 'import gambar dari URL' memungkinkan pengguna memasukkan URL. Penyerang memasukkan URL internal seperti `http://127.0.0.1/metadata` atau `http://169.254.169.254/latest/meta-data/` (alamat metadata di cloud provider) dan server akan mengirimkan respons dari layanan internal tersebut kepada penyerang.",
    prevention: [
      "Terapkan allow-list (daftar putih) untuk domain, protokol, dan port tujuan.",
      "Validasi dan sanitasi semua input URL dari pengguna secara ketat.",
      "Jangan mengirim respons mentah (raw response) dari server tujuan ke pengguna.",
      "Isolasi fungsionalitas yang rentan ini ke dalam jaringan yang terpisah.",
    ],
    vulnerableCode: {
      language: "javascript",
      code: `// Fetch image from URL - VULNERABLE
app.get('/fetch-image', async (req, res) => {
  const { url } = req.query;
  
  // BAHAYA: Server membuat request ke URL mana pun
  // yang diberikan oleh pengguna.
  try {
    const response = await fetch(url);
    const image = await response.blob();
    res.type(response.headers.get('content-type')).send(image);
  } catch (e) {
    res.status(500).send('Gagal mengambil gambar.');
  }
});`,
    },
    secureCode: {
      language: "javascript",
      code: `// Fetch image from URL - SECURE
const ALLOWED_DOMAINS = ['images.pexels.com', 'media.istockphoto.com'];

app.get('/fetch-image', async (req, res) => {
  const { url } = req.query;
  const targetUrl = new URL(url);

  // AMAN: Validasi bahwa hostname tujuan ada di dalam allow-list.
  if (!ALLOWED_DOMAINS.includes(targetUrl.hostname)) {
    return res.status(400).send('Domain tidak diizinkan.');
  }

  // Lanjutkan proses fetch yang aman...
});`,
    },
  },
];

export default function OwaspCoursePage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          🛡️ Membedah OWASP Top 10
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Pahami 10 risiko keamanan aplikasi web paling kritis yang
          diidentifikasi oleh OWASP untuk membangun aplikasi yang lebih aman.
        </p>
      </div>

      {/* Interactive Accordion Section */}
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        {owaspTop10.map((vuln, index) => (
          <AccordionItem value={`item-${index}`} key={vuln.id}>
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <span className="text-primary mr-2">{vuln.id.split(":")[0]}</span>
              {vuln.title}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <p className="text-base text-muted-foreground mb-6">
                {vuln.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-md mb-2">Risiko Nyata</h3>
                  <p className="text-sm">{vuln.risk}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-md mb-2">Contoh Kasus</h3>
                  <p className="text-sm">{vuln.exampleCase}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-md mb-3">
                  Strategi Pencegahan
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {vuln.prevention.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Interactive Code Comparison */}
              <h3 className="font-semibold text-xl mb-4 text-center">
                Analisis Kode
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500">
                      <AlertTriangle size={20} /> Kode Rentan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 overflow-hidden rounded-b-lg">
                    <CodeBlock
                      language={vuln.vulnerableCode.language}
                      code={vuln.vulnerableCode.code}
                    />
                  </CardContent>
                </Card>

                <Card className="border-green-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-500">
                      <Shield size={20} /> Kode Aman
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 overflow-hidden rounded-b-lg">
                    <CodeBlock
                      language={vuln.secureCode.language}
                      code={vuln.secureCode.code}
                    />
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
