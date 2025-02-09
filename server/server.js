const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');
const auth = require('./middleware/auth');
const marketRoutes = require('./routes/marketRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/userRoutes');
const bankProductRoutes = require('./routes/bankProductRoutes');
const vendorProductRoutes = require('./routes/vendorProductRoutes');
const purchaseHistoryRoutes = require('./routes/purchaseHistoryRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/markets', marketRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', auth, cartRoutes);
app.use('/api/bank-products', bankProductRoutes);
app.use('/api/vendor-products', vendorProductRoutes);
app.use('/api/purchases', purchaseHistoryRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
