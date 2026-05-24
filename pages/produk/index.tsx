import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Eye,
  Clock,
  Calendar,
  Wrench,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { WhatsAppIcon, WhatsappWrapper } from "@/components/WhatsappButton";
import SeoHead from "@/components/SeoHead";
import { withI18n } from "@/lib/withi18n";
import { useTranslation } from "next-i18next";
import { getProjects } from "@/lib/projects";
import { buildSeoMeta, SITE_NAME, SITE_URL } from "@/lib/seo";

export const getStaticProps = withI18n(["common"], function ({ locale }) {
  // Mapping hanya field yang diperlukan untuk index page
  const projects = getProjects(locale).map(({ product }) => ({
    product: {
      id: product.id,
      name: product.name,
      image: product.image,
      status: product.status,
      version: product.version,
      category: product.category,
      description: product.description,
      duration: product.duration,
      lastUpdated: product.lastUpdated,
      technologies: product.technologies,
    },
  }));

  return { props: { projects } };
});

export default function ITProductsShowcase({ projects }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const seo = buildSeoMeta({
    locale: router.locale,
    path: "/produk",
    title: t("productsPage.seo.title"),
    description: t("productsPage.seo.description"),
    keywords: t("productsPage.seo.keywords"),
  });
  const statusConfig = {
    "Production Ready": {
      color: "bg-green-500 hover:bg-green-600",
      icon: CheckCircle,
      label: t("productsPage.status.productionReady"),
    },
    Completed: {
      color: "bg-green-500 hover:bg-green-600",
      icon: CheckCircle,
      label: t("productsPage.status.completed"),
    },
    "In Development": {
      color: "bg-orange-500 hover:bg-orange-600",
      icon: Wrench,
      label: t("productsPage.status.inDevelopment"),
    },
  };

  const productListSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${seo.canonical}#collection`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: seo.locale,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        about: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntity: {
          "@id": `${seo.canonical}#products`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${seo.canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("productsPage.schema.home"),
            item: `${SITE_URL}/${seo.locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("productsPage.schema.products"),
            item: seo.canonical,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${seo.canonical}#products`,
        name: t("productsPage.schema.itemListName"),
        description: seo.description,
        numberOfItems: projects.length,
        itemListElement: projects.map(({ product }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${seo.canonical}/${product.id}`,
          item: {
            "@type": "SoftwareApplication",
            "@id": `${seo.canonical}/${product.id}#software`,
            name: product.name,
            description: product.description,
            applicationCategory: product.category,
            operatingSystem: "Web",
            image: product.image?.startsWith("http")
              ? product.image
              : `${SITE_URL}${product.image}`,
            softwareVersion: product.version,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "IDR",
              availability: "https://schema.org/InStock",
              url: `${seo.canonical}/${product.id}`,
              category: product.status,
            },
            publisher: {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: SITE_NAME,
              url: SITE_URL,
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={seo.image}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productListSchema),
          }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {t("productsPage.hero.title")}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t("productsPage.hero.subtitle")}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map(({ product }) => {
              const currentStatus =
                statusConfig[product.status] || statusConfig.Completed;
              const StatusIcon = currentStatus.icon;
              return (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge
                          className={`${currentStatus.color} text-white flex items-center gap-1`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {currentStatus.label}
                        </Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 backdrop-blur-sm text-xs"
                        >
                          v{product.version}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs mb-3">
                        {product.category}
                      </Badge>
                    </div>
                    <Link href={`/produk/${product.id}`}>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{product.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 col-span-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {t("productsPage.card.updated")}:{" "}
                          {product.lastUpdated}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Link
                      href={`/produk/${product.id}`}
                      className="flex-1 block"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {t("productsPage.card.viewDetail")}
                      </Button>
                    </Link>
                    <WhatsappWrapper title={product.name}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                      >
                        <WhatsAppIcon />
                        {t("productsPage.card.contact")}
                      </Button>
                    </WhatsappWrapper>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t("productsPage.cta.title")}
              </h2>
              <p className="text-slate-600 mb-6">
                {t("productsPage.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsappWrapper>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t("home.badges.consultation")}
                  </Button>
                </WhatsappWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
