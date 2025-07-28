"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { WhatsAppIcon, WhatsappWrapper } from "@/components/WhatsappButton";

const logos = [
  {
    src: "/assets/jogja.png",
    alt: "Pemprov Yogyakarta",
  },
  {
    src: "/assets/uny.png",
    alt: "Universitas Negeri Yogyakarta",
  },
  {
    src: "/assets/bapperida.png",
    alt: "Bapperida Yogyakarta",
  },
  {
    src: "/assets/souvenirlilin.png",
    alt: "Million Candles",
  },
  {
    src: "/assets/cynus.png",
    alt: "Cynus Camp",
  },
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: "Desain Website Profesional",
      description:
        "Kami merancang website modern dan responsif yang optimal di semua perangkat, dari desktop hingga mobile.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Optimasi SEO & Performa",
      description:
        "Tingkatkan peringkat di Google dan berikan pengalaman pengguna terbaik dengan website yang cepat dan teroptimasi.",
      icon: <BarChart className="size-5" />,
    },
    {
      title: "Perbaikan & Maintenance",
      description:
        "Mengalami masalah dengan website Anda? Tim kami siap memperbaiki bug, error, dan melakukan pembaruan rutin.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Keamanan Website Terjamin",
      description:
        "Lindungi data dan pengunjung website Anda dari ancaman siber dengan sistem keamanan berlapis.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Layanan IT Support",
      description:
        "Solusi untuk semua masalah teknis IT Anda, mulai dari troubleshooting hardware hingga manajemen jaringan.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "Dukungan Aftersales",
      description:
        "Kami tidak hanya membuat, tapi juga memastikan website dan sistem IT Anda berjalan lancar setelah serah terima.",
      icon: <Star className="size-5" />,
    },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Jl Kaliurang KM 9.3, Ngaglik, Sleman, Yogyakarta
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Jasa Pembuatan Website, Aplikasi & Layanan IT Lainnya
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Kami menyediakan jasa pembuatan, perbaikan, pengembangan website
                profesional dan layanan IT untuk mendorong pertumbuhan bisnis
                Anda di era digital untuk bisnis skala kecil sampai menengah.
                <br />
                <span className="text-red-600 text-sm">* Bukan website template wordpress</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/+6285726394401?text=Halo%20saya%20tertarik%20dengan%20produk%20Anda"
                  target="_blank"
                >
                  <Button
                    size="lg"
                    className="rounded-full h-12 px-8 text-base"
                  >
                    <WhatsAppIcon />
                    Whatsapp Sekarang
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </a>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base"
                >
                  Book a Demo
                </Button> */}
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Konsultasi Gratis</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Proses Cepat</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Garansi Sampai Puas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Jujur & Dapat Dipercaya</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
                <Image
                  src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
                  width={1280}
                  height={720}
                  alt="SaaSify dashboard"
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-70"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-3xl opacity-70"></div>
            </motion.div>
          </div>
        </section>
        {/* Trusted By Section */}
        <section className="w-full bg-background py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-4xl text-center"
            >
              <h2 className="text-center text-lg font-semibold leading-8 text-muted-foreground">
                Dipercaya oleh UMKM, Startup, Bisnis, dan Pemerintahan
              </h2>
              <div className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                {logos.map((logo, index) => (
                  <Image
                    key={index}
                    className="col-span-1 max-h-16 w-full object-contain opacity-60 transition-opacity hover:opacity-100 dark:invert"
                    src={logo.src}
                    alt={logo.alt}
                    width={316}
                    height={86}
                    unoptimized // Opsional: gunakan jika logo Anda dari host eksternal
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Layanan Kami
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Solusi Lengkap untuk Kebutuhan Digital Anda
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Dari website yang memukau hingga dukungan IT yang andal, kami
                menyediakan semua yang Anda butuhkan untuk sukses secara online.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="development"
          className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Proses Mudah, Hasil Maksimal
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Proses Pengembangan
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Mulai proyek Anda hanya dalam 3 langkah sederhana bersama tim
                ahli kami.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              {[
                {
                  step: "01",
                  title: "Konsultasi Kebutuhan",
                  description:
                    "Diskusikan ide, tujuan, dan kebutuhan spesifik proyek Anda bersama kami secara gratis.",
                },
                {
                  step: "02",
                  title: "Proses Desain & Pengembangan",
                  description:
                    "Tim kami akan merancang dan membangun website atau solusi IT Anda sesuai dengan hasil diskusi.",
                },
                {
                  step: "03",
                  title: "Peluncuran & Maintenance",
                  description:
                    "Kami luncurkan proyek Anda ke publik dan memberikan maintenance untuk memastikan semua berjalan lancar.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Testimoni
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Apa Kata Klien Kami
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Jangan hanya percaya kata kami. Lihat apa yang dikatakan para
                klien yang puas dengan layanan kami.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "Codeverta mengubah total tampilan website kami menjadi lebih profesional. Pengunjung meningkat drastis!",
                  author: "Sarah Widjaja",
                  role: "Owner, Butik Elegan",
                  rating: 5,
                },
                {
                  quote:
                    "Website lama kami sangat lambat. Setelah diperbaiki oleh Codeverta, kecepatannya luar biasa. Terima kasih!",
                  author: "Budi Santoso",
                  role: "Manajer Marketing, Maju Jaya Motor",
                  rating: 5,
                },
                {
                  quote:
                    "Dukungan IT mereka sangat responsif. Setiap masalah teknis di kantor kami selesai dalam sekejap. Sangat direkomendasikan.",
                  author: "Emily Hartono",
                  role: "Kepala Operasional, Startup Cepat",
                  rating: 5,
                },
                {
                  quote:
                    "Proses pembuatannya transparan dan hasilnya melebihi ekspektasi. Website kami sekarang menjadi mesin penjualan utama.",
                  author: "David Kim",
                  role: "CEO, InnovateNow",
                  rating: 5,
                },
                {
                  quote:
                    "Sangat mudah berkomunikasi dengan tim Codeverta. Mereka benar-benar memahami visi yang kami inginkan untuk website kami.",
                  author: "Lisa Puspita",
                  role: "Direktur Kreatif, Galeri Seni",
                  rating: 5,
                },
                {
                  quote:
                    "Investasi terbaik yang pernah kami lakukan. Sejak website baru diluncurkan, omzet kami naik hingga 40%. Luar biasa!",
                  author: "James Wilson",
                  role: "COO, ScaleUp Inc",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className="size-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                      </div>
                      <p className="text-lg mb-6 flex-grow">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                        <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Harga
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Paket Harga yang Fleksibel & Transparan
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Pilih paket yang paling sesuai untuk bisnis Anda. Tidak ada
                biaya tambahan.
              </p>
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <Tabs defaultValue="monthly" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="rounded-full p-1">
                    <TabsTrigger value="monthly" className="rounded-full px-6">
                      Skala UMKM & UKM
                    </TabsTrigger>
                    <TabsTrigger value="annually" className="rounded-full px-6">
                      Enterprise
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly">
                  <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    {[
                      {
                        name: "Paket Basic",
                        price: "Rp 1,5 Jt",
                        description:
                          "Cocok untuk profil perusahaan atau portofolio.",
                        features: [
                          "Desain Custom Sesuai Permintaan",
                          "Cocok Untuk UMKM",
                          "Fitur Dasar (Kontak, Layanan, Katalog Produk dll)",
                          "Gratis Domain & Hosting 1 Tahun",
                          "Hand Coded, Bukan Template Wordpress",
                        ],
                        cta: "Pilih Paket",
                      },
                      {
                        name: "Paket Bisnis",
                        price: "Rp 4 Jt",
                        description:
                          "Ideal untuk UKM dan bisnis yang sedang berkembang.",
                        features: [
                          "Desain Custom Sesuai Permintaan",
                          "Lebih dari 10 Halaman",
                          "Optimasi SEO",
                          "Pengerjaan Prioritas",
                        ],
                        cta: "Pilih Paket",
                        popular: true,
                      },
                      {
                        name: "Solusi Custom",
                        price: "Nego",
                        description:
                          "Untuk perusahaan dengan kebutuhan kompleks.",
                        features: [
                          "Fitur Kompleks (E-commerce, dll)",
                          "Desain & Sistem Sesuai Kebutuhan",
                          "Laporan Performa Bulanan",
                          "Maintenance Lebih dari 1 Tahun",
                        ],
                        cta: "Hubungi Sales",
                      },
                    ].map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Card
                          className={`relative overflow-hidden h-full ${
                            plan.popular
                              ? "border-primary shadow-lg"
                              : "border-border/40 shadow-md"
                          } bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                              Most Popular
                            </div>
                          )}
                          <CardContent className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <div className="flex items-baseline mt-4">
                              <span className="text-4xl font-bold">
                                {plan.price}
                              </span>
                              <span className="text-muted-foreground ml-1">
                                /sekali bayar
                              </span>
                            </div>
                            <p className="text-muted-foreground mt-2">
                              {plan.description}
                            </p>
                            <ul className="space-y-3 my-6 flex-grow">
                              {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center">
                                  <Check className="mr-2 size-4 text-primary" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <WhatsappWrapper>
                              <Button
                                className={`w-full mt-auto rounded-full ${
                                  plan.popular
                                    ? "bg-primary hover:bg-primary/90"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                                variant={plan.popular ? "default" : "outline"}
                              >
                                {plan.cta}
                              </Button>
                            </WhatsappWrapper>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="annually">
                  <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    <div></div>
                    {[
                      {
                        name: "Enterprise",
                        price: "Rp >20 Jt",
                        description:
                          "Untuk Perusahaan dengan Sistem yang Kompleks",
                        features: [
                          "Fitur Custom Sesuai Permintaan",
                          "Integrasi dengan Sistem/Apilikasi Lain",
                          "Backup Data Berkala di Cloud",
                          "Monitoring Keamanan, Performa 24/7",
                          "Pengerjaan Prioritas",
                          "Maintenance Lebih dari 1 Tahun",
                        ],
                        cta: "Contact Sales",
                      },
                    ].map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Card
                          className={`relative overflow-hidden h-full ${
                            plan.popular
                              ? "border-primary shadow-lg"
                              : "border-border/40 shadow-md"
                          } bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                              Most Popular
                            </div>
                          )}
                          <CardContent className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <div className="flex items-baseline mt-4">
                              <span className="text-4xl font-bold">
                                {plan.price}
                              </span>
                            </div>
                            <p className="text-muted-foreground mt-2">
                              {plan.description}
                            </p>
                            <ul className="space-y-3 my-6 flex-grow">
                              {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center">
                                  <Check className="mr-2 size-4 text-primary" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <WhatsappWrapper>
                              <Button
                                className={`w-full mt-auto rounded-full ${
                                  plan.popular
                                    ? "bg-primary hover:bg-primary/90"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                                variant={plan.popular ? "default" : "outline"}
                              >
                                {plan.cta}
                              </Button>
                            </WhatsappWrapper>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Pertanyaan Umum
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Temukan jawaban untuk pertanyaan yang paling sering diajukan
                mengenai layanan kami.
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "Berapa lama proses pembuatan sebuah website?",
                    answer:
                      "Waktu pengerjaan bervariasi tergantung kompleksitas. Untuk Paket Basic biasanya memakan waktu 1-2 minggu, sedangkan untuk sistem skala menengah dapat lebih lama(lebih dari 1 bulan). Waktu pengerjaan akan disesuaikan dengan permintaan fitur oleh client.",
                  },
                  {
                    question: "Apa saja yang perlu saya siapkan?",
                    answer:
                      "Anda cukup menyiapkan konten seperti teks profil perusahaan, daftar layanan/produk, dan gambar/foto yang ingin ditampilkan. Jika belum ada, tim kami bisa membantu mengarahkannya.",
                  },
                  {
                    question:
                      "Apakah ada layanan maintenance setelah website jadi?",
                    answer:
                      "Tentu. Kami menyediakan paket maintenance bulanan atau tahunan yang mencakup update, backup, dan monitoring keamanan. Anda juga bisa menghubungi kami jika butuh perbaikan sewaktu-waktu.",
                  },
                  {
                    question:
                      "Bisakah Anda memperbaiki website saya yang sudah ada?",
                    answer:
                      "Ya, kami bisa. Tim kami akan melakukan audit terlebih dahulu untuk mengidentifikasi masalah pada website Anda, mulai dari error, kecepatan, hingga tampilan, lalu memberikan solusi perbaikan terbaik.",
                  },
                  {
                    question:
                      "Pembayarannya bagaimana? Apakah ada uang muka?",
                    answer:
                      "Pembayaran dilakukan dengan sistem DP 30% di awal, sisanya dibayar setelah website selesai dan disetujui. Kami juga menyediakan opsi pembayaran bertahap untuk proyek besar.",
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-border/40 py-2"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Siap Memiliki Website Profesional?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Hubungi kami hari ini untuk konsultasi gratis. Mari kita bangun
                kehadiran digital yang kuat untuk bisnis Anda bersama-sama.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base"
                >
                  Gratis Konsultasi
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  Hubungi sekarang
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}