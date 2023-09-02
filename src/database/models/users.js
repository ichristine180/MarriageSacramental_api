import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,

    defaultValue: 0, // christian role is 0 secretary 1 preast 2
  },
  is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

export default User;
