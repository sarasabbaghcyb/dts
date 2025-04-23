import { Express } from "express";
import { json, urlencoded } from "body-parser";

export const configureBodyParser = (server: Express): void => {
  server.use([json(), urlencoded({ extended: true, limit: "300kb" })]);
};
