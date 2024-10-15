import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Comic = sequelize.define("Comic", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yearOfPublication: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  numberOfPages: {
    type: DataTypes.INTEGER,
  },
  condition: {
    type: DataTypes.ENUM("new", "used"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

export default Comic;
