export type IndustryMarket = {
  country: string;
  countryCode: string;
  cities: string[];
  seoLocation: string;
  metaDescription: string;
  metaKeywords: string;
  marketLineTemplate: string;
  coverageEyebrow: string;
  coverageTitle: string;
  coverageDescription: string;
  trustedByTemplate: string;
  companyTemplate: string;
};

const markets: Record<string, IndustryMarket> = {
  id: market(
    "Indonesia",
    "ID",
    ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Yogyakarta"],
    {
      seoLocation: "Jakarta, Surabaya, Bandung & Indonesia",
      metaDescription:
        "Melayani perusahaan di Jakarta, Surabaya, Bandung, Medan, Semarang, Yogyakarta, dan seluruh Indonesia.",
      metaKeywords:
        "software industri Jakarta, ERP Surabaya, transformasi digital Bandung, software bisnis Indonesia",
      marketLineTemplate:
        "Solusi ini disesuaikan untuk perusahaan {{industry}} di Jakarta, Surabaya, Bandung, Medan, Semarang, Yogyakarta, dan seluruh Indonesia.",
      coverageEyebrow: "Jangkauan lokal",
      coverageTitle: "Mendukung bisnis di berbagai kota Indonesia",
      coverageDescription:
        "Tim kami melayani kebutuhan operasional dan transformasi digital perusahaan dari Jakarta hingga Yogyakarta, dengan implementasi yang menyesuaikan karakter setiap wilayah.",
      trustedByTemplate:
        "Dipercaya oleh perusahaan {{industry}} di kota-kota Indonesia",
      companyTemplate: "Perusahaan {{industry}} di {{city}}",
    }
  ),
  en: market(
    "United States & Global",
    "US",
    ["New York", "San Francisco", "London", "Chicago", "Austin", "Seattle"],
    {
      seoLocation: "New York, San Francisco, London & Global Hubs",
      metaDescription:
        "Built for enterprise and growing teams in New York, San Francisco, London, Chicago, Austin, and worldwide.",
      metaKeywords:
        "industry software New York, ERP London, business automation San Francisco, global software company",
      marketLineTemplate:
        "This solution is tailored for {{industry}} companies in New York, San Francisco, London, Chicago, Austin, and worldwide.",
      coverageEyebrow: "Global & US coverage",
      coverageTitle: "Supporting businesses across major international cities",
      coverageDescription:
        "We deliver scalable industry systems for teams in New York, San Francisco, London, Chicago, Austin, and globally.",
      trustedByTemplate: "Trusted by {{industry}} companies worldwide",
      companyTemplate: "{{industry}} companies in {{city}}",
    }
  ),
  es: market(
    "España",
    "ES",
    ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Zaragoza"],
    {
      seoLocation: "España: Madrid, Barcelona, Valencia, Sevilla y Bilbao",
      metaDescription:
        "Soluciones para empresas de Madrid, Barcelona, Valencia, Sevilla, Bilbao, Zaragoza y toda España.",
      metaKeywords:
        "software industrial Madrid, ERP Barcelona, automatización Valencia, desarrollo de software España",
      marketLineTemplate:
        "Esta solución se adapta a empresas de {{industry}} en Madrid, Barcelona, Valencia, Sevilla, Bilbao, Zaragoza y toda España.",
      coverageEyebrow: "Cobertura en España",
      coverageTitle:
        "Tecnología para empresas en las principales ciudades de España",
      coverageDescription:
        "Ayudamos a equipos de Madrid, Barcelona, Valencia, Sevilla, Bilbao y Zaragoza con implantaciones adaptadas a sus operaciones locales.",
      trustedByTemplate:
        "Empresas de {{industry}} que confían en soluciones digitales en España",
      companyTemplate: "Empresas de {{industry}} en {{city}}",
    }
  ),
  ja: market("日本", "JP", ["東京", "大阪", "名古屋", "福岡", "札幌", "横浜"], {
    seoLocation: "東京・大阪・名古屋・日本全国",
    metaDescription:
      "東京、大阪、名古屋、福岡、札幌、横浜をはじめ、日本全国の企業に対応します。",
    metaKeywords: "東京 業界システム, 大阪 ERP, 名古屋 DX, 日本 システム開発",
    marketLineTemplate:
      "東京・大阪・名古屋・福岡・札幌・横浜をはじめ、日本全国の{{industry}}企業向けに最適化したソリューションです。",
    coverageEyebrow: "全国対応",
    coverageTitle: "日本の主要都市でビジネスをサポート",
    coverageDescription:
      "東京、大阪、名古屋、福岡、札幌、横浜の企業に、各地域の業務に合わせたシステムを提供します。",
    trustedByTemplate: "日本の主要都市で{{industry}}企業に選ばれています",
    companyTemplate: "{{city}}の{{industry}}企業",
  }),
  de: market(
    "Deutschland",
    "DE",
    ["Berlin", "München", "Frankfurt", "Hamburg", "Köln", "Stuttgart"],
    {
      seoLocation: "Berlin, München, Frankfurt & Deutschland",
      metaDescription:
        "Für Unternehmen in Berlin, München, Frankfurt, Hamburg, Köln, Stuttgart und ganz Deutschland.",
      metaKeywords:
        "Industriesoftware Berlin, ERP München, Automatisierung Frankfurt, Software Deutschland",
      marketLineTemplate:
        "Diese Lösung ist auf {{industry}}-Unternehmen in Berlin, München, Frankfurt, Hamburg, Köln, Stuttgart und ganz Deutschland zugeschnitten.",
      coverageEyebrow: "Deutschlandweit",
      coverageTitle:
        "Digitale Lösungen für Deutschlands wichtigste Wirtschaftsstandorte",
      coverageDescription:
        "Wir unterstützen Teams in Berlin, München, Frankfurt, Hamburg, Köln und Stuttgart mit lokal abgestimmten Systemen.",
      trustedByTemplate: "Vertraut von {{industry}}-Unternehmen in Deutschland",
      companyTemplate: "{{industry}}-Unternehmen in {{city}}",
    }
  ),
  fr: market(
    "France",
    "FR",
    ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille"],
    {
      seoLocation: "Paris, Lyon, Marseille & France",
      metaDescription:
        "Pour les entreprises de Paris, Lyon, Marseille, Toulouse, Bordeaux, Lille et partout en France.",
      metaKeywords:
        "logiciel industrie Paris, ERP Lyon, automatisation Marseille, développement logiciel France",
      marketLineTemplate:
        "Cette solution est adaptée aux entreprises {{industry}} de Paris, Lyon, Marseille, Toulouse, Bordeaux, Lille et partout en France.",
      coverageEyebrow: "Couverture nationale",
      coverageTitle: "Des solutions pour les entreprises dans toute la France",
      coverageDescription:
        "Nous accompagnons les équipes de Paris, Lyon, Marseille, Toulouse, Bordeaux et Lille avec des systèmes adaptés à leurs opérations.",
      trustedByTemplate: "La confiance des entreprises {{industry}} en France",
      companyTemplate: "Entreprises {{industry}} à {{city}}",
    }
  ),
  nl: market(
    "Nederland",
    "NL",
    ["Amsterdam", "Rotterdam", "Utrecht", "Eindhoven", "Den Haag", "Groningen"],
    {
      seoLocation: "Amsterdam, Rotterdam, Utrecht & Nederland",
      metaDescription:
        "Voor bedrijven in Amsterdam, Rotterdam, Utrecht, Eindhoven, Den Haag, Groningen en heel Nederland.",
      metaKeywords:
        "industriesoftware Amsterdam, ERP Rotterdam, automatisering Utrecht, software Nederland",
      marketLineTemplate:
        "Deze oplossing is afgestemd op {{industry}}-bedrijven in Amsterdam, Rotterdam, Utrecht, Eindhoven, Den Haag, Groningen en heel Nederland.",
      coverageEyebrow: "Landelijke dekking",
      coverageTitle: "Digitale systemen voor bedrijven in heel Nederland",
      coverageDescription:
        "Wij ondersteunen teams in Amsterdam, Rotterdam, Utrecht, Eindhoven, Den Haag en Groningen met oplossingen voor hun lokale bedrijfsvoering.",
      trustedByTemplate: "Vertrouwd door {{industry}}-bedrijven in Nederland",
      companyTemplate: "{{industry}}-bedrijven in {{city}}",
    }
  ),
  zh: market("中国", "CN", ["上海", "北京", "深圳", "广州", "杭州", "成都"], {
    seoLocation: "上海、北京、深圳、广州及中国各地",
    metaDescription: "服务上海、北京、深圳、广州、杭州、成都及中国各地企业。",
    metaKeywords: "上海行业软件, 北京ERP, 深圳数字化转型, 中国软件开发",
    marketLineTemplate:
      "该解决方案面向上海、北京、深圳、广州、杭州、成都及中国各地的{{industry}}企业进行本地化适配。",
    coverageEyebrow: "全国覆盖",
    coverageTitle: "服务中国主要城市的企业",
    coverageDescription:
      "我们为上海、北京、深圳、广州、杭州和成都的企业提供适应本地运营需求的数字化系统。",
    trustedByTemplate: "深受中国主要城市{{industry}}企业信赖",
    companyTemplate: "{{city}}{{industry}}企业",
  }),
  ko: market(
    "대한민국",
    "KR",
    ["서울", "부산", "인천", "대구", "대전", "광주"],
    {
      seoLocation: "서울, 부산, 인천 및 대한민국 전역",
      metaDescription:
        "서울, 부산, 인천, 대구, 대전, 광주 및 대한민국 전역의 기업을 지원합니다.",
      metaKeywords:
        "서울 산업 소프트웨어, 부산 ERP, 인천 업무 자동화, 대한민국 소프트웨어 개발",
      marketLineTemplate:
        "서울, 부산, 인천, 대구, 대전, 광주 및 대한민국 전역의 {{industry}} 기업에 맞춘 솔루션입니다.",
      coverageEyebrow: "전국 지원",
      coverageTitle: "대한민국 주요 도시의 비즈니스를 지원합니다",
      coverageDescription:
        "서울, 부산, 인천, 대구, 대전, 광주 기업의 현지 운영에 맞춘 디지털 시스템을 제공합니다.",
      trustedByTemplate: "대한민국 주요 도시의 {{industry}} 기업이 신뢰합니다",
      companyTemplate: "{{city}} {{industry}} 기업",
    }
  ),
  ms: market(
    "Malaysia",
    "MY",
    [
      "Kuala Lumpur",
      "George Town",
      "Johor Bahru",
      "Shah Alam",
      "Kuching",
      "Kota Kinabalu",
    ],
    {
      seoLocation: "Kuala Lumpur, Pulau Pinang, Johor Bahru & Malaysia",
      metaDescription:
        "Untuk syarikat di Kuala Lumpur, Pulau Pinang, Johor Bahru, Shah Alam, Kuching, Kota Kinabalu dan seluruh Malaysia.",
      metaKeywords:
        "perisian industri Kuala Lumpur, ERP Pulau Pinang, automasi Johor Bahru, perisian Malaysia",
      marketLineTemplate:
        "Penyelesaian ini disesuaikan untuk syarikat {{industry}} di Kuala Lumpur, Pulau Pinang, Johor Bahru, Shah Alam, Kuching, Kota Kinabalu dan seluruh Malaysia.",
      coverageEyebrow: "Liputan Malaysia",
      coverageTitle: "Menyokong perniagaan di bandar utama Malaysia",
      coverageDescription:
        "Kami menyokong pasukan di Kuala Lumpur, Pulau Pinang, Johor Bahru, Shah Alam, Kuching dan Kota Kinabalu dengan sistem mengikut operasi tempatan.",
      trustedByTemplate: "Dipercayai oleh syarikat {{industry}} di Malaysia",
      companyTemplate: "Syarikat {{industry}} di {{city}}",
    }
  ),
  ar: market(
    "المملكة العربية السعودية",
    "SA",
    ["الرياض", "جدة", "الدمام", "مكة", "المدينة المنورة", "الخبر"],
    {
      seoLocation: "الرياض وجدة والدمام والمملكة العربية السعودية",
      metaDescription:
        "حلول للشركات في الرياض وجدة والدمام ومكة والمدينة المنورة والخبر وجميع أنحاء المملكة العربية السعودية.",
      metaKeywords:
        "برمجيات صناعية الرياض, ERP جدة, أتمتة الأعمال الدمام, تطوير البرمجيات السعودية",
      marketLineTemplate:
        "حل مصمم لشركات {{industry}} في الرياض وجدة والدمام ومكة والمدينة المنورة والخبر وجميع أنحاء المملكة العربية السعودية.",
      coverageEyebrow: "تغطية محلية",
      coverageTitle: "دعم الشركات في المدن الرئيسية بالمملكة",
      coverageDescription:
        "نقدم أنظمة رقمية ملائمة لعمليات الشركات في الرياض وجدة والدمام ومكة والمدينة المنورة والخبر.",
      trustedByTemplate:
        "موثوق به من شركات {{industry}} في المملكة العربية السعودية",
      companyTemplate: "شركات {{industry}} في {{city}}",
    }
  ),
  hi: market(
    "भारत",
    "IN",
    ["मुंबई", "बेंगलुरु", "दिल्ली", "हैदराबाद", "चेन्नई", "पुणे"],
    {
      seoLocation: "मुंबई, बेंगलुरु, दिल्ली और पूरे भारत में",
      metaDescription:
        "मुंबई, बेंगलुरु, दिल्ली, हैदराबाद, चेन्नई, पुणे और पूरे भारत की कंपनियों के लिए।",
      metaKeywords:
        "मुंबई इंडस्ट्री सॉफ्टवेयर, बेंगलुरु ERP, दिल्ली बिजनेस ऑटोमेशन, भारत सॉफ्टवेयर डेवलपमेंट",
      marketLineTemplate:
        "यह समाधान मुंबई, बेंगलुरु, दिल्ली, हैदराबाद, चेन्नई, पुणे और पूरे भारत की {{industry}} कंपनियों के लिए बनाया गया है।",
      coverageEyebrow: "पूरे भारत में सेवा",
      coverageTitle: "भारत के प्रमुख शहरों में व्यवसायों का समर्थन",
      coverageDescription:
        "हम मुंबई, बेंगलुरु, दिल्ली, हैदराबाद, चेन्नई और पुणे की कंपनियों को स्थानीय संचालन के अनुसार डिजिटल सिस्टम प्रदान करते हैं।",
      trustedByTemplate:
        "भारत के प्रमुख शहरों की {{industry}} कंपनियों द्वारा विश्वसनीय",
      companyTemplate: "{{city}} की {{industry}} कंपनियाँ",
    }
  ),
  th: market(
    "ประเทศไทย",
    "TH",
    ["กรุงเทพฯ", "ชลบุรี", "ระยอง", "เชียงใหม่", "ขอนแก่น", "ภูเก็ต"],
    {
      seoLocation: "กรุงเทพฯ ชลบุรี ระยอง และทั่วประเทศไทย",
      metaDescription:
        "สำหรับบริษัทในกรุงเทพฯ ชลบุรี ระยอง เชียงใหม่ ขอนแก่น ภูเก็ต และทั่วประเทศไทย",
      metaKeywords:
        "ซอฟต์แวร์อุตสาหกรรม กรุงเทพ, ERP ชลบุรี, ระบบอัตโนมัติ ระยอง, พัฒนาซอฟต์แวร์ ประเทศไทย",
      marketLineTemplate:
        "โซลูชันนี้ปรับให้เหมาะกับบริษัท {{industry}} ในกรุงเทพฯ ชลบุรี ระยอง เชียงใหม่ ขอนแก่น ภูเก็ต และทั่วประเทศไทย",
      coverageEyebrow: "ให้บริการทั่วประเทศ",
      coverageTitle: "สนับสนุนธุรกิจในเมืองสำคัญของประเทศไทย",
      coverageDescription:
        "เรานำเสนอระบบที่เหมาะกับการดำเนินงานของบริษัทในกรุงเทพฯ ชลบุรี ระยอง เชียงใหม่ ขอนแก่น และภูเก็ต",
      trustedByTemplate: "ได้รับความไว้วางใจจากบริษัท {{industry}} ในประเทศไทย",
      companyTemplate: "บริษัท {{industry}} ใน{{city}}",
    }
  ),
  vi: market(
    "Việt Nam",
    "VN",
    ["TP.HCM", "Hà Nội", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Bình Dương"],
    {
      seoLocation: "TP.HCM, Hà Nội, Đà Nẵng & Việt Nam",
      metaDescription:
        "Dành cho doanh nghiệp tại TP.HCM, Hà Nội, Đà Nẵng, Hải Phòng, Cần Thơ, Bình Dương và khắp Việt Nam.",
      metaKeywords:
        "phần mềm ngành TP.HCM, ERP Hà Nội, tự động hóa Đà Nẵng, phát triển phần mềm Việt Nam",
      marketLineTemplate:
        "Giải pháp này được thiết kế cho doanh nghiệp {{industry}} tại TP.HCM, Hà Nội, Đà Nẵng, Hải Phòng, Cần Thơ, Bình Dương và khắp Việt Nam.",
      coverageEyebrow: "Phủ sóng toàn quốc",
      coverageTitle: "Hỗ trợ doanh nghiệp tại các thành phố lớn của Việt Nam",
      coverageDescription:
        "Chúng tôi cung cấp hệ thống phù hợp với vận hành địa phương tại TP.HCM, Hà Nội, Đà Nẵng, Hải Phòng, Cần Thơ và Bình Dương.",
      trustedByTemplate:
        "Được các doanh nghiệp {{industry}} tại Việt Nam tin tưởng",
      companyTemplate: "Doanh nghiệp {{industry}} tại {{city}}",
    }
  ),
  ru: market(
    "Россия",
    "RU",
    [
      "Москва",
      "Санкт-Петербург",
      "Казань",
      "Екатеринбург",
      "Новосибирск",
      "Нижний Новгород",
    ],
    {
      seoLocation: "Москва, Санкт-Петербург и регионы России",
      metaDescription:
        "Для компаний Москвы, Санкт-Петербурга, Казани, Екатеринбурга, Новосибирска, Нижнего Новгорода и всей России.",
      metaKeywords:
        "отраслевое ПО Москва, ERP Санкт-Петербург, автоматизация Казань, разработка ПО Россия",
      marketLineTemplate:
        "Решение адаптировано для компаний {{industry}} в Москве, Санкт-Петербурге, Казани, Екатеринбурге, Новосибирске, Нижнем Новгороде и по всей России.",
      coverageEyebrow: "Работаем по всей России",
      coverageTitle: "Поддержка бизнеса в крупнейших городах России",
      coverageDescription:
        "Мы внедряем системы с учётом местных операций компаний Москвы, Санкт-Петербурга, Казани, Екатеринбурга, Новосибирска и Нижнего Новгорода.",
      trustedByTemplate: "Нам доверяют компании {{industry}} по всей России",
      companyTemplate: "Компании {{industry}} в городе {{city}}",
    }
  ),
};

function market(
  country: string,
  countryCode: string,
  cities: string[],
  copy: Omit<IndustryMarket, "country" | "countryCode" | "cities">
): IndustryMarket {
  return { country, countryCode, cities, ...copy };
}

export function getIndustryMarket(locale?: string): IndustryMarket {
  return markets[locale || ""] || markets.id;
}

export function fillMarketTemplate(
  template: string,
  values: Record<string, string>
) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || "");
}

function containsMarketCities(value: string, market: IndustryMarket) {
  const normalized = value.toLocaleLowerCase();
  return market.cities
    .slice(0, 2)
    .every((city) => normalized.includes(city.toLocaleLowerCase()));
}

export function ensureMarketTitle(value: string, market: IndustryMarket) {
  if (containsMarketCities(value, market)) return value;
  const title = value.replace(/\s*\|\s*Codeverta\s*$/i, "");
  return `${title} | ${market.seoLocation} | Codeverta`;
}

export function ensureMarketDescription(value: string, market: IndustryMarket) {
  return containsMarketCities(value, market)
    ? value
    : `${value} ${market.metaDescription}`;
}

export function ensureMarketContent(
  value: string,
  market: IndustryMarket,
  industry: string
) {
  return containsMarketCities(value, market)
    ? value
    : `${value} ${fillMarketTemplate(market.marketLineTemplate, { industry })}`;
}

export function ensureMarketKeywords(value: string, market: IndustryMarket) {
  return containsMarketCities(value, market)
    ? value
    : `${value}, ${market.metaKeywords}`;
}
