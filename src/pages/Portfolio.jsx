const Portfolio = () => {
  const projects = [
    {
      client: 'Fashion Brand Lokal',
      service: 'Social Media Campaign',
      result: '300% increase in engagement',
      image: 'https://via.placeholder.com/600x400'
    },
    {
      client: 'Startup E-commerce',
      service: 'SEO Optimization',
      result: '#1 ranking for 15+ keywords',
      image: 'https://via.placeholder.com/600x400'
    },
    {
      client: 'Restaurant Chain',
      service: 'Content Strategy',
      result: '40% increase in online orders',
      image: 'https://via.placeholder.com/600x400'
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Portofolio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={project.image} 
                alt={project.client}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.client}</h3>
                <p className="text-gray-600 mb-2">{project.service}</p>
                <div className="text-green-600 font-semibold">
                  Hasil: {project.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;