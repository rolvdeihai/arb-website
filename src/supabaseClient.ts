import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://syqynbhiundigknrsuny.supabase.co';  // Replace with yours
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cXluYmhpdW5kaWdrbnJzdW55Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTI1NDgyOSwiZXhwIjoyMDgwODMwODI5fQ.TmY_g8h-yTROyyWlh8Mm57gPxdL_TdAYZyLwru3L4J8';  // Replace with yours

export const supabase = createClient(supabaseUrl, supabaseAnonKey);