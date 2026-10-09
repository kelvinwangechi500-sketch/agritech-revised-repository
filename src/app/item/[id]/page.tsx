"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Clock, Eye, ChevronLeft, ChevronRight,
  Phone, Tag, Info, ArrowLeft, ShoppingCart, CheckCircle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/marketplace/WhatsAppButton";
import InquiryForm from "@/components/marketplace/InquiryForm";
import { MOCK_ITEMS } from "@/lib/mock-data";
import { formatPrice, timeAgo, categoryLabel, categoryBadgeClass, categoryHref } from "@/lib/utils";
import type { Item } from "@/types";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item,     setItem]     = useState<Item | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        if (USE_MOCK) {
          setItem(MOCK_ITEMS.find((i) => i.id === id) ?? null);
        } else {
          const { getItemById } = await import("@/lib/api");
          setItem(await getItemById(id));
        }
      } finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return (
    <>
      <Navbar />
      <div className="page-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  if (!item) return (
    <>
      <Navbar />
      <div className="page-container py-20 text-center">
        <p className="text-5xl mb-4">🌾</p>
        <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">Listing Not Found</h1>
        <Link href="/" className="btn-primary">Back to Store</Link>
      </div>
      <Footer />
    </>
  );

  const images = item.images?.length ? item.images : [];
  const currentImg = images[imgIndex];
  const badgeClass = categoryBadgeClass(item.category);

  const details: { label: string; value: string }[] = [];
  if (item.breed)              details.push({ label: "Breed",           value: item.breed });
  if (item.age_months != null) details.push({ label: "Age",             value: `${item.age_months} months` });
  if (item.weight_kg != null)  details.push({ label: "Weight",          value: `${item.weight_kg} kg` });
  if (item.gender)             details.push({ label: "Gender",          value: item.gender.charAt(0).toUpperCase() + item.gender.slice(1) });
  if (item.vet_specialization) details.push({ label: "Specialization",  value: item.vet_specialization });
  if (item.vet_qualifications) details.push({ label: "Qualifications",  value: item.vet_qualifications });
  if (item.feed_weight_kg)     details.push({ label: "Weight",          value: `${item.feed_weight_kg} kg` });
  if (item.feed_composition)   details.push({ label: "Composition",     value: item.feed_composition });

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="page-container py-4">
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <Link href={categoryHref(item.category)} className="hover:text-brand-600">{categoryLabel(item.category)}</Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-[150px]">{item.title}</span>
          </nav>
        </div>
      </div>
      <main className="page-container py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 cursor-zoom-in" onClick={() => setLightbox(true)}>
              {currentImg ? <Image src={currentImg} alt={item.title} fill className="object-cover" priority sizes="60vw" /> : <div className="absolute inset-0 flex items-center justify-center text-9xl">🚜</div>}
              {item.status !== "available" && <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 font-black uppercase tracking-[0.3em]">{item.status}</div>}
            </div>
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
               <h2 className="text-xl font-display font-black text-gray-900 mb-6">Product Overview</h2>
               <p className="text-gray-600 leading-relaxed text-lg mb-8">{item.description}</p>
               {details.length > 0 && (
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {details.map(({ label, value }) => (
                      <div key={label} className="border-l-4 border-brand-100 pl-4">
                        <dt className="text-[10px] font-black text-gray-400 uppercase mb-1">{label}</dt>
                        <dd className="font-bold text-gray-900">{value}</dd>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <span className={`${badgeClass} text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl`}>{item.category}</span>
              </div>
              <h1 className="text-3xl font-display font-black text-gray-900 mb-4">{item.title}</h1>
              <div className="mb-10">
                <p className="text-xs font-black text-gray-400 uppercase mb-2">Buy Direct Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-display font-black text-brand-700">{formatPrice(item.price)}</span>
                </div>
              </div>
              {item.status === "available" ? (
                <div className="space-y-4">
                  <Link href={`/checkout?item_id=${item.id}`} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 text-lg transition-all shadow-xl">
                    <ShoppingCart size={22} /> Buy Now
                  </Link>
                  <WhatsAppButton item={item} label="Inquire on WhatsApp" size="lg" className="w-full" />
                </div>
              ) : (
                <div className="bg-red-50 text-red-600 font-black py-5 rounded-2xl text-center uppercase tracking-widest text-sm">Item {item.status}</div>
              )}
            </div>
            <InquiryForm item={item} />
          </div>
        </div>
      </main>
      {lightbox && currentImg && <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-8" onClick={() => setLightbox(false)}><Image src={currentImg} alt="" fill className="object-contain" /></div>}
      <Footer />
    </>
  );
}
