import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Item extends Model {}
  
Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      count: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      category: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      brand: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      }
    },
    {
      tableName: "items",
      sequelize: database,
    }
  );