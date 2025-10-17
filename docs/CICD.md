# CI/CD Pipeline Documentation

This document describes the complete CI/CD setup for the AI Content Detector project.

## Overview

The project uses GitHub Actions for continuous integration and continuous deployment with the following pipelines:

1. **CI Pipeline** - Runs on every commit and PR
2. **CD Pipeline** - Deploys to production on main branch
3. **Preview Pipeline** - Creates preview deployments for PRs
4. **Security Pipeline** - Automated security scanning
5. **Dependency Management** - Automated dependency updates

## Workflows

### 1. CI Pipeline (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual trigger via workflow_dispatch

**Jobs:**

#### Lint and Type Check
- Sets up Node.js 20
- Installs dependencies
- Runs TypeScript type checking
- Runs ESLint for code quality
- Runs Prettier for code formatting

#### Unit Tests
- Runs Vitest test suite
- Generates code coverage reports
- Uploads coverage to Codecov (optional)

#### Build
- Compiles TypeScript
- Builds production bundle with Vite
- Uploads build artifacts (retained for 7 days)

#### Security Scan
- Runs npm audit for dependency vulnerabilities
- Runs Snyk security scan (if configured)

**Status:** All jobs must pass for PR merge

### 2. Deploy Pipeline (`deploy.yml`)

**Triggers:**
- Push to `main` branch
- Manual trigger via workflow_dispatch

**Environment:** Production

**Steps:**
1. Checkout code
2. Install dependencies
3. Run type checking
4. Build production bundle
5. Deploy to Cloudflare Workers

**Required Secrets:**
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

**Deployment URL:** https://ai-content-detector.workers.dev

### 3. Preview Pipeline (`preview.yml`)

**Triggers:**
- Pull request opened, synchronized, or reopened

**Steps:**
1. Builds the application
2. Deploys to preview environment on Cloudflare Workers
3. Comments preview URL on the PR

**Preview URL Pattern:** https://preview-ai-content-detector.workers.dev

**Features:**
- Automatic preview deployment for every PR
- Preview URL posted as PR comment
- Updates automatically with new commits
- Independent from production

### 4. CodeQL Security Analysis (`codeql.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests
- Weekly schedule (Monday 3 AM UTC)
- Manual trigger

**Analysis:**
- Scans JavaScript and TypeScript code
- Uses security-extended queries
- Reports vulnerabilities in Security tab

### 5. Dependency Review (`dependency-review.yml`)

**Triggers:**
- Pull requests to `main` or `develop` branches

**Checks:**
- Reviews new dependencies for vulnerabilities
- Fails on moderate or higher severity issues
- Blocks GPL-3.0 and AGPL-3.0 licenses
- Comments summary on PR

### 6. Auto-Merge (`auto-merge.yml`)

**Triggers:**
- Dependabot pull requests

**Behavior:**
- Auto-approves patch and minor version updates
- Auto-merges using squash merge
- Requires all CI checks to pass first

## Dependabot Configuration

### NPM Dependencies
- Checks weekly on Mondays at 3 AM UTC
- Groups minor and patch updates
- Ignores major version updates
- Maximum 10 open PRs
- Auto-assigns to @ckorhonen

### GitHub Actions
- Checks weekly for action updates
- Maximum 5 open PRs
- Keeps workflows up to date

## Setup Instructions

### 1. Required Secrets

Add these secrets to your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token | [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → Create Token → Edit Cloudflare Workers |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID | Cloudflare Dashboard → Workers & Pages → Overview (right sidebar) |
| `CODECOV_TOKEN` | (Optional) Codecov token | [Codecov.io](https://codecov.io) → Repository Settings |
| `SNYK_TOKEN` | (Optional) Snyk token | [Snyk Dashboard](https://app.snyk.io) → Account Settings → API Token |

### 2. Environment Configuration

**Create Production Environment:**

1. Go to Settings → Environments → New environment
2. Name: `production`
3. (Optional) Add protection rules:
   - Required reviewers
   - Wait timer
   - Deployment branches: `main` only

### 3. Branch Protection Rules

**Recommended settings for `main` branch:**

1. Go to Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - Require a pull request before merging
   - Require status checks to pass before merging
     - Check: `Lint and Type Check`
     - Check: `Unit Tests`
     - Check: `Build`
     - Check: `Security Scan`
   - Require branches to be up to date before merging
   - Require conversation resolution before merging
   - Do not allow bypassing the above settings

### 4. Enable Security Features

1. Settings → Security → Code security and analysis
2. Enable:
   - Dependency graph
   - Dependabot alerts
   - Dependabot security updates
   - CodeQL analysis
   - Secret scanning

### 5. Cloudflare Workers Configuration

Update `wrangler.toml` with preview environment:

```toml
name = "ai-content-detector"
main = "src/index.tsx"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"

[build]
command = "npm run build"

[ai]
binding = "AI"

[vars]
ENVIRONMENT = "production"

# Preview environment
[env.preview]
name = "preview-ai-content-detector"
vars = { ENVIRONMENT = "preview" }
```

## Local Development

### Run CI Checks Locally

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Formatting check
npm run format:check

# Tests
npm test

# All checks
npm run typecheck && npm run lint && npm run format:check && npm test && npm run build
```

### Pre-commit Hooks (Optional)

Install Husky for automatic pre-commit checks:

```bash
npm install
npm run prepare
```

This will:
- Run ESLint on staged files
- Run Prettier on staged files
- Prevent commits with linting/formatting errors

## Monitoring and Debugging

### View Workflow Runs

1. Go to Actions tab in GitHub
2. Select workflow from left sidebar
3. Click on a run to view details
4. Click on jobs to see logs

### Failed Jobs

**Common Issues:**

1. **Type Check Failed**
   - Run `npm run typecheck` locally
   - Fix TypeScript errors

2. **Lint Failed**
   - Run `npm run lint:fix` locally
   - Fix remaining issues manually

3. **Test Failed**
   - Run `npm test` locally
   - Check test logs in CI

4. **Build Failed**
   - Run `npm run build` locally
   - Check for missing dependencies

5. **Deployment Failed**
   - Verify Cloudflare secrets are set
   - Check wrangler.toml configuration
   - Review Cloudflare Workers logs

### Cloudflare Workers Logs

```bash
# View real-time logs
wrangler tail

# View logs for specific deployment
wrangler tail --env production
```

## Performance Optimization

### Caching

- Dependencies are cached using `actions/setup-node@v4`
- Cache is invalidated when `package-lock.json` changes
- Speeds up workflow runs by ~60%

### Concurrency

- Multiple workflows can run in parallel
- Same workflow on same branch cancels previous runs
- Prevents resource waste on rapid commits

### Artifact Retention

- Build artifacts retained for 7 days
- Allows debugging of specific builds
- Automatic cleanup saves storage

## Cost Considerations

### GitHub Actions

- Public repositories: Unlimited minutes
- Private repositories: 2,000 minutes/month (Free tier)

### Cloudflare Workers

- Free tier: 100,000 requests/day
- Paid plan: $5/month for 10M requests

## Best Practices

1. **Always run checks locally** before pushing
2. **Keep workflows fast** (< 5 minutes ideal)
3. **Use matrix strategies** for testing multiple configurations
4. **Cache dependencies** aggressively
5. **Set up branch protection** to enforce CI checks
6. **Monitor workflow usage** to optimize costs
7. **Keep secrets secure** - never expose in logs
8. **Use environments** for deployment approvals
9. **Version pin actions** for stability
10. **Document custom workflows** in this file

## Troubleshooting

### Workflow Not Triggering

- Check branch name matches trigger pattern
- Verify workflow file is in `.github/workflows/`
- Ensure YAML syntax is valid

### Secrets Not Available

- Verify secret names match exactly
- Check secret is set at repository or organization level
- For forked repos, secrets don't transfer (security)

### Deployment Issues

- Verify Cloudflare account has Workers enabled
- Check API token has correct permissions
- Ensure wrangler.toml is valid
- Review Cloudflare Workers dashboard for errors

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [CodeQL Documentation](https://codeql.github.com/docs/)

## Support

For issues or questions:
1. Check existing GitHub Issues
2. Review workflow logs
3. Consult documentation links above
4. Open a new issue with relevant logs
