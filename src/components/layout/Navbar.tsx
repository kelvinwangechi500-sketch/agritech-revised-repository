"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, Menu, X, Phone, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/types";

const PHONE = "0768 464 997";
const PHONE_HREF = "tel:+254768464997";

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query,      setQuery]      = useState("");
  const [scrolled,   setScrolled]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router   = useRouter();
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  // Sticky shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [searchOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <>
      {/* ── Main navbar ──────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-lg border-b border-gray-100" : "shadow-sm"
        }`}
      >
        <nav className="page-container h-20 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 mr-4 group">
            <div className="w-11 h-11 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-2xl shadow-green group-hover:rotate-6 transition-transform">
              🌾
            </div>
            <div className="leading-tight hidden xs:block">
              <p className="font-display font-black text-gray-900 text-xl leading-none tracking-tight">
                AgriTech
              </p>
              <p className="text-[11px] text-brand-600 font-bold uppercase tracking-widest mt-0.5">
                Solutions
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-2 flex-1">
            {CATEGORIES.map((cat) => {
              const href = cat.key === "vet" ? "/vet-services" : `/${cat.key}`;
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={cat.key}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-brand-600 text-white shadow-green"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className={active ? "" : "grayscale-[0.5]"}>{cat.emoji}</span> {cat.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm ml-4">
            <div className="relative w-full group">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search premium farm products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input pl-11 pr-4 py-2.5 text-sm h-11 bg-gray-50 border-transparent focus:border-brand-500 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto lg:ml-4">
            {/* Call button (Desktop) */}
            <a
              href={PHONE_HREF}
              className="hidden xl:flex items-center gap-2 text-sm font-bold text-white bg-brand-600 px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-all shadow-green"
            >
              <Phone size={15} /> {PHONE}
            </a>

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors border border-gray-100"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors border border-gray-100"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 py-4 bg-white animate-in slide-in-from-top duration-300">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="input pl-11 h-12 text-sm bg-gray-50"
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white/95 backdrop-blur-lg z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="page-container py-6 space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-4">Our Categories</p>
              {CATEGORIES.map((cat) => {
                const href = cat.key === "vet" ? "/vet-services" : `/${cat.key}`;
                return (
                  <Link
                    key={cat.key}
                    href={href}
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold text-gray-800 hover:bg-brand-50 hover:text-brand-700 transition-all border border-transparent hover:border-brand-100"
                  >
                    <span className="text-2xl bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-sm border border-gray-50">
                      {cat.emoji}
                    </span>
                    <div>
                      <p>{cat.label}</p>
                      <p className="text-xs text-gray-400 font-normal mt-0.5">{cat.description}</p>
                    </div>
                  </Link>
                );
              })}
              
              <div className="pt-6 mt-6 border-t border-gray-100 grid grid-cols-2 gap-3">
                <a
                  href={PHONE_HREF}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-brand-50 border border-brand-100 text-brand-700"
                >
                  <Phone size={20} />
                  <span className="text-xs font-bold">Call Store</span>
                </a>
                <Link
                  href="/request"
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700"
                >
                  <span className="text-xl">📋</span>
                  <span className="text-xs font-bold">Request Item</span>
                </Link>
              </div>

              <div className="pt-10 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Visit Us Directly</p>
                <div className="flex justify-center gap-6">
                  <span className="text-xs text-gray-500 font-medium">Mon–Sat 6am–8pm</span>
                  <span className="text-xs text-gray-500 font-medium">Meru County, KE</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Floating WhatsApp (Mobile) ────────────────────────────── */}
      <a
        href="https://wa.me/254768464997"
        target="_blank"
        rel="noopener noreferrer"
        className="lg:hidden fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
