import ApplicationForm from '../components/ApplicationForm';

const Careers = () => {
  const jobs = [
    { title: 'Swakarsa Digital - Programmer', location: 'Bandar Lampung', salary: 'Rp1.000.000' },
    { title: 'Swakarsa Digital - Manager', location: 'Bandar Lampung', salary: 'Rp500.000' },
    // Add more
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-black text-sjp-blue mb-6 text-center">
          Lowongan Tersedia
        </h1>

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-sjp-yellow hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-bold text-sjp-blue">{job.title}</h2>
              <p className="text-gray-600 mt-2">
                {job.location} • <span className="font-bold text-sjp-yellow">{job.salary}</span>
              </p>

              <button
                className="
                  mt-5 bg-sjp-blue text-white px-6 py-2 rounded-full 
                  font-semibold hover:bg-sjp-yellow hover:text-sjp-blue
                  transition
                "
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <h2 className="text-3xl font-black text-sjp-blue mt-20 mb-6 text-center">
          Lamar Sekarang
        </h2>

        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
};

export default Careers;
