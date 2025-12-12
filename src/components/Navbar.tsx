import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ARB
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/tentang-kami" className="text-gray-700 hover:text-blue-600">Tentang Kami</Link>
            <Link to="/layanan" className="text-gray-700 hover:text-blue-600">Layanan</Link>
            <Link to="/portofolio" className="text-gray-700 hover:text-blue-600">Portofolio</Link>
            <Link to="/tim" className="text-gray-700 hover:text-blue-600">Tim</Link>
            <Link to="/karir" className="text-gray-700 hover:text-blue-600">Karir</Link>
            <Link to="/kontak" className="text-gray-700 hover:text-blue-600">Kontak</Link>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;