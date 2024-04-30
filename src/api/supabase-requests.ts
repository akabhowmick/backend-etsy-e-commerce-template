import { createClient } from '@supabase/supabase-js';
import { VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } from '../utils/ApiKeys';

const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);