# Panduan pengukuran Codeverta

Panduan ini membedakan minat yang terlihat di situs dari prospek yang sudah diverifikasi tim. Setup di Google Analytics dan Search Console tetap perlu dilakukan oleh pemilik akun; perubahan aplikasi tidak membuat properti, stream, atau akses akun baru.

## Event yang dikirim aplikasi

| Event                 | Arti                                                                                                                                                          | Perlakuan laporan                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `whatsapp_click`      | Pengunjung menekan tautan atau tombol untuk membuka WhatsApp. Ini hanya klik; aplikasi tidak dapat mengetahui apakah pesan dikirim atau percakapan berlanjut. | Pantau sebagai interaksi, jangan tandai sebagai key event atau prospek.                                                              |
| `contact_form_submit` | API menerima pengiriman formulir dan berhasil mengirim notifikasi.                                                                                            | Event diagnostik formulir; jangan tandai terpisah sebagai key event.                                                                 |
| `generate_lead`       | API menerima pengiriman formulir dan berhasil mengirim notifikasi. Event ini hanya berarti pengunjung mengirim permintaan.                                    | Jika sesuai tujuan bisnis, tandai sebagai key event untuk permintaan yang masuk. Ini belum berarti tim sudah mengualifikasi prospek. |

Event formulir mencakup `product`, `intent`, `service`, `source`, dan `locale` jika tersedia. Event WhatsApp juga membawa `product`, `intent`, `cta`, `source`, dan `locale` jika diketahui; event generik memakai `intent=general`. Pilihan `intent=demo` mencatat bahwa pengunjung meminta demo; klik CTA demo saja tidak dihitung sebagai permintaan formulir. Kualifikasi tetap dilakukan tim penjualan dan tidak dikirim sebagai event sampai ada proses kualifikasi yang nyata.

Nilai produk dan layanan dibatasi ke daftar aplikasi. `source`, `page_path`, dan `page_location` pada event aplikasi memakai pathname yang dinormalisasi tanpa query string atau fragment. Slug produk dan artikel publik tetap dipertahankan agar laporan dapat membedakan halaman; rute pendek yang tidak dikenal disamarkan. Teks WhatsApp, nama, email, nomor telepon, dan pesan bebas tidak dikirim sebagai parameter event. Pageview GA yang sudah ada tetap memakai konfigurasi otomatis stream; perubahan ini tidak mengganti mode pageview.

## Setup Google Analytics 4

1. Periksa properti dan web data stream GA4 yang sudah dipakai Codeverta. Gunakan Measurement ID stream yang sama di `NEXT_PUBLIC_GA_ID` pada environment lokal dan deployment. Jangan membuat properti atau stream baru hanya untuk perubahan ini. Jika akun atau stream belum tersedia, pemilik akun perlu menyelesaikan setup GA4 dan memberikan Measurement ID yang benar sebelum data aplikasi bisa masuk. Google menjelaskan bahwa pengukuran web memerlukan akun, properti, web data stream, dan tag situs ([panduan setup GA web](https://developers.google.com/analytics/devguides/collection/ga4/web)).
2. Aplikasi mempertahankan konfigurasi GA yang sudah ada: `gtag("config", GA_ID)` satu kali, termasuk pageview awal dan deteksi perubahan riwayat yang saat ini dikonfigurasi di stream. Perubahan ini tidak meminta pengaturan Enhanced Measurement diubah dan tidak mengirim event `page_view` manual dari komponen aplikasi. Event konversi aplikasi menggunakan pathname yang dinormalisasi; perilaku pageview otomatis tetap mengikuti konfigurasi stream ([panduan page view dan SPA](https://developers.google.com/analytics/devguides/collection/ga4/views?hl=en)).
3. Setelah deployment, buka **Reports → Realtime** atau **Admin → Data display → DebugView**, lalu kunjungi beberapa halaman. Pastikan pageview awal dan perubahan rute tercatat sesuai konfigurasi stream. Kirim satu formulir uji yang benar-benar berhasil diproses; pastikan `generate_lead` muncul hanya sesudah API mengonfirmasi `ok=true` dan `recorded=true`. Dokumentasi GA menyarankan verifikasi event SPA lewat DebugView ([panduan SPA](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)).
4. Tandai hanya `generate_lead` sebagai key event jika tim ingin mengukur formulir masuk sebagai hasil utama. `whatsapp_click` dan `contact_form_submit` tetap menjadi event interaksi/diagnostik. Key event harus menggambarkan tindakan bisnis yang terjadi; menandainya tidak mengubah arti event ([cara menandai event sebagai key event](https://support.google.com/analytics/answer/13128484?hl=en-SG)).
5. Untuk memecah laporan, buka **Admin → Data display → Custom definitions → Create custom dimensions**. Buat dimensi berlingkup **Event** untuk parameter `product`, `intent`, `service`, `source`, `locale`, dan `cta`. Buat hanya parameter yang benar-benar dipakai laporan. Data dimensi baru dapat memerlukan 24–48 jam setelah parameter terkumpul ([panduan custom dimension GA4](https://support.google.com/analytics/answer/14239696?hl=en)).

Laporan yang disarankan:

- **Leads masuk:** event name `generate_lead`, lalu pecah menurut `product`, `intent`, `service`, `source`, dan `locale`.
- **Minat demo:** `generate_lead` dengan `intent=demo`; pisahkan dari `intent=general`.
- **WhatsApp:** hitung `whatsapp_click` menurut `product`, `cta`, `source`, dan `locale`. Angka ini mengukur klik, bukan chat atau lead.
- **Kualitas lead:** catat status kualifikasi di CRM atau proses penjualan, lalu bandingkan secara manual dengan minat produk. Aplikasi belum mengirim status `qualified`.

## Setup Search Console

1. Pilih properti Search Console `codeverta.com` yang sudah ada jika tersedia. Jika belum, tambahkan **Domain property** `codeverta.com` dan verifikasi lewat DNS. Domain property mencakup subdomain serta variasi HTTP/HTTPS; verifikasi domain memakai record DNS ([menambah properti Search Console](https://support.google.com/webmasters/answer/34592?hl=en)).
2. Kirim sitemap situs yang tersedia di `/sitemap.xml` melalui **Indexing → Sitemaps**. Periksa beberapa URL ERP dan WMS dengan URL Inspection setelah deployment.
3. Buka **Performance → Search results**. Pilih tipe penelusuran **Web**, rentang waktu **28 hari terakhir**, lalu **Compare → Previous period**. Tambahkan filter **Country → Indonesia**. Ulangi perbandingan dengan periode tahun sebelumnya untuk mengurangi bias musiman. Search Console mendukung filter negara, halaman, kueri, dan rentang tanggal ([panduan laporan performa](https://support.google.com/webmasters/answer/7576553?hl=en)).
4. Untuk tren nonbrand ERP dan WMS, buat dua tampilan terpisah dengan filter negara **Indonesia** dan filter **Pages** untuk URL produk ERP atau WMS. Pada tab **Queries**, gunakan satu filter **Queries → Custom (regex) → Matches regex** untuk kelompok produk:

   - ERP: `(erp|enterprise resource planning|software erp|sistem erp|aplikasi erp)`
   - WMS: `(wms|warehouse management system|warehouse management|sistem manajemen gudang|software gudang|inventory gudang)`

   Search Console hanya menyediakan satu filter per dimensi dalam satu tampilan, jadi filter **Queries** yang sama tidak dapat ditumpuk untuk memasukkan regex produk sekaligus mengecualikan regex brand. Untuk analisis nonbrand yang lebih bersih, ekspor tabel Queries setelah filter produk, lalu keluarkan kueri bermerek seperti `codeverta`, `code verta`, dan `codeverta.com` di spreadsheet; simpan langkah pengecualian ini bersama ekspor. Regex Search Console memakai RE2, tidak mendukung lookahead, dan pencocokan default tidak peka huruf besar/kecil ([panduan filter regex dan perbandingan](https://support.google.com/webmasters/answer/17011165?hl=en)).

5. Catat klik, tayangan, CTR, dan posisi rata-rata per kelompok. Filter **Pages** yang memuat `products/enterprise-erp-system` untuk ERP atau `products/warehouse-management-system` untuk WMS menjaga tampilan tetap fokus pada halaman produk ketika tabel Queries dibaca atau diekspor. Ekspor CSV tiap bulan agar perubahan ranking dan konten bisa ditinjau bersama. Data kueri yang diekspor tetap dapat menyembunyikan sebagian kueri anonim.

Filter kueri/URL dapat mengubah total karena Search Console membatasi baris dan menyembunyikan sebagian kueri anonim. Gunakan angka grup sebagai indikator tren, bukan sebagai jumlah pencarian yang lengkap ([batasan data Search Console](https://support.google.com/webmasters/answer/17011165?hl=en)).
