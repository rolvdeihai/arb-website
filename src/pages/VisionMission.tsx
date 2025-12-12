const VisionMission = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Visi Dan Misi</h1>
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-4 bg-yellow-300 inline-block px-2">VISI</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Menjadi perusahaan civil, konstruksi, mekanikal, elektrikal dan engineering yang tangguh dan terpercaya</li>
          <li>Mengedepankan keselamatan dan kesehatan kerja untuk meningkatkan produktivitas kerja</li>
          <li>Menciptakan kondisi kerja yang nyaman dan aman</li>
          <li>Menciptakan kondisi lapangan kerja dengan mengedepankan tenaga kerja yang handal dan berkemampuan pada bidangnya</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 bg-yellow-300 inline-block px-2">MISI</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mewujudkan kepuasan dan kepercayaan konsumen akan produk jasa sipil, konstruksi, mekanikal, elektrikal dan engineering yang berkualitas melalui keunggulan sistem management dan sumber daya manusia yang handal</li>
          <li>Mewujudkan Zero Accident pada setiap aktivitas pekerjaan</li>
        </ul>
      </div>
    </div>
  );
};

export default VisionMission;