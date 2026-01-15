const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json());

// Data (Moved from your Next.js page.js)
const services = [
  // --- MEN ---
  { name: "Shirt", price: "80", category: "Men", popular: true },
  { name: "Pant / Trousers", price: "80", category: "Men" },
  { name: "T-Shirt", price: "80", category: "Men" },
  { name: "Jeans", price: "80", category: "Men", popular: true },
  { name: "Suit (2 Pc)", price: "350", category: "Men" },
  { name: "Suit (3 Pc)", price: "400", category: "Men" },
  { name: "Sherwani (1 Pc)", price: "200", category: "Men" },
  { name: "Sherwani (2 Pc)", price: "280", category: "Men" },
  { name: "Sherwani (3 Pc)", price: "360", category: "Men" },
  { name: "Kurta Pajama", price: "160", category: "Men" },
  { name: "Nehru Jacket", price: "130", category: "Men" },

  // --- WOMEN ---
  { name: "Ladies Suit (2 Pc)", price: "160", category: "Women", popular: true },
  { name: "Ladies Suit (3 Pc)", price: "240", category: "Women" },
  { name: "Ladies Suit Heavy (3 Pc)", price: "300", category: "Women" },
  { name: "Saree", price: "200", category: "Women", popular: true },
  { name: "Saree & Blouse (2 Pc)", price: "250", category: "Women" },
  { name: "Lehanga (3 Pc Normal)", price: "700", category: "Women" },
  { name: "Lehanga (3 Pc Heavy)", price: "1000", category: "Women" },
  { name: "Ladies Dress", price: "200", category: "Women" },
  { name: "Gown", price: "400", category: "Women" },
  { name: "Top", price: "80", category: "Women" },
  { name: "Ladies Kurti", price: "80", category: "Women" },
  { name: "Anarkali (Single)", price: "200", category: "Women" },
  { name: "Anarkali (3 Pc)", price: "350", category: "Women" },

  // --- WINTER ---
  { name: "Sweater", price: "130", category: "Winter" },
  { name: "Hoodie", price: "150", category: "Winter" },
  { name: "Coat", price: "200", category: "Winter" },
  { name: "Jacket (Normal)", price: "200", category: "Winter" },
  { name: "Jacket (Raxine)", price: "300", category: "Winter" },
  { name: "Jacket (Leather)", price: "350", category: "Winter" },
  { name: "Shawl", price: "130", category: "Winter" },
  { name: "Pashmina Shawl", price: "250", category: "Winter" },
  { name: "Loi", price: "200", category: "Winter" },

  // --- HOUSEHOLD ---
  { name: "Bedsheet Single (with Pillow)", price: "150", category: "Household" },
  { name: "Bedsheet Double (with Pillow)", price: "250", category: "Household" },
  { name: "Woollen Bedsheet (3 Pc)", price: "350", category: "Household" },
  { name: "Blanket (Single)", price: "250", category: "Household" },
  { name: "Blanket (Double)", price: "350", category: "Household" },
  { name: "Rajai (Single)", price: "250", category: "Household" },
  { name: "Rajai (Double)", price: "350", category: "Household" },
  { name: "AC Quilt", price: "250", category: "Household" },
  { name: "AC Blanket", price: "200", category: "Household" },
  { name: "Curtain (With Lining)", price: "200 /panel", category: "Household" },
  { name: "Curtain (Without Lining)", price: "150 /panel", category: "Household" },
  { name: "Sofa Cleaning", price: "300 /seat", category: "Household" },
  { name: "Carpet", price: "By Size", category: "Household" },

  // --- OTHERS / PRESSING ---
  { name: "Steam Press (Curtain)", price: "80 /panel", category: "Others" },
  { name: "Charak (Saree)", price: "60", category: "Others" },
  { name: "Charak (Shirt)", price: "40", category: "Others" },
  { name: "Charak (Pant)", price: "40", category: "Others" },
  { name: "Shoes", price: "250", category: "Others" },
];

// API Routes
app.get('/', (req, res) => {
  res.send('Kavya Dry Cleaners API is running');
});

app.get('/api/services', (req, res) => {
  res.json(services);
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});