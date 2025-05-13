import { createClient } from '@supabase/supabase-js';

const supabaseurl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseurl, supabaseKey);

export default supabase;
