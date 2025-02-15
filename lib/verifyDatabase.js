import { MongoClient } from 'mongodb';

export async function verifyDatabase(dbName) {
  if (!dbName || typeof dbName !== 'string') {
    throw new Error('Invalid database name');
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    
    // Get list of all databases
    const adminDb = client.db('admin');
    const dbs = await adminDb.admin().listDatabases();
    
    // Check if database exists
    const exists = dbs.databases.some(db => db.name === dbName);

    // If database doesn't exist, create it with initial collections
    if (!exists) {
      const db = client.db(dbName);
      
      // Create required collections with their indexes
      await db.createCollection('users');
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      
      await db.createCollection('incomes');
      await db.createCollection('bills');
      await db.createCollection('procedures');
      await db.createCollection('appointments');
      
      // Return false to indicate this is a new database
      return false;
    }

    return true;
  } finally {
    await client.close();
  }
}