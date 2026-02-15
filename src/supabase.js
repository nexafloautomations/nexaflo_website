// Supabase Configuration
// Check if window.supabase exists (CDN), otherwise it might be from npm in a build
const createClient = window.supabase ? window.supabase.createClient : null;

if (!createClient) {
    console.error('Supabase client not validation. Ensure the CDN script is loaded.');
}

const SUPABASE_URL = 'https://lrwsjsmaqnihqhthgewe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxyd3Nqc21hcW5paHFodGhnZXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTUyMTQsImV4cCI6MjA4NjczMTIxNH0.Ax7U776-PjoGyrkCGvI0e8pfK5VcG4MxE2CXPyVMwiw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
