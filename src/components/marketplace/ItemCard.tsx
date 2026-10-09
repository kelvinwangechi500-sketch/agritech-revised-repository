"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Eye, Clock, MessageCircle, Star } from "lucide-react";
import type { Item } from "@/types";
import { formatPrice, timeAgo, categoryBadgeClass, buildWhatsAppUrl } from "@/lib/utils";

interface Props {
  item: Item;
}

const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

export default function ItemCard({ item }: Props) {
  const whatsappUrl = buildWhatsAppUrl(item, process.env.NEXT_PUBLIC_SITE_URL);
  const badgeClass  = categoryBadgeClass(item.category);
  const img         = item.images?.[0];

  return (
    <div className="card group flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 border-none bg-white">
      {/* Image */}
      <Link href={`/item/${item.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
        {img ? (
          <Image
            src={img}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl bg-brand-50">
            {item.category === "livestock" ? "🐄" : item.category === "vet" ? "🩺" : item.category === "feeds" ? "🌽" : "🥛"}
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status overlay */}
        {item.status !== "available" && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-gray-900 text-white font-black px-6 py-2 rounded-xl text-xs uppercase tracking-[0.2em] shadow-xl">
              {STATUS_LABEL[item.status]}
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          {item.featured && item.status === "available" && (
            <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1 uppercase tracking-wider">
              <Star size={10} fill="currentColor" /> Premium
            </span>
          )}
          <span className={`${badgeClass} shadow-lg backdrop-blur-md bg-white/90 border-none font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-lg`}>
            {item.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <Link href={`/item/${item.id}`}>
          <h3 className="font-display font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 hover:text-brand-600 transition-colors">
            {item.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          <MapPin size={12} className="text-brand-500" />
          <span className="truncate">{item.location}</span>
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4 border-t border-gray-50">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Direct Price</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-brand-700 text-2xl leading-none">
                {formatPrice(item.price)}
              </span>
              {item.price_unit && (
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">/{item.price_unit.replace("per ", "")}</span>
              )}
            </div>
          </div>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-brand-600 transition-all shadow-xl group/btn"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle size={20} className="group-hover/btn:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

