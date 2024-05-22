const jwt = require("jsonwebtoken");
const JWT_SECRET = "freecodecamp";
async function userMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const words = token.split(" ");
      const jwtToken = words[1];
      const decode = jwt.verify(jwtToken, JWT_SECRET);
      if (decode._id) {
        next();
      } else {
        return res.status(403).json({ msg: "You are not authorized" });
      }
    } else {
      res.status(400).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
}

module.exports = userMiddleware;
