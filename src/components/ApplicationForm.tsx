import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../supabaseClient';

type FormData = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume_url: string;
};

type Job = {
  id: string;
  title: string;
  is_active: boolean;
};

type ApplicationFormProps = {
  selectedJobId?: string | null;
};

const ApplicationForm = ({ selectedJobId }: ApplicationFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (selectedJobId) {
      setValue('position', selectedJobId);
    }
  }, [selectedJobId, setValue]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title, is_active')
        .eq('is_active', true)
        .order('title', { ascending: true });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Get job title for position field
      const selectedJob = jobs.find(j => j.id === data.position);
      const positionTitle = selectedJob ? selectedJob.title : data.position;

      // Insert application to database with resume URL
      const { error: dbError } = await supabase.from('applicants').insert({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        position: positionTitle,
        message: data.message || null,
        resume_url: data.resume_url.trim(),
        job_id: data.position || null,
      });

      if (dbError) throw dbError;

      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengirim lamaran. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto grid grid-cols-1 gap-6"
    >
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl animate-fadeInUp">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p className="font-semibold">Lamaran berhasil dikirim!</p>
              <p className="text-sm">Terima kasih telah melamar. Kami akan menghubungi Anda segera.</p>
            </div>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="font-semibold text-gray-900 mb-2 block">Nama Lengkap *</label>
        <input
          {...register('name', { required: 'Nama wajib diisi' })}
          placeholder="Nama lengkap"
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 bg-white transition"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="font-semibold text-gray-900 mb-2 block">Email *</label>
        <input
          {...register('email', { 
            required: 'Email wajib diisi',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Format email tidak valid'
            }
          })}
          type="email"
          placeholder="email@example.com"
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 bg-white transition"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="font-semibold text-gray-900 mb-2 block">Nomor Telepon</label>
        <input
          {...register('phone')}
          placeholder="08xxxxxxxxxx"
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 bg-white transition"
        />
      </div>

      {/* Position */}
      <div>
        <label className="font-semibold text-gray-900 mb-2 block">Posisi yang Dilamar *</label>
        <select
          {...register('position', { required: 'Pilih posisi yang ingin dilamar' })}
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 transition"
        >
          <option value="">Pilih posisi</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="font-semibold text-gray-900 mb-2 block">Pesan Tambahan</label>
        <textarea
          {...register('message')}
          placeholder="Ceritakan tentang diri Anda atau alasan melamar (opsional)"
          rows={4}
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl resize-none bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 transition"
        />
      </div>

      {/* Resume URL */}
      <div>
        <label className="font-semibold text-gray-900 mb-2 block">Link CV / Resume *</label>
        <input
          {...register('resume_url', { 
            required: 'Link CV/Resume wajib diisi',
            pattern: {
              value: /^https?:\/\/.+/i,
              message: 'Format URL tidak valid. Harus dimulai dengan http:// atau https://'
            }
          })}
          type="url"
          placeholder="https://drive.google.com/file/... atau https://..."
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 bg-white transition"
        />
        <p className="text-xs text-gray-500 mt-2">
          Masukkan link CV/Resume Anda (Google Drive, Dropbox, atau hosting lainnya)
        </p>
        {errors.resume_url && <p className="text-red-500 text-sm mt-1">{errors.resume_url.message}</p>}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal-600 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg hover:bg-teal-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Mengirim...
          </span>
        ) : (
          'Kirim Lamaran'
        )}
      </button>

    </form>
  );
};

export default ApplicationForm;
