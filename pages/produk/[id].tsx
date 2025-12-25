import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PricingCard from "@/components/products/PricingCard";

// Import semua ikon yang mungkin digunakan
import {
  ShoppingCart,
  BarChart3,
  Users,
  Package,
  CreditCard,
  Printer,
  Wifi,
  Shield,
  Clock,
  Database,
  Server,
  Monitor,
  CheckCircle,
  ExternalLink,
  Github,
  Download,
  Sparkles,
} from "lucide-react";

// Import modul Node.js untuk membaca file di sisi server
import fs from "fs";
import path from "path";
import { WhatsappWrapper } from "@/components/WhatsappButton";
import Head from "next/head";
// /components/ui/ProjectBreadcrumb.jsx

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Adjust path if needed
import { withI18n } from "@/lib/withi18n";

export function ProjectBreadcrumb({ projectName }) {
  return (
    <Breadcrumb className="mb-8">
      {" "}
      {/* Added margin-bottom for spacing */}
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/produk">Produk</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold text-slate-800">
            {projectName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Helper untuk memetakan nama ikon dari JSON ke komponen React
const iconMap = {
  ShoppingCart,
  BarChart3,
  Users,
  Package,
  CreditCard,
  Printer,
  Wifi,
  Shield,
  Clock,
  Database,
  Server,
  Monitor,
  CheckCircle,
  ExternalLink,
  Github,
  Download,
};

// Fungsi ini memberi tahu Next.js halaman mana yang harus dibuat saat build
export async function getStaticPaths({ locales }) {
  const filePath = path.join(process.cwd(), "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  const paths = locales.flatMap((locale) => {
    return data.projects.map((project) => ({
      params: { id: project.product.id },
      locale,
    }));
  });

  return { paths, fallback: false }; // fallback: false akan menampilkan halaman 404 jika ID tidak ditemukan
}

// Fungsi ini mengambil data untuk satu halaman proyek spesifik saat build
export const getStaticProps = withI18n(["common"], function ({ params }) {
  const filePath = path.join(process.cwd(), "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  // Cari proyek yang cocok dengan 'id' dari URL
  const project = data.projects.find((p) => p.product.id === params.id);
  // Jika proyek tidak ditemukan, kembalikan 'notFound: true' untuk menampilkan halaman 404
  if (!project) {
    return {
      notFound: true,
    };
  }

  const otherProducts = data.projects
    .filter((p) => p.product.id !== params.id)
    .slice(0, 3) // Ambil 3 saja
    .map((p) => ({
      id: p.product.id,
      name: p.product.name,
      category: p.product.category,
      image: p.product.image,
      description: p.product.fullDescription,
    }));
  // Kirim data proyek sebagai props ke komponen
  return {
    props: {
      project,
      otherProducts,
    },
  };
});

// --- KOMPONEN UTAMA HALAMAN ---
export default function ProjectDetailPage({ project, otherProducts }) {
  const {
    product,
    hero,
    tabs,
    overview,
    features,
    workflow,
    techStack,
    screenshots,
    specifications,
    priceList,
  } = project;
  const siteUrl = "https://www.bikinwebsitejogja.com";
  const pageUrl = `${siteUrl}/produk/${project.slug}`; // Assuming you have a slug
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service", // Or "Service" if that fits better
    name: product.name,
    image: `${siteUrl}${product.image}`,
    description: product.fullDescription,
    brand: {
      "@type": "Brand",
      name: "Codeverta", // Add your brand name here
    },
    category: product.category,
  };
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          Jasa Pembuatan {product.name} - {product.category}
        </title>
        <meta
          name="description"
          content={product.fullDescription.substring(0, 160)}
        />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`Jasa Pembuatan ${product.name}`} />
        <meta
          property="og:description"
          content={product.fullDescription.substring(0, 160)}
        />
        <meta property="og:image" content={`${siteUrl}${product.image}`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta
          property="twitter:title"
          content={`Jasa Pembuatan ${product.name}`}
        />
        <meta
          property="twitter:description"
          content={product.fullDescription.substring(0, 160)}
        />
        <meta property="twitter:image" content={`${siteUrl}${product.image}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <ProjectBreadcrumb projectName={product.name} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-sm">
                    {product.category}
                  </Badge>
                  {/* <Badge className="bg-green-500 hover:bg-green-600">
                  {product.status}
                </Badge> */}
                  <Badge variant="secondary">v{product.version}</Badge>
                </div>

                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-slate-600 mb-6">
                  {product.fullDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <WhatsappWrapper>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      {hero?.buttons.liveDemo || "Hubungi Kami"}
                    </Button>
                  </WhatsappWrapper>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-8">
              <TabsTrigger value="overview">
                {tabs.triggers.overview}
              </TabsTrigger>
              <TabsTrigger value="features">
                {tabs.triggers.features}
              </TabsTrigger>
              <TabsTrigger value="workflow">
                {tabs.triggers.workflow}
              </TabsTrigger>
              <TabsTrigger value="tech-stack">
                {tabs.triggers.techStack}
              </TabsTrigger>
              <TabsTrigger value="screenshots">
                {tabs.triggers.screenshots}
              </TabsTrigger>
              <TabsTrigger value="specs">{tabs.triggers.specs}</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      {overview.projectInfo.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">
                        {overview.projectInfo.clientLabel}
                      </p>
                      <p className="font-semibold">{product.client}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">
                        {overview.projectInfo.durationLabel}
                      </p>
                      <p className="font-semibold">{product.duration}</p>
                    </div>
                    {/* <div>
                    <p className="text-sm text-slate-600">
                      {overview.projectInfo.teamSizeLabel}
                    </p>
                    <p className="font-semibold">{product.teamSize}</p>
                  </div> */}
                    <div>
                      <p className="text-sm text-slate-600">
                        {overview.projectInfo.lastUpdatedLabel}
                      </p>
                      <p className="font-semibold">{product.lastUpdated}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="w-5 h-5" />
                      {overview.platformSupport.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {overview.platformSupport.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5" />
                      {overview.architecture.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {overview.architecture.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{overview.projectDescription.title}</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  {overview.projectDescription.paragraphs.map((p, index) => (
                    <p
                      key={index}
                      className="text-slate-700 leading-relaxed mb-4"
                    >
                      {p}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon];
                  return (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            {IconComponent && (
                              <IconComponent className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-slate-600">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Workflow Tab */}
            <TabsContent value="workflow" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{workflow.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {workflow.steps.map((step, index) => {
                      const IconComponent = iconMap[step.icon];
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                            {index < workflow.steps.length - 1 && (
                              <div className="w-px h-12 bg-slate-300 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {IconComponent && (
                                <IconComponent className="w-5 h-5 text-blue-600" />
                              )}
                              <h3 className="text-lg font-semibold text-slate-900">
                                {step.title}
                              </h3>
                            </div>
                            <p className="text-slate-600">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tech Stack Tab */}
            <TabsContent value="tech-stack" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techStack.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.technologies.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="border-l-4 border-blue-200 pl-4"
                        >
                          <h4 className="font-semibold text-slate-900">
                            {tech.name}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {tech.description}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Screenshots Tab */}
            <TabsContent value="screenshots" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {screenshots.map((screenshot, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <Image
                        src={screenshot.image || "/placeholder.svg"}
                        alt={screenshot.title}
                        width={500}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">
                        {screenshot.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {screenshot.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Specifications Tab */}
            <TabsContent value="specs" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {specifications.systemRequirements.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold">
                        {specifications.systemRequirements.server.title}
                      </p>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1">
                        {specifications.systemRequirements.server.items.map(
                          (item, index) => (
                            <li key={index}>• {item}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-semibold">
                        {specifications.systemRequirements.client.title}
                      </p>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1">
                        {specifications.systemRequirements.client.items.map(
                          (item, index) => (
                            <li key={index}>• {item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {specifications.performanceMetrics.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {specifications.performanceMetrics.metrics.map(
                      (metric, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-slate-600">{metric.label}</span>
                          <span className="font-semibold">{metric.value}</span>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{specifications.securityFeatures.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.securityFeatures.items.map(
                      (item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {priceList && (
            <div className="container mt-10 mx-auto max-w-7xl">
              <div className="text-center mb-16">
                <p className="text-slate-600 text-sm"> Pilihan Paket untuk </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                  Jasa Pembuatan {product.name}
                </h2>
                <p className="text-md text-slate-600 max-w-2xl mx-auto">
                  Harga dihitung berdasarkan kompleksitas sistem, ruang lingkup
                  fitur, serta waktu pengembangan yang dibutuhkan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {priceList.map((item, index) => (
                  <PricingCard key={index} {...item} index={index} />
                ))}
              </div>
            </div>
          )}
          {/* Section Produk Lainnya */}
          <div className="bg-slate-50 border-t border-slate-200 py-20 mt-20">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Produk Lainnya
                  </h2>
                  <p className="text-slate-600 mt-2">
                    Mungkin Anda juga tertarik dengan produk kami yang lainnya
                  </p>
                </div>
                <Button variant="outline" asChild className="hidden md:flex">
                  <Link href="/produk">Lihat Semua Produk</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {otherProducts.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-xl transition-all duration-300 border-none shadow-sm overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={500}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <CardHeader className="p-6 pb-2">
                      <Badge variant="secondary" className="w-fit mb-3">
                        {item.category}
                      </Badge>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex-grow">
                      <p className="text-slate-600 text-sm line-clamp-2 mb-6">
                        {item.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-0 hover:bg-transparent hover:text-blue-700"
                        asChild
                      >
                        <Link href={`/produk/${item.id}`}>
                          Pelajari Selengkapnya
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10 md:hidden">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/produk">Lihat Semua Produk</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
