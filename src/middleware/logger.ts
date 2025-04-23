import { Express } from "express";
import expressWinston from "express-winston";

import { logger } from "../utils/logger";

export const configureLogger = (server: Express) => {
  server.use(
    expressWinston.logger({
      winstonInstance: logger,
      ignoredRoutes: ["/"],
      headerBlacklist: ["user-agent"],
      statusLevels: true,
      meta: false,
    })
  );
};

export const configureErrorLogger = (server: Express) => {
  server.use(
    expressWinston.errorLogger({
      winstonInstance: logger,
      headerBlacklist: ["user-agent"],
    })
  );
};
