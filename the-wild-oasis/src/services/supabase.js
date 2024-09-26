import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://frkrcvjldktljtvtturi.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZya3JjdmpsZGt0bGp0dnR0dXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjA3MTg4NSwiZXhwIjoyMDM3NjQ3ODg1fQ.yP9abYWonGwLQeRJ18HcHfcjY6V_BLFgjAx5nHiy8fM";
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;