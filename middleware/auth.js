const jwt = require("jsonwebtoken");
const key = "secretkey"

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Unauthorized. Please add valid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, key);
    const { id, name, email } = decoded;
    req.user = { id, name, email };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Unauthorized. Please add valid token" });
  }
};

module.exports = authenticationMiddleware;
