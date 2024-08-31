const { DataTypes } = require("@sequelize/core");
module.exports = product = async (seqRes, authModel) => {
  const product = await seqRes.define("product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      require: true,
    },
    desc: {
      type: DataTypes.STRING,
    },
    price: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    authId: {
      type: DataTypes.INTEGER,
      references: {
        model: authModel,
        key: "id",
      },
    },
  });
  try {
    await product.sync({ force: false });
    console.log("The table for the Product model was just (re)created!");
  } catch (error) {
    console.log("error in product entery ", error);
  }
  return await product;
};
