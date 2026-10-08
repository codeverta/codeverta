import type { SupportedLocale } from "./seo";

export type ErpScenario = { title: string; description: string };

export type ErpPageCopy = {
  status: string;
  hero: string;
  primaryCta: string;
  secondaryCta: string;
  contactTitle: string;
  contactDescription: string;
  referenceTitle: string;
  referenceDescription: string;
  scopeTitle: string;
  scopeDescription: string;
  guideSelection: string;
  guideCustom: string;
  guideDistributor: string;
  indonesianSuffix: string;
  whatsappMessage: string;
  scenarios: ErpScenario[];
};

const copy: Record<SupportedLocale, ErpPageCopy> = {
  id: {
    status: "Dalam pengembangan",
    hero: "Bawa alur yang ingin Anda satukan—misalnya pesanan, pembelian, persediaan, dan pelaporan—agar ruang lingkup serta bagian yang dapat ditinjau hari ini bisa dibahas.",
    primaryCta: "Bahas skenario ERP",
    secondaryCta: "Kirim rincian kebutuhan",
    contactTitle: "Bahas kebutuhan ERP Anda",
    contactDescription:
      "Sebutkan jenis bisnis, jumlah lokasi, dan satu alur yang ingin dievaluasi. Jangan sertakan data operasional yang bersifat rahasia.",
    referenceTitle: "Referensi antarmuka ERPNext",
    referenceDescription:
      "Referensi antarmuka berbasis ERPNext; bukan bukti kesiapan modul ERP Codeverta.",
    scopeTitle: "Skenario alur kerja untuk dibahas",
    scopeDescription:
      "Pilih satu alur sebagai bahan diskusi. Skenario berikut membantu memetakan dokumen, keputusan, pengecualian, dan hasil yang perlu diperiksa.",
    guideSelection: "Panduan memilih software ERP",
    guideCustom: "Panduan pengembangan custom ERP",
    guideDistributor: "Panduan software distributor",
    indonesianSuffix: " (Bahasa Indonesia)",
    whatsappMessage:
      "Halo Codeverta, saya ingin membahas skenario untuk evaluasi ERP. Alur yang ingin saya tinjau: [jelaskan proses Anda]. Mohon konfirmasi bagian yang dapat ditinjau atau didemokan saat ini.",
    scenarios: [
      {
        title: "Pesanan sampai pembayaran",
        description:
          "Bawa contoh pesanan saat stok berada di beberapa gudang. Bahas pengiriman parsial, invoice, pembayaran, dan data yang perlu terhubung.",
      },
      {
        title: "Pembelian dan penerimaan",
        description:
          "Petakan permintaan pembelian, persetujuan, kiriman yang kurang atau rusak, serta bukti perubahan yang perlu disimpan.",
      },
      {
        title: "Stock opname dan koreksi",
        description:
          "Jelaskan cara menghitung fisik, mencatat penyebab selisih, menyetujui koreksi, dan meninjau riwayatnya.",
      },
      {
        title: "Laporan dan tutup periode",
        description:
          "Pilih angka laporan yang penting lalu petakan transaksi sumber, penyesuaian, dan pihak yang perlu menyetujuinya.",
      },
    ],
  },
  en: {
    status: "In development",
    hero: "Bring a workflow you want to connect—such as orders, purchasing, inventory, and reporting—so the scope and what can be reviewed today can be discussed.",
    primaryCta: "Discuss an ERP scenario",
    secondaryCta: "Share your requirements",
    contactTitle: "Discuss your ERP requirements",
    contactDescription:
      "Share your business type, number of locations, and one workflow to evaluate. Please leave out confidential operating data.",
    referenceTitle: "ERPNext interface reference",
    referenceDescription:
      "An interface reference based on ERPNext; it is not evidence that Codeverta ERP modules are ready.",
    scopeTitle: "Workflows to discuss",
    scopeDescription:
      "Choose one workflow as a starting point. These scenarios help map the documents, decisions, exceptions, and outcomes to review.",
    guideSelection: "ERP software selection guide",
    guideCustom: "Custom ERP development guide",
    guideDistributor: "Distributor software guide",
    indonesianSuffix: " (in Indonesian)",
    whatsappMessage:
      "Hello Codeverta, I would like to discuss an ERP evaluation scenario. Workflow to review: [describe your process]. Please confirm what can currently be reviewed or demonstrated.",
    scenarios: [
      {
        title: "Order to payment",
        description:
          "Bring an order example where stock is split across warehouses. Discuss partial delivery, invoicing, payment, and the data that needs to connect.",
      },
      {
        title: "Purchasing and receiving",
        description:
          "Map a purchase request, approval, short or damaged delivery, and the evidence that should be retained.",
      },
      {
        title: "Stocktake and adjustments",
        description:
          "Describe how to count physical stock, record the reason for a variance, approve an adjustment, and review its history.",
      },
      {
        title: "Reporting and period close",
        description:
          "Choose an important report figure, then map its source transactions, adjustments, and required approvals.",
      },
    ],
  },
  zh: {
    status: "开发中",
    hero: "带来您希望打通的一条业务流程，例如订单、采购、库存和报表，以便讨论范围以及目前可以查看的内容。",
    primaryCta: "讨论 ERP 场景",
    secondaryCta: "提交需求详情",
    contactTitle: "讨论您的 ERP 需求",
    contactDescription:
      "请说明业务类型、地点数量以及一条待评估的流程。请勿填写机密运营数据。",
    referenceTitle: "ERPNext 界面参考",
    referenceDescription:
      "基于 ERPNext 的界面参考；这并不能证明 Codeverta ERP 模块已准备就绪。",
    scopeTitle: "可讨论的业务流程",
    scopeDescription:
      "选择一条流程作为讨论起点。以下场景可帮助梳理需要检查的单据、决策、例外情况和结果。",
    guideSelection: "ERP 软件选型指南",
    guideCustom: "定制 ERP 开发指南",
    guideDistributor: "分销商软件指南",
    indonesianSuffix: "（印度尼西亚语）",
    whatsappMessage:
      "您好 Codeverta，我想讨论 ERP 评估场景。希望查看的流程：[描述您的流程]。请确认目前可以查看或演示哪些内容。",
    scenarios: [
      {
        title: "从订单到收款",
        description:
          "带来一个库存分布在多个仓库的订单示例，讨论部分发货、开票、付款及需要打通的数据。",
      },
      {
        title: "采购与收货",
        description:
          "梳理采购申请、审批、短少或损坏的到货，以及需要保留的变更记录。",
      },
      {
        title: "库存盘点与调整",
        description: "说明如何盘点实物、记录差异原因、审批调整并查看历史记录。",
      },
      {
        title: "报表与期间结账",
        description: "选择一个重要报表数字，梳理其来源交易、调整和所需审批。",
      },
    ],
  },
  ja: {
    status: "開発中",
    hero: "受注、購買、在庫、レポートなど、連携したい業務フローをお持ちください。対象範囲と現在確認できる内容を相談できます。",
    primaryCta: "ERPのシナリオを相談",
    secondaryCta: "要件を送る",
    contactTitle: "ERPの要件を相談する",
    contactDescription:
      "業種、拠点数、評価したい業務フローを1つお知らせください。機密性の高い運用データは入力しないでください。",
    referenceTitle: "ERPNextの画面例",
    referenceDescription:
      "ERPNextを基にした画面の参考例です。Codeverta ERPの各モジュールの準備状況を示すものではありません。",
    scopeTitle: "相談する業務フロー",
    scopeDescription:
      "まず1つのフローを選んでください。以下の例は、確認すべき書類、判断、例外、結果を整理するためのものです。",
    guideSelection: "ERPソフトウェア選定ガイド",
    guideCustom: "カスタムERP開発ガイド",
    guideDistributor: "販売代理店向けソフトウェアガイド",
    indonesianSuffix: "（インドネシア語）",
    whatsappMessage:
      "Codeverta様、ERPの評価シナリオについて相談したいです。確認したい業務フロー：[業務内容を記入]。現在確認またはデモできる内容をご教示ください。",
    scenarios: [
      {
        title: "受注から入金まで",
        description:
          "在庫が複数の倉庫に分かれた受注例を用意し、分納、請求、入金、連携が必要なデータを相談します。",
      },
      {
        title: "購買と入荷",
        description:
          "購買依頼、承認、不足・破損を含む入荷、保存すべき変更記録を整理します。",
      },
      {
        title: "棚卸しと調整",
        description:
          "実在庫の数え方、差異理由の記録、調整の承認、履歴の確認方法を説明します。",
      },
      {
        title: "レポートと期間締め",
        description:
          "重要なレポート数値を選び、元取引、調整、必要な承認をたどります。",
      },
    ],
  },
  ko: {
    status: "개발 중",
    hero: "주문, 구매, 재고, 보고 등 연결하고 싶은 업무 흐름을 가져오시면 범위와 현재 검토할 수 있는 내용을 함께 논의할 수 있습니다.",
    primaryCta: "ERP 시나리오 상담",
    secondaryCta: "요구 사항 전달",
    contactTitle: "ERP 요구 사항 상담",
    contactDescription:
      "업종, 사업장 수, 검토하려는 업무 흐름 한 가지를 알려 주세요. 기밀 운영 데이터는 입력하지 마세요.",
    referenceTitle: "ERPNext 화면 참고 예시",
    referenceDescription:
      "ERPNext 기반 인터페이스 참고 자료이며, Codeverta ERP 모듈의 준비 상태를 증명하지 않습니다.",
    scopeTitle: "논의할 업무 흐름",
    scopeDescription:
      "논의의 출발점으로 한 가지 흐름을 선택하세요. 아래 시나리오는 확인할 문서, 의사 결정, 예외, 결과를 정리하는 데 도움이 됩니다.",
    guideSelection: "ERP 소프트웨어 선택 가이드",
    guideCustom: "맞춤형 ERP 개발 가이드",
    guideDistributor: "유통업체 소프트웨어 가이드",
    indonesianSuffix: "(인도네시아어) ",
    whatsappMessage:
      "안녕하세요, Codeverta. ERP 평가 시나리오를 논의하고 싶습니다. 검토할 업무 흐름: [업무 내용을 적어 주세요]. 현재 검토하거나 시연할 수 있는 내용을 확인해 주세요.",
    scenarios: [
      {
        title: "주문부터 결제까지",
        description:
          "재고가 여러 창고에 나뉜 주문 사례를 준비해 부분 배송, 송장, 결제 및 연결할 데이터를 논의합니다.",
      },
      {
        title: "구매와 입고",
        description:
          "구매 요청, 승인, 수량 부족 또는 파손 입고, 보관해야 할 변경 기록을 정리합니다.",
      },
      {
        title: "재고 실사와 조정",
        description:
          "실물 수량 확인, 차이 사유 기록, 조정 승인, 이력 검토 방법을 설명합니다.",
      },
      {
        title: "보고와 기간 마감",
        description:
          "중요한 보고서 수치를 선택한 뒤 원본 거래, 조정, 필요한 승인을 정리합니다.",
      },
    ],
  },
  ms: {
    status: "Dalam pembangunan",
    hero: "Bawa aliran kerja yang ingin disambungkan—seperti pesanan, pembelian, inventori dan pelaporan—supaya skop serta perkara yang boleh disemak hari ini dapat dibincangkan.",
    primaryCta: "Bincang senario ERP",
    secondaryCta: "Kongsi keperluan",
    contactTitle: "Bincangkan keperluan ERP anda",
    contactDescription:
      "Nyatakan jenis perniagaan, bilangan lokasi dan satu aliran kerja untuk dinilai. Jangan sertakan data operasi sulit.",
    referenceTitle: "Rujukan antara muka ERPNext",
    referenceDescription:
      "Rujukan antara muka berasaskan ERPNext; ini bukan bukti bahawa modul ERP Codeverta sudah tersedia.",
    scopeTitle: "Aliran kerja untuk dibincangkan",
    scopeDescription:
      "Pilih satu aliran kerja sebagai titik mula. Senario ini membantu memetakan dokumen, keputusan, pengecualian dan hasil yang perlu disemak.",
    guideSelection: "Panduan memilih perisian ERP",
    guideCustom: "Panduan pembangunan ERP tersuai",
    guideDistributor: "Panduan perisian pengedar",
    indonesianSuffix: " (Bahasa Indonesia)",
    whatsappMessage:
      "Hai Codeverta, saya ingin membincangkan senario penilaian ERP. Aliran kerja yang ingin disemak: [terangkan proses anda]. Sila sahkan perkara yang boleh disemak atau didemokan sekarang.",
    scenarios: [
      {
        title: "Pesanan hingga pembayaran",
        description:
          "Bawa contoh pesanan dengan stok di beberapa gudang. Bincangkan penghantaran separa, invois, pembayaran dan data yang perlu disambungkan.",
      },
      {
        title: "Pembelian dan penerimaan",
        description:
          "Petakan permintaan pembelian, kelulusan, penghantaran kurang atau rosak, serta bukti perubahan yang perlu disimpan.",
      },
      {
        title: "Kiraan stok dan pelarasan",
        description:
          "Terangkan cara mengira stok fizikal, merekod sebab perbezaan, meluluskan pelarasan dan menyemak sejarah.",
      },
      {
        title: "Laporan dan tutup tempoh",
        description:
          "Pilih angka laporan yang penting, kemudian petakan transaksi sumber, pelarasan dan kelulusan yang diperlukan.",
      },
    ],
  },
  de: {
    status: "In Entwicklung",
    hero: "Bringen Sie einen zu verbindenden Ablauf mit—etwa Auftrag, Einkauf, Bestand und Reporting—damit Umfang und aktuell prüfbare Inhalte besprochen werden können.",
    primaryCta: "ERP-Szenario besprechen",
    secondaryCta: "Anforderungen mitteilen",
    contactTitle: "ERP-Anforderungen besprechen",
    contactDescription:
      "Nennen Sie Branche, Anzahl der Standorte und einen zu bewertenden Ablauf. Bitte keine vertraulichen Betriebsdaten eintragen.",
    referenceTitle: "ERPNext-Oberflächenreferenz",
    referenceDescription:
      "Eine auf ERPNext basierende Oberflächenreferenz; sie belegt nicht die Einsatzbereitschaft von Codeverta-ERP-Modulen.",
    scopeTitle: "Abläufe für das Gespräch",
    scopeDescription:
      "Wählen Sie einen Ablauf als Ausgangspunkt. Die Beispiele helfen, zu prüfende Belege, Entscheidungen, Ausnahmen und Ergebnisse zu erfassen.",
    guideSelection: "Leitfaden zur ERP-Auswahl",
    guideCustom: "Leitfaden zur individuellen ERP-Entwicklung",
    guideDistributor: "Leitfaden für Distributionssoftware",
    indonesianSuffix: " (auf Indonesisch)",
    whatsappMessage:
      "Hallo Codeverta, ich möchte ein Szenario zur ERP-Evaluierung besprechen. Zu prüfender Ablauf: [Prozess beschreiben]. Bitte bestätigen Sie, was derzeit geprüft oder demonstriert werden kann.",
    scenarios: [
      {
        title: "Vom Auftrag bis zur Zahlung",
        description:
          "Bringen Sie einen Auftrag mit Bestand in mehreren Lagern mit. Besprechen Sie Teillieferung, Rechnung, Zahlung und zu verbindende Daten.",
      },
      {
        title: "Einkauf und Wareneingang",
        description:
          "Erfassen Sie Bedarf, Freigabe, unvollständige oder beschädigte Lieferung und notwendige Änderungsnachweise.",
      },
      {
        title: "Inventur und Korrekturen",
        description:
          "Beschreiben Sie Zählung, Erfassung von Abweichungsgründen, Freigabe von Korrekturen und Einsicht in den Verlauf.",
      },
      {
        title: "Berichte und Periodenabschluss",
        description:
          "Wählen Sie eine wichtige Kennzahl und ordnen Sie Quelltransaktionen, Korrekturen und erforderliche Freigaben zu.",
      },
    ],
  },
  fr: {
    status: "En développement",
    hero: "Apportez un flux à relier—commandes, achats, stocks ou rapports—afin de discuter du périmètre et des éléments vérifiables aujourd’hui.",
    primaryCta: "Discuter d’un scénario ERP",
    secondaryCta: "Partager vos besoins",
    contactTitle: "Discuter de vos besoins ERP",
    contactDescription:
      "Indiquez votre activité, le nombre de sites et un flux à évaluer. N’incluez pas de données opérationnelles confidentielles.",
    referenceTitle: "Référence d’interface ERPNext",
    referenceDescription:
      "Référence d’interface basée sur ERPNext ; elle ne prouve pas que les modules Codeverta ERP sont prêts.",
    scopeTitle: "Flux de travail à discuter",
    scopeDescription:
      "Choisissez un flux comme point de départ. Ces scénarios aident à recenser les documents, décisions, exceptions et résultats à examiner.",
    guideSelection: "Guide de sélection d’un ERP",
    guideCustom: "Guide du développement d’un ERP sur mesure",
    guideDistributor: "Guide des logiciels de distribution",
    indonesianSuffix: " (en indonésien)",
    whatsappMessage:
      "Bonjour Codeverta, je souhaite discuter d’un scénario d’évaluation ERP. Flux à examiner : [décrivez votre processus]. Merci de confirmer ce qui peut être examiné ou démontré actuellement.",
    scenarios: [
      {
        title: "De la commande au paiement",
        description:
          "Apportez un exemple de commande avec du stock réparti entre plusieurs entrepôts. Discutez des livraisons partielles, factures, paiements et données à relier.",
      },
      {
        title: "Achats et réception",
        description:
          "Cartographiez la demande d’achat, l’approbation, les livraisons incomplètes ou endommagées et les preuves à conserver.",
      },
      {
        title: "Inventaire et ajustements",
        description:
          "Décrivez le comptage physique, le motif d’écart, l’approbation d’un ajustement et la consultation de son historique.",
      },
      {
        title: "Rapports et clôture de période",
        description:
          "Choisissez un chiffre important, puis identifiez les transactions sources, ajustements et validations nécessaires.",
      },
    ],
  },
  es: {
    status: "En desarrollo",
    hero: "Traiga un flujo que quiera conectar—pedidos, compras, inventario o informes—para conversar sobre el alcance y lo que se puede revisar hoy.",
    primaryCta: "Conversar sobre un escenario ERP",
    secondaryCta: "Compartir requisitos",
    contactTitle: "Conversar sobre sus requisitos ERP",
    contactDescription:
      "Indique el tipo de negocio, número de ubicaciones y un flujo para evaluar. No incluya datos operativos confidenciales.",
    referenceTitle: "Referencia de interfaz de ERPNext",
    referenceDescription:
      "Referencia de interfaz basada en ERPNext; no demuestra que los módulos de Codeverta ERP estén listos.",
    scopeTitle: "Flujos de trabajo para conversar",
    scopeDescription:
      "Elija un flujo como punto de partida. Estos escenarios ayudan a identificar documentos, decisiones, excepciones y resultados que revisar.",
    guideSelection: "Guía para elegir software ERP",
    guideCustom: "Guía de desarrollo de ERP personalizado",
    guideDistributor: "Guía de software para distribuidores",
    indonesianSuffix: " (en indonesio)",
    whatsappMessage:
      "Hola Codeverta, quisiera conversar sobre un escenario para evaluar ERP. Flujo que quiero revisar: [describa su proceso]. Confirmen, por favor, qué se puede revisar o demostrar actualmente.",
    scenarios: [
      {
        title: "Del pedido al pago",
        description:
          "Traiga un pedido con existencias repartidas entre varios almacenes. Converse sobre entregas parciales, facturas, pagos y datos por conectar.",
      },
      {
        title: "Compras y recepción",
        description:
          "Trace la solicitud de compra, aprobación, entregas incompletas o dañadas y los comprobantes que se deben conservar.",
      },
      {
        title: "Conteo de inventario y ajustes",
        description:
          "Describa cómo contar físicamente, registrar la causa de una diferencia, aprobar el ajuste y consultar el historial.",
      },
      {
        title: "Informes y cierre de período",
        description:
          "Elija una cifra importante y trace las transacciones de origen, los ajustes y las aprobaciones necesarias.",
      },
    ],
  },
  ar: {
    status: "قيد التطوير",
    hero: "أحضر سير عمل تريد ربطه—مثل الطلبات أو المشتريات أو المخزون أو التقارير—لمناقشة النطاق وما يمكن مراجعته اليوم.",
    primaryCta: "ناقش سيناريو ERP",
    secondaryCta: "أرسل متطلباتك",
    contactTitle: "ناقش متطلبات ERP لديك",
    contactDescription:
      "اذكر نوع النشاط وعدد المواقع وسير عمل واحدًا تريد تقييمه. لا تُدرج بيانات تشغيلية سرية.",
    referenceTitle: "مرجع لواجهة ERPNext",
    referenceDescription:
      "مرجع لواجهة مبني على ERPNext؛ ولا يُعد دليلًا على جاهزية وحدات Codeverta ERP.",
    scopeTitle: "مسارات عمل للنقاش",
    scopeDescription:
      "اختر مسارًا واحدًا كنقطة بداية. تساعد هذه السيناريوهات في تحديد المستندات والقرارات والاستثناءات والنتائج المطلوب مراجعتها.",
    guideSelection: "دليل اختيار برنامج ERP",
    guideCustom: "دليل تطوير ERP مخصص",
    guideDistributor: "دليل برامج الموزعين",
    indonesianSuffix: " (باللغة الإندونيسية)",
    whatsappMessage:
      "مرحبًا Codeverta، أود مناقشة سيناريو لتقييم ERP. سير العمل الذي أريد مراجعته: [اشرح العملية]. يرجى تأكيد ما يمكن مراجعته أو عرضه حاليًا.",
    scenarios: [
      {
        title: "من الطلب إلى السداد",
        description:
          "أحضر مثالًا لطلب يتوزع مخزونه بين عدة مستودعات. ناقش التسليم الجزئي والفواتير والسداد والبيانات المطلوب ربطها.",
      },
      {
        title: "الشراء والاستلام",
        description:
          "حدّد طلب الشراء والموافقة والشحنات الناقصة أو التالفة وسجلات التغيير المطلوب الاحتفاظ بها.",
      },
      {
        title: "جرد المخزون والتسويات",
        description:
          "اشرح طريقة العد الفعلي وتسجيل سبب الفرق واعتماد التسوية ومراجعة سجلها.",
      },
      {
        title: "التقارير وإقفال الفترة",
        description:
          "اختر رقمًا مهمًا في تقرير وتتبع المعاملات الأصلية والتسويات والموافقات المطلوبة.",
      },
    ],
  },
  hi: {
    status: "विकासाधीन",
    hero: "जिस कार्यप्रवाह को आप जोड़ना चाहते हैं—जैसे ऑर्डर, खरीद, इन्वेंट्री या रिपोर्टिंग—उसे चर्चा के लिए लाएँ, ताकि दायरा और आज क्या देखा जा सकता है यह तय हो सके।",
    primaryCta: "ERP परिदृश्य पर चर्चा करें",
    secondaryCta: "अपनी ज़रूरतें साझा करें",
    contactTitle: "अपनी ERP ज़रूरतों पर चर्चा करें",
    contactDescription:
      "व्यवसाय का प्रकार, स्थानों की संख्या और मूल्यांकन के लिए एक कार्यप्रवाह बताएँ। गोपनीय परिचालन डेटा न दें।",
    referenceTitle: "ERPNext इंटरफ़ेस संदर्भ",
    referenceDescription:
      "ERPNext पर आधारित इंटरफ़ेस संदर्भ; यह Codeverta ERP मॉड्यूल की तैयारी का प्रमाण नहीं है।",
    scopeTitle: "चर्चा के लिए कार्यप्रवाह",
    scopeDescription:
      "शुरुआत के लिए एक कार्यप्रवाह चुनें। ये उदाहरण जाँचने योग्य दस्तावेज़, निर्णय, अपवाद और परिणाम तय करने में मदद करते हैं।",
    guideSelection: "ERP सॉफ़्टवेयर चुनने की मार्गदर्शिका",
    guideCustom: "कस्टम ERP विकास मार्गदर्शिका",
    guideDistributor: "डिस्ट्रीब्यूटर सॉफ़्टवेयर मार्गदर्शिका",
    indonesianSuffix: " (इंडोनेशियाई में)",
    whatsappMessage:
      "नमस्ते Codeverta, मैं ERP मूल्यांकन के एक परिदृश्य पर चर्चा करना चाहता/चाहती हूँ। जाँचने वाला कार्यप्रवाह: [अपनी प्रक्रिया बताएँ]। कृपया पुष्टि करें कि अभी क्या देखा या प्रदर्शित किया जा सकता है।",
    scenarios: [
      {
        title: "ऑर्डर से भुगतान तक",
        description:
          "कई गोदामों में बँटे स्टॉक वाला ऑर्डर उदाहरण लाएँ। आंशिक डिलीवरी, इनवॉइस, भुगतान और जोड़ने वाले डेटा पर चर्चा करें।",
      },
      {
        title: "खरीद और प्राप्ति",
        description:
          "खरीद अनुरोध, स्वीकृति, कम या क्षतिग्रस्त माल की प्राप्ति और रखे जाने वाले बदलाव के प्रमाण तय करें।",
      },
      {
        title: "स्टॉक गणना और समायोजन",
        description:
          "भौतिक गणना, अंतर का कारण दर्ज करना, समायोजन की स्वीकृति और इतिहास की समीक्षा समझाएँ।",
      },
      {
        title: "रिपोर्ट और अवधि समापन",
        description:
          "एक महत्वपूर्ण रिपोर्ट संख्या चुनें और उसके स्रोत लेन-देन, समायोजन तथा आवश्यक स्वीकृतियाँ चिन्हित करें।",
      },
    ],
  },
  th: {
    status: "อยู่ระหว่างการพัฒนา",
    hero: "นำขั้นตอนงานที่ต้องการเชื่อมต่อ เช่น คำสั่งซื้อ จัดซื้อ สินค้าคงคลัง หรือรายงาน มาพูดคุยเพื่อกำหนดขอบเขตและสิ่งที่ตรวจดูได้ในขณะนี้",
    primaryCta: "พูดคุยสถานการณ์ ERP",
    secondaryCta: "ส่งรายละเอียดความต้องการ",
    contactTitle: "พูดคุยความต้องการ ERP ของคุณ",
    contactDescription:
      "ระบุประเภทธุรกิจ จำนวนสถานที่ และขั้นตอนงานหนึ่งรายการที่ต้องการประเมิน โปรดอย่าส่งข้อมูลการดำเนินงานที่เป็นความลับ",
    referenceTitle: "ตัวอย่างอ้างอิงหน้าจอ ERPNext",
    referenceDescription:
      "ภาพอ้างอิงหน้าจอที่อิงจาก ERPNext ไม่ใช่หลักฐานว่าโมดูล ERP ของ Codeverta พร้อมใช้งานแล้ว",
    scopeTitle: "ขั้นตอนงานสำหรับพูดคุย",
    scopeDescription:
      "เลือกหนึ่งขั้นตอนเป็นจุดเริ่มต้น สถานการณ์เหล่านี้ช่วยระบุเอกสาร การตัดสินใจ ข้อยกเว้น และผลลัพธ์ที่ควรตรวจสอบ",
    guideSelection: "คู่มือเลือกซอฟต์แวร์ ERP",
    guideCustom: "คู่มือพัฒนา ERP แบบกำหนดเอง",
    guideDistributor: "คู่มือซอฟต์แวร์สำหรับผู้จัดจำหน่าย",
    indonesianSuffix: " (ภาษาอินโดนีเซีย)",
    whatsappMessage:
      "สวัสดี Codeverta ฉันต้องการพูดคุยสถานการณ์สำหรับประเมิน ERP ขั้นตอนงานที่ต้องการตรวจสอบ: [อธิบายกระบวนการ] โปรดยืนยันสิ่งที่ตรวจดูหรือสาธิตได้ในขณะนี้",
    scenarios: [
      {
        title: "ตั้งแต่คำสั่งซื้อถึงการชำระเงิน",
        description:
          "นำตัวอย่างคำสั่งซื้อที่มีสินค้าอยู่หลายคลังมาพูดคุยเรื่องการส่งบางส่วน ใบแจ้งหนี้ การชำระเงิน และข้อมูลที่ต้องเชื่อมต่อ",
      },
      {
        title: "การจัดซื้อและรับสินค้า",
        description:
          "ทำแผนผังคำขอซื้อ การอนุมัติ การส่งสินค้าขาดหรือเสียหาย และหลักฐานการเปลี่ยนแปลงที่ควรเก็บ",
      },
      {
        title: "ตรวจนับและปรับปรุงสต็อก",
        description:
          "อธิบายวิธีนับสินค้าจริง บันทึกสาเหตุของส่วนต่าง อนุมัติการปรับปรุง และตรวจประวัติ",
      },
      {
        title: "รายงานและปิดงวด",
        description:
          "เลือกตัวเลขสำคัญในรายงาน แล้วติดตามรายการต้นทาง การปรับปรุง และการอนุมัติที่จำเป็น",
      },
    ],
  },
  vi: {
    status: "Đang phát triển",
    hero: "Hãy mang theo một quy trình muốn kết nối—như đơn hàng, mua hàng, tồn kho hoặc báo cáo—để cùng trao đổi về phạm vi và nội dung có thể xem hiện nay.",
    primaryCta: "Trao đổi kịch bản ERP",
    secondaryCta: "Gửi yêu cầu của bạn",
    contactTitle: "Trao đổi nhu cầu ERP của bạn",
    contactDescription:
      "Cho biết loại hình kinh doanh, số địa điểm và một quy trình cần đánh giá. Vui lòng không gửi dữ liệu vận hành mật.",
    referenceTitle: "Tham khảo giao diện ERPNext",
    referenceDescription:
      "Hình tham khảo giao diện dựa trên ERPNext; không phải bằng chứng rằng các mô-đun Codeverta ERP đã sẵn sàng.",
    scopeTitle: "Quy trình để trao đổi",
    scopeDescription:
      "Chọn một quy trình làm điểm bắt đầu. Các tình huống này giúp xác định chứng từ, quyết định, ngoại lệ và kết quả cần xem xét.",
    guideSelection: "Hướng dẫn chọn phần mềm ERP",
    guideCustom: "Hướng dẫn phát triển ERP tùy chỉnh",
    guideDistributor: "Hướng dẫn phần mềm phân phối",
    indonesianSuffix: " (bằng tiếng Indonesia)",
    whatsappMessage:
      "Xin chào Codeverta, tôi muốn trao đổi về một tình huống đánh giá ERP. Quy trình cần xem xét: [mô tả quy trình của bạn]. Vui lòng xác nhận nội dung hiện có thể xem hoặc trình diễn.",
    scenarios: [
      {
        title: "Từ đơn hàng đến thanh toán",
        description:
          "Mang ví dụ đơn hàng có tồn kho ở nhiều kho. Trao đổi về giao hàng từng phần, hóa đơn, thanh toán và dữ liệu cần kết nối.",
      },
      {
        title: "Mua hàng và nhận hàng",
        description:
          "Lập sơ đồ yêu cầu mua, phê duyệt, lô hàng thiếu hoặc hư hỏng và bằng chứng thay đổi cần lưu.",
      },
      {
        title: "Kiểm kê và điều chỉnh",
        description:
          "Mô tả cách kiểm đếm thực tế, ghi lý do chênh lệch, phê duyệt điều chỉnh và xem lại lịch sử.",
      },
      {
        title: "Báo cáo và khóa kỳ",
        description:
          "Chọn một số liệu báo cáo quan trọng rồi truy lại giao dịch nguồn, điều chỉnh và phê duyệt cần thiết.",
      },
    ],
  },
  ru: {
    status: "В разработке",
    hero: "Возьмите на обсуждение процесс, который хотите связать с другими,—например, заказ, закупку, запасы или отчетность,—чтобы определить объем и то, что можно проверить сейчас.",
    primaryCta: "Обсудить сценарий ERP",
    secondaryCta: "Отправить требования",
    contactTitle: "Обсудить ваши требования к ERP",
    contactDescription:
      "Укажите тип бизнеса, число площадок и один процесс для оценки. Не указывайте конфиденциальные операционные данные.",
    referenceTitle: "Пример интерфейса ERPNext",
    referenceDescription:
      "Справочный интерфейс на базе ERPNext; он не подтверждает готовность модулей Codeverta ERP.",
    scopeTitle: "Процессы для обсуждения",
    scopeDescription:
      "Выберите один процесс для начала. Эти сценарии помогут определить документы, решения, исключения и результаты для проверки.",
    guideSelection: "Руководство по выбору ERP-системы",
    guideCustom: "Руководство по разработке индивидуальной ERP",
    guideDistributor: "Руководство по ПО для дистрибьюторов",
    indonesianSuffix: " (на индонезийском языке)",
    whatsappMessage:
      "Здравствуйте, Codeverta. Хочу обсудить сценарий оценки ERP. Процесс для проверки: [опишите процесс]. Подтвердите, пожалуйста, что сейчас можно посмотреть или продемонстрировать.",
    scenarios: [
      {
        title: "От заказа до оплаты",
        description:
          "Приведите заказ с запасами на нескольких складах. Обсудите частичную отгрузку, счета, оплату и данные для связи.",
      },
      {
        title: "Закупка и приемка",
        description:
          "Опишите заявку на закупку, согласование, неполную или поврежденную поставку и записи об изменениях.",
      },
      {
        title: "Инвентаризация и корректировки",
        description:
          "Расскажите о пересчете, фиксации причины расхождения, согласовании корректировки и просмотре истории.",
      },
      {
        title: "Отчетность и закрытие периода",
        description:
          "Выберите важный показатель и проследите исходные операции, корректировки и необходимые согласования.",
      },
    ],
  },
  nl: {
    status: "In ontwikkeling",
    hero: "Neem een proces mee dat u wilt verbinden—zoals orders, inkoop, voorraad of rapportage—om de scope en wat nu te beoordelen is te bespreken.",
    primaryCta: "ERP-scenario bespreken",
    secondaryCta: "Uw vereisten delen",
    contactTitle: "Uw ERP-vereisten bespreken",
    contactDescription:
      "Vermeld uw bedrijfstype, aantal locaties en één proces om te beoordelen. Deel geen vertrouwelijke operationele gegevens.",
    referenceTitle: "ERPNext-interface als referentie",
    referenceDescription:
      "Een interfacevoorbeeld op basis van ERPNext; dit bewijst niet dat Codeverta ERP-modules gereed zijn.",
    scopeTitle: "Werkprocessen om te bespreken",
    scopeDescription:
      "Kies één proces als startpunt. Deze scenario’s helpen de documenten, beslissingen, uitzonderingen en resultaten in kaart te brengen.",
    guideSelection: "Gids voor ERP-softwareselectie",
    guideCustom: "Gids voor maatwerk-ERP-ontwikkeling",
    guideDistributor: "Gids voor distributeurssoftware",
    indonesianSuffix: " (in het Indonesisch)",
    whatsappMessage:
      "Hallo Codeverta, ik wil graag een ERP-evaluatiescenario bespreken. Te beoordelen proces: [beschrijf uw proces]. Bevestig alstublieft wat momenteel kan worden bekeken of gedemonstreerd.",
    scenarios: [
      {
        title: "Van order tot betaling",
        description:
          "Neem een order mee waarvan de voorraad over meerdere magazijnen is verdeeld. Bespreek deellevering, factuur, betaling en te verbinden gegevens.",
      },
      {
        title: "Inkoop en ontvangst",
        description:
          "Breng de inkoopaanvraag, goedkeuring, onvolledige of beschadigde levering en vast te leggen wijzigingen in kaart.",
      },
      {
        title: "Voorraadtelling en correcties",
        description:
          "Beschrijf de fysieke telling, registratie van afwijkingen, goedkeuring van correcties en inzage in de historie.",
      },
      {
        title: "Rapportage en periodeafsluiting",
        description:
          "Kies een belangrijk rapportcijfer en breng de brondocumenten, correcties en vereiste goedkeuringen in kaart.",
      },
    ],
  },
};

export function getErpPageCopy(locale = "id"): ErpPageCopy {
  return copy[locale as SupportedLocale] || copy.en;
}
