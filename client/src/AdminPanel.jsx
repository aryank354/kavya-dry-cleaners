import { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { Trash2, Plus, Printer, LogOut, Search, Bell, Send, CheckCircle } from 'lucide-react';

const AdminPanel = ({ onLogout, apiUrl }) => {
  // TABS: 'new' | 'history' | 'updates'
  const [activeTab, setActiveTab] = useState('new'); 

  // STATES
  const [services, setServices] = useState([]);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [remarks, setRemarks] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  
  // Cart
  const [itemSearch, setItemSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [price, setPrice] = useState(''); 
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // History
  const [historyBills, setHistoryBills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // News Update State
  const [newsMessage, setNewsMessage] = useState('');
  const [currentNews, setCurrentNews] = useState(null);

  const wrapperRef = useRef(null);
  const priceInputRef = useRef(null);
  const BASE_URL = apiUrl.replace('/services', '');

  // --- INIT ---
  useEffect(() => {
    const initData = async () => {
      try {
        const res = await axios.get(apiUrl);
        setServices(res.data);
      } catch (e) { console.error(e); }
      
      const today = new Date();
      today.setDate(today.getDate() + 3);
      setDeliveryDate(today.toISOString().split('T')[0]);

      fetchHistory();
      fetchNews();
    };
    initData();
  }, [apiUrl]);

  // --- API CALLS ---
  const fetchHistory = async () => {
    try {
      let d = '';
      if(filterDate) { const [y,m,day] = filterDate.split('-'); d = `${day}/${m}/${y}`; }
      const res = await axios.get(`${BASE_URL}/bills`, { params: { search: searchQuery, date: d } });
      setHistoryBills(res.data);
    } catch(e) {}
  };

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/news`);
      setCurrentNews(res.data.length > 0 ? res.data[0] : null);
    } catch(e) {}
  };

  const postNews = async () => {
    if(!newsMessage) return;
    await axios.post(`${BASE_URL}/news`, { message: newsMessage });
    setNewsMessage('');
    fetchNews();
    alert("Website Updated Successfully!");
  };

  const deleteNews = async () => {
    await axios.delete(`${BASE_URL}/news`);
    fetchNews();
  };

  const updateStatus = async (billId, newStatus) => {
    try {
      await axios.patch(`${BASE_URL}/bills/${billId}/status`, { status: newStatus });
      fetchHistory();
    } catch (error) {
      alert("Error updating status");
    }
  };

  // --- BILLING HELPERS ---
  const addToCart = () => {
    if (!itemSearch || !price) return;
    setCart([...cart, { id: Date.now(), name: itemSearch, price: parseFloat(price), qty: parseInt(quantity), total: parseFloat(price)*parseInt(quantity) }]);
    setItemSearch(''); setPrice(''); setQuantity(1);
  };
  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));
  const calculateTotal = () => cart.reduce((sum, i) => sum + i.total, 0);

  // --- GENERATE PDF ---
  const generatePDF = async () => {
    if(!customer.name || cart.length===0) return alert("Fill details!");
    const newBill = {
      customerName: customer.name, phone: customer.phone, address: customer.address,
      items: cart, totalAmount: calculateTotal(),
      date: new Date().toLocaleDateString('en-GB'),
      deliveryDate: deliveryDate ? new Date(deliveryDate).toLocaleDateString('en-GB') : '',
      remarks: remarks
    };
    await axios.post(`${BASE_URL}/bills`, newBill); // Save to DB
    
    // PDF Logic
    const doc = new jsPDF();
    doc.setFillColor(37, 99, 235); doc.rect(0,0,210,40,'F');
    doc.setFontSize(22); doc.setTextColor(255); doc.text("KAVYA DRY CLEANERS", 105, 15, null, null, "center");
    doc.setFontSize(12); doc.text("New Delhi - 110027 | Mob: 9899320667", 105, 28, null, null, "center");
    
    doc.setTextColor(0); 
    doc.text(`Customer: ${customer.name}`, 15, 50);
    doc.text(`Delivery: ${newBill.deliveryDate}`, 130, 50);
    
    autoTable(doc, {
      head: [["Item", "Qty", "Price", "Total"]],
      body: cart.map(i => [i.name, i.qty, i.price, i.total]),
      startY: 60,
      foot: [['', '', 'Total:', calculateTotal()]]
    });
    doc.save(`${customer.name}_Bill.pdf`);
    fetchHistory();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 pt-24">
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-slate-900 rounded-xl p-4 flex justify-between items-center text-white shadow-lg">
          <h2 className="text-xl font-bold">Admin Portal</h2>
          <div className="flex gap-2 text-sm">
            <button onClick={()=>setActiveTab('new')} className={`px-3 py-2 rounded ${activeTab==='new'?'bg-blue-600':'hover:bg-white/10'}`}>+ New Bill</button>
            <button onClick={()=>setActiveTab('history')} className={`px-3 py-2 rounded ${activeTab==='history'?'bg-blue-600':'hover:bg-white/10'}`}>History</button>
            <button onClick={()=>setActiveTab('updates')} className={`px-3 py-2 rounded ${activeTab==='updates'?'bg-blue-600':'hover:bg-white/10'}`}>Updates</button>
            <button onClick={onLogout} className="bg-red-600 px-3 py-2 rounded ml-2"><LogOut size={16}/></button>
          </div>
        </div>
      </div>

      {/* --- TAB 1: NEW BILL --- */}
      {activeTab === 'new' && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
             <h3 className="font-bold border-b pb-2">Customer</h3>
             <input placeholder="Name" className="w-full p-2 border rounded" value={customer.name} onChange={e=>setCustomer({...customer, name:e.target.value})}/>
             <input placeholder="Phone" className="w-full p-2 border rounded" value={customer.phone} onChange={e=>setCustomer({...customer, phone:e.target.value})}/>
             <div className="flex gap-2">
                <input type="date" className="p-2 border rounded flex-1" value={deliveryDate} onChange={e=>setDeliveryDate(e.target.value)}/>
                <input placeholder="Remarks" className="p-2 border rounded flex-1" value={remarks} onChange={e=>setRemarks(e.target.value)}/>
             </div>
             
             <h3 className="font-bold border-b pb-2 pt-4">Add Items</h3>
             <div className="relative" ref={wrapperRef}>
                <input placeholder="Item Name" className="w-full p-2 border rounded" value={itemSearch} onChange={e=>{setItemSearch(e.target.value); setShowSuggestions(true)}} onFocus={()=>setShowSuggestions(true)}/>
                {showSuggestions && itemSearch && (
                  <div className="absolute z-10 bg-white w-full border shadow-xl max-h-40 overflow-y-auto">
                    {services.filter(s=>s.name.toLowerCase().includes(itemSearch.toLowerCase())).map((s,i)=>(
                      <div key={i} onClick={()=>{setItemSearch(s.name); setPrice(parseInt(s.price)); setShowSuggestions(false)}} className="p-2 hover:bg-blue-50 cursor-pointer flex justify-between"><span>{s.name}</span><b>{s.price}</b></div>
                    ))}
                    <div onClick={()=>{setShowSuggestions(false); priceInputRef.current.focus()}} className="p-2 text-green-700 font-bold cursor-pointer hover:bg-green-50">Custom Item</div>
                  </div>
                )}
             </div>
             <div className="flex gap-2">
                <input ref={priceInputRef} type="number" placeholder="Price" className="w-full p-2 border rounded" value={price} onChange={e=>setPrice(e.target.value)}/>
                <input type="number" placeholder="Qty" className="w-20 p-2 border rounded text-center" value={quantity} onChange={e=>setQuantity(e.target.value)}/>
                <button onClick={addToCart} className="bg-blue-600 text-white p-2 rounded"><Plus/></button>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col">
             <h3 className="font-bold border-b pb-2 mb-4">Cart ({cart.length})</h3>
             <div className="flex-1 overflow-y-auto max-h-60">
                {cart.map(item=>(
                  <div key={item.id} className="flex justify-between border-b py-2 text-sm">
                    <span>{item.name} x{item.qty}</span>
                    <div className="flex gap-2 items-center font-bold">₹{item.total} <button onClick={()=>removeFromCart(item.id)} className="text-red-500"><Trash2 size={14}/></button></div>
                  </div>
                ))}
             </div>
             <div className="mt-auto pt-4 border-t flex justify-between text-xl font-bold">
                <span>Total</span> <span>₹{calculateTotal()}</span>
             </div>
             <button onClick={generatePDF} className="w-full bg-green-600 text-white py-3 rounded mt-4 font-bold flex justify-center gap-2"><Printer/> Print Bill</button>
          </div>
        </div>
      )}

      {/* --- TAB 2: HISTORY --- */}
      {activeTab === 'history' && (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm">
           <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-2.5 text-slate-400" size={18}/>
                 <input placeholder="Search History..." className="w-full pl-10 p-2 border rounded" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
              </div>
              <button onClick={fetchHistory} className="bg-slate-900 text-white px-4 rounded">Refresh</button>
           </div>
           <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                 <tr><th className="p-3">Date</th><th className="p-3">Customer</th><th className="p-3">Total</th><th className="p-3">Status</th></tr>
              </thead>
              <tbody>
                 {historyBills.map(b=>(
                   <tr key={b._id} className="border-b">
                     <td className="p-3">{b.date}</td>
                     <td className="p-3">{b.customerName}</td>
                     <td className="p-3 font-bold text-blue-600">₹{b.totalAmount}</td>
                     <td className="p-3">
                       {b.status === 'Delivered' 
                         ? <span className="text-green-600 font-bold flex gap-1"><CheckCircle size={14}/> Delivered</span>
                         : <select 
                             className="p-1 border rounded"
                             value={b.status}
                             onChange={(e) => updateStatus(b._id, e.target.value)}
                           >
                             <option value="Pending">Pending</option>
                             <option value="Processing">Processing</option>
                             <option value="Ready">Ready</option>
                             <option value="Delivered">Delivered</option>
                           </select>
                       }
                     </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {/* --- TAB 3: UPDATES --- */}
      {activeTab === 'updates' && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
           <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
              <Bell size={32} />
           </div>
           <h2 className="text-2xl font-bold text-slate-900 mb-2">Website Updates</h2>
           <p className="text-slate-500 mb-8">Post a message that will appear at the top of your website.</p>

           <div className="flex gap-2 max-w-lg mx-auto mb-10">
              <input 
                type="text" 
                placeholder="e.g. Shop Closed Tomorrow due to Holi" 
                className="flex-1 p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                value={newsMessage}
                onChange={e => setNewsMessage(e.target.value)}
              />
              <button onClick={postNews} className="bg-orange-600 text-white px-6 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700">
                <Send size={18} /> Post
              </button>
           </div>

           {currentNews ? (
             <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex justify-between items-center max-w-lg mx-auto">
                <div className="text-left">
                   <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Active Message</p>
                   <p className="font-medium text-slate-800">"{currentNews.message}"</p>
                </div>
                <button onClick={deleteNews} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg">
                   <Trash2 size={20} />
                </button>
             </div>
           ) : (
             <p className="text-slate-400 italic">No active updates currently.</p>
           )}
        </div>
      )}

    </div>
  );
};

export default AdminPanel;