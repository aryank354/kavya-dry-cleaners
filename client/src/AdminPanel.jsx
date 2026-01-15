import { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { Trash2, Plus, Printer, MessageCircle, LogOut, Search, X, History, FileText } from 'lucide-react';

const AdminPanel = ({ onLogout, apiUrl }) => {
  // --- STATE ---
  const [services, setServices] = useState([]);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [remarks, setRemarks] = useState('');
  const [recentBills, setRecentBills] = useState([]);
  
  // Cart State
  const [itemSearch, setItemSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [price, setPrice] = useState(''); 
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const wrapperRef = useRef(null);
  const priceInputRef = useRef(null); // Ref to auto-focus price

  // --- INIT ---
  useEffect(() => {
    // Fetch Rates
    const fetchServices = async () => {
      try {
        const response = await axios.get(apiUrl);
        setServices(response.data);
      } catch (error) {
        console.error("Error loading rates");
      }
    };
    fetchServices();

    // Load History
    const history = JSON.parse(localStorage.getItem("kavya_bill_history") || "[]");
    setRecentBills(history);
  }, [apiUrl]);

  // --- CLOSE SEARCH DROPDOWN ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // --- HANDLERS ---
  const handleSearchChange = (e) => {
    setItemSearch(e.target.value);
    setShowSuggestions(true);
  };

  const selectSuggestion = (item) => {
    setItemSearch(item.name);
    // Remove non-numeric characters (e.g., "80 /panel" -> "80")
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    setPrice(numericPrice);
    setShowSuggestions(false);
    // Focus quantity after selection
    // (Optional: focus quantity or add button, usually focusing quantity is nice)
  };

  const selectCustomItem = () => {
    // Just close dropdown and focus price
    setShowSuggestions(false);
    if(priceInputRef.current) {
        priceInputRef.current.focus();
    }
  };

  const addToCart = () => {
    if (!itemSearch || !price) return;
    const newItem = {
      id: Date.now(),
      name: itemSearch, // Uses whatever is typed (Custom or Selected)
      price: parseFloat(price),
      qty: parseInt(quantity),
      total: parseFloat(price) * parseInt(quantity)
    };
    setCart([...cart, newItem]);
    
    // Reset inputs
    setItemSearch('');
    setPrice('');
    setQuantity(1);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateGrandTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(itemSearch.toLowerCase())
  );

  // --- HELPER: FORMAT DATE (DD/MM/YYYY) ---
  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-GB');
  };

  // --- SAVE TO HISTORY ---
  const saveToHistory = () => {
    const newBill = {
      id: Date.now(),
      customer: customer.name,
      amount: calculateGrandTotal(),
      date: formatDate(new Date()),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updatedHistory = [newBill, ...recentBills].slice(0, 10);
    setRecentBills(updatedHistory);
    localStorage.setItem("kavya_bill_history", JSON.stringify(updatedHistory));
  };

  // --- PDF GENERATION ---
  const generatePDF = () => {
    if (!customer.name || cart.length === 0) return alert("Fill customer name & add items!");

    try {
      const doc = new jsPDF();
      const orderDate = new Date();
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(deliveryDate.getDate() + 3);

      // Header Blue Box
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, 210, 40, 'F');
      
      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text("KAVYA DRY CLEANERS", 105, 15, null, null, "center");
      
      // Shop Address
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("D-313, Tagore Garden Extension, New Delhi - 110027", 105, 25, null, null, "center");
      doc.text("Mob: 9899320667", 105, 33, null, null, "center");

      // Customer Info
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(`Customer: ${customer.name}`, 15, 50);
      doc.text(`Phone: ${customer.phone}`, 15, 56);
      doc.text(`Address: ${customer.address || 'N/A'}`, 15, 62);
      
      // Remarks
      if(remarks) {
        doc.setFont("helvetica", "italic");
        doc.text(`Remarks: ${remarks}`, 15, 68);
        doc.setFont("helvetica", "normal");
      }

      // Dates (Formatted DD/MM/YYYY)
      doc.text(`Bill Date: ${formatDate(orderDate)}`, 130, 50);
      
      doc.setTextColor(220, 38, 38); // Red
      doc.setFont("helvetica", "bold");
      doc.text(`Delivery: ${formatDate(deliveryDate)}`, 130, 56);

      // Table
      const tableRows = cart.map(item => [item.name, item.qty, item.price, item.total]);

      autoTable(doc, {
        head: [["Item", "Qty", "Rate", "Total"]],
        body: tableRows,
        startY: remarks ? 75 : 70,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] },
        foot: [['', '', 'Grand Total:', calculateGrandTotal()]],
        footStyles: { fillColor: [240, 240, 240], textColor: [0,0,0], fontStyle: 'bold' }
      });

      // Footer
      const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) || 150;
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont("helvetica", "italic");
      doc.text("Thank you for choosing Kavya Dry Cleaners!", 105, finalY + 20, null, null, "center");

      doc.save(`${customer.name.replace(/\s/g, '_')}_Bill.pdf`);
      saveToHistory();

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // --- WHATSAPP LOGIC ---
  const sendWhatsApp = () => {
    if(!customer.phone) return alert("Please enter customer phone number");
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    
    let message = `*Kavya Dry Cleaners Bill*%0a`;
    message += `Customer: ${customer.name}%0a`;
    message += `Total: ₹${calculateGrandTotal()}%0a`;
    message += `*Delivery: ${formatDate(deliveryDate)}*%0a%0a`; // Fixed Date
    if(remarks) message += `Note: ${remarks}%0a`;
    message += `Items:%0a`;
    cart.forEach(item => message += `- ${item.name} x ${item.qty} (₹${item.total})%0a`);
    message += `%0aThank you!`;

    window.open(`https://wa.me/91${customer.phone}?text=${message}`, '_blank');
    saveToHistory();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 pt-24">
      {/* Header Bar */}
      <div className="bg-slate-900 rounded-xl p-4 md:p-6 mb-6 flex justify-between items-center text-white shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold">Admin Portal</h2>
        <button onClick={onLogout} className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium transition-colors">
          <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Input Forms */}
        <div className="space-y-6">
          
          {/* 1. Customer Details */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-800 mb-4 text-lg border-b pb-2">1. Customer Details</h3>
             <div className="space-y-4">
               <input 
                 type="text" placeholder="Customer Name *" 
                 className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                 value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} 
               />
               <input 
                 type="number" placeholder="Phone Number" 
                 className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                 value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} 
               />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" placeholder="Address" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} 
                  />
                  <input 
                    type="text" placeholder="Remarks (e.g. Stains)" 
                    className="w-full p-3 bg-yellow-50 border border-yellow-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder-yellow-600 text-yellow-900"
                    value={remarks} onChange={e => setRemarks(e.target.value)} 
                  />
               </div>
             </div>
          </div>

          {/* 2. Add Clothes (Smart Search + Custom) */}
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 shadow-sm relative">
             <h3 className="font-bold text-blue-900 mb-4 text-lg border-b border-blue-200 pb-2">2. Add Clothes</h3>
             
             <div className="flex flex-col gap-3">
                {/* Search Box */}
                <div className="relative w-full" ref={wrapperRef}>
                    <input 
                      type="text" 
                      className="w-full p-3 pl-10 border border-blue-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                      placeholder="Search item (e.g. Pant)"
                      value={itemSearch}
                      onChange={handleSearchChange}
                      onFocus={() => setShowSuggestions(true)}
                    />
                    <Search className="absolute left-3 top-3.5 text-blue-400 w-5 h-5" />
                    
                    {/* Clear Button */}
                    {itemSearch && (
                      <button onClick={() => { setItemSearch(''); setPrice(''); }} className="absolute right-3 top-3.5 text-slate-400 hover:text-red-500">
                        <X className="w-5 h-5" />
                      </button>
                    )}

                    {/* Suggestions Dropdown */}
                    {showSuggestions && itemSearch && (
                      <div className="absolute z-20 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-2 max-h-60 overflow-y-auto">
                        {filteredServices.length > 0 ? (
                          filteredServices.map((s, i) => (
                            <div key={i} onClick={() => selectSuggestion(s)} className="p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 flex justify-between items-center group">
                              <span className="font-medium text-slate-700 group-hover:text-blue-700">{s.name}</span>
                              <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">₹{s.price}</span>
                            </div>
                          ))
                        ) : (
                          // CUSTOM OPTION WHEN NOT FOUND
                          <div 
                            onClick={selectCustomItem}
                            className="p-3 hover:bg-green-50 cursor-pointer border-b border-slate-50 flex items-center gap-2 text-green-700 font-medium"
                          >
                            <Plus size={16} /> Add "{itemSearch}" as Custom Item
                          </div>
                        )}
                        {/* Always show custom option at bottom even if found (optional UX choice) */}
                        {filteredServices.length > 0 && (
                             <div 
                             onClick={selectCustomItem}
                             className="p-2 text-xs text-center text-slate-400 hover:text-blue-600 cursor-pointer border-t border-slate-100"
                           >
                             Or add "{itemSearch}" as custom
                           </div>
                        )}
                      </div>
                    )}
                </div>

                {/* Price & Qty Row (Responsive) */}
                <div className="flex gap-3">
                   <div className="relative flex-1">
                      <span className="absolute left-3 top-3 text-slate-400 font-bold">₹</span>
                      <input 
                        ref={priceInputRef} // AUTO FOCUS TARGET
                        type="number" 
                        className="w-full p-3 pl-8 border border-blue-200 rounded-xl font-bold text-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Price"
                        value={price} 
                        onChange={e => setPrice(e.target.value)} 
                      />
                   </div>
                   <div className="w-24">
                      <input 
                        type="number" 
                        className="w-full p-3 text-center border border-blue-200 rounded-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                        value={quantity} 
                        onChange={e => setQuantity(e.target.value)} 
                        min="1"
                      />
                   </div>
                   <button 
                      onClick={addToCart} 
                      className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-transform active:scale-95"
                   >
                      <Plus size={24} />
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Bill Preview & Actions */}
        <div className="flex flex-col h-full space-y-6">
          
          {/* 3. Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden">
             <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">3. Bill Preview</h3>
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">{cart.length} items</span>
             </div>

             {/* Scrollable Table Area */}
             <div className="flex-1 overflow-y-auto min-h-[300px] p-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                    <FileText size={48} className="opacity-20" />
                    <p className="text-sm">Add items to start billing</p>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="text-left p-3">Item</th>
                        <th className="text-center p-3">Qty</th>
                        <th className="text-right p-3">Total</th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {cart.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-medium text-slate-700">{item.name}</td>
                          <td className="p-3 text-center text-slate-500">x{item.qty}</td>
                          <td className="p-3 text-right font-bold text-slate-800">₹{item.total}</td>
                          <td className="p-3 text-right">
                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
             </div>

             {/* Total Bar */}
             <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
                <span className="text-slate-300">Total Amount</span>
                <span className="text-3xl font-bold">₹{calculateGrandTotal()}</span>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={generatePDF}
               className="bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 flex flex-col md:flex-row justify-center items-center gap-2 shadow-lg shadow-green-100 transition-transform active:scale-95"
             >
               <Printer size={20} /> <span>Print Bill</span>
             </button>
             <button 
               onClick={sendWhatsApp}
               className="bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 flex flex-col md:flex-row justify-center items-center gap-2 shadow-lg shadow-green-100 transition-transform active:scale-95"
             >
               <MessageCircle size={20} /> <span>WhatsApp</span>
             </button>
          </div>

          {/* Local History */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
               <History size={12} /> Recent Local Bills
             </h4>
             <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
               {recentBills.length === 0 ? (
                 <p className="text-xs text-slate-300 italic">No history yet.</p>
               ) : (
                 recentBills.map((bill, i) => (
                   <div key={i} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded border border-slate-100">
                     <div className="flex flex-col">
                       <span className="font-bold text-slate-700 truncate max-w-[120px]">{bill.customer}</span>
                       <span className="text-slate-400">{bill.date}</span>
                     </div>
                     <span className="font-bold text-blue-600">₹{bill.amount}</span>
                   </div>
                 ))
               )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;