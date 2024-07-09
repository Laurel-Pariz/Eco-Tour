import { createClient } from "@supabase/supabase-js";

const publicAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZWd5Y2xuZ2ppdmhzem5kd2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1MTAzMzMsImV4cCI6MjAzNjA4NjMzM30.H4x1FHpVJNna45vlfMESQ5K74Ezj3kjklk1E8ht48ok";
const appLink = "https://tlegyclngjivhszndwcp.supabase.co";

// Create a single supabase client for interacting with your database
export const supabase = createClient(appLink, publicAnonKey);

export const supabaseAuth = supabase.auth;
