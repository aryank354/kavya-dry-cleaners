import { Menu, X, MapPin, Lock, Phone, Home, DollarSign, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = ({ onRequestCallback, onAdminLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const mapLink = "https://maps.app.goo.gl/8hXR5WQ9LhCvrpYT9";

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 120; // Increased offset to account for Notification Bar + Navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* FIXED: Changed from 'fixed top-0...' to 'w-full relative' so it stacks under the notification bar */}
      <nav className={`w-full relative transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 md:h-20 flex justify-between items-center">
            
            {/* Logo Section */}
            <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
              <div className="relative flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none">
                  <circle cx="50" cy="50" r="45" fill="#2563EB" />
                  <path d="M50 20 L25 40 L30 45 L50 35 L70 45 L75 40 Z" fill="white" stroke="white" strokeWidth="2"/>
                  <path d="M50 15 V 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M30 45 L30 75 C30 85 70 85 70 75 L70 45" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                  <path d="M42 55 Q50 60 58 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M48 30 L52 30" stroke="#2563EB" strokeWidth="2" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-none text-blue-900 uppercase tracking-tight">
                  Kavya Dry Cleaners
                </h1>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 font-medium tracking-wide">
                  Premium Care Since 2001
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 font-medium text-slate-700 text-sm">
              <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="hover:text-blue-600 transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-600 transition-colors relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="hover:text-blue-600 transition-colors relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              
              <button 
                onClick={onRequestCallback}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-orange-200 hover:shadow-xl"
              >
                Request Callback
              </button>
              
              <div className="h-6 w-px bg-slate-200"></div>

              <a 
                href={mapLink} 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                title="Find Us"
              >
                <MapPin size={20} />
              </a>

              <button 
                onClick={onAdminLogin} 
                className="text-slate-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                title="Admin"
              >
                <Lock size={18} />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <a 
                href="tel:9899320667" 
                className="bg-blue-600 text-white p-2 md:p-2.5 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                aria-label="Call Now"
              >
                <Phone size={18} />
              </a>
              
              <button 
                className="text-slate-700 p-2 hover:bg-slate-100 rounded-lg active:bg-slate-200 transition-all" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Menu Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
              <circle cx="50" cy="50" r="45" fill="white" />
              <path d="M50 20 L25 40 L30 45 L50 35 L70 45 L75 40 Z" fill="#2563EB" stroke="#2563EB" strokeWidth="2"/>
              <path d="M50 15 V 20" stroke="#2563EB" strokeWidth="3" strokeLinecap="round"/>
              <path d="M30 45 L30 75 C30 85 70 85 70 75 L70 45" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="2"/>
              <path d="M42 55 Q50 60 58 55" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <h3 className="text-white font-bold text-sm">Kavya</h3>
              <p className="text-blue-100 text-xs">Dry Cleaners</p>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="h-[calc(100%-88px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Navigation Links */}
            <nav className="space-y-2">
              <a 
                href="#" 
                onClick={(e) => handleLinkClick(e, '#')}
                className="flex items-center gap-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all font-medium text-base group"
              >
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Home size={20} />
                </div>
                <span>Home</span>
              </a>

              <a 
                href="#services" 
                onClick={(e) => handleLinkClick(e, '#services')}
                className="flex items-center gap-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all font-medium text-base group"
              >
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Briefcase size={20} />
                </div>
                <span>Our Services</span>
              </a>

              <a 
                href="#pricing" 
                onClick={(e) => handleLinkClick(e, '#pricing')}
                className="flex items-center gap-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all font-medium text-base group"
              >
                <div className="bg-green-100 text-green-600 p-2 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <DollarSign size={20} />
                </div>
                <span>Pricing</span>
              </a>
            </nav>

            <div className="border-t pt-6 space-y-3">
              {/* Location Button */}
              <a 
                href={mapLink} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all font-medium"
              >
                <MapPin size={20} className="text-blue-600" /> 
                <div>
                  <div className="font-semibold text-sm">Find Us</div>
                  <div className="text-xs text-slate-500">Tagore Garden, Delhi</div>
                </div>
              </a>

              {/* Call Back Button */}
              <button 
                onClick={() => {
                  onRequestCallback();
                  setMobileMenuOpen(false);
                }} 
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-orange-600 active:scale-95 transition-all text-base flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Request Callback
              </button>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Phone size={16} className="text-blue-600" />
                Contact Us
              </h4>
              <div className="space-y-2 text-sm text-slate-700">
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="mt-1 text-slate-400 flex-shrink-0" />
                  <span>D-313, Tagore Garden Extn, New Delhi - 110027</span>
                </p>
                <a href="tel:9899320667" className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700">
                  <Phone size={14} />
                  9899320667
                </a>
              </div>
            </div>

            {/* Admin Login */}
            <button 
              onClick={() => {
                onAdminLogin();
                setMobileMenuOpen(false);
              }} 
              className="w-full text-xs text-slate-400 hover:text-slate-600 py-3 flex items-center justify-center gap-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Lock size={12} /> Admin Access
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;