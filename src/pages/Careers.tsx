import { useEffect, useState } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import { supabase } from '../supabaseClient';

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  requirements: string | null;
  type: string | null;
  created_at: string;
  is_active: boolean;
};

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Lowongan Tersedia
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan posisi yang sesuai dengan keahlian dan minat Anda. Bergabunglah dengan tim profesional kami.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="loading-spinner mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat lowongan...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <p className="text-xl text-gray-600">Belum ada lowongan tersedia saat ini.</p>
            <p className="text-gray-500 mt-2">Silakan cek kembali nanti.</p>
          </div>
        ) : (
          <>
            {/* Job List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-l-4 border-teal-600 hover:shadow-2xl transition-all duration-300 animate-fadeInUp hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1 pr-2">
                      {job.title}
                    </h2>
                    {job.type && (
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        {job.type}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span className="text-sm sm:text-base">{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="font-bold text-teal-600 text-sm sm:text-base">{job.salary}</span>
                      </div>
                    )}
                  </div>

                  {job.description && (
                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                      {job.description.length > 150 
                        ? `${job.description.substring(0, 150)}...` 
                        : job.description}
                    </p>
                  )}

                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full mt-5 bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition transform hover:scale-105 shadow-lg"
                  >
                    Lihat Detail & Lamar
                  </button>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl animate-fadeInUp">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                  Lamar Sekarang
                </h2>
                {selectedJob && (
                  <div className="inline-block px-4 py-2 bg-teal-50 border border-teal-200 rounded-full">
                    <p className="text-sm sm:text-base text-teal-700">
                      Melamar untuk: <span className="font-bold">{selectedJob.title}</span>
                    </p>
                  </div>
                )}
                <p className="text-gray-600 mt-4 text-sm sm:text-base">
                  Isi formulir di bawah ini untuk mengirim lamaran Anda
                </p>
              </div>

              <ApplicationForm selectedJobId={selectedJob?.id || null} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Careers;
