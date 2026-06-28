export const SITE_URL = "https://www.codeverta.com";
export const SITE_NAME = "Codeverta";
export const DEFAULT_LOCALE = "id";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const SUPPORTED_LOCALES = [
  "id",
  "en-US",
  "en-GB",
  "zh",
  "ja",
  "ko",
  "ms",
  "de",
  "fr",
  "es",
  "ar",
  "hi",
  "th",
  "vi",
  "ru",
  "nl",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const OG_LOCALES: Record<SupportedLocale, string> = {
  id: "id_ID",
  "en-US": "en_US",
  "en-GB": "en_GB",
  zh: "zh_CN",
  ja: "ja_JP",
  ko: "ko_KR",
  ms: "ms_MY",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  ar: "ar",
  hi: "hi_IN",
  th: "th_TH",
  vi: "vi_VN",
  ru: "ru_RU",
  nl: "nl_NL",
};

type LocaleSeoCopy = {
  service: string;
  description: string;
  keywords: string;
  labels: Record<string, string>;
};

export type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  keywords: string;
  locale: SupportedLocale;
  path: string;
  ogLocale: string;
};

const BASE_COPY: Record<SupportedLocale, LocaleSeoCopy> = {
  id: {
    service: "Jasa Pengembangan Website, Aplikasi, ERP & Solusi IT",
    description:
      "Codeverta membantu UMKM, startup, dan enterprise membangun website, aplikasi, ERP, POS, otomasi bisnis, dan solusi IT yang cepat, aman, dan siap berkembang.",
    keywords:
      "jasa pembuatan website, software house Indonesia, jasa aplikasi, ERP UMKM, POS, solusi IT, Codeverta",
    labels: {
      "/": "Jasa Pengembangan Website, Aplikasi & Solusi IT",
      about: "Tentang Kami",
      pelatihan: "Pelatihan Coding & Teknologi",
      produk: "Produk Digital",
      blog: "Blog Teknologi",
      faq: "FAQ",
      contact: "Kontak",
      careers: "Karier",
      terms: "Syarat & Ketentuan",
      "privacy-policy": "Kebijakan Privasi",
      games: "Game",
      image: "Alat Gambar",
      pdf: "Alat PDF",
      course: "Kursus Online",
      cybersecurity: "Cybersecurity",
      ai: "Artificial Intelligence",
      news: "Berita Teknologi",
      gadget: "Gadget",
      startups: "Startup",
      tutorials: "Tutorial",
      gallery: "Galeri",
      download: "Download",
      editor: "Code Editor",
      short: "URL Shortener",
      qr: "QR Code Generator",
      picker: "Color Picker",
      "invoice-generator": "Invoice Generator",
      "favicon-generator": "Favicon Generator",
      "blog-form": "Form Blog",
      article: "Artikel",
      prompting: "Prompting",
      app: "Aplikasi Web",
    },
  },
  "en-US": {
    service: "Web, App, ERP & IT Solution Development Services",
    description:
      "Codeverta helps SMEs, startups, and enterprises build fast, secure, scalable websites, applications, ERP, POS, business automation, and IT solutions.",
    keywords:
      "web development services, software house, app development, SME ERP, POS system, IT solutions, Codeverta",
    labels: {
      "/": "Web, App & IT Solution Development Services",
      about: "About Us",
      pelatihan: "Coding & Technology Training",
      produk: "Digital Products",
      blog: "Technology Blog",
      faq: "FAQ",
      contact: "Contact",
      careers: "Careers",
      terms: "Terms & Conditions",
      "privacy-policy": "Privacy Policy",
      games: "Games",
      image: "Image Tools",
      pdf: "PDF Tools",
      course: "Online Courses",
      cybersecurity: "Cybersecurity",
      ai: "Artificial Intelligence",
      news: "Technology News",
      gadget: "Gadgets",
      startups: "Startups",
      tutorials: "Tutorials",
      gallery: "Gallery",
      download: "Downloads",
      editor: "Code Editor",
      short: "URL Shortener",
      qr: "QR Code Generator",
      picker: "Color Picker",
      "invoice-generator": "Invoice Generator",
      "favicon-generator": "Favicon Generator",
      "blog-form": "Blog Form",
      article: "Articles",
      prompting: "Prompting",
      app: "Web Apps",
    },
  },
  "en-GB": {
    service: "Website, App, ERP & IT Solution Development Services",
    description:
      "Codeverta helps SMEs, startups, and enterprises build fast, secure, scalable websites, applications, ERP, POS, business automation, and IT solutions.",
    keywords:
      "website development services, software house, app development, SME ERP, POS system, IT solutions, Codeverta",
    labels: {
      "/": "Website, App & IT Solution Development Services",
      about: "About Us",
      pelatihan: "Coding & Technology Training",
      produk: "Digital Products",
      blog: "Technology Blog",
      faq: "FAQ",
      contact: "Contact",
      careers: "Careers",
      terms: "Terms & Conditions",
      "privacy-policy": "Privacy Policy",
      games: "Games",
      image: "Image Tools",
      pdf: "PDF Tools",
      course: "Online Courses",
      cybersecurity: "Cybersecurity",
      ai: "Artificial Intelligence",
      news: "Technology News",
      gadget: "Gadgets",
      startups: "Startups",
      tutorials: "Tutorials",
      gallery: "Gallery",
      download: "Downloads",
      editor: "Code Editor",
      short: "URL Shortener",
      qr: "QR Code Generator",
      picker: "Colour Picker",
      "invoice-generator": "Invoice Generator",
      "favicon-generator": "Favicon Generator",
      "blog-form": "Blog Form",
      article: "Articles",
      prompting: "Prompting",
      app: "Web Apps",
    },
  },
  zh: {
    service: "网站、应用、ERP 与 IT 解决方案开发服务",
    description:
      "Codeverta 帮助中小企业、初创公司和企业构建快速、安全、可扩展的网站、应用、ERP、POS、业务自动化和 IT 解决方案。",
    keywords:
      "网站开发, 软件公司, 应用开发, ERP, POS系统, IT解决方案, Codeverta",
    labels: {
      "/": "网站、应用与 IT 解决方案开发服务",
      about: "关于我们",
      pelatihan: "编程与技术培训",
      produk: "数字产品",
      blog: "技术博客",
      faq: "常见问题",
      contact: "联系",
      careers: "招聘",
      terms: "条款与条件",
      "privacy-policy": "隐私政策",
      games: "游戏",
      image: "图片工具",
      pdf: "PDF 工具",
      course: "在线课程",
      cybersecurity: "网络安全",
      ai: "人工智能",
      news: "科技新闻",
      gadget: "数码产品",
      startups: "初创公司",
      tutorials: "教程",
      gallery: "图库",
      download: "下载",
      editor: "代码编辑器",
      short: "短链接工具",
      qr: "二维码生成器",
      picker: "取色器",
      "invoice-generator": "发票生成器",
      "favicon-generator": "网站图标生成器",
      article: "文章",
      prompting: "提示词工程",
      app: "网页应用",
    },
  },
  ja: {
    service: "Web、アプリ、ERP、IT ソリューション開発サービス",
    description:
      "Codeverta は中小企業、スタートアップ、エンタープライズ向けに、高速で安全、拡張性の高い Web サイト、アプリ、ERP、POS、自動化、IT ソリューションを構築します。",
    keywords:
      "Web開発, ソフトウェア会社, アプリ開発, ERP, POS, ITソリューション, Codeverta",
    labels: {
      "/": "Web、アプリ、IT ソリューション開発サービス",
      about: "私たちについて",
      pelatihan: "コーディング・技術研修",
      produk: "デジタル製品",
      blog: "技術ブログ",
      faq: "FAQ",
      contact: "お問い合わせ",
      careers: "採用情報",
      terms: "利用規約",
      "privacy-policy": "プライバシーポリシー",
      games: "ゲーム",
      image: "画像ツール",
      pdf: "PDF ツール",
      course: "オンライン講座",
      cybersecurity: "サイバーセキュリティ",
      ai: "人工知能",
      news: "テクノロジーニュース",
      gadget: "ガジェット",
      startups: "スタートアップ",
      tutorials: "チュートリアル",
      gallery: "ギャラリー",
      download: "ダウンロード",
      editor: "コードエディター",
      short: "URL 短縮",
      qr: "QR コード生成",
      picker: "カラーピッカー",
      "invoice-generator": "請求書作成",
      "favicon-generator": "ファビコン作成",
      article: "記事",
      prompting: "プロンプト",
      app: "Web アプリ",
    },
  },
  ko: {
    service: "웹, 앱, ERP 및 IT 솔루션 개발 서비스",
    description:
      "Codeverta는 중소기업, 스타트업, 엔터프라이즈를 위해 빠르고 안전하며 확장 가능한 웹사이트, 앱, ERP, POS, 업무 자동화 및 IT 솔루션을 구축합니다.",
    keywords:
      "웹 개발, 소프트웨어 회사, 앱 개발, ERP, POS 시스템, IT 솔루션, Codeverta",
    labels: {
      "/": "웹, 앱 및 IT 솔루션 개발 서비스",
      about: "회사 소개",
      pelatihan: "코딩 및 기술 교육",
      produk: "디지털 제품",
      blog: "기술 블로그",
      faq: "FAQ",
      contact: "문의",
      careers: "채용",
      terms: "이용 약관",
      "privacy-policy": "개인정보 처리방침",
      games: "게임",
      image: "이미지 도구",
      pdf: "PDF 도구",
      course: "온라인 강의",
      cybersecurity: "사이버보안",
      ai: "인공지능",
      news: "기술 뉴스",
      gadget: "가젯",
      startups: "스타트업",
      tutorials: "튜토리얼",
      gallery: "갤러리",
      download: "다운로드",
      editor: "코드 에디터",
      short: "URL 단축기",
      qr: "QR 코드 생성기",
      picker: "컬러 피커",
      "invoice-generator": "인보이스 생성기",
      "favicon-generator": "파비콘 생성기",
      article: "아티클",
      prompting: "프롬프팅",
      app: "웹 앱",
    },
  },
  ms: {
    service: "Perkhidmatan Pembangunan Web, Aplikasi, ERP & Penyelesaian IT",
    description:
      "Codeverta membantu PKS, startup dan perusahaan membina laman web, aplikasi, ERP, POS, automasi perniagaan dan penyelesaian IT yang pantas, selamat dan boleh diskala.",
    keywords:
      "pembangunan laman web, software house, aplikasi, ERP, POS, penyelesaian IT, Codeverta",
    labels: {
      "/": "Perkhidmatan Pembangunan Web, Aplikasi & Penyelesaian IT",
      about: "Tentang Kami",
      pelatihan: "Latihan Coding & Teknologi",
      produk: "Produk Digital",
      blog: "Blog Teknologi",
      faq: "Soalan Lazim",
      contact: "Hubungi",
      careers: "Kerjaya",
      terms: "Terma & Syarat",
      "privacy-policy": "Dasar Privasi",
      games: "Permainan",
      image: "Alat Imej",
      pdf: "Alat PDF",
      course: "Kursus Dalam Talian",
      cybersecurity: "Keselamatan Siber",
      ai: "Kecerdasan Buatan",
      news: "Berita Teknologi",
      gadget: "Gajet",
      startups: "Startup",
      tutorials: "Tutorial",
      gallery: "Galeri",
      download: "Muat Turun",
      editor: "Editor Kod",
      short: "Pemendek URL",
      qr: "Penjana Kod QR",
      picker: "Pemilih Warna",
      "invoice-generator": "Penjana Invois",
      "favicon-generator": "Penjana Favicon",
      "blog-form": "Borang Blog",
      article: "Artikel",
      prompting: "Prompting",
      app: "Aplikasi Web",
    },
  },
  de: {
    service: "Web-, App-, ERP- und IT-Lösungsentwicklung",
    description:
      "Codeverta hilft KMU, Startups und Unternehmen beim Aufbau schneller, sicherer und skalierbarer Websites, Apps, ERP-, POS-, Automatisierungs- und IT-Lösungen.",
    keywords:
      "Webentwicklung, Softwarehaus, App Entwicklung, ERP, POS System, IT Lösungen, Codeverta",
    labels: {
      "/": "Web-, App- und IT-Lösungsentwicklung",
      about: "Über uns",
      pelatihan: "Coding- & Technologieschulungen",
      produk: "Digitale Produkte",
      blog: "Technologie-Blog",
      faq: "FAQ",
      contact: "Kontakt",
      careers: "Karriere",
      terms: "AGB",
      "privacy-policy": "Datenschutzerklärung",
      games: "Spiele",
      image: "Bild-Tools",
      pdf: "PDF-Tools",
      course: "Online-Kurse",
      cybersecurity: "Cybersicherheit",
      ai: "Künstliche Intelligenz",
      news: "Technologie-News",
      gadget: "Gadgets",
      startups: "Startups",
      tutorials: "Tutorials",
      gallery: "Galerie",
      download: "Downloads",
      editor: "Code-Editor",
      short: "URL-Kürzer",
      qr: "QR-Code-Generator",
      picker: "Farbwähler",
      "invoice-generator": "Rechnungsgenerator",
      "favicon-generator": "Favicon-Generator",
      "blog-form": "Blog-Formular",
      article: "Artikel",
      prompting: "Prompting",
      app: "Web-Apps",
    },
  },
  fr: {
    service: "Services de développement web, applications, ERP et solutions IT",
    description:
      "Codeverta aide les PME, startups et entreprises à créer des sites web, applications, ERP, POS, automatisations métier et solutions IT rapides, sûrs et évolutifs.",
    keywords:
      "développement web, société logicielle, développement application, ERP, POS, solutions IT, Codeverta",
    labels: {
      "/": "Services de développement web, applications et solutions IT",
      about: "À propos",
      pelatihan: "Formation code & technologie",
      produk: "Produits numériques",
      blog: "Blog technologique",
      faq: "FAQ",
      contact: "Contact",
      careers: "Carrières",
      terms: "Conditions générales",
      "privacy-policy": "Politique de confidentialité",
      games: "Jeux",
      image: "Outils image",
      pdf: "Outils PDF",
      course: "Cours en ligne",
      cybersecurity: "Cybersécurité",
      ai: "Intelligence artificielle",
      news: "Actualités technologiques",
      gadget: "Gadgets",
      startups: "Startups",
      tutorials: "Tutoriels",
      gallery: "Galerie",
      download: "Téléchargements",
      editor: "Éditeur de code",
      short: "Raccourcisseur d'URL",
      qr: "Générateur de QR Code",
      picker: "Sélecteur de couleurs",
      "invoice-generator": "Générateur de factures",
      "favicon-generator": "Générateur de favicon",
      "blog-form": "Formulaire de blog",
      article: "Articles",
      prompting: "Prompting",
      app: "Applications web",
    },
  },
  es: {
    service: "Servicios de desarrollo web, apps, ERP y soluciones IT",
    description:
      "Codeverta ayuda a pymes, startups y empresas a crear sitios web, aplicaciones, ERP, POS, automatización de negocio y soluciones IT rápidas, seguras y escalables.",
    keywords:
      "desarrollo web, software house, desarrollo de apps, ERP, POS, soluciones IT, Codeverta",
    labels: {
      "/": "Servicios de desarrollo web, apps y soluciones IT",
      about: "Sobre nosotros",
      pelatihan: "Formación en coding y tecnología",
      produk: "Productos digitales",
      blog: "Blog de tecnología",
      faq: "FAQ",
      contact: "Contacto",
      careers: "Carreras",
      terms: "Términos y condiciones",
      "privacy-policy": "Política de privacidad",
      games: "Juegos",
      image: "Herramientas de imagen",
      pdf: "Herramientas PDF",
      course: "Cursos online",
      cybersecurity: "Ciberseguridad",
      ai: "Inteligencia artificial",
      news: "Noticias tecnológicas",
      gadget: "Gadgets",
      startups: "Startups",
      tutorials: "Tutoriales",
      gallery: "Galería",
      download: "Descargas",
      editor: "Editor de código",
      short: "Acortador de URL",
      qr: "Generador de códigos QR",
      picker: "Selector de color",
      "invoice-generator": "Generador de facturas",
      "favicon-generator": "Generador de favicon",
      "blog-form": "Formulario de blog",
      article: "Artículos",
      prompting: "Prompting",
      app: "Aplicaciones web",
    },
  },
  ar: {
    service: "خدمات تطوير الويب والتطبيقات وERP وحلول تقنية المعلومات",
    description:
      "تساعد Codeverta الشركات الصغيرة والناشئة والمؤسسات على بناء مواقع وتطبيقات وأنظمة ERP وPOS وأتمتة أعمال وحلول تقنية معلومات سريعة وآمنة وقابلة للتوسع.",
    keywords:
      "تطوير مواقع, شركة برمجيات, تطوير تطبيقات, ERP, POS, حلول تقنية المعلومات, Codeverta",
    labels: {
      "/": "خدمات تطوير الويب والتطبيقات وحلول تقنية المعلومات",
      about: "من نحن",
      pelatihan: "تدريب البرمجة والتقنية",
      produk: "المنتجات الرقمية",
      blog: "مدونة التقنية",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا",
      careers: "الوظائف",
      terms: "الشروط والأحكام",
      "privacy-policy": "سياسة الخصوصية",
      games: "الألعاب",
      image: "أدوات الصور",
      pdf: "أدوات PDF",
      course: "الدورات الإلكترونية",
      cybersecurity: "الأمن السيبراني",
      ai: "الذكاء الاصطناعي",
      news: "أخبار التقنية",
      gadget: "الأجهزة",
      startups: "الشركات الناشئة",
      tutorials: "الدروس",
      gallery: "المعرض",
      download: "التنزيلات",
      editor: "محرر الأكواد",
      short: "اختصار الروابط",
      qr: "منشئ رمز QR",
      picker: "منتقي الألوان",
      "invoice-generator": "منشئ الفواتير",
      "favicon-generator": "منشئ الأيقونة",
      "blog-form": "نموذج المدونة",
      article: "المقالات",
      prompting: "هندسة الأوامر",
      app: "تطبيقات الويب",
    },
  },
  hi: {
    service: "वेब, ऐप, ERP और IT समाधान विकास सेवाएं",
    description:
      "Codeverta SMEs, स्टार्टअप और एंटरप्राइज को तेज, सुरक्षित और स्केलेबल वेबसाइट, ऐप, ERP, POS, बिजनेस ऑटोमेशन और IT समाधान बनाने में मदद करता है।",
    keywords:
      "वेब डेवलपमेंट, सॉफ्टवेयर हाउस, ऐप डेवलपमेंट, ERP, POS, IT समाधान, Codeverta",
    labels: {
      "/": "वेब, ऐप और IT समाधान विकास सेवाएं",
      about: "हमारे बारे में",
      pelatihan: "कोडिंग और टेक्नोलॉजी ट्रेनिंग",
      produk: "डिजिटल उत्पाद",
      blog: "टेक्नोलॉजी ब्लॉग",
      faq: "FAQ",
      contact: "संपर्क",
      careers: "करियर",
      terms: "नियम और शर्तें",
      "privacy-policy": "गोपनीयता नीति",
      games: "गेम्स",
      image: "इमेज टूल्स",
      pdf: "PDF टूल्स",
      course: "ऑनलाइन कोर्स",
      cybersecurity: "साइबर सुरक्षा",
      ai: "आर्टिफिशियल इंटेलिजेंस",
      news: "टेक्नोलॉजी न्यूज़",
      gadget: "गैजेट्स",
      startups: "स्टार्टअप्स",
      tutorials: "ट्यूटोरियल्स",
      gallery: "गैलरी",
      download: "डाउनलोड",
      editor: "कोड एडिटर",
      short: "URL शॉर्टनर",
      qr: "QR कोड जेनरेटर",
      picker: "कलर पिकर",
      "invoice-generator": "इनवॉइस जेनरेटर",
      "favicon-generator": "फेविकॉन जेनरेटर",
      "blog-form": "ब्लॉग फॉर्म",
      article: "लेख",
      prompting: "प्रॉम्प्टिंग",
      app: "वेब ऐप्स",
    },
  },
  th: {
    service: "บริการพัฒนาเว็บไซต์ แอป ERP และโซลูชัน IT",
    description:
      "Codeverta ช่วย SME สตาร์ทอัพ และองค์กรสร้างเว็บไซต์ แอป ERP POS ระบบอัตโนมัติทางธุรกิจ และโซลูชัน IT ที่รวดเร็ว ปลอดภัย และขยายได้",
    keywords:
      "พัฒนาเว็บไซต์, software house, พัฒนาแอป, ERP, POS, โซลูชัน IT, Codeverta",
    labels: {
      "/": "บริการพัฒนาเว็บไซต์ แอป และโซลูชัน IT",
      about: "เกี่ยวกับเรา",
      pelatihan: "อบรมโค้ดดิ้งและเทคโนโลยี",
      produk: "ผลิตภัณฑ์ดิจิทัล",
      blog: "บล็อกเทคโนโลยี",
      faq: "FAQ",
      contact: "ติดต่อ",
      careers: "ร่วมงานกับเรา",
      terms: "ข้อกำหนดและเงื่อนไข",
      "privacy-policy": "นโยบายความเป็นส่วนตัว",
      games: "เกม",
      image: "เครื่องมือรูปภาพ",
      pdf: "เครื่องมือ PDF",
      course: "คอร์สออนไลน์",
      cybersecurity: "ความปลอดภัยไซเบอร์",
      ai: "ปัญญาประดิษฐ์",
      news: "ข่าวเทคโนโลยี",
      gadget: "แกดเจ็ต",
      startups: "สตาร์ทอัพ",
      tutorials: "บทเรียน",
      gallery: "แกลเลอรี",
      download: "ดาวน์โหลด",
      editor: "ตัวแก้ไขโค้ด",
      short: "ย่อลิงก์",
      qr: "สร้าง QR Code",
      picker: "ตัวเลือกสี",
      "invoice-generator": "สร้างใบแจ้งหนี้",
      "favicon-generator": "สร้าง Favicon",
      "blog-form": "ฟอร์มบล็อก",
      article: "บทความ",
      prompting: "Prompting",
      app: "เว็บแอป",
    },
  },
  vi: {
    service: "Dịch vụ phát triển web, ứng dụng, ERP và giải pháp IT",
    description:
      "Codeverta giúp SME, startup và doanh nghiệp xây dựng website, ứng dụng, ERP, POS, tự động hóa kinh doanh và giải pháp IT nhanh, an toàn, có khả năng mở rộng.",
    keywords:
      "phát triển website, công ty phần mềm, phát triển ứng dụng, ERP, POS, giải pháp IT, Codeverta",
    labels: {
      "/": "Dịch vụ phát triển web, ứng dụng và giải pháp IT",
      about: "Về chúng tôi",
      pelatihan: "Đào tạo coding & công nghệ",
      produk: "Sản phẩm số",
      blog: "Blog công nghệ",
      faq: "FAQ",
      contact: "Liên hệ",
      careers: "Tuyển dụng",
      terms: "Điều khoản & điều kiện",
      "privacy-policy": "Chính sách bảo mật",
      games: "Trò chơi",
      image: "Công cụ hình ảnh",
      pdf: "Công cụ PDF",
      course: "Khoá học online",
      cybersecurity: "An ninh mạng",
      ai: "Trí tuệ nhân tạo",
      news: "Tin công nghệ",
      gadget: "Thiết bị",
      startups: "Startup",
      tutorials: "Hướng dẫn",
      gallery: "Thư viện",
      download: "Tải xuống",
      editor: "Trình soạn thảo mã",
      short: "Rút gọn URL",
      qr: "Tạo mã QR",
      picker: "Bộ chọn màu",
      "invoice-generator": "Tạo hoá đơn",
      "favicon-generator": "Tạo favicon",
      "blog-form": "Biểu mẫu blog",
      article: "Bài viết",
      prompting: "Prompting",
      app: "Ứng dụng web",
    },
  },
  ru: {
    service: "Разработка сайтов, приложений, ERP и IT-решений",
    description:
      "Codeverta помогает МСП, стартапам и компаниям создавать быстрые, безопасные и масштабируемые сайты, приложения, ERP, POS, автоматизацию бизнеса и IT-решения.",
    keywords:
      "веб-разработка, software house, разработка приложений, ERP, POS, IT решения, Codeverta",
    labels: {
      "/": "Разработка сайтов, приложений и IT-решений",
      about: "О нас",
      pelatihan: "Обучение программированию и технологиям",
      produk: "Цифровые продукты",
      blog: "Технологический блог",
      faq: "FAQ",
      contact: "Контакты",
      careers: "Карьера",
      terms: "Условия использования",
      "privacy-policy": "Политика конфиденциальности",
      games: "Игры",
      image: "Инструменты для изображений",
      pdf: "PDF-инструменты",
      course: "Онлайн-курсы",
      cybersecurity: "Кибербезопасность",
      ai: "Искусственный интеллект",
      news: "Новости технологий",
      gadget: "Гаджеты",
      startups: "Стартапы",
      tutorials: "Уроки",
      gallery: "Галерея",
      download: "Загрузки",
      editor: "Редактор кода",
      short: "Сокращатель URL",
      qr: "Генератор QR-кодов",
      picker: "Палитра цветов",
      "invoice-generator": "Генератор счетов",
      "favicon-generator": "Генератор favicon",
      "blog-form": "Форма блога",
      article: "Статьи",
      prompting: "Prompting",
      app: "Веб-приложения",
    },
  },
  nl: {
    service: "Website-, app-, ERP- en IT-oplossingen",
    description:
      "Codeverta helpt mkb-bedrijven, startups en ondernemingen met snelle, veilige en schaalbare websites, applicaties, ERP, POS, bedrijfsautomatisering en IT-oplossingen.",
    keywords:
      "website ontwikkeling, software house, app ontwikkeling, ERP, POS systeem, IT oplossingen, Codeverta",
    labels: {
      "/": "Website-, app- en IT-oplossingen",
      about: "Over ons",
      pelatihan: "Training in coding en technologie",
      produk: "Digitale producten",
      blog: "Technologieblog",
      faq: "FAQ",
      contact: "Contact",
      careers: "Carrière",
      terms: "Algemene voorwaarden",
      "privacy-policy": "Privacybeleid",
      games: "Games",
      image: "Afbeeldingstools",
      pdf: "PDF-tools",
      course: "Online cursussen",
      cybersecurity: "Cybersecurity",
      ai: "Kunstmatige intelligentie",
      news: "Technologienieuws",
      gadget: "Gadgets",
      startups: "Startups",
      tutorials: "Tutorials",
      gallery: "Galerij",
      download: "Downloads",
      editor: "Code-editor",
      short: "URL-verkorter",
      qr: "QR-codegenerator",
      picker: "Kleurkiezer",
      "invoice-generator": "Factuurgenerator",
      "favicon-generator": "Favicon-generator",
      "blog-form": "Blogformulier",
      article: "Artikelen",
      prompting: "Prompting",
      app: "Webapps",
    },
  },
};

const FALLBACK_LABELS = BASE_COPY["en-US"].labels;

const DESCRIPTION_BY_SECTION: Partial<
  Record<string, Record<SupportedLocale, string>>
> = {
  blog: {
    id: "Baca insight, studi kasus, dan panduan teknologi dari Codeverta untuk membantu bisnis tumbuh lewat produk digital.",
    "en-US":
      "Read Codeverta insights, case studies, and technology guides to grow your business with digital products.",
    "en-GB":
      "Read Codeverta insights, case studies, and technology guides to grow your business with digital products.",
    zh: "阅读 Codeverta 的洞察、案例研究和技术指南，借助数字产品推动业务增长。",
    ja: "Codeverta のインサイト、事例、技術ガイドでデジタル製品による事業成長を支援します。",
    ko: "Codeverta의 인사이트, 사례 연구, 기술 가이드를 통해 디지털 제품으로 비즈니스를 성장시키세요.",
    ms: "Baca insight, kajian kes dan panduan teknologi Codeverta untuk mengembangkan perniagaan melalui produk digital.",
    de: "Lesen Sie Codeverta-Insights, Fallstudien und Technologie-Leitfäden für Wachstum mit digitalen Produkten.",
    fr: "Lisez les analyses, études de cas et guides technologiques de Codeverta pour développer votre activité grâce au digital.",
    es: "Lee insights, casos de estudio y guías tecnológicas de Codeverta para hacer crecer tu negocio con productos digitales.",
    ar: "اقرأ رؤى Codeverta ودراسات الحالة والأدلة التقنية لتنمية عملك عبر المنتجات الرقمية.",
    hi: "डिजिटल उत्पादों से व्यवसाय बढ़ाने के लिए Codeverta के insights, case studies और technology guides पढ़ें।",
    th: "อ่านบทวิเคราะห์ กรณีศึกษา และคู่มือเทคโนโลยีจาก Codeverta เพื่อเติบโตด้วยผลิตภัณฑ์ดิจิทัล",
    vi: "Đọc insight, case study và hướng dẫn công nghệ từ Codeverta để phát triển doanh nghiệp bằng sản phẩm số.",
    ru: "Читайте материалы, кейсы и технологические руководства Codeverta для роста бизнеса с цифровыми продуктами.",
    nl: "Lees inzichten, cases en technologiegidsen van Codeverta om je bedrijf te laten groeien met digitale producten.",
  },
};

function isSupportedLocale(locale?: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function normalizeLocale(locale?: string): SupportedLocale {
  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function normalizePath(path = "/") {
  const cleanPath = path.split("#")[0].split("?")[0] || "/";
  const withoutLocale = cleanPath.replace(
    new RegExp(
      `^/(${SUPPORTED_LOCALES.join("|").replace(/-/g, "\\-")})(?=/|$)`
    ),
    ""
  );
  const normalized = `/${withoutLocale.replace(/^\/+/, "")}`.replace(
    /\/+$/,
    ""
  );
  return normalized || "/";
}

export function getLocalizedUrl(locale: string, path = "/") {
  const safeLocale = normalizeLocale(locale);
  const cleanPath = normalizePath(path).replace(/^\/+/, "");
  return `${SITE_URL}/${safeLocale}${cleanPath ? `/${cleanPath}` : ""}`;
}

export function getAlternateLinks(path = "/") {
  return [
    ...SUPPORTED_LOCALES.map((locale) => ({
      rel: "alternate",
      hrefLang: locale,
      href: getLocalizedUrl(locale, path),
    })),
    {
      rel: "alternate",
      hrefLang: "x-default",
      href: getLocalizedUrl(DEFAULT_LOCALE, path),
    },
  ];
}

function humanizeSlug(slug?: string) {
  if (!slug) return "";
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getLabel(locale: SupportedLocale, key: string) {
  return (
    BASE_COPY[locale].labels[key] || FALLBACK_LABELS[key] || humanizeSlug(key)
  );
}

const OFFICE_LOCATION_TEXT: Record<SupportedLocale, string> = {
  id: " Lokasi kantor kami di Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  "en-US":
    " Our office is located at Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  "en-GB":
    " Our office is located at Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  zh: " 我们的办公室位于 Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia。",
  ja: " オフィス所在地：Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia。",
  ko: " 사무실 위치: Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  ms: " Lokasi pejabat kami di Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  de: " Unser Büro befindet sich in der Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  fr: " Notre bureau est situé à Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  es: " Nuestra oficina está ubicada en Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  ar: " يقع مكتبنا في Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  hi: " हमारा कार्यालय Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia में स्थित है।",
  th: " สำนักงานของเราตั้งอยู่ที่ Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia",
  vi: " Văn phòng của chúng tôi tại Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  ru: " Наш офис находится по адресу: Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
  nl: " Ons kantoor is gevestigd aan de Jl Kaliurang, Ngaglik, Sardonohardjo, Ngaglik, Sleman, Yogyakarta, Indonesia.",
};

export function appendOfficeLocation(
  description: string,
  locale?: string
): string {
  const safeLocale = normalizeLocale(locale);
  const officeLocationSuffix = OFFICE_LOCATION_TEXT[safeLocale];
  if (!description) return officeLocationSuffix.trim();
  if (
    description.includes("Jl Kaliurang") ||
    description.includes("Jl. Kaliurang")
  ) {
    return description;
  }
  return description.endsWith(".")
    ? `${description}${officeLocationSuffix}`
    : `${description}.${officeLocationSuffix}`;
}

export function buildSeoMeta({
  locale,
  path = "/",
  title,
  description,
  keywords,
  image,
  canonical,
}: {
  locale?: string;
  path?: string;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
} = {}): SeoMeta {
  const safeLocale = normalizeLocale(locale);
  const safePath = normalizePath(path);
  const copy = BASE_COPY[safeLocale];
  const segments = safePath.split("/").filter(Boolean);
  const sectionKey = segments[0] || "/";
  const sectionLabel = getLabel(safeLocale, sectionKey);
  const detailLabel =
    segments.length > 1 ? humanizeSlug(segments[segments.length - 1]) : "";
  const pageLabel =
    safePath === "/" ? getLabel(safeLocale, "/") : detailLabel || sectionLabel;
  const generatedTitle = `${pageLabel} | ${SITE_NAME}`;
  const sectionDescription = DESCRIPTION_BY_SECTION[sectionKey]?.[safeLocale];

  return {
    title:
      title ||
      (safePath === "/" ? `${SITE_NAME} - ${copy.service}` : generatedTitle),
    description: appendOfficeLocation(
      description || sectionDescription || copy.description,
      safeLocale
    ),
    canonical: canonical || getLocalizedUrl(safeLocale, safePath),
    image: image?.startsWith("http")
      ? image
      : image
      ? `${SITE_URL}${image}`
      : DEFAULT_OG_IMAGE,
    keywords: keywords || copy.keywords,
    locale: safeLocale,
    path: safePath,
    ogLocale: OG_LOCALES[safeLocale],
  };
}
