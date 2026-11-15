import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gsa_play_arena_super_secret_jwt_key_2026';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gsa_admin_2026';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST: Admin Login
  if (req.method === 'POST') {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (username.trim() === ADMIN_USERNAME.trim() && password.trim() === ADMIN_PASSWORD.trim()) {
      const token = jwt.sign(
        { role: 'admin', username: username.trim() },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        success: true,
        token,
        user: { username: username.trim(), role: 'admin' },
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // GET: Verify Token
  if (req.method === 'GET') {
    const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false });
    }

    const token = auth.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return res.status(200).json({ valid: true, user: decoded });
    } catch (e) {
      return res.status(401).json({ valid: false });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

