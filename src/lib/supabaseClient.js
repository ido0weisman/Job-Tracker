import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // surfaces a clear error instead of a confusing failure deep inside the supabase-js client
  throw new Error(
    'missing supabase env vars. copy .env.example to .env and fill in your project URL and anon key.',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
