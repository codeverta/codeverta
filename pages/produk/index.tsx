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

const products = [
  {
    id: 'e-commerce-platform',
    name: "E-commerce Platform untuk UKM/UMKM",
    description:
      "E-commerce platform lengkap dengan fitur katalog, keranjang, dan pembayaran online",
    image: "/assets/products/27.png",
    technologies: ["React", "Laravel", "MySQL", "Midtrans"],
    category: "E-commerce",
    status: "Completed",
  },
  {
    id: 'webgis-platform',
    name: "WebGIS Platform",
    description:
      "Sistem Informasi Geografis berbasis web untuk pemetaan dan analisis spasial",
    image: "/assets/products/28.png",
    technologies: ["React", "Leaflet", "PostgreSQL", "PostGIS"],
    category: "Geographic Information System",
    status: "Completed",
  },
  {
    id: 'enterprise-erp-system',
    name: "Enterprise Resource Planning(ERP) System",
    description:
      "Sistem ERP terintegrasi untuk mengelola seluruh proses bisnis perusahaan",
    image: "/assets/products/29.png",
    technologies: ["Next.js", "Node.js", "MySQL", "Redis"],
    category: "Enterprise Resource Planning",
    status: "In Development",
  },
  {
    id: 'hrms-portal',
    name: "HRMS Portal",
    description:
      "Human Resource Management System untuk pengelolaan karyawan dan payroll",
    image: "/assets/products/32.png",
    technologies: ["React", "Express.js", "MongoDB", "JWT"],
    category: "Human Resource Management",
    status: "Completed",
  },
  {
    id: 'smart-pos-system',
    name: "Smart POS System",
    description:
      "Point of Sale system modern dengan fitur inventory dan reporting real-time",
    image: "/assets/products/5.png",
    technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
    category: "Point of Sale",
    status: "Completed",
  },
  {
    id: 'finance-management',
    name: "Finance Management",
    description:
      "Sistem manajemen keuangan dengan fitur budgeting dan financial reporting",
    image: "/assets/products/6.png",
    technologies: ["React", "Django", "PostgreSQL", "Chart.js"],
    category: "Financial Management",
    status: "Completed",
  },
  {
    id: 'warehouse-inventory-control',
    name: "Inventory Control System",
    description:
      "Sistem kontrol inventori dengan tracking real-time dan automated alerts",
    image: "/assets/products/7.png",
    technologies: ["Angular", "Spring Boot", "MySQL", "Apache Kafka"],
    category: "Inventory Management",
    status: "In Development",
  },
  {
    id: 'crm-platform',
    name: "CRM Platform",
    description:
      "Customer Relationship Management untuk mengelola hubungan dengan pelanggan",
    image: "/assets/products/8.png",
    technologies: ["React", "Node.js", "MongoDB", "GraphQL"],
    category: "Customer Relationship Management",
    status: "Completed",
  },
  {
    id: 'e-learning-platform',
    name: "E-Learning Platform",
    description:
      "Platform pembelajaran online dengan fitur video streaming dan quiz interaktif",
    image: "/assets/products/9.png",
    technologies: ["Next.js", "Strapi", "PostgreSQL", "AWS S3"],
    category: "Education Technology",
    status: "Completed",
  },
  {
    id: 'warehouse-management-system',
    name: "Warehouse Management",
    description:
      "Sistem manajemen gudang dengan tracking lokasi dan automated picking",
    image: "/assets/products/11.png",
    technologies: ["Vue.js", "Express.js", "MySQL", "RFID Integration"],
    category: "Warehouse Management",
    status: "Completed",
  },
  {
    id: 'accounting-system',
    name: "Accounting System",
    description:
      "Sistem akuntansi lengkap dengan general ledger dan financial statements",
    image: "/assets/products/12.png",
    technologies: ["React", "Laravel", "MySQL", "PDF Generator"],
    category: "Accounting & Finance",
    status: "Completed",
  },
  {
    id: 'project-management-tool',
    name: "Project Management Tool",
    description:
      "Tool manajemen proyek dengan Gantt chart, task tracking, dan team collaboration",
    image: "/assets/products/13.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    category: "Project Management",
    status: "In Development",
  },
];

export default function ITProductsShowcase() {
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
          {products.map((product) => (
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
                      className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
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
