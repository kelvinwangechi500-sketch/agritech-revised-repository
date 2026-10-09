"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Search, Pencil, Trash2, Eye } from "lucide-react";
import { MOCK_ITEMS } from "@/lib/mock-data";
import { formatPrice, timeAgo, categoryLabel } from "@/lib/utils";
import { CATEGORIES, type Category } from "@/types";
import type { Item } from "@/types";

export default function AdminItemsPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [items,    setItems]    = useState<Item[]>(MOCK_ITEMS);

  const filtered = items.filter((i) => {
    const matchSearch   = !search   || i.title.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || i.category === category;
    return matchSearch && matchCategory;
  });

  function handleDelete(id: string) {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900">All Listings</h1>
          <p className="text-gray-500 text-sm mt-0.5">{filtered.length} of {items.length} items</p>
        </div>
        <Link href="/admin/items/new" className="btn-primary">
          <PlusCircle size={16} /> Add Listing
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search listings…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-9 text-sm"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "")}
          className="select text-sm w-auto"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>{c.emoji} {c.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Listing</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Location</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">Added</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">No listings found</td>
                </tr>
              ) : filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {item.images?.[0] ? (
                          <Image src={item.images[0]} alt={item.title} width={40} height={40} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">
                            {item.category === "livestock" ? "🐄" : item.category === "vet" ? "🩺" : item.category === "feeds" ? "🌽" : "🥛"}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[160px]">{item.title}</p>
                        {item.featured && <span className="text-xs text-amber-600">⭐ Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      item.category === "livestock" ? "bg-green-50 text-green-700" :
                      item.category === "vet"       ? "bg-blue-50 text-blue-700"  :
                      item.category === "feeds"     ? "bg-amber-50 text-amber-700":
                      "bg-purple-50 text-purple-700"
                    }`}>
                      {categoryLabel(item.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{item.location}</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">{formatPrice(item.price)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      item.status === "available" ? "bg-brand-50 text-brand-700" :
                      item.status === "sold"      ? "bg-red-50 text-red-600"     :
                      "bg-orange-50 text-orange-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{timeAgo(item.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/item/${item.id}`} target="_blank"
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                        <Eye size={14} />
                      </Link>
                      <Link href={`/admin/items/${item.id}`}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
