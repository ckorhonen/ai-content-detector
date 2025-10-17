# CI/CD Setup Checklist

Complete this checklist to fully enable the CI/CD pipeline for ai-content-detector.

## ✅ Prerequisites

- [ ] GitHub repository created
- [ ] Cloudflare Workers account created
- [ ] Node.js 20.x installed locally
- [ ] Git configured locally

## 🔐 Step 1: Configure GitHub Secrets

Go to **Settings → Secrets and variables → Actions → New repository secret**

### Required Secrets

- [ ] **CLOUDFLARE_API_TOKEN**
  - Get from: https://dash.cloudflare.com/profile/api-tokens
  - Click "Create Token"
  - Use "Edit Cloudflare Workers" template
  - Select Account and Zone resources
  - Copy token and add as secret

- [ ] **CLOUDFLARE_ACCOUNT_ID**
  - Get from: https://dash.cloudflare.com/
  - Go to Workers & Pages
  - Account ID is shown in right sidebar
  - Copy and add as secret

### Optional Secrets (for enhanced features)

- [ ] **CODECOV_TOKEN** (for code coverage reporting)
  - Sign up at: https://codecov.io
  - Add repository
  - Copy token from repository settings
  
- [ ] **SNYK_TOKEN** (for advanced security scanning)
  - Sign up at: https://snyk.io
  - Go to Account Settings → API Token
  - Generate and copy token

## 🌍 Step 2: Configure GitHub Environments

Go to **Settings → Environments**

- [ ] Create "production" environment
  - [ ] Add protection rule: Require reviewers (optional)
  - [ ] Add protection rule: Wait timer (optional)
  - [ ] Deployment branches: Only "main" branch

## 🛡️ Step 3: Enable Security Features

Go to **Settings → Code security and analysis**

- [ ] Enable Dependency graph
- [ ] Enable Dependabot alerts
- [ ] Enable Dependabot security updates
- [ ] Enable CodeQL analysis (if available)
- [ ] Enable Secret scanning (if available)
- [ ] Enable Secret scanning push protection (if available)

## 🌿 Step 4: Configure Branch Protection

Go to **Settings → Branches → Add rule**

### Branch: `main`

- [ ] Branch name pattern: `main`
- [ ] Require a pull request before merging
  - [ ] Require approvals: 1 (recommended)
  - [ ] Dismiss stale pull request approvals when new commits are pushed
- [ ] Require status checks to pass before merging
  - [ ] Require branches to be up to date before merging
  - [ ] Status checks (add these):
    - [ ] `Lint and Type Check`
    - [ ] `Unit Tests`
    - [ ] `Build`
    - [ ] `Security Scan`
- [ ] Require conversation resolution before merging
- [ ] Require signed commits (optional, but recommended)
- [ ] Include administrators (prevents bypassing)

## 📦 Step 5: Install Dependencies

```bash
# Clone the repository
git clone https://github.com/ckorhonen/ai-content-detector.git
cd ai-content-detector

# Install dependencies
npm install

# Verify installation
npm run typecheck
npm run build
```

## 🧪 Step 6: Verify Local Setup

Run all checks locally to ensure everything works:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Formatting
npm run format:check

# Tests (will fail until tests are written)
npm test

# Build
npm run build

# Local development server
npm run dev
```

## ☁️ Step 7: Test Cloudflare Workers Deployment

```bash
# Login to Cloudflare
npx wrangler login

# Test local deployment
npm run dev

# Test production deployment
npm run deploy
```

## 🚀 Step 8: Verify CI/CD Pipeline

### Test CI Pipeline

- [ ] Create a new branch
  ```bash
  git checkout -b test/ci-pipeline
  ```

- [ ] Make a small change (e.g., update README.md)

- [ ] Commit and push
  ```bash
  git add .
  git commit -m "test: verify CI pipeline"
  git push origin test/ci-pipeline
  ```

- [ ] Create a pull request

- [ ] Verify all checks pass:
  - [ ] Lint and Type Check ✅
  - [ ] Unit Tests ✅
  - [ ] Build ✅
  - [ ] Security Scan ✅
  - [ ] Preview Deployment ✅

- [ ] Check PR comments for preview deployment URL

### Test CD Pipeline

- [ ] Merge the test PR to main

- [ ] Go to Actions tab

- [ ] Verify "Deploy to Cloudflare Workers" runs

- [ ] Check deployment completes successfully

- [ ] Visit production URL to verify deployment

## 🔄 Step 9: Configure Dependabot (Already configured)

Verify in **Settings → Code security and analysis**:

- [ ] Dependabot alerts: Enabled
- [ ] Dependabot security updates: Enabled
- [ ] Dependabot version updates: Enabled (via `.github/dependabot.yml`)

## 📧 Step 10: Configure Notifications (Optional)

Go to **Settings → Notifications** or use GitHub's notification settings:

- [ ] Watch repository for all activity
- [ ] Enable email notifications for:
  - [ ] Failed workflow runs
  - [ ] Dependabot alerts
  - [ ] Security advisories
  - [ ] Pull request reviews

## 🎯 Step 11: Team Configuration (If Applicable)

If working with a team:

- [ ] Add collaborators (Settings → Collaborators)
- [ ] Set up teams (Organization settings → Teams)
- [ ] Configure code owners (`.github/CODEOWNERS`)
- [ ] Set up review assignments
- [ ] Configure team notifications

## 📊 Step 12: Set Up Monitoring

- [ ] Add repository to GitHub Insights
- [ ] Set up Cloudflare Workers analytics
- [ ] Configure error monitoring (Sentry, etc.)
- [ ] Set up uptime monitoring (optional)

## 🎨 Step 13: Customize Workflows (Optional)

Based on your needs, you may want to:

- [ ] Adjust test coverage thresholds in `vitest.config.ts`
- [ ] Modify ESLint rules in `.eslintrc.json`
- [ ] Update Prettier configuration in `.prettierrc.json`
- [ ] Add custom workflow steps
- [ ] Configure additional environments (staging, development)

## ✏️ Step 14: Update Documentation

- [ ] Update README.md with project-specific information
- [ ] Add API documentation if applicable
- [ ] Document environment variables
- [ ] Add architecture diagrams
- [ ] Create user guides if needed

## 🧹 Step 15: Clean Up

- [ ] Delete test branches
- [ ] Review and close any test issues
- [ ] Update CHANGELOG if using one
- [ ] Tag first release (v1.0.0)

## 🎉 Verification

Once all steps are complete, verify:

✅ All CI checks pass on pull requests
✅ Deployments work automatically on merge to main
✅ Preview deployments work for PRs
✅ Dependabot creates PRs for updates
✅ Security scans run regularly
✅ Team members can contribute

## 📚 Additional Resources

- [Full CI/CD Documentation](./CICD.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## 🆘 Troubleshooting

### Workflows not running?
- Check `.github/workflows/` directory exists
- Verify YAML syntax is valid
- Ensure branch names match trigger conditions

### Deployment failing?
- Verify Cloudflare secrets are correct
- Check wrangler.toml configuration
- Review Cloudflare Workers dashboard

### Tests failing?
- Run tests locally first
- Check for missing dependencies
- Review test logs in Actions tab

### Need help?
- Open an issue on GitHub
- Check existing issues and discussions
- Review workflow logs for details

---

**Status**: ⏳ In Progress | ✅ Complete

Last Updated: 2025-10-17
