const CompanyData = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Data Perusahaan</h1>
      <div className="bg-white p-6 rounded shadow">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <dt className="font-bold">Nama Perusahaan</dt>
          <dd>PT. Sinar Jembar Perkasa</dd>
          
          <dt className="font-bold">Alamat Perusahaan</dt>
          <dd>Jl. Lombok No.68 RT 001/RW 011 Gunungsimping, Cilacap Tengah Cilacap</dd>
          
          <dt className="font-bold">Telepon</dt>
          <dd>(0282) 5566294</dd>
          
          <dt className="font-bold">Email</dt>
          <dd>office.jembarperkasa@sjpgrup.com</dd>
          
          <dt className="font-bold">Akte Notaris Pendirian</dt>
          <dd>10 / 25 Januari 2021</dd>
          
          <dt className="font-bold">NPWP Perusahaan</dt>
          <dd>41.268.840.0-522.000</dd>
          
          <dt className="font-bold">Rekening Bank</dt>
          <dd>180-00-0715152-7 (BANK MANDIRI)</dd>
          
          <dt className="font-bold">Bidang Usaha</dt>
          <dd>Civil, Construction, Mechanical and Engineering</dd>
        </dl>
      </div>
    </div>
  );
};

export default CompanyData;