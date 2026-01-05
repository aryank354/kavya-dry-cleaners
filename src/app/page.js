'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Shirt, CheckCircle, Clock, MapPin, Search, Star, Award, Sparkles, ArrowRight, Calendar, Shield, Camera, Users, Code } from 'lucide-react';

const services = [
  { name: "Shirt", price: "70", category: "Men", popular: true },
  { name: "Trousers / Jeans", price: "70", category: "Men", popular: true },
  { name: "Suit (2 Pc)", price: "250", category: "Men" },
  { name: "Suit (3 Pc)", price: "350", category: "Men" },
  { name: "Kurta Pyjama", price: "150", category: "Men" },
  { name: "Sherwani", price: "400+", category: "Men" },
  { name: "Tie", price: "40", category: "Men" },
  { name: "Saree (Plain)", price: "150", category: "Women", popular: true },
  { name: "Saree (Heavy/Zari)", price: "250+", category: "Women" },
  { name: "Suit (Simple)", price: "150", category: "Women", popular: true },
  { name: "Lehenga", price: "450+", category: "Women" },
  { name: "Gown", price: "350+", category: "Women" },
  { name: "Blouse", price: "60", category: "Women" },
  { name: "Shawl / Stole", price: "120", category: "Women" },
  { name: "Sweater (Half)", price: "100", category: "Winter" },
  { name: "Sweater (Full)", price: "120", category: "Winter" },
  { name: "Jacket", price: "200", category: "Winter" },
  { name: "Coat / Blazer", price: "200", category: "Winter" },
  { name: "Overcoat", price: "300", category: "Winter" },
  { name: "Bedsheet (Single)", price: "100", category: "Household" },
  { name: "Bedsheet (Double)", price: "150", category: "Household" },
  { name: "Blanket (Single)", price: "250", category: "Household" },
  { name: "Blanket (Double)", price: "350", category: "Household" },
  { name: "Curtains (Per Panel)", price: "120", category: "Household" },
  { name: "Sofa Cover (Per Seat)", price: "80", category: "Household" },
  { name: "Steam Press (Only)", price: "15", category: "Others" },
  { name: "Darning (Rafoo)", price: "On View", category: "Others" },
  { name: "Dyeing", price: "On View", category: "Others" },
];

const categories = ['All', 'Men', 'Women', 'Household', 'Winter', 'Others'];

const features = [
  { icon: Clock, title: "24 Hour Service", desc: "Fast turnaround time", color: "from-blue-500 to-cyan-500" },
  { icon: Shield, title: "Quality Assured", desc: "Premium care guaranteed", color: "from-green-500 to-emerald-500" },
  { icon: MapPin, title: "Free Pickup", desc: "Doorstep service available", color: "from-orange-500 to-red-500" },
  { icon: Award, title: "Expert Team", desc: "20+ years experience", color: "from-purple-500 to-pink-500" }
];

// Placeholder images - Replace with actual shop photos
const galleryImages = [
  { id: 1, type: "shop", label: "Our Shop Front" },
  { id: 2, type: "interior", label: "Modern Facility" },
  { id: 3, type: "team", label: "Our Expert Team" },
  { id: 4, type: "service", label: "Quality Service" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-indigo-50/30">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Enhanced Logo with Animation */}
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative transform group-hover:scale-110 transition-transform duration-300" fill="none">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="url(#logoGrad)" />
                  <path d="M50 20 C50 20 35 25 25 40 L30 45 L50 35 L70 45 L75 40 C65 25 50 20 50 20 Z" fill="white" stroke="white" strokeWidth="2"/>
                  <path d="M50 15 V 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M30 45 L30 75 C30 85 70 85 70 75 L70 45" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                  <path d="M42 55 Q50 60 58 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="40" cy="45" r="2" fill="white" />
                  <circle cx="60" cy="45" r="2" fill="white" />
                  <path d="M48 30 L52 30" stroke="#1D4ED8" strokeWidth="2" />
                </svg>
              </div>
              
              <div>
                <h1 className="font-bold text-xl leading-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Kavya Dry Cleaners
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                  Premium Care Since 2000
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <a href="tel:9899320667" className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all duration-200">
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919899320667?text=Hi" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-green-500 to-green-600 p-2.5 rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all duration-200">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Stunning Hero Section */}
      <div className="relative pt-24 pb-12 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg animate-bounce">
              <Star className="w-4 h-4 fill-current" />
              Tagore Garden's Most Trusted Dry Cleaners
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Look Sharp.
              </span>
              <br/>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                Feel Fresh.
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-700 mb-10 max-w-2xl mx-auto font-medium">
              Premium dry cleaning & laundry services delivered to your doorstep in <span className="font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">24 hours</span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a href="https://wa.me/919899320667?text=Hi, I want to schedule a pickup" target="_blank" rel="noopener noreferrer" 
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Schedule Pickup
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="tel:9899320667" 
                className="bg-white text-slate-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-slate-200">
                Call Now
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-white/50">
                <div className={`bg-gradient-to-br ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1 text-lg">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-3">
            <Camera className="w-4 h-4" />
            Our Shop & Team
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-2">See Our Facility</h3>
          <p className="text-slate-600">Modern equipment & experienced professionals</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              {/* Placeholder background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-bold">{img.label}</p>
                  <p className="text-xs opacity-75 mt-1">Photo Coming Soon</p>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-bold text-sm">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500 bg-blue-50 inline-block px-6 py-3 rounded-xl">
            📸 <span className="font-semibold">Upload your shop photos</span> to replace these placeholders
          </p>
        </div>
      </div>

      {/* Address Card - Enhanced */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=D-313+Tagore+Garden+Extn+New+Delhi+110027', '_blank')}
          className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-orange-200/50 cursor-pointer hover:shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-5 rounded-2xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-2xl text-slate-800 mb-3 flex items-center gap-2">
                Visit Our Shop
                <Calendar className="w-6 h-6 text-orange-600" />
              </h3>
              <p className="text-slate-700 mb-2 font-bold text-lg">
                D-313, Tagore Garden Extension, New Delhi - 110027
              </p>
              <p className="text-base text-slate-600 mb-4 font-medium">
                📅 Open: Monday - Saturday, 9:00 AM - 8:00 PM
              </p>
              <div className="flex items-center gap-3 text-orange-600 font-black text-lg group-hover:gap-4 transition-all">
                Get Directions on Google Maps
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 pb-32">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-3">
            <Shirt className="w-4 h-4" />
            Complete Price List
          </div>
          <h3 className="text-4xl font-black text-slate-800 mb-3">Our Services & Pricing</h3>
          <p className="text-lg text-slate-600 font-medium">Transparent pricing, premium quality</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 mb-10 border-2 border-white/50">
          <div className="relative mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Search services (e.g., Suit, Saree, Shirt)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-base font-medium text-slate-800 placeholder:text-slate-400 transition-all"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-base font-black whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Service Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.length > 0 ? (
            filteredServices.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6 border-2 border-slate-100 group relative overflow-hidden">
                {item.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                )}
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-black text-xl text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                      {item.name}
                    </h4>
                    <p className="text-xs font-bold text-slate-500 bg-slate-100 inline-block px-3 py-1 rounded-full">
                      {item.category}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-baseline justify-between mt-4">
                  <div>
                    <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ₹{item.price}
                    </span>
                  </div>
                  <a 
                    href="tel:9899320667" 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all no-underline inline-block"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl shadow-xl">
              <Search className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-xl font-bold">No services found</p>
              <p className="text-slate-400 text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8 bg-blue-50 inline-block px-6 py-3 rounded-xl font-medium w-full">
          * Prices may vary based on fabric type and condition
        </p>
      </div>

      {/* Developer Credit Section */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl shadow-2xl p-8 md:p-10 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-200 font-semibold mb-1">Website Crafted By</p>
                <h4 className="text-2xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Aryan Kanojia
                </h4>
                <p className="text-sm text-slate-300 mt-1">Full Stack Developer & Designer</p>
              </div>
            </div>
            
            <a 
              href="https://www.aryankanojia.live/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 no-underline"
            >
              View Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t-2 border-slate-200 shadow-2xl z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex gap-3">
          <a href="tel:9899320667" 
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-slate-700 to-slate-900 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95">
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a href="https://wa.me/919899320667?text=Hi Kavya Dry Cleaners" target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95">
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}