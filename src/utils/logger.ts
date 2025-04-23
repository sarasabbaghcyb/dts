import { Express } from "express";
import { createLogger, format, transports } from "winston";
import expressWinston from "express-winston";
import { LOG_LEVEL } from "./config";


// Formatters
const terminalFormat = format.combine(format.timestamp(), format.simple(), format.colorize({ all: true }));
const jsonFormat = format.combine(format.timestamp(), format.errors({ stack: true }), format.json());

const transportsList = [
  new transports.Console({
    level: LOG_LEVEL,
    format: process.env.NODE_ENV === "development" ? terminalFormat : jsonFormat,
  }),
];

export const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
  transports: transportsList,
});



export const configureErrorLogger = (server: Express) => {
  server.use(
    expressWinston.errorLogger({
      winstonInstance: logger,
      headerBlacklist: ["user-agent"],
    })
  );
};
