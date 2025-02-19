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
const User = require('./models/User');
const Market = require('./models/Market');
const Product = require('./models/Product');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // React app's default port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
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

// Add this route after your other routes
app.get('/api/test-db', async (req, res) => {
    try {
        // Check if we can perform a simple operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({ 
            status: 'Database connection successful',
            collections: collections.map(c => c.name)
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'Database connection failed',
            error: error.message 
        });
    }
});

// Add these test routes after your other routes
app.get('/api/test/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            count: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/test/markets', async (req, res) => {
    try {
        const markets = await Market.find();
        res.json({
            count: markets.length,
            markets: markets
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/test/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            count: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
