# 🌾 AgriTech Solutions — Kenya's Agricultural Marketplace

> **Business:** AgriTech Solutions Kenya  
> **Phone:** 0768 464 997  
> **Email:** kelvinwangechi500@gmail.com  
> **Location:** Meru County, Kenya 🇰🇪

A full-stack, production-ready agricultural marketplace built with **Next.js 15**, **Tailwind CSS**, and **Supabase**.

---

## 📁 Project Structure

```
agritech-solutions/
├── src/
│   ├── app/
│   │   ├── layout.tsx               ← Root layout + global SEO + Toast provider
│   │   ├── page.tsx                 ← Homepage
│   │   ├── globals.css              ← Design system
│   │   ├── loading.tsx              ← Global loading spinner
│   │   ├── not-found.tsx            ← 404 page
│   │   ├── global-error.tsx         ← Error boundary
│   │   ├── sitemap.ts               ← Auto-generated sitemap
│   │   ├── search/page.tsx          ← Universal search
│   │   ├── livestock/page.tsx       ← Livestock category
│   │   ├── vet-services/page.tsx    ← Vet services
│   │   ├── feeds/page.tsx           ← Animal feeds
│   │   ├── products/page.tsx        ← Farm products
│   │   ├── item/[id]/page.tsx       ← Item detail page
│   │   ├── request/page.tsx         ← Farmer request form
│   │   ├── about/page.tsx           ← About us
│   │   ├── contact/page.tsx         ← Contact form
│   │   ├── how-it-works/page.tsx    ← How it works + FAQ
│   │   ├── privacy/page.tsx         ← Privacy policy
│   │   ├── terms/page.tsx           ← Terms of service
│   │   └── admin/
│   │       ├── layout.tsx           ← Admin sidebar
│   │       ├── page.tsx             ← Redirect to dashboard
│   │       ├── login/page.tsx       ← Admin login
│   │       ├── dashboard/page.tsx   ← Stats & overview
│   │       ├── items/
│   │       │   ├── page.tsx         ← All listings
│   │       │   ├── ItemForm.tsx     ← Reusable create/edit form
│   │       │   ├── new/page.tsx     ← New listing
│   │       │   └── [id]/page.tsx    ← Edit listing
│   │       ├── leads/page.tsx       ← Customer inquiries
│   │       └── requests/page.tsx    ← Farmer requests
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           ← Sticky nav with mobile drawer
│   │   │   └── Footer.tsx           ← Full footer with links & contacts
│   │   ├── marketplace/
│   │   │   ├── ItemCard.tsx         ← Universal listing card
│   │   │   ├── ItemGrid.tsx         ← Responsive grid + skeletons
│   │   │   ├── ImageGallery.tsx     ← Lightbox gallery with keyboard nav
│   │   │   ├── SearchFilters.tsx    ← Category/county/price filters
│   │   │   ├── CategoryPage.tsx     ← Reusable category page
│   │   │   ├── WhatsAppButton.tsx   ← Dynamic WhatsApp CTA
│   │   │   ├── InquiryForm.tsx      ← Lead capture with validation
│   │   │   └── MarketplaceMap.tsx   ← Leaflet map component
│   │   └── ui/
│   │       ├── Toast.tsx            ← Toast notification system
│   │       └── PageHeader.tsx       ← Reusable page header
│   ├── hooks/
│   │   └── index.ts                 ← useDebounce, useLocalStorage, etc.
│   ├── lib/
│   │   ├── supabase.ts              ← Browser Supabase client
│   │   ├── supabase-server.ts       ← Server-side + admin Supabase clients
│   │   ├── api.ts                   ← All data access (mock/live toggle)
│   │   ├── mock-data.ts             ← 16 sample listings
│   │   └── utils.ts                 ← Formatting, WhatsApp, helpers
│   ├── types/
│   │   └── index.ts                 ← TypeScript types + Kenya counties
│   └── middleware.ts                ← Admin route protection
├── database/
│   └── schema.sql                   ← Full PostgreSQL schema + RLS + indexes
├── public/
│   ├── manifest.json                ← PWA manifest
│   └── robots.txt                   ← SEO robots
├── .env.example                     ← Environment variables template
├── .env.local                       ← Your actual env vars (DO NOT COMMIT)
├── next.config.js                   ← Security headers + image config
├── tailwind.config.ts               ← Design system + custom animations
└── tsconfig.json
```

---

## 🚀 Quick Start

### Requirements
- **Node.js v18+** — https://nodejs.org
- **npm** (comes with Node.js)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
```
For local testing with mock data, you can leave Supabase values as placeholders.

### 3. Run development server
```bash
npm run dev
```

Open **http://localhost:3000** ✅

---

## 🌐 All Pages

| URL | Description |
|-----|-------------|
| `/` | Homepage with hero, categories, featured listings, map |
| `/search` | Universal search with filters |
| `/livestock` | Browse livestock |
| `/vet-services` | Vet services |
| `/feeds` | Animal feeds |
| `/products` | Farm products |
| `/item/:id` | Item detail + WhatsApp + inquiry form |
| `/request` | Farmer request form |
| `/about` | About AgriTech Solutions |
| `/contact` | Contact form |
| `/how-it-works` | How it works + FAQ |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin overview |
| `/admin/items` | Manage listings |
| `/admin/items/new` | Add new listing |
| `/admin/leads` | Customer inquiries |
| `/admin/requests` | Farmer requests |

**Admin demo credentials:**
- Email: `admin@agritechsolutions.co.ke`
- Password: `admin123`

---

## 🗄️ Supabase Setup (Production)

### 1. Create project
https://supabase.com → New Project → Region: **eu-west-2** (closest to Kenya)

### 2. Run the schema
Dashboard → **SQL Editor** → paste `database/schema.sql` → **Run**

### 3. Create storage bucket
Dashboard → **Storage** → **New Bucket**:
- Name: `agritech-images`
- Public: ✅
- Allowed types: `image/jpeg, image/png, image/webp`
- Max size: `10 MB`

### 4. Get your API keys
Dashboard → **Settings** → **API**:
```
NEXT_PUBLIC_SUPABASE_URL      = Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY = anon / public key
SUPABASE_SERVICE_ROLE_KEY     = service_role key  ← KEEP SECRET
```

### 5. Switch to live data
In `src/lib/api.ts`, change:
```ts
const USE_MOCK = false;
```

---

## 📱 WhatsApp Setup

In `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=254768464997
```
Format: `254` + number without leading `0`. No `+`, no spaces.

**Example message generated:**
> Hello, I'm interested in *Friesian Dairy Cow – High Yielding* listed at *KES 85,000* in *Nkubu, Meru County*. Is it still available?
> View listing: https://agritechsolutions.co.ke/item/1

---

## 🚢 Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Initial commit: AgriTech Solutions"
git remote add origin https://github.com/yourusername/agritech-solutions.git
git push -u origin main

# 2. Deploy
# Go to vercel.com → New Project → Import your repo
# Add all .env.local variables in Vercel dashboard
# Click Deploy ✅
```

**Custom domain:** Vercel → Project Settings → Domains → `agritechsolutions.co.ke`

---

## 🔐 Production Authentication (Upgrade)

The current admin login uses a demo cookie. To use real Supabase auth:

1. Create admin user: Supabase Dashboard → Authentication → Users → Add User
2. Update `src/app/admin/login/page.tsx` — replace the demo block with:
```ts
const { createClient } = await import("@/lib/supabase");
const supabase = createClient();
const { error } = await supabase.auth.signInWithPassword({ email, password });
if (error) setError(error.message);
else router.push("/admin/dashboard");
```
3. Update `src/middleware.ts` to check `supabase.auth.getSession()` instead of the cookie.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (cookie-based) |
| Storage | Supabase Storage |
| Map | Leaflet.js + OpenStreetMap |
| Forms | React Hook Form + Zod |
| Hosting | Vercel |
| Icons | Lucide React |
| Notifications | Custom Toast system |

---

## ✅ Feature Checklist

| Feature | Status |
|---------|--------|
| Homepage hero + categories + featured + map | ✅ |
| 4 category pages (Livestock, Vet, Feeds, Products) | ✅ |
| Universal search with filters | ✅ |
| Item detail with image gallery + lightbox | ✅ |
| WhatsApp integration (dynamic messages) | ✅ |
| Inquiry / lead capture forms | ✅ |
| Farmer request system | ✅ |
| Interactive Leaflet map | ✅ |
| Admin dashboard with stats | ✅ |
| Admin CRUD for listings | ✅ |
| Admin leads management | ✅ |
| Admin requests management | ✅ |
| About / Contact / How It Works pages | ✅ |
| Privacy Policy + Terms of Service | ✅ |
| SEO: sitemap, robots.txt, Open Graph | ✅ |
| PWA manifest | ✅ |
| Mobile-first responsive design | ✅ |
| Route protection (admin middleware) | ✅ |
| Toast notifications | ✅ |
| Loading states + error boundaries | ✅ |
| TypeScript throughout | ✅ |
| Supabase integration ready | ✅ |
| 16 mock listings (works offline) | ✅ |

---

Built with ❤️ for Kenyan Farmers 🇰🇪 | **AgriTech Solutions** | 0768 464 997
