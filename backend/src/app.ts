import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import logger from './utils/logger';
const xssClean = require('xss-clean');

dotenv.config();
const app: Application = express();

// Security Middleware: Using helmet to secure headers
app.use(helmet());

// Sanitize incoming request data to protect from XSS
app.use(xssClean()); 

// Protect against NoSQL injection attacks
app.use(mongoSanitize()); 

// Middleware
app.use(cors());
// Handles JSON request bodies
app.use(express.json());  // Handles JSON request bodies

// Routes
app.use('/api', userRoutes);

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    logger.info('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI as string, {
    });
    console.log('Connected to MongoDB successfully!');
    logger.info('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    logger.error('MongoDB connection error:', { error });
    process.exit(1); // Exit process with failure code if connection fails
  }
};

// Initiating the database connection
connectToDatabase();

// Handle `SIGINT` signal
process.on('SIGINT', async () => {
  logger.warn('SIGINT received. Shutting down gracefully...');
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB successfully.');
    process.exit(0);
  } catch (error) {
    logger.error('Error during MongoDB disconnection:', { error });
    process.exit(1);
  }
});

// Exporting the app
export default app;
