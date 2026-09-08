# Quality evidence for v0.5

This file records reproducible checks without pretending automated tools replace human testing.

## Automated baseline

- `npm run validate:content` validates required discovery fields and reviewer evidence for records marked reviewed.
- `npm run lint` checks application source with the repository ESLint configuration.
- `npm run build` performs production compilation, TypeScript checks, and static-route generation.
- GitHub Actions repeats validation, lint, and build for pull requests.

Record the date, commit, environment, result, and unresolved findings for each release candidate.

## Manual accessibility checklist

- Complete onboarding, a discovery, checkpoint, glossary action, offline download, library search, and correction flow using only a keyboard.
- Confirm visible focus, meaningful headings, labelled controls, live status announcements, and sensible reading order.
- Test at 200% zoom and at 320 CSS pixels without losing actions or meaning.
- Test Tamil pronunciation and language switching with at least one current screen reader.

## Privacy check

Reader progress, recent items, bookmarks, glossary entries, preferences, and aggregate insights stay in browser storage. The app has no account system and must not transmit these values. External API routes receive only the requested Kural number or catalogue search query. Never enter personal information into catalogue search.

## Performance and resilience

Measure the home page, one discovery, the Kural library, and the editorial dashboard on a mobile profile. Record Core Web Vitals and test upstream delay, HTTP failure, offline navigation, cache update, and cache removal. Core Kural API requests stop after eight seconds and return structured, retryable `503` fallbacks with a `Retry-After` hint. The combined Kural and Wikisource routes must receive the same guard before v0.5 release.

## Moderated comprehension test

With informed consent, ask 5–10 target readers to complete one journey. Record whether they can explain the central idea, distinguish source from interpretation, continue without prompting, and identify content still awaiting review. Store only anonymized themes—not recordings or personal data—after participant permission.

## Current limitations

- Expert review of the Five Landscapes remains open in #14 and #44.
- Thirukkural commentary rights review remains open in #15 and #45.
- Automated checks do not prove Tamil accuracy, accessibility, comprehension, or legal permission.
