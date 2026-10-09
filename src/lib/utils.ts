import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Item, Category } from "@/types";

// ─── Tailwind class merge ───────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Currency formatting ────────────────────────────────────────────────────
export function formatPrice(price: number, unit?: string): string {
  const formatted = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-KE").format(n);
}

// ─── WhatsApp ───────────────────────────────────────────────────────────────
export function buildWhatsAppUrl(item: Item, siteUrl?: string): string {
  const phone = item.seller_phone
    ? normalisePhone(item.seller_phone)
    : process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254768464997";

  const url = siteUrl ? `\nView listing: ${siteUrl}/item/${item.id}` : "";
  const msg = encodeURIComponent(
    `Hello, I'm interested in *${item.title}* listed at *${formatPrice(item.price)}* in *${item.location}*. Is it still available?${url}`
  );
  return `https://wa.me/${phone}?text=${msg}`;
}

export function buildWhatsAppGeneral(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254768464997";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function normalisePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return "254" + digits.slice(1);
  if (digits.startsWith("7") || digits.startsWith("1")) return "254" + digits;
  return digits;
}

// ─── Date helpers ───────────────────────────────────────────────────────────
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Category helpers ───────────────────────────────────────────────────────
export function categoryHref(category: Category): string {
  const map: Record<Category, string> = {
    livestock: "/livestock",
    vet: "/vet-services",
    feeds: "/feeds",
    products: "/products",
  };
  return map[category];
}

export function categoryLabel(category: Category): string {
  const map: Record<Category, string> = {
    livestock: "Livestock",
    vet: "Vet Services",
    feeds: "Animal Feeds",
    products: "Farm Products",
  };
  return map[category];
}

export function categoryBadgeClass(category: Category): string {
  const map: Record<Category, string> = {
    livestock: "badge-livestock",
    vet: "badge-vet",
    feeds: "badge-feeds",
    products: "badge-products",
  };
  return map[category];
}

// ─── Slug helpers ───────────────────────────────────────────────────────────
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ─── SEO title builder ──────────────────────────────────────────────────────
export function buildPageTitle(parts: string[]): string {
  return [...parts, "AgriTech Solutions Kenya"].join(" | ");
}
