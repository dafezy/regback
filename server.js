const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add CORS middleware
const dotenv = require('dotenv');

// Importing Routes and Middlewares
const userRoute = require('./src/route/userRoute');
const TaskRouter = require('./src/route/Task');
const errorMiddleWare = require('./src/middleware/ErrorHandler');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow requests from any origin

// Define a basic route
app.get('/', (req, res) => {
    res.send('Welcome to Express.js');
});

// Use Routes
app.use('/api', userRoute);
app.use('/api/task', TaskRouter);

// Global Error Handler
app.use(errorMiddleWare);

// MongoDB Connection
const connectDB = async () => {
    const mongoUri = process.env.DB_URL;

    if (!mongoUri) {
        throw new Error('DB_URL is not defined in the environment variables');
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
