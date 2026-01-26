import { useState, useEffect } from 'react';
import { Phone, Star, MapPin } from 'lucide-react';

const Hero = ({ onRequestCallback }) => {
  
  // --- 1. LIST OF YOUR SHOP PHOTOS ---
  // Make sure these files exist in your 'public' folder
  const shopImages = [
    "/shop1.jpg",
    "/shop2.jpg",
    "/shop3.jpg",
    "/shop5.jpg"
    // Add more if you have them, e.g., "/shop4.jpg"
  ];

  // --- 2. LOGIC TO CHANGE IMAGE AUTOMATICALLY ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % shopImages.length);
    }, 4000); // Change every 4000ms (4 seconds)

    return () => clearInterval(interval); // Cleanup on unmount
  }, [shopImages.length]);

  return (
    <section className="bg-[#2563EB] text-white pt-12 pb-20 md:pt-24 md:pb-32 px-4 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-block bg-blue-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2 border border-blue-400/30">
            PREMIUM CARE SINCE 2001
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Best Dry Cleaning <br/> Services at <br/> <span className="text-orange-400">Our Shop</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-lg mx-auto md:mx-0">
            Serving Tagore Garden & New Delhi with expert fabric care and premium machinery. <strong>Visit our facility</strong> to experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button onClick={() => window.open('https://www.google.com/maps/place/Kavya+Dry+Cleaners/@28.6520054,77.110972,15z/data=!4m6!3m5!1s0x390d030de9901a6d:0xaea60db71cc17434!8m2!3d28.6520054!4d77.110972!16s%2Fg%2F11mzfy7zk6?entry=tts&g_ep=EgoyMDI2MDEyMS4wIPu8ASoASAFQAw%3D%3D&skid=bfdb7d4b-795e-4326-8f31-56d6fd4b35f9', '_blank')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/20 transition-transform active:scale-95 flex items-center justify-center gap-2">
              <MapPin size={20} /> Get Directions
            </button>
            <a href="tel:9899320667" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
              <Phone size={20} /> Call Now
            </a>
          </div>
        </div>

        {/* Right Image Carousel */}
        <div className="relative hidden md:block">
          {/* Decorative Background Shape */}
          <div className="absolute inset-0 bg-white/10 rounded-[40px] rotate-3 transform scale-95"></div>
          
          {/* Image Container */}
          <div className="relative w-full h-[450px] rounded-[40px] shadow-2xl border-4 border-white/20 overflow-hidden bg-blue-800">
            {shopImages.map((imgSrc, index) => (
              <img 
                key={index}
                src={imgSrc} 
                alt={`Dry Cleaning Shop View ${index + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                onError={(e) => e.target.style.backgroundColor = '#1e40af'} 
              />
            ))}
          </div>

          {/* Floating Rating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white text-blue-900 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow z-20">
            <div className="bg-green-100 p-2 rounded-full text-green-600"><Star size={24} fill="currentColor" /></div>
            <div>
              <p className="font-bold text-lg">4.9/5</p>
              <p className="text-xs text-slate-500">Customer Rating</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    </section>
  );
};

export default Hero;