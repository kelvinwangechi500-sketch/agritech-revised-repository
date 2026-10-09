"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ItemGrid from "@/components/marketplace/ItemGrid";
import SearchFilters from "@/components/marketplace/SearchFilters";
import { MOCK_ITEMS } from "@/lib/mock-data";
import type { Item, Category } from "@/types";

const USE_MOCK = true;

function SearchResults() {
  const searchParams = useSearchParams();
  const [items,   setItems]   = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const q         = searchParams.get("q") ?? "";
  const category  = (searchParams.get("category") ?? "") as Category | "";
  const county    = searchParams.get("county") ?? "";
  const sort      = searchParams.get("sort") ?? "newest";
  const minPrice  = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice  = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (USE_MOCK) {
        let data = [...MOCK_ITEMS];
        if (q) {
          const lq = q.toLowerCase();
          data = data.filter(
            (i) =>
              i.title.toLowerCase().includes(lq) ||
              i.description.toLowerCase().includes(lq) ||
              i.location.toLowerCase().includes(lq) ||
              i.county.toLowerCase().includes(lq)
          );
        }
        if (category) data = data.filter((i) => i.category === category);
        if (county)   data = data.filter((i) => i.county === county);
        if (minPrice) data = data.filter((i) => i.price >= minPrice);
        if (maxPrice) data = data.filter((i) => i.price <= maxPrice);
        if (sort === "price_asc")  data.sort((a, b) => a.price - b.price);
        if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
        setItems(data);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [q, category, county, sort, minPrice, maxPrice]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600 text-sm">
          {loading ? "Searching…" : (
            <>
              <span className="font-semibold text-gray-900">{items.length}</span> result{items.length !== 1 ? "s" : ""}
              {q && <> for "<span className="font-semibold text-brand-700">{q}</span>"</>}
            </>
          )}
        </p>
      </div>
      <SearchFilters />
      <ItemGrid
        items={items}
        loading={loading}
        emptyMessage={q ? `No results for "${q}"` : "No listings match your filters"}
      />
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="page-container py-8">
        <h1 className="font-display font-extrabold text-2xl text-gray-900 mb-6">
          🔍 Search Store
        </h1>
        <Suspense fallback={<div className="text-gray-400 text-sm py-8">Loading…</div>}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
