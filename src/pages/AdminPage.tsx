// src/pages/AdminPage.tsx
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';

type Applicant = {
  id: string;
  name: string;
  email: string;
  phone: string | '';
  position: string;
  message: string | null;
  resume_url: string;
  created_at: string;
  status: 'pending' | 'approved' | 'ignored';
};

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

type Contact = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
};

type LoginForm = { password: string };
type JobForm = {
  title: string;
  description: string;
  location: string;
  salary: string;
  requirements: string;
  type: string;
  is_active: boolean;
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'applicants' | 'jobs' | 'contacts'>('applicants');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filtered, setFiltered] = useState<Applicant[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'ignored'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; applicantId: string | null; applicantName: string }>({ show: false, applicantId: null, applicantName: '' });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactPriorityFilter, setContactPriorityFilter] = useState<'all' | 'low' | 'normal' | 'high' | 'urgent'>('all');
  const [contactDeleteConfirm, setContactDeleteConfirm] = useState<{ show: boolean; contactId: string | null; contactName: string }>({ show: false, contactId: null, contactName: '' });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { register: registerLogin, handleSubmit: handleLoginSubmit } = useForm<LoginForm>();
  const { register: registerJob, handleSubmit: handleJobSubmit, reset: resetJobForm, setValue } = useForm<JobForm>();

  // Always require password on page load - clear any existing session
  useEffect(() => {
    // Clear any existing authentication token to force password entry
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    if (editingJob) {
      setValue('title', editingJob.title);
      setValue('description', editingJob.description);
      setValue('location', editingJob.location);
      setValue('salary', editingJob.salary);
      setValue('requirements', editingJob.requirements || '');
      setValue('type', editingJob.type || '');
      setValue('is_active', editingJob.is_active);
    }
  }, [editingJob, setValue]);

  const fetchApplicants = async () => {
    const { data } = await supabase
      .from('applicants')
      .select('*')
      .order('created_at', { ascending: false });
    setApplicants(data || []);
    applyFilters(data || [], searchTerm, statusFilter);
  };

  const applyFilters = (data: Applicant[], search: string, status: 'all' | 'pending' | 'approved' | 'ignored') => {
    let filtered = [...data];

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(a => a.status === status);
    }

    // Apply search filter
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(lower) ||
          a.email.toLowerCase().includes(lower) ||
          a.position.toLowerCase().includes(lower)
      );
    }

    setFiltered(filtered);
  };

  useEffect(() => {
    if (isAuthenticated) {
      applyFilters(applicants, searchTerm, statusFilter);
    }
  }, [statusFilter, searchTerm, applicants, isAuthenticated]);

  const fetchJobs = async () => {
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });
    setJobs(data || []);
  };

  const fetchContacts = async () => {
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    setContacts(data || []);
  };

  const onLogin = (data: LoginForm) => {
    if (data.password === process.env.REACT_APP_ADMIN_PASSWORD) {
      localStorage.setItem('admin-token', 'authenticated');
      setIsAuthenticated(true);
      fetchApplicants();
      fetchJobs();
      fetchContacts();
    } else {
      alert('Password salah!');
    }
  };

  const onJobSubmit = async (data: JobForm) => {
    try {
      if (editingJob) {
        await supabase
          .from('jobs')
          .update({
            title: data.title,
            description: data.description,
            location: data.location,
            salary: data.salary,
            requirements: data.requirements || null,
            type: data.type || null,
            is_active: data.is_active,
          })
          .eq('id', editingJob.id);
      } else {
        await supabase.from('jobs').insert({
          title: data.title,
          description: data.description,
          location: data.location,
          salary: data.salary,
          requirements: data.requirements || null,
          type: data.type || null,
          is_active: data.is_active,
        });
      }
      fetchJobs();
      setShowJobModal(false);
      setEditingJob(null);
      resetJobForm();
      alert(editingJob ? 'Lowongan berhasil diperbarui!' : 'Lowongan berhasil ditambahkan!');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan lowongan.');
    }
  };

  const deleteJob = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) return;
    try {
      await supabase.from('jobs').delete().eq('id', id);
      fetchJobs();
      alert('Lowongan berhasil dihapus!');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menghapus lowongan.');
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'ignored') => {
    await supabase.from('applicants').update({ status }).eq('id', id);
    fetchApplicants();
  };

  const deleteApplicant = async (id: string) => {
    try {
      const { error } = await supabase.from('applicants').delete().eq('id', id);
      if (error) throw error;
      fetchApplicants();
      setDeleteConfirm({ show: false, applicantId: null, applicantName: '' });
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };

  const updateContactPriority = async (id: string, priority: 'low' | 'normal' | 'high' | 'urgent') => {
    try {
      const { error } = await supabase.from('contacts').update({ priority }).eq('id', id);
      if (error) throw error;
      fetchContacts();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat memperbarui prioritas.');
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
      fetchContacts();
      setContactDeleteConfirm({ show: false, contactId: null, contactName: '' });
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menghapus pesan.');
    }
  };

  const handleDeleteClick = (applicant: Applicant) => {
    setDeleteConfirm({ 
      show: true, 
      applicantId: applicant.id, 
      applicantName: applicant.name 
    });
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((term: string) => {
      handleSearchChange(term);
    }, 300),
    []
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-600 mb-6">Login Admin HR</h2>
          <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
            <input
              {...registerLogin('password', { required: true })}
              type="password"
              placeholder="Password Admin"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl sm:text-4xl font-black text-teal-600">DASHBOARD HR</h1>
        <button
          onClick={() => {
            localStorage.removeItem('admin-token');
            setIsAuthenticated(false);
          }}
          className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-4 sm:px-6 py-3 font-semibold transition whitespace-nowrap ${
            activeTab === 'applicants'
              ? 'border-b-2 border-teal-600 text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Lamaran ({applicants.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 sm:px-6 py-3 font-semibold transition whitespace-nowrap ${
            activeTab === 'jobs'
              ? 'border-b-2 border-teal-600 text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Lowongan ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 sm:px-6 py-3 font-semibold transition whitespace-nowrap ${
            activeTab === 'contacts'
              ? 'border-b-2 border-teal-600 text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pesan Kontak ({contacts.length})
        </button>
      </div>

      {/* Applicants Tab */}
      {activeTab === 'applicants' && (
        <>
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Cari nama / email / posisi..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-base sm:text-lg"
            />
            
            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  statusFilter === 'all'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-teal-600'
                }`}
              >
                Semua ({applicants.length})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  statusFilter === 'pending'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-yellow-500'
                }`}
              >
                Menunggu ({applicants.filter(a => a.status === 'pending').length})
              </button>
              <button
                onClick={() => setStatusFilter('approved')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  statusFilter === 'approved'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500'
                }`}
              >
                Disetujui ({applicants.filter(a => a.status === 'approved').length})
              </button>
              <button
                onClick={() => setStatusFilter('ignored')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  statusFilter === 'ignored'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-500'
                }`}
              >
                Ditolak ({applicants.filter(a => a.status === 'ignored').length})
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Nama</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Email</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base hidden md:table-cell">Pesan</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Posisi</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Resume</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base hidden lg:table-cell">Tanggal</th>
                  <th className="p-3 sm:p-4 text-center text-sm sm:text-base">Status</th>
                  <th className="p-3 sm:p-4 text-center text-sm sm:text-base">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 sm:p-4 font-medium">{a.name}</td>
                    <td className="p-3 sm:p-4 text-sm">{a.email}</td>
                    <td className="p-3 sm:p-4 text-sm hidden md:table-cell">{a.message || '-'}</td>
                    <td className="p-3 sm:p-4">{a.position}</td>
                    <td className="p-3 sm:p-4">
                      <a
                        href={a.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 underline text-sm"
                      >
                        Lihat CV
                      </a>
                    </td>
                    <td className="p-3 sm:p-4 text-gray-600 text-sm hidden lg:table-cell">
                      {new Date(a.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          a.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : a.status === 'ignored'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {a.status === 'pending' ? 'Menunggu' : a.status === 'approved' ? 'Disetujui' : 'Diabaikan'}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                        {a.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(a.id, 'approved')}
                              className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded text-xs sm:text-sm hover:bg-green-600 transition"
                            >
                              Setujui
                            </button>
                            <button
                              onClick={() => updateStatus(a.id, 'ignored')}
                              className="bg-gray-500 text-white px-3 sm:px-4 py-1 rounded text-xs sm:text-sm hover:bg-gray-600 transition"
                            >
                              Tolak
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteClick(a)}
                          className="bg-red-500 text-white px-3 sm:px-4 py-1 rounded text-xs sm:text-sm hover:bg-red-600 transition"
                          title="Hapus"
                        >
                          <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center py-10 text-gray-500">Belum ada lamaran masuk.</p>
            )}
          </div>
        </>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                setEditingJob(null);
                resetJobForm();
                setShowJobModal(true);
              }}
              className="bg-teal-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-teal-700 transition font-semibold"
            >
              + Tambah Lowongan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-teal-600"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1">{job.title}</h3>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      job.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {job.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Lokasi:</strong> {job.location}
                </p>
                {job.salary && (
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Gaji:</strong> {job.salary}
                  </p>
                )}
                {job.type && (
                  <p className="text-gray-600 text-sm mb-4">
                    <strong>Tipe:</strong> {job.type}
                  </p>
                )}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingJob(job);
                      setShowJobModal(true);
                    }}
                    className="flex-1 bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-teal-700 transition text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
          {jobs.length === 0 && (
            <p className="text-center py-10 text-gray-500 bg-white rounded-xl">Belum ada lowongan.</p>
          )}
        </>
      )}

      {/* Contacts Tab */}
      {activeTab === 'contacts' && (
        <>
          {/* Priority Filter Buttons */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setContactPriorityFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  contactPriorityFilter === 'all'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-teal-600'
                }`}
              >
                Semua ({contacts.length})
              </button>
              <button
                onClick={() => setContactPriorityFilter('urgent')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  contactPriorityFilter === 'urgent'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-500'
                }`}
              >
                Urgent ({contacts.filter(c => c.priority === 'urgent').length})
              </button>
              <button
                onClick={() => setContactPriorityFilter('high')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  contactPriorityFilter === 'high'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
                }`}
              >
                Tinggi ({contacts.filter(c => c.priority === 'high').length})
              </button>
              <button
                onClick={() => setContactPriorityFilter('normal')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  contactPriorityFilter === 'normal'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500'
                }`}
              >
                Normal ({contacts.filter(c => c.priority === 'normal').length})
              </button>
              <button
                onClick={() => setContactPriorityFilter('low')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  contactPriorityFilter === 'low'
                    ? 'bg-gray-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-500'
                }`}
              >
                Rendah ({contacts.filter(c => c.priority === 'low').length})
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Nama</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Email</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base hidden md:table-cell">Subjek</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Pesan</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base hidden lg:table-cell">Tanggal</th>
                  <th className="p-3 sm:p-4 text-center text-sm sm:text-base">Prioritas</th>
                  <th className="p-3 sm:p-4 text-center text-sm sm:text-base">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {contacts
                  .filter(c => contactPriorityFilter === 'all' || c.priority === contactPriorityFilter)
                  .map((contact) => (
                  <tr key={contact.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 sm:p-4 font-medium">{contact.name}</td>
                    <td className="p-3 sm:p-4 text-sm">{contact.email}</td>
                    <td className="p-3 sm:p-4 text-sm hidden md:table-cell">{contact.subject || '-'}</td>
                    <td className="p-3 sm:p-4 text-sm">
                      <div className="max-w-xs">
                        <p className="truncate">{contact.message}</p>
                        <button
                          onClick={() => {
                            const fullMessage = contact.message;
                            alert(`Pesan lengkap dari ${contact.name}:\n\n${fullMessage}`);
                          }}
                          className="text-teal-600 hover:text-teal-700 text-xs mt-1 underline"
                        >
                          Lihat lengkap
                        </button>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 text-gray-600 text-sm hidden lg:table-cell">
                      {new Date(contact.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <select
                        value={contact.priority}
                        onChange={(e) => updateContactPriority(contact.id, e.target.value as 'low' | 'normal' | 'high' | 'urgent')}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border-2 transition ${
                          contact.priority === 'urgent'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : contact.priority === 'high'
                            ? 'bg-orange-100 text-orange-800 border-orange-300'
                            : contact.priority === 'normal'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-gray-100 text-gray-800 border-gray-300'
                        }`}
                      >
                        <option value="low">Rendah</option>
                        <option value="normal">Normal</option>
                        <option value="high">Tinggi</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                        <button
                          onClick={() => setContactDeleteConfirm({ show: true, contactId: contact.id, contactName: contact.name })}
                          className="bg-red-500 text-white px-3 sm:px-4 py-1 rounded text-xs sm:text-sm hover:bg-red-600 transition"
                          title="Hapus"
                        >
                          <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {contacts.filter(c => contactPriorityFilter === 'all' || c.priority === contactPriorityFilter).length === 0 && (
              <p className="text-center py-10 text-gray-500">Belum ada pesan kontak.</p>
            )}
          </div>
        </>
      )}

      {/* Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {editingJob ? 'Edit Lowongan' : 'Tambah Lowongan'}
                </h2>
                <button
                  onClick={() => {
                    setShowJobModal(false);
                    setEditingJob(null);
                    resetJobForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleJobSubmit(onJobSubmit)} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Judul Posisi *</label>
                  <input
                    {...registerJob('title', { required: true })}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40"
                    placeholder="Contoh: Software Developer"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Deskripsi *</label>
                  <textarea
                    {...registerJob('description', { required: true })}
                    rows={4}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 resize-none"
                    placeholder="Deskripsi lengkap tentang posisi..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">Lokasi *</label>
                    <input
                      {...registerJob('location', { required: true })}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40"
                      placeholder="Bandar Lampung"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">Gaji</label>
                    <input
                      {...registerJob('salary')}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40"
                      placeholder="Rp 5.000.000 - 8.000.000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">Tipe Pekerjaan</label>
                    <select
                      {...registerJob('type')}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40"
                    >
                      <option value="">Pilih tipe</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      {...registerJob('is_active')}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40"
                    >
                      <option value="true">Aktif</option>
                      <option value="false">Nonaktif</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Persyaratan</label>
                  <textarea
                    {...registerJob('requirements')}
                    rows={4}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 resize-none"
                    placeholder="Persyaratan yang dibutuhkan..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-semibold"
                  >
                    {editingJob ? 'Perbarui' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowJobModal(false);
                      setEditingJob(null);
                      resetJobForm();
                    }}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Applicants */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Hapus Lamaran?</h3>
                <p className="text-gray-600 text-sm mt-1">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 text-sm sm:text-base">
                Apakah Anda yakin ingin menghapus lamaran dari <strong>{deleteConfirm.applicantName}</strong>?
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Data yang dihapus tidak dapat dikembalikan.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm({ show: false, applicantId: null, applicantName: '' })}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.applicantId) {
                    deleteApplicant(deleteConfirm.applicantId);
                  }
                }}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Contacts */}
      {contactDeleteConfirm.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Hapus Pesan Kontak?</h3>
                <p className="text-gray-600 text-sm mt-1">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 text-sm sm:text-base">
                Apakah Anda yakin ingin menghapus pesan dari <strong>{contactDeleteConfirm.contactName}</strong>?
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Data yang dihapus tidak dapat dikembalikan.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setContactDeleteConfirm({ show: false, contactId: null, contactName: '' })}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (contactDeleteConfirm.contactId) {
                    deleteContact(contactDeleteConfirm.contactId);
                  }
                }}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;