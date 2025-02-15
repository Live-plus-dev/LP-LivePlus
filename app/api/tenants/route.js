import { NextResponse } from 'next/server';
import { verifyDatabase } from '@/lib/verifyDatabase';

export async function POST(request) {
  try {
    const { tenant } = await request.json();
    console.log(tenant);
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant name is required' },
        { status: 400 }
      );
    }

    // This will now create the database if it doesn't exist
    const dbExists = await verifyDatabase(tenant);

    // Return different response based on whether database was created or already existed
    if (dbExists) {
      return NextResponse.json(
        { error: 'Database already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json({ 
      created: true,
      tenant: tenant 
    });
  } catch (error) {
    console.error('Database verification/creation error:', error);
    return NextResponse.json(
      { error: 'Failed to verify/create database' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}