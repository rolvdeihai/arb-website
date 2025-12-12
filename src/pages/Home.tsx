const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="relative text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Transformasi Digital <span className="text-yellow-300">Anda</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Kami membantu bisnis berkembang melalui strategi digital marketing yang terukur dan hasil-driven
          </p>
          <a
            href="/kontak"
            className="inline-block bg-yellow-400 text-gray-900 font-bold text-xl px-10 py-4 rounded-full hover:bg-yellow-300 transition"
          >
            Konsultasi Gratis
          </a>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Layanan Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Social Media Marketing', desc: 'Tingkatkan engagement & konversi', icon: '📱' },
              { title: 'SEO Optimization', desc: 'Peringkat Google teratas', icon: '🔍' },
              { title: 'Content Strategy', desc: 'Konten yang menarik & relevan', icon: '✍️' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;