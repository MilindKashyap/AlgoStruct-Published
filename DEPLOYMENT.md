# Deploy AlgoStruct on Render

## Quick Deployment Steps

### Option 1: Using Render Dashboard (Recommended)

1. **Push to GitHub**
   - Create a new repository on GitHub
   - Push the `web` folder contents to your repository
   - Make sure all files are in the root of the repository

2. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select your repository
   - Render will auto-detect settings:
     - **Name**: algostruct (or your preferred name)
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Click "Create Web Service"
   - Wait for deployment (usually 2-3 minutes)

3. **Your site will be live at**: `https://your-app-name.onrender.com`

### Option 2: Using Render CLI

```bash
# Install Render CLI
npm install -g render-cli

# Login to Render
render login

# Deploy
render deploy
```

## Important Notes

- **Free Tier**: Render free tier spins down after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.
- **Environment Variables**: No environment variables needed for basic deployment
- **Port**: The server automatically uses Render's PORT environment variable
- **Build Time**: Usually takes 2-3 minutes for first deployment

## Troubleshooting

### Build Fails
- Make sure `package.json` is in the root of your repository
- Check that Node.js version is 18+ (specified in package.json)

### Site Not Loading
- Check Render logs in the dashboard
- Verify all files (index.html, styles.css, script.js) are in the repository
- Make sure server.js is in the root directory

### Slow First Load
- This is normal on free tier - Render spins down inactive services
- Consider upgrading to paid tier for always-on service

## File Structure Required

```
your-repo/
├── package.json
├── server.js
├── index.html
├── styles.css
├── script.js
├── render.yaml (optional)
└── Procfile (optional)
```

## After Deployment

1. Your site will be live at the Render URL
2. You can add a custom domain in Render settings
3. Enable auto-deploy from GitHub for automatic updates

