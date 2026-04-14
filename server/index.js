require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));
app.use(express.json());

// --- 1. CONNECT TO DATABASE ---
// Now using the environment variable from your .env file
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to Online Database"))
  .catch(err => console.error("❌ Database Error:", err));

// --- 2. DATA MODELS ---

// Bill Schema
const BillSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  items: Array,
  totalAmount: Number,
  date: String,        // DD/MM/YYYY for display
  isoDate: Date,       // Real Date object for sorting
  deliveryDate: String,
  remarks: String,
  status: { type: String, default: 'Pending' }, // Pending, Ready, Delivered
  createdAt: { type: Date, default: Date.now }
});
const Bill = mongoose.model('Bill', BillSchema);

// News Schema (For Website Top Bar)
const NewsSchema = new mongoose.Schema({
  message: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const News = mongoose.model('News', NewsSchema);

// --- 3. ROUTES ---

// Login Route
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const SECRET = "ak12345"; // Your Admin Password
  
  if (password === SECRET) {
    res.json({ success: true, message: "Login Successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid Password" });
  }
});

// --- BILLING ROUTES ---

// Save New Bill
app.post('/api/bills', async (req, res) => {
  try {
    const newBill = new Bill({
      ...req.body,
      isoDate: new Date() // Add real date for sorting
    });
    await newBill.save();
    res.json({ success: true, message: "Bill Saved!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Bills (With Search & Filter)
app.get('/api/bills', async (req, res) => {
  try {
    const { search, date } = req.query;
    let query = {};

    // Search by Name or Phone
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Search by Date (Exact Match DD/MM/YYYY)
    if (date) {
      query.date = date; 
    }

    const bills = await Bill.find(query).sort({ createdAt: -1 }).limit(100);
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Bill Status (e.g. Pending -> Delivered)
app.patch('/api/bills/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const bill = await Bill.findById(req.params.id);

    if (!bill) return res.status(404).json({ error: "Bill not found" });

    // Lock if Delivered
    if (bill.status === 'Delivered' && status !== 'Delivered') {
      return res.status(400).json({ error: "Cannot modify a Delivered order!" });
    }

    bill.status = status;
    await bill.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- NEWS ROUTES ---

// Get Active News
app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find({ active: true }).sort({ createdAt: -1 }).limit(1);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post News Update
app.post('/api/news', async (req, res) => {
  try {
    await News.deleteMany({}); // Only keep 1 active message
    const newUpdate = new News({ message: req.body.message });
    await newUpdate.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete News
app.delete('/api/news', async (req, res) => {
  try {
    await News.deleteMany({});
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SERVICES DATA (Your Full Rate List) ---
const services = [
  // --- LADIES WEAR ---
  { name: "Ladies Suit (2 Pc)", price: 200, category: "Ladies Wear", popular: true },
  { name: "Ladies Suit (3 Pc)", price: 250, category: "Ladies Wear" },
  { name: "Ladies Suit Heavy (3 Pc)", price: 350, category: "Ladies Wear" },
  { name: "Lightweight Lehenga", price: 400, category: "Ladies Wear" },
  { name: "Lehenga Normal (3 Pc)", price: 700, category: "Ladies Wear" },
  { name: "Lehenga Heavy (3 Pc)", price: 1000, category: "Ladies Wear" },
  { name: "Lehenga Suit (3 Pc)", price: 500, category: "Ladies Wear" },
  { name: "Saree Only", price: 200, category: "Ladies Wear" },
  { name: "Saree & Blouse (2 Pc)", price: 250, category: "Ladies Wear", popular: true },
  { name: "Saree Heavy", price: 350, category: "Ladies Wear" },
  { name: "Saree Heavy Stone Work", price: 400, category: "Ladies Wear" },
  { name: "Ladies Dress", price: 400, category: "Ladies Wear" },
  { name: "Ladies Coat (Short)", price: 200, category: "Ladies Wear" },
  { name: "Ladies Coat (Long)", price: 350, category: "Ladies Wear" },

  // --- GENTS WEAR ---
  { name: "Shirt", price: 100, category: "Gents Wear", popular: true },
  { name: "T-Shirt", price: 100, category: "Gents Wear" },
  { name: "Pant", price: 100, category: "Gents Wear" },
  { name: "Jeans", price: 100, category: "Gents Wear" },
  { name: "Gents Suit (2 Pc)", price: 350, category: "Gents Wear" },
  { name: "Gents Suit (3 Pc)", price: 400, category: "Gents Wear" },
  { name: "Sherwani (1 Pc)", price: 200, category: "Gents Wear" },
  { name: "Sherwani (2 Pc)", price: 300, category: "Gents Wear" },
  { name: "Sherwani (3 Pc)", price: 360, category: "Gents Wear" },
  { name: "Kurta Pajama", price: 200, category: "Gents Wear" },
  { name: "Nehru Jacket / Base Coat", price: 150, category: "Gents Wear" },

  // --- WINTER WEAR & JACKETS ---
  { name: "Shawl", price: 130, category: "Winter & Jackets" },
  { name: "Loi", price: 200, category: "Winter & Jackets" },
  { name: "Pashmina Shawl", price: 230, category: "Winter & Jackets" },
  { name: "Sweater", price: 130, category: "Winter & Jackets" },
  { name: "Coat", price: 200, category: "Winter & Jackets" },
  { name: "Hoodie", price: 150, category: "Winter & Jackets" },
  { name: "Jacket", price: 200, category: "Winter & Jackets", popular: true },
  { name: "Raxine Jacket", price: 300, category: "Winter & Jackets" },
  { name: "Leather Jacket", price: 350, category: "Winter & Jackets" },
  { name: "Long Coat", price: 300, category: "Winter & Jackets" },

  // --- BEDDING & HOUSEHOLD ---
  { name: "Bedsheet Double", price: 250, category: "Household", popular: true },
  { name: "Bedsheet Single", price: 150, category: "Household" },
  { name: "Woollen Bedsheet (3 Pc)", price: 350, category: "Household" },
  { name: "Blanket Double", price: 350, category: "Household" },
  { name: "Blanket Single", price: 250, category: "Household" },
  { name: "Rajai Double", price: 350, category: "Household" },
  { name: "Rajai Double Heavy", price: 400, category: "Household" },
  { name: "Rajai Single", price: 250, category: "Household" },
  { name: "AC Quilt", price: 250, category: "Household" },
  { name: "AC Blanket", price: 250, category: "Household" },
  { name: "Curtain (With Lining)", price: 200, unit: "/panel", category: "Household" },
  { name: "Curtain (No Lining)", price: 150, unit: "/panel", category: "Household" },

  // --- STEAM PRESS ONLY ---
  { name: "Shirt SP", price: 50, category: "Steam Press" },
  { name: "Pant SP", price: 50, category: "Steam Press" },
  { name: "Saree Blouse SP", price: 130, category: "Steam Press" },
  { name: "Saree Only SP", price: 100, category: "Steam Press" },
  { name: "Gents Suit SP (2 Pc)", price: 150, category: "Steam Press" },
  { name: "Blazer SP", price: 80, category: "Steam Press" },
  { name: "Parda SP", price: 80, unit: "/panel", category: "Steam Press" },
  { name: "Lightweight Lehenga SP", price: 250, category: "Steam Press" },
  { name: "Lehenga Suit SP (3 Pc)", price: 250, category: "Steam Press" },
  { name: "Heavy Lehenga SP", price: 400, category: "Steam Press" },

  // --- OTHER SERVICES & CHARAK ---
  { name: "Shirt Charak", price: 50, category: "Others" },
  { name: "Pant Charak", price: 50, category: "Others" },
  { name: "Saree Charak", price: 80, category: "Others" },
  { name: "Shoes Dry Clean", price: 250, category: "Others" },
  { name: "Sofa Dry Clean", price: 300, unit: "/seat", category: "Others" },
  { name: "Carpet Dry Clean", price: "Quote", note: "On Inspection", category: "Others" }
];

app.get('/api/services', (req, res) => {
  res.json(services);
});

// Root Route (for Wake-up pings)
app.get('/', (req, res) => {
  res.send('Kavya Dry Cleaners API is running');
});

// --- START SERVER ---
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});