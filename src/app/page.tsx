"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, Phone, ShoppingBag, Zap, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ItemGrid from "@/components/marketplace/ItemGrid";
import { CATEGORIES } from "@/types";
import type { Item } from "@/types";

export default function HomePage() {
  const [featured, setFeatured] = useState<Item[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { getFeaturedItems } = await import("@/lib/api");
        setFeatured(await getFeaturedItems(8));
      } catch (e) {
        console.error("Failed to load featured items", e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      {/* --- HERO SECTION (Jumia/Amazon Style) --- */}
      <section className="bg-brand-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="page-container py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold mb-6 border border-white/20">
                <Zap size={14} className="text-amber-400 fill-amber-400" />
                <span className="uppercase tracking-widest text-amber-100">Official Agriculture Store</span>
              </div>
              
              <h1 className="font-display text-4xl lg:text-6xl font-black leading-tight mb-6">
                Premium Farming <br />
                <span className="text-amber-400">Essentials</span> Delivered.
              </h1>
              
              <p className="text-lg text-brand-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Shop high-yield livestock, expert vet services, and certified animal feeds directly from verified Kenyan sellers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/search" className="bg-amber-500 hover:bg-amber-600 text-brand-950 font-black py-4 px-10 rounded-2xl text-lg shadow-xl shadow-amber-900/20 transition-all flex items-center justify-center gap-2 group">
                  Start Shopping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/request" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all flex items-center justify-center gap-2">
                  <ShoppingBag size={20} /> Custom Requests
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="bg-gradient-to-br from-amber-400 to-brand-500 w-full aspect-square rounded-[3rem] rotate-3 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-9xl">🚜</div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-xl text-green-600"><Shield size={20} /></div>
                  <div className="text-gray-900"><p className="text-[10px] font-bold text-gray-500 uppercase">Verified</p><p className="font-bold text-xs">Quality Assured</p></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-xl text-amber-600"><Truck size={20} /></div>
                  <div className="text-gray-900"><p className="text-[10px] font-bold text-gray-500 uppercase">Delivery</p><p className="font-bold text-xs">All 47 Counties</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CIRCULAR CATEGORIES (Amazon Style) --- */}
      <section className="bg-white border-b border-gray-100">
        <div className="page-container py-10">
          <div className="flex overflow-x-auto pb-4 gap-6 sm:gap-12 justify-between no-scrollbar">
            {CATEGORIES.map((cat) => (
              <Link key={cat.key} href={`/${cat.key}`} className="flex flex-col items-center gap-3 shrink-0 group">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${cat.bgClass} flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1 border border-transparent group-hover:border-brand-200`}>
                  {cat.emoji}
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED DEALS --- */}
      <section className="page-container py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="w-8 h-1 bg-amber-500 rounded-full" />
               <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Trending Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-gray-900">Recommended For You</h2>
          </div>
          <Link href="/search" className="text-brand-600 font-bold text-sm hover:underline flex items-center gap-1 group">
            See All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <ItemGrid items={featured} loading={loading} />
      </section>

      {/* --- TRUST BANNER --- */}
      <section className="bg-brand-900 text-white py-16 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="page-container relative z-10 grid md:grid-cols-3 gap-12 text-center">
           <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20"><Truck className="text-amber-400" size={32} /></div>
              <h3 className="font-bold text-lg uppercase tracking-tight">Fast Delivery</h3>
              <p className="text-brand-200 text-sm">Swift transportation across all 47 counties of Kenya.</p>
           </div>
           <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20"><Shield className="text-amber-400" size={32} /></div>
              <h3 className="font-bold text-lg uppercase tracking-tight">Secure Payments</h3>
              <p className="text-brand-200 text-sm">We ensure your transactions and data are always protected.</p>
           </div>
           <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20"><Award className="text-amber-400" size={32} /></div>
              <h3 className="font-bold text-lg uppercase tracking-tight">Expert Support</h3>
              <p className="text-brand-200 text-sm">Our team of vets and specialists are here to help you grow.</p>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
