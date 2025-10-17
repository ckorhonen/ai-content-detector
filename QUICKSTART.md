# 🚀 Quick Start Guide

Get the AI Content Detector up and running in 5 minutes!

## What You Need

- Node.js 20+ 
- Cloudflare account (free tier works!)
- 5 minutes ⏱️

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create KV Namespaces

```bash
# Login to Cloudflare
npx wrangler login

# Create rate limiting storage
npx wrangler kv:namespace create "RATE_LIMITER"
npx wrangler kv:namespace create "RATE_LIMITER" --preview
```

Copy the IDs that are printed!

## Step 3: Update Configuration

Edit `wrangler.toml` and paste your KV IDs:

```toml
[[kv_namespaces]]
binding = "RATE_LIMITER"
id = "YOUR_PRODUCTION_KV_ID"      # ← Paste here
preview_id = "YOUR_PREVIEW_KV_ID"  # ← Paste here
```

## Step 4: Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:8787** 🎉

## Step 5: Test It Out

### Try the Web UI
1. Open http://localhost:8787
2. Enter some text or upload an image
3. Click "Analyze"

### Try the API
```bash
# Text Detection
curl -X POST http://localhost:8787/api/detect-text \
  -H "Content-Type: application/json" \
  -d '{"text":"This is a test of the AI content detection system."}'

# Image Detection  
curl -X POST http://localhost:8787/api/detect-image \
  -F "image=@your-image.jpg"
```

## Step 6: Deploy to Production

```bash
npm run deploy
```

Your app is now live at: `https://ai-content-detector.YOUR-SUBDOMAIN.workers.dev` 🌍

## What's Included

✅ **Text Analysis** - Detect AI-generated text using Llama-2  
✅ **Image Analysis** - Detect AI-generated images using ResNet-50  
✅ **Beautiful UI** - Modern React interface with Tailwind CSS  
✅ **Rate Limiting** - 10 requests/minute per IP  
✅ **API Endpoints** - REST API for integration  
✅ **Edge Deployment** - Global CDN with Cloudflare Workers  

## Features at a Glance

### Text Detection
- Analyzes 10-10,000 characters
- Returns confidence score (0-100%)
- Provides reasoning for detection
- Uses Cloudflare's Llama-2 model

### Image Detection  
- Supports JPEG, PNG, GIF (max 5MB)
- Classification scores
- AI indicator detection
- Uses ResNet-50 model

### API
- `/api/detect-text` - Text analysis
- `/api/detect-image` - Image analysis
- `/api/health` - Health check

## Next Steps

📖 **Full Documentation**: See [README.md](README.md)  
🔧 **Setup Guide**: See [docs/SETUP.md](docs/SETUP.md)  
📡 **API Docs**: See [docs/API.md](docs/API.md)  

## Common Issues

### "AI binding not found"
→ Enable Workers AI in your Cloudflare dashboard

### "KV namespace not found"  
→ Make sure you created the namespaces and updated `wrangler.toml`

### "Rate limit error"
→ Check that your KV namespace IDs are correct in `wrangler.toml`

## Project Structure

```
ai-content-detector/
├── src/
│   ├── index.tsx    # API server (Hono)
│   ├── App.tsx      # React UI
│   ├── main.tsx     # React entry
│   └── index.css    # Tailwind styles
├── docs/
│   ├── SETUP.md     # Detailed setup
│   └── API.md       # API reference
├── wrangler.toml    # Cloudflare config
├── package.json     # Dependencies
└── README.md        # Main docs
```

## Development Commands

```bash
npm run dev         # Start dev server
npm run build       # Build for production  
npm run deploy      # Deploy to Cloudflare
npm test            # Run tests
npm run lint        # Check code quality
npm run typecheck   # Check TypeScript
```

## Getting Help

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/ckorhonen/ai-content-detector/issues)
- 💬 Email: ckorhonen@gmail.com

---

**That's it!** You now have a fully functional AI content detector running on Cloudflare's edge network. 🎉

Made with ❤️ by [Chris Korhonen](https://github.com/ckorhonen)
