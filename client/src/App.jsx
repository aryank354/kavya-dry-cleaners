import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Sparkles, MapPin, Search, Star, Award, ArrowRight, ArrowUpRight, ExternalLink, Shield, Camera, X, Lock } from 'lucide-react';
import axios from 'axios';
import AdminPanel from './AdminPanel';

// --- API URL ---
const BASE_URL = import.meta.env.PROD 
  ? "https://kavya-dry-cleaners.onrender.com" 
  : "http://localhost:5000";

const categories = ['All', 'Men', 'Women', 'Household', 'Winter', 'Others'];

const features = [
  { icon: Sparkles, title: "Premium Quality", desc: "Expert fabric care" },
  { icon: Shield, title: "Quality Assured", desc: "Premium care guaranteed" },
  { icon: MapPin, title: "Free Pickup", desc: "Doorstep service available" },
  { icon: Award, title: "Expert Team", desc: "20+ years experience" }
];

const galleryImages = [
  { src: "/shop1.jpg", alt: "Kavya Dry Cleaners Main Shop" },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // --- ADMIN STATE ---
  const [isAdmin, setIsAdmin] = useState(false);

  // 1. Check if already logged in (Persistent Login)
  useEffect(() => {
    const loggedIn = localStorage.getItem("kavya_admin_logged_in");
    if (loggedIn === "true") {
      setIsAdmin(true);
    }
  }, []);

  // 2. Fetch Data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/services`);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredServices = services.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- LOGIN LOGIC ---
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

  // --- IF ADMIN, SHOW PANEL ---
  if (isAdmin) {
    return <AdminPanel onLogout={handleLogout} apiUrl={`${BASE_URL}/api/services`} />;
  }

  // --- NORMAL WEBSITE ---
  return (
    <div className="min-h-screen pb-20 font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white/50 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none">
                  <circle cx="50" cy="50" r="45" fill="#2563EB" />
                  <path d="M50 20 L25 40 L30 45 L50 35 L70 45 L75 40 Z" fill="white" stroke="white" strokeWidth="2"/>
                  <path d="M50 15 V 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M30 45 L30 75 C30 85 70 85 70 75 L70 45" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                  <path d="M42 55 Q50 60 58 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M48 30 L52 30" stroke="#2563EB" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h1 className="font-board font-bold text-2xl md:text-3xl leading-none text-blue-900 uppercase tracking-tight">
                  Kavya Dry Cleaners
                </h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Premium Care Since 2001</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <a href="tel:9899320667" className="bg-blue-100 text-blue-700 p-2.5 rounded-full hover:bg-blue-200 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919899320667?text=Hi" target="_blank" rel="noopener noreferrer" className="bg-green-100 text-green-700 p-2.5 rounded-full hover:bg-green-200 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
            <Star className="w-3 h-3 fill-current" />
            Tagore Garden's Trusted Choice
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 leading-tight">
            Look Sharp. <br className="hidden md:block" />
            <span className="text-blue-600">Feel Fresh.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the <span className="font-bold text-slate-900">premium difference</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="https://wa.me/919899320667?text=Hi, I want to schedule a pickup" target="_blank" rel="noopener noreferrer" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Schedule Pickup
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="tel:9899320667" 
              className="bg-white text-slate-800 px-8 py-4 rounded-xl font-bold text-lg shadow-md border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-left hover:shadow-md hover:border-blue-200 transition-all">
                <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="flex items-center gap-2 mb-6">
             <Camera className="w-6 h-6 text-blue-600" />
             <h3 className="text-2xl font-bold text-slate-900">Our Facility</h3>
          </div>
          <div className={`
            ${galleryImages.length === 1 ? 'flex justify-center' : ''}
            ${galleryImages.length === 2 ? 'grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto' : ''}
            ${galleryImages.length > 2 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : ''}
          `}>
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(img.src)}
                className={`
                  group relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white cursor-pointer hover:shadow-xl transition-all duration-300
                  ${galleryImages.length === 1 ? 'w-full max-w-sm md:max-w-md h-auto' : 'w-full h-64'} 
                `}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105
                    ${galleryImages.length === 1 ? 'object-contain' : 'object-cover'}
                  `}
                  onError={(e) => {
                      e.target.style.display = 'none'; 
                      e.target.parentNode.style.display = 'none';
                  }}
                />
                {galleryImages.length > 1 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-white font-medium">{img.alt}</p>
                      <ArrowUpRight className="text-white w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Address */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div onClick={() => window.open('https://www.google.com/maps?q=28.651921,77.1109789&z=17&hl=en', '_blank')}
          className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 cursor-pointer hover:border-blue-200 transition-all group">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">Visit Our Shop</h3>
              <p className="text-slate-600 font-medium mb-3">
                D-313, Tagore Garden Extension, New Delhi - 110027
              </p>
              <div className="flex items-center gap-2 text-blue-600 text-sm font-bold group-hover:underline">
                Open in Google Maps <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rate List */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-2">Rate List</h3>
            <p className="text-slate-500">Transparent pricing for everyone.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
           <div className="text-center py-12">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
             <p className="text-slate-500">Loading rates...</p>
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {item.name}
                    </h4>
                    {item.popular && (
                      <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md">{item.category}</p>
                    <span className="text-xl font-black text-blue-600">₹{item.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400 font-medium">No items found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12 mb-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Kavya Dry Cleaners. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Website by</span>
            <a href="https://www.aryankanojia.live/" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-blue-400">
              Aryan Kanojia
            </a>
            <button 
              onClick={handleAdminLogin}
              className="ml-4 opacity-50 hover:opacity-100 flex items-center gap-1 text-xs text-slate-600 hover:text-white transition-all"
            >
              <Lock size={12} /> Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-[70]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Full Screen View" 
            className="max-w-full max-h-[95vh] object-contain rounded shadow-2xl animate-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 md:hidden">
        <div className="flex">
          <a href="tel:9899320667" className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-slate-700 active:bg-slate-50">
            <Phone className="w-5 h-5" /> Call
          </a>
          <div className="w-[1px] bg-slate-200"></div>
          <a href="https://wa.me/919899320667?text=Hi" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-green-600 active:bg-green-50">
            <MessageCircle className="w-5 h-5" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;