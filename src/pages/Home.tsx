import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";

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
            desc: "Menjadi mitra teknologi terpercaya dalam ekosistem global dengan fokus pada inovasi berkelanjutan dan kolaborasi strategis jangka panjang." 
          },
          { 
            step: "02", 
            title: "Misi Berintegritas", 
            desc: "Membangun jaringan rekanan yang unggul melalui standar etika tinggi, profesionalisme, dan komitmen terhadap keunggulan operasional." 
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
          Tentang ARB
        </h3>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700 max-w-5xl mx-auto text-center animate-fadeInUp delay-200">
          PT. ANUGRAH REKANAN BERSAMA merupakan ekosistem manajemen talenta yang mengintegrasikan prinsip-prinsip 
          integritas, kualitas, dan efisiensi operasional. Kami berkomitmen untuk menciptakan lingkungan kerja yang 
          mendukung pengembangan kompetensi, penghargaan terhadap talenta unggul, serta penyediaan peluang pertumbuhan 
          karir yang berkelanjutan. Keunggulan kami terletak pada platform teknologi mutakhir yang memfasilitasi 
          tracking rekanan secara real-time, algoritma seleksi berbasis meritokrasi, dan dukungan komprehensif bagi 
          seluruh stakeholder.
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
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Telepon</p>
                      <p className="text-gray-600 text-sm mt-1">+62 812 3456 7890</p>
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
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Jam Operasional</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Senin - Jumat: 08:00 - 17:00<br />
                        Sabtu: 08:00 - 12:00<br />
                        Minggu: Libur
                      </p>
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
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                    <span>20 menit dari Terminal Rajabasa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                    <span>Tersedia area parkir yang luas</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <div className="lg:col-span-2 animate-fadeInRight">
              <div className="relative h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-white/50 z-10 pointer-events-none"></div>
                
                {/* Modern Map Container */}
                <div className="relative w-full h-full">
                  {/* Map dengan efek modern - Anugerah Rekanan Bersama 2 */}
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
                  
                  {/* Overlay informasi modern */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg max-w-sm">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm sm:text-base truncate">Kantor Pusat ARB 2</p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">Anugerah Rekanan Bersama 2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Controls Overlay */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button 
                        onClick={() => window.open('https://maps.google.com/?q=Perintis+Ruko+Warna+Hijau+Gg+Kesehatan+Rajabasa+Jaya+Bandar+Lampung+35122', '_blank')}
                        className="bg-white/90 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-white flex items-center justify-center gap-1 sm:gap-2 font-medium text-gray-800 hover:text-teal-700 text-xs sm:text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                        </svg>
                        <span className="hidden md:inline">Buka di Maps</span>
                        <span className="md:hidden">Maps</span>
                      </button>
                      <button 
                        onClick={() => window.open('https://www.google.com/maps/dir//Perintis+Ruko+Warna+Hijau+Gg+Kesehatan+Rajabasa+Jaya+Bandar+Lampung+35122', '_blank')}
                        className="bg-teal-600 text-white px-2 sm:px-3 md:px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-teal-700 flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Rute</span>
                      </button>
                    </div>
                  </div>
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

      {/* CONTACT SECTION */}
      <section id="kontak" className="mt-16 sm:mt-32 py-10 sm:py-16 bg-white px-4 sm:px-8">
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
              <div className="bg-teal-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-teal-100">
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
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">Telepon</h5>
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
                      <h5 className="font-bold text-gray-900 mb-1">Email</h5>
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
                      <h5 className="font-bold text-gray-900 mb-1">Jam Operasional</h5>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Senin - Jumat: 08:00 - 17:00<br />
                        Sabtu: 08:00 - 12:00<br />
                        Minggu: Libur
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">Media Sosial</h5>
                      <a 
                        href="https://www.instagram.com/ptarbofficial" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-teal-600 hover:text-teal-700 text-sm sm:text-base font-medium"
                      >
                        @ptarbofficial
                      </a>
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