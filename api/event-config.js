import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.MONGODB_DB_NAME || 'google_play_arena';
const JWT_SECRET = process.env.JWT_SECRET || 'gsa_play_arena_super_secret_jwt_key_2026';

const DEFAULT_CONFIG = {
  EVENT_NAME: "GOOGLE PLAY ARENA",
  EVENT_TITLE: "GAME ON NIGHT",
  EVENT_CATEGORY: "AI-POWERED GAME IDEATHON",
  TAGLINE: "IMAGINE IT. DESIGN IT. PITCH IT.",
  SUB_TAGLINE: "An official Google Student Ambassador initiative powered by Google Gemini & Nano Banana.",
  EVENT_DATE: "",
  EVENT_TIME: "",
  EVENT_MODE: "Virtual / Online via Google Meet",
  EVENT_DURATION: "2 Hours (60s Pitch per participant)",
  HOST_NAME: "Google Student Ambassador",
  HOST_ROLE: "Campus Lead & Event Organizer",
  HOST_CONTACT: "",
  PRE_SURVEY_URL: "https://producttrialsurvey.geministudentambassador.com/",
  POST_SURVEY_URL: "https://producttrialfeedback.geministudentambassador.com/",
  GOOGLE_MEET_URL: "",
  EVENT_GUIDELINES_URL: "",
  CERTIFICATE_INFORMATION: {
    participationCriteria: "Awarded to all verified attendees who complete the official Pre-Survey, attend the live Google Meet session, pitch their concept, and submit their complete Google Doc via the official Post-Survey form.",
    winnerCriteria: "Awarded to the top-evaluated game concepts judged on originality, specific mission design, non-violent mechanics, creative visual poster, and 60-second pitch delivery.",
    nationalPixelPrizeNote: "Top national finalists stand a chance for the National Winner to win a Google Pixel Phone, subject to official Google Student Ambassador national evaluation and terms.",
    verificationNote: "Official digital certificates are issued directly by Google Student Ambassador program leads following post-event verification."
  },
  ADDITIONAL_EVENT_INFORMATION: {
    announcementBadge: "FREE ENTRY • NATIONAL PIXEL CHANCE • OFFICIAL CERTIFICATES",
    toolsRequired: "Google Gemini (Free), Google Docs, Google Meet",
    noCodingNote: "100% Concept & Ideation — Zero coding required. Your creativity and prompt craft are your superpowers."
  }
};

let cachedClient = null;

async function getCollection() {
  if (!MONGODB_URI) return null;
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI, { maxPoolSize: 10 });
    await cachedClient.connect();
  }
  return cachedClient.db(DB_NAME).collection('event_config');
}

function verifyToken(req) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.split(' ')[1];
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const collection = await getCollection();

    if (req.method === 'GET') {
      if (!collection) {
        return res.status(200).json({ ...DEFAULT_CONFIG, _source: 'default_fallback' });
      }

      let config = await collection.findOne({ _id: 'current' });
      if (!config) {
        await collection.insertOne({ _id: 'current', ...DEFAULT_CONFIG, updated_at: new Date() });
        config = { _id: 'current', ...DEFAULT_CONFIG };
      }

      return res.status(200).json({ ...config, _source: 'mongodb' });
    }

    if (req.method === 'PUT') {
      const decoded = verifyToken(req);
      if (!decoded || decoded.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      }

      if (!collection) {
        return res.status(503).json({ error: 'Database unavailable' });
      }

      const updates = { ...req.body };
      delete updates._id;
      updates.updated_at = new Date();
      updates.updated_by = decoded.username || 'admin';

      await collection.updateOne({ _id: 'current' }, { $set: updates }, { upsert: true });
      const updated = await collection.findOne({ _id: 'current' });

      return res.status(200).json({
        success: true,
        message: 'Configuration saved in MongoDB',
        config: updated,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error:', err);
    if (req.method === 'GET') {
      return res.status(200).json({ ...DEFAULT_CONFIG, _source: 'error_fallback' });
    }
    return res.status(500).json({ error: err.message });
  }
}

