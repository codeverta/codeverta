---
title: "Codeverta dan Digitalisasi Healthcare Indonesia: Dari RME hingga Integrasi SATUSEHAT"
date: "2026-07-29"
image: "/assets/healthcare/editorial/codeverta-healthcare-digitalization-hero.png"
desc: "Cerita bagaimana Codeverta membantu fasilitas kesehatan membangun sistem operasional, rekam medis elektronik, dan jalur integrasi SATUSEHAT yang siap dipakai dalam pekerjaan sehari-hari."
tags: "Codeverta healthcare, digitalisasi kesehatan Indonesia, integrasi SATUSEHAT, rekam medis elektronik, RME, sistem informasi rumah sakit, sistem manajemen klinik, FHIR Indonesia, software healthcare"
---

# Codeverta dan Digitalisasi Healthcare Indonesia: Dari RME hingga Integrasi SATUSEHAT

Digitalisasi kesehatan sering dibicarakan seolah-olah pekerjaannya selesai ketika sebuah klinik berhenti memakai kertas. Kenyataannya tidak sesederhana itu.

Mengubah formulir menjadi layar memang bagian dari proses. Namun pekerjaan yang lebih berat justru muncul setelahnya: memastikan data pasien tidak ganda, alur dokter dan perawat tetap nyaman, stok obat terhubung dengan resep, hasil laboratorium masuk ke riwayat yang benar, dan data yang diwajibkan dapat dikirim ke ekosistem nasional.

Di situlah Codeverta mengambil peran. Kami membantu membangun lapisan teknologi yang dipakai fasilitas kesehatan setiap hari, mulai dari sistem manajemen klinik dan rumah sakit, rekam medis elektronik, farmasi, laboratorium, penjadwalan tenaga kesehatan, hingga persiapan integrasi dengan SATUSEHAT.

Perannya cukup jelas. Kementerian Kesehatan membangun SATUSEHAT sebagai platform pertukaran data kesehatan nasional. Codeverta bekerja di sisi fasilitas dan sistem operasional: membuat data yang lahir dari pelayanan sehari-hari menjadi rapi, terstruktur, aman, dan siap dipertukarkan sesuai ketentuan Kemenkes.

![Tenaga kesehatan menggunakan sistem digital dalam pelayanan klinik di Indonesia](/assets/healthcare/editorial/digital-clinic-indonesia.png)

_Ilustrasi editorial: teknologi seharusnya mengikuti alur pelayanan, bukan membuat tenaga kesehatan sibuk melayani aplikasi._

## Masalahnya Bukan Sekadar “Belum Punya Aplikasi”

Di banyak fasilitas kesehatan, aplikasi sebenarnya sudah ada. Pendaftaran memakai satu sistem, poli memakai sistem lain, laboratorium punya pencatatan sendiri, sementara farmasi dan kasir masih mengandalkan spreadsheet. Setiap bagian bisa bekerja, tetapi datanya tidak selalu berbicara dalam bahasa yang sama.

Akibatnya mudah ditebak:

- pasien harus mengulang data yang pernah diberikan;
- petugas menyalin informasi dari satu layar ke layar lain;
- dokter terlambat melihat hasil pemeriksaan;
- stok obat di sistem berbeda dengan kondisi rak;
- laporan manajemen baru selesai setelah beberapa kali rekonsiliasi;
- tim IT kesulitan menyiapkan data untuk kebutuhan interoperabilitas.

Kami tidak memulai proyek healthcare dengan bertanya, “fitur apa yang mau dibuat?” Pertanyaan pertama biasanya lebih sederhana: dari pasien datang sampai pulang, siapa mengerjakan apa, data apa yang berubah, dan di titik mana proses paling sering tersendat?

Jawaban dari pertanyaan itu menjadi fondasi sistem.

![Tampilan sistem manajemen klinik Codeverta](/assets/healthcare/manajemen-klinik.png)

_Contoh antarmuka sistem manajemen klinik untuk menyatukan pekerjaan administratif dan pelayanan._

## Membangun Fondasi: Satu Alur, Satu Riwayat Pasien

Sistem healthcare yang baik tidak boleh terasa seperti kumpulan menu. Ia harus mengikuti perjalanan pasien.

Ketika pasien mendaftar, sistem membentuk atau menemukan identitas yang tepat. Saat pasien masuk poli, dokter melihat riwayat yang relevan. Ketika dokter membuat resep atau permintaan pemeriksaan, farmasi dan laboratorium menerima data tanpa mengetik ulang. Setelah pelayanan selesai, informasi klinis dan transaksi tetap terhubung pada kunjungan yang sama.

Prinsip tersebut kami terapkan dalam beberapa lapisan.

### Pendaftaran dan identitas pasien

Pencarian data harus cepat, tetapi tidak boleh serampangan. Sistem perlu membantu petugas mengenali kemungkinan data ganda, menyimpan identitas secara konsisten, serta mempertahankan hubungan antara pasien, kunjungan, penjamin, dan fasilitas.

![Detail data pasien dalam sistem healthcare](/assets/healthcare/patient-detail.png)

_Data demografi, informasi kontak, dan konteks pelayanan disimpan dalam profil yang terstruktur._

### Rekam medis elektronik yang benar-benar dipakai

RME bukan arsip PDF yang dipindahkan ke komputer. Di dalamnya ada catatan pemeriksaan, diagnosis, alergi, tindakan, observasi klinis, resep, hasil penunjang, serta jejak perubahan data.

Tantangan terbesarnya bukan menambah sebanyak mungkin kolom. Tantangannya adalah membuat dokter dapat mencatat secara lengkap tanpa memperpanjang waktu konsultasi. Karena itu, struktur form, urutan informasi, hak akses, dan template klinis perlu disusun bersama pengguna.

![Rekam medis elektronik pada platform healthcare Codeverta](/assets/healthcare/rekam-medis-elektronik.png)

_RME menjadi pusat konteks pelayanan, bukan sekadar pengganti map kertas._

![Riwayat pelayanan pasien dalam satu tampilan](/assets/healthcare/patient-history.png)

_Riwayat yang tersambung membantu tenaga kesehatan memahami apa yang sudah terjadi pada kunjungan sebelumnya._

### Alur dokter dan koordinasi antarunit

Dokter membutuhkan ringkasan yang ringkas: pasien hari ini, status antrean, hasil pemeriksaan yang belum ditinjau, serta tindakan yang perlu dilanjutkan. Tim operasional membutuhkan pandangan berbeda. Sistem perlu menyediakan keduanya tanpa membuat salinan data baru.

![Dashboard dokter dalam sistem healthcare Codeverta](/assets/healthcare/doctor-dashboard.png)

_Dashboard dokter menempatkan pekerjaan yang perlu ditindaklanjuti dalam satu ruang kerja._

![Jadwal pasien dan tenaga kesehatan](/assets/healthcare/patient-schedule.png)

_Penjadwalan terhubung membantu mengurangi benturan jadwal dan antrean yang tidak perlu._

## Integrasi SATUSEHAT Dimulai Jauh Sebelum Memanggil API

SATUSEHAT adalah platform resmi Kementerian Kesehatan untuk menghubungkan sistem informasi kesehatan melalui standardisasi dan integrasi RME. Pertukaran datanya menggunakan standar global HL7 FHIR. Kemenkes juga membedakan alur fasilitas yang memakai RME dari mitra/vendor dan fasilitas yang mengembangkan RME mandiri.

Secara teknis, dokumentasi API memang penting. Tetapi integrasi tidak dimulai dari endpoint. Integrasi dimulai dari kualitas data di dalam fasilitas.

Sebelum sebuah kunjungan dapat dikirim, sistem harus mengetahui pasien yang benar, tenaga kesehatan yang memberikan layanan, organisasi dan lokasi pelayanan, waktu encounter, diagnosis, observasi, sampai obat yang diresepkan. Kalau data sumbernya tidak konsisten, koneksi API yang berhasil pun belum menghasilkan interoperabilitas yang baik.

![Ilustrasi interoperabilitas data kesehatan nasional](/assets/healthcare/editorial/satusehat-interoperability-indonesia.png)

_Ilustrasi editorial: klinik, rumah sakit, laboratorium, dan farmasi bertukar data melalui lapisan interoperabilitas yang aman._

Dalam pekerjaan integrasi, Codeverta membantu menerjemahkan kejadian di lapangan menjadi struktur data yang dapat dipertukarkan. Contohnya:

- identitas pasien dipetakan ke resource `Patient`;
- tenaga kesehatan dan fasilitas dipetakan melalui `Practitioner`, `Organization`, dan `Location`;
- pendaftaran serta perjalanan kunjungan dicatat sebagai `Encounter`;
- diagnosis dan keluhan klinis dapat menggunakan `Condition`;
- hasil pemeriksaan dan tanda vital dikirim sebagai `Observation`;
- resep dan pengeluaran obat menggunakan resource seperti `MedicationRequest` dan `MedicationDispense`.

Untuk rawat jalan, dokumentasi SATUSEHAT juga mengatur penggunaan IHS Number pasien dari Master Patient Index Kementerian Kesehatan. Sementara pada pelayanan kefarmasian, alurnya mencakup data resep, pengeluaran obat, dan pembaruan kunjungan. Artinya, integrasi bukan satu tombol “kirim semua”, melainkan rangkaian transaksi yang mengikuti konteks pelayanan.

Rujukan teknisnya selalu mengikuti dokumentasi resmi, termasuk [playbook rawat jalan SATUSEHAT](https://satusehat.kemkes.go.id/platform/docs/id/interoperability/rme-rawat-jalan/), [playbook pelayanan kefarmasian](https://satusehat.kemkes.go.id/platform/docs/id/interoperability/kefarmasian/), dan [panduan registrasi fasilitas](https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-institution/).

Catatan penting: Codeverta bukan pemilik atau pengelola SATUSEHAT. Platform tersebut dikelola oleh Kementerian Kesehatan. Kami membantu fasilitas kesehatan dan pengelola sistem RME menyiapkan aplikasi, data, proses integrasi, pengujian, serta monitoring yang dibutuhkan untuk terhubung dengan ekosistem tersebut.

## Bukan Hanya RME: Operasional Rumah Sakit Juga Harus Tersambung

Pelayanan kesehatan tidak berhenti di meja dokter. Ada laboratorium, farmasi, persediaan, pemeliharaan alat, penjadwalan ruangan, keuangan, serta pekerjaan administratif yang sama pentingnya.

### Laboratorium

Permintaan pemeriksaan perlu sampai ke unit yang tepat, menggunakan identitas pasien dan kunjungan yang sama. Setelah hasil diverifikasi, dokter harus dapat melihatnya tanpa menunggu berkas fisik atau pesan pribadi.

![Modul pemeriksaan laboratorium dalam sistem healthcare](/assets/healthcare/lab-test-investigation.png)

_Permintaan dan hasil pemeriksaan laboratorium tetap terhubung dengan kunjungan pasien._

### Resep, farmasi, dan persediaan

Resep digital bukan hanya daftar obat. Sistem perlu menangani dosis, aturan pakai, status penyerahan, stok, batch, hingga tanggal kedaluwarsa. Data klinis dan data inventory mempunyai kebutuhan berbeda, tetapi keduanya bertemu pada proses yang sama.

![Permintaan obat elektronik](/assets/healthcare/medication-request.png)

_Medication request menjaga alur resep tetap dapat ditelusuri dari dokter ke farmasi._

![Point of sale farmasi terintegrasi](/assets/healthcare/point-of-sales-pharamcy.png)

_Transaksi farmasi terhubung dengan persediaan agar pergerakan obat tidak dicatat dua kali._

![Analisis umur stok obat dan alat kesehatan](/assets/healthcare/stock-ageing.png)

_Stock ageing membantu tim melihat item yang lama tersimpan atau mendekati batas penggunaan._

### Aset dan pemeliharaan

Alat kesehatan tidak cukup hanya terdaftar sebagai inventaris. Ada jadwal kalibrasi, pemeliharaan, kerusakan, penanggung jawab, dan catatan tindakan yang perlu terdokumentasi.

![Daftar tugas pemeliharaan aset fasilitas kesehatan](/assets/healthcare/maintenance-tasks.png)

_Tim sarana dapat melihat pekerjaan maintenance yang terbuka dan prioritas tindak lanjutnya._

![Riwayat pemeliharaan aset kesehatan](/assets/healthcare/asset-maintenance-log.png)

_Log pemeliharaan membuat kondisi aset lebih mudah diaudit dan tidak bergantung pada ingatan satu orang._

### Struktur layanan dan pandangan manajemen

Fasilitas dengan banyak poli, ruangan, atau cabang perlu struktur unit yang jelas. Dari struktur tersebut, hak akses, jadwal, pembebanan biaya, dan pelaporan dapat mengikuti organisasi yang nyata.

![Struktur unit layanan fasilitas kesehatan](/assets/healthcare/service-unit-tree.png)

_Struktur unit membantu sistem mengikuti organisasi fasilitas, bukan sebaliknya._

![Analisis profitabilitas layanan healthcare](/assets/healthcare/profitability-analysis.png)

_Manajemen dapat melihat sisi operasional dan finansial tanpa membongkar spreadsheet dari banyak unit._

## Infrastruktur yang Tidak Terlihat, tetapi Menentukan

Pengguna melihat form, tabel, dan dashboard. Di belakang itu ada pekerjaan yang tidak kalah penting:

- kontrol akses berbasis peran untuk dokter, perawat, farmasi, kasir, dan administrator;
- audit trail agar perubahan data penting dapat ditelusuri;
- validasi data sebelum masuk ke antrean integrasi;
- mekanisme retry ketika layanan eksternal sedang tidak tersedia;
- pencatatan respons API untuk membantu investigasi kegagalan;
- pemisahan environment pengembangan, sandbox, dan production;
- backup, monitoring, dan prosedur pemulihan layanan;
- perlindungan data pribadi sesuai konteks dan kewenangan pengguna.

Khusus integrasi SATUSEHAT, status HTTP 200 atau 201 bukan satu-satunya ukuran keberhasilan. Tim juga perlu mengetahui resource mana yang sudah terkirim, mana yang ditolak, mengapa ditolak, dan apakah perbaikannya aman dilakukan tanpa membuat data ganda.

Kemenkes menyediakan dashboard monitoring untuk melihat pengiriman data RME yang berhasil. Di sisi aplikasi, kami melengkapi kebutuhan itu dengan pencatatan dan alat monitoring operasional agar tim fasilitas tidak perlu menebak-nebak ketika terjadi masalah.

![Daftar isu operasional dalam platform healthcare](/assets/healthcare/issues.png)

_Isu dan tindak lanjut perlu tercatat seperti bagian lain dari operasional, bukan hilang di percakapan pribadi._

## Cara Kami Menjalankan Implementasi

Setiap fasilitas mempunyai kebiasaan, skala, dan tingkat kesiapan berbeda. Karena itu implementasi tidak kami perlakukan seperti memasang aplikasi lalu menyerahkan akun.

Biasanya pekerjaan berjalan dalam beberapa tahap.

**Pertama, memetakan alur yang benar-benar terjadi.** Kami mengikuti perjalanan data dari pendaftaran, pelayanan, penunjang, farmasi, pembayaran, sampai pelaporan. Proses yang hanya ada di SOP tetapi tidak terjadi di lapangan perlu dibedakan sejak awal.

**Kedua, merapikan master data.** Identitas pasien, tenaga kesehatan, lokasi, unit, layanan, obat, dan terminologi klinis diperiksa sebelum migrasi atau integrasi. Ini pekerjaan yang sunyi, tetapi dampaknya besar.

**Ketiga, membangun modul secara bertahap.** Tim fasilitas dapat mencoba alur inti lebih dulu. Masukan dari dokter, perawat, petugas pendaftaran, dan farmasi dipakai untuk memperbaiki cara kerja sistem.

**Keempat, menyiapkan interoperabilitas.** Mapping FHIR, autentikasi, validasi, pengujian pada sandbox, penanganan error, serta monitoring disusun mengikuti playbook SATUSEHAT yang relevan.

**Kelima, mendampingi go-live.** Pada minggu-minggu awal, masalah kecil perlu ditangani cepat. Kadang bukan bug, melainkan istilah yang membingungkan atau urutan tombol yang tidak cocok dengan ritme pelayanan.

Pendekatan ini memang lebih banyak mendengar. Untuk healthcare, itu justru keharusan.

## Ukuran Keberhasilan yang Kami Cari

Kami berhati-hati dengan janji seperti “semua proses menjadi 10 kali lebih cepat”. Fasilitas kesehatan terlalu kompleks untuk diringkas menjadi satu angka.

Ukuran yang lebih masuk akal adalah hal-hal yang dapat dirasakan dan diperiksa:

- petugas tidak lagi mengetik identitas pasien berkali-kali;
- dokter dapat menemukan riwayat penting tanpa membuka banyak aplikasi;
- hasil laboratorium dan resep tersambung ke kunjungan yang benar;
- tim farmasi mempunyai jejak pergerakan stok;
- manajemen mendapat laporan dari sumber data yang sama;
- tim integrasi dapat melihat status pengiriman dan memperbaiki error;
- fasilitas mempunyai fondasi yang lebih siap untuk mengikuti standar Kemenkes.

Digitalisasi yang baik sering terasa biasa setelah dipakai. Antrean bergerak, data ditemukan, resep sampai, hasil pemeriksaan terlihat, dan laporan terbentuk. Tidak ada pertunjukan teknologi. Sistem cukup bekerja.

## Membangun Healthcare Digital Indonesia, Satu Sistem yang Bisa Dipakai

Transformasi kesehatan nasional membutuhkan platform besar seperti SATUSEHAT. Namun platform nasional tetap membutuhkan ribuan sistem di rumah sakit, klinik, laboratorium, apotek, dan fasilitas lain yang mampu menghasilkan data berkualitas.

Di ruang itulah Codeverta bekerja.

Kami membantu fasilitas kesehatan membangun sistem operasional yang dekat dengan kebutuhan pengguna sekaligus menyiapkan struktur data dan infrastruktur integrasi yang mengikuti arah Kementerian Kesehatan. Tujuannya bukan sekadar lolos koneksi API. Tujuannya adalah membuat data bergerak dengan benar tanpa mengganggu pelayanan kepada pasien.

Jika fasilitas Anda sedang menyiapkan RME, membenahi sistem klinik atau rumah sakit, menghubungkan farmasi dan laboratorium, atau merencanakan integrasi SATUSEHAT, Codeverta dapat membantu mulai dari pemetaan proses sampai implementasi dan pendampingan teknis.

Karena pada akhirnya, teknologi healthcare yang bagus bukan yang paling ramai dibicarakan. Teknologi yang bagus adalah yang membuat tenaga kesehatan punya lebih banyak waktu untuk merawat manusia.
