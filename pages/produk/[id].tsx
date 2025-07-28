import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
} from "lucide-react";

// Import modul Node.js untuk membaca file di sisi server
import fs from "fs";
import path from "path";
import { WhatsappWrapper } from "@/components/WhatsappButton";

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
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  // Buat path untuk setiap proyek berdasarkan ID-nya
  const paths = data.projects.map((project) => ({
    params: { id: project.product.id },
  }));

  return { paths, fallback: false }; // fallback: false akan menampilkan halaman 404 jika ID tidak ditemukan
}

// Fungsi ini mengambil data untuk satu halaman proyek spesifik saat build
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  // Cari proyek yang cocok dengan 'id' dari URL
  const project = data.projects.find(
    (p) => p.product.id === params.id
  );

  // Jika proyek tidak ditemukan, kembalikan 'notFound: true' untuk menampilkan halaman 404
  if (!project) {
    return {
      notFound: true,
    };
  }

  // Kirim data proyek sebagai props ke komponen
  return {
    props: {
      project,
    },
  };
}

// --- KOMPONEN UTAMA HALAMAN ---
export default function ProjectDetailPage({ project }) {
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
  } = project;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
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
                    {hero?.buttons.liveDemo || "Live Demo"}
                  </Button>
                </WhatsappWrapper>
                {/* <Button size="lg" variant="outline">
                  <Github className="w-5 h-5 mr-2" />
                  {hero.buttons.sourceCode}
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="w-5 h-5 mr-2" />
                  {hero.buttons.documentation}
                </Button> */}
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
            <TabsTrigger value="overview">{tabs.triggers.overview}</TabsTrigger>
            <TabsTrigger value="features">{tabs.triggers.features}</TabsTrigger>
            <TabsTrigger value="workflow">{tabs.triggers.workflow}</TabsTrigger>
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
                  {specifications.securityFeatures.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
