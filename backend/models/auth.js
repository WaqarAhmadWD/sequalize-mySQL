const { DataTypes } = require("@sequelize/core");
module.exports = auth = async (seqRes) => {
  const auth = await seqRes.define("auth", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
      validate: {
        isEmail: true, // Validate email format
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  try {
    await auth.sync({ force: false });
    console.log("The table for the Auth model was just (re)created!");
    return await auth;
  } catch (error) {
    return await error;
  }
};
