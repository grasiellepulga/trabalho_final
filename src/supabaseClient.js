import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados no .env");
}

export const supabase = createClient(supabaseUrl, serviceRoleKey);
