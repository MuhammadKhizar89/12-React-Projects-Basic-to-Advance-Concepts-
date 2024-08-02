import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://frkrcvjldktljtvtturi.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZya3JjdmpsZGt0bGp0dnR0dXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNzE4ODUsImV4cCI6MjAzNzY0Nzg4NX0.f3fM-CIceHOWfno_jjHJjMD7MYQVB3vzEUKNcP0l8Io";
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;