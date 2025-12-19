import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ada pertanyaan atau ingin berdiskusi lebih lanjut? Jangan ragu untuk menghubungi kami.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div className="animate-fadeInLeft">
            <div className="bg-teal-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-teal-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Alamat</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Perintis Ruko Warna Hijau, Gg. Kesehatan<br />
                      Rajabasa Jaya, Kec. Rajabasa<br />
                      Kota Bandar Lampung, Lampung 35122
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Telepon</h3>
                    <p className="text-gray-600 text-sm sm:text-base">+62 812 3456 7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm sm:text-base">info@arb-recruitment.co.id</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Senin - Jumat: 08:00 - 17:00<br />
                      Sabtu: 08:00 - 12:00<br />
                      Minggu: Libur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="animate-fadeInRight">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;