'use client'; // Required because we use useState (interactivity)

import { useState } from 'react';
import { Phone, MessageCircle, Shirt, CheckCircle, Clock, MapPin, Search } from 'lucide-react';

// --- DATA ---
const services = [
  // Men
  { name: "Shirt", price: "70", category: "Men" },
  { name: "Trousers / Jeans", price: "70", category: "Men" },
  { name: "Suit (2 Pc)", price: "250", category: "Men" },
  { name: "Suit (3 Pc)", price: "350", category: "Men" },
  { name: "Kurta Pyjama", price: "150", category: "Men" },
  { name: "Sherwani", price: "400+", category: "Men" },
  { name: "Tie", price: "40", category: "Men" },
  // Women
  { name: "Saree (Plain)", price: "150", category: "Women" },
  { name: "Saree (Heavy/Zari)", price: "250+", category: "Women" },
  { name: "Suit (Simple)", price: "150", category: "Women" },
  { name: "Lehenga", price: "450+", category: "Women" },
  { name: "Gown", price: "350+", category: "Women" },
  { name: "Blouse", price: "60", category: "Women" },
  { name: "Shawl / Stole", price: "120", category: "Women" },
  // Winter
  { name: "Sweater (Half)", price: "100", category: "Winter" },
  { name: "Sweater (Full)", price: "120", category: "Winter" },
  { name: "Jacket", price: "200", category: "Winter" },
  { name: "Coat / Blazer", price: "200", category: "Winter" },
  { name: "Overcoat", price: "300", category: "Winter" },
  // Household
  { name: "Bedsheet (Single)", price: "100", category: "Household" },
  { name: "Bedsheet (Double)", price: "150", category: "Household" },
  { name: "Blanket (Single)", price: "250", category: "Household" },
  { name: "Blanket (Double)", price: "350", category: "Household" },
  { name: "Curtains (Per Panel)", price: "120", category: "Household" },
  { name: "Sofa Cover (Per Seat)", price: "80", category: "Household" },
  // Others
  { name: "Steam Press (Only)", price: "15", category: "Others" },
  { name: "Darning (Rafoo)", price: "On View", category: "Others" },
  { name: "Dyeing", price: "On View", category: "Others" },
];

const categories = ['All', 'Men', 'Women', 'Household', 'Winter', 'Others'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredServices = services.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main>
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Custom Cartoon Logo SVG */}
            <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#2563EB" />
              <path d="M50 20 C50 20 35 25 25 40 L30 45 L50 35 L70 45 L75 40 C65 25 50 20 50 20 Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M50 15 V 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M30 45 L30 75 C30 85 70 85 70 75 L70 45" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M42 55 Q50 60 58 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="40" cy="45" r="2" fill="white" />
              <circle cx="60" cy="45" r="2" fill="white" />
              <path d="M48 30 L52 30" stroke="#2563EB" strokeWidth="2" />
            </svg>
            <div>
              <h1 className="font-bold text-lg leading-tight text-blue-900">Kavya Dry Cleaners</h1>
              <p className="text-xs text-slate-500">Premium Care</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <a href="tel:9899320667" className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
            <a href="https://wa.me/919899320667?text=Hi" target="_blank" rel="noopener noreferrer" className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-200 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-8 rounded-b-3xl shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
          <Shirt className="w-44 h-44" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Look Sharp.<br/>Clean Clothes in 24hrs.</h2>
          <p className="text-blue-100 text-sm mb-6 max-w-xs">Expert dry cleaning, steam pressing, and laundry services right at your doorstep.</p>
          
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Quality Wash
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> Fast Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4">
        
        {/* Address Card */}
        <div 
          onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=D-313+Tagore+Garden+Extn+New+Delhi+110027', '_blank')}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3 mb-6 cursor-pointer hover:shadow-md transition-shadow active:scale-95 duration-200"
        >
          <div className="bg-orange-100 text-orange-600 p-2 rounded-lg mt-1 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-sm">Visit Our Shop</h3>
            <p className="text-sm text-slate-600 leading-relaxed mt-1">
              D-313, Tagore Garden Extn, New Delhi - 110027
            </p>
            <p className="text-blue-600 text-xs font-semibold mt-2 flex items-center gap-1">
              Get Directions →
            </p>
          </div>
        </div>

        {/* Search & Filter Area */}
        <div className="sticky top-[72px] z-40 bg-slate-50 pt-2 pb-4">
          {/* Search Input */}
          <div className="relative mb-4">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              placeholder="Search for items (e.g., Suit, Saree)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 bg-white text-sm outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Rate List Table */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-lg text-slate-800">Rate List</h3>
            <span className="text-xs text-slate-500">*Prices may vary based on fabric</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Item Name</th>
                  <th className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.length > 0 ? (
                  filteredServices.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.category}</div>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-blue-600">
                        ₹{item.price}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-10 opacity-50">
                      <div className="flex justify-center mb-2">
                        <Search className="w-12 h-12 text-slate-300" />
                      </div>
                      <p>No items found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex gap-3 z-50 md:max-w-md md:mx-auto">
        <a href="tel:9899320667" className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-3 rounded-xl font-semibold active:scale-95 transition-transform no-underline">
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a href="https://wa.me/919899320667?text=Hi Kavya Dry Cleaners" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-green-200 active:scale-95 transition-transform no-underline">
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </main>
  );
}