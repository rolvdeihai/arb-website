-- ============================================
-- VERIFICATION SCRIPT
-- Run this AFTER running supabase_setup.sql
-- This will show you what tables and columns exist
-- ============================================

-- Check if jobs table exists and show structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'jobs'
ORDER BY ordinal_position;

-- Check applicants table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'applicants'
ORDER BY ordinal_position;

-- Check if foreign key exists
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_name = 'applicants'
AND kcu.column_name = 'job_id';

-- Count records in each table
SELECT 
    'jobs' AS table_name,
    COUNT(*) AS record_count
FROM public.jobs
UNION ALL
SELECT 
    'applicants' AS table_name,
    COUNT(*) AS record_count
FROM public.applicants;

-- Show sample jobs (if any)
SELECT id, title, location, is_active, created_at
FROM public.jobs
ORDER BY created_at DESC
LIMIT 5;

