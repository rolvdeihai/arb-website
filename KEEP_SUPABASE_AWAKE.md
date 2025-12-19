# How to Keep Supabase Awake (Free Tier)

Supabase free tier projects go to sleep after 1 week of inactivity. Here are several solutions:

## Solution 1: Google Apps Script (Recommended - Free & Easy)

### Setup Steps:

1. **Create Google Apps Script Project**
   - Go to https://script.google.com
   - Click "New Project"
   - Copy the code from `keep_supabase_awake.gs`

2. **Update the Script**
   - Replace `SUPABASE_URL` with your Supabase project URL
   - Replace `SUPABASE_ANON_KEY` with your anon key (already in the file)

3. **Set Up Trigger**
   - Click on "Triggers" (clock icon) in left sidebar
   - Click "Add Trigger"
   - Function: `pingSupabase`
   - Event source: Time-driven
   - Type: Minutes timer
   - Interval: Every 5 minutes
   - Click "Save"

4. **Test It**
   - Click "Run" button and select `testPing` function
   - Check the execution log to verify it works

### Advantages:
- ✅ Completely free
- ✅ Runs automatically
- ✅ No server needed
- ✅ Reliable (Google infrastructure)

---

## Solution 2: UptimeRobot (Free Tier Available)

### Setup Steps:

1. **Sign Up**
   - Go to https://uptimerobot.com
   - Create a free account (50 monitors)

2. **Create Monitor**
   - Click "Add New Monitor"
   - Monitor Type: HTTP(s)
   - Friendly Name: "Supabase Keep Alive"
   - URL: `https://syqynbhiundigknrsuny.supabase.co/rest/v1/jobs?select=id&limit=1`
   - Monitoring Interval: 5 minutes
   - Add custom headers:
     - Key: `apikey`
     - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cXluYmhpdW5kaWdrbnJzdW55Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTI1NDgyOSwiZXhwIjoyMDgwODMwODI5fQ.TmY_g8h-yTROyyWlh8Mm57gPxdL_TdAYZyLwru3L4J8`
   - Save

### Advantages:
- ✅ Free tier available
- ✅ Web dashboard
- ✅ Email alerts if it fails
- ✅ Very reliable

---

## Solution 3: Vercel Cron Job (If Using Vercel)

If you're deploying on Vercel, you can use their cron jobs:

1. **Create API Route**
   ```typescript
   // api/cron/keep-alive.ts
   export default async function handler(req, res) {
     const response = await fetch(
       'https://syqynbhiundigknrsuny.supabase.co/rest/v1/jobs?select=id&limit=1',
       {
         headers: {
           'apikey': process.env.SUPABASE_ANON_KEY,
           'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
         }
       }
     );
     
     res.status(200).json({ success: response.ok });
   }
   ```

2. **Add to vercel.json**
   ```json
   {
     "crons": [{
       "path": "/api/cron/keep-alive",
       "schedule": "*/5 * * * *"
     }]
   }
   ```

---

## Solution 4: GitHub Actions (Free for Public Repos)

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Supabase Awake

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: |
          curl -X GET \
            "https://syqynbhiundigknrsuny.supabase.co/rest/v1/jobs?select=id&limit=1" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

---

## Solution 5: Simple Node.js Script on Free Hosting

You can deploy a simple Node.js script to:
- **Render.com** (free tier)
- **Railway** (free tier with credit card)
- **Fly.io** (free tier)

```javascript
// keep-alive.js
const cron = require('node-cron');
const fetch = require('node-fetch');

const SUPABASE_URL = 'https://syqynbhiundigknrsuny.supabase.co';
const SUPABASE_KEY = 'your-anon-key';

cron.schedule('*/5 * * * *', async () => {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/jobs?select=id&limit=1`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    console.log(`✅ Pinged at ${new Date()}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
});
```

---

## Recommended Solution

**I recommend Solution 1 (Google Apps Script)** because:
- ✅ Easiest to set up
- ✅ Completely free
- ✅ No server maintenance
- ✅ Reliable Google infrastructure
- ✅ No credit card required

The script will ping your Supabase database every 5 minutes, keeping it awake indefinitely.

---

## Important Notes

1. **Free Tier Limits**: Supabase free tier allows unlimited requests, so frequent pings won't cause issues
2. **Security**: The anon key is safe to use in these scripts (it's meant to be public)
3. **Frequency**: 5 minutes is a good balance - frequent enough to prevent sleep, not too frequent to waste resources
4. **Monitoring**: Check logs occasionally to ensure the ping is working

---

## Testing Your Setup

After setting up any solution, test it by:
1. Waiting 10+ minutes
2. Making a request to your Supabase API
3. If it responds immediately (no cold start delay), it's working!

