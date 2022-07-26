const jwt = require("jsonwebtoken");
const Jwt_Secret = "reactjs";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ errors: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, Jwt_Secret);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ errors: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
