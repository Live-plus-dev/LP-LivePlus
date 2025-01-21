//app/api/submit-waitlist/route.js

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    

    if (!process.env.GOOGLE_SHEETS_ID || 
        !process.env.GOOGLE_SHEETS_CLIENT_EMAIL || 
        !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        project_id: "flowing-indexer-441615-m0",
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // First, verify we can access the spreadsheet
    try {
      await sheets.spreadsheets.get({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID
      });
    } catch (error) {
      console.error('Failed to access spreadsheet:', error.message);
      return NextResponse.json(
        { message: 'Failed to access spreadsheet. Please verify permissions and spreadsheet ID.' },
        { status: 403 }
      );
    }

    // Then attempt to append data
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, new Date().toISOString()]],
      },
    });

    console.log('Append response:', appendResponse.status);

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { 
        message: 'Internal server error', 
        error: error.message,
        type: error.name
      }, 
      { status: 500 }
    );
  }
}