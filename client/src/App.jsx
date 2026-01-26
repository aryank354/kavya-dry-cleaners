import { useState, useEffect } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import axios from 'axios';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import NotificationBar from './components/NotificationBar';
import AdminPanel from './AdminPanel';

const BASE_URL = import.meta.env.PROD 
  ? "https://kavya-dry-cleaners.onrender.com" 
  : "http://localhost:5000";

function App() {
  const [services, setServices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // --- INIT ---
  useEffect(() => {
    // Check Admin Login
    const loggedIn = localStorage.getItem("kavya_admin_logged_in");
    if (loggedIn === "true") setIsAdmin(true);

    // Fetch Rates
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // --- HANDLERS ---
  const handleAdminLogin = async () => {
    const password = prompt("Enter Admin Password:");
    if (!password) return;
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, { password });
      if (response.data.success) {
        setIsAdmin(true);
        localStorage.setItem("kavya_admin_logged_in", "true");
        alert("Welcome Back!");
      }
    } catch (error) {
      alert("Wrong Password!");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("kavya_admin_logged_in");
  };

  const handleRequestCallback = () => {
    window.open("https://wa.me/919899320667?text=Hi, I want to request a callback for dry cleaning service.", "_blank");
  };

  // --- ADMIN VIEW ---
  if (isAdmin) {
    return <AdminPanel onLogout={handleLogout} apiUrl={`${BASE_URL}/api/services`} />;
  }

  // --- MAIN VIEW ---
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      
      {/* Notification Bar (News) */}
      <NotificationBar apiUrl={BASE_URL} />

      <Navbar 
        onRequestCallback={handleRequestCallback} 
        onAdminLogin={handleAdminLogin} 
      />
      
      <Hero onRequestCallback={handleRequestCallback} />
      
      <Services onRequestCallback={handleRequestCallback} />
      
      <Pricing services={services} />
      
      <Footer onRequestCallback={handleRequestCallback} />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <a 
          href="https://wa.me/919899320667" 
          target="_blank" 
          rel="noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageCircle size={28} />
        </a>
        <a 
          href="tel:9899320667" 
          className="bg-white text-orange-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center border-2 border-orange-100"
        >
          <Phone size={28} />
        </a>
      </div>

    </div>
  );
}

export default App;