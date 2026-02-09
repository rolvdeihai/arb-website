import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // LOGIC FOR NAVBAR TRANSPARENCY ON SCROLL
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (sectionId: string) => {
    closeMenu();
    
    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Offset untuk navbar fixed
        const headerOffset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Tunggu navigasi selesai baru scroll
      setTimeout(scrollToElement, 100);
    } else {
      scrollToElement();
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled || isMenuOpen ? "bg-white shadow-lg border-b border-gray-100" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            navigate("/");
            closeMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src="/logo.png" alt="ARB Logo" className="h-12 w-auto object-contain" />
          <span
            className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300
              ${isScrolled || isMenuOpen ? "text-gray-900" : "text-white drop-shadow-text"}
            `}
          >
            PT. ANUGRAH REKANAN BERSAMA
          </span>
        </div>

        {/* MENU DESKTOP */}
        <div
          className={`hidden md:flex gap-6 lg:gap-8 font-medium text-sm sm:text-base transition-colors duration-300
            ${isScrolled ? "text-gray-700" : "text-white drop-shadow-text"}
          `}
        >
          <button onClick={() => handleNavClick('about')} className="hover:text-teal-600 transition">Tentang</button>
          <button onClick={() => handleNavClick('proses')} className="hover:text-teal-600 transition">Proses</button>
          <button onClick={() => handleNavClick('lokasi')} className="hover:text-teal-600 transition">Lokasi</button>
          <button onClick={() => handleNavClick('faq')} className="hover:text-teal-600 transition">FAQ</button>
          <button onClick={() => handleNavClick('kontak')} className="hover:text-teal-600 transition">Kontak</button>
        </div>

        {/* BUTTON DESKTOP */}
        <button
          onClick={() => navigate("/karir")}
          className={`hidden md:inline-flex px-6 py-2.5 rounded-full font-semibold text-sm transition shadow-md
            ${isScrolled ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-teal-600 text-white hover:bg-teal-700"}
          `}
        >
          Lamar
        </button>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className={`md:hidden focus:outline-none z-50 relative
            ${isScrolled || isMenuOpen ? "text-gray-900" : "text-white"}
          `}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-7 h-7 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div 
          className="md:hidden bg-white shadow-lg border-t border-gray-100 animate-fadeInDown fixed top-[73px] left-0 right-0 z-40 max-h-[calc(100vh-73px)] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col px-6 py-6 gap-4 text-gray-800 font-medium">
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-left hover:text-teal-600 transition py-2 border-b border-gray-100"
            >
              Tentang
            </button>
            <button 
              onClick={() => handleNavClick('proses')} 
              className="text-left hover:text-teal-600 transition py-2 border-b border-gray-100"
            >
              Proses
            </button>
            <button 
              onClick={() => handleNavClick('lokasi')} 
              className="text-left hover:text-teal-600 transition py-2 border-b border-gray-100"
            >
              Lokasi
            </button>
            <button 
              onClick={() => handleNavClick('faq')} 
              className="text-left hover:text-teal-600 transition py-2 border-b border-gray-100"
            >
              FAQ
            </button>
            <button 
              onClick={() => handleNavClick('kontak')} 
              className="text-left hover:text-teal-600 transition py-2"
            >
              Kontak
            </button>

            <button
              onClick={() => {
                closeMenu();
                navigate("/karir");
              }}
              className="mt-4 px-6 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition w-full"
            >
              Lamar Sekarang
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;