import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 sm:mt-32 py-10 sm:py-14 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="animate-fadeInUp">
          <h4 className="font-bold text-white mb-4 text-lg">ARB</h4>
          <p className="text-gray-400 text-sm">
            Ekosistem manajemen talenta terintegrasi dengan teknologi mutakhir untuk optimalisasi proses rekrutmen.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition hover-lift">LinkedIn</a>
            <a href="https://www.instagram.com/ptarbofficial" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition hover-lift">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition hover-lift">Twitter</a>
          </div>
        </div>

        {[
          { title: "Perusahaan", items: ["Corporate Profile", "Leadership Team", "Career Opportunities"] },
          { title: "Solusi", items: ["Talent Management System", "Competency Assessment", "Strategic Partnership"] },
          { title: "Dukungan", items: ["Knowledge Base", "Technical Support", "Client Portal"] },
        ].map((section, i) => (
          <div key={i} className="animate-fadeInUp" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">{section.title}</h4>
            <ul className="space-y-3 text-sm">
              {section.items.map((item, j) => (
                <li key={j} className="hover:text-white transition cursor-pointer hover-lift">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 sm:mt-16 border-t border-gray-800 pt-8 animate-fadeInUp">
        <p className="text-center text-gray-500 text-xs sm:text-sm mb-4">
          © {new Date().getFullYear()} PT. Anugrahan Rekanan Bersama — Hak Cipta Dilindungi Undang-Undang.
        </p>
        <div className="text-center">
          <button
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-gray-400 hover:text-white transition border border-gray-700 hover:border-gray-600 rounded-lg bg-gray-800/50 hover:bg-gray-800"
            title="Admin Dashboard"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Admin Dashboard
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;