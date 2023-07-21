import dotenv from "dotenv";
import Sequelize from "sequelize";
import config from "./config.js";
dotenv.config();
const sequelizeConfig = config;
let sequelize;
if (sequelizeConfig.use_env_variable) {
  sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeConfig);
} else {
  sequelize = new Sequelize(
    sequelizeConfig.database,
    sequelizeConfig.username,
    sequelizeConfig.password,
    sequelizeConfig
  );
}

export default sequelize;
