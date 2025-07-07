const authorizeAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next(); // User is admin, continue
    } else {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Authorization failed' });
  }
};

module.exports = authorizeAdmin;
