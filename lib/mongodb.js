import mongoose from 'mongoose';
import { UserSchema } from '@/models/User';
import { getIncomeModel } from '@/models/Income';
import { getBillModel } from '@/models/Bill';
import { getProcedureModel } from '@/models/Procedures';
import { getAppointmentModel } from '@/models/Appointment';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Keep track of tenant connections
const tenantConnections = new Map();

export async function connectDB(tenantPath) {
  try {
    // If no tenant specified, connect to main database (only for admin purposes)
    if (!tenantPath) {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to main MongoDB database');
      }
      return mongoose.connection;
    }

    // Check if we already have a connection for this tenant
    if (tenantConnections.has(tenantPath)) {
      return tenantConnections.get(tenantPath);
    }

    // Create new connection for tenant
    const tenantUri = `${MONGODB_URI.replace(/\/[^/]*$/, '')}/${tenantPath}`;
    const tenantConnection = await mongoose.createConnection(tenantUri);
    
    // Initialize models for this tenant's connection using the getter functions
    tenantConnection.model('User', UserSchema);
    getIncomeModel(tenantConnection);
    getBillModel(tenantConnection);
    getProcedureModel(tenantConnection);
    getAppointmentModel(tenantConnection);
    
    tenantConnections.set(tenantPath, tenantConnection);
    console.log(`Connected to tenant database: ${tenantPath}`);
    
    return tenantConnection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function getTenantDatabases() {
  try {
    // Connect to admin database to list all databases
    const adminConnection = await mongoose.createConnection(MONGODB_URI);
    // Wait for connection to be ready
    await new Promise(resolve => adminConnection.once('connected', resolve));
    
    const adminDb = adminConnection.db.admin();
    const dbs = await adminDb.listDatabases();
    await adminConnection.close();
    
    // Filter out system databases and the main users database
    return dbs.databases
      .map(db => db.name)
      .filter(name => !['admin', 'local', 'config', 'users'].includes(name));
  } catch (error) {
    console.error('Error getting tenant databases:', error);
    // Return empty array in case of error to allow the flow to continue
    return [];
  }
}

// Updated function to get a model for a specific tenant
export function getTenantModel(tenantConnection, modelName) {
  switch (modelName) {
    case 'Income':
      return getIncomeModel(tenantConnection);
    case 'Bill':
      return getBillModel(tenantConnection);
    case 'Procedure':
      return getProcedureModel(tenantConnection);
    case 'Appointment':
      return getAppointmentModel(tenantConnection);
    case 'User':
      return tenantConnection.model('User');
    default:
      throw new Error(`Unknown model name: ${modelName}`);
  }
}