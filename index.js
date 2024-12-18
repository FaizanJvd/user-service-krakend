const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '192.168.0.105';
// Middleware for parsing JSON bodies
app.use(bodyParser.json());
const connectDB = require("./config/db");
connectDB();
const userRoutes = require('./routes/userRoutes');
// Enable CORS for all routes
app.use(cors());
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});