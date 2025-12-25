// File: src/pages/Tentang.jsx
// Anda bisa menggunakan komponen dari Shadcn seperti <Card>, <Button>, <Accordion>, dll.

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Code, ShieldCheck } from "lucide-react"; // Contoh ikon dari lucide-react
import { WhatsappWrapper } from "@/components/WhatsappButton";
import SeoHead from "@/components/SeoHead";
import { withI18n } from "@/lib/withi18n";

export const getStaticProps = withI18n(["common"]);

export default function TentangPage() {
  return (
    <>
      <SeoHead
        title="Tentang Codeverta – Solusi Digital untuk UMKM, Bisnis, Pemerintahan di Yogyakarta"
        description="Pelajari lebih lanjut tentang Codeverta, penyedia jasa IT yang berdedikasi membantu digitalisasi UMKM di Yogyakarta dengan solusi berkualitas tinggi dan transparan."
        url="https://bikinwebsitejogja.com/about"
        image="https://bikinwebsitejogja.com/og-image.png"
      />
      <div className="container max-w-6xl mx-auto py-12 px-4 space-y-16">
        {/* Section 1: Hero */}
        <section className="text-center space-y-4 flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Tentang Codeverta
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Kami adalah penyedia jasa IT yang berdedikasi untuk membangun solusi
            digital berkualitas tinggi dengan proses yang jujur dan transparan.
            Misi kami adalah membantu digitalisasi UMKM di Yogyakarta agar dapat
            bersaing di era modern.
          </p>
          <WhatsappWrapper>
            <Button size="lg">Konsultasi Gratis</Button>
          </WhatsappWrapper>
        </section>

        {/* Section 2: Tentang Codeverta - Lebih Fokus pada "Kenapa Kami Ada" */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tentang Codeverta</CardTitle>
            </CardHeader>
            <CardContent className="text-md text-muted-foreground">
              <p>
                Codeverta lahir dari sebuah keyakinan: setiap bisnis, besar
                maupun kecil, berhak mendapatkan partner pengembangan teknologi
                yang bisa dipercaya. Terlalu sering kami melihat proyek digital
                yang gagal karena komunikasi yang buruk, biaya tersembunyi, atau
                hasil yang tidak sesuai harapan.
                <br />
                <br />
                Oleh karena itu, kami hadir untuk mengubahnya. Kami adalah tim
                developer, desainer, dan konsultan IT profesional yang
                berkomitmen pada tiga hal: kualitas kode, komunikasi yang
                transparan, dan kesuksesan klien. Misi kami adalah mewujudkan
                visi digital Anda menjadi solusi nyata yang berfungsi dengan
                baik dan memberikan nilai tambah bagi bisnis Anda.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Mengapa Memilih Kami? (Why Choose Us?) - Menggunakan Grid Cards */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Mengapa Bermitra dengan Codeverta?
            </h2>
            <p className="text-muted-foreground mt-2">
              Keunggulan yang kami tawarkan untuk menjamin kesuksesan proyek
              Anda.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-base">
            {/* Card 1: Jujur & Transparan */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <CardTitle>Jujur & Transparan</CardTitle>
              </CardHeader>
              <CardContent>
                Tidak ada biaya tersembunyi. Kami menyediakan rincian biaya yang
                jelas dan komunikasi terbuka di setiap tahap proyek.
              </CardContent>
            </Card>
            {/* Card 3: Kualitas & Teknologi Modern */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Code className="w-8 h-8 text-primary" />
                <CardTitle>Teknologi Modern</CardTitle>
              </CardHeader>
              <CardContent>
                Solusi yang kami bangun menggunakan teknologi terkini yang
                scalable, aman, dan mudah dikelola di masa depan.
              </CardContent>
            </Card>
            {/* Card 4: Fokus pada Hasil */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Target className="w-8 h-8 text-primary" />
                <CardTitle>Fokus Pada Hasil</CardTitle>
              </CardHeader>
              <CardContent>
                Kesuksesan kami diukur dari kesuksesan Anda. Kami berkomitmen
                untuk memberikan produk yang berfungsi optimal dan tepat
                sasaran.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: Layanan Kami (Our Services) - Bisa menggunakan Accordion atau Cards */}
        <section className="space-y-6 ">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Layanan Profesional Kami</h2>
            <p className="text-muted-foreground mt-2">
              Solusi digital yang kami sediakan untuk mendorong pertumbuhan
              bisnis Anda.
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 ">
            {/* Anda bisa menggunakan <Accordion> di sini atau tetap dengan <Card> */}
            <Card>
              <CardHeader>
                <CardTitle>Pembuatan Website & Landing Page</CardTitle>
                <CardDescription>
                  Website modern, responsif, dan SEO-friendly untuk Company
                  Profile, Portofolio, atau kampanye marketing.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pengembangan Sistem Informasi Custom</CardTitle>
                <CardDescription>
                  Sistem manajemen (CRM, ERP), sistem kasir (POS), atau aplikasi
                  internal lainnya yang dirancang khusus sesuai alur kerja
                  bisnis Anda.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Solusi E-commerce & Toko Online</CardTitle>
                <CardDescription>
                  Platform jual beli online yang aman, terintegrasi dengan
                  payment gateway, dan mudah dikelola.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>UI/UX Design & Prototyping</CardTitle>
                <CardDescription>
                  Merancang antarmuka yang intuitif dan pengalaman pengguna yang
                  menyenangkan sebelum masuk tahap pengembangan.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Section 5: Call to Action (CTA) */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
          <div className="text-center space-y-4 flex flex-col gap-2">
            <h2 className="text-3xl  font-bold">
              Siap Mengubah Ide Anda Menjadi Solusi Digital?
            </h2>
            <p className="max-w-2xl mx-auto">
              Mari diskusikan kebutuhan Anda. Kami siap memberikan konsultasi
              awal secara gratis untuk membantu Anda menemukan solusi teknologi
              yang paling tepat, tanpa paksaan.
            </p>
            <WhatsappWrapper>
              <Button variant="secondary" size="lg">
                Hubungi Kami Sekarang
              </Button>
            </WhatsappWrapper>
          </div>
        </section>
      </div>
    </>
  );
}
