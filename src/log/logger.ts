import { createLogger, transports, format } from "winston";

//todo: make winston send error log to mongoDB in serverless app
const customerLogger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    new transports.File({ filename: "logs/errors.log" }),
    new transports.Console(),
  ],
});

export default customerLogger;
