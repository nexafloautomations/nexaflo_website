const SUPABASE_URL = 'https://lrwsjsmaqnihqhthgewe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxyd3Nqc21hcW5paHFodGhnZXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTUyMTQsImV4cCI6MjA4NjczMTIxNH0.Ax7U776-PjoGyrkCGvI0e8pfK5VcG4MxE2CXPyVMwiw';

// Robust Initialization
function initSupabase() {
    if (window.supabaseClient) return window.supabaseClient;

    if (window.supabase && window.supabase.createClient) {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Supabase Client Initialized");
        return window.supabaseClient;
    } else {
        console.error("Supabase CDN not loaded yet.");
        return null;
    }
}

// Try to init immediately
initSupabase();

// Expose init function globally in case we need to retry
window.initSupabase = initSupabase;
