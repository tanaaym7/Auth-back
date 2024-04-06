const jwt = require("jsonwebtoken");

function refreshToken(req, res, next) {
  const prevToken = req.cookies.token;
  if (!prevToken) {
    return res.status(400).json({ message: "no token found" });
  }
  jwt.verify(prevToken, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.json({ message: "Invalid token", err , prevToken});
    }
    res.clearCookie("token");
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });
    req.id = user.userId;
    next();
  });
}

module.exports = refreshToken;
