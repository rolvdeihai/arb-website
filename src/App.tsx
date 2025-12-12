import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tentang-kami" element={<About />} />
            <Route path="/layanan" element={<Services />} />
            <Route path="/portofolio" element={<Portfolio />} />
            <Route path="/tim" element={<Team />} />
            <Route path="/karir" element={<Careers />} />
            <Route path="/kontak" element={<Contact />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;