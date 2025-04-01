import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://jwhybdelwblaonsjhauy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3aHliZGVsd2JsYW9uc2poYXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTc1NDQsImV4cCI6MjA1NTkzMzU0NH0.Sy7fejAp23HEGKLCY6Yc97IjVQFnchzZlwKuVYXaLlQ'
)
