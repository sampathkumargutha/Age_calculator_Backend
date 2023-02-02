const { createLogger, format, transports } = require('winston');
const { colorize, combine, timestamp, printf } = format;

// Define your custom format with printf.
const myFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    timestamp(),
    colorize(),
    myFormat,
  ),
  transports: [new transports.Console({ level: process.env.LOG_LEVEL || "debug" })]
});

module.exports.logger = logger;