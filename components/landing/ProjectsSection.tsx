import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "next-i18next";

export function ProjectsSection({ projects }: any) {
  const { t } = useTranslation("common");
  // Ambil 3 proyek pertama dari data JSON

  return (
    <section id="projects" className="w-full py-4 md:py-10 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Portofolio Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t("portfolio.title")}
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            {t("portfolio.subtitle")}
          </p>
        </div>

        {/* Grid untuk menampilkan proyek */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((projectItem) => (
            <Card key={projectItem.product.id} className="flex flex-col">
              <CardHeader>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={projectItem.product.image}
                    alt={projectItem.product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle>{projectItem.product.name}</CardTitle>
                <CardDescription className="mt-2">
                  {projectItem.product.description}
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {projectItem.product.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  {/* Tombol yang akan mengarah ke detail proyek nantinya */}
                  <Link href={`/produk/${projectItem.product.id}`}>
                    Lihat Detail
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Tombol "Lihat Selengkapnya" */}
        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full h-12 px-8 text-base"
          >
            <Link href="/produk">
              Lihat Lainnya
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
