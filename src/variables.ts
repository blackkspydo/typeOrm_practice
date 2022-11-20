import dotenv from "dotenv";
dotenv.config();

export const ENV_VARIABLES = {
  dataSources: {
    PORT: Number(process.env.PORT) || 5432,
    HOST: process.env.HOST || "localhost",
    USERNAME: process.env.USERNAME || "root",
    PASSWORD: process.env.PASSWORD || "root",
    DATABASE: process.env.DATABASE || "test"
  }
};

