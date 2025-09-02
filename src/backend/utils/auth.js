const { tokenize } = require('espree');
const jwt = require('jsonwebtoken');
const { message } = require('statuses');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) =>{
    return jwt.sign({id:userId}, JWT_SECRET,{expiresIn:'1h'});
};

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  // Extract token properly
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken };