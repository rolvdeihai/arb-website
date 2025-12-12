const Experiences = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Pengalaman Kerja</h1>
      <div className="space-y-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 bg-yellow-300 inline-block px-2">GRBB KLINIK RAWAT INAP NUSAKAMBANGAN</h2>
          {/* Placeholders for clinic images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img src="/assets/klinik-1.png" alt="Depan klinik Nusakambangan" className="w-full h-48 object-cover rounded" />
            <img src="/assets/klinik-2.png" alt="Sisi klinik 1" className="w-full h-48 object-cover rounded" />
            <img src="/assets/klinik-3.png" alt="Sisi klinik 2" className="w-full h-48 object-cover rounded" />
          </div>
          <p className="mt-4">Lokasi: Nusakambangan, Cilacap</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 bg-yellow-300 inline-block px-2">INSTALL GANGWAY, NAROGONG</h2>
          <img src="/assets/gangway-install.jpg" alt="Instalasi gangway di Narogong" className="w-full h-64 object-cover mb-4 rounded" />
          <p>Lokasi: Narogong, Bogor</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 bg-yellow-300 inline-block px-2">MARKING ROAD LOGISTIK, TUBAN</h2>
          <img src="/assets/road-marking.jpg" alt="Marking road di Tuban" className="w-full h-48 object-cover mb-4 rounded" />
          <h2 className="text-2xl font-bold mb-4 bg-yellow-300 inline-block px-2">PEMASANGAN LISTPLANK GUDANG HANDAK</h2>
          <img src="/assets/tuban.png" alt="Pemasangan listplank di gudang handak" className="w-full h-48 object-cover mb-4 rounded" />
          <p>Lokasi: Tuban, Jawa Timur</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">SEBARAN WILAYAH KERJA PERUSAHAAN</h2>
          <img src="/assets/indonesia-map.jpg" alt="Peta sebaran wilayah kerja di Indonesia" className="w-full h-64 object-cover mb-4 rounded" />
          <ul className="list-disc pl-6">
            <li>Cilacap, Jawa Tengah</li>
            <li>Narogong, Jawa Barat</li>
            <li>Tuban, Jawa Timur</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experiences;