import models from "./src/database/models/index.js";
import sequelize from "./src/database/config/db.js";

const syncDatabase = async () => {
  // pass {force: true} to drop the tables and recreate them
  try {
    await sequelize.sync({ force: true });
    // await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};
await syncDatabase();
export default syncDatabase;
