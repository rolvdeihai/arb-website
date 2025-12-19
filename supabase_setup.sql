-- ============================================
-- SUPABASE DATABASE SETUP SCRIPT
-- Run this in Supabase SQL Editor
-- This script is safe to run multiple times
-- ============================================

-- 1. Create 'jobs' table for job postings
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    salary TEXT,
    requirements TEXT,
    type TEXT, -- 'Full-time', 'Part-time', 'Contract', 'Freelance'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1b. Create 'contacts' table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add missing columns to 'applicants' table if they don't exist
-- Note: Your existing table already has: id, name, email, phone, position, message, resume_url, created_at, status
-- We only need to add 'job_id' if it doesn't exist

-- Check and add 'job_id' column (foreign key to jobs) - This is the only missing column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'applicants' 
        AND column_name = 'job_id'
    ) THEN
        ALTER TABLE public.applicants ADD COLUMN job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL;
        RAISE NOTICE 'Added job_id column to applicants table';
    ELSE
        RAISE NOTICE 'job_id column already exists in applicants table';
    END IF;
END $$;

-- Verify existing columns exist (just for safety, won't add if they exist)
-- These should already exist based on your data, but we check to be safe

-- Check 'message' column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'applicants' 
        AND column_name = 'message'
    ) THEN
        ALTER TABLE public.applicants ADD COLUMN message TEXT;
        RAISE NOTICE 'Added message column to applicants table';
    END IF;
END $$;

-- Check 'resume_url' column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'applicants' 
        AND column_name = 'resume_url'
    ) THEN
        ALTER TABLE public.applicants ADD COLUMN resume_url TEXT;
        RAISE NOTICE 'Added resume_url column to applicants table';
    END IF;
END $$;

-- Check 'status' column and add constraint if needed
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'applicants' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE public.applicants ADD COLUMN status TEXT DEFAULT 'pending';
        RAISE NOTICE 'Added status column to applicants table';
    END IF;
    
    -- Add check constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_schema = 'public' 
        AND table_name = 'applicants' 
        AND constraint_name = 'applicants_status_check'
    ) THEN
        ALTER TABLE public.applicants 
        ADD CONSTRAINT applicants_status_check 
        CHECK (status IN ('pending', 'approved', 'ignored'));
        RAISE NOTICE 'Added status check constraint';
    END IF;
END $$;

-- Check 'created_at' column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'applicants' 
        AND column_name = 'created_at'
    ) THEN
        ALTER TABLE public.applicants ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added created_at column to applicants table';
    END IF;
END $$;

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applicants_job_id ON public.applicants(job_id);
CREATE INDEX IF NOT EXISTS idx_applicants_status ON public.applicants(status);
CREATE INDEX IF NOT EXISTS idx_applicants_created_at ON public.applicants(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_priority ON public.contacts(priority);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- 4. Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 5. Create policies for public read access to jobs (so users can see job listings)
CREATE POLICY "Allow public read access to active jobs" 
    ON public.jobs FOR SELECT 
    USING (is_active = true);

-- 6. Create policies for applicants (allow insert, but restrict read/update to admins)
-- Note: You'll need to set up authentication for admin access
CREATE POLICY "Allow public insert to applicants" 
    ON public.applicants FOR INSERT 
    WITH CHECK (true);

-- 6b. Create policies for contacts (allow public insert)
CREATE POLICY "Allow public insert to contacts" 
    ON public.contacts FOR INSERT 
    WITH CHECK (true);

-- 7. Insert sample jobs (optional - you can delete this section if you don't want sample data)
-- Only insert if jobs table is empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.jobs LIMIT 1) THEN
        INSERT INTO public.jobs (title, description, location, salary, type, is_active) VALUES
        ('Software Developer', 'Mengembangkan aplikasi web dan mobile menggunakan teknologi modern. Diperlukan pengalaman dengan React, Node.js, dan database. Bertanggung jawab untuk mengembangkan fitur-fitur baru, memperbaiki bug, dan berkolaborasi dengan tim.', 'Bandar Lampung', 'Rp 5.000.000 - 8.000.000', 'Full-time', true),
        ('Marketing Manager', 'Mengelola strategi pemasaran digital dan offline. Diperlukan pengalaman dalam digital marketing dan manajemen tim. Membuat kampanye pemasaran, menganalisis data, dan meningkatkan brand awareness.', 'Bandar Lampung', 'Rp 6.000.000 - 10.000.000', 'Full-time', true),
        ('Sales Executive', 'Mencari dan mengembangkan klien baru. Diperlukan kemampuan komunikasi yang baik dan target-oriented. Membangun hubungan dengan klien, melakukan presentasi, dan mencapai target penjualan.', 'Bandar Lampung', 'Rp 3.000.000 - 5.000.000 + Komisi', 'Full-time', true),
        ('Programmer', 'Mengembangkan dan memelihara aplikasi software. Diperlukan pemahaman tentang programming languages seperti JavaScript, Python, atau Java. Bekerja dalam tim untuk menyelesaikan proyek-proyek teknologi.', 'Bandar Lampung', 'Rp 4.000.000 - 7.000.000', 'Full-time', true),
        ('Manager', 'Mengelola operasional harian dan memimpin tim. Diperlukan pengalaman manajemen dan kemampuan leadership. Bertanggung jawab untuk perencanaan strategis, koordinasi tim, dan pencapaian target perusahaan.', 'Bandar Lampung', 'Rp 7.000.000 - 12.000.000', 'Full-time', true);
        
        RAISE NOTICE 'Inserted sample jobs';
    ELSE
        RAISE NOTICE 'Jobs table already has data, skipping sample insert';
    END IF;
END $$;

-- ============================================
-- STORAGE BUCKET SETUP
-- Go to Storage > Create Bucket > Name: "resumes"
-- Then run this to set public access (or keep it private and use signed URLs)
-- ============================================

-- Note: Storage buckets need to be created via Supabase Dashboard:
-- 1. Go to Storage section in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name: "resumes"
-- 4. Public: false (recommended for privacy)
-- 5. File size limit: 5MB (recommended)
-- 6. Allowed MIME types: application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document

