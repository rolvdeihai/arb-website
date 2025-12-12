const Contact = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Hubungi Kami</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Alamat</h3>
                <p className="text-gray-600">Jl. Sudirman No. 123, Jakarta Selatan</p>
              </div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-600">hello@ARB.id</p>
              </div>
              <div>
                <h3 className="font-bold">Telepon</h3>
                <p className="text-gray-600">(021) 1234-5678</p>
              </div>
              <div>
                <h3 className="font-bold">Jam Operasional</h3>
                <p className="text-gray-600">Senin - Jumat: 09:00 - 18:00</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 border rounded-lg"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block mb-2">Pesan</label>
                <textarea 
                  className="w-full p-3 border rounded-lg h-32"
                  placeholder="Tulis pesan Anda..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;