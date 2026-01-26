import { CheckCircle, Play, X, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

const Services = ({ onRequestCallback }) => {
  const [playingVideo, setPlayingVideo] = useState(null);

  // --- 1. SHOP IMAGES FOR AUTO SLIDER ---
  const shopImages = [
    "/shop1.jpg",
    "/shop2.jpg",
    "/shop3.jpg",
    "/shop5.jpg"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- 2. AUTO SLIDER LOGIC ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % shopImages.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [shopImages.length]);


  // --- 3. SERVICE LIST ---
  const serviceList = [
    { 
      title: "Ornamental Dress", 
      desc: "Ornamental and ethnic dresses look gorgeous, but with delicate intricacies of design on the fabric, these beautiful garments are not suitable for hand or machine wash.", 
      image: "/dress.jpg",      
      imgLabel: "Dress",
      deliveryTime: "3-5 Days",
      price: "700 - 1000",   // <--- UPDATED: Range as a String
      originalPrice: 1200    // <--- UPDATED: Increased original price so it looks like a discount
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
      price: 350,          
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
      
      {/* --- Info Section --- */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Dry Cleaning at its best</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Preserving the quality of your expensive garments requires expert care. <strong>Kavya Dry Cleaners</strong> provides premium dry cleaning and fabric restoration services to keep your clothes looking new.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {["Stain Removal", "Premium Packaging", "Express Delivery", "Fabric Protection"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-800 font-medium">
                  <CheckCircle className="text-green-500" size={20} /> {item}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <div className="w-full h-96 bg-slate-200 rounded-tr-[80px] rounded-bl-[80px] overflow-hidden shadow-lg border-4 border-white relative">
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

      {/* --- Alternating Showcase --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {serviceList.map((service, idx) => {
            const isReverse = idx % 2 !== 0;
            return (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-center gap-12 ${isReverse ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Text Side */}
                <div className="flex-1 text-left">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    {service.title} <span className="text-blue-600">Dry-Clean</span>
                  </h3>
                  
                  {/* --- PRICE TAG UI --- */}
                  <div className="flex items-center gap-3 mb-4">
                     {/* Original Price */}
                     <span className="text-slate-400 text-lg line-through decoration-red-400 decoration-2">
                       ₹{service.originalPrice}
                     </span>
                     
                     {/* Current Price */}
                     <span className="text-3xl font-extrabold text-blue-700">
                       ₹{service.price}
                     </span>
                     
                     <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Best Price
                     </span>
                  </div>

                  <div className="w-16 h-1 bg-orange-500 mb-6"></div>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <button onClick={onRequestCallback} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all active:scale-95">
                      Request Call Back
                    </button>
                    <div className="text-sm font-bold text-slate-400">
                      <span className="block text-slate-500 text-xs uppercase tracking-wider">Est. Time</span>
                      {service.deliveryTime}
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full relative group">
                   <div className={`bg-white p-3 rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02] ${isReverse ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0'}`}>
                      <div className="bg-slate-200 rounded-2xl h-80 w-full flex items-center justify-center text-slate-400 text-xl font-bold overflow-hidden relative">
                         <img 
                           src={service.image} 
                           alt={service.title} 
                           className="w-full h-full object-cover rounded-2xl"
                           onError={(e) => {
                             e.target.style.display = 'none'; 
                             e.target.parentElement.innerText = service.imgLabel; 
                           }}
                         />
                      </div>
                   </div>
                   
                   {/* Smart Discount Badge: Handles Ranges vs Numbers */}
                   <div className={`absolute top-8 ${isReverse ? 'right-8' : 'left-8'} bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1`}>
                      <Tag size={12} /> 
                      {typeof service.price === 'number' 
                        ? `SAVE ₹${service.originalPrice - service.price}` 
                        : "BEST DEAL"
                      }
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- Videos Section --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900">Our Process in Action</h2>
             <p className="text-slate-500 mt-2">Watch our shop opening and cleaning process</p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-6">
              {videoList.map((video, index) => (
                <div 
                  key={index} 
                  onClick={() => setPlayingVideo(video.id)}
                  className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all border border-slate-200"
                >
                   {video.thumbnail ? (
                     <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                   ) : (
                     <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{video.title}</span>
                     </div>
                   )}

                   <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                      <Play size={24} fill="#2563EB" className="text-blue-600 ml-1" />
                   </div>
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                   
                   <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded truncate block text-center backdrop-blur-md">
                        {video.title}
                      </span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- Video Modal --- */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPlayingVideo(null)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
             <button 
               className="absolute top-4 right-4 text-white hover:text-red-500 z-10 bg-black/50 rounded-full p-2 transition-colors"
               onClick={() => setPlayingVideo(null)}
             >
               <X size={32} />
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