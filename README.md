# AI Content Detector

[![CI Pipeline](https://github.com/ckorhonen/ai-content-detector/actions/workflows/ci.yml/badge.svg)](https://github.com/ckorhonen/ai-content-detector/actions/workflows/ci.yml)
[![Deploy](https://github.com/ckorhonen/ai-content-detector/actions/workflows/deploy.yml/badge.svg)](https://github.com/ckorhonen/ai-content-detector/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/ckorhonen/ai-content-detector/actions/workflows/codeql.yml/badge.svg)](https://github.com/ckorhonen/ai-content-detector/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AI-powered tool to detect AI-generated content (slop) across images, text, and video. Built with React, TypeScript, and Cloudflare Workers.

## 🚀 Features

- **AI Detection**: Identify AI-generated content across multiple media types
- **Real-time Analysis**: Fast detection powered by Cloudflare AI
- **Modern Stack**: Built with React, TypeScript, and Vite
- **Serverless**: Deployed on Cloudflare Workers for global edge performance
- **Automated CI/CD**: Complete GitHub Actions pipeline with automated testing and deployment

## 📋 Quick Start

### Prerequisites

- Node.js 20.x or later
- npm or yarn
- Cloudflare account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/ckorhonen/ai-content-detector.git
cd ai-content-detector

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Format code
npm run format

# Run tests
npm test

# Build for production
npm run build
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Wrangler |
| `npm run build` | Build for production |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## 🏗️ Architecture

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Runtime**: Cloudflare Workers for edge computing
- **AI**: Cloudflare AI for content detection
- **Framework**: Hono for lightweight HTTP routing

## 🚦 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

- **CI Pipeline**: Runs on every commit and PR
  - TypeScript type checking
  - ESLint linting
  - Prettier formatting
  - Unit tests with coverage
  - Production build
  - Security scanning

- **CD Pipeline**: Automatic deployment to Cloudflare Workers
  - Deploys to production on merge to `main`
  - Environment variable management
  - Build optimization

- **Preview Deployments**: Automatic preview for every PR
  - Independent preview environment
  - Comments preview URL on PR
  - Auto-updates with new commits

- **Security**: Automated security scanning
  - CodeQL analysis
  - Dependency vulnerability scanning
  - Secret scanning

- **Dependabot**: Automated dependency updates
  - Weekly dependency updates
  - Grouped minor/patch updates
  - Auto-merge for safe updates

### Setup Required

To enable the full CI/CD pipeline, you need to configure:

1. **GitHub Secrets** (Settings → Secrets):
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
   - `CODECOV_TOKEN` (optional) - For code coverage reporting
   - `SNYK_TOKEN` (optional) - For advanced security scanning

2. **Branch Protection** (Settings → Branches):
   - Require PR reviews
   - Require status checks to pass
   - Require up-to-date branches

3. **Environments** (Settings → Environments):
   - Create `production` environment
   - Add deployment protection rules

📖 **Full Setup Guide**: See [docs/SETUP-CHECKLIST.md](docs/SETUP-CHECKLIST.md)

📚 **Detailed Documentation**: See [docs/CICD.md](docs/CICD.md)

## 📦 Deployment

### Production Deployment

Automatic deployment to production happens on every merge to `main` branch:

```bash
# Manually deploy
npm run deploy
```

Production URL: `https://ai-content-detector.workers.dev`

### Preview Deployments

Every pull request automatically gets a preview deployment:

- Preview URL is commented on the PR
- Updates automatically with new commits
- Independent from production environment

Preview URL pattern: `https://preview-ai-content-detector.workers.dev`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Tests are automatically run in CI for every commit and pull request.

## 🛡️ Security

- Automated security scanning with CodeQL
- Dependency vulnerability checks
- Secret scanning enabled
- Regular Dependabot updates

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

All PRs must:
- ✅ Pass TypeScript type checking
- ✅ Pass ESLint linting
- ✅ Pass Prettier formatting
- ✅ Pass all unit tests
- ✅ Build successfully
- ✅ Pass security scans

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Chris Korhonen**
- GitHub: [@ckorhonen](https://github.com/ckorhonen)
- Email: ckorhonen@gmail.com

## 🙏 Acknowledgments

- Built with [Cloudflare Workers](https://workers.cloudflare.com/)
- Powered by [Cloudflare AI](https://developers.cloudflare.com/workers-ai/)
- UI built with [React](https://react.dev/)

## 📊 Project Status

🚀 **Active Development** - CI/CD pipeline fully configured and operational

## 🔗 Links

- [Documentation](docs/)
- [CI/CD Setup Guide](docs/SETUP-CHECKLIST.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](.github/CODE_OF_CONDUCT.md)
- [Issues](https://github.com/ckorhonen/ai-content-detector/issues)
- [Pull Requests](https://github.com/ckorhonen/ai-content-detector/pulls)

## 📈 Workflow Status

Check the [Actions](https://github.com/ckorhonen/ai-content-detector/actions) tab to see the status of all workflow runs.

---

**Keywords**: AI detection, content moderation, machine learning, Cloudflare Workers, React, TypeScript
