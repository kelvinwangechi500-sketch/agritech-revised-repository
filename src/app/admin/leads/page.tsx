"use client";
import { useState } from "react";
import { Phone, Mail, MessageSquare, CheckCircle, Clock } from "lucide-react";

// Mock leads for demo
const MOCK_LEADS = [
  { id: "1", item_title: "Friesian Dairy Cow – High Yielding", name: "James Mwangi",    phone: "0712 345678", email: "james@email.com",  message: "Is the cow still available? Can I come and see it this weekend?", status: "new",       created_at: "2025-03-20T10:00:00Z" },
  { id: "2", item_title: "Dairy Meal – High Protein 18%",      name: "Mary Wanjiku",    phone: "0723 456789", email: "",               message: "I need 10 bags. Do you deliver to Embu?",                           status: "contacted",  created_at: "2025-03-19T14:30:00Z" },
  { id: "3", item_title: "Mobile Vet Clinic",                  name: "Peter Karanja",   phone: "0733 567890", email: "peter@farm.co.ke",message: "I need the vet for vaccination of 20 cows next week.",             status: "new",       created_at: "2025-03-19T09:00:00Z" },
  { id: "4", item_title: "Free-Range Eggs",                    name: "Alice Njeri",     phone: "0745 678901", email: "",               message: "Can you supply 10 trays every week to my restaurant in Meru?",      status: "closed",    created_at: "2025-03-18T11:00:00Z" },
  { id: "5", item_title: "Dorper Sheep – 10 Head",             name: "John Kimani",     phone: "0756 789012", email: "john@gmail.com",  message: "Interested in the sheep. What is the lowest price?",               status: "new",       created_at: "2025-03-18T08:30:00Z" },
  { id: "6", item_title: "Pure Raw Honey",                     name: "Susan Wanjiru",   phone: "0767 890123", email: "",               message: "I want to order 5kg of honey. Is delivery to Nairobi possible?",    status: "contacted",  created_at: "2025-03-17T16:00:00Z" },
];

type LeadStatus = "new" | "contacted" | "closed";

const STATUS_CONFIG: Record<LeadStatus, { label: string; class: string }> = {
  new:       { label: "New",       class: "bg-blue-50 text-blue-700"   },
  contacted: { label: "Contacted", class: "bg-amber-50 text-amber-700" },
  closed:    { label: "Closed",    class: "bg-gray-100 text-gray-500"  },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [filter, setFilter] = useState<LeadStatus | "">("");

  const filtered = filter ? leads.filter((l) => l.status === filter) : leads;

  function updateStatus(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
  }

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900">Customer Leads</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {leads.length} total · <span className="text-blue-600 font-semibold">{newCount} new</span>
          </p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex gap-2">
        {(["", "new", "contacted", "closed"] as (LeadStatus | "")[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === s
                ? "bg-brand-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {s === "" ? `All (${leads.length})` :
             s === "new" ? `New (${leads.filter(l => l.status === "new").length})` :
             s === "contacted" ? `Contacted (${leads.filter(l => l.status === "contacted").length})` :
             `Closed (${leads.filter(l => l.status === "closed").length})`}
          </button>
        ))}
      </div>

      {/* Leads list */}
      <div className="space-y-3">
        {filtered.map((lead) => {
          const sc = STATUS_CONFIG[lead.status as LeadStatus];
          const date = new Date(lead.created_at).toLocaleDateString("en-KE", {
            day: "numeric", month: "short", year: "numeric",
          });
          return (
            <div key={lead.id} className="card p-5">
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{lead.name}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sc.class}`}>{sc.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">Re: <span className="font-medium text-gray-700">{lead.item_title}</span></p>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                  <Clock size={11} /> {date}
                </p>
              </div>

              <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 mb-4 italic">"{lead.message}"</p>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-brand-700 transition-colors">
                    <Phone size={13} /> {lead.phone}
                  </a>
                  {lead.email && (
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-700 transition-colors">
                      <Mail size={13} /> {lead.email}
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, "").replace(/^0/, "254")}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for your inquiry about ${lead.item_title}. We're happy to help!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-[#25D366] hover:text-[#1db954] transition-colors"
                  >
                    <MessageSquare size={13} /> WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  {lead.status !== "contacted" && (
                    <button onClick={() => updateStatus(lead.id, "contacted")}
                      className="btn-secondary text-xs py-1.5 px-3">
                      Mark Contacted
                    </button>
                  )}
                  {lead.status !== "closed" && (
                    <button onClick={() => updateStatus(lead.id, "closed")}
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
