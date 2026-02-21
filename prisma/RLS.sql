-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "App" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UrlShort" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClickTracker" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Endpoint" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WebhookRequest" ENABLE ROW LEVEL SECURITY;

-- User Table Policies
-- Users can only read and update their own profile
CREATE POLICY "Users can view own profile" ON "User" FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can update own profile" ON "User" FOR UPDATE USING (auth.uid()::text = id);

-- App Table Policies
-- Users can only see and manage their own apps
CREATE POLICY "Users can manage own apps" ON "App" FOR ALL USING (auth.uid()::text = "userId");

-- UrlShort Table Policies
-- Users can manage their own short links
CREATE POLICY "Users can manage own urls" ON "UrlShort" FOR ALL USING (auth.uid()::text = "userId");

-- ClickTracker Table Policies
-- Users can see clicks for their own links
CREATE POLICY "Users can view own clicks" ON "ClickTracker" FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "UrlShort" WHERE "UrlShort".id = "ClickTracker"."urlId" AND "UrlShort"."userId" = auth.uid()::text
  )
);

-- Endpoint/Webhook Policies
CREATE POLICY "Users can manage own endpoints" ON "Endpoint" FOR ALL USING (auth.uid()::text = "userId");
CREATE POLICY "Users can view own webhook requests" ON "WebhookRequest" FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "Endpoint" WHERE "Endpoint".id = "WebhookRequest"."endpointId" AND "Endpoint"."userId" = auth.uid()::text
  )
);

-- NOTE: Since you are using a custom session manager with Redis, 
-- you need to ensure that your Prisma queries pass the session user id correctly.
-- If you want to use Supabase Auth's auth.uid(), you would need to use Supabase's auth helpers.
-- Since you are using a custom auth, these RLS policies are templates.
-- If you want THE MOST SECURE production setup, consider moving to Supabase Auth 
-- or implementing a custom Postgres function to set the current user context in your Prisma transactions.
