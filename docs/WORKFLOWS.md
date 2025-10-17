# GitHub Actions Workflows Overview

This document provides a quick reference for all GitHub Actions workflows in this project.

## 📊 Workflow Summary

| Workflow | File | Triggers | Purpose |
|----------|------|----------|----------|
| CI Pipeline | `ci.yml` | Push, PR | Lint, test, build, security scan |
| Deploy | `deploy.yml` | Push to main | Deploy to production |
| Preview | `preview.yml` | PR opened/updated | Deploy PR preview |
| CodeQL | `codeql.yml` | Push, PR, Weekly | Security code analysis |
| Dependency Review | `dependency-review.yml` | PR | Review dependency changes |
| Auto Merge | `auto-merge.yml` | Dependabot PRs | Auto-merge safe updates |
| Stale | `stale.yml` | Daily | Mark/close stale issues |

## 🔄 Workflow Details

### CI Pipeline (`ci.yml`)

**Purpose**: Comprehensive continuous integration checks

**Runs on**:
- Every push to `main` or `develop`
- Every pull request to `main` or `develop`
- Manual trigger

**Jobs**:
1. **Lint and Type Check**
   - Duration: ~2-3 minutes
   - Checks: TypeScript, ESLint, Prettier
   - Fails on: Type errors, lint errors, format issues

2. **Unit Tests**
   - Duration: ~1-2 minutes
   - Runs: Vitest test suite
   - Coverage: Uploads to Codecov
   - Fails on: Test failures

3. **Build**
   - Duration: ~2-3 minutes
   - Builds: Production bundle
   - Artifacts: Retained for 7 days
   - Fails on: Build errors

4. **Security Scan**
   - Duration: ~1-2 minutes
   - Scans: npm audit, Snyk
   - Fails on: High severity vulnerabilities

**Total Duration**: ~5-8 minutes

---

### Deploy (`deploy.yml`)

**Purpose**: Automatic production deployment

**Runs on**:
- Push to `main` branch
- Manual trigger

**Environment**: `production`

**Steps**:
1. Checkout code
2. Install dependencies
3. Type check
4. Build production bundle
5. Deploy to Cloudflare Workers

**Duration**: ~3-4 minutes

**Success**: Deploys to https://ai-content-detector.workers.dev

---

### Preview (`preview.yml`)

**Purpose**: Preview deployments for pull requests

**Runs on**:
- PR opened, synchronized, or reopened
- Manual trigger

**Steps**:
1. Build application
2. Deploy to preview environment
3. Comment preview URL on PR

**Duration**: ~3-4 minutes

**Preview URL**: https://preview-ai-content-detector.workers.dev

**Features**:
- Automatic updates on new commits
- Independent from production
- PR comment with deployment info

---

### CodeQL (`codeql.yml`)

**Purpose**: Automated security code analysis

**Runs on**:
- Push to `main` or `develop`
- Pull requests
- Weekly schedule (Monday 3 AM UTC)
- Manual trigger

**Languages**: JavaScript, TypeScript

**Queries**: 
- Security extended
- Security and quality

**Duration**: ~5-10 minutes

**Results**: Security tab in GitHub

---

### Dependency Review (`dependency-review.yml`)

**Purpose**: Review dependency changes in PRs

**Runs on**: Pull requests to `main` or `develop`

**Checks**:
- Security vulnerabilities (fails on moderate+)
- License compatibility (blocks GPL-3.0, AGPL-3.0)
- Dependency changes summary

**Duration**: ~30 seconds

**Output**: PR comment with review summary

---

### Auto Merge (`auto-merge.yml`)

**Purpose**: Automatically merge safe Dependabot updates

**Runs on**: Dependabot pull requests

**Conditions**:
- Only for patch or minor updates
- All CI checks must pass
- Dependabot is the author

**Actions**:
1. Fetch Dependabot metadata
2. Auto-approve PR
3. Enable auto-merge (squash)

**Duration**: ~10 seconds

---

### Stale (`stale.yml`)

**Purpose**: Manage stale issues and PRs

**Runs on**: Daily at midnight UTC

**Issues**:
- Stale after: 60 days
- Close after: 7 days
- Exempt labels: pinned, security, bug, enhancement

**Pull Requests**:
- Stale after: 30 days
- Close after: 14 days
- Exempt labels: pinned, security, work-in-progress

**Duration**: ~30 seconds

---

## 🎯 Workflow Triggers Quick Reference

```yaml
# Runs on every push
on: push

# Runs on push to specific branches
on:
  push:
    branches: [main, develop]

# Runs on pull requests
on: pull_request

# Runs on specific PR events
on:
  pull_request:
    types: [opened, synchronize, reopened]

# Runs on schedule
on:
  schedule:
    - cron: '0 3 * * 1'  # Monday 3 AM UTC

# Manual trigger
on: workflow_dispatch

# Runs when another workflow completes
on:
  workflow_run:
    workflows: ["CI Pipeline"]
    types: [completed]
```

## 🔐 Required Secrets

| Secret | Used By | Required |
|--------|---------|----------|
| `CLOUDFLARE_API_TOKEN` | deploy.yml, preview.yml | Yes |
| `CLOUDFLARE_ACCOUNT_ID` | deploy.yml, preview.yml | Yes |
| `CODECOV_TOKEN` | ci.yml | No |
| `SNYK_TOKEN` | ci.yml | No |
| `GITHUB_TOKEN` | All | Auto-provided |

## 📈 Workflow Performance

### Average Duration
- CI Pipeline: 5-8 minutes
- Deploy: 3-4 minutes
- Preview: 3-4 minutes
- CodeQL: 5-10 minutes
- Dependency Review: 30 seconds
- Auto Merge: 10 seconds
- Stale: 30 seconds

### Optimization Tips
1. Use dependency caching (already enabled)
2. Run independent jobs in parallel
3. Use concurrency groups to cancel outdated runs
4. Optimize build process
5. Use matrix strategies for multiple configurations

## 🐛 Troubleshooting

### Workflow not triggering?
1. Check trigger conditions
2. Verify branch names
3. Check workflow file syntax
4. Review GitHub Actions permissions

### Job failing?
1. Check job logs in Actions tab
2. Look for error messages
3. Verify secrets are set correctly
4. Run commands locally to reproduce

### Deployment failing?
1. Verify Cloudflare secrets
2. Check wrangler.toml configuration
3. Review Cloudflare Workers dashboard
4. Check for API token permissions

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Cloudflare Workers CI/CD](https://developers.cloudflare.com/workers/platform/deploy-button/)

## 🔄 Workflow Updates

Workflows are automatically kept up to date through Dependabot.

To manually update workflows:
1. Edit workflow files in `.github/workflows/`
2. Test changes on a feature branch
3. Create PR and verify all checks pass
4. Merge to main

## 📊 Monitoring

View workflow runs:
- [Actions Tab](https://github.com/ckorhonen/ai-content-detector/actions)
- [Workflow Runs API](https://docs.github.com/en/rest/actions/workflow-runs)

Monitor workflow success rates and identify bottlenecks in the Actions insights.
