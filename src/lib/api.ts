import type { Item, Lead, FarmerRequest, Category, Order, Profile } from "@/types";
import { MOCK_ITEMS } from "./mock-data";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// --- Items ---

export async function getFeaturedItems(limit = 8): Promise<Item[]> {
  if (USE_MOCK) return MOCK_ITEMS.filter((i) => i.featured).slice(0, limit);
  const { getSupabaseClient } = await import("./supabase");
  const { data } = await getSupabaseClient()
    .from("items")
    .select("*")
    .eq("featured", true)
    .eq("status", "available")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as Item[];
}

export async function getItemsByCategory(
  category: Category,
  options?: { limit?: number; offset?: number; search?: string; sort?: string }
): Promise<Item[]> {
  const { limit = 20, offset = 0, search, sort = "newest" } = options ?? {};
  if (USE_MOCK) {
    let items = MOCK_ITEMS.filter((i) => i.category === category);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      );
    }
    if (sort === "price_asc") items.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") items.sort((a, b) => b.price - a.price);
    return items.slice(offset, offset + limit);
  }
  const { getSupabaseClient } = await import("./supabase");
  let q = getSupabaseClient()
    .from("items")
    .select("*")
    .eq("category", category)
    .range(offset, offset + limit - 1);
  if (search) q = q.ilike("title", `%${search}%`);
  if (sort === "price_asc") q = q.order("price", { ascending: true });
  else if (sort === "price_desc") q = q.order("price", { ascending: false });
  else q = q.order("created_at", { ascending: false });
  const { data } = await q;
  return (data ?? []) as Item[];
}

export async function getItemById(id: string): Promise<Item | null> {
  if (USE_MOCK) return MOCK_ITEMS.find((i) => i.id === id) ?? null;
  const { getSupabaseClient } = await import("./supabase");
  const { data } = await getSupabaseClient()
    .from("items")
    .select("*")
    .eq("id", id)
    .single();
  return (data as Item) ?? null;
}

export async function searchItems(
  query: string,
  filters?: { category?: Category; county?: string; minPrice?: number; maxPrice?: number }
): Promise<Item[]> {
  if (USE_MOCK) {
    const q = query.toLowerCase();
    let items = MOCK_ITEMS.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.county.toLowerCase().includes(q)
    );
    if (filters?.category) items = items.filter((i) => i.category === filters.category);
    if (filters?.county) items = items.filter((i) => i.county === filters.county);
    if (filters?.minPrice) items = items.filter((i) => i.price >= filters.minPrice!);
    if (filters?.maxPrice) items = items.filter((i) => i.price <= filters.maxPrice!);
    return items;
  }
  const { getSupabaseClient } = await import("./supabase");
  let q = getSupabaseClient()
    .from("items")
    .select("*")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`);
  if (filters?.category) q = q.eq("category", filters.category);
  if (filters?.county) q = q.eq("county", filters.county);
  if (filters?.minPrice) q = q.gte("price", filters.minPrice);
  if (filters?.maxPrice) q = q.lte("price", filters.maxPrice);
  const { data } = await q.order("created_at", { ascending: false });
  return (data ?? []) as Item[];
}

export async function getAllItems(options?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: Category;
  status?: string;
  seller_id?: string;
}): Promise<{ items: Item[]; total: number }> {
  const { page = 1, limit = 20, search, category, status, seller_id } = options ?? {};
  if (USE_MOCK) {
    let items = [...MOCK_ITEMS];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.location.toLowerCase().includes(q));
    }
    if (category) items = items.filter((i) => i.category === category);
    if (status) items = items.filter((i) => i.status === status);
    const start = (page - 1) * limit;
    return { items: items.slice(start, start + limit), total: items.length };
  }
  const { getSupabaseClient } = await import("./supabase");
  let q = getSupabaseClient().from("items").select("*", { count: "exact" });
  if (search) q = q.ilike("title", `%${search}%`);
  if (category) q = q.eq("category", category);
  if (status) q = q.eq("status", status);
  if (seller_id) q = q.eq("seller_id", seller_id);
  const { data, count } = await q
    .range((page - 1) * limit, page * limit - 1)
    .order("created_at", { ascending: false });
  return { items: (data ?? []) as Item[], total: count ?? 0 };
}

// --- Orders ---

export async function createOrder(order: Omit<Order, "id" | "created_at" | "updated_at">): Promise<Order | null> {
  if (USE_MOCK) { console.log("[MOCK] Order created:", order); return null; }
  const { getSupabaseClient } = await import("./supabase");
  const { data, error } = await getSupabaseClient().from("orders").insert([order]).select().single();
  if (error) { console.error(error); return null; }
  return data as Order;
}

export async function getOrders(options?: { buyer_id?: string; seller_id?: string }): Promise<Order[]> {
  if (USE_MOCK) return [];
  const { getSupabaseClient } = await import("./supabase");
  let q = getSupabaseClient().from("orders").select("*");
  if (options?.buyer_id) q = q.eq("buyer_id", options.buyer_id);
  if (options?.seller_id) q = q.eq("seller_id", options.seller_id);
  const { data } = await q.order("created_at", { ascending: false });
  return (data ?? []) as Order[];
}

// --- Profiles ---

export async function getProfile(id: string): Promise<Profile | null> {
  if (USE_MOCK) return { id, full_name: "Demo User", role: "admin", phone: "", county: "Meru", is_verified: true, created_at: "" };
  const { getSupabaseClient } = await import("./supabase");
  const { data } = await getSupabaseClient().from("profiles").select("*").eq("id", id).single();
  return (data as Profile) ?? null;
}

// --- Leads & Requests ---

export async function submitLead(lead: Omit<Lead, "id" | "status" | "created_at">): Promise<boolean> {
  if (USE_MOCK) { console.log("[MOCK] Lead submitted:", lead); return true; }
  const { getSupabaseClient } = await import("./supabase");
  const { error } = await getSupabaseClient().from("leads").insert([lead]);
  return !error;
}

export async function getLeads(): Promise<Lead[]> {
  if (USE_MOCK) return [];
  const { createAdminSupabase } = await import("./supabase-server");
  const { data } = await createAdminSupabase().from("leads").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Lead[];
}

export async function submitRequest(request: Omit<FarmerRequest, "id" | "status" | "created_at">): Promise<boolean> {
  if (USE_MOCK) { console.log("[MOCK] Request submitted:", request); return true; }
  const { getSupabaseClient } = await import("./supabase");
  const { error } = await getSupabaseClient().from("farmer_requests").insert([request]);
  return !error;
}

export async function getRequests(): Promise<FarmerRequest[]> {
  if (USE_MOCK) return [];
  const { createAdminSupabase } = await import("./supabase-server");
  const { data } = await createAdminSupabase().from("farmer_requests").select("*").order("created_at", { ascending: false });
  return (data ?? []) as FarmerRequest[];
}

// --- Admin/Seller CRUD ---

export async function createItem(item: Omit<Item, "id" | "created_at" | "updated_at">): Promise<Item | null> {
  if (USE_MOCK) { console.log("[MOCK] Item created:", item); return null; }
  const { getSupabaseClient } = await import("./supabase");
  const { data, error } = await getSupabaseClient().from("items").insert([item]).select().single();
  if (error) { console.error(error); return null; }
  return data as Item;
}

export async function updateItem(id: string, updates: Partial<Item>): Promise<boolean> {
  if (USE_MOCK) { console.log("[MOCK] Item updated:", id, updates); return true; }
  const { getSupabaseClient } = await import("./supabase");
  const { error } = await getSupabaseClient().from("items").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
  return !error;
}

export async function deleteItem(id: string): Promise<boolean> {
  if (USE_MOCK) { console.log("[MOCK] Item deleted:", id); return true; }
  const { getSupabaseClient } = await import("./supabase");
  const { error } = await getSupabaseClient().from("items").delete().eq("id", id);
  return !error;
}

export async function incrementViews(id: string): Promise<void> {
  if (USE_MOCK) return;
  const { getSupabaseClient } = await import("./supabase");
  await getSupabaseClient().rpc("increment_views", { item_id: id });
}

export async function getDashboardStats() {
  if (USE_MOCK) {
    return {
      totalItems: MOCK_ITEMS.length,
      availableItems: MOCK_ITEMS.filter((i) => i.status === "available").length,
      totalLeads: 12,
      totalRequests: 7,
      itemsByCategory: {
        livestock: MOCK_ITEMS.filter((i) => i.category === "livestock").length,
        vet: MOCK_ITEMS.filter((i) => i.category === "vet").length,
        feeds: MOCK_ITEMS.filter((i) => i.category === "feeds").length,
        products: MOCK_ITEMS.filter((i) => i.category === "products").length,
      },
    };
  }
  return null;
}
