// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zvwtmkouonvgjfgllnsb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2d3Rta291b252Z2pmZ2xsbnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MDk1ODQsImV4cCI6MjA2OTE4NTU4NH0.EVg52ExfPuk7wpRPjVDZRXmnXAUPIbSpBmy6mUIm1u4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});