import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase, getEventConfigCollection } from './db.js';
import { verifyAdminCredentials, generateAdminToken, requireAdminAuth, verifyAdminToken } from './auth.js';
import { EVENT_CONFIG } from '../src/config/eventConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Initialize MongoDB on server start
connectToDatabase().catch(err => {
  console.warn('[Server] Initial MongoDB connection skipped:', err.message);
});

/**
 * Health check endpoint
 */
app.get('/api/health', async (req, res) => {
  const collection = await getEventConfigCollection();
  res.json({
    status: 'ok',
    database: collection ? 'connected' : 'offline_fallback',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/event-config
 * Public endpoint to fetch the current event configuration
 */
app.get('/api/event-config', async (req, res) => {
  try {
    const collection = await getEventConfigCollection();
    if (!collection) {
      // Fallback to static EVENT_CONFIG if DB is unconfigured
      return res.json({
        ...EVENT_CONFIG,
        _source: 'local_config',
      });
    }

    const config = await collection.findOne({ _id: 'current' });
    if (!config) {
      return res.json({
        ...EVENT_CONFIG,
        _source: 'local_fallback',
      });
    }

    // Strip internal mongo fields if desired, or send
    res.json({
      ...config,
      _source: 'mongodb',
    });
  } catch (error) {
    console.error('[API] Error fetching event config:', error.message);
    res.json({
      ...EVENT_CONFIG,
      _source: 'error_fallback',
    });
  }
});

/**
 * PUT /api/event-config
 * Protected admin endpoint to update event configuration
 */
app.put('/api/event-config', requireAdminAuth, async (req, res) => {
  try {
    const collection = await getEventConfigCollection();
    if (!collection) {
      return res.status(503).json({
        error: 'Database not connected. Please check MONGODB_URI in environment variables.'
      });
    }

    const updates = req.body;
    
    // Prevent overriding the primary key
    delete updates._id;

    // Sanitize and attach audit timestamp
    const docToSave = {
      ...updates,
      updated_at: new Date(),
      updated_by: req.admin.username || 'admin',
    };

    const result = await collection.findOneAndUpdate(
      { _id: 'current' },
      { $set: docToSave },
      { upsert: true, returnDocument: 'after' }
    );

    res.json({
      success: true,
      message: 'Event configuration updated successfully in MongoDB.',
      config: result.value || docToSave,
    });
  } catch (error) {
    console.error('[API] Error updating event config:', error.message);
    res.status(500).json({ error: 'Failed to update event configuration' });
  }
});

/**
 * POST /api/admin/login
 * Authenticate administrator and issue JWT
 */
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const isValid = verifyAdminCredentials(username, password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid administrator credentials' });
  }

  const token = generateAdminToken(username);
  res.json({
    success: true,
    token,
    user: {
      username: username.trim(),
      role: 'admin',
    },
  });
});

/**
 * GET /api/admin/verify
 * Check whether a stored token is still valid
 */
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyAdminToken(token);
  if (!decoded) {
    return res.status(401).json({ valid: false });
  }

  res.json({ valid: true, user: decoded });
});

app.listen(PORT, () => {
  console.log(`[Backend Server] Running on http://localhost:${PORT}`);
});
