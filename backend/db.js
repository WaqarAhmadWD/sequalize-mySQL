const { Sequelize } = require("@sequelize/core");
const { MySqlDialect } = require("@sequelize/mysql");
const connectionToDb = async () => {
  const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: "ecommerce",
    user: "root",
    password: "killar machine 3.0",
    host: "localhost",
    port: 3306,
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return sequelize;
};
module.exports = connectionToDb;
