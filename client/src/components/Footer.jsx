import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = ({ onRequestCallback }) => {
  return (
    <footer className="bg-slate-900 text-white font-sans">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 text-sm">
          
          {/* Brand Info - Full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
                <circle cx="50" cy="50" r="45" fill="#2563EB" />
                <path d="M50 20 L25 40 L30 45 L50 35 L70 45 L75 40 Z" fill="white" stroke="white" strokeWidth="2"/>
                <path d="M50 15 V 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M30 45 L30 75 C30 85 70 85 70 75 L70 45" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                <path d="M42 55 Q50 60 58 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h4 className="text-lg md:text-xl font-bold">Kavya Dry Cleaners</h4>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Premium care for your premium clothes since 2001. Trusted by thousands in New Delhi.
            </p>
            
            {/* Social Links - Mobile Friendly */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-base md:text-lg border-b border-slate-700 pb-2">Quick Links</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info - Enhanced */}
          <div>
            <h4 className="font-bold mb-4 text-base md:text-lg border-b border-slate-700 pb-2">Contact Us</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-orange-500 flex-shrink-0" />
                <span className="leading-relaxed">D-313, Tagore Garden Extn<br/>New Delhi - 110027</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-orange-500 flex-shrink-0" />
                <a href="tel:9899320667" className="hover:text-white transition-colors">9899320667</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1 text-orange-500 flex-shrink-0" />
                <span>Mon-Sat: 9:00 AM - 8:00 PM<br/>Sunday: Closed</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div>
            <h4 className="font-bold mb-4 text-base md:text-lg border-b border-slate-700 pb-2">Get in Touch</h4>
            <button 
              onClick={onRequestCallback} 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 md:py-3.5 rounded-xl font-bold mb-4 transition-all active:scale-95 shadow-lg shadow-orange-900/20 text-sm md:text-base"
            >
              Request Call Back
            </button>
            
            <a 
              href="https://wa.me/919899320667" 
              target="_blank"
              rel="noreferrer"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 md:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg text-sm md:text-base"
            >
              Phone
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar - Mobile Optimized */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs md:text-sm text-slate-500">
            <p className="text-center sm:text-left">
              © 2026 Kavya Dry Cleaners. All rights reserved.
            </p>
            <p className="text-center sm:text-right">
              Developed by <a href="https://www.aryankanojia.live/" className="hover:text-slate-300 underline decoration-slate-700 transition-colors" target="_blank" rel="noreferrer">Aryan Kanojia</a>
            </p>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;