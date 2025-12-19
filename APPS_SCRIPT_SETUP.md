# Google Apps Script Setup Guide

## Step-by-Step Instructions to Keep Supabase Awake

### Step 1: Create Google Apps Script Project

1. **Go to Google Apps Script**
   - Visit: https://script.google.com
   - Sign in with your Google account

2. **Create New Project**
   - Click the **"+"** button or **"New project"**
   - A new project will open with a default `Code.gs` file

### Step 2: Copy the Code

1. **Delete the default code** in `Code.gs` (if any)

2. **Copy the entire code** from `keep_supabase_awake.gs` file in this project

3. **Paste it** into the `Code.gs` file in Google Apps Script

4. **The code is already configured** with your Supabase URL and key, so no changes needed!

### Step 3: Save the Project

1. Click **"Save"** (floppy disk icon) or press `Ctrl+S` / `Cmd+S`
2. Give your project a name (e.g., "Supabase Keep Alive")

### Step 4: Set Up Time-Driven Trigger

1. **Click on "Triggers"** (clock icon) in the left sidebar
   - If you don't see it, click the **"≡"** menu icon first

2. **Click "Add Trigger"** button (bottom right)

3. **Configure the trigger:**
   - **Choose which function to run:** Select `pingSupabase`
   - **Select event source:** Choose `Time-driven`
   - **Select type of time based trigger:** Choose `Minutes timer`
   - **Select minute interval:** Choose `Every 5 minutes`
   - **Failure notification settings:** Choose `Notify me immediately` (optional)

4. **Click "Save"**

5. **Authorize the script:**
   - A popup will appear asking for authorization
   - Click **"Review Permissions"**
   - Select your Google account
   - Click **"Advanced"** → **"Go to [Project Name] (unsafe)"**
   - Click **"Allow"** to grant permissions

### Step 5: Test It

1. **Run the function manually:**
   - Click on the function dropdown (top toolbar)
   - Select `testPing`
   - Click **"Run"** (play button)
   - Check the execution log (View → Execution log) to see if it worked

2. **Check the logs:**
   - Go to **"Executions"** tab (clock icon with list)
   - You should see successful executions every 5 minutes

### Step 6: Verify It's Working

After 10-15 minutes:
1. Make a request to your Supabase API
2. If it responds immediately (no cold start delay), it's working! ✅

---

## Troubleshooting

### Problem: "Authorization required"
- **Solution:** Click "Run" again and authorize when prompted

### Problem: "Execution failed"
- **Solution:** 
  - Check the execution log for error details
  - Verify your Supabase URL and key are correct in the code
  - Make sure the `pingSupabase` function is selected in the trigger

### Problem: Not pinging regularly
- **Solution:**
  - Check the trigger is set to "Every 5 minutes"
  - Verify the trigger is enabled (should show green checkmark)
  - Check execution history to see if it's running

### Problem: Want to change ping frequency
- **Solution:**
  - Edit the trigger: Click on the trigger → Edit → Change minute interval
  - Options: Every 1, 5, 10, 15, or 30 minutes

---

## Alternative: Quick Setup Script

If you prefer, you can also use this simplified version:

```javascript
function pingSupabase() {
  const url = 'https://syqynbhiundigknrsuny.supabase.co/rest/v1/jobs?select=id&limit=1';
  const options = {
    'method': 'get',
    'headers': {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cXluYmhpdW5kaWdrbnJzdW55Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTI1NDgyOSwiZXhwIjoyMDgwODMwODI5fQ.TmY_g8h-yTROyyWlh8Mm57gPxdL_TdAYZyLwru3L4J8',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cXluYmhpdW5kaWdrbnJzdW55Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTI1NDgyOSwiZXhwIjoyMDgwODMwODI5fQ.TmY_g8h-yTROyyWlh8Mm57gPxdL_TdAYZyLwru3L4J8'
    }
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log('✅ Pinged Supabase: ' + response.getResponseCode());
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
  }
}
```

Then set up the trigger as described above.

---

## Files You Need

The only file you need is:
- **`keep_supabase_awake.gs`** - Copy this entire file to Google Apps Script

That's it! No other files needed.

---

## Important Notes

- ✅ **Completely free** - Google Apps Script is free
- ✅ **Automatic** - Runs every 5 minutes automatically
- ✅ **No server needed** - Runs on Google's infrastructure
- ✅ **Reliable** - Google's servers are very reliable
- ⚠️ **Free tier limit:** Google Apps Script free tier allows 6 hours of execution time per day (more than enough for 5-minute pings)

---

## Success Indicators

You'll know it's working when:
1. ✅ Execution log shows "Successfully pinged Supabase"
2. ✅ Executions tab shows regular runs every 5 minutes
3. ✅ Your Supabase database responds quickly (no cold start)

