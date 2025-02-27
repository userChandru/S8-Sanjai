require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Validate schemas before starting server

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/inventories', require('./routes/inventoryRoutes'));
app.use('/api/auth', authRoutes);
console.log('Routes registered:', app._router.stack.map(r => r.route?.path).filter(Boolean));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
