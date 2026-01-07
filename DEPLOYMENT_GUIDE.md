
# 🚀 DateHub Launch Guide

Follow these steps to put your app online and share it with real users!

### 1. Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new **Private** or **Public** repository named `datehub`.
2. Open your terminal/command prompt in your project folder.
3. Run these commands:
   ```bash
   git init
   git add .
   git commit -m "Initial launch of DateHub"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/datehub.git
   git push -u origin main
   ```

### 2. Connect to Vercel (The Host)
1. Go to [Vercel.com](https://vercel.com).
2. Click **"Add New"** > **"Project"**.
3. Select your `datehub` repository from the list.
4. **Environment Variables (CRITICAL):**
   - Click the "Environment Variables" section.
   - **Key:** `API_KEY`
   - **Value:** `[Paste your Google Gemini API Key]`
   - Click **Add**.
5. Click **Deploy**.

### 3. Verification
Once live, your URL will look like `datehub.vercel.app`.
- **Test:** Create a date and click "Share."
- **PWA:** Open the link on your phone, tap "Share" > "Add to Home Screen."

### 4. Updating the App
Whenever you want to update the app in the future, just change your code and push to GitHub:
```bash
git add .
git commit -m "Description of your update"
git push
```
Vercel will see the change and update your live website automatically in seconds!
