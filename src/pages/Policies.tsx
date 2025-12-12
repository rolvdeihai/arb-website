const Policies = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Kebijakan Perusahaan</h1>
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-4 bg-yellow-300 inline-block px-2">KEBIJAKAN MUTU</h2>
        <p>PT. SINAR JEMBAR PERKASA melaksanakan pekerjaan konstruksi, sipil, mekanikal, elektrikal dan engineering yang berkualitas secara konsisten dan konsekuen dengan cara :</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Melaksanakan perbaikan berkesinambungan dalam seluruh aspek pekerjaan untuk meningkatkan kualitas pelayanan yang prima.</li>
          <li>Meneguhkan komitmen kuat untuk senantiasa menghasilkan produk berkualitas demi kepuasan pelanggan.</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 bg-yellow-300 inline-block px-2">KEBIJAKAN K3</h2>
        <p>PT. SINAR JEMBAR PERKASA berkomitmen tinggi untuk menjamin terjaganya Kesehatan dan Keselamatan Kerja bagi karyawan, pekerja, dan pihak lain di lingkungan kantor maupun lokasi proyek.</p>
        <p className="mt-4">PT. SINAR JEMBAR PERKASA bersungguh-sungguh untuk mematuhi peraturan perundang-undangan tentang Kesehatan dan Keselamatan Kerja sebagai upaya pencegahan terjadinya kecelakaan dan penyakit akibat kerja.</p>
      </div>
    </div>
  );
};

export default Policies;