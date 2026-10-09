// Core Types
export type Category = "livestock" | "vet" | "feeds" | "products";
export type ItemStatus = "available" | "sold" | "reserved";
export type UserRole = "admin" | "seller" | "buyer";

export interface Item {
  id: string;
  seller_id?: string;
  title: string;
  description: string;
  price: number;
  price_unit?: string;
  category: Category;
  sub_category?: string;
  location: string;
  county: string;
  images: string[];
  status: ItemStatus;
  featured?: boolean;
  seller_name?: string;
  seller_phone?: string;
  latitude?: number;
  longitude?: number;
  views?: number;
  created_at: string;
  updated_at?: string;
  // Livestock-specific
  breed?: string;
  age_months?: number;
  weight_kg?: number;
  gender?: "male" | "female" | "mixed";
  // Vet-specific
  vet_specialization?: string;
  vet_qualifications?: string;
  // Feeds-specific
  feed_weight_kg?: number;
  feed_composition?: string;
  // Products-specific
  product_quantity?: number;
  product_unit?: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  phone: string | null;
  county: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  item_id: string;
  buyer_id: string;
  seller_id: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total_price: number;
  quantity: number;
  delivery_address: string;
  buyer_name?: string;
  buyer_phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  item_id: string;
  item_title: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface FarmerRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  category: Category;
  description: string;
  location: string;
  county: string;
  budget?: string;
  status: "pending" | "responded" | "closed";
  created_at: string;
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  price: number;
  category: Category;
}

export const CATEGORIES = [
  {
    key: "livestock",
    label: "Livestock",
    emoji: "🐄",
    description: "Cattle, goats, sheep, poultry & more",
    color: "#16a34a",
    bgClass: "from-green-50 to-green-100 border-green-200 hover:border-green-400",
    badgeClass: "badge-livestock",
  },
  {
    key: "vet",
    label: "Vet Services",
    emoji: "🩺",
    description: "Licensed vets & animal health services",
    color: "#2563eb",
    bgClass: "from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400",
    badgeClass: "badge-vet",
  },
  {
    key: "feeds",
    label: "Animal Feeds",
    emoji: "🌽",
    description: "Quality feeds, supplements & minerals",
    color: "#d97706",
    bgClass: "from-amber-50 to-amber-100 border-amber-200 hover:border-amber-400",
    badgeClass: "badge-feeds",
  },
  {
    key: "products",
    label: "Farm Products",
    emoji: "🥛",
    description: "Milk, eggs, honey & farm produce",
    color: "#7c3aed",
    bgClass: "from-purple-50 to-purple-100 border-purple-200 hover:border-purple-400",
    badgeClass: "badge-products",
  },
] as const;

export const KENYA_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui",
  "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
  "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri",
  "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
  "Trans-Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
];

export const getCategoryConfig = (key: Category) =>
  CATEGORIES.find((c) => c.key === key)!;
