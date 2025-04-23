import express, { Express } from "express";
import routes from "./routes";
import { configureBodyParser, configureErrorLogger, configureErrorHandler, configureLogger } from "./middleware";
import { PORT } from "./utils/config";
import { logger } from "./utils/logger";

export const createServer = async () => {
  const server: Express = express();

  // Apply middleware
  configureLogger(server);
  configureBodyParser(server);

  // Routes
  server.use(routes);

  // Error handlers need to be configured after routes
  configureErrorLogger(server);
  configureErrorHandler(server);

  return server;
};

createServer().then((server) => {
  server.listen(PORT, () => {
    logger.info(`Listening on: ${PORT}`);
  });

  process.on("exit", () => {
    logger.info("Server stopped");
  });
});
