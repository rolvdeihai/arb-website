const OrgStructure = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Struktur Organisasi</h1>
      <div className="bg-white p-6 rounded shadow">
        {/* Simple hierarchical structure using flex and borders to mimic the chart */}
        <div className="flex flex-col items-center">
          {/* Top level */}
          <div className="flex space-x-8 mb-4">
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">DIREKTUR<br />ADE WARDOYO</div>
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">KOMISARIS<br />MUJIANTO</div>
          </div>
          <div className="border-t-2 border-red-500 w-1/2 mb-4"></div>
          
          {/* Safety Officer */}
          <div className="bg-yellow-300 p-4 rounded text-center font-bold mb-4">SAFETY OFFICER<br />DALILAH SFA</div>
          <div className="border-t-2 border-red-500 w-1/3 mb-4"></div>
          
          {/* Middle level */}
          <div className="flex space-x-8 mb-4">
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">ENGINEER<br />KOMARUDIN ST</div>
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">ADM/LOGISTIK<br />1. EKA ARIESDIYANTINI<br />2. USWATUN HASANAH<br />3. MARTIN ADITYA P</div>
          </div>
          <div className="border-t-2 border-red-500 w-2/3 mb-4"></div>
          
          {/* Supervisors */}
          <div className="flex space-x-8 mb-4">
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">SPV I<br />SUHENDI</div>
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">SPV II<br />FAUJI IKHWANA</div>
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">SPV III<br />SUPRIYANTO</div>
          </div>
          <div className="border-t-2 border-red-500 w-full mb-4"></div>
          
          {/* Mandors */}
          <div className="flex space-x-8">
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">MANDOR<br />10 MP</div>
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">MANDOR<br />10 MP</div>
            <div className="bg-yellow-300 p-4 rounded text-center font-bold">MANDOR<br />10 MP</div>
          </div>
        </div>
        <p className="text-center mt-4">Cilacap, 02 Januari 2021<br />PT. Sinar Jembar Perkasa</p>
      </div>
    </div>
  );
};

export default OrgStructure;