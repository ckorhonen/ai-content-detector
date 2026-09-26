# AI Content Detector

## Repository Map

- `src/index.tsx` is the Hono Worker API and owns rate limiting, `AI.run` calls, and the `RATE_LIMITER` KV binding. `src/App.tsx` is the React interface; `src/main.tsx` boots it. `vite.config.ts`, `vitest.config.ts`, and `.eslintrc.json` define the local toolchain.
- Text and image detection are `POST /api/detect-text` and `POST /api/detect-image`; `GET /api/health` is the narrow health readback. Cloudflare Workers AI and KV behavior require a configured Worker environment and cannot be proven by a browser-only build.

## Setup and Validation

- CI uses Node 20, but this repository does not commit a package lockfile, so its current `npm ci` jobs cannot install from this checkout. Use Node 20 and `npm install` for a local dependency setup; do not describe it as CI-equivalent until a separately scoped lockfile repair exists.
- For code changes, run the narrowest relevant test plus `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`. `npm run dev` starts a local Worker. A local check does not establish deployed Workers AI, KV persistence, rate-limit behavior, or preview/production deployment.

## Deployment Boundaries

- `npm run deploy` deploys the production Worker. Opening or updating a pull request triggers `.github/workflows/preview.yml`, which attempts a Cloudflare preview deployment; a push to `main` triggers production deployment. Follow applicable authorization and operational gates, with existing permission remaining valid within its scope.
- Keep Cloudflare credentials and KV IDs out of source. Do not replace the placeholder IDs in `wrangler.toml` or call Workers AI merely to validate an instruction change.
