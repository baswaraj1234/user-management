import { createLogger, format, transports } from 'winston';

// Create a Winston logger instance with configurations
const logger = createLogger({
  level: 'info', // Default log level
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(), // Logs to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs errors to a file
    new transports.File({ filename: 'logs/combined.log' }), // Logs everything to a file
  ],
});

export default logger;
