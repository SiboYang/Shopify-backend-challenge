import { Sequelize } from "sequelize";

export const database = new Sequelize(
   process.env.DATABASE_URL,
    {
      dialect: "postgres",
      dialectOptions: {
        ssl: { require: process.env.DB_SSL == "true", rejectUnauthorized: false },
      },
      logging: process.env.SQL_LOGGING == "true"
    }
  );