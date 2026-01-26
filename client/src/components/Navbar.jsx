import { Menu, X, MapPin, Lock } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ onRequestCallback, onAdminLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ UPDATED LOCATION LINK
  const mapLink = "https://maps.app.goo.gl/8hXR5WQ9LhCvrpYT9";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* --- LOGO SECTION --- */}
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

        {/* --- DESKTOP LINKS --- */}
        <div className="hidden md:flex items-center gap-6 font-medium text-slate-600 text-sm">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#services" className="hover:text-blue-600 transition-colors">Our Services</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          
          <button 
            onClick={onRequestCallback}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-orange-200"
          >
            Request Call Back
          </button>
          
          <div className="h-6 w-px bg-slate-200 mx-2"></div>

          {/* Real Location Button */}
          <a 
            href={mapLink} 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-500 hover:text-blue-600 transition-colors"
            title="Locate Us on Google Maps"
          >
            <MapPin size={20} />
          </a>

          {/* Admin Button (Lock Icon) */}
          <button 
            onClick={onAdminLogin} 
            className="text-slate-300 hover:text-red-500 transition-colors"
            title="Admin Login"
          >
            <Lock size={18} />
          </button>
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button className="md:hidden text-slate-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
          <a href="#" className="font-medium text-slate-700 hover:text-blue-600">Home</a>
          <a href="#services" className="font-medium text-slate-700 hover:text-blue-600">Services</a>
          <a href="#pricing" className="font-medium text-slate-700 hover:text-blue-600">Pricing</a>
          
          {/* Mobile Location Link */}
          <a href={mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-medium text-slate-700 hover:text-blue-600">
             <MapPin size={18} /> Locate Shop
          </a>

          <button onClick={onRequestCallback} className="bg-orange-500 text-white py-3 rounded-lg font-bold shadow-md">
            Request Call Back
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;