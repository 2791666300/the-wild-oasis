
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://nigpsmwnswoxbsyvxghy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZ3BzbXduc3dveGJzeXZ4Z2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNjA4MDYsImV4cCI6MjAwNzgzNjgwNn0.g66Mr4-et41_qIb7i5Rd8I-pBOFoTeQ00Ex5zw4IwyE'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase