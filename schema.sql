-- GreenLeaf Community Garden Volunteer Portal
-- Database schema

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    date DATE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    location TEXT
);

-- Volunteers table
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    event_id UUID REFERENCES public.events(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    phone TEXT
);