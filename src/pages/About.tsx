const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Tentang ARB</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            ARB Agency adalah partner strategis Anda dalam transformasi digital. Sejak 2018, kami telah membantu lebih dari 200+ bisnis dari berbagai skala untuk berkembang melalui strategi digital marketing yang tepat.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Dengan tim yang terdiri dari ahli SEO, content creators, social media specialists, dan data analysts, kami memastikan setiap strategi yang kami buat berdasarkan data dan hasil yang terukur.
          </p>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">200+</div>
              <div className="text-gray-600">Klien Puas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5+</div>
              <div className="text-gray-600">Tahun Pengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Proyek Sukses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15</div>
              <div className="text-gray-600">Tim Ahli</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;