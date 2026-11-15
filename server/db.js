import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { EVENT_CONFIG } from '../src/config/eventConfig.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.MONGODB_DB_NAME || 'google_play_arena';

let cachedClient = null;
let cachedDb = null;

/**
 * Connect to MongoDB with cached client connection
 */
export async function connectToDatabase() {
  if (!MONGODB_URI || MONGODB_URI.trim().length === 0) {
    console.warn('[MongoDB] No MONGODB_URI provided. Running in memory / fallback mode.');
    return { client: null, db: null };
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;
    console.log(`[MongoDB] Connected successfully to database: ${DB_NAME}`);

    // Seed initial event config if collection is empty
    await seedInitialConfig(db);

    return { client, db };
  } catch (error) {
    console.error('[MongoDB] Connection error:', error.message);
    return { client: null, db: null };
  }
}

/**
 * Seed initial event configuration document if not already existing
 */
async function seedInitialConfig(db) {
  try {
    const collection = db.collection('event_config');
    const existing = await collection.findOne({ _id: 'current' });
    if (!existing) {
      console.log('[MongoDB] Seeding initial event configuration record...');
      await collection.insertOne({
        _id: 'current',
        ...EVENT_CONFIG,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log('[MongoDB] Initial event configuration seeded successfully.');
    }
  } catch (err) {
    console.error('[MongoDB] Seeding error:', err.message);
  }
}

/**
 * Get the event_config collection
 */
export async function getEventConfigCollection() {
  const { db } = await connectToDatabase();
  return db ? db.collection('event_config') : null;
}

