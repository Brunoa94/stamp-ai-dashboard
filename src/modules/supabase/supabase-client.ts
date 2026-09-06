import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types.js";

export const SupabaseClient = createClient<Database>(
  process.env.SUPABASE_API_DOMAIN || "",
  process.env.SUPABASE_PUBLISHABLE_KEY || "",
);
