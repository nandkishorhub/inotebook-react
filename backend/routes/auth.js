const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

// Array with all possible validations for Post "/api/auth/createuser".
const createUserValidation = [
  body("email")
    .isEmail()
    .withMessage("Must be Standard email format eg. example@domain.com"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 charecter long"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Must be at least 5 charecter long"),
];

// Array with all possible validations for Post "/api/auth/login".
const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Must be Standard email format eg. example@domain.com"),
  body("password").exists().withMessage("Password can nnot be blank"),
];

const Jwt_Secret = "reactjs";

// Create a User using POST "/api/auth/createuser". Doesn't require Auth
router.post("/createuser", createUserValidation, async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  // If there are validations erros then return bad request with error array
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    // check/finds whether user exist withh given email id or not
    let user = await User.findOne({ email: req.body.email });

    // Throw bad request error if user with given email id exist
    if (user) {
      success = false;
      return res.status(400).json({success,
        error: `Sorry user with given email is already exist`,
      });
    }

    // Hashing of password with salt
    const salt = await bcrypt.genSalt(10);
    const encryptedPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    
    success = true;
    const authToken = jwt.sign(data, Jwt_Secret);

    res.json({success, authtoken: authToken});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: "Internal server error" });
  }
});

// Authenticate a User using : post:"/api/auth/login". No login required
router.post("/login", loginValidation, async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  // If there are validations errors then return bad request with error array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      success = false;
      return res
        .status(400)
        .json({
          success,
          errors: "Look like you don't have account, please signup ",
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      success = false;
      return res
        .status(400)
        .json({
          success,
          errors: "Please try to login with correct credentials",
        });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, Jwt_Secret);
    success = true;
    res.json({ success, authtoken: authToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: "Internal server error" });
  }
});

//Get loggedIn user details  using : post:"/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: "Internal server error" });
  }
});

module.exports = router;
