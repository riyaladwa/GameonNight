import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'gsa_play_arena_super_secret_jwt_key_2026';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gsa_admin_2026';

/**
 * Generate a signed JWT token for the administrator
 */
export function generateAdminToken(username) {
  return jwt.sign(
    {
      role: 'admin',
      username: username || ADMIN_USERNAME,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Verify administrator credentials
 */
export function verifyAdminCredentials(username, password) {
  const isUserValid = (username || '').trim() === ADMIN_USERNAME.trim();
  const isPassValid = (password || '').trim() === ADMIN_PASSWORD.trim();
  return isUserValid && isPassValid;
}

/**
 * Verify a JWT token
 */
export function verifyAdminToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Express middleware to guard admin routes
 */
export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyAdminToken(token);
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Invalid administrator privileges' });
  }

  req.admin = decoded;
  next();
}
