import { CheckCircle, Play, X, Tag, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const Services = ({ onRequestCallback }) => {
  const [playingVideo, setPlayingVideo] = useState(null);

  const shopImages = [
    "/shop1.jpg",
    "/shop2.jpg",
    "/shop3.jpg",
    "/shop5.jpg"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % shopImages.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [shopImages.length]);

  const serviceList = [
    { 
      title: "Ornamental Dress", 
      desc: "Ornamental and ethnic dresses look gorgeous, but with delicate intricacies of design on the fabric, these beautiful garments are not suitable for hand or machine wash.", 
      image: "/dress.jpg",      
      imgLabel: "Dress",
      deliveryTime: "3-5 Days",
      price: "700 - 1000",
      originalPrice: 1200
    },
    { 
      title: "Saree + Blouse", 
      desc: "Indian women have a special love for their sarees. Cleaning this extended piece of elegant cloth might not be that easy. To maintain quality and color, dry-cleaning is the best option.", 
      image: "/saree.jpg",      
      imgLabel: "Saree",
      deliveryTime: "3-4 Days",
      price: 250,          
      originalPrice: 300   
    },
    { 
      title: "Gent Suit (3pc)", 
      desc: "Suit is a formal dress that adds style and class to your personality. Indeed these costly items deserve the quality care of professional Dry-Cleaning.", 
      image: "/suit.jpg",       
      imgLabel: "Suit",
      deliveryTime: "2-3 Days",
      price: 400,          
      originalPrice: 500   
    },
    { 
      title: "Sherwani (3pc)", 
      desc: "Royal care for your royal attire. We specialize in cleaning heavy embroidery, velvet, and silk sherwanis without damaging the fabric.", 
      image: "/sherwani.jpg", 
      imgLabel: "Sherwani",
      deliveryTime: "4-5 Days",
      price: 360,
      originalPrice: 600
    },
    { 
      title: "Shirt", 
      desc: "Crisp steam pressing and premium dry cleaning for your daily office wear. Get wrinkle-free, fresh clothes every time.", 
      image: "/shirt.jpg", 
      imgLabel: "Shirt/Pant",
      deliveryTime: "2 Days",
      price: 80,          
      originalPrice: 120   
    },
    { 
      title: "Jacket", 
      desc: "Professional cleaning for winter wear including leather jackets and hoodies. We remove odors and lint while maintaining warmth.", 
      image: "/jacket.jpg", 
      imgLabel: "Winter Wear",
      deliveryTime: "3-4 Days",
      price: 200,
      originalPrice: 350
    },
    { 
      title: "Shoes", 
      desc: "Give your sneakers, leather shoes, and suede boots a fresh life. Deep cleaning that removes dirt and restores color.", 
      image: "/shoes.jpg", 
      imgLabel: "Shoes",
      deliveryTime: "2-3 Days",
      price: 250,
      originalPrice: 400
    },
    { 
      title: "Sofa", 
      desc: "Complete home hygiene! Deep cleaning for sofas to remove dust, allergens, and tough stains.", 
      image: "/sofa.jpg", 
      imgLabel: "Home Care",
      deliveryTime: "3-5 Days",
      price: "300 per seat",
      originalPrice: 400
    }
  ];

  const videoList = [
    { id: "cxPsRHDNCLg", title: "Grand Shop Opening", thumbnail: "/thumbnail.png" },
    { id: "2", title: "Premium Packaging" },
    { id: "3", title: "Stain Removal Process" },
    { id: "4", title: "Steam Pressing" }
  ];

  return (
    <div id="services" className="font-sans">
      
      {/* Info Section - Mobile Optimized */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              Dry Cleaning at its best
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-base md:text-lg">
              Preserving the quality of your expensive garments requires expert care. <strong>Kavya Dry Cleaners</strong> provides premium dry cleaning and fabric restoration services to keep your clothes looking new.
            </p>
            
            {/* Features Grid - 2 columns on mobile, responsive */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              {["Stain Removal", "Premium Packaging", "Express Delivery", "Fabric Protection"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-800 font-medium text-sm md:text-base">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={18} /> 
                  <span className="leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image Carousel */}
          <div className="relative order-1 md:order-2">
             <div className="w-full h-64 sm:h-80 md:h-96 bg-slate-200 rounded-2xl md:rounded-tr-[80px] md:rounded-bl-[80px] overflow-hidden shadow-lg border-2 md:border-4 border-white relative">
                {shopImages.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`} 
                    alt={`Shop View ${index}`} 
                  />
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Service Cards - Mobile-First Design */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-24">
          {serviceList.map((service, idx) => {
            const isReverse = idx % 2 !== 0;
            return (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-12 ${isReverse ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image Card - Full width on mobile */}
                <div className="w-full md:flex-1 relative group">
                   <div className={`bg-white p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-lg transition-all duration-500 hover:shadow-2xl ${isReverse ? 'md:-rotate-1 hover:rotate-0' : 'md:rotate-1 hover:rotate-0'}`}>
                      <div className="bg-slate-200 rounded-xl md:rounded-2xl h-56 sm:h-64 md:h-80 w-full flex items-center justify-center text-slate-400 text-xl font-bold overflow-hidden relative">
                         <img 
                           src={service.image} 
                           alt={service.title} 
                           className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                           onError={(e) => {
                             e.target.style.display = 'none'; 
                             e.target.parentElement.innerText = service.imgLabel; 
                           }}
                         />
                      </div>
                   </div>
                   
                   {/* Discount Badge */}
                   <div className={`absolute top-4 md:top-8 ${isReverse ? 'md:right-8 right-4' : 'md:left-8 left-4'} bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 md:px-3 md:py-1 rounded-full shadow-lg z-10 flex items-center gap-1`}>
                      <Tag size={12} /> 
                      {typeof service.price === 'number' 
                        ? `SAVE ₹${service.originalPrice - service.price}` 
                        : "BEST DEAL"
                      }
                   </div>
                </div>

                {/* Text Content - Full width on mobile */}
                <div className="w-full md:flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    {service.title} <span className="text-blue-600">Dry-Clean</span>
                  </h3>
                  
                  {/* Price Section - Responsive */}
                  <div className="flex items-center gap-2 md:gap-3 mb-4 flex-wrap">
                     <span className="text-slate-400 text-base md:text-lg line-through decoration-red-400 decoration-2">
                       ₹{service.originalPrice}
                     </span>
                     
                     <span className="text-2xl md:text-3xl font-extrabold text-blue-700">
                       ₹{service.price}
                     </span>
                     
                     <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Best Price
                     </span>
                  </div>

                  <div className="w-12 md:w-16 h-1 bg-orange-500 mb-4 md:mb-6"></div>
                  
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                    {service.desc}
                  </p>
                  
                  {/* CTA Section - Stacked on mobile */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6">
                    <button 
                      onClick={onRequestCallback} 
                      className="bg-orange-500 text-white px-6 md:px-8 py-3 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all active:scale-95 text-sm md:text-base w-full sm:w-auto"
                    >
                      Request Call Back
                    </button>
                    
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-400 bg-slate-100 px-4 py-3 rounded-lg sm:bg-transparent sm:px-0">
                      <Clock size={16} className="text-blue-500" />
                      <div>
                        <span className="block text-slate-500 text-[10px] md:text-xs uppercase tracking-wider">Est. Time</span>
                        <span className="text-slate-700">{service.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Videos Section - Mobile Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-8 md:mb-12">
             <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Our Process in Action</h2>
             <p className="text-slate-500 mt-2 text-sm md:text-base">Watch our shop opening and cleaning process</p>
           </div>
           
           {/* Responsive Grid: 2 cols mobile, 4 cols desktop */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {videoList.map((video, index) => (
                <div 
                  key={index} 
                  onClick={() => setPlayingVideo(video.id)}
                  className="aspect-video bg-slate-100 rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all border border-slate-200"
                >
                   {video.thumbnail ? (
                     <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                   ) : (
                     <div className="absolute inset-0 bg-slate-200 flex items-center justify-center p-2">
                        <span className="text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest text-center">{video.title}</span>
                     </div>
                   )}

                   <div className="w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                      <Play size={18} className="md:w-6 md:h-6" fill="#2563EB" />
                   </div>
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                   
                   <div className="absolute bottom-2 left-2 right-2">
                      <span className="bg-black/70 text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded truncate block text-center backdrop-blur-md">
                        {video.title}
                      </span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Video Modal - Mobile Optimized */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4" onClick={() => setPlayingVideo(null)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
             <button 
               className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-red-500 z-10 bg-black/50 rounded-full p-1.5 md:p-2 transition-colors"
               onClick={(e) => {
                 e.stopPropagation();
                 setPlayingVideo(null);
               }}
             >
               <X size={24} className="md:w-8 md:h-8" />
             </button>
             
             <iframe 
               src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`} 
               title="YouTube video player" 
               className="w-full h-full"
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default Services;