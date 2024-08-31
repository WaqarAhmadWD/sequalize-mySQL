const connectionToDb = require("./db.js");
const express = require("express");
const product = require("./models/product.js");
const auth = require("./models/auth.js");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(cors());
let productModel;
connectionToDb()
  .then(async (seqRes) => {
    authModel = await auth(seqRes)
      .then((auth) => auth)
      .catch((error) => {
        console.log("error in auth model ", error);
      });
    productModel = await product(seqRes, authModel)
      .then((pro) => pro)
      .catch((error) => {
        console.log("error in product model ", error);
      });
    authModel.hasMany(productModel, { foreignKey: "authId" });
    productModel.belongsTo(authModel, { foreignKey: "authId" });
  })
  .catch((error) => {
    console.log("error in seq +", error);
  });
const middlewareProduct = async (req, res, next) => {
  if (productModel) {
    req.product = await productModel;
  } else {
    req.product = "";
  }
  next();
};
const middlewareAuth = async (req, res, next) => {
  if (authModel) {
    req.auth = await authModel;
  } else {
    req.auth = "";
  }
  next();
};
app.use("/auth", middlewareAuth, require("./routers/auth"));
app.use("/product", middlewareProduct, require("./routers/product"));
app.listen(PORT, () => {
  console.log("app is listening on " + PORT);
});
module.exports = app;
