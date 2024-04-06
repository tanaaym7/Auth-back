const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("token not found");
    return res.json({ message: "token not found" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    }
    console.log("***verified, getting user now***");
    req.id = data.id;
    next();
  });
};

module.exports = verifyToken;
