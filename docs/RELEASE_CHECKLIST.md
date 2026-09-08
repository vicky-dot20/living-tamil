# Release checklist

## Before release

- [ ] Every shipped change has an issue and a reviewed pull request into `dev`.
- [ ] `npm ci`, content validation, lint, and production build pass from a fresh checkout.
- [ ] No credentials, private data, or local environment files are committed.
- [ ] Source URLs, licence states, review states, and named-reviewer evidence are accurate.
- [ ] Unresolved rights material is restricted or visibly provisional.
- [ ] Keyboard, narrow-screen, offline, upstream-failure, and comprehension checks are recorded.
- [ ] `/api/health` reports the intended version and no sensitive configuration.

## Release and rollback

1. Create a release branch from `main` containing only CI-approved version commits. This avoids false conflicts caused by squash history between `dev` and `main`.
2. Open a release PR to `main`, list included PRs, link closing issues, and wait for required checks.
3. Squash merge without deleting permanent `dev`.
4. Smoke-test `/`, `/library`, `/kural`, `/offline`, `/editorial`, and `/api/health`.
5. If a critical regression appears, revert the release PR through a new reviewed PR; do not force-push or rewrite `main`.

## Runtime contract

- Node.js 20 or newer.
- `npm run dev` serves port 4050; `npm run start` serves port 4060 after a build.
- No application secrets are currently required.
- Tamil Wikisource, Senkanthal, and the meaning API are external dependencies. Cached responses and user-readable fallbacks reduce, but do not eliminate, upstream dependency risk.
