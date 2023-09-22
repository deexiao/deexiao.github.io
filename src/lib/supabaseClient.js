import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://zamyvhhsclvooccinpdk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbXl2aGhzY2x2b29jY2lucGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3NTU3NjgsImV4cCI6MjAwOTMzMTc2OH0.TWkGXrzQqZ_3hqbJmNfM1bD_0QcuWOjyHkcufTlA-vg'
)
