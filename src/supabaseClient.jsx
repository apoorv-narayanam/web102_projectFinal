import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iibhnvbfnpaicaliwlvp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpYmhudmJmbnBhaWNhbGl3bHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDcwNjEsImV4cCI6MjA0NzUyMzA2MX0.sUz0AUbnuJi_G1MuF1yRooAHqYBCKG2QInzCncu_6Ms'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)