# Setup Guide

Complete guide for setting up the AI Content Detector on Cloudflare Workers.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 20.x or later** installed
- **npm or yarn** package manager
- **Cloudflare account** (free tier works fine)
- **Git** installed

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/ckorhonen/ai-content-detector.git
cd ai-content-detector

# Install dependencies
npm install
```

## Step 2: Cloudflare Setup

### 2.1 Create Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up for a free account
3. Verify your email address

### 2.2 Enable Workers AI

1. Log in to Cloudflare Dashboard
2. Navigate to **Workers & Pages**
3. Click on **AI** in the left sidebar
4. Click **Enable Workers AI**
5. Accept the terms and conditions

### 2.3 Get Your Account ID

1. In the Cloudflare Dashboard, go to **Workers & Pages**
2. Your Account ID is shown in the right sidebar
3. Copy this ID for later use

### 2.4 Create API Token

1. Go to **My Profile** → **API Tokens**
2. Click **Create Token**
3. Use the **Edit Cloudflare Workers** template
4. Or create a custom token with these permissions:
   - Account → Workers AI → Read
   - Account → Workers KV Storage → Edit
   - Account → Workers Scripts → Edit
5. Copy the token (you won't be able to see it again!)

## Step 3: Create KV Namespaces

KV namespaces are required for rate limiting.

```bash
# Authenticate with Cloudflare (one-time setup)
npx wrangler login

# Create production KV namespace
npx wrangler kv:namespace create "RATE_LIMITER"
# Output: id = "abc123def456..."

# Create preview KV namespace (for development)
npx wrangler kv:namespace create "RATE_LIMITER" --preview
# Output: preview_id = "xyz789uvw456..."
```

**Save these IDs!** You'll need them in the next step.

## Step 4: Configure wrangler.toml

Open `wrangler.toml` and update the KV namespace IDs:

```toml
[[kv_namespaces]]
binding = "RATE_LIMITER"
id = "YOUR_PRODUCTION_KV_ID"      # Replace with the id from step 3
preview_id = "YOUR_PREVIEW_KV_ID"  # Replace with the preview_id from step 3
```

Example:
```toml
[[kv_namespaces]]
binding = "RATE_LIMITER"
id = "abc123def456789012345678901234567890"
preview_id = "xyz789uvw456789012345678901234567890"
```

## Step 5: Set Environment Variables (Optional)

For local development, create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

**Note:** These are only needed for CI/CD. Local development works without them.

## Step 6: Test Locally

Start the development server:

```bash
npm run dev
```

The app will be available at: **http://localhost:8787**

### Test the API:

**Text Detection:**
```bash
curl -X POST http://localhost:8787/api/detect-text \
  -H "Content-Type: application/json" \
  -d '{"text":"This is a sample text to analyze for AI-generated content. It should be at least 10 characters long."}'
```

**Image Detection:**
```bash
curl -X POST http://localhost:8787/api/detect-image \
  -F "image=@/path/to/your/image.jpg"
```

**Health Check:**
```bash
curl http://localhost:8787/api/health
```

## Step 7: Deploy to Production

Deploy your app to Cloudflare Workers:

```bash
npm run deploy
```

Your app will be deployed to:
```
https://ai-content-detector.{your-subdomain}.workers.dev
```

## Step 8: Configure GitHub Secrets (For CI/CD)

If you want automatic deployments via GitHub Actions:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

Now every push to `main` will automatically deploy!

## Troubleshooting

### Issue: "AI binding not found"

**Solution:** Make sure Workers AI is enabled in your Cloudflare account:
1. Go to Workers & Pages → AI
2. Click "Enable Workers AI"

### Issue: "KV namespace not found"

**Solution:** Make sure you created the KV namespaces and updated `wrangler.toml`:
```bash
npx wrangler kv:namespace create "RATE_LIMITER"
npx wrangler kv:namespace create "RATE_LIMITER" --preview
```

### Issue: "Rate limit error"

**Solution:** The rate limiter might not be working if KV is not properly configured. Check:
1. KV namespace IDs in `wrangler.toml` are correct
2. You ran the `wrangler kv:namespace create` commands
3. Try refreshing or clearing your KV namespace

### Issue: "Build fails with TypeScript errors"

**Solution:** Run type checking:
```bash
npm run typecheck
```

Fix any reported errors, then rebuild:
```bash
npm run build
```

### Issue: "CORS errors in browser"

**Solution:** The API includes CORS support. If you still have issues:
1. Make sure you're running the dev server: `npm run dev`
2. Check that the API URL in your frontend code is correct
3. Verify the `cors()` middleware is enabled in `src/index.tsx`

### Issue: "Cannot connect to localhost:8787"

**Solution:** 
1. Check if another process is using port 8787
2. Try killing the process: `lsof -ti:8787 | xargs kill -9` (Mac/Linux)
3. Restart the dev server: `npm run dev`

## Verification Checklist

Before deploying to production, verify:

- [ ] Node.js 20+ is installed
- [ ] Dependencies are installed (`npm install`)
- [ ] Cloudflare account is created
- [ ] Workers AI is enabled
- [ ] KV namespaces are created
- [ ] `wrangler.toml` has correct KV IDs
- [ ] Local development works (`npm run dev`)
- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] API endpoints respond correctly
- [ ] Rate limiting works (try 11+ requests quickly)

## Next Steps

Now that your app is set up:

1. **Customize the UI**: Edit `src/App.tsx` to match your branding
2. **Adjust rate limits**: Modify the rate limit logic in `src/index.tsx`
3. **Add more models**: Explore other Cloudflare AI models
4. **Monitor usage**: Check your Cloudflare dashboard for usage stats
5. **Set up custom domain**: Add a custom domain in Cloudflare Workers settings

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Workers AI Models](https://developers.cloudflare.com/workers-ai/models/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Hono Framework](https://hono.dev/)
- [Project README](../README.md)

## Support

If you run into issues:

1. Check the [troubleshooting section](#troubleshooting) above
2. Review the [GitHub Issues](https://github.com/ckorhonen/ai-content-detector/issues)
3. Create a new issue with:
   - What you tried
   - Error messages
   - Your environment (OS, Node version, etc.)

---

**Happy detecting! 🤖**
