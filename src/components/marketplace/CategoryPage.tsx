"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ItemGrid from "@/components/marketplace/ItemGrid";
import { MOCK_ITEMS } from "@/lib/mock-data";
import type { Category, Item } from "@/types";
import { getCategoryConfig } from "@/types";

const USE_MOCK = true;

interface Props {
  category: Category;
}

export default function CategoryPage({ category }: Props) {
  const [items,   setItems]   = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [sort,    setSort]    = useState("newest");

  const config = getCategoryConfig(category);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (USE_MOCK) {
          let data = MOCK_ITEMS.filter((i) => i.category === category);
          if (search) {
            const q = search.toLowerCase();
            data = data.filter(
              (i) => i.title.toLowerCase().includes(q) || i.location.toLowerCase().includes(q)
            );
          }
          if (sort === "price_asc")  data.sort((a, b) => a.price - b.price);
          if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
          setItems(data);
        } else {
          const { getItemsByCategory } = await import("@/lib/api");
          setItems(await getItemsByCategory(category, { search, sort }));
        }
      } finally { setLoading(false); }
    };
    load();
  }, [category, search, sort]);

  return (
    <>
      <Navbar />
      {/* Hero banner */}
      <section className={`bg-gradient-to-br ${config.bgClass.replace("border-", "from-").replace("hover:border-", "")} border-b`}>
        <div className="page-container py-10 flex items-center gap-5">
          <span className="text-6xl">{config.emoji}</span>
          <div>
            <h1 className="font-display font-extrabold text-3xl text-gray-900">{config.label}</h1>
            <p className="text-gray-600 mt-1">{config.description}</p>
          </div>
        </div>
      </section>

      <main className="page-container py-8">
        {/* Quick filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder={`Search ${config.label.toLowerCase()}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input flex-1 max-w-md"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="select w-auto">
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
          <p className="self-center text-sm text-gray-500 whitespace-nowrap">
            {loading ? "…" : `${items.length} listings`}
          </p>
        </div>

        <ItemGrid items={items} loading={loading} emptyMessage={`No ${config.label.toLowerCase()} listings right now`} />
      </main>
      <Footer />
    </>
  );
}
