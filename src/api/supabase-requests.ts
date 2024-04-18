import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../utils/ApiKeys";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
