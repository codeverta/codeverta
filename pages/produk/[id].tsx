import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PricingCard from "@/components/products/PricingCard";
import { useState } from "react";

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
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  PlayCircle,
} from "lucide-react";

import { WhatsappWrapper } from "@/components/WhatsappButton";
import Head from "next/head";
import { useRouter } from "next/router";
import { appendOfficeLocation } from "@/lib/seo";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { withI18n } from "@/lib/withi18n";
import { getSortedPostsData } from "@/lib/posts";
import { ArticleSection } from "@/components/products/ArticleSection";
import ImageCarousel from "@/components/ImageCarousel";
import { getAllProjectIds, getProjectById, getProjects } from "@/lib/projects";

export function ProjectBreadcrumb({ projectName }) {
  return (
    <Breadcrumb className="mb-8">
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

// ─── Image Lightbox Component ─────────────────────────────────────────────────
function ImageLightbox({ images, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 text-white bg-white/10 hover:bg-white/25 rounded-full p-3 transition"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 text-white bg-white/10 hover:bg-white/25 rounded-full p-3 transition"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div
        className="relative max-w-4xl max-h-[85vh] w-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current].image || "/placeholder.svg"}
          alt={images[current].title}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-3 text-center">
          <p className="text-white font-semibold">{images[current].title}</p>
          <p className="text-slate-300 text-sm mt-1">
            {images[current].description}
          </p>
          {images.length > 1 && (
            <p className="text-slate-400 text-xs mt-2">
              {current + 1} / {images.length}
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`w-12 h-8 rounded overflow-hidden border-2 transition ${
                i === current
                  ? "border-white"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.image || "/placeholder.svg"}
                alt={img.title}
                width={48}
                height={32}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Screenshots Gallery Tab ───────────────────────────────────────────────────
function ScreenshotsGallery({ screenshots }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!screenshots || screenshots.length === 0) return null;

  // Responsive masonry-like grid: first image bigger if count >= 3
  const gridClass =
    screenshots.length === 1
      ? "grid-cols-1"
      : screenshots.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <div className={`grid ${gridClass} gap-4`}>
        {screenshots.map((screenshot, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
            onClick={() => setLightboxIndex(index)}
          >
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <Image
                src={screenshot.image || "/placeholder.svg"}
                alt={screenshot.title}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 shadow-lg">
                  <ExternalLink className="w-5 h-5 text-blue-700" />
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-slate-900 text-sm mb-1">
                {screenshot.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {screenshot.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={screenshots}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ─── YouTube Video Section ─────────────────────────────────────────────────────
function VideoSection({ videoUrls, productName }) {
  if (!videoUrls || videoUrls.length === 0) return null;

  const toEmbedUrl = (url) => {
    if (!url) return url;
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    if (url.includes("/embed/")) return url;
    return url;
  };

  // Full-width: padding-bottom trick preserves 16:9
  const FullVideo = ({ url, title }) => (
    <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl border border-border bg-muted">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={toEmbedUrl(url)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  // Fixed-height: explicit h-60, NO aspect-video
  const GridVideo = ({ url, title }) => (
    <div className="relative h-80 overflow-hidden rounded-xl border border-border bg-muted">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={toEmbedUrl(url)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-muted border border-border p-2 rounded-lg">
            <PlayCircle className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Video Demo
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Lihat video produk {productName}
            </p>
          </div>
          <Badge variant="outline" className="ml-auto text-xs">
            {videoUrls.length} Video
          </Badge>
        </div>

        {videoUrls.length === 1 ? (
          <div className="max-w-4xl mx-auto">
            <FullVideo url={videoUrls[0]} title={`Video ${productName} 1`} />
          </div>
        ) : videoUrls.length === 2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoUrls.map((url, i) => (
              <GridVideo
                key={i}
                url={url}
                title={`Video ${productName} ${i + 1}`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <FullVideo url={videoUrls[0]} title={`Video ${productName} 1`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {videoUrls.slice(1).map((url, i) => (
                <GridVideo
                  key={i}
                  url={url}
                  title={`Video ${productName} ${i + 2}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── getStaticPaths ────────────────────────────────────────────────────────────
export async function getStaticPaths({ locales }) {
  const paths = locales.flatMap((locale) =>
    getAllProjectIds().map((id) => ({
      params: { id },
      locale,
    }))
  );

  return { paths, fallback: false };
}

// ─── getStaticProps ────────────────────────────────────────────────────────────
export const getStaticProps = withI18n(
  ["common"],
  function ({ params, locale }) {
    const projects = getProjects(locale);
    const latestArticles = getSortedPostsData("blog")
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        title: p.title,
        desc: p.desc || "",
        date: p.date,
        image: p.image || null,
        tags: p.tags || "",
      }));

    const project = getProjectById(params.id as string, locale);
    if (!project) return { notFound: true };

    const filteredProducts = projects.filter((p) => p.product.id !== params.id);
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    const seed = params.id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...filteredProducts].sort(() => seededRandom(seed) - 0.5);
    const otherProducts = shuffled.slice(0, 3).map((p) => ({
      id: p.product.id,
      name: p.product.name,
      category: p.product.category,
      image: p.product.image,
      description: p.product.fullDescription,
    }));

    return { props: { project, otherProducts, latestArticles } };
  }
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ProjectDetailPage({
  project,
  otherProducts,
  latestArticles,
}) {
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

  const { locale = "id" } = useRouter();
  const siteUrl = "https://www.codeverta.com";
  const pageUrl = `${siteUrl}/produk/${project.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${siteUrl}${product.image}`,
    description: product.fullDescription,
    brand: { "@type": "Brand", name: "Codeverta" },
    sku: product.id,
    category: product.category,
    releaseDate: "2024-12-01",
    aggregateRating: product.seo
      ? {
          "@type": "AggregateRating",
          ratingValue: product.seo.ratingValue,
          reviewCount: product.seo.reviewCount,
        }
      : undefined,
    review: product.seo?.reviews.map((rev) => ({
      "@type": "Review",
      author: { "@type": "Person", name: rev.author },
      datePublished: rev.date,
      reviewBody: rev.body,
      reviewRating: { "@type": "Rating", ratingValue: rev.rating },
    })),
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "IDR",
      price: "5000000",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Codeverta" },
    },
  };

  const finalDesc = appendOfficeLocation(
    product.fullDescription.substring(0, 160),
    locale
  );

  return (
    <>
      <Head>
        <title>
          Jasa Pembuatan {product.name} - {product.category}
        </title>
        <meta name="description" content={finalDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`Jasa Pembuatan ${product.name}`} />
        <meta property="og:description" content={finalDesc} />
        <meta property="og:image" content={`${siteUrl}${product.image}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta
          property="twitter:title"
          content={`Jasa Pembuatan ${product.name}`}
        />
        <meta property="twitter:description" content={finalDesc} />
        <meta property="twitter:image" content={`${siteUrl}${product.image}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* ── Hero Section (image only, no videos) ── */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <ProjectBreadcrumb projectName={product.name} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-sm">
                    {product.category}
                  </Badge>
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

                <div className="flex gap-4 flex-wrap">
                  {hero.buttons?.documentation && (
                    <Button size="lg" variant="outline" asChild>
                      <a
                        href={hero.buttons.links?.documentation || "#"}
                        target="_blank"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        {hero.buttons.documentation}
                      </a>
                    </Button>
                  )}
                  {hero.buttons.links?.liveDemo ? (
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <a
                        href={hero.buttons.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        {hero.buttons.liveDemo || "Live Demo"}
                      </a>
                    </Button>
                  ) : (
                    <WhatsappWrapper>
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        {hero?.buttons.liveDemo || "Hubungi Kami"}
                      </Button>
                    </WhatsappWrapper>
                  )}
                  {hero.buttons?.sourceCode && (
                    <Button size="lg" variant="outline" asChild>
                      <a
                        href={
                          hero.buttons.sourceCode ||
                          "https://github.com/codeverta"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        {hero?.buttons.sourceCodeLabel || "Source Code"}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {product.images ? (
                <ImageCarousel
                  images={product.images}
                  productName={product.name}
                  videoCount={product.videoUrls?.length ?? 0}
                />
              ) : (
                <div className="relative rounded-lg shadow-xl overflow-hidden aspect-video bg-slate-100 w-full">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  {/* Badge jumlah video jika ada */}
                  {product.videoUrls && product.videoUrls.length > 0 && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <Play className="w-3 h-3 fill-white" />
                      {product.videoUrls.length} Video tersedia ↓
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ── Main Content Tabs ── */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mb-24 md:mb-12">
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

            {/* ── Screenshots Tab (gallery with lightbox) ── */}
            <TabsContent value="screenshots" className="space-y-8">
              <ScreenshotsGallery screenshots={screenshots} />
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

          {/* Reviews */}
          {product.seo?.reviews && (
            <section className="mt-16 container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Ulasan Klien
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.seo?.ratingValue)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold">
                      {product.seo?.ratingValue}
                    </span>
                    <span className="text-slate-500">
                      ({product.seo?.reviewCount} ulasan)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.seo.reviews.map((rev, idx) => (
                  <Card key={idx} className="bg-white border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex text-yellow-400 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < parseInt(rev.rating) ? "fill-current" : ""
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-slate-700 italic mb-6">"{rev.body}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {rev.author[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{rev.author}</p>
                          <p className="text-xs text-slate-500">{rev.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Pricing */}
          {priceList && (
            <div className="container mt-10 mx-auto max-w-7xl">
              <div className="text-center mb-16">
                <p className="text-slate-600 text-sm">Pilihan Paket untuk</p>
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

          {/* Other Products */}
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
        {/* ── Video Section (dedicated, below hero) ── */}
        <VideoSection
          videoUrls={product.videoUrls}
          productName={product.name}
        />

        <ArticleSection articles={latestArticles} />
      </div>
    </>
  );
}
