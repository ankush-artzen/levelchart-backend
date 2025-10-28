import winston from "winston";
import path from "path";
import fs from "fs";

// Ensure the logs directory exists
const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Helper to generate file paths
const getLogFilePath = (filename: string) => path.join(__dirname, "../logs", filename);

// Adding custom colors to log levels
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green'
});

// Logger configuration
const createLogger = (filename: string) =>
  winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
      new winston.transports.File({ filename: getLogFilePath(filename), level: "info" }),
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.printf(({ level, message, timestamp }) =>
            `${timestamp} [${level}]: ${message}`
          )
        ),
      })
    ],
});

// Create loggers
const logger = createLogger("info.log");
const errorLogger = createLogger("errors.log");

// Logging helpers
export const logInfo = (type: string, message: string) => {
  logger.info(`[${type}] ${message}`);
};

export const logDebug = (type: string, message: string) => {
    logger.debug(`[${type}] ${message}`);
  };

export const logWarn = (type: string, message: string) => {
  logger.warn(`[${type}] ${message}`);
};

export const logError = (type: string, message: string) => {
  errorLogger.error(`[${type}] ${message}`);
};

