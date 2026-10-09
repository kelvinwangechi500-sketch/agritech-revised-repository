"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package, Users, MessageSquare, TrendingUp,
  PlusCircle, Eye, ArrowRight, Activity,
} from "lucide-react";
import { MOCK_ITEMS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/types";

export default function AdminDashboard() {
  const stats = {
    totalItems:      MOCK_ITEMS.length,
    availableItems:  MOCK_ITEMS.filter((i) => i.status === "available").length,
    totalLeads:      12,
    totalRequests:   7,
    newLeads:        3,
    newRequests:     2,
  };

  const recentItems = MOCK_ITEMS.slice(0, 5);

  const categoryStats = CATEGORIES.map((c) => ({
    ...c,
    count: MOCK_ITEMS.filter((i) => i.category === c.key).length,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">AgriTech Solutions — Admin Overview</p>
        </div>
        <Link href="/admin/items/new" className="btn-primary">
          <PlusCircle size={16} /> Add Listing
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Listings",
            value: stats.totalItems,
            sub: `${stats.availableItems} available`,
            icon: Package,
            color: "text-brand-600 bg-brand-50",
            href: "/admin/items",
          },
          {
            label: "Total Leads",
            value: stats.totalLeads,
            sub: `${stats.newLeads} new`,
            icon: Users,
            color: "text-blue-600 bg-blue-50",
            href: "/admin/leads",
          },
          {
            label: "Farm Requests",
            value: stats.totalRequests,
            sub: `${stats.newRequests} pending`,
            icon: MessageSquare,
            color: "text-amber-600 bg-amber-50",
            href: "/admin/requests",
          },
          {
            label: "Categories",
            value: 4,
            sub: "All active",
            icon: Activity,
            color: "text-purple-600 bg-purple-50",
            href: "/admin/items",
          },
        ].map(({ label, value, sub, icon: Icon, color, href }) => (
          <Link key={label} href={href} className="card p-5 hover:shadow-card-hover transition-shadow">
            <div className={`inline-flex p-2.5 rounded-xl ${color} mb-3`}>
              <Icon size={20} />
            </div>
            <p className="font-display font-extrabold text-2xl text-gray-900">{value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent listings */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-gray-900">Recent Listings</h2>
            <Link href="/admin/items" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl shrink-0">
                  {item.category === "livestock" ? "🐄" : item.category === "vet" ? "🩺" : item.category === "feeds" ? "🌽" : "🥛"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm text-brand-700">{formatPrice(item.price)}</p>
                  <span className={`text-xs ${item.status === "available" ? "text-brand-600" : "text-red-500"}`}>
                    {item.status}
                  </span>
                </div>
                <Link href={`/admin/items/${item.id}`} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <Eye size={14} className="text-gray-400" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="card p-6">
          <h2 className="font-display font-bold text-gray-900 mb-4">By Category</h2>
          <div className="space-y-3">
            {categoryStats.map((c) => (
              <div key={c.key}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    {c.emoji} {c.label}
                  </span>
                  <span className="font-semibold text-gray-900">{c.count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all"
                    style={{ width: `${(c.count / stats.totalItems) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3">Quick Actions</p>
            <div className="space-y-2">
              <Link href="/admin/items/new" className="btn-primary w-full justify-center text-sm py-2">
                <PlusCircle size={14} /> New Listing
              </Link>
              <Link href="/" target="_blank" className="btn-secondary w-full justify-center text-sm py-2">
                <Eye size={14} /> View Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
