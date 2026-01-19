const express = require('express');
const cors = require('cors');
const app = express();

// --- CONFIGURATION ---
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

// --- DATA ---

const services = [
  // --- LADIES WEAR ---
  { name: "Ladies Suit (2 Pc)", price: 160, category: "Ladies Wear", popular: true },
  { name: "Ladies Suit (3 Pc)", price: 240, category: "Ladies Wear" },
  { name: "Ladies Suit Heavy (3 Pc)", price: 300, category: "Ladies Wear" },
  { name: "Lehanga Normal (3 Pc)", price: 700, category: "Ladies Wear" },
  { name: "Lehanga Heavy (3 Pc)", price: 1000, category: "Ladies Wear" },
  { name: "Saree & Blouse (2 Pc)", price: 250, category: "Ladies Wear", popular: true },
  { name: "Saree Only", price: 200, category: "Ladies Wear" },
  { name: "Ladies Dress", price: 200, category: "Ladies Wear" },
  { name: "Gown", price: 400, category: "Ladies Wear" },
  { name: "Top", price: 80, category: "Ladies Wear" },
  { name: "Ladies Kurti", price: 80, category: "Ladies Wear" },
  { name: "Anarkali (3 Pc)", price: 350, category: "Ladies Wear" },
  { name: "Single Anarkali", price: 200, category: "Ladies Wear" },

  // --- WINTER WEAR & JACKETS ---
  { name: "Shawl", price: 130, category: "Winter & Jackets" },
  { name: "Loi", price: 200, category: "Winter & Jackets" },
  { name: "Pashmina Shawl", price: 250, category: "Winter & Jackets" },
  { name: "Sweater", price: 130, category: "Winter & Jackets" },
  { name: "Coat", price: 200, category: "Winter & Jackets" },
  { name: "Hoodie", price: 150, category: "Winter & Jackets" },
  { name: "Jacket", price: 200, category: "Winter & Jackets", popular: true },
  { name: "Raxine Jacket", price: 300, category: "Winter & Jackets" },
  { name: "Leather Jacket", price: 350, category: "Winter & Jackets" },
  { name: "Long Coat", price: 300, category: "Winter & Jackets" },

  // --- STEAM PRESS ONLY ---
  { name: "Shirt Steam Press", price: 40, category: "Steam Press" },
  { name: "Saree Blouse SP", price: 130, category: "Steam Press" },
  { name: "Saree Only SP", price: 100, category: "Steam Press" },
  { name: "Gents Suit SP (2 Pc)", price: 150, category: "Steam Press" },
  { name: "Ladies Suit SP (3 Pc)", price: 100, category: "Steam Press" },
  { name: "Ladies Suit SP (2 Pc)", price: 70, category: "Steam Press" },
  { name: "Parda Steam Press", price: 80, unit: "/panel", category: "Steam Press" },
  { name: "Lehanga Steam Press", price: "Call", note: "Price depends on type", category: "Steam Press" },

  // --- GENTS WEAR ---
  { name: "Shirt", price: 80, category: "Gents Wear", popular: true },
  { name: "T-Shirt", price: 80, category: "Gents Wear" },
  { name: "Pant", price: 80, category: "Gents Wear" },
  { name: "Jeans", price: 80, category: "Gents Wear" },
  { name: "Gents Suit (2 Pc)", price: 350, category: "Gents Wear" },
  { name: "Gents Suit (3 Pc)", price: 400, category: "Gents Wear" },
  { name: "Sherwani (1 Pc)", price: 200, category: "Gents Wear" },
  { name: "Sherwani (2 Pc)", price: 280, category: "Gents Wear" },
  { name: "Sherwani (3 Pc)", price: 360, category: "Gents Wear" },
  { name: "Kurta Pajama", price: 160, category: "Gents Wear" },
  { name: "Nehru Jacket / Base Coat", price: 130, category: "Gents Wear" },

  // --- BEDDING & HOUSEHOLD ---
  { name: "Bedsheet Double (w/ pillows)", price: 250, category: "Household", popular: true },
  { name: "Bedsheet Single (w/ pillow)", price: 150, category: "Household" },
  { name: "Woollen Bedsheet (3 Pc)", price: 350, category: "Household" },
  { name: "Blanket Double", price: 350, category: "Household" },
  { name: "Blanket Single", price: 250, category: "Household" },
  { name: "Rajai Double", price: 350, category: "Household" },
  { name: "Rajai Single", price: 250, category: "Household" },
  { name: "AC Quilt", price: 250, category: "Household" },
  { name: "AC Blanket", price: 250, category: "Household" },
  { name: "Curtain (With Lining)", price: 200, unit: "/panel", category: "Household" },
  { name: "Curtain (No Lining)", price: 150, unit: "/panel", category: "Household" },

  // --- OTHER SERVICES & CHARAK ---
  { name: "Charak: Shirt", price: 40, category: "Others" },
  { name: "Charak: Pant", price: 40, category: "Others" },
  { name: "Charak: Saree", price: 60, category: "Others" },
  { name: "Shoes Dry Clean", price: 250, category: "Others" },
  { name: "Sofa Dry Clean", price: 300, unit: "/seat", category: "Others" },
  { name: "Carpet Dry Clean", price: "Quote", note: "On Inspection", category: "Others" }
];

// --- ROUTES ---

app.get('/', (req, res) => {
  res.send('Kavya Dry Cleaners API is running');
});

// 1. Get All Services
app.get('/api/services', (req, res) => {
  res.json(services);
});

// 2. Secure Login Route (New!)
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const SECRET = "ak12345"; // Your Admin Password

  if (password === SECRET) {
    res.json({ success: true, message: "Login Successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid Password" });
  }
});

// --- START SERVER ---
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});