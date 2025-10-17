# Contributing to AI Content Detector

Thank you for your interest in contributing to AI Content Detector! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js 20.x or later
- npm or yarn
- Git

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-content-detector.git
   cd ai-content-detector
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality

```bash
# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check
```

### Building

```bash
npm run build
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `ci:` CI/CD changes

Example:
```
feat: add AI detection for video content

Implements video analysis using Cloudflare AI models
to detect AI-generated video content.
```

## Pull Request Process

1. Ensure all tests pass and code is properly formatted
2. Update documentation as needed
3. Add tests for new features
4. Fill out the pull request template completely
5. Request review from maintainers

### CI/CD Pipeline

All pull requests must pass:

- ✅ TypeScript type checking
- ✅ ESLint linting
- ✅ Prettier formatting check
- ✅ Unit tests
- ✅ Build process
- ✅ Security scans

### Preview Deployments

Every PR automatically gets a preview deployment to Cloudflare Workers. The preview URL will be commented on your PR.

## Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint and Prettier)
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Testing Guidelines

- Write unit tests for all new features
- Aim for at least 70% code coverage
- Test edge cases and error conditions
- Use descriptive test names

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public APIs
- Update CONTRIBUTING.md for process changes

## Questions?

Feel free to open an issue for questions or discussions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
