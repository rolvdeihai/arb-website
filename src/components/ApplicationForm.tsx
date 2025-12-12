import { useForm } from 'react-hook-form';
import { supabase } from '../supabaseClient';

type FormData = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume: FileList;
};

const ApplicationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const file = data.resume[0];

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(`${Date.now()}_${file.name}`, file);

      if (uploadError) throw uploadError;

      const resumeUrl =
        supabase.storage.from('resumes').getPublicUrl(uploadData.path).data.publicUrl;

      const { error: dbError } = await supabase.from('applicants').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        message: data.message,
        resume_url: resumeUrl,
      });

      if (dbError) throw dbError;

      alert('Lamaran berhasil dikirim!');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengirim lamaran.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto grid grid-cols-1 gap-6 bg-sjp-blue/5 p-8 rounded-2xl shadow-xl"
    >

      {/* Name */}
      <div>
        <label className="font-semibold text-sjp-blue">Nama Lengkap *</label>
        <input
          {...register('name', { required: true })}
          placeholder="Nama lengkap"
          className="w-full p-3 border-2 border-sjp-blue/40 rounded-xl focus:border-sjp-blue focus:ring-2 focus:ring-sjp-blue/40 bg-white"
        />
        {errors.name && <p className="text-red-500 text-sm">Nama wajib diisi</p>}
      </div>

      {/* Email */}
      <div>
        <label className="font-semibold text-sjp-blue">Email *</label>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          className="w-full p-3 border-2 border-sjp-blue/40 rounded-xl focus:border-sjp-blue focus:ring-2 focus:ring-sjp-blue/40 bg-white"
        />
        {errors.email && <p className="text-red-500 text-sm">Email wajib diisi</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="font-semibold text-sjp-blue">Nomor Telepon</label>
        <input
          {...register('phone')}
          placeholder="08xxxxxxxxxx"
          className="w-full p-3 border-2 border-sjp-blue/40 rounded-xl focus:border-sjp-blue focus:ring-2 focus:ring-sjp-blue/40 bg-white"
        />
      </div>

      {/* Position */}
      <div>
        <label className="font-semibold text-sjp-blue">Posisi yang Dilamar *</label>
        <select
          {...register('position', { required: true })}
          className="w-full p-3 border-2 border-sjp-blue/40 rounded-xl bg-white focus:border-sjp-blue focus:ring-2 focus:ring-sjp-blue/40"
        >
          <option value="">Pilih posisi</option>
          <option value="Programmer">Programmer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.position && <p className="text-red-500 text-sm">Pilih posisi</p>}
      </div>

      {/* Message */}
      <div>
        <label className="font-semibold text-sjp-blue">Pesan Tambahan</label>
        <textarea
          {...register('message')}
          placeholder="Pesan tambahan (opsional)"
          className="w-full p-3 border-2 border-sjp-blue/40 rounded-xl h-32 resize-none bg-white focus:border-sjp-blue focus:ring-2 focus:ring-sjp-blue/40"
        />
      </div>

      {/* Resume */}
      <div>
        <label className="font-semibold text-sjp-blue">Upload CV / Resume *</label>
        <input
          {...register('resume', { required: true })}
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full p-3 border-2 border-sjp-blue/40 rounded-xl bg-white"
        />
        {errors.resume && <p className="text-red-500 text-sm">Resume wajib diupload</p>}
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-sjp-blue text-white font-bold py-4 rounded-full text-lg shadow-lg hover:bg-sjp-yellow hover:text-sjp-blue transition"
      >
        Kirim Lamaran
      </button>

    </form>
  );
};

export default ApplicationForm;
