"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, KENYA_COUNTIES, type Category } from "@/types";

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest First" },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

export default function SearchFilters() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [showMobile, setShowMobile] = useState(false);

  const q        = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const county   = searchParams.get("county") ?? "";
  const sort     = searchParams.get("sort") ?? "newest";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page"); // reset pagination
    startTransition(() => router.push(`/search?${params.toString()}`));
  }

  function clearAll() {
    startTransition(() => router.push("/search"));
  }

  const hasFilters = category || county || minPrice || maxPrice;

  const FiltersBody = () => (
    <div className="flex flex-wrap gap-2.5 items-end">
      {/* Category */}
      <div>
        <label className="label text-xs">Category</label>
        <select value={category} onChange={(e) => update("category", e.target.value)} className="select text-sm py-2 pr-8 w-40">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>{c.emoji} {c.label}</option>
          ))}
        </select>
      </div>

      {/* County */}
      <div>
        <label className="label text-xs">County</label>
        <select value={county} onChange={(e) => update("county", e.target.value)} className="select text-sm py-2 pr-8 w-40">
          <option value="">All Counties</option>
          {KENYA_COUNTIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="label text-xs">Min Price (KES)</label>
        <input
          type="number" placeholder="0" value={minPrice}
          onChange={(e) => update("minPrice", e.target.value)}
          className="input text-sm py-2 w-32"
        />
      </div>
      <div>
        <label className="label text-xs">Max Price (KES)</label>
        <input
          type="number" placeholder="Any" value={maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
          className="input text-sm py-2 w-32"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="label text-xs">Sort By</label>
        <select value={sort} onChange={(e) => update("sort", e.target.value)} className="select text-sm py-2 pr-8 w-44">
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Clear */}
      {hasFilters && (
        <button onClick={clearAll} className="btn-danger flex items-center gap-1.5 py-2">
          <X size={14} /> Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-6">
        <FiltersBody />
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobile((v) => !v)}
          className="btn-secondary w-full justify-center"
        >
          <SlidersHorizontal size={16} />
          {showMobile ? "Hide Filters" : "Show Filters"}
          {hasFilters && <span className="ml-1 bg-brand-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>}
        </button>
        {showMobile && (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mt-2">
            <FiltersBody />
          </div>
        )}
      </div>
    </>
  );
}
