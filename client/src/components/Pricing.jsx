import { Search, TrendingDown } from 'lucide-react';
import { useState } from 'react';

const Pricing = ({ services }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryItems = (catName) => {
    return services
      .filter(s => s.category === catName)
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const categories = [
    { title: "Men's Wear", cat: "Gents Wear", color: "blue" },
    { title: "Ladies Wear", cat: "Ladies Wear", color: "pink" },
    { title: "Winter & Jackets", cat: "Winter & Jackets", color: "indigo" },
    { title: "Household & Bedding", cat: "Household", color: "green" },
    { title: "Steam Press Only", cat: "Steam Press", color: "orange" },
    { title: "Others (Shoes/Sofa)", cat: "Others", color: "purple" }
  ];

  return (
    <section id="pricing" className="py-12 md:py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50/30 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-8 md:mb-10">
          
          {/* Title */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Kavya <span className="text-blue-600">Dry Cleaning Rate</span>
            </h2>
            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Transparent pricing. No hidden charges.
            </p>

            {/* ✅ PDF BUTTON ADDED */}
            <div className="flex justify-center md:justify-start mt-4">
              <a 
                href="/rate-list.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-red-600 transition-all text-sm md:text-base"
              >
                📄 View Full Rate List (PDF)
              </a>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md md:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search items (e.g., shirt, saree)..." 
              className="w-full pl-10 pr-4 py-3 md:py-3.5 border border-slate-200 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm md:text-base"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((c, idx) => {
            const items = getCategoryItems(c.cat);
            const colorClasses = {
              blue: "from-blue-500 to-blue-600",
              pink: "from-pink-500 to-pink-600", 
              indigo: "from-indigo-500 to-indigo-600",
              green: "from-green-500 to-green-600",
              orange: "from-orange-500 to-orange-600",
              purple: "from-purple-500 to-purple-600"
            };
            
            return (
              <div key={idx} className="group">
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${colorClasses[c.color]} p-4 md:p-6 text-white relative overflow-hidden`}>
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-bold relative z-10">{c.title}</h3>
                    <p className="text-xs md:text-sm text-white/80 mt-1 relative z-10">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  
                  {/* Items */}
                  <div className="p-4 md:p-6 flex-1 overflow-hidden">
                    <div className="space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {items.length > 0 ? (
                        items.map((item, i) => (
                          <div key={i} className="flex justify-between items-start gap-3 pb-3 border-b border-slate-100 last:border-0 group/item hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors">
                            <span className="text-slate-700 font-medium text-sm md:text-base leading-tight flex-1">
                              {item.name}
                            </span>
                            <div className="text-right flex-shrink-0">
                              {typeof item.price === 'number' || !isNaN(item.price) ? (
                                <span className="font-bold text-blue-700 text-base md:text-lg whitespace-nowrap">
                                  ₹{item.price}
                                </span>
                              ) : (
                                <span className="font-bold text-orange-600 text-xs uppercase whitespace-nowrap bg-orange-50 px-2 py-1 rounded">
                                  {item.price}
                                </span>
                              )}
                              
                              {(item.unit || item.note) && (
                                <span className="block text-[10px] text-slate-400 mt-0.5">
                                  {item.unit || item.note}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Search size={32} className="mx-auto text-slate-300 mb-2" />
                          <p className="text-slate-400 text-sm italic">No items found</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  {items.length > 0 && (
                    <div className="px-4 pb-4 md:px-6 md:pb-6">
                      <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 py-2 px-3 rounded-lg text-xs font-semibold">
                        <TrendingDown size={14} />
                        Best Rates in Delhi
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white text-center shadow-2xl">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Don't see your item?</h3>
          <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base">
            Call us for a custom quote. We handle all types of garments and fabrics.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="tel:9899320667" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold">
              📞 Call: 9899320667
            </a>
            <a href="https://wa.me/919899320667" target="_blank" rel="noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
              💬 WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;