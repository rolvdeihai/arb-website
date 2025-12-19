import { useState } from 'react';
import { supabase } from '../supabaseClient';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contacts').insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || null,
        message: formData.message,
        priority: 'normal', // Default priority
      });

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl animate-fadeInUp">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-sm font-medium">Terima kasih atas pesan Anda! Kami akan menghubungi Anda segera.</p>
          </div>
        </div>
      )}

      <div>
        <label className="block font-semibold text-gray-900 mb-2">Nama Lengkap *</label>
        <input 
          type="text" 
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 transition"
          placeholder="Masukkan nama Anda"
        />
      </div>
      <div>
        <label className="block font-semibold text-gray-900 mb-2">Email *</label>
        <input 
          type="email" 
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 transition"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label className="block font-semibold text-gray-900 mb-2">Subjek</label>
        <input 
          type="text" 
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 transition"
          placeholder="Subjek pesan (opsional)"
        />
      </div>
      <div>
        <label className="block font-semibold text-gray-900 mb-2">Pesan *</label>
        <textarea 
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl resize-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 transition"
          placeholder="Tulis pesan Anda..."
        ></textarea>
      </div>
      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal-600 text-white font-bold py-3 sm:py-4 px-6 rounded-xl hover:bg-teal-700 transition transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Mengirim...
          </span>
        ) : (
          'Kirim Pesan'
        )}
      </button>
    </form>
  );
};

export default ContactForm;

