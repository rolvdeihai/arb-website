/**
 * Google Apps Script to Keep Supabase Awake
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Replace YOUR_SUPABASE_URL with your actual Supabase project URL
 * 5. Set up a time-driven trigger to run every 5 minutes
 * 
 * TRIGGER SETUP:
 * 1. Click on "Triggers" (clock icon) in the left sidebar
 * 2. Click "Add Trigger"
 * 3. Choose function: pingSupabase
 * 4. Event source: Time-driven
 * 5. Type: Minutes timer
 * 6. Interval: Every 5 minutes
 * 7. Save
 */

// Replace with your Supabase project URL
const SUPABASE_URL = 'https://syqynbhiundigknrsuny.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cXluYmhpdW5kaWdrbnJzdW55Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTI1NDgyOSwiZXhwIjoyMDgwODMwODI5fQ.TmY_g8h-yTROyyWlh8Mm57gPxdL_TdAYZyLwru3L4J8';

/**
 * Ping Supabase to keep it awake
 * This function makes a simple query to prevent the database from sleeping
 */
function pingSupabase() {
  try {
    // Make a simple query to the jobs table (or any table)
    // This keeps the connection alive
    const url = `${SUPABASE_URL}/rest/v1/jobs?select=id&limit=1`;
    
    const options = {
      'method': 'get',
      'headers': {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      'muteHttpExceptions': true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    
    // Log the result
    if (responseCode === 200) {
      Logger.log(`✅ Successfully pinged Supabase at ${new Date()}`);
    } else {
      Logger.log(`⚠️ Warning: Supabase ping returned code ${responseCode} at ${new Date()}`);
    }
    
    return responseCode === 200;
  } catch (error) {
    Logger.log(`❌ Error pinging Supabase: ${error.toString()} at ${new Date()}`);
    return false;
  }
}

/**
 * Alternative: Ping using a health check endpoint (if available)
 */
function pingSupabaseHealth() {
  try {
    // Some Supabase projects have a health endpoint
    const url = `${SUPABASE_URL}/rest/v1/`;
    
    const options = {
      'method': 'get',
      'headers': {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      'muteHttpExceptions': true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    Logger.log(`Health check response: ${response.getResponseCode()} at ${new Date()}`);
    
    return response.getResponseCode() === 200;
  } catch (error) {
    Logger.log(`Health check error: ${error.toString()}`);
    return false;
  }
}

/**
 * Test function - run this manually to test the ping
 */
function testPing() {
  const result = pingSupabase();
  Logger.log(`Test ping result: ${result ? 'SUCCESS' : 'FAILED'}`);
}

