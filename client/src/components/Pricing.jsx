import { Search } from 'lucide-react';
import { useState } from 'react';

const Pricing = ({ services }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryItems = (catName) => {
    return services
      .filter(s => s.category === catName)
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      // Removed .slice(0, 8) so you see ALL items in that category
  };

  // Maps backend category names to display titles
  // NOW INCLUDES ALL 6 CATEGORIES FROM YOUR SERVER
  const categories = [
    { title: "Men's Wear", cat: "Gents Wear" },
    { title: "Ladies Wear", cat: "Ladies Wear" },
    { title: "Winter & Jackets", cat: "Winter & Jackets" },
    { title: "Household & Bedding", cat: "Household" },
    { title: "Steam Press Only", cat: "Steam Press" },
    { title: "Others (Shoes/Sofa)", cat: "Others" }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Kavya <span className="text-slate-500">Dry Cleaning Rate</span></h2>
            <p className="text-slate-500 mt-2">Transparent pricing. No hidden charges.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Pricing Grid - Changed to 3 columns so 6 categories look symmetrical */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, idx) => (
            <div key={idx} className="border rounded-2xl p-6 bg-slate-50 hover:shadow-lg transition-shadow">
               <h3 className="text-xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">{c.title}</h3>
               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {getCategoryItems(c.cat).length > 0 ? (
                    getCategoryItems(c.cat).map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm border-b border-slate-200/50 pb-2 last:border-0">
                        <span className="text-slate-600 font-medium">{item.name}</span>
                        <div className="text-right">
                           {/* Handle Price: If number show ₹, if text (like 'Call') show plain */}
                           {typeof item.price === 'number' || !isNaN(item.price) ? (
                             <span className="font-bold text-blue-600">₹{item.price}</span>
                           ) : (
                             <span className="font-bold text-orange-500 text-xs uppercase">{item.price}</span>
                           )}
                           
                           {/* Show Unit (e.g. /panel) or Note if exists */}
                           {(item.unit || item.note) && (
                             <span className="block text-[10px] text-slate-400">
                               {item.unit || item.note}
                             </span>
                           )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm italic">No items found.</p>
                  )}
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;