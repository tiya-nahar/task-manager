  const jwt = require('jsonwebtoken');

  // Middleware to verify JWT token
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Token format: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // userId, roleId will be available here
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token.' });
    }

    console.log('JWT Secret:', process.env.JWT_SECRET);

  };

  module.exports = authenticateToken;
