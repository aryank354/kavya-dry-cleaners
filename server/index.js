const express = require('express');
const cors = require('cors');
const app = express();

// --- CONFIGURATION ---
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

// --- DATA ---

const services = [
  // --- Ladies Wear ---
  { name: "Ladies Suit 3pc", price: 240, category: "Ladies Wear" },
  { name: "Ladies Suit 2pc", price: 160, category: "Ladies Wear" },
  { name: "Ladies Suit Heavy 3pc", price: 300, category: "Ladies Wear" },
  { name: "Lehanga 3pc Normal", price: 700, category: "Ladies Wear" },
  { name: "Lehanga Heavy 3pc", price: 1000, category: "Ladies Wear" },
  { name: "Saree Blouse 2pc", price: 250, category: "Ladies Wear" },
  { name: "Saree", price: 200, category: "Ladies Wear" },
  { name: "Shawl", price: 130, category: "Ladies Wear" },
  { name: "Pashmina Shawl", price: 250, category: "Ladies Wear" },
  { name: "Ladies Dress", price: 200, category: "Ladies Wear" },
  { name: "Gown", price: 400, category: "Ladies Wear" },
  { name: "Top", price: 80, category: "Ladies Wear" },
  { name: "Anarkali 3pc", price: 350, category: "Ladies Wear" },
  { name: "Single Anarkali", price: 200, category: "Ladies Wear" },
  { name: "Ladies Kurti", price: 80, category: "Ladies Wear" },

  // --- Gents Wear ---
  { name: "Gent Shirt", price: 80, category: "Gents Wear" },
  { name: "Gents Pant", price: 80, category: "Gents Wear" },
  { name: "Gent T-Shirt", price: 80, category: "Gents Wear" },
  { name: "Jeans", price: 80, category: "Gents Wear" },
  { name: "Gent Suit 2pc", price: 350, category: "Gents Wear" },
  { name: "Gent Suit 3pc", price: 400, category: "Gents Wear" },
  { name: "Sherwani 3pc", price: 360, category: "Gents Wear" },
  { name: "Sherwani 2pc", price: 280, category: "Gents Wear" },
  { name: "Sherwani 1pc", price: 200, category: "Gents Wear" },
  { name: "Kurta Pajama", price: 160, category: "Gents Wear" },
  { name: "Loi", price: 200, category: "Gents Wear" },
  { name: "Nehru Jacket", price: 130, category: "Gents Wear" },

  // --- Winter/Outerwear ---
  { name: "Sweater", price: 130, category: "Outerwear" },
  { name: "Coat", price: 200, category: "Outerwear" },
  { name: "Hoodie", price: 150, category: "Outerwear" },
  { name: "Jacket", price: 200, category: "Outerwear" },
  { name: "Raxine Jacket", price: 300, category: "Outerwear" },
  { name: "Leather Jacket", price: 350, category: "Outerwear" },

  // --- Household & Bedding ---
  { name: "Bedsheet Double with Pillow", price: 250, category: "Household" },
  { name: "Bedsheet Single with Pillow", price: 150, category: "Household" },
  { name: "Blanket Double", price: 350, category: "Household" },
  { name: "Blanket Single", price: 250, category: "Household" },
  { name: "Rajai Double", price: 350, category: "Household" },
  { name: "Rajai Single", price: 250, category: "Household" },
  { name: "AC Quilt", price: 250, category: "Household" },
  { name: "AC Blanket", price: 200, category: "Household" },
  { name: "Parda (Lining Wala)", price: 200, unit: "per panel", category: "Household" },
  { name: "Parda (Without Lining)", price: 150, unit: "per panel", category: "Household" },
  { name: "Carpet", price: 0, note: "Price according to type/condition", category: "Household" },
  { name: "Sofa Cleaning", price: 300, unit: "per seat", category: "Household" },
  { name: "Woollen Bedsheet 3pc", price: 350, category: "Household" },

  // --- Press & Charak Services ---
  { name: "Parda Steam Press", price: 80, unit: "per panel", category: "Steam Press" },
  { name: "Saree Charak", price: 60, category: "Charak" },
  { name: "Shirt Charak", price: 40, category: "Charak" },
  { name: "Pant Charak", price: 40, category: "Charak" },
  { name: "Saree Blouse Steam Press", price: 130, category: "Steam Press" },
  { name: "Saree Only Steam Press", price: 100, category: "Steam Press" },
  { name: "Shirt Steam Press", price: 40, category: "Steam Press" },
  { name: "Gent Suit 2pc Steam Press", price: 150, category: "Steam Press" },

  // --- Accessories ---
  { name: "Shoes", price: 250, category: "Accessories" }
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