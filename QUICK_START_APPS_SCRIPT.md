# Quick Start: Google Apps Script Setup

## What File Do I Need?

**Answer: `keep_supabase_awake.gs`**

This is the ONLY file you need to copy to Google Apps Script.

---

## 3-Minute Setup

### 1. Open Google Apps Script
👉 Go to: https://script.google.com

### 2. Create New Project
- Click **"New project"** (or the **"+"** button)

### 3. Copy & Paste Code
- Open `keep_supabase_awake.gs` from this project
- **Copy ALL the code** (Ctrl+A, Ctrl+C)
- **Paste** into the `Code.gs` file in Google Apps Script (Ctrl+V)
- **Save** (Ctrl+S)

### 4. Set Up Trigger
- Click **"Triggers"** (clock icon) in left sidebar
- Click **"Add Trigger"**
- Set:
  - Function: `pingSupabase`
  - Event: `Time-driven` → `Minutes timer` → `Every 5 minutes`
- Click **"Save"**
- **Authorize** when prompted (click "Allow")

### 5. Test It
- Click function dropdown → Select `testPing`
- Click **"Run"** button
- Check execution log - should see ✅ success message

**Done!** Your Supabase will now stay awake forever. 🎉

---

## File Location

The file you need is in your project root:
```
arb-website/
  └── keep_supabase_awake.gs  ← Copy this file's contents
```

---

## Need More Help?

See `APPS_SCRIPT_SETUP.md` for detailed instructions with screenshots and troubleshooting.

