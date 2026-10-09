-- AgriTech Solutions Kenya - Supabase PostgreSQL Schema V2
-- Multi-seller Marketplace with Ordering and Profiles

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name   TEXT,
  role        TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('admin','seller','buyer')),
  phone       TEXT,
  county      TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Items
CREATE TABLE IF NOT EXISTS items (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id        UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL,
  price            NUMERIC(12,2) NOT NULL,
  price_unit       TEXT,
  category         TEXT NOT NULL CHECK (category IN ('livestock','vet','feeds','products')),
  sub_category     TEXT,
  location         TEXT NOT NULL,
  county           TEXT NOT NULL,
  images           TEXT[] DEFAULT '{}',
  status           TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','sold','reserved')),
  featured         BOOLEAN DEFAULT false,
  seller_name      TEXT,
  seller_phone     TEXT,
  latitude         DOUBLE PRECISION,
  longitude        DOUBLE PRECISION,
  views            INTEGER DEFAULT 0,
  -- Livestock
  breed            TEXT,
  age_months       INTEGER,
  weight_kg        NUMERIC(8,2),
  gender           TEXT CHECK (gender IN ('male','female','mixed')),
  -- Vet
  vet_specialization TEXT,
  vet_qualifications TEXT,
  -- Feeds
  feed_weight_kg   NUMERIC(8,2),
  feed_composition TEXT,
  -- Products
  product_quantity NUMERIC(10,2),
  product_unit     TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id     UUID REFERENCES items(id) ON DELETE SET NULL,
  item_title  TEXT NOT NULL,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  message     TEXT,
  status      TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Farmer requests
CREATE TABLE IF NOT EXISTS farmer_requests (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  category    TEXT NOT NULL CHECK (category IN ('livestock','vet','feeds','products')),
  description TEXT NOT NULL,
  location    TEXT NOT NULL,
  county      TEXT NOT NULL,
  budget      TEXT,
  status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','responded','closed')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id          UUID REFERENCES items(id) ON DELETE SET NULL,
  buyer_id         UUID REFERENCES auth.users ON DELETE SET NULL,
  seller_id        UUID REFERENCES auth.users ON DELETE SET NULL,
  status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total_price      NUMERIC(12,2) NOT NULL,
  quantity         NUMERIC(10,2) DEFAULT 1,
  delivery_address TEXT,
  buyer_name       TEXT,
  buyer_phone      TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER items_updated_at BEFORE UPDATE ON items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Views
CREATE OR REPLACE FUNCTION increment_views(item_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE items SET views = views + 1 WHERE id = item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS
ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE items            ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads            ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmer_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders           ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Item Policies
CREATE POLICY "Public can view available items" ON items FOR SELECT USING (status = 'available');
CREATE POLICY "Sellers can manage their own items" ON items FOR ALL USING (auth.uid() = seller_id);
CREATE POLICY "Admins can manage all items" ON items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Lead Policies
CREATE POLICY "Anyone can submit a lead" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Sellers can view leads for their items" ON leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM items WHERE items.id = leads.item_id AND items.seller_id = auth.uid())
);

-- Request Policies
CREATE POLICY "Anyone can submit a request" ON farmer_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all requests" ON farmer_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Order Policies
CREATE POLICY "Buyers can view their own orders" ON orders FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Sellers can view orders for their items" ON orders FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Anyone can create an order" ON orders FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS items_category_idx   ON items(category);
CREATE INDEX IF NOT EXISTS items_county_idx     ON items(county);
CREATE INDEX IF NOT EXISTS items_status_idx     ON items(status);
CREATE INDEX IF NOT EXISTS items_featured_idx   ON items(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS items_seller_idx     ON items(seller_id);
CREATE INDEX IF NOT EXISTS orders_buyer_idx      ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS orders_seller_idx     ON orders(seller_id);
