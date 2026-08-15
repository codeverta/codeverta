export type MapLocation = {
  region: string;
  city: string;
  customers?: number;
};

export type CustomerMapConfig = {
  asset: string;
  country: string;
  locations: Record<string, MapLocation>;
};

const indonesia: CustomerMapConfig = {
  asset: "/assets/id.svg",
  country: "Indonesia",
  locations: {
    IDJK: { region: "Jakarta", city: "Jakarta", customers: 1 },
    IDJB: { region: "Jawa Barat", city: "Bandung", customers: 2 },
    IDYO: { region: "Yogyakarta", city: "Yogyakarta", customers: 5 },
    IDJI: { region: "Jawa Timur", city: "Surabaya & Malang", customers: 1 },
    IDBA: { region: "Bali", city: "Denpasar", customers: 2 },
    IDPA: { region: "Papua", city: "Jayapura", customers: 1 },
  },
};

const maps: Record<string, CustomerMapConfig> = {
  id: indonesia,
  en: {
    asset: "/assets/usa.svg",
    country: "United States & Global",
    locations: {
      "US-NY": { region: "New York", city: "New York City" },
      "US-CA": { region: "California", city: "San Francisco & Los Angeles" },
      "US-TX": { region: "Texas", city: "Austin" },
      "US-WA": { region: "Washington", city: "Seattle" },
      "US-IL": { region: "Illinois", city: "Chicago" },
      "GB-LDN": { region: "London", city: "London" },
    },
  },
  ja: {
    asset: "/assets/japan.svg",
    country: "日本",
    locations: {
      "JP-13": { region: "東京都", city: "東京" },
      "JP-27": { region: "大阪府", city: "大阪" },
      "JP-14": { region: "神奈川県", city: "横浜" },
      "JP-23": { region: "愛知県", city: "名古屋" },
      "JP-40": { region: "福岡県", city: "福岡" },
      "JP-01": { region: "北海道", city: "札幌" },
    },
  },
  de: {
    asset: "/assets/germany.svg",
    country: "Deutschland",
    locations: {
      "DE-BE": { region: "Berlin", city: "Berlin" },
      "DE-HH": { region: "Hamburg", city: "Hamburg" },
      "DE-BY": { region: "Bayern", city: "München" },
      "DE-HE": { region: "Hessen", city: "Frankfurt am Main" },
      "DE-NW": { region: "Nordrhein-Westfalen", city: "Köln & Düsseldorf" },
      "DE-BW": { region: "Baden-Württemberg", city: "Stuttgart" },
    },
  },
  fr: {
    asset: "/assets/france.svg",
    country: "France",
    locations: {
      "FR-J": { region: "Île-de-France", city: "Paris" },
      "FR-V": { region: "Rhône-Alpes", city: "Lyon" },
      "FR-U": { region: "Provence-Alpes-Côte d’Azur", city: "Marseille" },
      "FR-N": { region: "Midi-Pyrénées", city: "Toulouse" },
      "FR-B": { region: "Aquitaine", city: "Bordeaux" },
      "FR-O": { region: "Nord-Pas-de-Calais", city: "Lille" },
    },
  },
  nl: {
    asset: "/assets/netherlands.svg",
    country: "Nederland",
    locations: {
      "NL-NH": { region: "Noord-Holland", city: "Amsterdam" },
      "NL-ZH": { region: "Zuid-Holland", city: "Rotterdam & Den Haag" },
      "NL-UT": { region: "Utrecht", city: "Utrecht" },
      "NL-NB": { region: "Noord-Brabant", city: "Eindhoven" },
      "NL-GR": { region: "Groningen", city: "Groningen" },
    },
  },
};

export function getCustomerMap(locale?: string): CustomerMapConfig {
  return maps[locale || ""] || indonesia;
}
