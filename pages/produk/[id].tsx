import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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

const productData = {
  id: 4,
  name: "Smart POS System",
  description:
    "Point of Sale system modern dengan fitur inventory dan reporting real-time",
  fullDescription:
    "Smart POS System adalah solusi point of sale yang komprehensif dan modern, dirancang khusus untuk memenuhi kebutuhan bisnis retail, restoran, dan toko. Sistem ini mengintegrasikan penjualan, inventory management, customer management, dan financial reporting dalam satu platform yang user-friendly.",
  image: "/placeholder.svg?height=400&width=600&text=Smart+POS+Dashboard",
  technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io", "Redis", "Docker"],
  category: "Point of Sale",
  status: "Completed",
  version: "2.1.0",
  lastUpdated: "December 2024",
  client: "Retail Chain Indonesia",
  duration: "6 months",
  teamSize: "5 developers",
};

const features = [
  {
    icon: ShoppingCart,
    title: "Multi-Channel Sales",
    description:
      "Mendukung penjualan online dan offline dalam satu sistem terintegrasi",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Dashboard analytics dengan laporan penjualan, profit, dan trend real-time",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Tracking stok otomatis, low stock alerts, dan manajemen supplier",
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Database pelanggan, loyalty program, dan customer analytics",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Methods",
    description: "Mendukung cash, kartu kredit, e-wallet, dan QRIS",
  },
  {
    icon: Printer,
    title: "Receipt & Invoice",
    description:
      "Cetak struk otomatis dan generate invoice dengan template custom",
  },
  {
    icon: Wifi,
    title: "Offline Mode",
    description: "Tetap bisa beroperasi saat koneksi internet terputus",
  },
  {
    icon: Shield,
    title: "Security & Backup",
    description: "Enkripsi data, user roles, dan automated backup system",
  },
];

const techStack = [
  {
    category: "Frontend",
    technologies: [
      {
        name: "Vue.js 3",
        description: "Progressive JavaScript framework untuk UI yang reaktif",
      },
      { name: "Vuetify", description: "Material Design component framework" },
      { name: "Pinia", description: "State management untuk Vue.js" },
      {
        name: "Vue Router",
        description: "Official router untuk Vue.js applications",
      },
    ],
  },
  {
    category: "Backend",
    technologies: [
      {
        name: "Laravel 10",
        description: "PHP framework untuk rapid development",
      },
      {
        name: "Laravel Sanctum",
        description: "Authentication system untuk SPA",
      },
      { name: "Laravel Queue", description: "Background job processing" },
      {
        name: "Laravel Broadcasting",
        description: "Real-time event broadcasting",
      },
    ],
  },
  {
    category: "Database & Cache",
    technologies: [
      {
        name: "MySQL 8.0",
        description: "Relational database untuk data persistence",
      },
      { name: "Redis", description: "In-memory caching dan session storage" },
      {
        name: "Laravel Eloquent",
        description: "ORM untuk database operations",
      },
    ],
  },
  {
    category: "Infrastructure",
    technologies: [
      { name: "Docker", description: "Containerization untuk deployment" },
      { name: "Nginx", description: "Web server dan reverse proxy" },
      {
        name: "Socket.io",
        description: "Real-time bidirectional communication",
      },
      { name: "AWS S3", description: "Cloud storage untuk files dan backups" },
    ],
  },
];

const workflowSteps = [
  {
    step: 1,
    title: "Product Scanning",
    description: "Scan barcode produk atau pilih dari katalog",
    icon: Package,
  },
  {
    step: 2,
    title: "Cart Management",
    description: "Tambah/kurangi quantity, apply discount atau promo",
    icon: ShoppingCart,
  },
  {
    step: 3,
    title: "Payment Processing",
    description: "Pilih metode pembayaran dan proses transaksi",
    icon: CreditCard,
  },
  {
    step: 4,
    title: "Receipt Generation",
    description: "Generate dan print receipt untuk customer",
    icon: Printer,
  },
  {
    step: 5,
    title: "Inventory Update",
    description: "Update stok secara otomatis dan real-time",
    icon: Database,
  },
  {
    step: 6,
    title: "Analytics Recording",
    description: "Record data untuk reporting dan analytics",
    icon: BarChart3,
  },
];

const screenshots = [
  {
    title: "Dashboard Overview",
    image: "/placeholder.svg?height=300&width=500&text=Dashboard+Overview",
    description: "Dashboard utama dengan sales summary dan quick actions",
  },
  {
    title: "POS Interface",
    image: "/placeholder.svg?height=300&width=500&text=POS+Interface",
    description: "Interface kasir dengan product catalog dan cart",
  },
  {
    title: "Inventory Management",
    image: "/placeholder.svg?height=300&width=500&text=Inventory+Management",
    description: "Halaman manajemen inventory dengan stock tracking",
  },
  {
    title: "Sales Analytics",
    image: "/placeholder.svg?height=300&width=500&text=Sales+Analytics",
    description: "Analytics dashboard dengan charts dan reports",
  },
];

export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-sm">
                  {productData.category}
                </Badge>
                <Badge className="bg-green-500 hover:bg-green-600">
                  {productData.status}
                </Badge>
                <Badge variant="secondary">v{productData.version}</Badge>
              </div>

              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {productData.name}
              </h1>

              <p className="text-xl text-slate-600 mb-6">
                {productData.fullDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {productData.technologies.map((tech, index) => (
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
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Live Demo
                </Button>
                <Button size="lg" variant="outline">
                  <Github className="w-5 h-5 mr-2" />
                  Source Code
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="w-5 h-5 mr-2" />
                  Documentation
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src={productData.image || "/placeholder.svg"}
                alt={productData.name}
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
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Client</p>
                    <p className="font-semibold">{productData.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Duration</p>
                    <p className="font-semibold">{productData.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Team Size</p>
                    <p className="font-semibold">{productData.teamSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Last Updated</p>
                    <p className="font-semibold">{productData.lastUpdated}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Platform Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Web Application</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Mobile Responsive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Tablet Optimized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>PWA Support</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>SPA (Single Page App)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>RESTful API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Real-time Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Microservices Ready</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  Smart POS System dikembangkan untuk memenuhi kebutuhan bisnis
                  retail modern yang memerlukan sistem point of sale yang tidak
                  hanya cepat dan reliable, tetapi juga dilengkapi dengan
                  fitur-fitur advanced seperti inventory management, customer
                  relationship management, dan business intelligence.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Sistem ini dirancang dengan arsitektur yang scalable dan
                  modular, memungkinkan customization sesuai dengan kebutuhan
                  spesifik setiap bisnis. Dengan interface yang intuitive dan
                  responsive, sistem dapat digunakan pada berbagai device mulai
                  dari desktop, tablet, hingga smartphone.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Implementasi real-time technology memastikan bahwa semua data
                  inventory, sales, dan customer ter-update secara instant
                  across all channels, memberikan visibility yang complete untuk
                  business owners dalam mengambil keputusan strategis.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workflow Tab */}
          <TabsContent value="workflow" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Sales Transaction Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {workflowSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                        {index < workflowSteps.length - 1 && (
                          <div className="w-px h-12 bg-slate-300 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <step.icon className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-slate-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
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
                  <CardTitle>System Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold">Server Requirements</p>
                    <ul className="text-sm text-slate-600 mt-1 space-y-1">
                      <li>• PHP 8.1 or higher</li>
                      <li>• MySQL 8.0 or higher</li>
                      <li>• Redis 6.0 or higher</li>
                      <li>• Nginx/Apache web server</li>
                      <li>• SSL Certificate</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-semibold">Client Requirements</p>
                    <ul className="text-sm text-slate-600 mt-1 space-y-1">
                      <li>• Modern web browser</li>
                      <li>• JavaScript enabled</li>
                      <li>• Minimum 1024x768 resolution</li>
                      <li>• Stable internet connection</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Page Load Time</span>
                    <span className="font-semibold">&lt; 2 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      Transaction Processing
                    </span>
                    <span className="font-semibold">&lt; 500ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Concurrent Users</span>
                    <span className="font-semibold">100+ users</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Database Size</span>
                    <span className="font-semibold">Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Uptime</span>
                    <span className="font-semibold">99.9%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Security Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">SSL/TLS Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Role-based Access Control</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Data Encryption at Rest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Audit Trail Logging</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Two-Factor Authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Session Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">
                        Input Validation & Sanitization
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Automated Backup System</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
