---
title: "Batch, Tanggal Kedaluwarsa, dan FEFO untuk Persediaan Gudang"
date: "2026-10-08"
image: "/images/blog/software-guides/warehouse-management-software.jpg"
desc: "Cara mencatat batch dan tanggal kedaluwarsa, membedakan FIFO dari FEFO, serta menguji alur karantina, picking, retur, dan penarikan barang."
tags: "batch number, tanggal kedaluwarsa, FEFO, FIFO, manajemen stok, WMS"
---

# Batch, Tanggal Kedaluwarsa, dan FEFO untuk Persediaan Gudang

Jika barang memiliki masa simpan, mengetahui total stok saja tidak cukup. Tim perlu tahu lot mana yang ada, kapan tanggal kedaluwarsanya, lokasi penyimpanan, dan apakah barang boleh dipakai atau dijual. Catatan per batch membantu menjawabnya tanpa mencampur unit dari penerimaan yang berbeda.

## Bedakan batch, serial, dan tanggal kedaluwarsa

**Batch atau lot** mengelompokkan barang yang berasal dari satu proses produksi atau penerimaan tertentu. **Nomor seri** mengidentifikasi satu unit secara individual. Tanggal kedaluwarsa atau batas penggunaan biasanya berlaku untuk batch, walaupun format dan istilah pada label mengikuti jenis barang serta informasi pemasok.

Catat nilai yang benar-benar tertera dan diperlukan untuk proses bisnis—jangan menyimpulkan tanggal ketika label tidak jelas. Barang dengan tanggal yang tidak terbaca dapat ditahan untuk pemeriksaan sampai informasi pemasok atau pemilik produk memastikan statusnya.

## FEFO berbeda dari FIFO

FIFO (_first in, first out_) mengeluarkan stok yang paling awal diterima. FEFO (_first expired, first out_) memilih stok dengan tanggal kedaluwarsa paling dekat terlebih dahulu, dengan syarat barang masih layak dan dapat digunakan untuk pesanan tersebut.

Contoh: Lot A diterima pada 10 Mei dan kedaluwarsa 30 Juni. Lot B diterima pada 20 Mei dan kedaluwarsa 31 Mei. Jika kedua lot lolos pemeriksaan dan memenuhi kebutuhan pesanan, FEFO mengarahkan tim memilih Lot B lebih dulu meskipun lot itu datang belakangan. Aturan ini membantu rotasi berdasarkan tanggal, tetapi tidak menggantikan inspeksi mutu atau prosedur penarikan produk.

## Informasi yang perlu dicatat pada penerimaan

Untuk setiap lot, tentukan field dan kontrol yang dibutuhkan, misalnya:

- kode barang dan satuan;
- nomor batch/lot dari produsen atau pemasok;
- tanggal kedaluwarsa atau batas penggunaan yang tercetak;
- jumlah yang diterima serta lokasi penyimpanan;
- pemasok, dokumen penerimaan, dan waktu pencatatan;
- status pemeriksaan seperti tersedia, ditahan, rusak, atau dikarantina.

Pertahankan hubungan antara lot dan transaksi asal. Dengan begitu, koreksi tanggal, pemindahan lokasi, retur, dan keputusan pelepasan dari karantina dapat ditelusuri ke orang serta dokumen yang terkait.

## Uji workflow, bukan hanya tampilan daftar tanggal

Saat mengevaluasi sistem inventory atau WMS, gunakan contoh barang dengan dua lot dan tanggal berbeda. Periksa apakah sistem dapat:

1. Meminta batch serta tanggal yang diperlukan saat barang diterima.
2. Memisahkan barang yang menunggu pemeriksaan dari stok yang boleh dialokasikan.
3. Menyarankan lot sesuai aturan FEFO yang disepakati dan memperlihatkan bila operator memilih lot lain.
4. Menangani picking parsial ketika jumlah di lot terdekat tidak mencukupi.
5. Mencatat retur dan alasan barang kembali ke stok, karantina, atau rusak.
6. Menemukan transaksi dan pelanggan yang terkait jika satu batch perlu ditelusuri kembali.

Pastikan aturan untuk barang tanpa tanggal, tanggal terlewat, barang yang kedaluwarsa saat sudah dialokasikan, dan substitusi lot dijelaskan. Perbedaan tersebut lebih penting daripada dashboard yang hanya menampilkan hitungan “hampir kedaluwarsa”.

## Ukur proses sebelum memperluas rollout

Mulai dengan kategori dan lokasi yang paling sulit ditelusuri. Bersihkan master item, tentukan siapa yang memeriksa label penerimaan, dan uji apakah staf dapat memisahkan lot fisik di rak. Pantau kelengkapan data batch, barang yang ditahan, picking yang perlu diganti, retur, serta koreksi tanggal. Setelah alur berjalan konsisten, pertimbangkan penambahan zona atau kategori lain.

Untuk pencatatan dan rotasi lokasi barang, baca [panduan software manajemen gudang](/blog/panduan-lengkap-software-manajemen-gudang). Jika kebutuhan utama masih berupa jumlah dan mutasi, mulai dari [panduan software inventory](/blog/software-inventory-aplikasi-stok-barang). Bisnis distributor juga dapat membaca [panduan software distributor](/blog/software-distributor-indonesia) tentang hubungan pesanan, stok, dan piutang.

Jika sedang menilai sistem untuk alur batch, gunakan skenario penerimaan dan picking di atas saat membahas [WMS Codeverta](/products/warehouse-management-system); minta konfirmasi khusus tentang dukungan dan batas proses yang dapat diuji.

## Pertanyaan yang sering diajukan

### Apakah FEFO selalu lebih baik daripada FIFO?

Tidak untuk semua barang. FEFO relevan ketika tanggal kedaluwarsa atau batas penggunaan menentukan urutan prioritas. Barang tanpa masa simpan mungkin lebih tepat memakai aturan FIFO, lokasi, atau kriteria lain yang disepakati.

### Apakah scanner barcode otomatis mengetahui batch dan tanggal?

Hanya jika kode dan perangkat mendukung nilai tersebut serta sistem memetakannya dengan benar. Banyak alur perlu meminta operator memindai atau mencatat batch dan tanggal secara terpisah ketika menerima barang.

### Bagaimana menangani barang yang tanggalnya tidak terbaca?

Pisahkan barang dari stok yang boleh dijanjikan, catat sebagai pengecualian, lalu verifikasi dengan pemasok atau penanggung jawab produk sebelum melepasnya ke stok tersedia.
