import { Sequelize } from "sequelize";

export const database = new Sequelize(
    "postgres://wexyefhsrkfyne:82c62f2949d6de5f4a8f5b19f15031b9ae8b29bf91005b0d7e13d048cb7ebdf3@ec2-3-224-157-224.compute-1.amazonaws.com:5432/df4nlas2e6v94v",
    {
      dialect: "postgres",
      dialectOptions: {
        ssl: { require: process.env.DB_SSL == "true", rejectUnauthorized: false },
      },
      logging: process.env.SQL_LOGGING == "true"
    }
  );