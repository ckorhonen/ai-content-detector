# AI Content Detector 🤖

AI-powered tool to detect AI-generated content (slop) across images, text, and video.

## Features

- 🔍 **Multi-format Detection**: Analyze text, images, and video content
- ⚡ **Cloudflare Workers**: Lightning-fast edge computing
- 🧠 **AI-Powered**: Leverages Cloudflare AI for intelligent detection
- ⚛️ **React Frontend**: Modern, responsive user interface
- 📦 **TypeScript**: Type-safe development

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono (lightweight web framework)
- **Frontend**: React 18 + TypeScript
- **AI**: Cloudflare Workers AI
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/ckorhonen/ai-content-detector.git
cd ai-content-detector

# Install dependencies
npm install
```

### Development

```bash
# Start local development server
npm run dev
```

Visit `http://localhost:8787` to see your app.

### Build

```bash
# Build for production
npm run build
```

### Deployment

```bash
# Deploy to Cloudflare Workers
npm run deploy
```

## Project Structure

```
ai-content-detector/
├── src/
│   ├── index.tsx        # Worker entry point with API routes
│   ├── App.tsx          # Main React component
│   └── main.tsx         # Client-side entry point
├── dist/                # Build output
├── wrangler.toml        # Cloudflare Workers configuration
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite build configuration
```

## API Endpoints

### POST /api/detect

Detect AI-generated content.

**Request Body:**
```json
{
  "content": "Text or URL to analyze",
  "type": "text" | "image" | "video"
}
```

**Response:**
```json
{
  "success": true,
  "isAiGenerated": boolean,
  "confidence": number,
  "type": string
}
```

## Roadmap

- [ ] Implement text analysis using Cloudflare AI models
- [ ] Add image detection capabilities
- [ ] Add video analysis support
- [ ] Implement confidence scoring algorithm
- [ ] Add batch processing
- [ ] Create detailed reporting
- [ ] Add user authentication
- [ ] Build analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Chris Korhonen (@ckorhonen)
