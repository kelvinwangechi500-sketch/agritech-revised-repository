import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, Users, Package, Star, Truck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us | AgriTech Solutions Kenya",
  description:
    "Learn about AgriTech Solutions — Kenya's premium agricultural store providing direct access to quality livestock, vet services, feeds and farm products.",
};

const TEAM = [
  {
    name: "Kelvin Wangechi",
    role: "Founder & CEO",
    bio: "Passionate about transforming Kenyan agriculture through technology. 8+ years in agribusiness.",
    emoji: "👨‍🌾",
  },
  {
    name: "Dr. Samuel Mwangi",
    role: "Head of Vet Services",
    bio: "Licensed veterinary surgeon leading our in-house professional vet team.",
    emoji: "🩺",
  },
  {
    name: "Agnes Wanjiru",
    role: "Operations Manager",
    bio: "Ensuring every product in our store meets the highest standards of quality.",
    emoji: "👩‍💼",
  },
];

const MILESTONES = [
  { year: "2022", event: "AgriTech Solutions founded to provide direct farm inputs" },
  { year: "2023", event: "Standardised quality across 500+ premium listings" },
  { year: "2023", event: "Built nationwide delivery network covering 47 counties" },
  { year: "2024", event: "Served over 1,000 farmers with direct sales" },
  { year: "2025", event: "Launched world-class mobile store for Kenyan farmers" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <div className="page-container py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">
              About Us
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight mb-5">
              Premium Farm Inputs.
              <br />
              <span className="text-amber-300">Direct to Your Gate.</span>
            </h1>
            <p className="text-brand-100 text-lg leading-relaxed mb-8 max-w-xl">
              AgriTech Solutions is Kenya's premium agricultural store. We provide direct access to the highest quality 
              livestock, vet professionals, and premium feeds — with a full guarantee on everything we sell.
            </p>
            <div className="flex gap-4">
              <Link href="/search" className="btn-primary bg-amber-500 hover:bg-amber-600 shadow-none py-3.5 px-7 text-base">
                Shop Our Store <ArrowRight size={16} />
              </Link>
              <a href="tel:+254768464997"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold py-3.5 px-7 rounded-xl transition-all text-base">
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="page-container py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:divide-x divide-gray-100 text-center">
            {[
              { icon: Package, value: "500+",  label: "Premium Products"   },
              { icon: Users,   value: "1,000+", label: "Happy Farmers"   },
              { icon: MapPin,  value: "47",     label: "Counties Served" },
              { icon: Star,    value: "100%",    label: "Quality Guarantee" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="px-4 py-3 flex flex-col items-center">
                <Icon size={22} className="text-brand-600 mb-2" />
                <p className="font-display font-extrabold text-2xl text-brand-700">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="page-container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="section-title mb-5">
              Direct Quality for Every Farmer
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe every farmer in Kenya deserves direct access to the best agricultural inputs without the 
              hassle and risk of unreliable middlemen.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              AgriTech Solutions was founded in Meru County to create a world-class shopping experience for the Kenyan 
              agricultural sector. We source the best, verify the quality, and deliver directly to you.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              When you buy from AgriTech Solutions, you're buying a promise of quality and professional service.
            </p>
            <Link href="/how-it-works" className="btn-primary">
              How to Shop <ArrowRight size={15} />
            </Link>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: "✅", title: "Direct Source",      desc: "We sell directly. No third parties. No middlemen." },
              { emoji: "🇰🇪", title: "Kenya-Wide",         desc: "Delivering premium farm inputs to all 47 counties." },
              { emoji: "📱", title: "Modern Store",       desc: "A world-class mobile experience for every farmer." },
              { emoji: "⚡", title: "Fast Delivery",      desc: "Quick, safe, and reliable logistics to your farm." },
              { emoji: "💰", title: "Best Value",        desc: "Fair, transparent pricing for premium quality." },
              { emoji: "🌱", title: "Growth Partner",     desc: "Helping your farm thrive with professional inputs." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="card-flat p-4 bg-white border border-gray-100">
                <p className="text-2xl mb-2">{emoji}</p>
                <p className="font-display font-semibold text-gray-900 text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-brand-50 py-14">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Team</p>
            <h2 className="section-title">The People Behind AgriTech Solutions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TEAM.map(({ name, role, bio, emoji }) => (
              <div key={name} className="card p-6 text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
                  {emoji}
                </div>
                <h3 className="font-display font-bold text-gray-900">{name}</h3>
                <p className="text-brand-600 text-sm font-medium mt-0.5 mb-3">{role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="page-container py-14">
        <div className="text-center mb-10">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Journey</p>
          <h2 className="section-title">Growing With Kenya's Farmers</h2>
        </div>
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-brand-100" />
          <div className="space-y-6">
            {MILESTONES.map(({ year, event }) => (
              <div key={event} className="flex gap-5 items-start">
                <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-green">
                  ✓
                </div>
                <div className="flex-1 bg-white rounded-xl border border-gray-100 px-5 py-3 shadow-sm">
                  <p className="text-brand-600 font-bold text-sm">{year}</p>
                  <p className="text-gray-700 text-sm mt-0.5">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-container pb-14">
        <div className="bg-gradient-to-r from-brand-700 to-brand-600 rounded-3xl p-10 text-white text-center">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-3">
            Ready to shop at Kenya's premium farm store?
          </h2>
          <p className="text-brand-100 mb-8 max-w-md mx-auto">
            Browse our guaranteed livestock, find professional vet services, or order premium feeds today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/search" className="bg-white text-brand-700 font-bold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-all shadow-lg">
              Browse Store
            </Link>
            <Link href="/contact" className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
