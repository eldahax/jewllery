const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      error: "Access denied. No token provided."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.user_id || decoded.id;

    if (!userId) {
      return res.status(401).json({
        error: "Invalid token payload"
      });
    }

    req.user = {
      ...decoded,
      id: userId,
      user_id: userId
    };

    next();

  } catch (err) {
    console.log(err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "TokenExpired",
        message: "Your access token has expired."
      });
    }

    return res.status(401).json({
      error: "Invalid token"
    });
  }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({
        error: "Forbidden"
      });
    }

    const userRoles = req.user.roles.map(role =>
      role.toLowerCase().trim()
    );

    const allowed = allowedRoles.map(role =>
      role.toLowerCase().trim()
    );

    const hasAccess = userRoles.some(role =>
      allowed.includes(role)
    );

    if (!hasAccess) {
      return res.status(403).json({
        error: "Unauthorized access"
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize
};