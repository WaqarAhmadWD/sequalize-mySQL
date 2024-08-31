const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const admin = require("../middlewares/admin.js");
// apis

// create
router.post(
  "/create",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("productId", "Enter a valid unique product Id").isInt(),
  body("desc", "Enter a valid description").isLength({ min: 5 }),
  body("price", "price should be number").isInt(),
  body("rating", "rating should be number").isFloat(),
  admin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, productId, desc, price, rating } = req.body;
    try {
      const product = await req.product?.create({
        name,
        productId,
        desc,
        price,
        rating,
      });
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  }
);
router.get("/get-all-product", async (req, res) => {
  try {
    const product = await req.product?.findAll();
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});
router.delete(
  "/delete",
  body("productId", "Password must be at least 5 characters").isInt(),
  admin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { productId } = req.body;
    try {
      const product = await req.product?.findOne({ where: { productId } });
      if (product) {
        await product.destroy({ force: true });
        res.json({ msg: "product Deleted" });
      } else {
        res.json({ error: "product of " + productId + " does not exists" });
      }
    } catch (error) {
      res.json(error);
    }
  }
);
module.exports = router;
