


const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  let auth = req.headers.authorization;

  if (!auth) {
    return res.status(403).json({
      message: 'unauthorization , jwt token is require',
    });
  }

  console.log("JWT_SECRET IN MIDDLEWARE:", process.env.JWT_SECRET);
console.log("TOKEN RECEIVED:", req.headers.authorization);


  //  Bearer support (IMPORTANT)
  if (auth.startsWith("Bearer ")) {
    auth = auth.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'unauthorized , jwt token wrong or expired',
    });
  }
};

module.exports = ensureAuthenticated;
