import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://agmdnxboxifdvzcuhnol.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbWRueGJveGlmZHZ6Y3Vobm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzc3ODEsImV4cCI6MjA1OTk1Mzc4MX0.nGe-6E_cpz_VsLRgRh30rJPF_VqqJOHJemIte8PmMy8";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;