import { createClient } from "@supabase/supabase-js";
// Configuración de Supabase utilizando las variables de entorno
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);