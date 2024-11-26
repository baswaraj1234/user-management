import app from './app';
import dotenv from 'dotenv';
import logger from './utils/logger';

// Load environment variables from the .env file
dotenv.config();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
const startServer = () => {
  app.listen(PORT, () => {
    logger.info(`Server is running on ${process.env.PROTOCOL}://${process.env.HOST}:${PORT}`);
    logger.info(`📚 API documentation or routes can be accessed via ${process.env.PROTOCOL}://${process.env.HOST}:${PORT}/api`);
  });
};

// Catch unhandled exceptions and rejections
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error });
  process.exit(1); // Exit process with failure code
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', { reason });
  process.exit(1); // Exit process with failure code
});

// Start the server
startServer();

// Handle the `SIGTERM` signal for clean shutdowns
process.on('SIGTERM', () => {
  logger.warn('SIGTERM signal received. Closing server gracefully...');
  process.exit(0);
});

