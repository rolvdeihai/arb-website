const Services = () => {
  const services = [
    {
      title: 'Social Media Management',
      description: 'Kelola dan optimalkan performa media sosial bisnis Anda',
      features: ['Content Planning', 'Community Management', 'Performance Analysis'],
      price: 'Mulai dari Rp 3jt/bulan'
    },
    {
      title: 'SEO & Website Optimization',
      description: 'Tingkatkan visibilitas di mesin pencari',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO Audit'],
      price: 'Mulai dari Rp 5jt/proyek'
    },
    {
      title: 'Content Marketing',
      description: 'Kembangkan konten yang menarik dan konversif',
      features: ['Blog Writing', 'Video Content', 'Infographics'],
      price: 'Paket custom'
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Layanan Kami</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Solusi digital marketing komprehensif untuk semua kebutuhan bisnis Anda
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-xl font-bold text-blue-600 mb-4">{service.price}</div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;