import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";

export const PORT = process.env.PORT ?? 3000;
