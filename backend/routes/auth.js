const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Create a User using POST "/api/auth". Doesn't require Auth
router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("Must be Standard email format eg. example@domain.com"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("Must be at least 3 charecter long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Must be at least 5 charecter long"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((error) => {
        res.json({
          error: "Please enter unique email",
          message: error.message,
        });
      });
  }
);

module.exports = router;
