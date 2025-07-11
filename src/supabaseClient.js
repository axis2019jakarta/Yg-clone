import { createClient } from '@supabase/supabase-js'

// Ambil variabel dari file .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Buat dan ekspor klien Supabase untuk digunakan di komponen lain
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
