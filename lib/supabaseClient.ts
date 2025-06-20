import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wvdkebofcttqjehkxjji.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZGtlYm9mY3R0cWplaGt4amppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NDkxMzcsImV4cCI6MjA2NjAyNTEzN30.jugfb1AgJT95lgMUTXHW3d7Sq_Xa2JBmlCjvcQs5M-I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);