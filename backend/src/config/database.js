import { Sequelize } from "sequelize";

export const database = new Sequelize(
    process.env.DB_SCHEMA || "postgres",
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5301,
      dialect: "postgres",
      dialectOptions: {
        ssl: { require: process.env.DB_SSL == "true", rejectUnauthorized: false },
      },
      logging: process.env.SQL_LOGGING == "true"
    }
  );