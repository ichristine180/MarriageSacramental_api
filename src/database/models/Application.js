import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Christian from "./Christian.js";

const Application = sequelize.define("Application", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  christianId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Christian,
      key: "id",
    },
  },
  requestMariageDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  givenMariageDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    default: "pending",
  },
  partenerId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  partenerRecomandation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  processedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

export default Application;
