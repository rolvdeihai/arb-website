import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Definisi komponen ContactForm secara lokal untuk menghindari error import
const ContactForm = () => {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
        <input 
          type="text" 
          id="name" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3 border" 
          placeholder="Masukkan nama Anda" 
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          id="email" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3 border" 
          placeholder="nama@email.com" 
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subjek</label>
        <input 
          type="text" 
          id="subject" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3 border" 
          placeholder="Subjek pesan" 
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
        <textarea 
          id="message" 
          rows={4} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3 border" 
          placeholder="Tulis pesan Anda di sini..."
        />
      </div>
      <button 
        type="submit" 
        className="w-full inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-3 px-4 text-sm font-bold text-white shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02]"
      >
        Kirim Pesan
      </button>
    </form>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // LOGIC FOR NAVBAR TRANSPARENCY ON SCROLL
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Referral tracking
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) {
        localStorage.setItem("arb_ref", ref);
        const expireAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
        localStorage.setItem("arb_ref_expires", String(expireAt));
      }
    } catch (e) {
      console.warn("URL params unavailable", e);
    }
  }, []);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section 
        className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: 'url(/Company.jpg)' }}
      >
        <div className="min-h-screen pt-32 sm:pt-40 bg-black/50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 text-center text-white">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight animate-slideUp drop-shadow-text">
              Bergabunglah dengan tim kami.
            </h1>

            <p className="mt-4 sm:mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="text-teal-600 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-xl animate-pulse drop-shadow-text">
                Bangun masa depan.
              </span>
            </p>

            <p className="mt-8 sm:mt-10 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 drop-shadow-text-light">
              Kami mencari talenta terbaik di berbagai posisi. Kirim CV-mu sekarang — proses kami cepat, transparan, dan profesional.
            </p>

            <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/karir")}
                className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-teal-600 text-white font-bold text-lg shadow-xl shadow-teal-600/40 hover:bg-teal-700 transition duration-300 transform hover:scale-105 drop-shadow-lg"
              >
                Lamar Sekarang →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE POINTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 sm:mt-20 py-8 grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { 
            step: "01", 
            title: "Visi Strategis", 
            desc: "Menjadi One Stop Outsourcing Solution yang andal dan terpercaya bagi mitra untuk mengembangkan bisnisnya" 
          },
          { 
            step: "02", 
            title: "Misi Berintegritas", 
            desc: "Mengembangkan sumber daya manusia untuk mencapai performa terbaik dan memberikan solusi terpadu bagi klien dalam mencapai tujuan perusahaan." 
          },
          { 
            step: "03", 
            title: "Ekosistem Transparan", 
            desc: "Menyediakan platform seleksi yang efisien, akuntabel, dan bebas dari bias dengan mekanisme evaluasi yang terstandardisasi." 
          },
        ].map(({ step, title, desc }, i) => (
          <div 
            key={i} 
            className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100 animate-fadeInUp hover-lift"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="text-4xl font-extrabold text-teal-600">{step}</div>
            <div className="font-bold text-xl sm:text-2xl text-gray-900 mt-3">{title}</div>
            <div className="text-gray-600 text-sm sm:text-base mt-2">{desc}</div>
          </div>
        ))}
      </div>

      {/* SECTION FOTO PROFESIONAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-20 sm:mt-28 py-10 sm:py-16">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center animate-fadeInUp">
          Ekosistem Kerja Profesional
        </h3>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700 max-w-5xl mx-auto text-center animate-fadeInUp delay-200">
          Lingkungan kerja yang dinamis dan kolaboratif mendukung pengembangan kompetensi dan pencapaian kinerja optimal
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Foto 1 */}
          <div className="relative group animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="/img1.jpeg" 
                alt="Tim Kolaboratif ARB" 
                className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-bold text-lg sm:text-xl text-gray-900">Kolaborasi Tim</h4>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Sinergi antar departemen dalam ekosistem kerja yang terintegrasi
              </p>
            </div>
          </div>
          
          {/* Foto 2 */}
          <div className="relative group animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="/img2.jpeg" 
                alt="Infrastruktur Modern ARB" 
                className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-bold text-lg sm:text-xl text-gray-900">Infrastruktur Modern</h4>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Fasilitas terkini untuk mendukung produktivitas dan inovasi maksimal
              </p>
            </div>
          </div>
          
          {/* Foto 3 */}
          <div className="relative group animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="/photo3.jpg" 
                alt="Pengembangan Kompetensi ARB" 
                className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-bold text-lg sm:text-xl text-gray-900">Pengembangan SDM</h4>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Program pengembangan kompetensi berkelanjutan untuk pertumbuhan karir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SALES & OPERATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-20 sm:mt-28 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* TEXT */}
          <div className="animate-fadeInLeft">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Sales & Operations Excellence
            </h3>

            <p className="mt-4 text-lg sm:text-xl text-gray-700 leading-relaxed">
              ARB siap melayani kebutuhan <strong>Sales</strong> dan <strong>Operations</strong> secara end-to-end 
              melalui pendekatan yang terstruktur, berbasis data, dan berorientasi pada hasil.
            </p>

            <p className="mt-4 text-gray-600 text-base sm:text-lg">
              Tim kami mendukung proses akuisisi klien, optimalisasi operasional, serta pengelolaan rekanan 
              dengan standar profesional tinggi guna memastikan pertumbuhan bisnis yang berkelanjutan.
            </p>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                <span>
                  <strong>Sales Enablement</strong> — strategi penjualan, manajemen prospek, dan peningkatan konversi.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                <span>
                  <strong>Operational Excellence</strong> — efisiensi proses, monitoring kinerja, dan kontrol kualitas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                <span>
                  <strong>Scalable Support</strong> — siap mendukung kebutuhan bisnis dari skala kecil hingga enterprise.
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <button
                onClick={() => navigate("/kontak")}
                className="px-8 py-3 rounded-full bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700 transition transform hover:scale-105"
              >
                Hubungi Tim Kami →
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="animate-fadeInRight">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/salesandoperations.jpg"
                alt="Sales and Operations Team"
                className="w-full h-72 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-8 mt-20 sm:mt-28 py-10 sm:py-16">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center animate-fadeInUp">
          Tentang Kami
        </h3>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700 max-w-5xl mx-auto text-center animate-fadeInUp delay-200">
          Perusahaan kami berdiri sejak tahun 2023,
          <br /><br />
          Perusahaan kami Bergerak Dibidang Pemasaran yang membantu para klien kami untuk memasarkan produknya.
          Kami juga memiliki jaringan relasi yang luas sehingga kami mampu memberukan pelayanan terbaik untuk dapat membantu para klien untuk bisa memasarkan produknya.
          <br /><br />
          Perusahaan kami juga selalu memberikan pelayanan yang terbaik untuk semua klien & memastikan memenuhi target yang ingin dicapai.
        </p>
      </section>

      {/* PROSES REKRUTMEN */}
      <section id="proses" className="mt-20 sm:mt-32 px-4 sm:px-8 py-10 sm:py-16 bg-teal-50">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center animate-fadeInUp">
          Proses Rekrutmen
        </h3>
        <p className="text-gray-600 text-center mt-3 text-base sm:text-lg animate-fadeInUp delay-100">
          Mekanisme seleksi yang terstruktur, efisien, dan berorientasi pada pencarian talenta terbaik
        </p>

        <div className="relative max-w-6xl mx-auto mt-12">
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gray-200 transform translate-y-1/2 z-0"></div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                step: "1", 
                title: "Submission & Profiling", 
                desc: "Pengisian formulir aplikasi digital dan unggah dokumen pendukung. Sistem kami melakukan automated parsing dan profiling untuk optimalisasi matching." 
              },
              { 
                step: "2", 
                title: "Assessment & Screening", 
                desc: "Proses evaluasi komprehensif melalui multiple assessment tools. Analisis kecocokan berbasis kompetensi, pengalaman, dan potensi pengembangan." 
              },
              { 
                step: "3", 
                title: "Interview & Finalization", 
                desc: "Sesi wawancara mendalam dengan panel ahli. Proses finalisasi dan onboarding preparation dengan sistem tracking yang transparan." 
              },
            ].map(({ step, title, desc }, i) => (
              <div 
                key={step} 
                className="p-6 bg-white shadow-xl rounded-2xl text-center relative z-10 animate-fadeInUp hover-lift"
                style={{ animationDelay: `${i * 300}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 rounded-full bg-teal-600 text-white text-xl font-bold">
                  {step}
                </div>
                <h4 className="font-bold text-xl sm:text-2xl mt-2 text-gray-900">{title}</h4>
                <p className="text-gray-600 text-sm sm:text-base mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS */}
      <section id="lokasi" className="mt-20 sm:mt-32 py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 animate-fadeInUp">
              Lokasi Kantor Kami
            </h3>
            <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto animate-fadeInUp delay-100">
              Kunjungi kantor pusat kami di lokasi strategis untuk konsultasi lebih lanjut
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Info Kontak */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6 animate-fadeInLeft">
              <div className="bg-teal-50 p-6 rounded-2xl shadow-lg border border-teal-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Informasi Kontak</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Alamat</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Perintis Ruko Warna Hijau, Gg. Kesehatan<br />
                        Rajabasa Jaya, Kec. Rajabasa<br />
                        Kota Bandar Lampung, Lampung 35122
                      </p>
                    </div>
                  </div>
                  
                  {/* ... other contact items ... */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Telepon</p>
                      <p className="text-gray-600 text-sm mt-1">+62 8136 3358 311</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600 text-sm mt-1">info@arb-recruitment.co.id</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Akses Transportasi</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                    <span>5 menit dari Jalan Lintas Sumatera</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                    <span>15 menit dari Bandar Udara Radin Inten II</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <div className="lg:col-span-2 animate-fadeInRight">
              <div className="relative h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-white/50 z-10 pointer-events-none"></div>
                <div className="relative w-full h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0379133193867!2d105.2540838!3d-5.3487085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjAnNTUuMyJTIDEwNcKwMTUnMTQuNyJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid&q=Perintis+Ruko+Warna+Hijau+Gg+Kesehatan+Rajabasa+Jaya+Bandar+Lampung"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title="ARB 2 Office Location"
                  ></iframe>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-teal-600">24/7</div>
                  <div className="text-sm text-gray-600">Security CCTV</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-teal-600">50+</div>
                  <div className="text-sm text-gray-600">Kapasitas Parkir</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-teal-600">WIFI</div>
                  <div className="text-sm text-gray-600">High Speed Internet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* TESTIMONIAL */}
      <section className="mt-20 sm:mt-32 bg-white py-16 sm:py-20 px-4 sm:px-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center animate-fadeInUp">
          Testimoni Mitra Strategis
        </h3>
        <p className="text-gray-600 text-center mt-3 text-base sm:text-lg animate-fadeInUp delay-100">
          Perspektif dari mitra yang telah mengalami transformasi bersama ekosistem ARB
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-14 max-w-7xl mx-auto">
          {[
            { 
              text: "Mekanisme seleksi yang sistematis dan transparan meningkatkan kualitas rekrutmen secara signifikan.", 
              author: "— Andi Wijaya, Director Logistic Solutions" 
            },
            { 
              text: "Platform ARB memberikan efisiensi operasional yang luar biasa dalam manajemen jaringan rekanan.", 
              author: "— Budi Santoso, CEO Construction Partners" 
            },
            { 
              text: "Rekomendasi utama untuk organisasi yang mengutamakan skalabilitas dan standardisasi proses.", 
              author: "— Sari Dewi, CTO Tech Innovators" 
            },
            { 
              text: "Responsivitas dan dukungan teknis yang exceptional dari tim ARB menjadi nilai tambah utama.", 
              author: "— Rina Kartika, Marketing Director Global" 
            },
          ].map(({ text, author }, i) => (
            <div 
              key={i} 
              className="p-6 border rounded-2xl shadow-lg bg-white transform hover:shadow-xl transition duration-300 animate-fadeInUp hover-lift"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <p className="text-gray-700 italic text-base sm:text-lg">"{text}"</p>
              <div className="mt-4 font-bold text-teal-600 text-sm sm:text-base">{author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mt-16 sm:mt-32 py-10 sm:py-12 bg-teal-50 px-4 sm:px-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center animate-fadeInUp">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-600 text-center mt-3 text-base sm:text-lg animate-fadeInUp delay-100">
          Informasi lengkap mengenai mekanisme dan prosedur dalam ekosistem ARB
        </p>

        <div className="max-w-4xl mx-auto mt-8 sm:mt-12 space-y-5">
          {[
            { 
              q: "Apa definisi operasional dari ARB?", 
              a: "ARB merupakan ekosistem manajemen talenta yang mengintegrasikan teknologi mutakhir dengan prinsip meritokrasi untuk optimalisasi proses rekrutmen dan pengembangan jaringan rekanan." 
            },
            { 
              q: "Apakah terdapat biaya administrasi dalam proses pendaftaran?", 
              a: "Seluruh proses seleksi dan pendaftaran sepenuhnya gratis tanpa adanya biaya tersembunyi. Komitmen kami adalah transparansi penuh dalam setiap tahapan." 
            },
            { 
              q: "Berapa estimasi waktu untuk proses seleksi komprehensif?", 
              a: "Rata-rata proses memerlukan 3-7 hari kerja, tergantung kompleksitas posisi dan volume aplikasi. Notifikasi real-time akan diberikan di setiap milestone." 
            },
            { 
              q: "Bagaimana mekanisme tracking untuk status aplikasi?", 
              a: "Setiap kandidat memiliki akses ke dashboard personal dengan update real-time via email dan platform digital kami untuk monitoring progres." 
            },
            { 
              q: "Apakah terdapat kebijakan untuk multiple position application?", 
              a: "Ya, kandidat diperbolehkan mengajukan aplikasi untuk beberapa posisi yang relevan dengan kompetensi dan pengalaman profesional." 
            },
          ].map(({ q, a }, i) => (
            <details 
              key={i} 
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <summary className="font-bold text-lg cursor-pointer text-gray-900 hover:text-teal-600 transition">
                {q}
              </summary>
              <p className="mt-3 text-base text-gray-700 leading-relaxed border-t pt-3">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* NASIONAL PRESENCE / MAP SECTION (MOVED UP) */}
      <section className="py-20 sm:py-24 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 animate-fadeInUp">
            Hadir Di Berbagai Wilayah Indonesia
          </h3>
          
          <div className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16 group">
            {/* Peta menggunakan gambar yang disediakan dengan efek blending */}
            <img 
              src="/peta.jpg" 
              alt="Peta Jangkauan Indonesia" 
              className="w-full h-auto object-contain mx-auto grayscale hover:grayscale-0 transition-all duration-700 mix-blend-multiply opacity-90"
            />
            {/* Titik-titik overlay telah dihapus */}
          </div>

          {/* STATISTIK DI BAWAH PETA */}
          <div className="grid grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-teal-50 rounded-full shadow-lg mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900">50+ Area</div>
              <div className="text-gray-600 mt-2">Yang tersebar diseluruh Indonesia</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-teal-50 rounded-full shadow-lg mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900">100%</div>
              <div className="text-gray-600 mt-2">Terpercaya, Fleksibel, Efektif</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (Stay at Bottom) */}
      <section id="kontak" className="py-16 sm:py-20 bg-teal-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Hubungi Kami
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Ada pertanyaan atau ingin berdiskusi lebih lanjut? Jangan ragu untuk menghubungi kami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="animate-fadeInLeft space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-teal-100">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h4>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">Alamat</h5>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Perintis Ruko Warna Hijau, Gg. Kesehatan<br />
                        Rajabasa Jaya, Kec. Rajabasa<br />
                        Kota Bandar Lampung, Lampung 35122
                      </p>
                    </div>
                  </div>
                  {/* Additional contacts */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">Telepon</h5>
                      <p className="text-gray-600 text-sm sm:text-base">+62 8136 3358 311</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">Email</h5>
                      <p className="text-gray-600 text-sm sm:text-base">info@arb-recruitment.co.id</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fadeInRight">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h4>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;