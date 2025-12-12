const Team = () => {
  const teamMembers = [
    {
      name: 'Sarah Wijaya',
      position: 'Digital Marketing Director',
      expertise: ['SEO', 'Strategy Planning'],
      image: 'https://via.placeholder.com/400x400'
    },
    {
      name: 'Budi Santoso',
      position: 'Content Lead',
      expertise: ['Content Creation', 'Copywriting'],
      image: 'https://via.placeholder.com/400x400'
    },
    {
      name: 'Maya Putri',
      position: 'Social Media Specialist',
      expertise: ['Instagram', 'TikTok Marketing'],
      image: 'https://via.placeholder.com/400x400'
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Tim Kami</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-blue-600 mb-3">{member.position}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {member.expertise.map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;