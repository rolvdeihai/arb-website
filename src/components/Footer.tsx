const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ARB</h3>
            <p className="text-gray-400">
              Partner digital marketing terpercaya untuk bisnis Anda.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Social Media Marketing</li>
              <li>SEO Optimization</li>
              <li>Content Marketing</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Tentang Kami</li>
              <li>Tim</li>
              <li>Karir</li>
              <li>Kontak</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Kontak</h4>
            <p className="text-gray-400">
              hello@ARB.id<br />
              (021) 1234-5678<br />
              Jakarta, Indonesia
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          © 2024 ARB Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;