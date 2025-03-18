import { NextResponse } from 'next/server';
import { verifyDatabase } from '@/lib/verifyDatabase';
import { connectDB } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { tenant, subscription } = await request.json();
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant name is required' },
        { status: 400 }
      );
    }

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription details are required' },
        { status: 400 }
      );
    }

    // This will now create the database if it doesn't exist
    const dbExists = await verifyDatabase(tenant);

    if (dbExists) {
      return NextResponse.json(
        { error: 'Database already exists' },
        { status: 409 }
      );
    }

    // Connect to the newly created tenant database
    const connection = await connectDB(tenant);
    const SubscriptionModel = connection.models.Subscription;

    // Create the initial subscription record
    await SubscriptionModel.create({
      planType: subscription.planType,
      userCount: subscription.quantity,
      pricePerUser: subscription.pricePerUser,
      stripeSubscriptionId: 'pending', // Will be updated when Stripe webhook confirms the subscription
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

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