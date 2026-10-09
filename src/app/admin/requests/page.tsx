"use client";
import { useState } from "react";
import { Phone, MessageSquare, Clock, CheckCircle, MapPin } from "lucide-react";
import { CATEGORIES } from "@/types";

const MOCK_REQUESTS = [
  { id: "1", name: "David Lekimpo",  phone: "0712 111222", email: "",                   category: "livestock" as const, description: "Looking for 5 Dorper or Red Maasai sheep, female, 1–2 years old. Must be vaccinated. Ready to pay up to KES 12,000 each.", location: "Laikipia North", county: "Laikipia", budget: "KES 50,000 – 60,000", status: "pending",   created_at: "2025-03-20T09:00:00Z" },
  { id: "2", name: "Grace Wanjiku",  phone: "0723 333444", email: "grace@farm.co.ke",   category: "feeds" as const,    description: "Need regular monthly supply of dairy meal. We have 15 cows. Prefer 50kg bags delivered to Nyeri.", location: "Nyeri Town", county: "Nyeri", budget: "KES 40,000/month", status: "responded", created_at: "2025-03-19T14:00:00Z" },
  { id: "3", name: "Samuel Ochieng", phone: "0734 555666", email: "",                   category: "vet" as const,      description: "Need a vet for pregnancy diagnosis and AI services for a herd of 30 cows in Kisumu. Must be available this month.", location: "Kisumu City", county: "Kisumu", budget: "Negotiable", status: "pending", created_at: "2025-03-19T10:30:00Z" },
  { id: "4", name: "Faith Muthoni",  phone: "0745 777888", email: "faith@honey.co.ke",  category: "products" as const, description: "Looking to buy large quantities of raw honey for export. Need minimum 100kg/month, lab-certified.", location: "Nairobi, Westlands", county: "Nairobi", budget: "KES 600–800/kg", status: "pending", created_at: "2025-03-18T08:00:00Z" },
  { id: "5", name: "Paul Kamau",     phone: "0756 999000", email: "",                   category: "livestock" as const, description: "Need 100 day-old KARI chicks. Should be vaccinated. Delivery to Kiambu preferred.", location: "Thika", county: "Kiambu", budget: "KES 12,000–14,000", status: "closed", created_at: "2025-03-17T11:00:00Z" },
];

const CAT_EMOJI: Record<string, string> = { livestock: "🐄", vet: "🩺", feeds: "🌽", products: "🥛" };

type ReqStatus = "pending" | "responded" | "closed";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [filter, setFilter] = useState<ReqStatus | "">("");

  const filtered = filter ? requests.filter((r) => r.status === filter) : requests;
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  function updateStatus(id: string, status: ReqStatus) {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  }

  const STATUS_STYLES: Record<ReqStatus, string> = {
    pending:   "bg-orange-50 text-orange-700",
    responded: "bg-brand-50 text-brand-700",
    closed:    "bg-gray-100 text-gray-500",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900">Farmer Requests</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {requests.length} total · <span className="text-orange-600 font-semibold">{pendingCount} pending</span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(["", "pending", "responded", "closed"] as (ReqStatus | "")[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === s
                ? "bg-brand-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {s === "" ? `All (${requests.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${requests.filter(r => r.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Requests list */}
      <div className="space-y-3">
        {filtered.map((req) => {
          const catConfig = CATEGORIES.find((c) => c.key === req.category);
          const date = new Date(req.created_at).toLocaleDateString("en-KE", {
            day: "numeric", month: "short", year: "numeric",
          });
          return (
            <div key={req.id} className="card p-5">
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-gray-900">{req.name}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[req.status as ReqStatus]}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {CAT_EMOJI[req.category]} {catConfig?.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {req.location}, {req.county}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {date}</span>
                  </div>
                </div>
                {req.budget && (
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-semibold text-brand-700">{req.budget}</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 mb-4">{req.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <a href={`tel:${req.phone}`} className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-brand-700 transition-colors">
                    <Phone size={13} /> {req.phone}
                  </a>
                  <a
                    href={`https://wa.me/${req.phone.replace(/\D/g, "").replace(/^0/, "254")}?text=${encodeURIComponent(`Hello ${req.name}, we received your request for ${catConfig?.label}. We would like to help you!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-[#25D366] hover:text-[#1db954] transition-colors"
                  >
                    <MessageSquare size={13} /> WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === "pending" && (
                    <button onClick={() => updateStatus(req.id, "responded")} className="btn-primary text-xs py-1.5 px-4">
                      Mark Responded
                    </button>
                  )}
                  {req.status !== "closed" && (
                    <button onClick={() => updateStatus(req.id, "closed")}
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <CheckCircle size={13} /> Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
