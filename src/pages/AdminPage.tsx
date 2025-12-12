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

type LoginForm = { password: string };

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filtered, setFiltered] = useState<Applicant[]>([]);
  const { register, handleSubmit } = useForm<LoginForm>();

  // Check login on mount
  useEffect(() => {
    if (localStorage.getItem('admin-token') === 'authenticated') {
      setIsAuthenticated(true);
      fetchApplicants();
    }
  }, []);

  const fetchApplicants = async () => {
    const { data } = await supabase
      .from('applicants')
      .select('*')
      .order('created_at', { ascending: false });
    setApplicants(data || []);
    setFiltered(data || []);
  };

  const onLogin = (data: LoginForm) => {
    if (data.password === process.env.REACT_APP_ADMIN_PASSWORD) {
      localStorage.setItem('admin-token', 'authenticated');
      setIsAuthenticated(true);
      fetchApplicants();
    } else {
      alert('Password salah!');
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'ignored') => {
    await supabase.from('applicants').update({ status }).eq('id', id);
    fetchApplicants();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((term: string) => {
      if (!term) return setFiltered(applicants);
      const lower = term.toLowerCase();
      setFiltered(
        applicants.filter(
          (a) =>
            a.name.toLowerCase().includes(lower) ||
            a.email.toLowerCase().includes(lower) ||
            a.position.toLowerCase().includes(lower)
        )
      );
    }, 300),
    [applicants]
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-600 mb-6">Login Admin HR</h2>
          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            <input
              {...register('password', { required: true })}
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-yellow-600">DASHBOARD HR</h1>
        <button
          onClick={() => {
            localStorage.removeItem('admin-token');
            window.location.reload();
          }}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Cari nama / email / posisi..."
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-lg"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Deskripsi</th>
              <th className="p-4 text-left">Posisi</th>
              <th className="p-4 text-left">Resume</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{a.name}</td>
                <td className="p-4">{a.email}</td>
                <td className="p-4">{a.message}</td>
                <td className="p-4">{a.position}</td>
                <td className="p-4">
                  <a
                    href={a.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Lihat CV
                  </a>
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(a.created_at).toLocaleDateString('id-ID')}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                <td className="p-4 text-center">
                  {a.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(a.id, 'approved')}
                        className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => updateStatus(a.id, 'ignored')}
                        className="bg-gray-500 text-white px-4 py-1 rounded"
                      >
                        Abaikan
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-10 text-gray-500">Belum ada lamaran masuk.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;