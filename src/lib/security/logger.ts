import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'albirena-abogados' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// If in production, add DataDog transport
if (process.env.NODE_ENV === 'production' && process.env.DATADOG_API_KEY) {
  // Dynamic import to avoid issues in non-node environments
  // In a real scenario, this would be more robust
  const DatadogWinston = require('datadog-winston');
  logger.add(new DatadogWinston({
    apiKey: process.env.DATADOG_API_KEY,
    hostname: 'albirena-abogados.com',
    service: 'albirena-abogados',
    ddsource: 'nodejs',
  }));
}

export const Logger = {
  info: (message: string, meta?: any) => logger.info(message, meta),
  error: (message: string, error?: any) => logger.error(message, { error, ...error }),
  warn: (message: string, meta?: any) => logger.warn(message, meta),
};
