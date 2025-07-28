import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon, WhatsappWrapper } from "@/components/WhatsappButton";
import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  const projects = data.projects || [];

  // Kirim data proyek sebagai props ke komponen
  return {
    props: {
      projects,
    },
  };
}

export default function ITProductsShowcase({ projects }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            IT Solutions Portfolio
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Koleksi lengkap sistem informasi dan aplikasi web yang telah kami
            kembangkan untuk berbagai kebutuhan bisnis dan industri
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map(({product}) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Link href={`/produk/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {/* <div className="absolute top-3 right-3">
                    <Badge
                      variant={
                        product.status === "Completed" ? "default" : "secondary"
                      }
                      className={
                        product.status === "Completed"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-orange-500 hover:bg-orange-600"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div> */}
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

                <div className="flex flex-wrap gap-1 mb-4">
                  {product.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex gap-2">
                <Link href={`/produk/${product.id}`} className="flex-1 block">
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Detail
                  </Button>
                </Link>
                <WhatsappWrapper title={product.name}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <WhatsAppIcon />
                    Hubungi Kami
                  </Button>
                </WhatsappWrapper>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Butuh Solusi IT Custom?
            </h2>
            <p className="text-slate-600 mb-6">
              Kami siap membantu mengembangkan sistem informasi sesuai kebutuhan
              bisnis Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsappWrapper>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Konsultasi Gratis
                </Button>
              </WhatsappWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
