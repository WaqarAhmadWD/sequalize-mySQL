const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");
require("dotenv").config();
const { body, validationResult } = require("express-validator");
// apis

// create
router.post(
  "/create",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      const user = await req.auth?.findOne({ where: { email } });
      if (user == null) {
        const auth = await req.auth?.create({
          name,
          email,
          password,
        });
        console.log(auth.id);
        const token = jwt.sign(auth.id, process.env.TOKEN_KEY);
        res.json({ auth, token });
      } else {
        res.json({ error: "user already existed!" });
      }
    } catch (error) {
      res.json(error);
    }
  }
);
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await req.auth?.findOne({ where: { email, password } });
      if (user) {
        const token = jwt.sign(user.id, process.env.TOKEN_KEY);
        res.json({ user, token });
      } else {
        res.json({ error: "Wrong Entery!" });
      }
    } catch (error) {
      res.json(error);
    }
  }
);
router.delete(
  "/delete",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await req.auth?.findOne({ where: { email, password } });
      if (user) {
        await user.destroy({ force: true });
        res.json({ msg: "user Deleted" });
      } else {
        res.json({ error: "Wrong Entery!" });
      }
    } catch (error) {
      res.json(error);
    }
  }
);
module.exports = router;
