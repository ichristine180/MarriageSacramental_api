import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users.js";

const Christian = sequelize.define("Christian", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  parish: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    default: "pending",
  },
  accountId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

export default Christian;
