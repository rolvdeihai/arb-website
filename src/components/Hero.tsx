const Hero = () => {
  return (
    <div className="bg-primary text-white p-8 text-center">
      <h1 className="text-4xl font-bold">Temukan Informasi Perusahaan Impianmu</h1>
      <p>Bergabunglah dengan perusahaan terkemuka dan wujudkan karir yang lebih baik</p>
      <div className="mt-4 flex justify-center space-x-2">
        <input type="text" placeholder="Cari posisi atau perusahaan" className="p-2 rounded" />
        <input type="text" placeholder="Lokasi" className="p-2 rounded" />
        <button className="bg-blue-700 p-2 rounded">Cari Lowongan</button>
      </div>
    </div>
  );
};

export default Hero;