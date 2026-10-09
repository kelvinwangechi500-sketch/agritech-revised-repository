"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, ListChecks, PlusCircle,
  Users, MessageSquare, LogOut, Menu, X, TrendingUp, Bell,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard",  badge: null },
  { href: "/admin/items",     icon: ListChecks,      label: "All Listings",badge: null },
  { href: "/admin/items/new", icon: PlusCircle,      label: "Add Listing", badge: null },
  { href: "/admin/leads",     icon: Users,           label: "Leads",       badge: "3"  },
  { href: "/admin/requests",  icon: MessageSquare,   label: "Requests",    badge: "2"  },
];

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  const router   = useRouter();

  function handleLogout() {
    document.cookie = "agritech_admin=; path=/; max-age=0";
    router.push("/admin/login");
  }

  return (
    <aside className="w-60 flex flex-col bg-gray-950 text-white min-h-screen">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <Link href="/" target="_blank" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-xl shadow-green shrink-0">
            🌾
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-sm text-white leading-tight truncate">AgriTech Solutions</p>
            <p className="text-[10px] text-amber-400 uppercase tracking-widest">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNav}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-brand-600 text-white shadow-green"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-800 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
        >
          <TrendingUp size={16} /> View Live Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-900/40 hover:text-red-300 transition-all"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-950 text-white px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🌾</span>
          <span className="font-display font-bold text-sm">AgriTech Solutions</span>
          <span className="text-[10px] text-amber-400 uppercase tracking-widest">Admin</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="w-60 h-full" onClick={(e) => e.stopPropagation()}>
            <SidebarContent onNav={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 pt-20 lg:pt-6 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
